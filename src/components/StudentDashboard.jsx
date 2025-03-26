"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "../Supabase";
import { Link } from "react-router-dom";

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
  const [progress, setProgress] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);     // State for error

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Please log in to access this page.");
        setUser(session.user);

        const progressResponse = await fetch(`http://127.0.0.1:8000/progress/${session.user.id}`);
        if (!progressResponse.ok) throw new Error("Failed to fetch progress.");
        const progressData = await progressResponse.json();
        setProgress(progressData);

        const { data: deadlineData } = await supabase
          .from("deadlines")
          .select("*")
          .eq("user_id", session.user.id)
          .order("due_date", { ascending: true });
        setDeadlines(deadlineData || []);

        const { data: forumData } = await supabase
          .from("forum_posts")
          .select("*")
          .order("created_at", { ascending: false });
        setForumPosts(forumData || []);

        supabase
          .channel("forum_posts")
          .on("postgres_changes", { event: "INSERT", schema: "public", table: "forum_posts" }, (payload) => {
            setForumPosts((prev) => [payload.new, ...prev]);
          })
          .subscribe();
      } catch (err) {
        setError(err.message);
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

  // Handle progress update
  const handleProgressUpdate = async (progressId, newCompletedLessons) => {
    const course = progress.find((p) => p._id === progressId);
    if (!course || newCompletedLessons < 0 || newCompletedLessons > course.total_lessons) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/progress/${progressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed_lessons: newCompletedLessons }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update progress");
      }

      const updatedProgress = await response.json();
      setProgress((prev) =>
        prev.map((p) => (p._id === progressId ? updatedProgress : p))
      );
    } catch (err) {
      setError(err.message || "Failed to update progress");
    }
  };

  // Render with loading and error states
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <head>
        <title>Student Dashboard - Tesla Academy</title>
        <meta name="description" content="Track your course progress, join forums, and get support at Tesla Academy." />
        <meta name="keywords" content="Tesla Academy, student dashboard, online courses, learning progress, forum" />
        <meta name="robots" content="index, follow" />
      </head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Welcome, {user?.email.split("@")[0]}!
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Your Progress</h2>
          {progress.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {progress.map((item, index) => (
                <HoverEffect key={item._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-full"
                  >
                    <div className="relative z-10 p-6 bg-gradient-to-r from-indigo-400 to-teal-400 flex-1">
                      <h4 className="text-white font-extrabold text-2xl mb-2">{item.course_title}</h4>
                      <p className="text-gray-100 mb-4">
                        Progress: {item.completed_lessons}/{item.total_lessons} Lessons
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-teal-600 h-2.5 rounded-full"
                          style={{ width: `${(item.completed_lessons / item.total_lessons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-4 bg-white flex flex-col items-start">
                      <label className="text-gray-700 mb-2">Update Completed Lessons:</label>
                      <input
                        type="number"
                        min="0"
                        max={item.total_lessons}
                        value={item.completed_lessons}
                        onChange={(e) => handleProgressUpdate(item._id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                </HoverEffect>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No progress data available yet.</p>
          )}
          <Link to="/courses" className="text-blue-600 underline mt-4 block text-center">View Courses</Link>
        </motion.div>

        {/* Other sections remain unchanged */}
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