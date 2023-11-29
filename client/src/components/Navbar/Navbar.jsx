import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoNav.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Popup from "../Popup/Popup";
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
const AuthenticatedNavbar = ({ userKind,logout }) =>
  userKind === "admin" ? (
    <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center">
      <Link
        to="https://www.joinwelead.org/el/blog"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        blog
      </Link>
      <Link
        to="https://www.joinwelead.org/el/sxetika-me-emas"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        about us
      </Link>
      <Link
        to="https://www.joinwelead.org/el/programmata"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        seminars
      </Link>
      <Link
        to="/Applications"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        <button className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2">
          See applications
        </button>
      </Link>
      <Link to="/"  className="text-[#143727] hover:text-gray-300 p-2">
        <button onClick={logout} className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
          Log out
        </button>
      </Link>
    </div>
  ) : userKind === "user" ? (
    <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center">
      <Link
        to="https://www.joinwelead.org/el/blog"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        blog
      </Link>
      <Link
        to="https://www.joinwelead.org/el/sxetika-me-emas"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        about us
      </Link>
      <Link
        to="https://www.joinwelead.org/el/programmata"
        className="text-[#143727] hover:text-gray-300 p-2"
      >
        seminars
      </Link>

      <Link to="/apply" className="text-[#143727] hover:text-gray-300 p-2">
        {/* <button className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2"> */}
        Apply for a seminar
        {/* </button> */}
      </Link>
      <Link to="/cvBuilder" className="text-[#143727] hover:text-gray-300 p-2">
        <button className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2">
          CV Builder
        </button>
      </Link>
      <Link to="/" className="text-[#143727] hover:text-gray-300 p-2">
        <button onClick={logout} className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
          Log out
        </button>
      </Link>
    </div>
  ) : (
    <UnauthenticatedNavbar />
  );
const UnauthenticatedNavbar = () => (
  <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center">
    <Link
      to="https://www.joinwelead.org/el/blog"
      className="text-[#143727] hover:text-gray-300 p-2"
    >
      blog
    </Link>
    <Link
      to="https://www.joinwelead.org/el/sxetika-me-emas"
      className="text-[#143727] hover:text-gray-300 p-2"
    >
      about us
    </Link>
    <Link
      to="https://www.joinwelead.org/el/programmata"
      className="text-[#143727] hover:text-gray-300 p-2"
    >
      seminars
    </Link>

    <Link to="/login" className="text-[#143727] hover:text-gray-300 p-2 ">
      <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
        Log in
      </button>
    </Link>
    <Link to="/register" className="text-[#143727] hover:text-gray-300 p-2">
      <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2 ">
        Register
      </button>
    </Link>
  </div>
);


const Navbar = ({ userKind }) => {
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const jwt = localStorage.getItem('token');
  console.log('JWT:', jwt);
  useEffect(() => {
    const user = localStorage.getItem("token") ;
    if (user !== null) {
      setIsAuthenticated(true);
    }
  
  }, []);
  const logout = async () => {
    try {
     if (isValidJwt(jwt)) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        location.reload();
        Popup({
          title: "Success!",
          text: "You have successfully logged out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          
          navigate('/login');
        }, 1500);
      } 
    }
    catch (err) {
      console.log(err);
      Popup({
        title: "Error!",
        text:
          "An error occurred while trying to log out. Please try again. Error: " +
          err,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <nav className=" absolute md:fixed w-screen z-50 bg-[#e5e5e5] px-4">
      <div className="md:flex justify-between items-center">
        {/* logo */}
        <Link
          to="/"
          className="flex flex-row items-center justify-center gap-2"
        >
          <img
            src={logo}
            alt="logo"
            className="block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
          />
        </Link>

        {/* menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-0 left-0 pl-6 pt-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* menu */}
        <div
          className={` ${
            isOpen ? "flex" : "hidden"
          } md:flex md:items-center md:w-auto w-full
        `}
        >
          {isAuthenticated ? (
            <AuthenticatedNavbar logout={logout} userKind={userKind} />
          ) : (
            <UnauthenticatedNavbar />
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;


