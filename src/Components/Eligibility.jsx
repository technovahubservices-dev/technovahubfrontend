import React from "react";
import {
  GraduationCap,
  Users,
  Bot,
  Layers3,
  MessageSquare,
  Globe,
  ShieldCheck,
  GraduationCap as LearnCap,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    text: "We build assistants, workflows, and business automations that reduce manual work and speed up response times.",
  },
  {
    icon: Layers3,
    title: "Custom Software",
    text: "We design CRM, SaaS, dashboard, and internal tools that fit the way your team actually works.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & CRM",
    text: "We connect chat, lead capture, and follow-up flows so your sales and support teams stay organized.",
  },
  {
    icon: Globe,
    title: "Web & Mobile",
    text: "We deliver websites and mobile apps that are fast, responsive, and built for business outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Cloud & Security",
    text: "We help teams move into secure cloud setups with better control, reliability, and scalability.",
  },
  {
    icon: LearnCap,
    title: "Training Programs",
    text: "We train students and teams in AI, software, cloud, cybersecurity, and project-based development.",
  },
];

const Eligibility = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who Can Join?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This challenge is designed for ambitious students ready to explore AI
          </p>
        </div>

        {/* Card */}
        <div className="p-10 bg-white border border-blue-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Engineering & Medical Students
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                All branches and specializations are welcome
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-medium">
                    All Engineering Branches
                  </span>
                </div>
                <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-medium">
                    All Medical Branches
                  </span>
                </div>
                <div className="px-4 py-2 bg-purple-100 rounded-lg border border-purple-200">
                  <span className="text-purple-700 font-medium">Any Year</span>
                </div>
              </div>
            </div>

            {/* Right Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
              Service content
            </p>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
              Clear service blocks for stronger content structure
            </h3>
            <p className="mt-3 text-base text-gray-600 max-w-3xl mx-auto">
              TechnovaHub presents its offerings in compact sections so people, search engines, and AI systems can scan the topic quickly.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
