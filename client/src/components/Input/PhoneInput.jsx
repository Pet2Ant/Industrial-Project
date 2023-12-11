import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { IoPerson } from "react-icons/io5";

function PhoneInputComponent({ setName, value, placeholder}) {
  return (
    <>
      <PhoneInput
        containerClass="select-none text-transparent xl:w-96  w-full flex flex-row items-center justify-start lg:justify-center gap-3 "
        inputClass="xl:w-96 w-full text-sm py-1 pl-2 my-2 text-gray-400 bg-transparent border-b border-white outline-none hover:-translate-y-1 ease-in-out duration-500"
        inputProps={{
          setName,
          required: true,
        }}
        countryOptionsOrder={["GR"]}
        onChange={(e) => {
            setName(e);
            
        }}
        value={value}
        placeholder={placeholder}
        enableSearch={true}
        disableSearchIcon={true}
        country={"gr"}
        disableDropdown={true}
      />
      <IoPerson className="text-[#143727] select-none" />
    </>
  );
}

export default PhoneInputComponent;
