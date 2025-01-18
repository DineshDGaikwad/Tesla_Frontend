import React from 'react'
import NavBar from '../components/NavBar'
import Footer from "../components/Footer";
import UserAdmissionForm from '../components/UserAdmissionForm';

const UserAdmissionPage = () => {
  return (
    <div>
        <div className="bg-gradient-to-r from-blue-100 via-violet-300 to-teal-100 relative">
            <NavBar />
            <UserAdmissionForm />
            <Footer />
        </div>
    </div>
  )
}

export default UserAdmissionPage