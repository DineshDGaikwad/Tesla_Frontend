"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStudent = () => {
  const [admissions, setAdmissions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch admissions when the component mounts ...
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admissions"); // Replace with your backend URL
        setAdmissions(response.data);
      } catch (err) {
        setError("Failed to fetch admissions. Please try again later.");
      }
    };

    fetchAdmissions();
  }, []);

  // Handle the deletion of an admission by ID
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`http://localhost:8000/admissions/${id}`); // Replace with your backend URL

      // Update the state to remove the deleted admission from the UI
      setAdmissions((prevAdmissions) =>
        prevAdmissions.filter((admission) => admission._id !== id)
      );
    } catch (err) {
      setError("Failed to delete admission. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-8">Admin Admissions</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-8">
          <table className="table-auto w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 font-medium text-sm">Student Name</th>
                <th className="px-6 py-4 font-medium text-sm">Course</th>
                <th className="px-6 py-4 font-medium text-sm">Board</th>
                <th className="px-6 py-4 font-medium text-sm">Subjects</th>
                <th className="px-6 py-4 font-medium text-sm">Joining Date</th>
                <th className="px-6 py-4 font-medium text-sm">Address</th>
                <th className="px-6 py-4 font-medium text-sm">Contact No.</th>
                <th className="px-6 py-4 font-medium text-sm">Fees</th>
                <th className="px-6 py-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.length > 0 ? (
                admissions.map((admission, index) => (
                  <tr
                    key={admission._id} // Use unique ID as the key
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b transition-all hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{admission.student_name}</td> {/* Corrected to match your data field */}
                    <td className="px-6 py-4">{admission.course}</td>
                    <td className="px-6 py-4">{admission.board}</td>
                    <td className="px-6 py-4">{admission.subjects}</td>
                    <td className="px-6 py-4">{admission.joining_date}</td> {/* Corrected to match your data field */}
                    <td className="px-6 py-4">{admission.address}</td>
                    <td className="px-6 py-4">{admission.contact_no}</td> {/* Corrected to match your data field */}
                    <td className="px-6 py-4">{admission.fees}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transition-colors hover:bg-red-600"
                        onClick={() => handleDelete(admission._id)} // Pass ID to handleDelete
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
