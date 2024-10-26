interface CategorySelectionProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  otherSpecification: string;
  onOtherSpecificationChange: (value: string) => void;
  userType: string | null;
}

export function CategorySelection({
  categories,
  selectedCategory,
  onSelectCategory,
  otherSpecification,
  onOtherSpecificationChange,
  userType
}: CategorySelectionProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-center">
        What {userType === 'Buyer' ? 'are you buying' : 'is being sold'}?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category === selectedCategory ? null : category)}
            className={`
              px-4 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-300 transform hover:scale-[1.02] active:scale-95
              border-2
              ${selectedCategory === category 
                ? 'border-[#00ff00] text-[#00ff00] bg-[#00ff00]/10' 
                : 'border-gray-700 hover:border-[#00ff00]/50 hover:text-[#00ff00]/50'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory === 'Other' && (
        <div className="mt-3">
          <input
            type="text"
            value={otherSpecification}
            onChange={(e) => onOtherSpecificationChange(e.target.value)}
            placeholder="Specify item category..."
            className="w-full px-4 py-2.5 bg-black/50 border-2 border-gray-700 rounded-lg
              focus:border-[#00ff00] focus:outline-none text-white placeholder-gray-500
              transition-all duration-300 text-sm"
          />
        </div>
      )}
    </div>
  );
}