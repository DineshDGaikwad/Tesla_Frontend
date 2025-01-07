import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div>
            <div className="">
                <NavBar/>
                <Hero />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
