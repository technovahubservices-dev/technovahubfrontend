// import React, { useEffect, useState } from "react";
// import { getGalleryImages } from "../../api/gallaryApi";
// import Title from "../../Components/Title";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
// import { FiZoomIn } from "react-icons/fi";
// import img1 from "@/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-4zfvhum13c.jpg";
// import img2 from "@/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-6361bo634v.jpg";
// import img3 from "@/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-oprp2go3i3.webp";
// import img4 from "@/assets/gallary-img/2025-06-19 (1).jpg.jpeg";
// import img5 from "@/assets/gallary-img/2025-06-19 (2).jpg.jpeg";
// import img6 from "@/assets/gallary-img/2025-07-07 (1).jpg.jpeg";
// import img7 from "@/assets/gallary-img/2025-07-07 (2).jpg.jpeg";
// import img8 from "@/assets/gallary-img/2025-07-07 (3).jpg.jpeg";
// import img9 from "@/assets/gallary-img/2025-08-26 (1).jpg.jpeg";
// import img10 from "@/assets/gallary-img/2025-08-26 (2).jpg.jpeg";
// import img11 from "@/assets/gallary-img/2025-08-26 (3).jpg.jpeg";
// import img12 from "@/assets/gallary-img/2025-08-26 (4).jpg.jpeg";

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getGalleryImages();
//         setImages(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();

//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   const handleNext = (e) => {
//     e.stopPropagation();
//     setSelectedIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrev = (e) => {
//     e.stopPropagation();
//     setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
//   };
// console.log(images);

//   // const image = [
//   //   "/src/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-4zfvhum13c.jpg",
//   //   "/src/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-6361bo634v.jpg",
//   //   "/src/assets/gallary-img/technova-hub-lawspet-pondicherry-pondicherry-python-training-institutes-oprp2go3i3.webp",
//   //   "/src/assets/gallary-img/2025-06-19 (1).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-06-19 (2).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-07-07 (1).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-07-07 (2).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-07-07 (3).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-08-26 (2).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-08-26 (3).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-08-26 (4).jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-08-26.jpg.jpeg",
//   //   "/src/assets/gallary-img/2025-08-26 (1).jpg.jpeg",
//   // ];

//   return (
//     <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
//       {/* Decorative blobs */}
//       <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Title text="Gallery" />
//         {images.map((img, index) => (
//           <div
//             key={img._id || index}
//             className="h-56 overflow-hidden rounded-lg cursor-pointer"
//             onClick={() => setSelectedImage(img.imageUrl)}
//             data-aos="zoom-in"
//           >
//             <img
//               src={img.imageUrl}
//               alt="Gallery"
//               className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//               loading="lazy"
//             />
//           </div>
//         ))}


//         {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedImage(null)}
//           >
//             <img
//               src={selectedImage}
//               alt="Zoomed"
//               className="max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl object-contain"
//               onClick={() => setSelectedImage(null)}
//             />
//           </div>
//         )}


//         {/* Gallery Grid */}
//         {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {image.map((img, index) => (
//             <div
//               key={index}
//               className="h-56 overflow-hidden rounded-lg cursor-pointer"
//               onClick={() => setSelectedImage(img)}
//             >
//               <img
//                 src={img}
//                 alt="Gallery"
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div> */}

//         {/* Lightbox Popup */}
//         {/* {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-500"
//             onClick={() => setSelectedImage(null)}
//           >
//             <img
//               src={selectedImage}
//               alt="Zoomed"
//               className="w-auto max-w-[100vw] max-h-[100vh] rounded-xl shadow-2xl object-contain"
//               onClick={() => setSelectedImage(null)}
//             />
//           </div>
//         )} */}


//         {/* {images.map((img, index) => (
//             <div
//               key={img._id}
//               className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer group"
//               data-aos="zoom-in"
//               onClick={() => setSelectedIndex(index)}
//             >
//               <img
//                 src={img.imageUrl}
//                 alt="gallery"
//                 className="w-full h-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-between p-4 rounded-2xl">
//                 <p className="text-white font-semibold text-sm sm:text-base">
//                   Click to view
//                 </p>
//                 <FiZoomIn className="text-white text-2xl opacity-90" />
//               </div>
//             </div>
//           ))} */}

//         {/* Modal (Lightbox) */}
//         {selectedIndex !== null && (
//           <div
//             className="fixed inset-0 bg-white backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn"
//             onClick={() => setSelectedIndex(null)}
//           >
//             <div
//               className="relative max-w-5xl w-full mx-4 rounded-xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-300 transition"
//                 onClick={() => setSelectedIndex(null)}
//               >
//                 &times;
//               </button>

//               <img
//                 src={images[selectedIndex].imageUrl}
//                 alt="selected"
//                 className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
//               />

//               {/* Navigation */}
//               <button
//                 className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black transition"
//                 onClick={handlePrev}
//               >
//                 <GrChapterPrevious size={22} />
//               </button>
//               <button
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black transition"
//                 onClick={handleNext}
//               >
//                 <GrChapterNext size={22} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };
import React, { useEffect, useState } from "react";
import { getGalleryImages } from "../../api/gallaryApi";
import Title from "../../Components/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FiZoomIn } from "react-icons/fi";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title text="Gallery" />

        {/* Masonry Grid */}
        <div className="mt-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer group"
              data-aos="zoom-in"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={img.imageUrl}
                alt="gallery"
                className="w-full h-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-between p-4 rounded-2xl">
                <p className="text-white font-semibold text-sm sm:text-base">
                  Click to view
                </p>
                <FiZoomIn className="text-white text-2xl opacity-90" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal (Lightbox) */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-white backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full mx-4 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-300 transition"
                onClick={() => setSelectedIndex(null)}
              >
                &times;
              </button>

              <img
                src={images[selectedIndex].imageUrl}
                alt="selected"
                className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />

              {/* Navigation */}
              <button
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black transition"
                onClick={handlePrev}
              >
                <GrChapterPrevious size={22} />
              </button>
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black transition"
                onClick={handleNext}
              >
                <GrChapterNext size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;