import path from 'path';
import fs from 'fs/promises';
import { FileInfo } from '@/types/file';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date: Date): string {
  const dateStr = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul'  // 한국 시간대 명시
  }).format(date);

  return dateStr;
}

export async function getFiles(): Promise<FileInfo[]> {
  const filesDirectory = path.join(process.cwd(), 'public', 'files');
  
  try {
    // 디렉토리가 없으면 생성
    await fs.mkdir(filesDirectory, { recursive: true });
    
    const files = await fs.readdir(filesDirectory);
    const fileInfos = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(filesDirectory, filename);
        const stats = await fs.stat(filePath);
        
        return {
          id: filename,
          name: filename,
          size: stats.size,
          type: path.extname(filename).slice(1),
          url: `/files/${filename}`,
          createdAt: stats.birthtime,
          updatedAt: stats.mtime,
        };
      })
    );

    return fileInfos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  } catch (error) {
    console.error('Error loading files:', error);
    return [];
  }
} 