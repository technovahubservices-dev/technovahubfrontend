import React from "react";
import { Heart } from "lucide-react";

const CloudScoreCallout = () => {
  return (
<div className="cloud-callout absolute left-1/2 top-4 z-30 w-[240px] max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:left-16 sm:top-20 sm:w-[320px] sm:max-w-none lg:left-64 lg:top-60 lg:w-[460px]">
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
          href="https://technovahub.in/ai_score_checker"
          aria-label="Check my AI score"
          className="group relative block h-full w-full"
          style={{ textDecoration: "none" ,fontSize:"20" }}
        >
          <div
            className="cloud-callout__content relative flex flex-col items-center justify-center text-center rotate-0"
            style={{
              paddingTop: "19%",
              paddingBottom: "8%",
              paddingLeft: "11%",
              paddingRight: "11%",
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
              fontSize: "clamp(1.8rem, 5.4vw, 0.75rem)",
                color: "#0f1e2e",
                fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
                fontWeight: 900,
                marginBottom: "0.42rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Are you AI-ready?
            </h2>

            <p
              className="leading-snug"
              style={{
                fontSize: "clamp(0.92rem, 2.55vw, 1.18rem)",
                color: "#4a6a8a",
                fontWeight: 500,
                marginBottom: "1.08rem",
                maxWidth: "15.2rem",
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
                padding: "0.72rem 1.55rem",
                boxShadow: "0 4px 18px rgba(15,30,60,0.10)",
                marginTop: "0.1rem",
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
                  fontSize: "clamp(0.72rem, 1.8vw, 0.9rem)",
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
            width: min(240px, calc(100vw - 0.75rem));
          }

          .cloud-callout__content {
            padding-top: 17% !important;
            padding-bottom: 8% !important;
            padding-left: 12% !important;
            padding-right: 12% !important;
          }

          .cloud-callout__content h2 {
            font-size: 1.02rem !important;
            margin-bottom: 0.15rem !important;
            max-width: 10.6rem !important;
          }

          .cloud-callout__content p {
            font-size: 0.66rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.58rem !important;
            max-width: 11rem !important;
          }

          .cloud-callout__content > span {
            gap: 0.38rem !important;
            padding: 0.42rem 0.72rem !important;
            margin-top: 0.18rem !important;
          }

          .cloud-callout__content > span span:first-of-type {
            font-size: 0.52rem !important;
            letter-spacing: 0.08em !important;
          }

          .cloud-callout__content > span svg {
            width: 12px !important;
            height: 12px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .cloud-callout {
            width: 320px;
          }

          .cloud-callout__content {
            padding-top: 17% !important;
            padding-bottom: 8% !important;
            padding-left: 11.5% !important;
            padding-right: 11.5% !important;
          }

          .cloud-callout__content h2 {
            font-size: 1.34rem !important;
            margin-bottom: 0.24rem !important;
            max-width: 12.5rem !important;
          }

          .cloud-callout__content p {
            font-size: 0.82rem !important;
            line-height: 1.22 !important;
            margin-bottom: 0.98rem !important;
            max-width: 13.8rem !important;
          }

          .cloud-callout__content > span {
            gap: 0.4rem !important;
            padding: 0.58rem 1.08rem !important;
            margin-top: 0.08rem !important;
          }

          .cloud-callout__content > span span:first-of-type {
            font-size: 0.68rem !important;
            letter-spacing: 0.1em !important;
          }

          .cloud-callout__content > span svg {
            width: 13px !important;
            height: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CloudScoreCallout;
