import React from "react";
import { motion } from "framer-motion";
import sample1 from "../assets/images/banner4.mp4";
import sample2 from "../assets/images/banner2.mp4";
import sample3 from "../assets/images/banner1.mp4";
import sample4 from "../assets/images/banner4.mp4";
import sample5 from "../assets/images/banner4.mp4";

const videos = [
  { src: sample1, title: "Artificial Intelligence", desc: "Workshop @ Technovahub • 2025", big: true },
  { src: sample2, title: "AI Lab", desc: "Hands-on Demo" },
  { src: sample3, title: "Machine Learning", desc: "Interactive Projects" },
  { src: sample4, title: "Robotics & Vision", desc: "Future Tech" },
  { src: sample5, title: "Generative AI", desc: "Creative Intelligence" },
];

const VideoBanner = () => {
  return (
    <section className="relative py-16 md:px-6  md:mt-[100px] overflow-hidden">
      {/* Light Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Experience the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Future of AI Agent
            </span>
          </h2>
          <p className="text-gray-600">
            A glimpse into our workshops, innovations, and hands-on sessions.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative group overflow-hidden rounded-2xl shadow-lg border border-white/20 bg-white/5 backdrop-blur-md ${
                video.big ? "col-span-2 row-span-2" : ""
              }`}
            >
              {/* Video */}
              <video
                src={video.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>

              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/50 transition-all duration-500"></div>

              {/* Text Overlay */}
              <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-md">
                  {video.title}
                </h3>
                <p className="text-gray-200 text-sm">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
