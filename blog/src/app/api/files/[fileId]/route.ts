import { getGoogleDriveClient, getFileMetadata } from '@/utils/googleDrive';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';
import { GaxiosResponse } from 'gaxios';

interface Context {
  params: {
    fileId: string;
  };
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const { fileId } = context.params;
    const drive = getGoogleDriveClient();
    
    // 파일 메타데이터 가져오기
    const metadata = await getFileMetadata(fileId);
    
    // 파일 다운로드
    const response: GaxiosResponse<Readable> = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', metadata.mimeType || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${metadata.name}"`);
    if (metadata.size) {
      headers.set('Content-Length', metadata.size.toString());
    }

    // 스트림을 Response로 변환
    const stream = response.data;
    return new Response(stream as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new Response('Error downloading file', { status: 500 });
  }
} 