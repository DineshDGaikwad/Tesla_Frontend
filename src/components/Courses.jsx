"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// HoverEffect Component for scaling and shadow effects on hover
const HoverEffect = ({ children }) => (
  <div className="relative overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300 ease-in-out">
    {children}
  </div>
);

// Courses Component
export function Courses() {
  const [courses, setCourses] = useState({}); // State to hold grouped courses
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("http://127.0.0.1:8000/courses/");
        if (!response.ok) throw new Error("Failed to fetch courses.");
        const data = await response.json();

        // Validate the data structure
        if (data && typeof data === "object") {
          setCourses(data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCourses();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center text-blue-500 text-2xl">Loading courses...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500 text-2xl">{error}</div>;
  }

  return (
    <section id="courses" className="py-16 bg-blue-50 text-black">
      <h2 className="text-5xl font-bold text-center mb-16 text-black">COURSES</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(courses).map(([standard, courseList]) => (
          <div key={standard} className="mb-16">
            <h3 className="text-4xl text-center font-thin text-black mb-8">{standard} Standard Course List</h3>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center">
              {courseList.map((course, index) => (
                <HoverEffect key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} // Start with opacity 0 and y offset
                    animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
                    transition={{ duration: 0.5, delay: 0.2 * index }} // Incremental delay for each course
                    className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl flex flex-col justify-between h-full"
                  >
                    <div className="relative z-10 p-6 bg-gradient-to-r from-indigo-400 to-teal-400 flex-1">
                      <h4 className="text-white font-extrabold text-3xl mb-2">{course.title || "Untitled Course"}</h4>
                      <p className="text-gray-100 mb-4 flex-grow">{course.description || "No description available"}</p>
                    </div>
                    <div className="p-4 bg-white flex flex-col items-start">
                      {course.courselink ? (
                        <a
                          href={course.courselink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800 transition duration-200"
                        >
                          Visit Course
                        </a>
                      ) : (
                        <p className="text-gray-400">Course link not available</p>
                      )}
                    </div>
                  </motion.div>
                </HoverEffect>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;
