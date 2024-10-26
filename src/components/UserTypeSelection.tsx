interface UserTypeSelectionProps {
  userType: string | null;
  onSelectUserType: (type: string | null) => void;
}

export function UserTypeSelection({ userType, onSelectUserType }: UserTypeSelectionProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-center">I am</h2>
      <div className="grid grid-cols-2 gap-3">
        {(['Buyer', 'Seller'] as const).map((type) => (
          <button
            key={type}
            onClick={() => onSelectUserType(type === userType ? null : type)}
            className={`
              px-4 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-300 transform hover:scale-[1.02] active:scale-95
              border-2
              ${userType === type 
                ? 'border-[#00ff00] text-[#00ff00] bg-[#00ff00]/10' 
                : 'border-gray-700 hover:border-[#00ff00]/50 hover:text-[#00ff00]/50'}
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}