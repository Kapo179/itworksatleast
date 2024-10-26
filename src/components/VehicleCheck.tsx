import React, { useState } from 'react';
import { Car, Search } from 'lucide-react';

interface VehicleCheckProps {
  onCheck: (plate: string) => void;
}

export function VehicleCheck({ onCheck }: VehicleCheckProps) {
  const [plate, setPlate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheck(plate);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Vehicle History Check</h2>
        <p className="text-sm text-gray-400">Enter the vehicle registration number</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative mx-auto w-48">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/20 via-[#00ff00]/10 to-[#00ff00]/20 rounded-lg blur-md"></div>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            maxLength={7}
            placeholder="AB12 CDE"
            className="relative w-full px-4 py-3 bg-black border-2 border-[#00ff00]/50 rounded-lg
              text-center text-xl font-bold tracking-widest
              placeholder:text-gray-600 focus:outline-none focus:border-[#00ff00]
              transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 
            px-6 py-3 rounded-lg bg-[#00ff00]/10 hover:bg-[#00ff00]/20
            border-2 border-[#00ff00]/50 text-[#00ff00] font-medium
            transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          <Search className="w-4 h-4" />
          <span>Check History</span>
        </button>
      </form>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Car className="w-4 h-4" />
        <span>Powered by Vehicle Database</span>
      </div>
    </div>
  );
}