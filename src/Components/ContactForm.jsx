import React, { useState } from "react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzn0I6kMGuuRBZF5HVxZx5zqePJCQ4uaMd_onZX5-z1fJxZGcd-YnrGp-_dwRsbGYNhtQ/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
  await fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  alert("Enquiry submitted successfully!");
  form.reset();
} catch (error) {
  console.error(error);
  alert("Something went wrong!");
} 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Your name"
          required
          className="w-full px-4 py-3 border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Your phone number"
          required
          className="w-full px-4 py-3 border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full px-4 py-3 border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          placeholder="How can we help?"
          required
          className="w-full px-4 py-3 border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          name="message"
          rows="5"
          placeholder="Tell us a little about your requirement..."
          required
          className="w-full px-4 py-3 border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
};

export default ContactForm ;