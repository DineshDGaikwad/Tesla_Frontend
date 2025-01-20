"use client";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import AdminCourses from "./AdminCourses";
import AdminEnquiry from "./AdminEnquiry";
import AdminStudent from "./AdminStudent";
import AdmissionForm from "./AdmissionForm";
import AdminPayment from "./AdminPayments";

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
            onClick={() => setCurrentView("admissions")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "admissions"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Admission Data
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
            onClick={() => setCurrentView("admissionForm")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "admissionForm"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Admission Form
          </button>
          <button
            onClick={() => setCurrentView("payments")}
            className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium ${
              currentView === "payments"
                ? "bg-yellow-400 text-black shadow-lg scale-105"
                : "bg-white text-black"
            } transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300`}
          >
            Payment Data
          </button>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-8">
        {currentView === "home" && (
          <div className="text-center mt-10">
            <div className="relative flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4 animate__animated animate__fadeInUp">
                Hey Admin! Welcome to Admin Panel
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                Use the navigation buttons on the left to manage data.
              </p>
              <img
                src={require("../assets/storysetimages/Admin.svg").default}
                alt="Admin Illustration"
                className="w-2/3 md:w-1/2 lg:w-1/3 mb-6"
              />             
            </div>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-blue-100 p-4 rounded shadow-md animate__animated animate__fadeIn">
          <h2 className="text-xl font-bold text-blue-600">Total Courses</h2>
          <p className="text-3xl font-semibold">25</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow-md animate__animated animate__fadeIn">
          <h2 className="text-xl font-bold text-green-600">Total Admissions</h2>
          <p className="text-3xl font-semibold">150</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow-md animate__animated animate__fadeIn">
          <h2 className="text-xl font-bold text-purple-600">Pending Enquiries</h2>
          <p className="text-3xl font-semibold">8</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <button
            onClick={() => setCurrentView("courses")}
            className="bg-blue-500 text-white py-3 rounded shadow hover:bg-blue-600 transition"
          >
            Manage Courses
          </button>
          <button
            onClick={() => setCurrentView("admissions")}
            className="bg-green-500 text-white py-3 rounded shadow hover:bg-green-600 transition"
          >
            View Admissions
          </button>
          <button
            onClick={() => setCurrentView("enquiries")}
            className="bg-purple-500 text-white py-3 rounded shadow hover:bg-purple-600 transition"
          >
            Handle Enquiries
          </button>
          <button
            onClick={() => setCurrentView("admissionForm")}
            className="bg-yellow-500 text-white py-3 rounded shadow hover:bg-yellow-600 transition"
          >
            Add New Admission
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Notifications</h2>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded shadow">
            <p className="font-bold">New Enquiry</p>
            <p className="text-sm text-gray-500">A new enquiry has been submitted by John Doe.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <p className="font-bold">Admission Update</p>
            <p className="text-sm text-gray-500">Anna Smith has completed the admission process.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <p className="font-bold">Course Added</p>
            <p className="text-sm text-gray-500">The new course "Data Science Basics" has been added.</p>
          </li>
        </ul>
      </div>
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

  {currentView === "admissions" && (
    <div className="animate__animated animate__fadeInRight">
      <button
        onClick={() => setCurrentView("home")}
        className="bg-gray-500 text-white px-4 py-2 rounded-full m-4 hover:bg-gray-600 transform transition-all duration-300"
      >
        Back to Admin Panel
      </button>
      <AdminStudent />
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

  {currentView === "admissionForm" && (
    <div className="animate__animated animate__fadeInRight">
      <button
        onClick={() => setCurrentView("home")}
        className="bg-gray-500 text-white px-4 py-2 rounded-full m-4 hover:bg-gray-600 transform transition-all duration-300"
      >
        Back to Admin Panel
      </button>
      <AdmissionForm />
    </div>
  )}

  {currentView === "payments" && (
    <div className="animate__animated animate__fadeInRight">
      <button
        onClick={() => setCurrentView("home")}
        className="bg-gray-500 text-white px-4 py-2 rounded-full m-4 hover:bg-gray-600 transform transition-all duration-300"
      >
        Back to Admin Panel
      </button>
      <AdminPayment />
    </div>
  )}
</div>

    </div>
  );
}

export default AdminPanel;
