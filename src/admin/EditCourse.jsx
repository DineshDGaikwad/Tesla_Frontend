import { useState } from "react";

const EditCourse = ({ course, setModalOpen, fetchCourses }) => {
  const [editedCourse, setEditedCourse] = useState({ ...course });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/courses/${course._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCourse),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setModalOpen(false);
      fetchCourses(); // Fetch the updated list of courses
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Course</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedCourse.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedCourse.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="courselink" className="block text-sm font-medium text-gray-700">Course Link:</label>
          <input
            type="url"
            id="courselink"
            name="courselink"
            value={editedCourse.courselink}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="standard" className="block text-sm font-medium text-gray-700">Standard:</label>
          <select
            id="standard"
            name="standard"
            value={editedCourse.standard}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Standard</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{`${i + 1}th`}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
