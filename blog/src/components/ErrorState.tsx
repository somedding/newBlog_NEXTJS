interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export default function ErrorState({ message = "문제가 발생했습니다.", retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-error text-5xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{message}</h3>
      {retry && (
        <button 
          onClick={retry}
          className="btn btn-primary mt-4"
        >
          다시 시도
        </button>
      )}
    </div>
  );
} 