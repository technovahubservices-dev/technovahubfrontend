import React from 'react'
import HeroBanner from '../Components/Banner'
import StatsCounter from '../Components/statsCounter/StatsCounter'

import Ourfacilities from '../Components/Our facilities/Ourfacilities'
import AboutUsSection from './Aboutpage/AboutBanner'
import CourseCard from './Courses/CourseCard'
import Gallery from './Gallery/Gallery'
import VisionMission from '../Components/OURVISION&MISSION/OurVisionMission'
import SoftwareSolutions from './softwareSolutions/SoftwareSolutions'
import Clients from '../Components/Clients'
import Marquee from '../Components/Marquee'
import Contact from './Contact'

const LandingPage = () => {
  return (
    <div>
      <HeroBanner/>
      <VisionMission/>
       <SoftwareSolutions/>
       <CourseCard/>
      
    
      {/* <AboutUsSection/> */}
       <Ourfacilities/>
      
      
         <Marquee/>
        <Clients/>
     
       
        <Gallery/>
          <StatsCounter/>
    
          <Contact/>
    </div>
  )
}

export default LandingPage