import React from "react";
import { useState } from "react";
import { IoMail } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { IoPhonePortrait } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


const Input = ({ name, setName, placeholder, type, iconName, id }) => {
  const [inputName, setInputName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setInputName(inputValue);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);

    if (id === "password" && type === "password" && showPassword) {
      console.log("showPassword is true");
      document.getElementById("password").type = "text";
    } else if (id === "password" && type === "password" && !showPassword) {
      console.log("showPassword is false");
      document.getElementById("password").type = "password";
    }
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);

    if (id === "confirmPassword" && type === "password" && showConfirmPassword) {
        console.log("showConfirmPassword is true");
        document.getElementById("confirmPassword").type = "text";
        } else if (id === "confirmPassword" && type === "password" && !showConfirmPassword) {
        console.log("showConfirmPassword is false");
        document.getElementById("confirmPassword").type = "password";
        }

  };

  return (
    <div className="flex flex-col justify-center mx-auto ">
      <label
        className="mt-4 text-left text-sm font-bold text-white"
        htmlFor={name}
      >
        {name}
      </label>
      <div className="flex flex-row gap-3 items-center">
        {iconName === "IoMail" ? (
          <IoMail className="text-white" />
        ) : iconName === "IoPerson" ? (
          <IoPerson className="text-white" />
        ) : iconName === "IoLockClosed" ? (
          <IoLockClosed className="text-white" />
        ) : iconName === "IoPhonePortrait" ? (
          <IoPhonePortrait className="text-white" />
        ) : (
          <IoPerson className="text-white" />
        )}

        <input
          className="sm:w-96 py-1 pl-2 my-2 text-sm w-full min-w-24 text-gray-400 bg-transparent border-b border-white focus:outline-none hover:-translate-y-1 ease-in-out duration-500 "
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={inputName}
          onChange={handleChange}
        />
        <div className="">
          {/* If iconName= ioLockClosed, Display IoEyeOff icon if pressed, display IoEye if not pressed*/}
          {iconName === "IoLockClosed" ? (
            showPassword ? (
              <IoEyeOff
                className="text-white select-none"
                onClick={handleShowPassword}
              />
            ) : (
              <IoEye
                className="text-white select-none"
                onClick={handleShowPassword}
              />
            )
          ) : iconName === "IoLockClosedSharp" ? (
            showConfirmPassword ? (
              <IoEyeOff
                className="text-white select-none"
                onClick={handleShowConfirmPassword}
              />
            ) : (
              <IoEye
                className="text-white select-none"
                onClick={handleShowConfirmPassword}
              />
            )
          ) : (
            <IoPerson className="text-[#143727] select-none" />
          )}
          


        </div>
      </div>
    </div>
  );
};

export default Input;
