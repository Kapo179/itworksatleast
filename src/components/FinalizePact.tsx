import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, PoundSterling, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import type { VehicleDetails } from '../types/vehicle';

interface FinalizePactProps {
  vehicle: VehicleDetails;
  onSubmit: () => void;
}

export function FinalizePact({ vehicle, onSubmit }: FinalizePactProps) {
  const [price, setPrice] = useState('');
  const [issues, setIssues] = useState('');
  const [protectPact, setProtectPact] = useState(false);
  const [serviceRecord, setServiceRecord] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#00ff00]">Finalize Your Pact</h2>
        <p className="text-sm text-gray-400 mt-1">Complete the details to proceed</p>
      </div>

      <div className="space-y-4">
        {/* Service Record Upload */}
        <div className="relative">
          <input
            type="file"
            id="serviceRecord"
            className="hidden"
            onChange={(e) => setServiceRecord(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="serviceRecord"
            className="flex items-center justify-center space-x-2 px-6 py-4 rounded-lg
              bg-black/40 border-2 border-dashed border-[#00ff00]/20 hover:border-[#00ff00]/50
              cursor-pointer group transition-all duration-300"
          >
            <Upload className="w-5 h-5 text-[#00ff00]" />
            <span className="text-gray-300">
              {serviceRecord ? serviceRecord.name : 'Upload Service Record'}
            </span>
          </label>
        </div>

        {/* Price Input */}
        <div className="relative">
          <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] w-5 h-5" />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Vehicle Price"
            className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-[#00ff00]/20 rounded-lg
              focus:border-[#00ff00] focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Issues Input */}
        <div className="relative">
          <AlertTriangle className="absolute left-3 top-3 text-[#00ff00] w-5 h-5" />
          <textarea
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
            placeholder="Any known issues with the vehicle?"
            rows={3}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border-2 border-[#00ff00]/20 rounded-lg
              focus:border-[#00ff00] focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Protect Pact Option */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setProtectPact(!protectPact)}
            className="w-full flex items-center justify-between px-6 py-4 rounded-lg
              bg-black/40 border-2 border-[#00ff00]/20 hover:border-[#00ff00]/50
              group transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#00ff00]" />
              <span className="text-gray-300 group-hover:text-[#00ff00]">Protect My Pact</span>
            </div>
            {protectPact ? (
              <CheckCircle2 className="w-5 h-5 text-[#00ff00]" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <p className="text-xs text-gray-500 px-4">
            We will hold onto this digitally signed agreement from both parties, along with your documents.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 
            px-6 py-3 rounded-lg bg-[#00ff00]/10 hover:bg-[#00ff00]/20
            border-2 border-[#00ff00]/50 text-[#00ff00] font-medium
            transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          <span>Create Pact</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}