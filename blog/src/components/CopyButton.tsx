'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="p-2 text-base-content/50 hover:text-base-content transition-colors"
      aria-label="Copy code"
    >
      {isCopied ? (
        <FiCheck className="w-4 h-4" />
      ) : (
        <FiCopy className="w-4 h-4" />
      )}
    </button>
  );
} 