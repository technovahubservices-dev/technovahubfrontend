import React, { useEffect, useState } from "react";
import banner1 from "../assets/images/indoor.jpg";
import banner2 from "../assets/images/train.jpg";
import banner4 from "../assets/images/4.jpg";
import logo from "../assets/images/logoremove.png";

const Coursebanner = () => {
  const images = [banner2, banner4, banner1];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden mt-[100px]">
      {/* === Background Slideshow === */}
      <div></div>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out`}
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === current ? 1 : 0,
            transform: index === current ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1.5s ease, transform 4s ease",
          }}
        />
      ))}

      {/* === Gradient Overlay === */}
      <div className="absolute inset-0 bg-red/70" />

      {/* === Subtle Particles / Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191, 182, 182, 0.08)_0%,transparent_70%)]" />

      {/* === Content === */}
      <div className="relative z-20 text-center px-6">
        {/* <div className="mx-auto mb-6 flex justify-center">
          <img
            src={logo}
            alt="Technovahub Logo"
            className="w-24 md:w-32 drop-shadow-lg animate-pulse"
          />
        </div> */}

        {/* <div className="backdrop-blur-md bg-white/40 p-6 rounded-2xl inline-block shadow-xl border border-white/20">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg animate-fadeInUp">
            Internshiop <span className="text-blue-400">Offered</span>
          </h1>
          <p className="mt-3 text-blue-100 text-sm md:text-lg font-light text-blue-400 animate-fadeInUp delay-200">
            Empowering innovation through hands-on training and real-world learning.
          </p>
        </div> */}
      </div>

      {/* === Custom Animations === */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Coursebanner;
