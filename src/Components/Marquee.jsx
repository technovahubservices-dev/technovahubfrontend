import React from "react";

const Marquee = () => {
  return (
    <section className="relative w-full py-10 overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200%] bg-white/10 blur-3xl opacity-30 animate-pulse"></div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden select-none">
        <div className="flex animate-marquee space-x-10">
          {/* Duplicate for seamless loop */}
          {Array(2)
            .fill()
            .map((_, i) => (
              <h2
                key={i}
                className="text-[7vw] sm:text-[5vw] md:text-[3vw] font-extrabold uppercase bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent whitespace-nowrap tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              >
                WE AUTOMATE THE ROUTINE — SO YOU CAN INNOVATE THE EXTRAORDINARY ⚙️
              </h2>
            ))}
        </div>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Marquee;
