import { IoEye, IoEyeOff } from "react-icons/io5";

// A component that renders a password input with a visibility toggle
function PasswordInputComponent({
  name,
  value,
  onChange,
  placeholder,
  visible,
  toggleVisibility,
  inputRef,
}) {
  return (
    <div className="xl:w-96  w-full flex flex-row items-center justify-start lg:justify-center gap-3">
      <input
        className="xl:w-96 py-1 pl-2 my-2 text-sm w-full text-gray-400 bg-transparent border-b border-white outline-none hover:-translate-y-1 ease-in-out duration-500"
        type="password"
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {visible ? (
        <IoEyeOff
          className="text-white select-none"
          onClick={toggleVisibility}
        />
      ) : (
        <IoEye className="text-white select-none" onClick={toggleVisibility} />
      )}
    </div>
  );
}

export default PasswordInputComponent;