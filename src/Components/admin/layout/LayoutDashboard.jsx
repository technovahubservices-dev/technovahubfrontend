import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../dashboard header/DashboardHeader";
import MainContent from "../MainContent/MainContent";

const LayoutDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Offcanvas on mobile) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (Menu toggle button inside header) */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main dynamic content */}
        <MainContent />
      </div>
    </div>
  );
};

export default LayoutDashboard;
