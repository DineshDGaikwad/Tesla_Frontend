"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);

  // Fetch enquiries when the component mounts
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/enquiries"); // Replace with your backend URL
        setEnquiries(response.data);
      } catch (err) {
        setError("Failed to fetch enquiries. Please try again later.");
      }
    };

    fetchEnquiries();
  }, []);

  // Handle the deletion of an enquiry by ID
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`http://localhost:8000/enquiries/${id}`); // Replace with your backend URL
      
      // Update the state to remove the deleted enquiry from the UI
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry._id !== id)
      );
    } catch (err) {
      setError("Failed to delete enquiry. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-8">Admin Enquiries</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-8">
          <table className="table-auto w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 font-medium text-sm">Name</th>
                <th className="px-6 py-4 font-medium text-sm">Class</th>
                <th className="px-6 py-4 font-medium text-sm">Board</th>
                <th className="px-6 py-4 font-medium text-sm">Subject</th>
                <th className="px-6 py-4 font-medium text-sm">Phone</th>
                <th className="px-6 py-4 font-medium text-sm">Message</th>
                <th className="px-6 py-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enquiry, index) => (
                  <tr
                    key={enquiry._id} // Use unique ID as the key
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b transition-all hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{enquiry.name}</td>
                    <td className="px-6 py-4">{enquiry.class_name}</td>
                    <td className="px-6 py-4">{enquiry.board}</td>
                    <td className="px-6 py-4">{enquiry.subject}</td>
                    <td className="px-6 py-4">{enquiry.country} {enquiry.phone}</td>
                    <td className="px-6 py-4">{enquiry.enquiryMessage}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transition-colors hover:bg-red-600"
                        onClick={() => handleDelete(enquiry._id)} // Pass ID to handleDelete
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No enquiries found.
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

export default AdminEnquiry;
