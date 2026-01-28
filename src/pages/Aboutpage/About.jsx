
import StatsCounter from '../../Components/statsCounter/StatsCounter'
import AboutUs from "./AboutUs";
import AboutUsTwo from './AboutUsTwo';
import Technology from './Technology';
import LeadersSection from '../../Components/LeadersSection';




const About = () => {
  return (
  
<div className='mt-[100px]'>
   <AboutUs/>
    <AboutUsTwo/>
   <StatsCounter/>
   <Technology/>
   <LeadersSection/>
   </div>
  );
};

export default About;


