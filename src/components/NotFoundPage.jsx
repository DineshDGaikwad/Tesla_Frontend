"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-teal-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={handleBackToHome}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-all"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
