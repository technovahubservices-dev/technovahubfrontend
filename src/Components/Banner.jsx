import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --------------------------------------------------------------------------
    // 🌌 DIGITAL DATA STREAM EFFECT
    // --------------------------------------------------------------------------

    // Configuration
    let columns = Math.floor(canvas.width / 20);
    const drops = [];
    const colors = ["#00d4ff", "#00ffff", "#7b2ff7", "#ffffff"]; // Tech palette

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        length: Math.random() * 20 + 5
      };
    }

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * 20;

        // Draw the "Data Stream"
        const gradient = ctx.createLinearGradient(x, drop.y, x, drop.y - drop.length);
        gradient.addColorStop(0, drop.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x, drop.y);
        ctx.lineTo(x, drop.y - drop.length);
        ctx.stroke();

        // Add a glowing head
        ctx.fillStyle = drop.color;
        ctx.beginPath();
        ctx.arc(x, drop.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Move drop
        drop.y += drop.speed;

        // Reset if off screen or randomly
        if (drop.y > canvas.height && Math.random() > 0.98) {
          drop.y = 0;
          drop.speed = Math.random() * 2 + 1;
          drop.length = Math.random() * 20 + 5;
          drop.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize columns on resize
      const newColumns = Math.floor(canvas.width / 20);
      columns = newColumns; // Update columns variable
      drops.length = 0; // Clear array
      for (let i = 0; i < newColumns; i++) {
        drops[i] = {
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          length: Math.random() * 20 + 5
        };
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    navigate("/about");
  };

  return (
    <header className="relative min-h-[60vh] md:min-h-screen h-auto flex items-center justify-center text-center overflow-hidden pt-28 md:pt-0">
      {/* Neural Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      ></canvas>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-6 py-12 md:py-0 max-w-4xl mx-auto">

        {/* Main Heading */}
        <h1
          data-aos="fade-down"
          className="font-extrabold tracking-wide text-2xl sm:text-4xl md:text-5xl 
                 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600
                 bg-clip-text text-transparent"
        >
          DRIVING THE FUTURE
        </h1>

        {/* Subheading */}
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-2 md:mt-4 font-extrabold text-gray-800 text-lg sm:text-2xl md:text-3xl"
        >
          WHERE INNOVATION <br className="hidden md:block" /> MEETS AUTOMATION
        </h2>

        {/* Highlight */}
        <h1
          data-aos="zoom-in"
          data-aos-delay="400"
          className="mt-2 md:mt-3 font-[cursive] text-2xl sm:text-4xl md:text-5xl
                 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
                 bg-clip-text text-transparent py-2"
        >
          Intelligent Automation
        </h1>

        {/* Underline */}
        <div
          data-aos="fade-right"
          data-aos-delay="600"
          className="w-24 sm:w-48 md:w-64 h-1 mt-2 md:mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
        ></div>

        {/* Paragraph */}
        <p
          data-aos="fade-up"
          data-aos-delay="700"
          className="mt-4 md:mt-6 max-w-xs sm:max-w-xl text-gray-700 font-semibold text-sm sm:text-base md:text-lg leading-relaxed hover:text-indigo-400 transition-colors duration-300"
        >
          Leveraging smart systems to streamline workflows, optimize efficiency
          and empower businesses to achieve more with technology.
        </p>

        {/* Button */}
        <button
          data-aos="zoom-in"
          data-aos-delay="1200"
          onClick={handleClick}
          className="mt-6 sm:mt-8 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 
                 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 
                 rounded-md cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-105 shadow-md"
        >
          DISCOVER MORE
        </button>
      </div>
    </header>

  );
};

export default Banner;
