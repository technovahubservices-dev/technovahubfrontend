import React from "react";
import { motion } from "framer-motion";
import EnquiryForm from "./EnquiryForm";

const contactInfo = [
  {
    icon: "📞",
    label: "Phone",
    value: "+91 8438431000",
    href: "tel:+918438431000",
  },
  {
    icon: "📧",
    label: "Email",
    value: "technovahubcareer@gmail.com",
    href: "mailto:technovahubcareer@gmail.com",
  },
  {
    icon: "🌐",
    label: "Website",
    value: "www.technovahub.in",
    href: "https://www.technovahub.in",
  },
];

const ContactForm = () => {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 mt-[10px] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-60 h-60 sm:w-80 sm:h-80 bg-blue-200/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-purple-200/50 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-8">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Get in Touch with Technovahub 🚀
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you’re ready to join our AI programs or just exploring — we’d love to hear from you.
          </p>
        </motion.div> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left - Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg rounded-2xl p-6 sm:p-8"
          >
            <EnquiryForm />
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl border border-gray-100 shadow-lg rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-3xl sm:text-3xl text-left font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Contact Details
            </h3>
            <p className="text-gray-600 mb-8 text-center lg:text-left leading-relaxed text-base sm:text-lg">
              Need help or want to collaborate? Our team is here to guide you every step of the way.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.icon === "🌐" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <div className="min-w-12 h-12 flex items-center justify-center text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-md">
                    {info.icon}
                  </div>
                  <div className="truncate">
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="text-gray-800 text-[13px] sm:text-lg font-semibold break-words">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center border-t border-gray-200 pt-6">
              <p className="text-gray-600 text-sm sm:text-base">
                📍 Empowering students across India through AI & Innovation
              </p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-blue-600 font-semibold mt-2 text-sm sm:text-base"
              >
                ⚡ Limited seats available — Join today!
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
