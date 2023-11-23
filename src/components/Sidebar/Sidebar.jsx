import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Sidebar = ({ onCategoryChange }) => {
  const [navVisible, setNavVisible] = useState(true);

  const categories = [
    "Personal Details",
    "Education",
    "Work Experience",
    "Seminars & Certified Courses",
    "Projects & Volunteering",
    "Technical Skills",
    "Hobbies",
  ];

  // navVisible ? "← MENU" : "MENU →" and if mobile screen show ← or →
  function showMenuOrArrow() {
    if (window.innerWidth < 640) {
      return navVisible ? <FaArrowLeft /> : <FaArrowRight />;
    } else {
      return navVisible ? (
        <div className="flex flex-row justify-center items-center gap-2">
          <FaArrowLeft /> MENU
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-2">
          MENU <FaArrowRight />
        </div>
      );
    }
  }

  return (
    <div
      className={`fixed right-0 top-28 bg-white rounded-md border border-gray-200 shadow-md transform transition-transform duration-500 ease-in-out ${
        navVisible ? "" : "translate-x-full"
      } `}
    >
      <div
        className="absolute -left-4 sm:py-0 py-2 cursor-pointer bg-[#e5e5e5] text-[#FFCF07] text-lg leading-10 px-3 rounded-md border border-1 border-gray-500 shadow-md transform -translate-x-full transition-colors duration-300 ease-in-out"
        onClick={() => {
          setNavVisible(!navVisible);
        }}
      >
        {showMenuOrArrow()}
      </div>
      <div className="text-lg w-full overflow-hidden bg-[#e5e5e5] shadow-md border border-gray-500 rounded-lg">
        {categories.map((category) => (
          <button
            className="block m-2 hover:text-[#FFCF07] items-left hover:scale-105 duration-500 px-2 ease-in-out text-center font-noi leading-relaxed"
            key={category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
        <div
          className="absolute top-0 right-0 mr-4 mt-4 sm:hidden block"
          onClick={() => setNavVisible(!navVisible)}
        >
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
