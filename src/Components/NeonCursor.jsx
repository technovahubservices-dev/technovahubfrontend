import React, { useEffect, useState } from "react";

const NeonCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  // Mouse movement & particle spawn
  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Spawn faster particles
      const newParticle = {
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY + (Math.random() - 0.5) * 30,
        size: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        life: 15, // faster decay
        id: Math.random().toString(36).substr(2, 9),
      };
      setParticles((prev) => [...prev, newParticle]);
    };

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

  // Faster trailing circle (increase interpolation factor)
  useEffect(() => {
    let animationFrame;
    const follow = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.35, // increased from 0.2 -> 0.35
        y: prev.y + (position.y - prev.y) * 0.35,
      }));
      animationFrame = requestAnimationFrame(follow);
    };
    follow();
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  // Particle decay & rise
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 1, y: p.y - 1 })) // faster rise
          .filter((p) => p.life > 0)
      );
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      {/* Neon trailing circle */}
      <div
        style={{ left: `${trailPosition.x}px`, top: `${trailPosition.y}px` }}
        className={`
          fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2
          w-12 h-12 rounded-full border-2 border-blue-400/50
          ${hovered ? "scale-150 border-pink-400/70 bg-pink-200/20" : ""}
          transition-all duration-150 ease-out blur-[2px]
        `}
      ></div>

      {/* Inner neon dot */}
      <div
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className={`
          fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2
          w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(0,255,255,0.9)]
          ${hovered ? "scale-125 bg-pink-400 shadow-[0_0_16px_rgba(255,0,255,1)]" : ""}
          transition-transform duration-100 ease-out
        `}
      ></div>

      {/* Particle effects */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.life / 15, // faster fade
          }}
          className="fixed pointer-events-none rounded-full blur-sm z-40"
        />
      ))}
    </>
  );
};

export default NeonCursor;
