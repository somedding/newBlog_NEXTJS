export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-base-content">공유파일</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-base-content/70" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              <a href="#" className="text-primary hover:underline">
                예시 문서.pdf
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}