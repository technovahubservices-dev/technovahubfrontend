import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Title from "../Components/Title";
import { useLocation } from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyX-5PWB3XYbrEIbJ2hxwHEVoj_d9KRMjmoGFJXI1x9Ccs3YOqY-fGl2VYtpheJ_3gV/exec";

const Contact = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.hash === "#contact-form") {
      const element = document.getElementById("contact-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  const contactCards = [
    {
      icon: <MapPin className="text-blue-600 w-7 h-7" />,
      title: "Address",
      info: "No.48 Lawspet Main Road, Puducherry-605008.",
      gradient: "from-blue-100/70 via-blue-50/50 to-cyan-100/70",
    },
    {
      icon: <Phone className="text-blue-700 w-7 h-7" />,
      title: "Phone",
      info: "+91 9629600230\n+91 9003530230",
      gradient: "from-blue-200/70 via-blue-50/40 to-indigo-100/60",
    },
    {
      icon: <Mail className="text-blue-500 w-7 h-7" />,
      title: "Email",
      info: "technovahubcareer@gmail.com",
      gradient: "from-cyan-100/80 via-blue-50/60 to-blue-100/80",
    },
    {
      icon: <Clock className="text-blue-800 w-7 h-7" />,
      title: "Working Hours",
      info: "9:00 AM - 9:00 PM",
      gradient: "from-blue-100/80 via-cyan-50/60 to-blue-200/70",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(e.currentTarget),
      });

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      e.currentTarget.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 mt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/50 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <Title text="Contact Us" />
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
          We'd love to hear from you. Reach out for questions, partnerships, or project enquiries.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 mt-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${card.gradient} backdrop-blur-xl hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 border border-white/50 flex flex-col justify-center`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-[10px] mt-1 whitespace-pre-line break-words">
                      {card.info}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative group w-full h-[300px] sm:h-[400px] lg:h-[480px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-cyan-300/20 blur-3xl rounded-3xl group-hover:opacity-80 transition duration-500" />

            <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl hover:shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] w-full h-full">
              <iframe
                title="Technovahub Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5204113856966!2d79.8105151147982!3d11.928178391930036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361f3c6c00001%3A0x1234567890abcdef!2s48%20Lawspet%20Main%20Rd%2C%20Puducherry%2C%20India!5e0!3m2!1sen!2sin!4v1695792000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="rounded-3xl"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div
          id="contact-form"
          className="relative w-full rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-xl shadow-xl p-6 sm:p-8 mt-12"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center">
            Send Us a Message
          </h3>
          <p className="text-gray-600 text-center mt-3 mb-8">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="formType" value="Contact Us" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us a little about your requirement..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl hover:scale-[1.01]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitted && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-700 border border-green-200">
                <CheckCircle className="w-5 h-5" />
                Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
