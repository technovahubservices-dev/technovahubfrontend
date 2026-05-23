import React from "react";
import { Heart } from "lucide-react";

const CloudScoreCallout = () => {
  return (
    <div
      className="absolute right-5 top-14 z-20 w-[320px] sm:right-7 sm:top-14 sm:w-[380px] lg:right-10 lg:top-16 lg:w-[440px]"
      style={{
        animation: "cloudFloat 4s ease-in-out infinite",
        transform: "rotate(6deg)",
        transformOrigin: "center center",
        filter:
          "drop-shadow(0 16px 34px rgba(0,0,0,0.14)) drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
      }}
    >
      <a
        href="https://ai-score-checker.vercel.app/"
        aria-label="Check my AI score"
        className="group relative block"
        style={{ textDecoration: "none" }}
      >
        <svg
          viewBox="0 0 440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ display: "block" }}
        >
          <path
            d="
              M 80,230
              Q 30,230 30,185
              Q 30,148 68,140
              Q 62,118 80,104
              Q 100,88 128,96
              Q 138,64 170,56
              Q 210,44 240,68
              Q 262,44 296,52
              Q 334,58 344,94
              Q 374,88 398,110
              Q 424,134 414,168
              Q 432,178 434,202
              Q 436,236 400,240
              Q 395,256 370,258
              L 108,258
              Q 80,258 80,230
              Z
            "
            fill="#ffffff"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="2"
          />
        </svg>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{
            paddingTop: "14%",
            paddingBottom: "10%",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <h2
            className="font-black leading-tight tracking-tight"
            style={{
              fontSize: "clamp(1.35rem, 4vw, 1.85rem)",
              color: "#0f1e2e",
              fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
              fontWeight: 900,
              marginBottom: "0.5rem",
            }}
          >
            Are you AI-ready?
          </h2>

          <p
            className="leading-snug"
            style={{
              fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)",
              color: "#4a6a8a",
              fontWeight: 500,
              marginBottom: "1.1rem",
              maxWidth: "16rem",
            }}
          >
            Find out where your business stands in 60 seconds.
          </p>

          <span
            className="inline-flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-[1.05]"
            style={{
              borderRadius: "9999px",
              border: "1.5px solid rgba(180,210,240,0.6)",
              backgroundColor: "rgba(255,255,255,0.97)",
              padding: "0.65rem 1.4rem",
              boxShadow: "0 4px 18px rgba(15,30,60,0.10)",
            }}
          >
            <Heart
              style={{
                width: "16px",
                height: "16px",
                fill: "#ef4444",
                color: "#ef4444",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.65rem, 1.6vw, 0.78rem)",
                fontWeight: 800,
                letterSpacing: "0.18em",
                color: "#1a5fb4",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              CHECK MY AI SCORE
            </span>
            <span style={{ color: "#1a5fb4", fontWeight: 700 }}>&rarr;</span>
          </span>
        </div>
      </a>

      <style>{`
        @keyframes cloudFloat {
          0%, 100% { transform: rotate(6deg) translateY(0px); }
          50% { transform: rotate(6deg) translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default CloudScoreCallout;
