import React, { useState } from 'react';
import { TaskList } from './components/TaskList';
import { CategorySelection } from './components/CategorySelection';
import { UserTypeSelection } from './components/UserTypeSelection';
import { VehicleCheck } from './components/VehicleCheck';
import { VehicleProfile } from './components/VehicleProfile';
import { FinalizePact } from './components/FinalizePact';
import { AccountSetup } from './components/AccountSetup';
import type { VehicleDetails } from './types/vehicle';

type ItemCategory = 'Car' | 'Jewelry' | 'Clothes' | 'Electronics' | 'Other';
type UserType = 'Buyer' | 'Seller' | null;

interface FormState {
  selectedCategory: ItemCategory | null;
  otherSpecification: string;
  userType: UserType;
  completedTasks: number[];
  isLoading: boolean;
  loadingComplete: boolean;
  vehiclePlate?: string;
  vehicleDetails?: VehicleDetails | null;
  vehicleConfirmed?: boolean;
  pactCreated: boolean;
}

// Mock vehicle data
const MOCK_VEHICLE: VehicleDetails = {
  artEndDate: "2025-02-28",
  co2Emissions: 135,
  colour: "BLUE",
  engineCapacity: 2494,
  fuelType: "PETROL",
  make: "ROVER",
  markedForExport: false,
  monthOfFirstRegistration: "2004-12",
  motStatus: "No details held by DVLA",
  registrationNumber: "ABC1234",
  revenueWeight: 1640,
  taxDueDate: "2007-01-01",
  taxStatus: "Untaxed",
  typeApproval: "N1",
  wheelplan: "NON STANDARD",
  yearOfManufacture: 2004,
  euroStatus: "EURO 6 AD",
  realDrivingEmissions: "1",
  dateOfLastV5CIssued: "2016-12-25"
};

function App() {
  const [formState, setFormState] = useState<FormState>({
    selectedCategory: null,
    otherSpecification: '',
    userType: null,
    completedTasks: [],
    isLoading: false,
    loadingComplete: false,
    vehiclePlate: '',
    vehicleDetails: null,
    vehicleConfirmed: false,
    pactCreated: false
  });

  const handleVehicleCheck = (plate: string) => {
    setFormState(prev => ({ 
      ...prev, 
      isLoading: true,
      vehiclePlate: plate 
    }));

    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev,
        isLoading: false,
        loadingComplete: true,
        vehicleDetails: MOCK_VEHICLE,
        completedTasks: [...new Set([...prev.completedTasks, 2])]
      }));
    }, 1500);
  };

  const handleVehicleConfirm = (confirmed: boolean) => {
    setFormState(prev => ({
      ...prev,
      vehicleConfirmed: confirmed,
      loadingComplete: false
    }));
  };

  const handleFinalizePact = () => {
    setFormState(prev => ({
      ...prev,
      pactCreated: true
    }));
  };

  if (formState.pactCreated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="relative backdrop-blur-xl bg-black/80 rounded-3xl border border-[#00ff00]/20 shadow-lg shadow-[#00ff00]/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/10 to-transparent pointer-events-none"></div>
            <div className="relative px-6 py-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">
                    Let's Build a <span className="text-[#00ff00]">Pact</span>
                  </h1>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-gray-400 text-sm">Connect ImReal account to claim</p>
                </div>
                <div className="bg-black/40 rounded-xl p-8 border border-[#00ff00]/20 flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#00ff00]/20 blur-xl rounded-full"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full text-[#00ff00] animate-bounce" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#00ff00] font-semibold text-xl">Pact Created</h3>
                </div>
                <AccountSetup userType={formState.userType as 'Buyer' | 'Seller'} onComplete={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="relative backdrop-blur-xl bg-black/80 rounded-3xl border border-[#00ff00]/20 shadow-lg shadow-[#00ff00]/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/10 to-transparent pointer-events-none"></div>
          <div className="relative px-6 py-8">
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                  Let's Build a <span className="text-[#00ff00]">Pact</span>
                </h1>
              </div>
              
              <TaskList 
                tasks={[
                  "Choose your role",
                  `Select what you're ${formState.userType === 'Buyer' ? 'buying' : 'selling'}`,
                  ...(formState.selectedCategory === 'Car' ? ["Check vehicle history"] : []),
                  "Finalize pact"
                ]}
                completedTasks={formState.completedTasks}
                onToggleTask={() => {}}
              />

              <div className="space-y-8 transition-all duration-500">
                <UserTypeSelection 
                  userType={formState.userType}
                  onSelectUserType={(type) => {
                    setFormState(prev => ({
                      ...prev,
                      userType: type,
                      completedTasks: type ? [...new Set([...prev.completedTasks, 0])] : prev.completedTasks.filter(t => t !== 0)
                    }));
                  }}
                />

                {formState.userType && (
                  <CategorySelection 
                    categories={['Car', 'Jewelry', 'Clothes', 'Electronics', 'Other']}
                    selectedCategory={formState.selectedCategory}
                    onSelectCategory={(category) => {
                      setFormState(prev => ({
                        ...prev,
                        selectedCategory: category,
                        completedTasks: category ? [...new Set([...prev.completedTasks, 1])] : prev.completedTasks.filter(t => t !== 1)
                      }));
                    }}
                    otherSpecification={formState.otherSpecification}
                    onOtherSpecificationChange={(value) => setFormState(prev => ({ ...prev, otherSpecification: value }))}
                    userType={formState.userType}
                  />
                )}

                {formState.selectedCategory === 'Car' && !formState.loadingComplete && !formState.vehicleConfirmed && (
                  <VehicleCheck onCheck={handleVehicleCheck} isLoading={formState.isLoading} />
                )}

                {formState.loadingComplete && formState.vehicleDetails && !formState.vehicleConfirmed && (
                  <VehicleProfile 
                    vehicle={formState.vehicleDetails} 
                    onConfirm={handleVehicleConfirm}
                  />
                )}

                {((formState.selectedCategory && formState.selectedCategory !== 'Car') || formState.vehicleConfirmed) && (
                  <FinalizePact
                    vehicle={formState.vehicleDetails}
                    onSubmit={handleFinalizePact}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;