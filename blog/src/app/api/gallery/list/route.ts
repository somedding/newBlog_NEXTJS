import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, thumbnailLink, webContentLink, createdTime, description, properties, modifiedTime)',
      orderBy: 'modifiedTime desc'
    });

    const images = response.data.files?.map(file => {
      const highQualityThumbnail = file.thumbnailLink?.replace('=s220', '=s1000') || '';
      const tags = file.properties?.tags ? JSON.parse(file.properties.tags) : [];
      
      const modifiedDate = new Date(file.modifiedTime!);
      const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(modifiedDate);

      return {
        id: file.id,
        src: highQualityThumbnail,
        title: file.name,
        thumbnailUrl: highQualityThumbnail,
        fullUrl: `/api/gallery/${file.id}`,
        createdTime: file.createdTime,
        description: file.description || '',
        tags: tags,
        uploadedAt: formattedDate,
        modifiedTime: modifiedDate.toISOString()
      };
    }) || [];

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