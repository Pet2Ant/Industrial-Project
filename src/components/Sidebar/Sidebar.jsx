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
      className={`fixed right-0 top-28 bg-transparent rounded-2xl border border-gray-200 shadow-lg transform transition-transform duration-500 ease-in-out ${
        navVisible ? "" : "translate-x-full"
      } `}
    >
      <div
        className="absolute opacity-95 -left-4 sm:py-0 py-2 cursor-pointer bg-[#143727] text-[#FFCF07] text-lg leading-10 px-3 rounded-md border border-1 border-gray-500 shadow-md transform -translate-x-full transition-colors duration-300 ease-in-out"
        onClick={() => {
          setNavVisible(!navVisible);
        }}
      >
        {showMenuOrArrow()}
      </div>
      <div className="text-lg w-full opacity-95 overflow-hidden bg-[#143727] shadow-md border border-gray-500 rounded-l-xl">
        {categories.map((category) => (
          <button
            className="block m-2 text-[#FFCF07] items-left hover:scale-105 duration-500 px-2 ease-in-out text-center font-noi leading-relaxed"
            key={category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
        <div
          className="absolute top-0 right-0 mr-4 mt-4 text-white sm:hidden block"
          onClick={() => setNavVisible(!navVisible)}
        >
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
