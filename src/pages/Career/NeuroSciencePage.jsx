import React from "react";

const NeuroSciencePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="w-full">
        <div className="w-full h-screen overflow-hidden">
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