import React from "react";
import { useParams } from "react-router-dom";

const productConfig = {
  nexion: {
    name: "Nexion",
    url: "https://nexion-ruby.vercel.app/",
  },
  trackpulse: {
    name: "Trackpulse",
    url: "https://tracking-app-landing-page-self.vercel.app/",
  },
};

const ProductPage = () => {
  const { slug } = useParams();
  const product = productConfig[slug];

  if (!product) {
    return (
      <main className="min-h-screen px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full">
        <div className="w-full h-screen overflow-hidden">
          <iframe
            title={product.name}
            src={product.url}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
};

export default ProductPage;