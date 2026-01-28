import React from "react";
import CourseCard from "./CourseCard";
import Coursebanner from "../../Components/Coursebanner";


const Courses = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
            <Coursebanner/>
      <div className="mt-[50px] md:mt-[100px]">
<hr className="text-transparent" />
      </div>
    
      {/* Courses Section */}
      <div className="">
        <CourseCard />
      </div>
    </div>
  );
};

export default Courses;
