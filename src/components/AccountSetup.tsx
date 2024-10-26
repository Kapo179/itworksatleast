import React, { useState } from 'react';
import { Apple, Facebook, Chrome, ArrowRight, AlertCircle } from 'lucide-react';

interface AccountSetupProps {
  userType: 'Buyer' | 'Seller';
  onComplete: () => void;
}

export function AccountSetup({ userType, onComplete }: AccountSetupProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleAuthProvider = async (provider: string) => {
    try {
      setError(null);
      setLoading(provider);
      // Authentication logic would go here
      setTimeout(() => {
        setLoading(null);
        onComplete();
      }, 1500);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <p className="text-gray-300 text-lg font-medium mb-6">Connect ImReal account to claim</p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        {[
          { id: 'google', icon: Chrome, color: '#4285F4', text: 'Sign in with Google' },
          { id: 'apple', icon: Apple, color: '#ffffff', text: 'Sign in with Apple' },
          { id: 'facebook', icon: Facebook, color: '#1877F2', text: 'Sign in with Facebook' }
        ].map(({ id, icon: Icon, color, text }) => (
          <button
            key={id}
            onClick={() => handleAuthProvider(id)}
            disabled={!!loading}
            className={`
              w-full flex items-center justify-between px-6 py-4 rounded-lg
              bg-white/5 hover:bg-white/10 border-2 border-white/10
              group transition-all duration-300
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" style={{ color }} />
              <span className="text-gray-300 group-hover:text-white">
                {loading === id ? 'Connecting...' : text}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white 
              group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}