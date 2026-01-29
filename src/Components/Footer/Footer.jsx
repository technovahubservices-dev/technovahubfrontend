import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  // Social links with URLs
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      color: "hover:text-blue-600",

    },
    {
      icon: <FaInstagram />,
      color: "hover:text-pink-500",
      url: "https://www.instagram.com/tech_novahub26?igsh=aHY2MTAxN3diamdk", // replace with your Instagram URL
    },
    {
      icon: <FaLinkedinIn />,
      color: "hover:text-blue-700",
      url: "https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3Bp7iKRkkCRo6Ylus7SNHF6A%3D%3D", // replace with your LinkedIn URL
    },
  ];

  return (
    <section
      id="footer"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      {/* Decorative Top Glow */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-blue-300/40 via-blue-200/40 to-transparent blur-2xl" />

      <footer className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h1 className="inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-transparent bg-clip-text mb-4 drop-shadow-md pb-2 pr-4">
              TechnovaHub
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              Empowering your digital journey with innovative solutions,
              cutting-edge courses, and modern tech services.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${item.color} transform hover:scale-110 transition-all duration-300`}
                >
                  <div className="p-3 rounded-full bg-white/60 backdrop-blur-md shadow-md hover:shadow-lg">
                    {item.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold text-blue-700 mb-4 md:mb-5">
              Quick Links
            </h2>
            <ul className="space-y-3 text-gray-700 font-medium text-sm md:text-base">
              {[
                { name: "Home", link: "/" },
                { name: "About", link: "/about" },
                { name: "Courses", link: "/courses" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className={`transition hover:text-blue-600`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold text-blue-700 mb-4 md:mb-5">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-5 text-sm md:text-base px-2 md:px-0">
              Subscribe for updates on new courses, innovations, and trends.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center bg-white shadow-inner rounded-full p-1 border border-blue-100 max-w-sm mx-auto md:mx-0 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 text-gray-700 outline-none bg-transparent placeholder-gray-400 text-sm w-full"
              />
              <button className="mt-2 sm:mt-0 sm:ml-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-md hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative mt-12 border-t border-blue-200 pt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600">TechnovaHub</span>. All
          Rights Reserved.
        </div>
      </footer>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-32 bg-gradient-to-t from-blue-200/40 to-transparent blur-3xl rounded-full" />
    </section>
  );
};

export default Footer;
