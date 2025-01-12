import React, { useState } from 'react';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];
    
    // Update local state first
    setSelectedCategories(newCategories);
    
    // Then call the parent component's callback
    onCategoryChange(newCategories);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-start items-center mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`
            px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
            text-sm font-medium uppercase
            ${selectedCategories.includes(category) 
              ? 'bg-[#292929] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;