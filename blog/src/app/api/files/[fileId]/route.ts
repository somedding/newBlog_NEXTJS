import { getGoogleDriveClient, getFileMetadata } from '@/utils/googleDrive';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';
import { GaxiosResponse } from 'gaxios';

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const drive = getGoogleDriveClient();
    
    const metadata = await getFileMetadata(fileId);
    const response: GaxiosResponse<Readable> = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const encodedFilename = encodeURIComponent(metadata.name || 'download');
    const headers = new Headers({
      'Content-Type': metadata.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`
    });

    if (metadata.size) {
      headers.set('Content-Length', metadata.size.toString());
    }

    return new Response(response.data as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new Response('Error downloading file', { status: 500 });
  }
} 