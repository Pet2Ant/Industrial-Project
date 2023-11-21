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
    <div className="flex flex-col mx-auto h-full  space-y-4 text-white font-bold font-bakbak text-3xl leading-relaxed">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
