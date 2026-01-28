import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vidhyavathiImage from "../assets/leaders/Vidhyavathi.jpeg";
import arunkumarImage from "../assets/leaders/arunkumar-profile.png";

const leaders = [
  {
    id: 1,
    img: vidhyavathiImage,
    name: "Vidhyavathi Ramachandran",
    role1: "Founder / Managing Director, Technovahub",
    role2: "Automation Consultant, Tata Consultancy Services",
    desc: "At Technova Hub, our vision is to empower young minds to go beyond learning AI to actively apply it in studies, projects, careers and even building startups. Through hands-on activities, real-world applications and collaborative learning, we aim to help you experience AI not just as technology but as a powerful tool to innovate, inspire and create meaningful impact in society.",
  },
  {
    id: 2,
    img: arunkumarImage,
    name: "Arunkumar Appadoure",
    role1: "Director, Technovahub",
    role2: "Managing Director, Aroun Systems & Safety Equipments",
    desc: "Technovahub is the latest venture of Aroun Systems and Safety Equipments. Building on our strong legacy in safety and industrial solutions, we are now stepping into the future with a mission to empower young minds and professionals with the knowledge and skills needed to thrive in the age of Artificial Intelligence and emerging technologies. Together we can shape a future where technology drives innovation, progress and endless possibilities.",
  },
];

const LeadersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeLeader = leaders[activeIndex];
  const nextIndex = (activeIndex + 1) % leaders.length;
  const nextLeader = leaders[nextIndex];

  const handleSwitchLeader = () => {
    setActiveIndex(nextIndex);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Guided by <span className="text-blue-600">experienced leaders</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-blue-600 mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-center">
          
          {/* LEFT COLUMN: Large Active Image */}
          <div className="lg:w-5/12 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[350px] h-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeLeader.id}
                  src={activeLeader.img}
                  alt={activeLeader.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl bg-gray-50 absolute inset-0"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Details + Small Image */}
          <div className="lg:w-7/12 flex flex-col justify-start py-2">
            
            {/* 1. Active Leader Details */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeLeader.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {activeLeader.name}
                  </h3>
                  <div className="mb-4">
                    <p className="text-lg font-bold text-blue-600">{activeLeader.role1}</p>
                    <p className="text-sm text-gray-500 italic mt-0.5">{activeLeader.role2}</p>
                  </div>
                  
                  {/* Fixed min-height stops the small image from moving up/down */}
                  <div className="min-h-[140px] md:min-h-[120px]">
                    <p className="text-gray-600 leading-relaxed text-sm max-w-2xl">
                      {activeLeader.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Divider Line */}
              <div className="w-full h-px bg-gray-100 mt-6"></div>
            </div>

            {/* 2. Small Image (Clickable) */}
            {/* The small image stays locked here */}
            <div className="flex flex-col items-start mt-8">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={nextLeader.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4"
                >
                  MEET {nextLeader.name.split(" ")[0]}
                </motion.p>
              </AnimatePresence>
              
              <motion.div 
                onClick={handleSwitchLeader}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group cursor-pointer relative w-[130px] h-[180px]"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={nextLeader.id}
                    src={nextLeader.img}
                    alt={nextLeader.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-100 group-hover:border-blue-500 transition-colors"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300 rounded-lg"></div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;