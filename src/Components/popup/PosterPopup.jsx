import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; 
import poster from "../../assets/images/adspop.jpg";

const PosterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   // Check session storage (reset every new tab or browser open)
  //   const hasSeenPoster = sessionStorage.getItem("posterSeen");

  //   if (!hasSeenPoster) {
  //     setShowPopup(true); // show only once per session
  //     sessionStorage.setItem("posterSeen", "true"); 
  //   }
  // }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="relative bg-white p-4 rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black bg-white/90 backdrop-blur-sm rounded-full p-2 transition"
        >
          <X size={22} />
        </button>

        {/* Poster Image */}
        <img
          src={poster}
          alt="Poster"
          className="rounded-xl w-full h-auto object-cover"
        />

        {/* Enroll Now Button */}
        <div className="mt-4 flex justify-center">
          <a
            href="/7Days-AI-innovation"
           
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default PosterPopup;
