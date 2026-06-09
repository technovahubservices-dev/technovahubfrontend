import React, { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import QuickChatWidget from "./chatbot/QuickChatWidget";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", path: "/welcome" },
    { name: "Pricing", path: "#pricing" },
    { name: "Contact", path: "#contact" },
    { name: "Advertisement", path: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleMenuClick = (path) => {
    if (path.startsWith("#")) {
      scrollToSection(path);
    } else {
      window.location.href = path;
    }
  };

  const openChatbot = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Technovahub"
                className="w-[120px] h-[100px] md:w-[130px]"
              />
              <span className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Technovahub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 font-medium text-gray-700">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
                className="relative group transition text-base hover:text-blue-600"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
            >
              Enroll Now
            </button>

            <button
              onClick={openChatbot}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Chatbot
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {menuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-xl shadow-md border-t border-gray-100">
              <div className="flex flex-col items-center space-y-5 py-6 text-gray-800 font-medium">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMenuClick(item.path)}
                    className="hover:text-blue-600 transition text-lg"
                  >
                    {item.name}
                  </button>
                ))}

                <button
                  onClick={() => scrollToSection("#contact")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                >
                  Enroll Now
                </button>

                <button
                  onClick={openChatbot}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Chatbot
                </button>
              </div>
            </div>
          )}
      </nav>

      <QuickChatWidget />
    </>
  );
};

export default Navbar;
