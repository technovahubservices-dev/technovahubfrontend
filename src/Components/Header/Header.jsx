import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoremove.png";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },

  {
    name: "SERVICES",
    link: [
      { name: "Software Solutions", path: "/softwaresolutions" },
      { name: "Terms & Conditions", path: "/termsandCondition" },
    ],
  },

  {
    name: "EVENTS",
    link: [
      { name: "Gallery", path: "/gallery" },
      { name: "7Days-Ai-challange", path: "/7Days-AI-innovation" },
      { name: "Young Innovator", path: "/young-innovator" },
    ],
  },
  {
    name: "CAREER",
    link: [{ name: "Internship Offered", path: "/courses" },
    { name: "Verify Certificate", path: "/verifyCertificate" },
     { name: "Neuro Science", path: "https://neuroscience-website-landingpage.vercel.app/" },
    ],

  
  },
  
  { name: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const getLinkClasses = (path) =>
    `text-base font-semibold transition duration-200 ease-in-out pt-1 ${location.pathname === path
      ? "text-blue-700 border-b-2 border-blue-700"
      : "text-gray-900 hover:text-blue-600 hover:border-b-2 hover:border-blue-400"
    }`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      <div
        className={`transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-white/90 shadow-sm py-1" : "bg-transparent py-3 md:py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* LOGO */}
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-14 md:h-20 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative flex items-center">
                  {item.path ? (
                    <Link to={item.path} className={getLinkClasses(item.path)}>
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center gap-1 text-base font-semibold text-gray-900 hover:text-blue-600 transition"
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`text-blue-500 transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  )}

                  {/* DROPDOWN */}
                  {item.link && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100
                        transform transition-all duration-300 ease-out
                        ${openDropdown === item.name
                          ? "opacity-100 translate-y-0 scale-100 visible"
                          : "opacity-0 -translate-y-3 scale-95 invisible pointer-events-none"
                        }`}
                    >
                      {item.link.map((sub, index) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition
                            ${index === 0 ? "rounded-t-xl" : ""}
                            ${index === item.link.length - 1 ? "rounded-b-xl" : ""}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="text-gray-900" /> : <Menu className="text-gray-900" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out bg-white shadow-lg overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            {navItems.flatMap((item) =>
              item.path ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block w-full text-center py-3 text-lg font-medium transition rounded-lg
                    ${isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-800 hover:bg-gray-50 hover:text-blue-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <div key={item.name} className="w-full text-center space-y-2">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 mt-4 border-b border-gray-100 pb-1">{item.name}</div>
                  {item.link.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `block w-full text-center py-2 text-base font-medium transition rounded-lg
                        ${isActive
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
