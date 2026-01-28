import React from "react";
import adsImg from "../assets/images/newads.jpg";
import { Link } from "react-router-dom";

const Homeseven = () => {
  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2 gap-0">

          {/* Image Side */}
          <div className="bg-blue-50 flex items-center justify-center p-6">
            <img
              src={adsImg}
              alt="7 Days AI Challenge"
              className="w-full h-auto object-contain rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Side */}
          <div className="p-10 flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-4">
                Featured Event
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                7 Days AI Challenge
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Dive deep into Artificial Intelligence with our intensive 7-day workshop. Learn, build, and deploy your own AI models.
              </p>
            </div>

            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="https://7days-ai-innovation-landingpage.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Visit Website
              </a>

              <Link
                to="/7Days-AI-innovation/welcome"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-700 transition-all duration-200 bg-white border border-blue-200 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enroll Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Homeseven;
