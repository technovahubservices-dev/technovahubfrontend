import React from "react";
import { Heart } from "lucide-react";

const CloudScoreCallout = () => {
  return (
    <div className="cloud-callout z-20 mx-auto mb-4 w-[240px] max-w-[calc(100vw-1rem)] sm:mb-0 sm:absolute sm:left-auto sm:right-5 sm:top-20 sm:w-[320px] sm:max-w-none lg:right-10 lg:top-24 lg:w-[440px]">
      <div
        className="cloud-callout__shape"
        style={{
          animation: "cloudFloat 4s ease-in-out infinite",
          willChange: "transform",
          filter:
            "drop-shadow(0 16px 34px rgba(0,0,0,0.14)) drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
        }}
      >
        <a
          href="https://ai-score-checker.vercel.app/"
          aria-label="Check my AI score"
          className="group relative block h-full w-full"
          style={{ textDecoration: "none" }}
        >
          <div
            className="cloud-callout__content relative flex flex-col items-center justify-center text-center rotate-0 sm:rotate-6 lg:rotate-6"
            style={{
              paddingTop: "12%",
              paddingBottom: "8%",
              paddingLeft: "10%",
              paddingRight: "10%",
              transformOrigin: "center center",
            }}
          >
            <svg
              viewBox="0 0 440 320"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full"
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

            <h2
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.85rem)",
                color: "#0f1e2e",
                fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
                fontWeight: 900,
                marginBottom: "0.35rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Are you AI-ready?
            </h2>

            <p
              className="leading-snug"
              style={{
                fontSize: "clamp(0.8rem, 2.2vw, 1.05rem)",
                color: "#4a6a8a",
                fontWeight: 500,
                marginBottom: "0.9rem",
                maxWidth: "14rem",
                position: "relative",
                zIndex: 1,
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
                position: "relative",
                zIndex: 1,
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
                  letterSpacing: "0.14em",
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
      </div>

      <style>{`
        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @media (max-width: 640px) {
          .cloud-callout {
            width: min(220px, calc(100vw - 1rem));
          }

          .cloud-callout__content {
            padding-top: 14% !important;
            padding-bottom: 11% !important;
            padding-left: 12% !important;
            padding-right: 12% !important;
          }

          .cloud-callout__content h2 {
            font-size: 0.95rem !important;
            margin-bottom: 0.12rem !important;
          }

          .cloud-callout__content p {
            font-size: 0.62rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.52rem !important;
            max-width: 10.8rem !important;
          }

          .cloud-callout__content > span {
            gap: 0.4rem !important;
            padding: 0.38rem 0.68rem !important;
          }

          .cloud-callout__content > span span:first-of-type {
            font-size: 0.5rem !important;
            letter-spacing: 0.08em !important;
          }

          .cloud-callout__content > span svg {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CloudScoreCallout;
