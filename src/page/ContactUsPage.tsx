import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submit (e.g., call API or show message)
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white">
        <NavBar/>
      <div className="max-w-3xl mx-auto py-25">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-8">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-800 mb-1">Topic</label>
            <input
              type="text"
              name="topic"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-1">Category</label>
            <select
                name="category"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={formData.category}
                onChange={handleChange}
                required
            >
            <option value="">Select a category</option>
            <option value="feedback">Feedback</option>
            <option value="bug">Bug Report</option>
            <option value="business">Business Inquiry</option>
            <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUsPage;
