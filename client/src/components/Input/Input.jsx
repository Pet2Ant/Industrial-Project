import React from "react";
import { useState, useRef } from "react";
import { IoMail } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { IoPhonePortrait } from "react-icons/io5";
import PhoneInputComponent from "./PhoneInput";
import PasswordInputComponent from "./PasswordInput";
import "./Input.css";

const Input = ({ name, setName, placeholder, type, iconName, id }) => {

  function useInput(name, type, placeholder) {
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(true);
    const inputRef = useRef(null);

    const handleChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setValue(inputValue);
    };

    const toggleVisibility = () => {
      setVisible(!visible);
      // Use the current property of the ref to access the input element
      inputRef.current.type = visible ? "text" : type;
    };

    return {
      name,
      type,
      placeholder,
      value,
      visible,
      inputRef,
      handleChange,
      toggleVisibility,
    };
  }

  // An object that maps the iconName to the icon component
  const icons = {
    IoMail: <IoMail className="text-white" />,
    IoPerson: <IoPerson className="text-white" />,
    IoLockClosed: <IoLockClosed className="text-white" />,
    IoPhonePortrait: <IoPhonePortrait className="text-white" />,
    IoLockClosedSharp: <IoLockClosed className="text-white" />,
  };

  // A function that returns the icon component based on the iconName
  function getIcon(iconName) {
    return icons[iconName] || <IoPerson className="text-white" />;
  }

  const inputProps = useInput(name, type, placeholder);
  console.log(inputProps.handleChange);


  return (
    <div className="flex flex-col justify-center w-screen sm:px-0 px-8 ">
      <label
        className="mt-4 ml-4 text-left text-sm font-bold text-white"
        htmlFor={name}
      >
        {name}
      </label>
      <div className="flex flex-row gap-3 items-center ">
        {/* get the icon component */}
        {getIcon(iconName)}

        {name === "Phone" ? (
          <PhoneInputComponent
            name={name}
            setName={setName}
            value={inputProps.value}
            setValue={inputProps.handleChange}
            onChange={inputProps.handleChange}
            placeholder={placeholder}
          />
        ) : type === "password" ? (
          <PasswordInputComponent
            name={name}
            value={inputProps.value}
            onChange={inputProps.handleChange}
            placeholder={placeholder}
            visible={inputProps.visible}
            toggleVisibility={inputProps.toggleVisibility}
            inputRef={inputProps.inputRef}
          />
        ) : (
          <input
            className="xl:w-96 py-1 pl-2 my-2 text-sm w-full text-gray-400 bg-transparent border-b border-white outline-none hover:-translate-y-1 ease-in-out duration-500"
            type={type}
            autoFocus={name === "Name" ? true : false}
            name={name}
            id={id}
            placeholder={placeholder}
            value={inputProps.value}
            onChange={inputProps.handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Input;