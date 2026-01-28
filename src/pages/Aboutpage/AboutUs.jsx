import { motion } from "framer-motion";
import aboutImg from "../../assets/about.png";
import CompanyProfile from "../../assets/TechnovaHub-profile.pdf";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AboutUs = () => {
  return (
<section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-white">
  
  {/* Content */}
  <motion.div
    className="relative z-10 max-w-7xl mx-auto px-6 py-20"
    variants={container}
    initial="hidden"
    animate="show"
  >
    <div className="max-w-3xl">

      {/* Main Heading */}
      <motion.h1
        variants={item}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
      >
        EMPOWERING INTELLIGENT <br />
        {/* Gradient adjusted to be darker so it reads well on white */}
        <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
          SOLUTIONS
        </span>
      </motion.h1>

      {/* Sub Heading - Dark Blue/Gray for hierarchy */}
      <motion.h2
        variants={item}
        className="mt-4 text-lg sm:text-xl font-semibold tracking-wide text-gray-800"
      >
        CONNECTING INNOVATION WITH IMPACT
      </motion.h2>

      {/* Paragraph - Dark Gray for comfortable reading */}
      <motion.p
        variants={item}
        className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed"
      >
        At <span className="font-bold text-black">Technovahub</span>, we build
        smart systems and 
        <span className="text-blue-600 font-semibold"> AI-powered platforms </span>
        that streamline operations, enhance decision making and drive digital
        growth for businesses worldwide.
      </motion.p>

      <motion.p
        variants={item}
        className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed"
      >
        By combining advanced technology with a
        <span className="text-blue-600 font-semibold"> people-first mindset</span>,
        we enable smarter decisions and sustainable growth.
      </motion.p>

      {/* Services List */}
      <motion.ul
        className="mt-8 space-y-4 text-base sm:text-lg"
        variants={container}
      >
        {[
          "IT Services & Consulting",
          "AI & Intelligent Automation",
          "Digital Transformation Solutions",
        ].map((service, index) => (
          <motion.li
            key={index}
            variants={item}
            className="flex items-center gap-3 text-gray-700 font-medium"
          >
            {/* Checkmark in Blue to match branding */}
            <span className="text-blue-600 text-xl">✔</span>
            <span className="hover:text-black transition-colors duration-200">
              {service}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Download Button */}
      <motion.a
        href={CompanyProfile}
        download
        variants={item}
        className="
          inline-flex items-center gap-3 mt-10 px-8 py-3
          bg-gradient-to-r from-blue-700 to-cyan-600
          text-white font-semibold rounded-full
          shadow-lg shadow-blue-500/20
          hover:shadow-blue-500/40 hover:scale-105 
          transition-all duration-300
        "
      >
        Download Company Profile
      </motion.a>

    </div>
  </motion.div>
</section>


  );
};

export default AboutUs;
