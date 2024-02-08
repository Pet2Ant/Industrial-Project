import React from "react";

const Button = ({ buttonName, onClick, type, className, id }) => {
  return (
    <button 
    onClick={onClick}
    type={type}
    id={id}
    className={`${className} bg-[#8D93D9] md:w-1/4 w-1/2 p-2 mb-4 text-[#143727] flex justify-center
                       text-lg font-bold rounded-full text-center mt-10 px-2  focus:outline-none focus:shadow-outline break-all
                       hover:text-green-800 hover:transition-all hover:scale-105 duration-700 ease-in-out`}>
      {buttonName}
    </button>
  );
};

export default Button;
