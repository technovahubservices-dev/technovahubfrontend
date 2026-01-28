import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const Backtop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    const isMobile = window.innerWidth < 768; // Mobile breakpoint
    const scrollDuration = isMobile ? 300 : 600; // Faster on mobile

    const start = window.scrollY;
    const startTime = performance.now();

    const scrollStep = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1); // Clamp 0-1
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-3 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Backtop;
