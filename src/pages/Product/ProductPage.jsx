import React from "react";
import { Link, useParams } from "react-router-dom";

const productConfig = {
  nexion: {
    name: "Nexion",
    url: "https://technovahub.in/nexion/landingpage",
  },
  trackpulse: {
    name: "Trackpulse",
    url: "https://technovahub.in/trackpulse/landingpage",
  },
  biz_connect: {
    name: "Biz Connect",
    url: "https://technovahub.in/product/techno_biz_connect",
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
      <div className="fixed top-0 left-0 z-50 w-full p-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-gradient-to-r from-white to-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-[0_10px_30px_rgba(15,23,42,0.22)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.28)]"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back Home</span>
        </Link>
      </div>
      <section className="w-full pt-14">
        <div className="w-full h-[calc(100vh-56px)] overflow-hidden">
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
