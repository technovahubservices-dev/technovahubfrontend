import React, { useEffect } from "react";
import { FaBookReader } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import Title from "../Title";
import AOS from "aos";
import "aos/dist/aos.css";

const cards = [
  {
    icon: <FaBookReader className="w-14 h-14 text-blue-600 mb-4" />,
    title: "Smart Class",
    desc: "Tech-upgraded classrooms enhancing learning and engagement for students and teachers. 🎓",
  },
  {
    icon: <GrWorkshop className="w-14 h-14 text-blue-600 mb-4" />,
    title: "Practical Lab",
    desc: "Hands-on spaces where students explore concepts interactively through experiments. 🔬",
  },
  {
    icon: <SiGoogleclassroom className="w-14 h-14 text-blue-600 mb-4" />,
    title: "Class Rooms",
    desc: "Spacious, well-lit, and comfortable classrooms that inspire focused learning. 🌞",
  },
  {
    icon: <MdMeetingRoom className="w-14 h-14 text-blue-600 mb-4" />,
    title: "Seminar Hall",
    desc: "Spacious and well-equipped hall designed for productive discussions and learning sessions.",
  }
];

const Ourfacilities = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Decorative Blurred Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <Title text="Our Facilities" />

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/70 shadow-lg border border-blue-100 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-100/80 hover:to-cyan-100/70"
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-400/20 via-cyan-300/20 to-transparent blur-xl rounded-2xl"></div>

              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="p-4 bg-white rounded-full shadow-md mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ourfacilities;
