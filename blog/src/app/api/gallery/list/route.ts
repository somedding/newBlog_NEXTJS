import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextResponse } from 'next/server';
import exifr from 'exifr';

export async function GET() {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, thumbnailLink, webContentLink, createdTime, description, properties, modifiedTime)',
      orderBy: 'modifiedTime desc'
    });

    const images = await Promise.all(response.data.files?.map(async file => {
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

      return {
        id: file.id!,
        src: file.thumbnailLink?.replace('=s220', '=s1000') || '',
        title: file.name!,
        thumbnailUrl: file.thumbnailLink?.replace('=s220', '=s1000') || '',
        fullUrl: `/api/gallery/${file.id}`,
        createdTime: file.createdTime,
        description: file.description || '',
        tags: file.properties?.tags ? JSON.parse(file.properties.tags) : [],
        uploadedAt: formattedDate,
        modifiedTime: file.modifiedTime!,
        takenAt: takenDate.toISOString()
      };
    }) || []);

    images.sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime());

    return NextResponse.json(images);
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