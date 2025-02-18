import React from "react";
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import AdminImage from "../assets/storysetimages/Admin-bro.svg";

const Contact = () => {
  const form = React.useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6lophzp', 'template_qoqdp69', form.current, {
        publicKey: '1AmGtfvcEkEAU5T2G',
      })
      .then(
        () => {
          e.target.reset();
          Swal.fire({
            title: "Success!",
            text: "Message sent successfully",
            icon: "success",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage: "url('https://viditrade.com/wp-content/uploads/2022/04/login-pg-img.jpg')",
      }}
    >
      <div className="max-w-screen-lg w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row p-4">
        {/* Left Side - SVG Image */}
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
                  <img
                    src={AdminImage}
                    alt="Admin Bro illustration"
                    className="w-3/4 lg:w-full max-w-md lg:max-w-lg object-contain"
                  />
                </div>
             

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Contact Us</h2>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-indigo-600 text-xl mr-2" />
            <span className="text-lg">+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-indigo-600 text-xl mr-2" />
            <span className="text-lg">info@example.com</span>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="Enter Your Name"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="Enter Your Email"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                rows="4"
                className="w-full border border-gray-300 p-2 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;