import { FaRegFileAlt } from 'react-icons/fa';

export default function PostSkeleton() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse h-[200px]">
      <div className="flex h-full">
        <div className="w-1/3 h-full bg-base-200 flex items-center justify-center">
          <FaRegFileAlt className="w-12 h-12 text-base-300" />
        </div>
        <div className="flex-1 p-4">
          <div className="h-6 bg-base-300 rounded-lg w-3/4 mb-2"></div>
          <div className="h-4 bg-base-300 rounded-lg w-1/4 mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-base-300 rounded-lg w-full"></div>
            <div className="h-4 bg-base-300 rounded-lg w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
);
} 