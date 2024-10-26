import React, { useState } from 'react';
import { Shield, User, Mail, Phone, Camera, CheckCircle2, Upload, AlertCircle, Loader2 } from 'lucide-react';

interface ImRealProfileProps {
  userType: 'Buyer' | 'Seller';
  onVerificationComplete: () => void;
}

export function ImRealProfile({ userType, onVerificationComplete }: ImRealProfileProps) {
  const [step, setStep] = useState<'details' | 'verification' | 'pending' | 'complete'>('details');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idDocument: null as File | null,
    selfie: null as File | null,
  });

  const handleFileUpload = (field: 'idDocument' | 'selfie', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verification');
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('pending');
    // Simulate verification process
    setTimeout(() => {
      setStep('complete');
      onVerificationComplete();
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-[#00ff00]">ImReal Profile Setup</h2>
        <p className="text-sm text-gray-400">
          {step === 'details' && 'Complete your profile details'}
          {step === 'verification' && 'Verify your identity'}
          {step === 'pending' && 'Verifying your information'}
          {step === 'complete' && 'Verification Complete!'}
        </p>
      </div>

      {step === 'details' && (
        <form onSubmit={handleSubmitDetails} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] w-5 h-5" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-[#00ff00]/20 rounded-lg
                  focus:border-[#00ff00] focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-[#00ff00]/20 rounded-lg
                  focus:border-[#00ff00] focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] w-5 h-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Phone Number"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-[#00ff00]/20 rounded-lg
                  focus:border-[#00ff00] focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 
              px-6 py-3 rounded-lg bg-[#00ff00]/10 hover:bg-[#00ff00]/20
              border-2 border-[#00ff00]/50 text-[#00ff00] font-medium
              transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            <span>Continue to Verification</span>
          </button>
        </form>
      )}

      {step === 'verification' && (
        <form onSubmit={handleSubmitVerification} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                id="idDocument"
                className="hidden"
                onChange={(e) => handleFileUpload('idDocument', e.target.files?.[0] || null)}
                accept="image/*,.pdf"
                required
              />
              <label
                htmlFor="idDocument"
                className="flex items-center justify-between px-6 py-4 rounded-lg
                  bg-black/40 border-2 border-dashed border-[#00ff00]/20 hover:border-[#00ff00]/50
                  cursor-pointer group transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#00ff00]" />
                  <span className="text-gray-300">
                    {formData.idDocument ? formData.idDocument.name : 'Upload ID Document'}
                  </span>
                </div>
                <Upload className="w-4 h-4 text-[#00ff00] group-hover:translate-y-[-2px] transition-transform" />
              </label>
            </div>

            <div className="relative">
              <input
                type="file"
                id="selfie"
                className="hidden"
                onChange={(e) => handleFileUpload('selfie', e.target.files?.[0] || null)}
                accept="image/*"
                required
              />
              <label
                htmlFor="selfie"
                className="flex items-center justify-between px-6 py-4 rounded-lg
                  bg-black/40 border-2 border-dashed border-[#00ff00]/20 hover:border-[#00ff00]/50
                  cursor-pointer group transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-[#00ff00]" />
                  <span className="text-gray-300">
                    {formData.selfie ? formData.selfie.name : 'Upload Selfie'}
                  </span>
                </div>
                <Upload className="w-4 h-4 text-[#00ff00] group-hover:translate-y-[-2px] transition-transform" />
              </label>
            </div>
          </div>

          <div className="bg-black/40 rounded-lg p-4 border border-[#00ff00]/20">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#00ff00] mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-gray-300">Verification Requirements:</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>Government-issued ID (Passport, Driver's License)</li>
                  <li>Clear selfie photo showing your face</li>
                  <li>Files must be less than 5MB</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 
              px-6 py-3 rounded-lg bg-[#00ff00]/10 hover:bg-[#00ff00]/20
              border-2 border-[#00ff00]/50 text-[#00ff00] font-medium
              transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            <span>Submit for Verification</span>
          </button>
        </form>
      )}

      {step === 'pending' && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="w-12 h-12 text-[#00ff00] animate-spin" />
          <p className="text-gray-300">Verifying your identity...</p>
        </div>
      )}

      {step === 'complete' && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00ff00]/20 blur-xl rounded-full"></div>
            <CheckCircle2 className="relative w-16 h-16 text-[#00ff00] animate-bounce" />
          </div>
          <div className="text-center">
            <h3 className="text-[#00ff00] font-semibold text-lg">Verification Complete!</h3>
            <p className="text-gray-400 text-sm">Your ImReal profile has been verified</p>
          </div>
        </div>
      )}
    </div>
  );
}