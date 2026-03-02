import React from "react";

const NeuroSciencePage = () => {
  return (
    <main className="pt-20 min-h-screen bg-white">
      <section className="w-full">
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden">
          <iframe
            title="Neuro Science"
            src="https://neuroscience-website-landingpage.vercel.app/"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
};

export default NeuroSciencePage;
