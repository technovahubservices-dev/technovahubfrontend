import React from "react";
import { motion } from "framer-motion";
import adsImg from "../assets/newads.jpg";
import { Link } from "react-router-dom";

const MotionLink = motion(Link); // ✅ wrap Link for animation

const Home = () => {
  return (
    <section className="relative flex flex-col items-center max-w-7xl mx-auto justify-center min-h-screen overflow-hidden px-4">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 blur-3xl -z-10" />

      {/* Animated image container */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mx-auto rounded-2xl overflow-hidden shadow-2xl w-[85%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
          <img
            src={adsImg}
            alt="Advertisement"
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text & CTA */}
        <div className="mt-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Discover What’s New!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Experience our latest offer and make your everyday moments extraordinary.
          </p>

          <MotionLink
            to="/welcome" // ✅ use 'to' instead of 'href'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Enroll now
          </MotionLink>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
