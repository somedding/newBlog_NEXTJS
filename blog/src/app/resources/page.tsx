import { getFiles as getLocalFiles, formatFileSize, formatDate } from '@/utils/fileUtils';
import { getGoogleDriveClient } from '@/utils/googleDrive';
import { FileInfo } from '@/types/file';
import { 
  FaRegFile,
  FaRegFilePdf, 
  FaRegFileWord, 
  FaRegFileExcel,
  FaRegFileImage,
  FaRegFileAudio,
  FaRegFileVideo,
  FaRegFileArchive,
  FaRegFileCode
} from 'react-icons/fa';
import RefreshButton from '@/components/RefreshButton';

// 페이지를 동적 렌더링하도록 설정
export const dynamic = 'force-dynamic';

// 30초마다 재증
export const revalidate = 30;

// 파일 타입별 아이콘 매핑
const FileIcon = ({ type }: { type: string }) => {
  switch(type.toLowerCase()) {
    case 'pdf':
      return <FaRegFilePdf className="w-5 h-5 text-red-500" />;
    case 'doc':
    case 'docx':
      return <FaRegFileWord className="w-5 h-5 text-blue-500" />;
    case 'xls':
    case 'xlsx':
      return <FaRegFileExcel className="w-5 h-5 text-green-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return <FaRegFileImage className="w-5 h-5 text-purple-500" />;
    case 'mp3':
    case 'wav':
    case 'ogg':
      return <FaRegFileAudio className="w-5 h-5 text-yellow-500" />;
    case 'mp4':
    case 'avi':
    case 'mov':
      return <FaRegFileVideo className="w-5 h-5 text-pink-500" />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FaRegFileArchive className="w-5 h-5 text-orange-500" />;
    case 'js':
    case 'ts':
    case 'py':
    case 'java':
    case 'cpp':
    case 'html':
    case 'css':
      return <FaRegFileCode className="w-5 h-5 text-gray-500" />;
    default:
      return <FaRegFile className="w-5 h-5 text-base-content/70" />;
  }
};

// FileInfo 타입 확장
interface ExtendedFileInfo extends FileInfo {
  source: 'local' | 'drive';
}

async function getAllFiles(): Promise<ExtendedFileInfo[]> {
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
      fields: 'files(id, name, mimeType, size, createdTime, modifiedTime)',
    });

    // 구글 드라이브 파일을 FileInfo ��식으로 변환
    const driveFilesMapped: ExtendedFileInfo[] = driveFiles.data.files?.map(file => ({
      id: file.id!,
      name: file.name!,
      description: '',
      size: parseInt(file.size || '0'),
      type: file.mimeType!.split('/').pop()!,
      url: `/api/files/${file.id}`,
      createdAt: new Date(file.createdTime || file.modifiedTime!),
      updatedAt: new Date(file.modifiedTime!),
      source: 'drive' as const,
    })) || [];

    // 모든 파일 합치기 및 정렬
    const allFiles = [...localFilesWithSource, ...driveFilesMapped]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return allFiles;
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
}

export default async function ResourcesPage() {
  const files = await getAllFiles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-base-content">공유파일</h1>
        <RefreshButton />
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            {files.length > 0 ? (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-base-content">파일명</th>
                    <th className="text-base-content">크기</th>
                    <th className="text-base-content min-w-[180px]">업로드일</th>
                    <th className="text-base-content">다운로드</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file: ExtendedFileInfo) => (
                    <tr key={file.id}>
                      <td className="text-base-content">
                        <div className="flex items-center space-x-2">
                          <FileIcon type={file.type} />
                          <span>{file.name}</span>
                          {file.source === 'drive' && (
                            <span className="badge badge-sm">Drive</span>
                          )}
                        </div>
                      </td>
                      <td className="text-base-content/70">{formatFileSize(file.size)}</td>
                      <td className="text-base-content/70">{formatDate(file.createdAt)}</td>
                      <td>
                        <a
                          href={file.url}
                          download={file.source === 'local'}
                          className="btn btn-primary btn-sm"
                          target={file.source === 'drive' ? '_blank' : undefined}
                          rel={file.source === 'drive' ? 'noopener noreferrer' : undefined}
                        >
                          <svg 
                            className="w-4 h-4 mr-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 18 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8">
                <p className="text-base-content/50">공유된 파일이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}