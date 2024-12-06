import { getFiles, formatFileSize, formatDate } from '@/utils/fileUtils';

export default async function ResourcesPage() {
  const files = await getFiles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-base-content">공유파일</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="text-base-content">파일명</th>
                  <th className="text-base-content">크기</th>
                  <th className="text-base-content">수정일</th>
                  <th className="text-base-content">다운로드</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td className="text-base-content">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-base-content/70" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5z"/>
                        </svg>
                        <span>{file.name}</span>
                      </div>
                    </td>
                    <td className="text-base-content/70">{formatFileSize(file.size)}</td>
                    <td className="text-base-content/70">{formatDate(file.updatedAt)}</td>
                    <td>
                      <a
                        href={file.url}
                        download
                        className="btn btn-primary btn-sm"
                      >
                        <svg 
                          className="w-4 h-4 mr-1" 
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
                        다운로드
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}