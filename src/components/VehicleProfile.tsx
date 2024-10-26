import React from 'react';
import { Car, Calendar, Fuel, Scale, AlertCircle } from 'lucide-react';
import type { VehicleDetails } from '../types/vehicle';

interface VehicleProfileProps {
  vehicle: VehicleDetails;
  onConfirm: (confirmed: boolean) => void;
}

export function VehicleProfile({ vehicle, onConfirm }: VehicleProfileProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#00ff00]">Is this the vehicle being purchased?</h2>
        <p className="text-sm text-gray-400 mt-1">Please verify the vehicle details</p>
      </div>

      <div className="bg-black/40 rounded-xl p-6 border border-[#00ff00]/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{vehicle.make}</h3>
            <span className="text-[#00ff00] font-mono">{vehicle.registrationNumber}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#00ff00]" />
              <span className="text-sm">{vehicle.yearOfManufacture}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vehicle.colour.toLowerCase() }} />
              <span className="text-sm">{vehicle.colour}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="w-4 h-4 text-[#00ff00]" />
              <span className="text-sm">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-[#00ff00]" />
              <span className="text-sm">{vehicle.engineCapacity}cc</span>
            </div>
          </div>

          <div className="border-t border-[#00ff00]/10 pt-4 mt-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-[#00ff00] mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">MOT Status:</span> {vehicle.motStatus}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tax Status:</span> {vehicle.taxStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onConfirm(false)}
          className="px-6 py-3 rounded-lg border-2 border-gray-700 
            hover:border-red-500/50 hover:text-red-500/50
            transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          No
        </button>
        <button
          onClick={() => onConfirm(true)}
          className="px-6 py-3 rounded-lg bg-[#00ff00]/10 
            border-2 border-[#00ff00]/50 text-[#00ff00]
            hover:bg-[#00ff00]/20
            transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          Yes
        </button>
      </div>
    </div>
  );
}