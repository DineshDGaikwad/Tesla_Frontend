import React, { useState } from "react";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    course: "",
    board: "",
    standard: "",
    joining_date: "",
    address: "",
    contact_no: "",
    admission_type: "Offline Admission",
    fees: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);

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

  const validate = (name, value) => {
    switch (name) {
      case "student_name":
        if (!value.trim()) return "Student name is required.";
        if (value.length < 3) return "Name must be at least 3 characters.";
        break;
      case "course":
        if (!value) return "Course is required.";
        break;
      case "board":
        if (!value) return "Board is required.";
        break;
      case "standard":
        if (!value) return "Standard is required.";
        break;
      case "contact_no":
        if (!value) return "Contact number is required.";
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) return "Invalid phone number. Must be 10 digits.";
        break;
      case "joining_date":
        if (!value) return "Joining date is required.";
        break;
      case "address":
        if (!value) return "Address is required.";
        break;
      case "fees":
        if (!value) return "Fees is required.";
        if (isNaN(value) || parseFloat(value) <= 0) return "Invalid fee amount.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validate(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/admissions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit admission");
      setResponseMessage("Your admission has been submitted successfully!");
      setFormData({
        student_name: "",
        course: "",
        board: "",
        standard: "",
        joining_date: "",
        address: "",
        contact_no: "",
        fees: "",
      });
      setErrors({});
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admission Form</h2>
      {responseMessage && <p className="text-center text-green-500 mb-4">{responseMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Student Name</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className={`border w-full p-1 pl-3 rounded ${
              errors.student_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter student name"
          />
          {errors.student_name && (
            <p className="text-red-500 text-sm mt-1">{errors.student_name}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`border w-full p-1 pl-3 rounded ${
                errors.course ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Board</label>
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              className={`border w-full p-1 pl-3 rounded ${
                errors.board ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Board</option>
              {boards.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
            {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board}</p>}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Standard</label>
            <select
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className={`border w-full p-1 pl-3 rounded ${
                errors.standard ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Standard</option>
              {standards.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
              ))}
            </select>
            {errors.standard && <p className="text-red-500 text-sm mt-1">{errors.standard}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Joining Date</label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className={`border w-full p-1 pl-3 rounded ${
                errors.joining_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.joining_date && <p className="text-red-500 text-sm mt-1">{errors.joining_date}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`border w-full p-1 pl-3 rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your address"
            rows="2"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            className={`border w-full p-1 pl-3 rounded ${
              errors.contact_no ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
          {errors.contact_no && <p className="text-red-500 text-sm mt-1">{errors.contact_no}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Fees</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className={`border w-full p-1 pl-3 rounded ${
              errors.fees ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter fee amount"
          />
          {errors.fees && <p className="text-red-500 text-sm mt-1">{errors.fees}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
