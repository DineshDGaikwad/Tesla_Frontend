"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/payments/");
        setPayments(response.data);
      } catch (err) {
        setError("Failed to fetch payments. Please try again later.");
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/payments/${id}`);
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== id)
      );
    } catch (err) {
      setError("Failed to delete payment. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-8">Admin Payments</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-8">
          <table className="table-auto w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Payment Amount</th>
                <th className="px-6 py-4 font-medium">Payment Method</th>
                <th className="px-6 py-4 font-medium">Payment Status</th>
                <th className="px-6 py-4 font-medium">Payment Date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{payment.student_name}</td>
                    <td className="px-6 py-4">{payment.amount}</td>
                    <td className="px-6 py-4">{payment.method}</td>
                    <td className="px-6 py-4">{payment.status}</td>
                    <td className="px-6 py-4">{payment.payment_date}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                        onClick={() => handleDelete(payment._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No payments found.
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

export default AdminPayment;
