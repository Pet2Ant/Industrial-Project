import React, { useState } from 'react';


const Sidebar = ({ onCategoryChange }) => {
  const categories = [
    'Personal Details',
    'Education',
    'Work Experience',
    'Seminars & Certified Courses',
    'Projects & Volunteering',
    'Technical Skills',
    'Hobbies',
  ];

  return (
    <div className="flex flex-col mb-auto mt-auto space-y-9 text-[#143727]">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
