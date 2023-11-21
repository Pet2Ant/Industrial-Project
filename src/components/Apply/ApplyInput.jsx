import React from "react";
import { useState } from "react";

const Input = ({ name, setName, placeholder, type, id }) => {
  const [inputName, setInputName] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setInputName(inputValue);
  };

  return (
      <input
        className="w-full h-12 pl-4 py-1 my-2 text-sm text-yellow-200 bg-[#A19868] rounded-2xl border border-black focus:outline-none hover:-translate-y-1 hover:translate-x-1 ease-in-out duration-500 placeholder-yellow-900 break-words overflow-wrap-break-word"
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