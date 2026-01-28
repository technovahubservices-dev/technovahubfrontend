import React from "react";
import ReactLogo from "../../assets/React-icon.svg.png";
import NodeJs from "../../assets/Nodelogo.svg";  
import MySql from "../../assets/mysql-logo.png";
import MongoDB from "../../assets/MongoDB_Logo.svg";
import N8N from "../../assets/n8n.ico";
import PHP from "../../assets/PHP-logo.svg";
import AWS from "../../assets/aws-logo.svg";
import Flutter from "../../assets/flutter-logo.webp";
import Laravel from "../../assets/laravel-logo.png";
import Python from "../../assets/python-logo.png";
import ReactNative from "../../assets/react-native-logo.png";
import Angular from "../../assets/angular-logo.png";

// Tech data with images
const techStack = [
  { name: "React", img: ReactLogo },
  { name: "Node.js", img: NodeJs },
  { name: "MySQL", img: MySql},
  { name: "MongoDB", img: MongoDB },
  { name: "n8n", img: N8N },
  { name: "PHP", img: PHP},
  { name: "AWS", img: AWS },
  { name: "Flutter", img: Flutter },
  { name: "Laravel", img: Laravel },
  { name: "Python", img: Python },
  { name: "React Native", img: ReactNative },
  { name: "Angular", img: Angular },
];

function Technology() {
  return (
    <section className="py-16 px-6 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold
                     bg-gradient-to-r from-blue-500 to-blue-700
                     bg-clip-text text-transparent"
        >
          Our Technology Stack
        </h2>

        {/* Sub text */}
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          We leverage modern and scalable technologies to build secure,
          high-performance, and future-ready digital solutions.
        </p>

        {/* Tech Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl
                         h-44 flex flex-col items-center justify-center
                         border border-gray-200
                         transition-all duration-300 ease-in-out
                         hover:scale-105 hover:border-blue-500"
            >
              {/* Logo */}
              <img
                src={tech.img}
                alt={tech.name}
                className="w-16 h-16 object-contain mb-4
                           transition-transform duration-300
                           group-hover:scale-110"
              />

              {/* Name */}
              <p
                className="text-gray-800 font-semibold text-lg
                           group-hover:text-blue-600"
              >
                {tech.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Technology;
