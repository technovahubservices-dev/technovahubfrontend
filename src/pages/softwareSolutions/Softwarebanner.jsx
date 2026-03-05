import React from "react";
import ecosystemImage from "../../assets/images/software-ecosystem-option-4.svg";

const Softwarebanner = () => {
  return (
    <header className="relative pt-28 md:pt-44 h-auto md:min-h-[80vh] overflow-hidden font-poppins bg-[#f7f7f7]">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-0 h-full">
        <div className="flex flex-col-reverse lg:flex-row h-full items-center gap-10">
          <div className="flex-1 space-y-5 z-10 relative">
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

            <h3 className="text-md sm:text-lg md:text-xl font-medium text-blue-600">
              Delivering Business and Digital Transformation
            </h3>

            <p className="text-gray-600 leading-relaxed max-w-full sm:max-w-xl">
              If you are looking for a true professional company then you are at
              the right place for your solution. We have a complete team of
              designers and developers to give a perfect blend of interactivity
              and creativity.
            </p>

            <p className="text-gray-700 leading-relaxed max-w-full sm:max-w-xl bg-blue-50 border-l-4 border-blue-500 rounded-r-lg px-4 py-3 shadow-sm">
              We automate workflows through intelligent{" "}
              <span className="font-semibold text-blue-700">CRM systems</span>{" "}
              powered by{" "}
              <span className="font-semibold text-blue-700">
                AI Agents, RAG and Large Language Models (LLMs)
              </span>
              . Our solutions help organizations{" "}
              <span className="font-semibold text-blue-700">
                streamline operations
              </span>
              , enhance decision making and scale efficiently with advanced AI
              technologies.
            </p>

            <ul className="space-y-3 sm:space-y-4 max-w-full sm:max-w-xl mt-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  Technova Hub delivers automation solutions for industrial
                  workflows, improving efficiency and operational performance.
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  We enable businesses to manage and optimize operations through
                  AI-driven solutions.
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-700 leading-relaxed hover:text-blue-600 transition-colors text-sm sm:text-base">
                  Expertise in Artificial Intelligence, Machine Learning and
                  Deep Learning implementation to drive intelligent, scalable
                  outcomes.
                </span>
              </li>
            </ul>

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

          <div className="flex-1 relative w-full flex justify-center items-center z-0">
            <img
              src={ecosystemImage}
              alt="Software ecosystem illustration for CRM, Mobile App and BI App development"
              className="w-full max-w-[440px] sm:max-w-[620px] md:max-w-[760px] xl:max-w-[840px] object-contain rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Softwarebanner;
