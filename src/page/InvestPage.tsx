import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const InvestPage = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending data to backend
    console.log({ amount, message });
    setSubmitted(true);
  };

  return (
    <div>
      <NavBar />
      <section className="max-w-xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center text-[#B82132] mb-8">
          Invest in This Project
        </h1>

        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded">
            Thank you for your investment! We'll contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <label className="block mb-2 font-medium">Amount (in IDR):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              required
              min={10000}
              placeholder="Enter amount e.g., 500000"
            />

            <label className="block mb-2 font-medium">Message to the Project Owner (optional):</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              rows={4}
              placeholder="Share your motivation or expectations..."
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#B82132] text-white px-4 py-2 rounded"
            >
              Submit Investment
            </button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default InvestPage;
