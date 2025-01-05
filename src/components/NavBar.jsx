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
    <div className="relative flex justify-between items-center h-auto max-w-auto mx-auto px-6 text-white bg-blue-200 shadow-lg z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-14 w-14 cursor-pointer transform transition duration-300 hover:scale-110"
          />
        </Link>
        <Link to="/">
          <p className="font-extrabold text-black text-2xl md:text-3xl">
            Tesla Academy
          </p>
        </Link>
      </div>

      {/* Desktop Navbar */}
      <ul className="hidden md:flex space-x-6 text-black text-lg font-medium">
        <li className="p-4 hover:text-teal-900 transition duration-300">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="p-4 hover:text-teal-900 transition duration-300">
          <Link to="/forum">Forum</Link>
        </li>
        <li className="p-4 hover:text-teal-900 transition duration-300">
          <Link to="/aboutus">About Us</Link>
        </li>
        <li className="p-4 hover:text-teal-900 transition duration-300">
          <Link to="/admin">Admin Test</Link>
        </li>
        <li className="p-4 hover:text-teal-900 transition duration-300">
          <Link to="/enquiry">Enquiry</Link>
        </li>
      </ul>

      {/* Login Button for Desktop */}
      <Link to="/login">
        <button className="hidden md:flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full px-6 py-3 font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Login
        </button>
      </Link>

      {/* Mobile Menu Icon */}
      <div
        onClick={handleNav}
        className="block md:hidden text-black cursor-pointer transform transition-all duration-300 hover:scale-110"
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-600 via-teal-500 to-blue-400 text-white z-50 transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold">
          <Link
            to="/courses"
            onClick={handleNav}
            className="hover:text-yellow-300 transition duration-300"
          >
            Courses
          </Link>
          <Link
            to="/forum"
            onClick={handleNav}
            className="hover:text-yellow-300 transition duration-300"
          >
            Forum
          </Link>
          <Link
            to="/aboutus"
            onClick={handleNav}
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/admin"
            onClick={handleNav}
            className="hover:text-yellow-300 transition duration-300"
          >
            Admin Test
          </Link>
          <Link
            to="/enquiry"
            onClick={handleNav}
            className="hover:text-yellow-300 transition duration-300"
          >
            Enquiry
          </Link>
          <Link
            to="/login"
            onClick={handleNav}
            className="bg-white text-black px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
