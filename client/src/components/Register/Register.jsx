import React, { useState, useEffect } from 'react';
import logo from "../assets/images/WeLeadLogo.png";
import people from "../assets/images/people.jpg";
import Button from "../Button/Button";
import Input from "../Input/Input";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register({setIsLoading}) {
  const [data,setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/data")
    .then(response => setData (response.data));
    },[]);
    const createData = async () => {
      console.log('Register button clicked');
      console.log('Data to send:', { username, email, phone, password });
      setIsLoading(true);
      try {
        const response = await axios.post('/api/data', { username, email, phone, password });
        console.log('Response from server:', response);
        setData([...data, response.data]);
      } catch (error) {
        console.log('There was an error!', error);
      }
      setIsLoading(false);
      navigate("/login");
    };
   
  return (
    <div className="bg-[#143727] h-screen min-h-screen max-h-screen ">
      <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen">
        <div className="flex flex-col items-center gap-6 h-screen px-6 ">
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
        <form className="scrollbar-hide flex flex-col pr-12 w-full sm:w-[28rem] overflow-y-auto overflow-x-hidden h-screen py-12">
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
          {/* <Button buttonName="Register" onClick={() => console.log('Button clicked')} /> */}
          <Button buttonName="Register" onClick={createData} />
        </form>
      </div>
    </div>
  );
}

export default Register;
