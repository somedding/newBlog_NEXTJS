import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/utils/mdUtils';
import { getFiles, formatFileSize, formatDate } from '@/utils/fileUtils';
import { getGoogleDriveClient, getFileMetadata } from '@/utils/googleDrive';
import { FileInfo } from '@/types/file';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiRust,
  SiPython,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiReact as SiReactNative,
  SiSwift,
  SiHtml5,
  SiCss3,
  SiSpring,
} from 'react-icons/si';
import { TbBrandChrome } from 'react-icons/tb';
import { 
  FaRegFile,
  FaRegFilePdf, 
  FaRegFileWord, 
  FaRegFileExcel,
  FaRegFileImage,
  FaRegFileAudio,
  FaRegFileVideo,
  FaRegFileArchive,
  FaRegFileCode,
  FaRegFileAlt
} from 'react-icons/fa';

// 기술 스택 데이터 정의
const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Chrome Extension', icon: TbBrandChrome, color: '#4285F4' },
  { name: 'React Native', icon: SiReactNative, color: '#61DAFB' },
  { name: 'Swift', icon: SiSwift, color: '#F05138' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Rust', icon: SiRust, color: '#000000' },
  { name: 'Spring', icon: SiSpring, color: '#6DB33D' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
];

// FileIcon 컴포넌트 추가
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

export default async function Home() {
    const posts = getAllPosts().slice(0, 3);
  
    // 구글 드라이브 파일 가���오기
    const drive = getGoogleDriveClient();
    let driveFiles: FileInfo[] = [];
  
    try {
      const response = await drive.files.list({
        q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents`,
        fields: 'files(id, name, mimeType, size, createdTime, modifiedTime)',
        pageSize: 5
      });

      driveFiles = response.data.files?.map(file => {
        // 한국 시간으로 변환
        const createdTime = new Date(file.createdTime || file.modifiedTime!);
        const modifiedTime = new Date(file.modifiedTime!);
        
        return {
          id: file.id!,
          name: file.name!,
          description: '',
          size: parseInt(file.size || '0'),
          type: file.mimeType!.split('/').pop()!,
          url: `/api/files/${file.id}`,
          createdAt: createdTime,
          updatedAt: modifiedTime
        };
      }) || [];
    } catch (error) {
      console.error('Error fetching Google Drive files:', error);
    }

    // 로컬 파일과 구글 드라이브 파일 합치기
    const localFiles = await getFiles();
    const allFiles = [...localFiles, ...driveFiles]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  
    return (
      <div className="container p-2 mx-auto space-y-6 sm:p-4 sm:space-y-8">
        {/* 프로필 섹션 */}
        <div className="p-2 hero bg-base-200 rounded-box sm:p-4">
          <div className="flex-col gap-4 hero-content lg:flex-row">
            <Image
              src="/profile.png"
              alt="Profile"
              width={150}
              height={150}
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 150px"
              className="w-32 h-32 shadow-2xl mask mask-squircle sm:w-48 sm:h-48"
            />
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold sm:text-4xl text-base-content">안녕하세요!</h1>
              <p className="py-2 text-base sm:text-lg text-base-content">
                프론트엔드 개발자 <span className="font-bold text-primary">썸딩</span> 입니다. 
              </p>
              <Link href="/about" className="text-sm text-primary sm:text-base">더 알아보기</Link>
            </div>
          </div>
        </div>
  
        {/* 최근 포스트 섹션 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">최근 포스트</h2>
            <Link href="/posts" className="btn btn-ghost btn-sm sm:btn-md text-primary">
              모든 포스트 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.slug} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-[200px]">
                <div className="flex h-full">
                  {post.thumbnail ? (
                    <figure className="relative w-1/3 h-full">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                      />
                    </figure>
                  ) : (
                    <div className="w-1/3 h-full bg-base-200 flex items-center justify-center">
                      <FaRegFileAlt className="w-12 h-12 text-base-content/50" />
                    </div>
                  )}
                  <div className="card-body flex-1 p-4">
                    <h2 className="card-title text-lg font-bold text-base-content line-clamp-2">{post.title}</h2>
                    <p className="text-xs text-base-content/70">{post.date}</p>
                    <p className="text-sm text-base-content/80 line-clamp-2">
                      {post.description || 'No description available'}
                    </p>
                    <div className="card-actions justify-end mt-auto">
                      <Link href={`/posts/${post.slug}`} className="btn btn-primary btn-xs">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* 공유 파일 섹션 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">공유 파일</h2>
            <Link href="/resources" className="btn btn-ghost btn-sm sm:btn-md text-primary">
              모든 파일 보기 →
            </Link>
          </div>
          <div className="shadow-xl card bg-base-100">
            <div className="p-2 card-body sm:p-6">
              <div className="-mx-2 overflow-x-auto sm:mx-0">
                {allFiles.length > 0 ? (
                  <table className="table w-full text-sm table-zebra sm:text-base">
                    <thead>
                      <tr>
                        <th className="text-base-content">파일명</th>
                        <th className="hidden text-base-content sm:table-cell">크기</th>
                        <th className="hidden text-base-content sm:table-cell min-w-[180px]">업로드일</th>
                        <th className="text-base-content">다운로드</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allFiles.map((file) => (
                        <tr key={file.id}>
                          <td className="text-base-content">
                            <div className="flex items-center space-x-2">
                              <FileIcon type={file.type} />
                              <span>{file.name}</span>
                              {file.url.startsWith('/api/files/') && (
                                <span className="badge badge-sm">Drive</span>
                              )}
                            </div>
                          </td>
                          <td className="hidden text-base-content/70 sm:table-cell">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="hidden text-base-content/70 sm:table-cell">
                            {formatDate(file.createdAt)}
                          </td>
                          <td>
                            <a
                              href={file.url}
                              download={!file.url.startsWith('/api/files/')}
                              target={file.url.startsWith('/api/files/') ? '_blank' : undefined}
                              rel={file.url.startsWith('/api/files/') ? 'noopener noreferrer' : undefined}
                              className="btn btn-primary btn-xs sm:btn-sm"
                            >
                              <svg 
                                className="w-3 h-3 mr-1 sm:w-4 sm:h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              <span className="hidden sm:inline">다운로드</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-6 text-center sm:py-8">
                    <p className="text-sm text-base-content/50 sm:text-base">공유된 파일이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* 기술 스택 섹션 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">기술 스택</h2>
          </div>
          <div className="shadow-xl card bg-base-100">
            <div className="p-3 card-body sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-2 p-4 font-medium transition-shadow badge badge-lg hover:shadow-md"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    <tech.icon 
                      className="text-xl"
                      style={{ color: tech.color }}
                    />
                    <span className="text-base-content">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}