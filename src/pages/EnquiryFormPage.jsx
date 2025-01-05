import React from "react";
import Footer from "../components/Footer";
import EnquiryForm from "../components/EnquiryForm";
import NavBar from "../components/NavBar";
import enquiryBoyImage from "../assets/enquiryboy.png"; // Import the image

const EnquiryFormPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-violet-300 to-teal-100 relative">
      <NavBar />

      {/* Enquiry Form */}
      <div className="max-w-lg mx-auto mt-10 mb-5">
        <EnquiryForm />
      </div>

      <Footer />

      {/* Enquiry Boy Image Sticker */}
      <div className="absolute bottom-0 right-4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
        <img
          src={enquiryBoyImage} // Use the imported image
          alt="Enquiry Boy"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default EnquiryFormPage;
