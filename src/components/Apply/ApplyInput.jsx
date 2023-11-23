import React from "react";
import { useState } from "react";

const Input = ({ name, setName, placeholder, type, id }) => {
  const [inputName, setInputName] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setInputName(inputValue);
  };
// 
  return (
      <input
      className="flex bg-gray-300 justify-center items-center h-10 w-full h-12 pl-4 py-1 my-2 rounded-2xl border border-black focus:outline-none hover:-translate-y-1 hover:translate-x-1 text-black text-[17px] text-sm font-medium ease-linear transition-all duration-150 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500 rounded-xl"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={inputName}
        onChange={handleChange}
        contentEditable="true"
      />
  );
};

export default Input;