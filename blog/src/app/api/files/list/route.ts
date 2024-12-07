import { getFiles as getLocalFiles } from '@/utils/fileUtils';
import { getGoogleDriveClient } from '@/utils/googleDrive';
import { NextResponse } from 'next/server';
import { FileInfo } from '@/types/file';

// 캐시 설정 - 1분
export const revalidate = 60;

interface ExtendedFileInfo extends FileInfo {
  source: 'local' | 'drive';
}

export async function GET() {
  try {
    // 로컬 파일 가져오기
    const localFiles = await getLocalFiles();
    const localFilesWithSource = localFiles.map(file => ({
      ...file,
      source: 'local' as const,
    }));

    // 구글 드라이브 파일 가져오기
    const drive = getGoogleDriveClient();
    const driveFiles = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents`,
      fields: 'files(id, name, mimeType, size, modifiedTime)',
    });

    // 구글 드라이브 파일을 FileInfo 형식으로 변환
    const driveFilesMapped: ExtendedFileInfo[] = driveFiles.data.files?.map(file => ({
      id: file.id!,
      name: file.name!,
      description: '',
      size: parseInt(file.size || '0'),
      type: file.mimeType!.split('/').pop()!,
      url: `/api/files/${file.id}`,
      createdAt: new Date(),
      updatedAt: new Date(file.modifiedTime!),
      source: 'drive' as const,
    })) || [];

    // 모든 파일 합치기 및 정렬
    const allFiles = [...localFilesWithSource, ...driveFilesMapped]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return NextResponse.json(allFiles);
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
} 