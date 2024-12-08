import { getGoogleDriveClient, getFileMetadata } from '@/utils/googleDrive';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { GaxiosResponse } from 'gaxios';

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
): Promise<NextResponse> {
  try {
    const fileId = await params.fileId;
    const drive = getGoogleDriveClient();
    
    // 파일 메타데이터 가져오기
    const metadata = await getFileMetadata(fileId);
    
    // 파일 다운로드
    const response: GaxiosResponse<Readable> = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    // 파일명 인코딩
    const encodedFilename = encodeURIComponent(metadata.name || 'download');

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', metadata.mimeType || 'application/octet-stream');
    headers.set(
      'Content-Disposition', 
      `attachment; filename*=UTF-8''${encodedFilename}`
    );
    if (metadata.size) {
      headers.set('Content-Length', metadata.size.toString());
    }

    // 스트림을 Response로 변환
    const stream = response.data;
    return new NextResponse(stream as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse('Error downloading file', { status: 500 });
  }
} 