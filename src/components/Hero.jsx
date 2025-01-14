import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { FaCertificate, FaUserGraduate, FaClock, FaGraduationCap, FaBook, FaLaptopCode, FaPhoneAlt, FaUser, FaPeopleArrows, FaCogs } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay before text appears
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-cover bg-center py-12 lg:py-24 px-6" style={{ backgroundImage: `url(https://via.placeholder.com/1500x900)` }}>
      {/* Hero Section */}
      <div className="text-center w-full max-w-7xl relative z-10">
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-600 leading-tight">
      Empowering Minds,
    </h1>
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-teal-500 mt-4 leading-tight">
      Shaping Futures at
    </h1>
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-600 mt-4 leading-tight">
      Tesla Academy.
    </h1>
    <div className="mt-6 text-xl md:text-2xl lg:text-3xl font-semibold text-teal-600">
      <ReactTyped
        strings={['SCIENCE...', 'MATHEMATICS...', 'SOCIAL STUDIES...', 'COMPUTER SCIENCE...', 'ENGLISH...']}
        typeSpeed={50}
        backSpeed={80}
        loop
      />
    </div>
    {/* Optional Subtitle for Added Engagement */}
    <p className="mt-6 text-lg md:text-xl text-gray-700 font-medium">
      Unlock your full potential with our comprehensive learning programs and industry-certified courses.
    </p>
  </div>


      {/* Featured Courses Section */}
      <div className="py-12 bg-gray-50 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">Explore Our Popular Courses</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Learn from a wide range of expertly curated courses designed to enhance your knowledge.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
          {['Mathematics', 'Science', 'Physics', 'Social Studies', 'Computer Science', 'English'].map((course, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`https://via.placeholder.com/400x200?text=${course}`}
                alt={course}
                className="rounded-md w-full object-cover h-48 mb-4"
              />
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{course}</h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Master {course} with our expertly curated content and resources.
              </p>
              <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition">
                <Link to="/login">Learn More</Link>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 bg-gradient-to-r from-teal-100 to-blue-100 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">Why Choose Tesla Academy?</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Discover the unique features that make us the best choice for your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
          {[
            {
              title: 'Certified Courses',
              description: 'Get certified and boost your career with industry-recognized courses.',
              icon: <FaCertificate size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-teal-50',
            },
            {
              title: 'Self-Paced Learning',
              description: 'Learn at your own pace with flexible schedules and access anytime.',
              icon: <FaClock size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-blue-50',
            },
            {
              title: 'Expert Tutors',
              description: 'Learn from industry experts and experienced educators.',
              icon: <FaUserGraduate size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-teal-50',
            },
            {
              title: 'Global Community',
              description: 'Join a worldwide network of passionate learners and educators.',
              icon: <FaGraduationCap size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-green-50',
            },
            {
              title: 'Interactive Content',
              description: 'Experience learning through interactive quizzes, assignments, and projects.',
              icon: <FaBook size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-yellow-50',
            },
            {
              title: 'Real-World Projects',
              description: 'Apply your knowledge through hands-on projects that simulate real-world scenarios.',
              icon: <FaLaptopCode size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-gray-50',
            },
            {
              title: '24/7 Support',
              description: 'Get help anytime with our round-the-clock customer support.',
              icon: <FaPhoneAlt size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-indigo-50',
            },
            {
              title: 'Career Guidance',
              description: 'Receive personalized career guidance and job placement assistance.',
              icon: <FaUser size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-pink-50',
            },
            {
              title: 'Engaging Community',
              description: 'Collaborate with like-minded learners and experts in forums and discussion groups.',
              icon: <FaPeopleArrows size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-teal-100',
            },
            {
              title: 'Technology Driven',
              description: 'Stay ahead with the latest technology and tools used in the industry.',
              icon: <FaCogs size={40} className="text-teal-600 mb-4" />,
              bgColor: 'bg-purple-50',
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg shadow-lg ${feature.bgColor} hover:shadow-xl hover:scale-105 transform transition-all duration-300`}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-lg lg:text-xl font-bold text-teal-600 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base text-center">{feature.description}</p>
              <div className="flex justify-center mt-4">
                <Link to="/login">
                  <button className="bg-teal-600 text-white rounded-full px-6 py-2 text-sm font-semibold transform transition-all duration-300 hover:bg-teal-700">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 bg-gray-50 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">What Our Students Say</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Hear from our successful learners and their inspiring stories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
          {[
            { name: 'Dinesh', feedback: 'Tesla Academy transformed my learning journey. Highly recommended!' },
            { name: 'Shubham', feedback: 'The courses are amazing, and the flexibility is unmatched!' },
            { name: 'Niraj', feedback: 'Thanks to Tesla Academy, I excelled in my board exams!' },
            { name: 'Kedar', feedback: 'I gained real-world skills that helped me secure my dream job!' },
            { name: 'Swapnil', feedback: 'The self-paced learning allowed me to balance work and study effectively.' },
            { name: 'Harsh', feedback: 'Amazing courses, highly interactive, and great support from tutors!' }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition"
            >
              <p className="italic text-gray-600 text-sm md:text-base">"{testimonial.feedback}"</p>
              <p className="font-bold text-teal-600 mt-4">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
