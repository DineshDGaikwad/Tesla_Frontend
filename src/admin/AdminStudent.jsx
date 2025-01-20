"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStudent = () => {
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    admissionType: "",
    course: "",
    board: "",
    standard: "",
  });
  const [editingAdmission, setEditingAdmission] = useState(null); // Track the admission being edited

  const courses = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
  ];
  const boards = ["CBSE", "ICSE", "State Board", "IB", "Cambridge"];
  const standards = [
    "10th Standard",
    "11th Standard",
    "12th Standard",
    "Graduate",
    "Postgraduate",
  ];

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admissions/");
        setAdmissions(response.data);
        setFilteredAdmissions(response.data);
      } catch (err) {
        setError("Failed to fetch admissions. Please try again later.");
      }
    };

    fetchAdmissions();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(searchQuery, updatedFilters);
  };

  const applyFilters = (query, filterValues) => {
    let filtered = admissions.filter((admission) =>
      admission.student_name.toLowerCase().includes(query)
    );

    if (filterValues.admissionType) {
      filtered = filtered.filter(
        (admission) => admission.admission_type === filterValues.admissionType
      );
    }

    if (filterValues.course) {
      filtered = filtered.filter(
        (admission) => admission.course === filterValues.course
      );
    }

    if (filterValues.board) {
      filtered = filtered.filter(
        (admission) => admission.board === filterValues.board
      );
    }

    if (filterValues.standard) {
      filtered = filtered.filter(
        (admission) => admission.standard === filterValues.standard
      );
    }

    setFilteredAdmissions(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admissions/${id}`);
      setAdmissions((prevAdmissions) =>
        prevAdmissions.filter((admission) => admission._id !== id)
      );
      setFilteredAdmissions((prevFilteredAdmissions) =>
        prevFilteredAdmissions.filter((admission) => admission._id !== id)
      );
    } catch (err) {
      setError("Failed to delete admission. Please try again later.");
    }
  };

  const handleEditClick = (admission) => {
    setEditingAdmission(admission); // Set the current admission for editing
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAdmission({ ...editingAdmission, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/admissions/${editingAdmission._id}`,
        editingAdmission
      );
      setAdmissions((prevAdmissions) =>
        prevAdmissions.map((admission) =>
          admission._id === editingAdmission._id ? editingAdmission : admission
        )
      );
      setFilteredAdmissions((prevFilteredAdmissions) =>
        prevFilteredAdmissions.map((admission) =>
          admission._id === editingAdmission._id ? editingAdmission : admission
        )
      );
      setEditingAdmission(null); // Close the edit form
    } 
    catch (err) {
      setError("Failed to update admission. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-8">Admin Admissions</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              name="admissionType"
              value={filters.admissionType}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Admission Types</option>
              <option value="Online Admission">Online</option>
              <option value="Offline Admission">Offline</option>
            </select>

            <select
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Courses</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              name="board"
              value={filters.board}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Boards</option>
              {boards.map((board, index) => (
                <option key={index} value={board}>
                  {board}
                </option>
              ))}
            </select>

            <select
              name="standard"
              value={filters.standard}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Standards</option>
              {standards.map((standard, index) => (
                <option key={index} value={standard}>
                  {standard}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-8">
          <table className="table-auto w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Admission Type</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Board</th>
                <th className="px-6 py-4 font-medium">Standard</th>
                <th className="px-6 py-4 font-medium">Joining Date</th>
                <th className="px-6 py-4 font-medium">Address</th>
                <th className="px-6 py-4 font-medium">Contact No.</th>
                <th className="px-6 py-4 font-medium">Fees</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.length > 0 ? (
                filteredAdmissions.map((admission) => (
                  <tr key={admission._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{admission.student_name}</td>
                    <td className="px-6 py-4">{admission.admission_type}</td>
                    <td className="px-6 py-4">{admission.course}</td>
                    <td className="px-6 py-4">{admission.board}</td>
                    <td className="px-6 py-4">{admission.standard}</td>
                    <td className="px-6 py-4">{admission.joining_date}</td>
                    <td className="px-6 py-4">{admission.address}</td>
                    <td className="px-6 py-4">{admission.contact_no}</td>
                    <td className="px-6 py-4">{admission.fees}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditClick(admission)}
                        className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg transition-colors hover:bg-green-600 mb-2 w-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admission._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transition-colors hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editingAdmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-11/12 sm:w-full max-w-lg">
              <h2 className="text-2xl font-bold text-teal-600 mb-4">Edit Admission</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="student_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="student_name"
                    name="student_name"
                    value={editingAdmission.student_name}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="admission_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Admission Type
                  </label>
                  <select
                    id="admission_type"
                    name="admission_type"
                    value={editingAdmission.admission_type}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="Online Admission">Online</option>
                    <option value="Offline Admission">Offline</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={editingAdmission.course}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="board"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Board
                  </label>
                  <select
                    id="board"
                    name="board"
                    value={editingAdmission.board}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {boards.map((board, index) => (
                      <option key={index} value={board}>
                        {board}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="standard"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Standard
                  </label>
                  <select
                    id="standard"
                    name="standard"
                    value={editingAdmission.standard}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {standards.map((standard, index) => (
                      <option key={index} value={standard}>
                        {standard}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="joining_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joining_date"
                    name="joining_date"
                    value={editingAdmission.joining_date}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={editingAdmission.address}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contact_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact No.
                  </label>
                  <input
                    type="text"
                    id="contact_no"
                    name="contact_no"
                    value={editingAdmission.contact_no}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fees"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fees
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    value={editingAdmission.fees}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div className="flex justify-end">
                <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingAdmission(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudent;
