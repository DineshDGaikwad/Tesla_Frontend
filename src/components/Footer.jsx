import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Social Media Section */}
        <div className="flex justify-center items-center space-x-3">
          <a
            href="#facebook"
            className="p-2 rounded-full bg-teal-600 hover:bg-blue-600 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="#twitter"
            className="p-2 rounded-full bg-teal-600 hover:bg-blue-400 transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="#linkedin"
            className="p-2 rounded-full bg-teal-600 hover:bg-blue-700 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
          <a
            href="#instagram"
            className="p-2 rounded-full bg-teal-600 hover:bg-pink-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="#youtube"
            className="p-2 rounded-full bg-teal-600 hover:bg-red-500 transition-colors duration-300"
            aria-label="YouTube"
          >
            <FaYoutube className="text-xl" />
          </a>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-teal-500 pt-4 text-center text-xs">
          <p>&copy; 2023 Tesla Academy. All rights reserved.</p>
          <p className="mt-1">
            Designed by <a href="#" className="underline hover:text-teal-300">YourName</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
