import React from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Lightbulb, Network } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-white" />,
    title: "Build No-code AI Agent",
    desc: "Create intelligent agents without writing a single line of code.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-white" />,
    title: "Prompt Engineering",
    desc: "Master the art of communicating effectively with AI systems.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    title: "Problem Solving with Tech",
    desc: "Learn to leverage technology for real-world challenges.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: <Network className="w-8 h-8 text-white" />,
    title: "Real-world AI Integration",
    desc: "Understand how AI integrates into practical solutions.",
    gradient: "from-green-500 to-emerald-600",
  },
];

const WhatYouWillGain = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
        >
          What You’ll <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gain</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Transform your skills with hands-on experience in AI innovation and real-world application.
        </motion.p>

        {/* Feature Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative bg-white/70 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl rounded-2xl p-6 text-left transition-all duration-300"
            >
              {/* Glow Circle */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition rounded-2xl bg-gradient-to-r ${feature.gradient}`}
              />

              {/* Icon */}
              <div
                className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-xl shadow-lg inline-flex mb-4`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillGain;
