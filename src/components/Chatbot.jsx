import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const userChat = { sender: "user", text: userMessage };
    setChatHistory((prev) => [...prev, userChat]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chatbot/", {
        query: userMessage,
      });
      const botChat = { sender: "bot", text: response.data.response || "Sorry, I couldn't understand." };
      setChatHistory((prev) => [...prev, botChat]);
    } catch (error) {
      const errorChat = {
        sender: "bot",
        text: error.response ? error.response.data.detail : "Error processing your message. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorChat]);
    } finally {
      setUserMessage("");
    }
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 max-w-md mx-auto">
      <div className="h-80 overflow-y-auto mb-4 bg-white p-2 rounded-lg">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`${
                chat.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              } px-4 py-2 rounded-lg max-w-sm`}
            >
              {chat.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
