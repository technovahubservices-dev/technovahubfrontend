import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../../assets/images/b2.jpg";
import banner2 from "../../assets/images/train.jpg";
import banner3 from "../../assets/images/newimg.jpeg";
import banner4 from "../../assets/images/4.jpg";
import Agile from "../../assets/agile2.jpg";
import Title from "../../Components/Title";

const Softwarebanner = () => {
  const images = [banner1, banner2, banner3, banner4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative pt-28 md:pt-44 h-auto md:min-h-[80vh] overflow-hidden font-poppins bg-[#f7f7f7]">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-0 h-full">
        <div className="flex flex-col-reverse lg:flex-row h-full items-center gap-10">

          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-5 z-10 relative">
            {/* Heading */}
            <div className="flex flex-col items-start justify-start text-left">
              <h1
                className="
              text-2xl sm:text-3xl md:text-4xl font-extrabold
              bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400
              text-transparent bg-clip-text
              mb-4 md:mb-6 drop-shadow-md
              leading-tight
            "
              >
                Our Services
              </h1>
            </div>

            {/* Subheading */}
            <h3 className="text-md sm:text-lg md:text-xl font-medium text-blue-600">
              Delivering Business and Digital Transformation
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-full sm:max-w-xl">
              If you are looking for a true professional company then you are at the right place for your solution. We have a complete team of designers & developers to give a perfect blend of interactivity & creativity.
            </p>

            {/* Technova Hub Corporate Profile */}
            <ul className="space-y-3 sm:space-y-4 max-w-full sm:max-w-xl mt-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 text-blue-500">➤</span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  Technova Hub delivers automation solutions for industrial workflows, improving efficiency and operational performance.
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 text-blue-500">➤</span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  We enable businesses to manage and optimize operations through AI-driven solutions.
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 text-blue-500">➤</span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  Expertise in Artificial Intelligence, Machine Learning, and Deep Learning implementation to drive intelligent, scalable outcomes.
                </span>
              </li>
            </ul>

            {/* Call to Action Button */}
            <button
              className="
            mt-4 inline-block
            bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
            hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
            text-white font-semibold
            px-6 py-3 rounded-md
            transition-all duration-300
            shadow-md hover:shadow-lg
          "
            >
              DISCUSS YOUR PROJECT
            </button>
          </div>

          {/* RIGHT IMAGE / GRAPHIC */}
          <div className="flex-1 relative w-full flex justify-center items-center z-0">
            <img
              src={Agile}
              alt="Agile Development Process"
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] object-contain"
            />
          </div>
        </div>
      </div>
    </header>



  );
};

export default Softwarebanner;
