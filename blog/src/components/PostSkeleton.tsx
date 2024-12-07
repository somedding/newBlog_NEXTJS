export default function PostSkeleton() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body">
        {/* 제목 스켈레톤 */}
        <div className="h-8 bg-base-300 rounded-lg w-3/4 mb-2"></div>
        {/* 날짜 스켈레톤 */}
        <div className="h-4 bg-base-300 rounded-lg w-1/4 mb-4"></div>
        {/* 설명 스켈레톤 */}
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded-lg w-full"></div>
          <div className="h-4 bg-base-300 rounded-lg w-5/6"></div>
        </div>
      </div>
    </div>
  );
} 