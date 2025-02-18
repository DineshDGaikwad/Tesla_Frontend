import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import supabase from '../Supabase'; // Ensure you have imported your Supabase client

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: createPassword,
        options: {
          emailRedirectTo: 'http://localhost:3000/login', // Redirect after email confirmation
          data: {
            firstName,
            lastName,
          },
        },
      });

      if (error) {
        throw error;
      }

      const successMessage = 'Registration successful! Please check your email to verify your account.';
      setMessage(successMessage);
      toast.success(successMessage);

      console.log('Supabase signup response:', data);
    } catch (error) {
      const errorMessage = error.message;
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover"
      style={{
        backgroundImage: "url('https://viditrade.com/wp-content/uploads/2022/04/login-pg-img.jpg')",
      }}
    >
      <ToastContainer /> {/* Add ToastContainer to render toast messages */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Tesla Academy</h2>
        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div className="rounded-md shadow-sm">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="flex space-x-4">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="createPassword" className="block text-sm font-medium text-gray-700">
              Create new password
            </label>
            <input
              id="createPassword"
              name="createPassword"
              type="password"
              required
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
          {message && (
            <p className="mt-2 text-sm text-red-600">{message}</p> // Display the message
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;