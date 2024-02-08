import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/WeLeadLogo.png";
import people from "../assets/images/people.jpg";
import Button from "../Button/Button";
import Input from "../Input/Input";
import axios from "axios";
import Popup from "../Popup/Popup";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoading }) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const checkEmptyFields = () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      Popup({
        title: "Error!",
        text: "Please fill in all the fields.",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const createData = async () => {
    setIsLoading(true);
    if (!checkEmptyFields()) {
      setIsLoading(false);
      return;
    }
    const role = "user";
    try {
      const response = await axios.post("http://localhost:8080/api/data", {
        username,
        email,
        phone,
        password,
        role,
      });
      const jwt = response.data.token;
      console.log("JWT:", jwt);
      if (!localStorage.getItem("token")) {
        setData([...data, response.data]);
        Popup({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      } 
    setIsLoading(false);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    setIsLoading(false);
    Popup({
      title: "Error!",
      text: error.response.data.message,
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
  }
};
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      Popup({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!email.includes("@") || !email.includes(".")) {
      Popup({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    if (phone.length < 12 && phone.length >= 16) {
      Popup({
        title: "Error!",
        text: "Please enter a valid phone number.",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const validateUsername = () => {
    if (username.length < 4) {
      Popup({
        title: "Error!",
        text: "Please enter a valid username above 4 letters.",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(password)) {
      Popup({
        title: "Error!",
        text: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
        icon: "warning",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const validateFields = () => {
    if (
      !validatePasswords() ||
      !validateEmail() ||
      !validatePhone() ||
      !validateUsername() ||
      !validatePassword()
    ) {
      return false;
    }
    return true;
  };


  return (
    <div className="bg-[#143727] h-screen min-h-screen max-h-screen ">
      <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen">
        <div className="flex flex-col items-center gap-6 h-screen px-6 ">
          <Link
            to="/Login"
            className="flex flex-row items-center justify-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="hidden md:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
            />
          </Link>
          <img
            src={people}
            alt="registerPicture"
            className="hidden md:block object-cover rounded-3xl h-5/6"
          />
        </div>

        {/* Register form */}
        <form className="scrollbar-hide flex flex-col pr-12 w-full sm:w-[28rem] overflow-y-auto overflow-x-hidden h-screen py-12">
          <Link
            to="/Login"
            className="flex flex-row items-center justify-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="sm:hidden block object-scale-down h-16"
            />
          </Link>
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
                placeholder="Username must contain at least 4 letters"
                type="text"
                iconName="IoPerson"
                id="username"
              />
              <Input
                name="Email"
                setName={setEmail}
                placeholder="Please enter a valid email address"
                type="email"
                iconName="IoMail"
                id="email"
              />

            <Input
              name="Phone"
              setName={setPhone}
              placeholder="Please enter a valid phone number (10 digits)"
              type="phone"
              iconName="IoPhonePortrait"
              id="phone"
            />
            <Input
              name="Password"
              setName={setPassword}
              placeholder="Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
              type="password"
              iconName="IoLockClosed"
              id="password"
            />
            <Input
              name="Confirm Password"
              setName={setConfirmPassword}
              placeholder="Passwords need to be identical"
              type="password"
              iconName="IoLockClosedSharp"
              id="confirmPassword"
            />
          </div>
          <Button buttonName="Register" onClick={createData} />
        </form>
      </div>
    </div>
  );
}

export default Register;
