import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoNav.png";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import Popup from "../Popup/Popup";
import {jwtDecode }from "jwt-decode";



function isValidJwt(jwt) {
  if (!jwt) {
    return false;
  }

  const parts = jwt.split('.');
  if (parts.length !== 3) {
    return false;
  }

  return true;
}


const AuthenticatedNavbar = ({ userKind, logout }) => {
  const navigate = useNavigate();
  let [response,setResponse] = useState("");

  const fetchData = async () => {
    // let response ="";
    const token = localStorage.getItem("token");
    try {
       const server = await axios.get(
        `http://localhost:8080/api/cvBuilder`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return setResponse(server);
    } catch (error) {
      console.log(error);
    }
    return response.status;
  };


  useEffect(() => {
  console.log("response", response);
  fetchData();
}, []);
  
  // show permanent popup with user input image

  const handleImageUpload = async () => {
    console.log(response, "response");

    if(response.status === 200){
      const result = await Swal.fire({
        title: 'Please upload a picture of yourself.',
        text: 'This will be used in the making of your CV. (optional)',
        showConfirmButton: true,
        confirmButtonText: 'Take me to my CV!',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Upload your profile picture'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/CvBuilder');
        } else if (result.isDenied) {
          return;
        }
      });

      if (result) {
        const { value: file } = result;
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            Swal.fire({
              title: 'Your uploaded picture',
              text: 'Your CV will be ready in a few seconds!',
              imageUrl: e.target.result,
              showConfirmButton: true,
              imageAlt: 'The uploaded picture'
              // on confirm button, save the image to local storage
            }).then((result) => {
              if (file.size > 2936012) {
                Popup({
                  title: "Error!",
                  text: "The file you uploaded is too large. Please upload a file that is less than 2.7MB.",
                  icon: "error",
                  timer: 1500,
                  showConfirmButton: false,
                });
                return;
              } else if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                console.log('Image saved to local storage', btoa(e.target.result));
                localStorage.setItem('image', btoa(e.target.result));

                navigate('/CvBuilder');
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      Popup({
        title: "Error!",
        text: "You need to fill in your CV first, by applying to a seminar!",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
};

  return (
    userKind === "admin" ? (
      <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center">
        <Link
          to="https://www.joinwelead.org/el/blog"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          blog
        </Link>
        <Link
          to="https://www.joinwelead.org/el/sxetika-me-emas"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          about us
        </Link>
        <Link
          to="https://www.joinwelead.org/el/programmata"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          seminars
        </Link>
        <Link
          to="/Applications"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          <button className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2">
            See applications
          </button>
        </Link>
        <Link to="/" className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300">
          <button onClick={logout} className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
            Log out
          </button>
        </Link>
      </div>
    ) : userKind === "user" ? (
      <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center ">
        <Link
          to="https://www.joinwelead.org/el/blog"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          blog
        </Link>
        <Link
          to="https://www.joinwelead.org/el/sxetika-me-emas"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          about us
        </Link>
        <Link
          to="https://www.joinwelead.org/el/programmata"
          className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300"
        >
          seminars
        </Link>

        <Link to="/apply" className="text-[#143727] hover:text-gray-400 p-2 ease-in-out duration-300">
          Apply for a seminar
        </Link>
        <button
          onClick={handleImageUpload}
          className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2 hover:bg-indigo-400 hover:scale-105 shadow-xl transform transition duration-500 ease-in-out">
          CV Builder
        </button>
        <Link to="/" className="text-[#143727] hover:text-gray-400 p-2">
          <button onClick={logout} className="bg-[#143727] text-[#e5e5e5] hover:bg-green-900 rounded-full px-4 py-2 hover:scale-105 shadow-xl transform transition duration-500 ease-in-out">
            Log out
          </button>
        </Link>
      </div>
    ) : (
      <UnauthenticatedNavbar />
    ));
};
const UnauthenticatedNavbar = () => (
  <div className="flex md:flex-row flex-col items-center mx-auto justify-center text-center">
    <Link
      to="https://www.joinwelead.org/el/blog"
      className="text-[#143727] hover:text-gray-400 p-2"
    >
      blog
    </Link>
    <Link
      to="https://www.joinwelead.org/el/sxetika-me-emas"
      className="text-[#143727] hover:text-gray-400 p-2"
    >
      about us
    </Link>
    <Link
      to="https://www.joinwelead.org/el/programmata"
      className="text-[#143727] hover:text-gray-400 p-2"
    >
      seminars
    </Link>

    <Link to="/login" className="text-[#143727] hover:text-gray-400 p-2 ">
      <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
        Log in
      </button>
    </Link>
    <Link to="/register" className="text-[#143727] hover:text-gray-400 p-2">
      <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2 ">
        Register
      </button>
    </Link>
  </div>
);

//commit,
const Navbar = ({userKind }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user,setUser] = useState("");
  const jwt = localStorage.getItem('token');
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      const decodedToken = jwtDecode(user);
      const role = JSON.stringify(decodedToken.roles).slice(2, -2);
      setUser(role);
    }
    if (user !== null) {
      setIsAuthenticated(true);
      if (jwt) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      }
    }

  }, []);



  const logout = async () => {
    try {
      if (isValidJwt(jwt)) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        // Remove the Authorization header
        delete axios.defaults.headers.common["Authorization"];
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
          className={` ${isOpen ? "flex" : "hidden"
            } md:flex md:items-center md:w-auto w-full
        `}
        >
          {isAuthenticated ? (
            <AuthenticatedNavbar logout={logout} userKind={user} />
          ) : (
            <UnauthenticatedNavbar />
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;