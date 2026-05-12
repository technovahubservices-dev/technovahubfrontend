import React from 'react'
import HeroBanner from '../Components/Banner'
import StatsCounter from '../Components/statsCounter/StatsCounter'

import AboutUsSection from './Aboutpage/AboutBanner'
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
      
    
      {/* <AboutUsSection/> */}
      
      
         <Marquee/>
        <Clients/>
     
       
        <Gallery/>
          <StatsCounter/>
    
          <Contact/>
    </div>
  )
}

export default LandingPage
