"use client";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import AdminCourses from "./AdminCourses";
import AdminEnquiry from "./AdminEnquiry";

export function AdminPanel() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar Section */}
      <div className="flex flex-col items-center w-full md:w-64 bg-gradient-to-br from-blue-600 via-teal-500 to-blue-400 text-white shadow-lg p-6 animate__animated animate__fadeInLeft">
        {/* Logo Section */}
        <div className="mb-8">
          <img
            src={logo}
            alt="admin-logo"
            className="h-16 w-16 cursor-pointer transform transition duration-300 hover:scale-110"
          />
          <h1 className="text-2xl font-semibold mt-2 text-center">Tesla Academy</h1>
        </div>

        {/* Navigation Buttons */}
        <nav className="space-y-4 w-full">
          <button
            onClick={() => setCurrentView("home")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "home"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView("courses")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "courses"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Courses Data
          </button>
          <button
            onClick={() => alert("Students Data - Coming Soon!")}
            className="w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium bg-white text-black transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300"
          >
            Students Data
          </button>
          <button
            onClick={() => setCurrentView("enquiries")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "enquiries"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Enquiry Data
          </button>
          <button
            onClick={() => alert("User Interface - Coming Soon!")}
            className="w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium bg-white text-black transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300"
          >
            User Interface
          </button>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-8">
        {currentView === "home" && (
          <div className="text-center mt-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4 animate__animated animate__fadeInUp">
              Welcome to Admin Panel
            </h1>
            <p className="text-sm sm:text-base text-gray-500">Use the navigation buttons on the left to manage data.</p>
          </div>
        )}
        {currentView === "courses" && (
          <div className="animate__animated animate__fadeInRight">
            <button
              onClick={() => setCurrentView("home")}
              className="bg-gray-500 text-white px-4 py-2 rounded-full m-4 hover:bg-gray-600 transform transition-all duration-300"
            >
              Back to Admin Panel
            </button>
            <AdminCourses />
          </div>
        )}
        {currentView === "enquiries" && (
          <div className="animate__animated animate__fadeInRight">
            <button
              onClick={() => setCurrentView("home")}
              className="bg-gray-500 text-white px-4 py-2 rounded-full m-4 hover:bg-gray-600 transform transition-all duration-300"
            >
              Back to Admin Panel
            </button>
            <AdminEnquiry />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
