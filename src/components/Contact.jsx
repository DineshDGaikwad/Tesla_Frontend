import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_giydhim", "template_b4edefl", form.current, {
        publicKey: "fNj7ASt-EA3WRpr08",
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
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {/* Content */}
      <div className="relative max-w-screen-lg w-full p-6 m-4 bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row text-gray-800 transform transition hover:scale-105 duration-300">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">Contact Us</h2>
          <p className="mb-6 text-gray-600">
            We'd love to hear from you! Reach out to us with any questions or feedback.
          </p>

          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-2xl text-indigo-600 mr-3" />
            <span className="text-lg font-medium">+1 (123) 456-7890</span>
          </div>

          <div className="flex items-center">
            <FaEnvelope className="text-2xl text-indigo-600 mr-3" />
            <span className="text-lg font-medium">teslaacademy2025@gmail.com</span>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 p-6 bg-gradient-to-b from-indigo-400 to-indigo-500 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="user_name"
                id="name"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-300 text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="user_email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-300 text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-300 text-gray-800"
                name="message"
                placeholder="Type your message here"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg p-2 transition transform hover:scale-105"
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
