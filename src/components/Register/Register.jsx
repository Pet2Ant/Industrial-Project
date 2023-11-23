import React from "react";
import { useState } from "react";
import logo from "../assets/images/WeLeadLogo.png";
import people from "../assets/images/people.jpg";
import Button from "../Button/Button";
import Input from "../Input/Input";
function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    console.log("registering user");
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          alert(json.error);
        } else {
          alert("User registered");
        }
      });
    console.log(
      "Registering",
      email,
      username,
      password,
      confirmPassword,
      phone
    );
  };
  return (
    <div className="bg-[#143727] h-screen min-h-screen max-h-screen">
      <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen">
        <div className="flex flex-col items-center gap-6 h-screen px-6">
          <a
            href="https://joinwelead.org/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="hidden md:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
            />
          </a>
          <img
            src={people}
            alt="registerPicture"
            className="hidden md:block object-cover rounded-3xl h-5/6"
          />
        </div>

        {/* Register form */}
        <form className="flex flex-col pr-12 w-full sm:w-[28rem] overflow-y-auto overflow-x-hidden h-screen py-12">
          <a
            href="https://joinwelead.org/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="sm:hidden block object-scale-down h-16"
            />
          </a>
          <h1 className="text-3xl font-bold sm:text-left text-center text-white">
            Sign up
          </h1>
          <p className="text-white mt-6 mb-12 sm:text-left text-center w-full">
            If you already have an account,&nbsp;
            <a
              href="/login"
              className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
            >
              log in here!
            </a>
          </p>
          <div className="flex flex-col items-center justify-center relative sm:min-w-fit w-full mx-auto">
            <Input
              name="Username"
              setName={setUsername}
              placeholder="Enter your Username"
              type="text"
              iconName="IoPerson"
              id="username"
            />
            <Input
              name="Email"
              setName={setEmail}
              placeholder="Enter your Email"
              type="email"
              iconName="IoMail"
              id="email"
            />
            <Input
              name="Phone"
              setName={setPhone}
              placeholder="Enter your Phone Number"
              type="phone"
              iconName="IoPhonePortrait"
              id="phone"
            />
            <Input
              name="Password"
              setName={setPassword}
              placeholder="Enter your Password"
              type="password"
              iconName="IoLockClosed"
              id="password"
            />
            <Input
              name="Confirm Password"
              setName={setConfirmPassword}
              placeholder="Confirm your Password"
              type="password"
              iconName="IoLockClosedSharp"
              id="confirmPassword"
            />
          </div>
          <Button buttonName="Register" onClick={handleRegister} />
        </form>
      </div>
    </div>
  );
}

export default Register;
