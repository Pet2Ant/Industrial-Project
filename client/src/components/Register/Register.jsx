import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/WeLeadLogo.png";
import people from "../assets/images/people.jpg";
import Button from "../Button/Button";
import Input from "../Input/Input";
import axios from "axios";
import Popup from "../Popup/Popup";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
function isValidJwt(jwt) {
  if (!jwt) {
      console.log('JWT is null or undefined');
      return false;
  }

  const parts = jwt.split('.');
  if (parts.length !== 3) {
      console.log('JWT does not contain exactly 2 periods');
      return false;
  }
  return true;
}
function Register({setIsLoading}) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  
  
  const createData = async () => {
    setIsLoading(true);
   
    try {
     //commit
      const response = await axios.post('http://localhost:8080/api/data', { username, email, phone, password });

      const jwt = response.data.token;
      console.log('JWT:', jwt);
      if (!localStorage.getItem('token') && isValidJwt(jwt))  {
        localStorage.setItem('token', jwt);
        setData([...data, response.data]);
        Popup({
          title: 'Success!',
          text: 'You have successfully registered!',
          icon: 'success',
          timer: 500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log('There was an error!', error);
      Popup({
        title: 'Error!',
        text: 'There was an error registering your account.',
        icon: 'error',
        timer: 500,
        showConfirmButton: false,
      });
    }
    setIsLoading(false);
    navigate("/login");
    
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
          {/* <Button buttonName="Register" onClick={() => console.log('Button clicked')} /> */}
          <Button buttonName="Register" onClick={createData} />
        </form>
      </div>
    </div>
  );
}


export default Register;
