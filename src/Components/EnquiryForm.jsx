// EnquiryForm.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyX-5PWB3XYbrEIbJ2hxwHEVoj_d9KRMjmoGFJXI1x9Ccs3YOqY-fGl2VYtpheJ_3gV/exec"; // <-- replace with your latest Web App URL

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const formEl = e.currentTarget;
  if (loading) return;
  if (!form.agree) return alert("Please agree to the Terms & Conditions before submitting.");
  
  setLoading(true);

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: new FormData(formEl),
  })
    .then(() => {
      setSubmitted(true);
      setForm({ name: "", email: "", mobile: "", message: "", agree: false });
      formEl.reset();
    })
    .catch((err) => {
      console.error("❌ Error:", err);
      alert("Something went wrong! Please try again.");
    })
    .finally(() => setLoading(false));
};


  const closeModal = () => setSubmitted(false);

  return (
    <div className="relative max-w-lg mx-auto overflow-hidden">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-3xl text-left font-extrabold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
      >
        Enquiry Form
      </motion.h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Name */}
        <div className="relative">
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            required
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-1 rounded-xl border border-blue-100 bg-white/70 backdrop-blur-md text-gray-900 placeholder-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base sm:text-lg focus:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-gray-600 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            required
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-blue-100 bg-white/70 backdrop-blur-md text-gray-900 placeholder-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base sm:text-lg focus:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-gray-600 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
          >
            Email Address
          </label>
        </div>

        {/* Mobile */}
        <div className="relative">
          <input
            id="mobile"
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            autoComplete="off"
            required
            pattern="[0-9]{10}"
            title="Enter 10 digit mobile"
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-blue-100 bg-white/70 backdrop-blur-md text-gray-900 placeholder-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base sm:text-lg focus:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          />
          <label
            htmlFor="mobile"
            className="absolute left-4 top-2 text-gray-600 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
          >
            Mobile Number
          </label>
        </div>

        {/* Message (Optional) */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-blue-100 bg-white/80 backdrop-blur-md text-gray-900 placeholder-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base sm:text-lg resize-none focus:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-2 text-gray-600 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
          >
            Your Message (Optional)
          </label>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mt-1 accent-purple-600 w-5 h-5 cursor-pointer"
          />
          <label htmlFor="agree" className="text-gray-700 text-sm sm:text-base leading-snug">
            I agree to the{" "}
            <span className="text-purple-600 font-semibold hover:underline cursor-pointer">
              Terms & Conditions
            </span>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 rounded-full text-white font-semibold transition-all text-base sm:text-lg shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </motion.button>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm text-center"
            >
              <CheckCircle className="mx-auto text-green-500" size={64} />
              <h3 className="text-2xl font-semibold mt-4 text-gray-800">Done</h3>
              <p className="text-gray-600 mt-1">Submitted Successfully!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryForm;
