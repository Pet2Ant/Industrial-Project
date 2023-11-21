import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoNav.png";

const AuthenticatedNavbar = ({ userKind }) =>
  userKind === "admin" ? (
    <div className="space-x-4">
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
      <Link to="/cvBuilder" className="text-[#143727] hover:text-gray-300 p-2">
        <button className="bg-[#8D93D9] text-[#143727] rounded-full px-4 py-2">
          See applications
        </button>
      </Link>
      <Link to="/logout" className="text-[#143727] hover:text-gray-300 p-2">
        <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
          Log out
        </button>
      </Link>
    </div>
  ) : (
    <div className="space-x-4">
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
      <Link to="/logout" className="text-[#143727] hover:text-gray-300 p-2">
        <button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
          Log out
        </button>
      </Link>
    </div>
  );
const UnauthenticatedNavbar = () => (
  <div className="space-x-4">
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

const Navbar = ({ isAuthenticated, userKind }) => {
  return (
    <nav className="absolute w-screen bg-[#e5e5e5] px-4">
      <div className="md:flex justify-between items-center">
        {/* logo */}
        <a
          href="https://joinwelead.org/"
          className="flex flex-row items-center justify-center gap-2"
        >
          <img
            src={logo}
            alt="logo"
            className="hidden sm:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
          />
        </a>

        {/* menu */}

        {isAuthenticated ? (
          <AuthenticatedNavbar userKind={userKind} />
        ) : (
          <UnauthenticatedNavbar />
        )}
      </div>
    </nav>
  );
};
export default Navbar;

// to Do after connection with api
// import React, { useState } from "react";
// const App = () => {
//     const[isAuthenticated, setIsauthenticated] = useState(false);

//     const handleLogin = () => {
//         console.log("logging in user");
//         setIsauthenticated(true);
//     };

//     const handleLogout = () => {
//         setIsauthenticated(false);
//     };
//     return(
//         <div>
//         {/* Other components or routes can go here */}

//         {/* Navbar component with authentication state */}
//         <Navbar isAuthenticated={isAuthenticated} />

//         {/* Example buttons to simulate login/logout */}
//         <button onClick={handleLogin}>Login</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     );
// };
// export default App;
