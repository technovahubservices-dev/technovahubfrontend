import React from "react";
import { Bot, Layers3, MessageSquare, Globe, ShieldCheck, GraduationCap } from "lucide-react";

const pillars = [
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
    icon: GraduationCap,
    title: "Training Programs",
    text: "We train students and teams in AI, software, cloud, cybersecurity, and project-based development.",
  },
];

const outcomes = [
  "Clear AI use cases for your business",
  "Better content coverage across your website",
  "Stronger service and brand signals",
  "More structured content for crawlers and AI systems",
];

const AIReadinessSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-50 to-blue-50/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
            AI readiness
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-4xl">
            Build a stronger AI score with clearer service content
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            TechnovaHub helps businesses present their products, services, and expertise in a way that is easy for people, search engines, and AI systems to understand.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((item) => {
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
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">What we improve</h3>
            <ul className="mt-4 grid gap-3">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Why this helps</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Pages that name services clearly, group related topics together, and explain outcomes in plain language usually score better on content coverage and structured content checks.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              That is the same pattern we use for AI automation, software development, CRM work, cloud integration, and training pages across the site.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AIReadinessSection;
