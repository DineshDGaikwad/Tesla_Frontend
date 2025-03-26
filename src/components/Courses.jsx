"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import supabase from "../Supabase";

const HoverEffect = ({ children }) => (
  <div className="relative overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300 ease-in-out">
    {children}
  </div>
);

const CourseCard = ({ course, index, user, onBuyCourse }) => (
  <HoverEffect>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 bg-gradient-to-r from-indigo-400 to-teal-400 flex-1">
        <h4 className="text-white font-extrabold text-3xl mb-2">
          {course.title || "Untitled Course"}
        </h4>
        <p className="text-gray-100 mb-4">
          {course.description || "No description available"}
        </p>
      </div>
      <div className="p-4 bg-white flex justify-between items-center">
      <span className="text-lg font-bold text-indigo-600">₹{course.price}</span>
        <button
          onClick={() => onBuyCourse(course)}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            user ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!user}
        >
          {user ? "Buy Course" : "Login to Buy"}
        </button>
      </div>
    </motion.div>
  </HoverEffect>
);

export function Courses() {
  const [courses, setCourses] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Fetch courses
      const response = await fetch("http://127.0.0.1:8000/courses/", {
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token && { "Authorization": `Bearer ${session.access_token}` })
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && typeof data === "object") {
        setCourses(data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBuyCourse = useCallback(async (course) => {
    if (!user) {
      alert("Please log in to buy a course.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/buy_course/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.access_token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          course_title: course.title,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        // Handle the specific "already purchased" case with a simple alert
        if (response.status === 400 && errorData.detail === "Course already purchased") {
          alert("You have already purchased this course.");
        } else {
          // For other errors, show the detailed message in an alert
          alert(`Error: ${errorData.detail || "Failed to purchase course"}`);
        }
        return;
      }
  
      await response.json();
      alert(`Successfully purchased "${course.title}"! Check your dashboard.`);
      fetchCourses();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }, [user, fetchCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-blue-500 text-2xl mt-4">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500 text-2xl">
        {error}
        <button 
          onClick={fetchCourses}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section id="courses" className="py-16 bg-blue-50 text-black">
      <h2 className="text-5xl font-bold text-center mb-16">COURSES</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(courses).map(([standard, courseList]) => (
          <div key={standard} className="mb-16">
            <h3 className="text-4xl text-center font-thin mb-8">
              {standard} Standard Course List
            </h3>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {courseList.map((course, index) => (
                <CourseCard
                  key={index}
                  course={course}
                  index={index}
                  user={user}
                  onBuyCourse={handleBuyCourse}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;