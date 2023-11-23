// RadioButton.js
import React from "react";

// Custom component for radio button
function RadioButton({ id, value, name, label, checked, onChange }) {
  return (
    <div className="w-full">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="opacity-0 w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
      />
      <label
        for={id}
        className={`flex cursor-pointer bg-gray-300 justify-center items-center h-10 w-full ${
          checked ? "bg-rose-500 text-white" : ""
        } text-[17px] text-sm font-medium ease-linear transition-all duration-150 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500 rounded-xl`}
      >
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
