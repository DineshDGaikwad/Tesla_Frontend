"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "../Supabase";

// HoverEffect Component
const HoverEffect = ({ children }) => (
  <div className="relative overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300 ease-in-out">
    {children}
  </div>
);

// Dummy FAQs
const faqs = [
  { question: "How do I access my courses?", answer: "Log in and visit the 'Courses' page." },
  { question: "Can I change my enrolled course?", answer: "Contact support via the form below." },
];

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Please log in to access this page.");
        setUser(session.user);

        // Fetch purchased courses from FastAPI
        const purchasedResponse = await fetch(`http://127.0.0.1:8000/progress/${session.user.id}`);
        if (!purchasedResponse.ok) throw new Error("Failed to fetch purchased courses.");
        const purchasedData = await purchasedResponse.json();
        console.log("Initial fetched courses:", purchasedData);
        const validCourses = purchasedData.filter(course => course._id && typeof course._id === "string");
        setPurchasedCourses(validCourses);

        // Fetch deadlines from Supabase
        const { data: deadlineData } = await supabase
          .from("deadlines")
          .select("*")
          .eq("user_id", session.user.id)
          .order("due_date", { ascending: true });
        setDeadlines(deadlineData || []);

        // Fetch forum posts from Supabase
        const { data: forumData } = await supabase
          .from("forum_posts")
          .select("*")
          .order("created_at", { ascending: false });
        setForumPosts(forumData || []);

        // Subscribe to real-time forum updates
        supabase
          .channel("forum_posts")
          .on("postgres_changes", { event: "INSERT", schema: "public", table: "forum_posts" }, (payload) => {
            setForumPosts((prev) => [payload.new, ...prev]);
          })
          .subscribe();
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle marking a course as completed
  const handleMarkCompleted = async (progressId, currentStatus) => {
    if (!progressId || typeof progressId !== "string") {
      setError("Invalid course ID. Please refresh the page or contact support.");
      console.error("Invalid progressId:", progressId);
      return;
    }

    try {
      console.log(`Updating course with ID: ${progressId}, current status: ${currentStatus}`);
      const response = await fetch(`http://127.0.0.1:8000/complete_course/${progressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update course completion status");
      }

      const updatedCourse = await response.json();
      console.log("Updated course from API:", updatedCourse);

      // Update state with the fresh data
      setPurchasedCourses((prev) => {
        const newCourses = prev.map((course) =>
          course._id === progressId ? { ...course, completed: updatedCourse.completed } : course
        );
        console.log("Updated purchasedCourses state:", newCourses);
        return newCourses;
      });

      alert(`Course marked as ${!currentStatus ? "completed" : "in progress"}!`);
    } catch (err) {
      setError(err.message);
      console.error("Update error:", err);
    }
  };

  // Handle forum post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const { error } = await supabase
      .from("forum_posts")
      .insert({ user_id: user.id, content: newPost, created_at: new Date().toISOString() });
    if (!error) setNewPost("");
    else setError("Failed to post to forum.");
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    const { error } = await supabase
      .from("contact_requests")
      .insert({ user_id: user?.id, message: contactMessage, created_at: new Date().toISOString() });
    if (!error) {
      setContactMessage("");
      alert("Your message has been sent!");
    } else {
      setError("Failed to send message.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      {/* SEO Optimization */}
      <head>
        <title>Student Dashboard - Tesla Academy</title>
        <meta name="description" content="View and manage your purchased courses, join forums, and get support at Tesla Academy." />
        <meta name="keywords" content="Tesla Academy, student dashboard, online courses, purchased courses, forum" />
        <meta name="robots" content="index, follow" />
      </head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Welcome, {user?.email.split("@")[0]}!
        </h1>

        {/* Purchased Courses */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Your Purchased Courses</h2>
          {purchasedCourses.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {purchasedCourses.map((course, index) => (
                <HoverEffect key={course._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-full"
                  >
                    <div className="relative z-10 p-6 bg-gradient-to-r from-indigo-400 to-teal-400 flex-1">
                      <h4 className="text-white font-extrabold text-2xl mb-2">{course.course_title}</h4>
                      <p className="text-gray-100 mb-2">
                        Status: {course.completed ? "Completed" : "In Progress"}
                      </p>
                      {/* Assuming course.link exists; if not, adjust accordingly */}
                      {course.link ? (
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-200 underline hover:text-white transition duration-200"
                        >
                          Course Link
                        </a>
                      ) : (
                        <p className="text-gray-200">No link available</p>
                      )}
                    </div>
                    <div className="p-4 bg-white flex flex-col items-start">
                      <button
                        onClick={() => handleMarkCompleted(course._id, course.completed)}
                        className={`mt-2 px-4 py-2 rounded-lg text-white transition duration-200 ${
                          course.completed
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {course.completed ? "Mark as In Progress" : "Mark as Completed"}
                      </button>
                    </div>
                  </motion.div>
                </HoverEffect>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">You haven’t purchased any courses yet.</p>
          )}
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Deadlines</h2>
          {deadlines.length > 0 ? (
            <ul className="space-y-4">
              {deadlines.map((deadline) => (
                <li key={deadline.id} className="flex justify-between items-center">
                  <span>{deadline.title}</span>
                  <span className={new Date(deadline.due_date) < new Date() ? "text-red-600" : "text-gray-600"}>
                    Due: {new Date(deadline.due_date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming deadlines.</p>
          )}
        </motion.div>

        {/* Forum / Live Q&A */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Forum / Live Q&A</h2>
          <form onSubmit={handlePostSubmit} className="mb-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Ask a question or share something..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Post
            </button>
          </form>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {forumPosts.length > 0 ? (
              forumPosts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    By {post.user_id === user.id ? "You" : "Another Student"} -{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts yet. Start the conversation!</p>
            )}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Help & Support</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">FAQs</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-gray-800">{faq.question}</p>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-medium mb-2">Contact Us</h3>
          <form onSubmit={handleContactSubmit}>
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Type your query here..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentDashboard;