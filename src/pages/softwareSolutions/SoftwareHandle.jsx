import React from "react";
import {
  List,
  MessageCircle,
  Settings,
  GraduationCap,
  Sliders,
  Server,
} from "lucide-react";



const services = [
  {
    title: "Project Management",
    desc: "Support better project delivery by improving communications and assisting with change. Our experienced managers ensure seamless coordination to keep projects on track and within budget.",
    icon: List,
  },
  {
    title: "Automation Consulting",
    desc: "Our professional, highly qualified consultants are proven business optimizers. We identify inefficiencies and design tailored automation solutions that drive measurable results.",
    icon: MessageCircle,
  },
  {
    title: "Implementation",
    desc: "Project success depends on collaborative planning and commitment to see initiatives through. We ensure smooth integration from initial setup to final deployment with minimal disruption.",
    icon: Settings,
  },
  {
    title: "Training",
    desc: "Customized meaningful user training to maximize acceptance. We create engaging learning experiences that empower your team to leverage new tools effectively.",
    icon: GraduationCap,
  },
  {
    title: "Customisation",
    desc: "Our approach to customization reflects our focus on customer needs. We craft bespoke solutions that align perfectly with your specific workflows and objectives.",
    icon: Sliders,
  },
  {
    title: "Infrastructure Services",
    desc: "You can't succeed in tomorrow's business landscape using yesterday's tools. We design robust, scalable infrastructure that grows with your business needs.",
    icon: Server,
  },
];

const SoftwareHandle = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-14">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="space-y-5">
                <div className="flex items-center gap-5">
                  {/* Bigger Gradient Icon */}
                  <span className="p-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                    <Icon className="w-5 h-5" />
                  </span>

               <h3 className="text-xl md:text-2xl font-bold text-blue-600">
                {item.title}
              </h3>
                </div>

                <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftwareHandle;
