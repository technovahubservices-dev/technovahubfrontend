import React, { useEffect, useState } from "react";

// ✅ Counter Hook (unchanged but smooth)
const useCounter = (end, duration = 4000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [end, duration]);

  return count;
};

// ✅ Stats Data
const stats = [
  { number: 1800, label: "Students Trained" },
  { number: 800, label: "Entrepreneurs Trained" },
  { number: 10, label: "Awards Won" },
  { number: 15, label: "Courses Offered" },
  { number: 25, label: "Projects Achieved" },
];

// ✅ Main Component
export default function StatsCounter() {
  return (
    <section className="relative py-24 mt-10 mb-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Decorative glowing shapes */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 drop-shadow-sm">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            We take pride in empowering learners, entrepreneurs, and innovators worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((item, index) => {
            const count = useCounter(item.number);

            return (
              <div
                key={index}
                className="relative group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 p-8 text-center"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>

                {/* Number */}
                <h2 className="relative text-4xl md:text-5xl font-extrabold text-blue-600 mb-2 tracking-tight drop-shadow-sm">
                  {count}+
                </h2>

                {/* Label */}
                <p className="relative text-gray-700 font-medium text-base md:text-lg">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
