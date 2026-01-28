import React, { useEffect, useState } from "react";
import { getCourseApi } from "../../api/CourseApi";
import Title from "../../Components/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import { BookOpen, Code, Cpu, Globe, Zap } from "lucide-react"; // sample icons

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 100,
      once: true,
    });

    const fetchData = async () => {
      try {
        const response = await getCourseApi();
        setCourses(response.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Floating background glow */}
      <div className="absolute -top-20 left-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div data-aos="fade-up">
          <Title text="Internship Offered" />
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <FancyCard
                key={course._id}
                title={course.title}
                description={course.description}
                aosDelay={index * 200}
                icon={getCourseIcon(course.title, index)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No courses available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* 🌀 Modern shimmer skeleton */
const SkeletonCard = () => (
  <div className="w-full h-72 bg-white/60 rounded-2xl shadow-md border border-white/40 backdrop-blur-md relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
      <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

/* 💎 New Beautiful Course Card */
const FancyCard = ({ title, description, icon, aosDelay }) => {
  return (
    <div
      className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 group"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      {/* Hover border gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-500"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-md shadow-blue-200 mb-5">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">
          {title}
        </h2>
        <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

/* 🧠 Icon selector based on title (optional) */
const getCourseIcon = (title, index) => {
  const icons = [
    <BookOpen className="w-7 h-7 text-white" />,
    <Code className="w-7 h-7 text-white" />,
    <Cpu className="w-7 h-7 text-white" />,
    <Globe className="w-7 h-7 text-white" />,
    <Zap className="w-7 h-7 text-white" />,
  ];
  return icons[index % icons.length];
};

export default CourseCard;
