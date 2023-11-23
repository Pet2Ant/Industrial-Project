import React, { useState } from 'react';
import { useSpring, animated } from "react-spring";


const Sidebar = ({ onCategoryChange }) => {
  const [sidebar, setSidebar] = useState(true);

  const categories = [
    'Personal Details',
    'Education',
    'Work Experience',
    'Seminars & Certified Courses',
    'Projects & Volunteering',
    'Technical Skills',
    'Hobbies',
  ];

  const animationProps = useSpring({
    // animated for open and close
    transform: sidebar ? "translateX(0%)" : "translateX(-100%)",
    opacity: sidebar ? 1 : 0,
    config: {
      duration: 300,
    },
  });

  // set sidebar width to 32 when hovered
  const expandsidebar = () => {
    if (sidebar) {
      document.getElementById("sidebar").classList.remove("w-16");
      document.getElementById("sidebar").classList.add("w-64");
    }
  };

  // set sidebar width to 64 when not hovered
  const shrinksidebar = () => {
    if (sidebar) {
      document.getElementById("sidebar").classList.remove("w-64");
      document.getElementById("sidebar").classList.add("w-16");
    }
  };


  return (
    <animated.div
    onMouseEnter={() => expandsidebar()}
    onMouseLeave={() => shrinksidebar()}
    style={animationProps}
    id="sidebar"
    className="flex flex-col items-center w-16 md:w-32 lg:w-64 xl:w-90 pt-24 space-y-4 overflow-hidden text-[#143727] bg-[#8D93D9] fixed left-0 top-0 bottom-0 overflow-y-auto transition-all duration-300 ease-in-out"
  >
      {categories.map((category) => (
        <button 
          className='hover:text-[#FFCF07] hover:scale-105 duration-500 px-2 ease-in-out text-center font-noi text-sm md:text-md lg:text-xl xl:text-3xl 2xl:text-4xl leading-relaxed'
        key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </animated.div>
  );
};

export default Sidebar;
