import { Target, Eye, HeartHandshake } from "lucide-react";
import BFSI from '../../assets/bfsi.jpg';
import Startup from '../../assets/startup.jpg';
import SME from '../../assets/sme.png';
import Manufacturing from '../../assets/manu.webp';
import Ites from '../../assets/ites.jpeg';
import Retail from '../../assets/retail.jpg';


function AboutUsTwo() {
  return (
<div className="min-h-screen bg-gray-50  px-4 md:px-16">

  {/* Hero Section */}
{/* Hero Section */}
<section className="mt-24 text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
    Let’s Build Something Amazing Together
  </h2>
  <p className="text-gray-600 mt-3">
    Partner with us to turn your ideas into impactful digital solutions.
  </p>
</section>

{/* Mission / Vision / Values Section */}
<section className="max-w-6xl mt-16 md:mt-20 animate-fadeUp flex justify-center mx-auto px-4 md:px-0">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Mission */}
    <div className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          Our Mission
        </h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        We automate complex workflows and deliver scalable digital
        solutions that improve efficiency, reduce costs and enable
        sustainable business growth.
      </p>
    </div>

    {/* Vision */}
    <div className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          Our Vision
        </h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        To be a globally trusted technology partner driving innovation,
        automation and digital transformation across industries.
      </p>
    </div>

    {/* Values */}
    <div className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center gap-3 mb-4">
        <HeartHandshake className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          Our Values
        </h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        Innovation, integrity, collaboration and a strong customer first
        mindset guide everything we do.
      </p>
    </div>

  </div>
</section>





  {/* Who We Serve Section */}
<section className="mt-28 ">

  <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 tracking-tight">
    Discover What We Do & Who We Serve
  </h2>

  <p className="text-gray-600 text-center mt-4 max-w-4xl mx-auto 
                text-base md:text-lg leading-relaxed">
    We serve Governments, Public and Private Sectors, Small and Medium Enterprises,
    Microfinancing institutions and Cooperative Societies. Each industry is unique
    and we deliver tailored solutions to meet their specific needs.
  </p>

  {/* Industry Cards */}
  <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

    {/* BFSI */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={BFSI}
          alt="BFSI Industry"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          BFSI (Banking, Financial Services & Insurance)
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          Digital transformation in BFSI improves competitiveness, reduces operating
          costs, and meets evolving customer expectations.
        </p>
      </div>
    </div>

    {/* Retail & Wholesale */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={Retail}
          alt="Retail & Wholesale"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          Retail & Wholesale
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          We build technology solutions that ensure smooth inventory management,
          logistics optimization, and timely delivery.
        </p>
      </div>
    </div>

    {/* Start-ups */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={Startup}
          alt="Start-ups"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          Start-ups
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          We help start-ups scale faster with CRM, automation, and digital strategies.
        </p>
      </div>
    </div>

    {/* SMEs */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={SME}
          alt="SMEs"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          Small & Medium Enterprises (SMEs)
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          We deliver scalable IT solutions to help SMEs stay competitive.
        </p>
      </div>
    </div>

    {/* Manufacturing */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={Manufacturing}
          alt="Manufacturing"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          Manufacturing Industry
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          Automation, monitoring, and analytics to boost productivity and efficiency.
        </p>
      </div>
    </div>

    {/* IT & ITeS */}
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200
                    hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <img
          src={Ites}
          alt="IT & ITeS"
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-blue-600 mb-2 tracking-wide">
          IT & ITeS Industry
        </h3>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide">
          Cloud services, integrations, and automation for digital acceleration.
        </p>
      </div>
    </div>

  </div>
</section>


  

</div>


  )
}

export default AboutUsTwo