import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import AddCourse from "./AddCourses";
import EditCourse from "./EditCourse";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [selectedCourse, setSelectedCourse] = useState(null); // State for the selected course to edit

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/courses/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Flatten the grouped courses into a single array
      const flattenedCourses = Object.entries(data).flatMap(([_, courses]) => courses);
      setCourses(flattenedCourses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/${courseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses(courses.filter((course) => course._id !== courseId));
      alert("Course deleted successfully.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  if (loading) {
    return <p className="text-center text-lg text-blue-500">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddCourse setModalOpen={setModalOpen} fetchCourses={fetchCourses} />
        </Modal>
      )}
      {editModalOpen && selectedCourse && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <EditCourse
            course={selectedCourse}
            setModalOpen={setEditModalOpen}
            fetchCourses={fetchCourses}
          />
        </Modal>
      )}
      <h2 className="text-3xl font-semibold text-center text-gray-800">Admin - Manage Courses</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mb-6"
      >
        Add Course
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{course.description}</p>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                <a
                  href={course.courselink || "#"}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Course
                </a>
                <p className="text-sm text-gray-500">Standard: {course.standard || "N/A"}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditClick(course)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
