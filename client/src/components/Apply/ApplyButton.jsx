import React from "react";

const Button = ({ id, buttonName, onClick }) => {
  return (
    <button
    id="save"
      onClick={onClick}
      className="bg-[#FFCF07] w-full py-2.5 text-[#143727] 
                       text-xl font-bold rounded-full text-center mt-4 px-2 mx-auto focus:outline-none focus:shadow-outline 
                       hover:bg-[#C29F09] hover:transition hover:scale-105 duration-500 ease-in-out"
    >
      {buttonName}
    </button>
  );
};

export default Button;
