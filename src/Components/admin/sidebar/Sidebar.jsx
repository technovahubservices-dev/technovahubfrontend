import React, { useEffect } from "react";
import { Home, Images, BookOpen, Award } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <Home />, path: "/admin" },
     { name: "Productivity Tools", icon: <FaFileInvoiceDollar />, path: "/admin/ERP" },
    { name: "Gallery", icon: <Images />, path: "/admin/gallery" },
    { name: "Courses", icon: <BookOpen />, path: "/admin/courses" },
    { name: "Certificate", icon: <Award />, path: "/admin/certificate" },
    { name: "Aroun Quotation", icon: <LiaFileInvoiceDollarSolid />, path: "/admin/quotation" }, 
      { name: "Aroun Invoice", icon: <LiaFileInvoiceDollarSolid />, path: "/admin/arouninvoice" }, 
    { name: "TechnovaHub Invoice", icon: <FaFileInvoiceDollar />, path: "/admin/invoice" },
    { name: "Salary Slip Generator", icon: <FaFileInvoiceDollar />, path: "/admin/salaryslip" },
   

   


  ];

  // Prevent scrolling when sidebar is open (mobile only)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0    z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed md:static bg-gradient-to-r from-blue-300 to-blue-600 text-white h-screen p-4 flex flex-col transition-all duration-300 z-50
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-64"}
        `}
      >
        {/* Sidebar Header (Only visible when sidebar itself is open on mobile) */}
        <h1 className="text-xl font-bold mb-8">Dashboard</h1>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={`flex items-center gap-3 p-2 font-medium rounded transition 
                  ${isActive ? "bg-blue-200 text-black" : "hover:bg-white hover:text-black"}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
