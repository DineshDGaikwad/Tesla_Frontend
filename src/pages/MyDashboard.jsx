import React from "react";
import NavBar from "../components/NavBar";
import StudentDashboard from "../components/StudentDashboard";
import Footer from '../components/Footer'

const CoursesPage = () => {
    return (
        <div>
            <NavBar />
            <StudentDashboard/>
            <Footer />
        </div>
    );
};

export default CoursesPage;
