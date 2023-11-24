import React from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Input = ({ name, setName, placeholder, type, id, handleWorkChange }) => {
  const [inputName, setInputName] = useState("");

  const handleChange = (e) => {
    if (name === "workPlace" || name === "seminar" || name === "volunteer") {
      const inputValue = e.target.value;
      setName(inputValue);
      setInputName(inputValue);
      handleWorkChange(e);
    } else {
      const inputValue = e.target.value;
      setName(inputValue);
      setInputName(inputValue);
    }
  };

  return (
    <TextareaAutosize
      className="flex bg-gray-300 justify-center items-center w-full px-4 py-1 my-2 rounded-2xl border border-gray-400 shadow-xl focus:outline-none hover:-translate-y-1 hover:translate-x-1 text-black text-[17px] text-sm font-medium ease-linear transition-all duration-150 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500"
      minRows={2}
      maxRows={6}
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
