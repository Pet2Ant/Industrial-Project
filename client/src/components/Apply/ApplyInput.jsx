import React, { useState, useEffect } from "react";
import { COUNTRIES } from "./ApplyForm/Countries/countries";
import TextareaAutosize from "react-textarea-autosize";


const ApplyInput = ({ name, setName, placeholder, type, id, handleWorkChange, initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setInputValue(inputValue);
    if (name === "workPlace" || name === "seminar" || name === "volunteer") {
      handleWorkChange(e);
    }
  };

  useEffect(() => {
    switch (id) {
      case "name":
      case "surname":
        setError(
          inputValue.length < 2
            ? "This field must contain at least 2 characters."
            : ""
        );
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(
          !emailRegex.test(inputValue)
            ? "Please enter a valid email address."
            : ""
        );
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        setError(
          !phoneRegex.test(inputValue)
            ? "Please enter a valid 10-digit phone number."
            : ""
        );
        break;
        case "year":
          const yearRegex = /^(19|20)\d{2}$/;
          const currentYear = new Date().getFullYear();
          setError(
            !yearRegex.test(inputValue) || inputValue > currentYear
              ? "Please enter a valid year."
              : ""
          );
          break;
      case "country":
        setError(
          COUNTRIES.filter((country) => country.title.toLowerCase() === inputValue.toLowerCase()).length < 1 ||
            inputValue.length < 3
            ? "Please enter a valid country."
            : ""
        );
        break;
      case "city":
      case "school-name":
      case "school-location":
      case "degree-name":
      case "thesis-title":
      case "dissertation-title":
      case "responsibilities":
      case "technicalSkills":
      case "workPlace":
        setError(
          inputValue.length < 3
            ? "This field must contain at least 3 characters."
            : ""
        );
        break;
      default:
        setError("");
    }
  }, [inputValue, type]);

  return (
    <div className="flex flex-col mx-auto w-full">
      <TextareaAutosize
        className={`flex bg-gray-300 justify-center items-center w-full px-4 py-1 my-2 rounded-2xl border ${
          error ? "border-red-500" : "border-gray-400"
        } shadow-xl focus:outline-none hover:-translate-y-1 hover:translate-x-1 text-black text-[17px] text-sm font-medium ease-linear transition-all duration-150 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500 focus:ring-offset-2 focus:ring-2 focus:ring-rose-500`}
        minRows={2}
        maxRows={6}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        contentEditable="true"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ApplyInput;
