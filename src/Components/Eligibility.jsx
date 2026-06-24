import React from "react";
import { GraduationCap, Users } from "lucide-react";

const Eligibility = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who Can Join?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This challenge is designed for ambitious students ready to explore AI
          </p>
        </div>

        {/* Card */}
        <div className="p-10 bg-white border border-blue-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Engineering & Medical Students
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                All branches and specializations are welcome
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-medium">
                    All Engineering Branches
                  </span>
                </div>
                <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-medium">
                    All Medical Branches
                  </span>
                </div>
                <div className="px-4 py-2 bg-purple-100 rounded-lg border border-purple-200">
                  <span className="text-purple-700 font-medium">Any Year</span>
                </div>
              </div>
            </div>

            {/* Right Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
