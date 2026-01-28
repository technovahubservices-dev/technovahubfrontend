import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { getSoftwareSolutionApi } from "../../api/softwareSolutionApi";
import { Sparkles, Cpu, Code, Cloud } from "lucide-react"; // icons
import AOS from "aos";
import "aos/dist/aos.css";


const services = [
  {
    "_id": "68da69531713a66d0bb50c53",
    "title": "Custom Software Development",
    "description": "We deliver tailored software solutions to solve your specific business problems.",
    "__v": 0
  },
  {
    "_id": "68da69661713a66d0bb50c55",
    "title": "Cloud Integration",
    "description": "Empower your business with scalable and secure cloud based applications integrated into your workflow.",
    "__v": 0
  },
  {
    "_id": "68da698e1713a66d0bb50c57",
    "title": "Secure App Development",
    "description": "Build software with strong security principles and latest best practices for peace of mind and compliance.",
    "__v": 0
  },

  {
    "_id": "68da69b11713a66d0bb50c5b",
    "title": "WhatsApp Automation",
    "description": "Streamline customer communication with automated WhatsApp messaging, reminders and real time updates to improve engagement.",
    "__v": 0
  },
  {
    "_id": "68da69c41713a66d0bb50c5d",
    "title": "Instagram Automation",
    "description": "Grow your online presence with automated posting, audience interaction and insights to save time and boost reach.",
    "__v": 0
  },
  {
    "_id": "68da69db1713a66d0bb50c5f",
    "title": "Email Automation",
    "description": "Automate your email campaigns with personalized messages, scheduling and analytics to drive conversions and customer loyalty.",
    "__v": 0
  },
  {
    "_id": "68da69f11713a66d0bb50c61",
    "title": "Accounting Dashboard",
    "description": "Track expenses, invoices and financial reports in a centralized dashboard designed for smarter business decisions.",
    "__v": 0
  },
  {
    "_id": "68da6a021713a66d0bb50c63",
    "title": "Sales Dashboard",
    "description": "Visualize and monitor your sales pipeline, KPIs and performance metrics with interactive dashboards for faster growth.",
    "__v": 0
  },
  {
    "_id": "68da6a221713a66d0bb50c65",
    "title": "Employee Tracking",
    "description": "Monitor employee performance, attendance and productivity with smart tracking tools designed to enhance accountability and efficiency.",
    "__v": 0
  },

];




const SoftwareSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
    });

    const fetchData = async () => {
      try {

        setSolutions(services || []);
      } catch (error) {
        console.error("Error fetching software solutions:", error);
        setSolutions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/40 to-blue-100/20 overflow-hidden">
      {/* Floating Glow Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6">
        <div data-aos="fade-up">
          <Title text="Software Solutions" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-8 md:mt-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : solutions.length > 0
              ? solutions.map((item, index) => (
                <SolutionCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  aosDelay={index * 200}
                  icon={index % 3 === 0 ? <Cpu /> : index % 3 === 1 ? <Cloud /> : <Code />}
                />
              ))
              : (
                <div className="text-gray-500 col-span-full text-center flex justify-center mb-10 items-center">
                  No software solutions available.
                </div>
              )}
        </div>
      </div>
    </section>
  );
};

// 🧠 Individual Solution Card
const SolutionCard = ({ title, description, aosDelay, icon }) => {
  return (
    <div
      className="relative group bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-500"></div>

      <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
        <div className="p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-blue-600">{title}</h3>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// 🌈 Gradient Skeleton Card (Shimmer)
const SkeletonCard = () => (
  <div className="w-full h-64 bg-gray-100 relative overflow-hidden rounded-2xl shadow-md">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mt-10"></div>
    <div className="space-y-3 mt-6 px-6">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

export default SoftwareSolutions;
