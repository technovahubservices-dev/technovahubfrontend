import React, { useEffect } from "react";
import { Eye, Rocket } from "lucide-react";
import Title from "../Title";
import AOS from "aos";
import "aos/dist/aos.css";

const VisionMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 text-center">
        <div data-aos="fade-up">
          <Title text="OUR VISION & MISSION" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Vision */}
          <div
            className="relative p-6 md:p-10 rounded-3xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 text-left"
            data-aos="fade-right"
          >
            {/* Icon */}
            <div className="flex items-center gap-4 mb-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-200">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
                Vision
              </h2>
            </div>

            <p className="text-gray-700 text-sm md:text-lg  leading-relaxed">
              Our vision is to become a nationally recognized hub of excellence
              in <span className="text-blue-600 font-medium">technology education</span>, IT services
              and automation driven innovation. We aim to nurture
              <span className="text-cyan-600 font-medium"> future ready talent </span> and deliver
              transformative solutions that empower industries to advance.
            </p>
          </div>

          {/* Mission */}
          <div
            className="relative p-6 md:p-10 rounded-3xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 text-left"
            data-aos="fade-left"
          >
            {/* Icon */}
            <div className="flex items-center gap-4 mb-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-blue-200">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
                Mission
              </h2>
            </div>

            <p className="text-gray-700  text-sm   md:text-lg leading-relaxed">
              Our mission is to empower learners with
              <span className="text-blue-600 font-medium"> industry relevant skills </span> through
              hands on training and real world projects. We bridge the gap
              between academics and practical application creating
              <span className="text-cyan-600 font-medium"> future ready professionals </span> and
              supporting businesses with
              <span className="text-blue-500 font-medium"> automation and IT solutions</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
