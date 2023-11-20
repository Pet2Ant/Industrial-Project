import React from "react";
import { useState } from "react";
import login from "../assets/images/login.jpg";
import logo from "../assets/images/WeLeadLogo.png";
import Button from "../Button/Button";
import Input from "../Input/Input";
function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isEmail, setIsEmail] = useState(false);


    const handleLogin = () => {
        console.log("logging in user");
        if (emailOrUsername.includes("@")) {
            setIsEmail(true);
        }
        fetch("http://localhost:3000/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailOrUsername,
                password,
                isEmail,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.error) {
                    alert(json.error);
                } else {
                    alert("User logged in");
                }
            });
        console.log(
            "Logging in", emailOrUsername, password
        );
    };
    return (
        <div className="bg-[#143727] h-screen min-h-screen max-h-screen ">
            <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen overflow-y-auto ">
                <div className="hidden sm:block flex flex-col items-left gap-6 h-screen px-6 ">
                    <a
                        href="https://joinwelead.org/"
                        className="flex flex-row items-center justify-center gap-2 mt-20   sm:mt-50"
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className="hidden sm:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
                        />
                    </a>
                    <img
                        src={login}
                        alt="loginPicture"
                        className="hidden sm:block object-cover rounded-3xl mt-10 h-1/2 w-2/3 ml-auto mr-auto"
                    />
                    <h1 className="text-3xl font-bold sm:text-center text-right  mt-10 text-white">
                        Empowering women to shape the future of  <br /> everything
                    </h1>
                    
                    
                </div>

                {/* Login form */}
                {/* //overflow-y-auto overflow-x-hidden */}
                <form className="flex flex-col pr-12 w-full sm:w-[28rem]  h-screen py-12 mt-40   sm:mt-60">
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
                        Log in
                    </h1>
                    <p className="text-white mt-6 mb-12  text-center w-full sm:hidden  ">
                        If you don't have an account,&nbsp;
                        <a
                            href="/register"
                            className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
                        >
                            register here!
                        </a>
                    </p>
                    <div className="flex flex-col items-center justify-center relative min-w-fit md:min-w-max w-full mx-auto">
                        <Input
                            name=""
                            setName={setEmailOrUsername}
                            placeholder="Enter your email or username here"
                            type="text"
                            iconName="IoPerson"
                            id="username"
                        />
                        <Input
                            name=""
                            setName={setPassword}
                            placeholder="Enter your Password"
                            type="password"
                            iconName="IoLockClosed"
                            id="password"
                        />
                    </div>
                    <p className="text-white mt-4  text-right w-full   ">

                        <a
                            href="/placeholder"
                            className="hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
                        >
                            Forgot your password?
                        </a>
                    </p>
                    <Button buttonName="Login" onClick={handleLogin} />
                    <div className="sm:text-center text-white mt-6">
                        If you don't have an account,
                        <a
                            href="/register"
                            className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"> <br />
                            You can register here!
                        </a> 
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;