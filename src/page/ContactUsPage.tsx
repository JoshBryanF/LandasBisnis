import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCreateFeedback } from "../api/useCreateFeedback";


const ContactUsPage: React.FC = () => {
  const { createFeedback } = useCreateFeedback();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFeedback(formData);
      setSubmitted(true);
    } catch (err) {
      alert("Failed to send feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-2xl mx-auto min-h-[calc(100vh-theme(spacing.32))] flex flex-col justify-center px-6 py-16">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#B82132] mb-4">Contact Us</h1>
          <p className="text-gray-700 mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>

          {submitted ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you!</h2>
              <p className="text-gray-700">Your message has been successfully sent. We'll get back to you soon.</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-[#B82132] mb-1">Topic</label>
              <input
                type="text"
                name="topic"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B82132]"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#B82132] mb-1">Category</label>
              <select
                name="category"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B82132]"
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
              <label className="block font-semibold text-[#B82132] mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B82132]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#B82132] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Send Message
            </button>
          </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
