import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-gray-100 text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-300 to-blue-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Welcome to Tesla Academy</h1>
          <p className="text-lg sm:text-xl">
            Leading the future of education in technology and innovation.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-200">
  <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8">About Tesla Academy</h2>
      <p className="text-lg sm:text-xl text-gray-600 mx-auto md:mx-0 max-w-3xl mb-8">
        Tesla Academy is committed to providing the highest quality education in technology and innovation. 
        We offer courses and training programs in emerging fields like Artificial Intelligence, Machine Learning, 
        Data Science, and Web Development. Our goal is to empower individuals with the knowledge and skills necessary 
        to thrive in the fast-paced digital world.
      </p>
      <p className="text-lg sm:text-xl text-gray-600 mx-auto md:mx-0 max-w-3xl mb-8">
        Our team consists of industry professionals, experienced instructors, and passionate learners who work 
        together to create an enriching learning environment. At Tesla Academy, we focus on practical, hands-on training 
        that bridges the gap between academic knowledge and real-world application. Whether you're a beginner or a professional, 
        our courses are designed to meet your learning needs.
      </p>
    </div>
    <div className="flex-1">
      <img
        src="https://images.ctfassets.net/9sy2a0egs6zh/78HoDbPwuWz8M6er6joJdE/c440f3e5d7262a424f13da69a46e958a/wallet-illo.svg"
        alt="About Tesla Academy"
        className="rounded-lg transition-transform transform hover:scale-105 duration-500 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto"
      />
    </div>
  </div>
</section>

    

      {/* Our Vision Section */}
      <section className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-semibold mb-4">Our Vision</h3>
            <p className="text-lg sm:text-xl">
              At Tesla Academy, we envision a future where technological expertise is accessible to everyone. We strive to 
              bridge the gap between academic knowledge and real-world application through industry-relevant courses and expert mentorship.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.ctfassets.net/9sy2a0egs6zh/Cgl4g0Z2URG5PhRXT7CjP/54984377c95ba08d7aa5b36acb038b61/Browse-illo.svg"
              alt="Vision"
              className="rounded-lg transition-transform transform hover:scale-105 duration-500 w-full sm:w-3/4 md:w-2/3"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-800">Why Choose Tesla Academy?</h3>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-500">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Industry Leaders</h4>
              <p className="text-gray-600">
                Our courses are designed and taught by experts from leading industries, ensuring you learn the most up-to-date skills.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-500">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Hands-on Training</h4>
              <p className="text-gray-600">
                We believe in practical learning. Our training sessions are designed to provide real-world experience and skills.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-500">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Flexible Learning</h4>
              <p className="text-gray-600">
                We offer flexible learning options, including self-paced and instructor-led courses, to fit your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-semibold mb-8 text-gray-800">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <TeamMember
              name="Shubham"
              title="Backend Developer"
              image="https://images.pexels.com/photos/4603239/pexels-photo-4603239.jpeg?cs=srgb&dl=pexels-anthony-raphael-4603239.jpg&fm=jpg"
            />
            <TeamMember
              name="Dinesh"
              title="Frontend Developer"
              image="https://images.pexels.com/photos/4603239/pexels-photo-4603239.jpeg?cs=srgb&dl=pexels-anthony-raphael-4603239.jpg&fm=jpg"
            />
            <TeamMember
              name="Niraj"
              title="Frontend Developer"
              image="https://images.pexels.com/photos/4603239/pexels-photo-4603239.jpeg?cs=srgb&dl=pexels-anthony-raphael-4603239.jpg&fm=jpg"
            />
            <TeamMember
              name="Kedar"
              title="Website Analyst"
              image="https://images.pexels.com/photos/4603239/pexels-photo-4603239.jpeg?cs=srgb&dl=pexels-anthony-raphael-4603239.jpg&fm=jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const TeamMember = ({ name, title, image }) => (
  <div className="text-center bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
      src={image}
      alt={name}
    />
    <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
    <p className="text-gray-600">{title}</p>
  </div>
);

export default Aboutus;
