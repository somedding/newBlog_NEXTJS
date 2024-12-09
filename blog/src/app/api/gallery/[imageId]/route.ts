import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { GaxiosResponse } from 'gaxios';

export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
): Promise<NextResponse> {
  try {
    const imageId = await params.imageId;
    const drive = getGoogleDriveClient();
    
    // 이미지 메타데이터 가져오기
    const metadata = await drive.files.get({
      fileId: imageId,
      fields: 'id, name, mimeType'
    });

    // 이미지 다운로드
    const response: GaxiosResponse<Readable> = await drive.files.get(
      { fileId: imageId, alt: 'media' },
      { responseType: 'stream' }
    );

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', metadata.data.mimeType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');

    // 스트림을 Response로 변환
    const stream = response.data;
    return new NextResponse(stream as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error streaming image:', error);
    return new NextResponse('Error streaming image', { status: 500 });
  }
} 