import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  // Mouse movement
  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Hover effects on interactive elements
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("button, a").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("button, a").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrame;
    const follow = () => {
      setTrailPosition((prev) => ({
          x: prev.x + (position.x - prev.x) * 0.35, // increased from 0.15 -> 0.35
      y: prev.y + (position.y - prev.y) * 0.35,
      }));
      animationFrame = requestAnimationFrame(follow);
    };
    follow();
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  return (
    <>
      {/* Trailing circle */}
      <div
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
        className={`
          fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2
          w-10 h-10 rounded-full border-2 border-blue-400/50
         transition-all duration-150 ease-out
          ${hovered ? "scale-125 border-blue-500/70 bg-blue-200/20" : ""}
        `}
      ></div>

      {/* Inner dot */}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`
          fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2
          w-4 h-4 rounded-full bg-blue-500 shadow-lg
          ${hovered ? "scale-150 bg-blue-600 shadow-2xl" : ""}
          transition-transform duration-150 ease-out
        `}
      ></div>
    </>
  );
};

export default Cursor;
