import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextResponse } from 'next/server';
import exifr from 'exifr';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get('pageToken');
  const limit = parseInt(searchParams.get('limit') || '20');

  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'nextPageToken, files(id, name, thumbnailLink, webContentLink, createdTime, description, properties, modifiedTime)',
      orderBy: 'modifiedTime desc',
      pageSize: limit,
      pageToken: pageToken || undefined
    });

    if (!response.data.files) {
      return NextResponse.json({ images: [], nextPageToken: null });
    }

    const images = await Promise.all(response.data.files.map(async file => {
      try {
        const imageResponse = await drive.files.get({
          fileId: file.id!,
          alt: 'media',
          fields: '*'
        }, {
          responseType: 'arraybuffer'
        });

        const buffer = Buffer.from(imageResponse.data);
        const exifData = await exifr.parse(buffer);
        const takenDate = exifData?.DateTimeOriginal 
          ? new Date(exifData.DateTimeOriginal)
          : new Date(file.createdTime!);

        const formattedDate = new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(takenDate);

        const thumbnailUrl = file.thumbnailLink?.replace('=s220', '=s400') || '';

        return {
          id: file.id!,
          src: thumbnailUrl,
          title: file.name!,
          thumbnailUrl: thumbnailUrl,
          fullUrl: `/api/gallery/${file.id}`,
          createdTime: file.createdTime,
          description: file.description || '',
          tags: file.properties?.tags ? JSON.parse(file.properties.tags) : [],
          uploadedAt: formattedDate,
          modifiedTime: file.modifiedTime!,
          takenAt: takenDate.toISOString()
        };
      } catch (error) {
        console.error(`Error processing image ${file.id}:`, error);
        return null;
      }
    }));

    const validImages = images.filter(img => img !== null);

    return NextResponse.json({
      images: validImages,
      nextPageToken: response.data.nextPageToken || null
    });
  } catch (error) {
    console.error('Error in gallery list API:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}

export const revalidate = 900; // 15분 캐싱 