import React from "react";
import Footer from "../components/Footer";
import EnquiryForm from "../components/EnquiryForm";
import NavBar from "../components/NavBar";

const EnquiryFormPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-violet-300 to-teal-100 relative">
      <NavBar />

      {/* Enquiry Form */}
      <div className="max-w-lg mx-auto mt-10 mb-5">
        <EnquiryForm />
      </div>

      <Footer />
    </div>
  );
};

export default EnquiryFormPage;
