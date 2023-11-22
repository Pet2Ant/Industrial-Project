import React from "react";

const Button = ({ buttonName, onClick }) => {
  return (
    <button className="bg-[#FFCF07] w-full py-2.5 text-[#143727] 
                       text-xl font-bold rounded-full text-center mt-8 h-12 mx-auto focus:outline-none focus:shadow-outline 
                       hover:bg-[#C29F09] hover:transition hover:scale-105 duration-500 ease-in-out">
      {buttonName}
    </button>
  );
};

export default Button;
