import React from "react";
import { Award, Trophy } from "lucide-react";
import aiIcon from "../assets/images/ai-icon.png"; // adjust path if needed

const Takeaways = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Key Takeaways
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Earn recognition and showcase your achievements
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Certificate of Completion
                </h3>
                <p className="text-gray-600">
                  Receive an official certificate upon successfully completing
                  the 7-day challenge.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Featured Projects
                </h3>
                <p className="text-gray-600">
                  Best projects will be featured on our website and social media
                  platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Illustration */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30 blur-3xl rounded-full"></div>
            <img
              src={aiIcon}
              alt="AI Illustration"
              className="w-36 h-36 md:w-48 md:h-48 relative z-10 animate-pulse"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Takeaways;
