import React from "react";
import { ReactTyped } from "react-typed";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="h-screen relative flex flex-col lg:flex-row items-start justify-start overflow-hidden">
      {/* Text Content */}
      <div className="text-2xl lg:text-5xl font-bold text-gray-800 z-10 p-6 w-full lg:w-1/2 lg:pl-0">
        <h1 className="md:text-7xl sm:text-6xl text-3xl p-2 font-bold animate-[fade-in_1s_ease-in-out_forwards]">
          Empowering Minds,
        </h1>
        <h1 className="text-teal-500 md:text-7xl sm:text-6xl text-3xl p-4 font-bold animate-[fade-in_1s_ease-in-out_forwards_0.2s]">
          Shaping Futures at
        </h1>
        <h1 className="md:text-7xl sm:text-6xl text-4xl p-2 font-bold animate-[fade-in_1s_ease-in-out_forwards_0.4s]">
          Tesla Academy.
        </h1>

        <div className="mt-4">
          <ReactTyped
            strings={['SCIENCE...', 'MATHEMATICS...', 'SOCIAL STUDIES...']}
            className="md:text-3xl sm:text-2xl text-2xl p-2 font-bold text-teal-500"
            typeSpeed={50}
            backSpeed={80}
            loop
          />
        </div>
      </div>

      {/* Image Content - Positioned just above the footer */}
      <div className="w-full lg:w-1/2 flex justify-center items-start mt-auto lg:ml-0 lg:mb-0">
        <img
          src={hero}
          alt="Description of the image"
          className="w-full sm:w-3/5 lg:w-4/5 xl:w-3/4 h-auto object-contain rounded-lg transform hover:scale-110 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default Hero;
