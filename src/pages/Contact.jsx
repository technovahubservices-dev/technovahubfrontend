import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Title from "../Components/Title";

const Contact = () => {
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

  return (
    <section className="relative py-20 mt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/50 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <Title text="Contact Us" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 mt-12 items-center">
          {/* Left: Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${card.gradient} backdrop-blur-xl 
                hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 border border-white/50 flex flex-col justify-center`}
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

          {/* Right: Google Map */}
          <div className="relative group w-full h-[300px] sm:h-[400px] lg:h-[480px]">
            {/* Glow Shadow */}
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
      </div>
    </section>
  );
};

export default Contact;
