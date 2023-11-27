import React from "react";

const Button = ({ buttonName, onClick }) => {
  return (
    <button  onClick={onClick} className="bg-[#FFCF07] w-full py-2.5 text-[#143727] flex justify-center
                       text-sm rounded-full text-center mt-8 focus:outline-none focus:shadow-outline 
                       hover:bg-[#C29F09] hover:transition hover:scale-105 duration-500 ease-in-out ">
      {buttonName}
    </button>
  );
};

export default Button;
