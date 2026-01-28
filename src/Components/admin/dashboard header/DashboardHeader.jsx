import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../../api/authApi";
import toast from "react-hot-toast";

const DashboardHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const userName = adminUser.userName || "Admin";

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      toast.success("Logout Successfully");
      navigate("/adminlogin");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-blue-600 focus:outline-none"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-sm md:text-xl font-bold text-blue-600"> Welcome to TechnovaHub</h2>
      </div>

      <div className="flex items-center justify-center gap-4">
       
        <span className="text-blue-700 font-bold text-sm uppercase">{userName}</span>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-600 text-white rounded-full shadow-md"
        >
          <FaPowerOff />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
