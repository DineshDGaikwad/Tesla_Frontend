import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative flex justify-between items-center h-50 max-w-screen-auto mx-auto px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-700 text-white shadow-lg z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src={logo}
            alt="Tesla Academy Logo"
            className="h-16 w-16 cursor-pointer transform transition duration-300 justify-center items-center content-center hover:scale-105"
          />
        </Link>
        <Link to="/">
          <p className="font-bold text-white text-xl md:text-4xl">Tesla Academy</p>
        </Link>
      </div>

      {/* Desktop Navbar */}
      <ul className="hidden md:flex space-x-8 text-lg font-semibold">
        <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/forum">Forum</Link>
        </li>
        <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/aboutus">About Us</Link>
        </li>
        {/* <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/admin">Admin Test</Link>
        </li> */}
        <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/enquiry">Enquiry</Link>
        </li>
        <li className="p-4 hover:text-teal-200 transition duration-300">
          <Link to="/admission-form">Admission Form</Link>
        </li>
      </ul>

      {/* Login Button for Desktop */}
      <Link to="/login">
        <button className="hidden md:flex bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full px-6 py-3 font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Login
        </button>
      </Link>

      {/* Mobile Menu Icon */}
      <div
        onClick={handleNav}
        className="block md:hidden text-white cursor-pointer transform transition-all duration-300 hover:scale-110"
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-2/4 h-full bg-gradient-to-br from-teal-700 to-blue-600 text-white z-50 transform ${nav ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-semibold">
          <Link
            to="/courses"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            Courses
          </Link>
          <Link
            to="/forum"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            Forum
          </Link>
          <Link
            to="/aboutus"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/admin"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            Admin Test
          </Link>
          <Link
            to="/enquiry"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            Enquiry
          </Link>
          <Link
            to="/admission-form"
            onClick={handleNav}
            className="hover:text-teal-200 transition duration-300"
          >
            Admission Form
          </Link>
          <Link
            to="/login"
            onClick={handleNav}
            className="bg-white text-black px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-teal-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
