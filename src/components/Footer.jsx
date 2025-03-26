import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Social Media Section */}
        <div className="flex justify-center items-center space-x-6">
          <a href="#facebook" className="p-3 rounded-full bg-blue-600 hover:bg-blue-800 transform transition-all duration-300 ease-in-out hover:scale-110" aria-label="Facebook">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="#instagram" className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transform transition-all duration-300 ease-in-out hover:scale-110" aria-label="Instagram">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="#twitter" className="p-3 rounded-full bg-black hover:bg-grey-600 transform transition-all duration-300 ease-in-out hover:scale-110" aria-label="Twitter">
            <RiTwitterXLine className="text-2xl" />
          </a>
          <a href="#youtube" className="p-3 rounded-full bg-red-600 hover:bg-red-800 transform transition-all duration-300 ease-in-out hover:scale-110" aria-label="YouTube">
            <FaYoutube className="text-2xl" />
          </a>
          <a href="#linkedin" className="p-3 rounded-full bg-blue-700 hover:bg-blue-900 transform transition-all duration-300 ease-in-out hover:scale-110" aria-label="LinkedIn">
            <FaLinkedinIn className="text-2xl" />
          </a>
        </div>

        {/* Policy Links */}
        <div className="mt-6 text-center text-sm">
          <Link to="/terms" className="mr-4 hover:underline">Terms & Conditions</Link>
          <Link to="/privacy" className="mr-4 hover:underline">Privacy Policy</Link>
          <Link to="/return" className="mr-4 hover:underline">Return Policy</Link>
          <Link to="/refund" className="hover:underline">Refund & Cancellation</Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-teal-500 pt-4 text-center text-xs">
          <p className="text-sm font-medium">&copy; 2025 Tesla Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
