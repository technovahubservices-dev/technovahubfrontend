import React, { useEffect } from "react";
import Title from "../../Components/Title";
import { ABOUT_US } from "../../data/company.js";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUsSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      offset: 100,    // trigger point
      once: true,     // animate only once
      easing: "ease-in-out", // smooth effect
    });
  }, []);

  return (
    <section className="w-full py-12 px-3 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* heading Components */}
        <div data-aos="fade-up">
          <Title text={ABOUT_US.title} />
        </div>

        {/* Text Sections */}
        <h1
          className="text-sm  md:text-2xl   leading-snug max-w-3xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <em>
            {ABOUT_US.summary}
          </em>
        </h1>

        <h1
          className="text-sm sm:text-2xl md:text-2xl leading-snug max-w-3xl"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <em>
            {ABOUT_US.details}
          </em>
        </h1>
      </div>
    </section>
  );
}
