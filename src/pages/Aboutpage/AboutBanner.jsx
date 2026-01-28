import React, { useEffect } from "react";
import about from "../../assets/images/4.jpg";
import Title from "../../Components/Title";
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
          <Title text="ABOUT US" />
        </div>

        {/* Image */}
        <div className="w-full" data-aos="zoom-in">
          <img
            src={about}
            alt="About Us"
            className="w-full md:h-[600px] rounded-3xl shadow-lg object-cover"
          />
        </div>

        {/* Text Sections */}
        <h1
          className="text-sm  md:text-2xl   leading-snug max-w-3xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <em>
            TechnovaHub, a unit of Aroun Groups, is a premier provider of
            technology education and software solutions. We specialise in
            delivering practical, industry aligned training for students,
            professionals and entrepreneurs ensuring a workforce equipped with
            real world skills.
          </em>
        </h1>

        <h1
          className="text-sm sm:text-2xl md:text-2xl leading-snug max-w-3xl"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <em>
            Our services also extend to businesses, offering tailored tech
            solutions that drive efficiency, innovation and growth.
          </em>
        </h1>
      </div>
    </section>
  );
}
