import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  DollarSign,
  Phone,
  BarChart3,
  Activity,
  BookOpen,
  Inbox,
  MessageCircle,
  Settings,
} from "lucide-react";

const tools = [
  {
    name: "DocuForge",
    desc: "Create professional documents in seconds.",
    icon: <FileText className="text-indigo-500 w-8 h-8" />,
    link: "/admin/invoice",
  },
  {
    name: "PaySync",
    desc: "Generate accurate pay slips instantly.",
    icon: <DollarSign className="text-green-500 w-8 h-8" />,
    link: "/admin/salaryslip",
  },
  {
    name: "VoiceStream",
    desc: "Automate thousands of personalized customer calls.",
    icon: <Phone className="text-blue-500 w-8 h-8" />,
    link: "/voicestream",
  },
  {
    name: "RevenueRadar",
    desc: "Gain a 360-degree view of your sales performance.",
    icon: <BarChart3 className="text-amber-500 w-8 h-8" />,
    link: "/revenueradar",
  },
  {
    name: "TrackFlow",
    desc: "Monitor employee and asset movement in real-time.",
    icon: <Activity className="text-cyan-500 w-8 h-8" />,
    link: "/trackflow",
  },
  {
    name: "LedgerLogic",
    desc: "Simplify your financial tracking and reporting.",
    icon: <BookOpen className="text-purple-500 w-8 h-8" />,
    link: "/ledgerlogic",
  },
  {
    name: "InboxInsight",
    desc: "Manage your communications efficiently.",
    icon: <Inbox className="text-pink-500 w-8 h-8" />,
    link: "/inboxinsight",
  },
  {
    name: "ConnectHub (WhatsApp)",
    desc: "Centralize your customer messaging.",
    icon: <MessageCircle className="text-emerald-500 w-8 h-8" />,
    link: "/connecthub",
  },
  {
    name: "CommandCenter",
    desc: "Your unified hub for managing people, tasks, and performance.",
    icon: <Settings className="text-orange-500 w-8 h-8" />,
    link: "/commandcenter",
  },
];

const Productivitytools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Welcome to Technovahub
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Your gateway to powerful productivity tools
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl w-full">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-start"
          >
            <div className="mb-4">{tool.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {tool.name}
            </h3>
            <p className="text-gray-500 text-sm mb-5">{tool.desc}</p>
            <Link
              to={tool.link}
              className="mt-auto inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productivitytools;
