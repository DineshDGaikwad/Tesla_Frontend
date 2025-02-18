"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); 
  };

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${require("../assets/storysetimages/404Error.svg").default})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
 
      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-teal-600 transition-all"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
