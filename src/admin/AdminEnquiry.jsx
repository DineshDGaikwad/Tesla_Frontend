"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    class_name: "",
    board: "",
    subject: "",
  });

  // Fetch enquiries when the component mounts
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/enquiries"); // Replace with your backend URL
        setEnquiries(response.data);
        setFilteredEnquiries(response.data);
      } catch (err) {
        setError("Failed to fetch enquiries. Please try again later.");
      }
    };

    fetchEnquiries();
  }, []);

  // Filter enquiries based on search and filters
  useEffect(() => {
    let filtered = enquiries.filter((enquiry) => {
      return (
        (!filters.class_name || enquiry.class_name === filters.class_name) &&
        (!filters.board || enquiry.board === filters.board) &&
        (!filters.subject || enquiry.subject === filters.subject) &&
        (enquiry.name.toLowerCase().includes(search.toLowerCase()) ||
          enquiry.phone.toLowerCase().includes(search.toLowerCase()))
      );
    });

    setFilteredEnquiries(filtered);
  }, [search, filters, enquiries]);

  // Handle the deletion of an enquiry by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/enquiries/${id}`); // Replace with your backend URL
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry._id !== id)
      );
    } catch (err) {
      setError("Failed to delete enquiry. Please try again later.");
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-8">Admin Enquiries</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search by name or phone number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              name="class_name"
              value={filters.class_name}
              onChange={handleFilterChange}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Classes</option>
              <option value="10">10th</option>
              <option value="12">12th</option>
            </select>

            <select
              name="board"
              value={filters.board}
              onChange={handleFilterChange}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Boards</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
            </select>

            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>
        </div>

        {/* Added scrollable table for large screens */}
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
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry, index) => (
                  <tr
                    key={enquiry._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b transition-all hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{enquiry.name}</td>
                    <td className="px-6 py-4">{enquiry.class_name}</td>
                    <td className="px-6 py-4">{enquiry.board}</td>
                    <td className="px-6 py-4">{enquiry.subject}</td>
                    <td className="px-6 py-4">{enquiry.phone}</td>
                    <td className="px-6 py-4">{enquiry.enquiryMessage}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transition-colors hover:bg-red-600"
                        onClick={() => handleDelete(enquiry._id)}
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
