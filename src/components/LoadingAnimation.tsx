import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface LoadingAnimationProps {
  isComplete: boolean;
}

export function LoadingAnimation({ isComplete }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6 animate-fade-in">
      {isComplete ? (
        <>
          <CheckCircle2 className="w-12 h-12 text-[#00ff00] animate-bounce" />
          <p className="text-[#00ff00] font-semibold text-lg">Let's complete this deal!</p>
        </>
      ) : (
        <>
          <Loader2 className="w-12 h-12 text-[#00ff00] animate-spin" />
          <p className="text-gray-300 font-medium">Processing...</p>
        </>
      )}
    </div>
  );
}