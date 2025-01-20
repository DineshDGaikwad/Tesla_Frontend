import React from 'react';
import NavBar from '../components/NavBar';
import Footer from "../components/Footer";
import UserAdmissionForm from '../components/UserAdmissionForm';

const UserAdmissionPage = () => {
  return (
    <div>
      <div className="bg-white relative">
        <NavBar />
        <div className="flex flex-col lg:flex-row items-center justify-center p-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <img
              src={require("../assets/storysetimages/Forms.svg").default}
              alt="Forms Illustration"
              className="w-3/4 lg:w-full object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <UserAdmissionForm />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserAdmissionPage;
