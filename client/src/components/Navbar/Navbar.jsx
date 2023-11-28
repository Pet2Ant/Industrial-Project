import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoNav.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
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

  // useEffect(() => {
  //   const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  //   setIsAuthenticated(!!user);
  // }, []);
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/api/check-session', { withCredentials: true });
        setIsAuthenticated(res.status === 200);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });

      
      if (res.status === 200) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false);
        navigate('/');
      } else {
        alert("An error occurred while trying to log out.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while trying to log out.");
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


