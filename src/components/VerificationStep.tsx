import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

interface VerificationStepProps {
  isVerified: boolean;
  onVerify: () => void;
  userType: string | null;
}

export function VerificationStep({ isVerified, onVerify, userType }: VerificationStepProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-center">Verification Required</h2>
      
      <div className="bg-black/40 rounded-xl p-6 border border-[#00ff00]/10">
        <div className="flex flex-col items-center space-y-4">
          {isVerified ? (
            <>
              <CheckCircle2 className="text-[#00ff00] w-12 h-12" />
              <p className="text-[#00ff00] text-center font-medium">
                Verified {userType}
              </p>
            </>
          ) : (
            <>
              <Shield className="text-[#00ff00]/50 w-12 h-12" />
              <p className="text-gray-300 text-center text-sm">
                Please verify your identity to continue as a {userType}
              </p>
              <button
                onClick={onVerify}
                className="
                  w-full px-6 py-3 rounded-lg
                  bg-[#00ff00]/10 hover:bg-[#00ff00]/20
                  border-2 border-[#00ff00]/50
                  text-[#00ff00] font-medium
                  transition-all duration-300
                  transform hover:scale-[1.02] active:scale-95
                  flex items-center justify-center space-x-2
                "
              >
                <Shield className="w-4 h-4" />
                <span>Verify Identity</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}