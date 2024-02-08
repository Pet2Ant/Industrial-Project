import React from "react";
import { useEffect, useState } from "react";
import login from "../assets/images/login.jpg";
import logo from "../assets/images/WeLeadLogo.png";
import Button from "../Button/Button";
import Input from "../Input/Input";
import GoogleIcon from "../assets/images/googleIcon.png";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios";
import Popup from "../Popup/Popup";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
//commit
function Login({ onLogin, setIsLoading }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username: emailOrUsername.includes("@") ? null : emailOrUsername,
        email: emailOrUsername.includes("@") ? emailOrUsername : null,
        password: password,
      });

      const jwt = res.data.token;
      if (isValidJwt(jwt)) {
        localStorage.setItem("token", jwt);
        const decodedToken = jwtDecode(localStorage.getItem("token", jwt));
        console.log(decodedToken);
        Popup({
          title: "Success!",
          text: "You have successfully logged in!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          onLogin();
          navigate('/');
        }, 1500);
      }
      else {
        Popup({
          title: "Error!",
          text:
            "An error occurred while trying to login. Please try again. Error: " +
            res.data,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log("Error from server:", err);
      Popup({
        title: "Error!",
        text: "An error occurred while trying to login. Please try again.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#143727] h-screen min-h-screen max-h-screen">
      <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen  overflow-y-auto">
        <div className="hidden sm:block flex flex-col items-left gap-6 h-screen px-6 pb-6">
          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2 sm:mt-10"
          >
            <img
              src={logo}
              alt="logo"
              className="hidden sm:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
            />
          </Link>

          <img
            src={login}
            alt="loginPicture"
            className="hidden sm:block object-cover rounded-3xl mt-10 h-1/2 w-2/3 mx-auto"
          />
          <div className="w-5/6 mx-auto">
            <h1 className="text-3xl  sm:text-center text-right  mt-10 text-white">
              Our Vision & Mission
            </h1>
            <p className="sm:text-center italic text-right  mt-10 text-white">
              We envision a world where women are empowered to shape the future
              of everything.
              <br /> We train, mentor and empower women to pursue leadership
              positions in business and technology.
            </p>

            <h1 className="text-3xl  sm:text-center text-right  mt-10 text-white">
              What We Do
            </h1>
            <p className=" sm:text-center italic text-right  mt-10 pb-10 text-white">
              WE LEAD empowers women through education, networking, mentorship,
              and professional development opportunities. <br />
              Participants emerge as well-rounded professionals ready to enter
              or re-enter the workforce and equipped to rise to leadership
              positions. <br />
              On top of that, WE LEAD works alongside tech and business leaders
              as well as local communities and authorities to achieve <br />{" "}
              greater inclusivity in workplaces and foster a culture of
              allyship.
            </p>
          </div>
        </div>

        {/* Login form */}
        <form className="flex flex-col sm:mr-12 sm:w-[28rem] w-screen sm:justify-center justify-around h-screen">
          <div className="mt-32">
            <Link
              to="/"
              className="flex flex-row items-center justify-center mx-auto gap-2"
            >
              <img
                src={logo}
                alt="logo"
                className="sm:hidden block object-scale-down h-16"
              />
            </Link>
            <h1 className="text-3xl font-bold sm:text-center sm:block hidden text-center text-white">
              Log in
            </h1>
          </div>

          <div className="mb-32">
            <div className="flex flex-col items-center justify-center relative min-w-fit md:min-w-max w-full mr-12 px-0">
              <h1 className="text-3xl font-bold sm:text-center text-center text-white sm:hidden block">
                Log in
              </h1>
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
            <p className="text-white mt-4 text-right w-full pr-4">
              <a
                href="/placeholder"
                className="hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
              >
                Forgot your password?
              </a>
            </p>
            <div className="px-12">
              <Button buttonName="Login" onClick={handleLogin} />
            </div>
            <div className="sm:text-center text-white mt-6 text-center mx-auto">
              If you don't have an account,
              <a
                href="/register"
                className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
              >
                {" "}
                <br />
                You can register here!
              </a>
            </div>
            <div className="flex flex-col justify-center items-center mt-6">
              {/* seperator */}
              <div className="flex flex-row items-center justify-center gap-12 w-full sm:px-0 px-6">
                <hr className="border border-1 border-gray-500 w-full" />
                <p className="text-gray-500">or</p>
                <hr className="border border-1 border-gray-500 w-full border-gray-500" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <a href="/placeholder">
                  <FaFacebook className="text-blue-500 text-4xl mt-16 mr-4 select-none hover:scale-125 transition duration-500 ease-in-out" />
                </a>
                <a href="/placeholder">
                  <img
                    src={GoogleIcon}
                    alt="googleIcon"
                    className="h-10 hover:scale-125 transition duration-500 ease-in-out"
                  />
                </a>
                <a href="/placeholder">
                  <FaLinkedin className="text-blue-700 text-4xl mt-16 ml-4 hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
            </div>
            {/* <div>
              <p className="text-gray-500 px-12 mb-6 text-center mx-auto absolute bottom-0 ">
                By logging in, you agree to our
                <a
                  href="/placeholder"
                  className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
                >
                  {" "}
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="/placeholder"
                  className="text-[#FFCF07] hover:text-[#C29F09] transition duration-500 ease-in-out cursor-pointer"
                >
                  {" "}
                  Privacy Policy
                </a>
              </p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
