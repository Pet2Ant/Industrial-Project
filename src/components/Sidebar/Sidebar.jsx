import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Twirl as Hamburger } from "hamburger-react";

const Sidebar = ({ onCategoryChange }) => {
  const [navVisible, setNavVisible] = useState(false);

  const categories = [
    "Personal Details",
    "Education",
    "Work Experience",
    "Seminars & Certified Courses",
    "Projects & Volunteering",
    "Technical Skills",
    "Hobbies",
  ];


  // Close the sidebar when the user clicks outside of it
  useEffect(() => {
    const closeSidebar = (event) => {
      if (!event.target.closest('.sidebar') && !event.target.closest('.toggle-button') && navVisible) {
        setNavVisible(false);
      }
    };

    // Close the sidebar when the user presses the escape key
    const closeSidebarOnEscape = (event) => {
      if (event.key === 'Escape' && navVisible) {
        setNavVisible(false);
      }
    };

    window.addEventListener('click', closeSidebar);
    window.addEventListener('keydown', closeSidebarOnEscape);

    return () => {
      window.removeEventListener('click', closeSidebar);
      window.removeEventListener('keydown', closeSidebarOnEscape);
    };
  }, [navVisible]);

  return (
    <div
      className={`z-50 fixed right-0 top-28 bg-transparent rounded-2xl border border-gray-200 shadow-lg transform transition-transform duration-500 ease-in-out ${
        navVisible ? "" : "translate-x-full"
      } sidebar`}
    >
      <div
        className="absolute opacity-95 -left-4  cursor-pointer bg-[#143727] text-[#FFCF07] text-lg leading-10  rounded-md border border-1 border-gray-500 shadow-md transform -translate-x-full transition-colors duration-300 ease-in-out toggle-button"
        onClick={() => {
          setNavVisible(!navVisible);
        }}
      >
        {navVisible ? <Hamburger size={24} toggled={navVisible} toggle={setNavVisible} direction="left" /> : <Hamburger size={24} toggled={navVisible} toggle={setNavVisible} direction="Right" />}
        </div>
      <div className="text-lg w-full opacity-95 overflow-hidden bg-[#143727] shadow-md border border-gray-500 rounded-l-xl">
        {categories.map((category) => (
          <button
            className="block m-2 text-[#FFCF07] items-left hover:scale-105 duration-500 px-2 ease-in-out text-center font-noi leading-relaxed"
            key={category}
            onClick={() => {
              onCategoryChange(category);
              setNavVisible(false);
            }}
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
