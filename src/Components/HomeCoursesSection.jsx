import React from "react";
import { COURSES } from "../data/courses.js";

const HomeCoursesSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white via-blue-50/40 to-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="course-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {COURSES.map((course) => {
            const Icon = course.icon;
            return (
              <article
                key={course.name}
                className="service-card"
              >
                <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${course.color}, #9b4dff)` }}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3>
                  {course.name}
                </h3>
                <p>
                  {course.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeCoursesSection;
