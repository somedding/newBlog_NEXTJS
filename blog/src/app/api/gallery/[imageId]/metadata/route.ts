import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const { title, description, tags } = await request.json();
    const drive = getGoogleDriveClient();

    await drive.files.update({
      fileId: params.imageId,
      requestBody: {
        name: title,
        description: description,
        properties: {
          tags: JSON.stringify(tags)
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to update image metadata',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
} 