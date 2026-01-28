// import React, { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { twMerge } from "tailwind-merge";
// import { getGalleryImages } from "../../api/gallaryApi";

// export const GalleryAblum = () => {
//   const [images, setImages] = useState([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const imgs = await getGalleryImages(); // API returns array
//         // Add random positions and rotation
//         const positioned = imgs.map(img => ({
//           ...img,
//           top: `${Math.random() * 60 + 10}%`,
//           left: `${Math.random() * 70 + 10}%`,
//           rotate: `${Math.random() * 30 - 15}deg`,
//           width: ["w-24", "w-24", "w-24", "w-24"][Math.floor(Math.random() * 4)],
//         }));
//         setImages(positioned);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className="relative grid  h-[50vh] mt-[150px]  w-full place-content-center overflow-hidden bg-blue-100  mb-10 ">
//       <h2 className="relative z-0 text-[10vw] font-black text-neutral-800 md:text-[200px]">
//         GALLERY<span className="text-indigo-500">.</span>
//       </h2>

//       <div className="absolute inset-0 z-10" ref={containerRef}>
//         {images.map((img) => (
//           <DragCard
//             key={img._id}
//             containerRef={containerRef}
//             src={img.imageUrl}
//             alt={`Gallery image ${img._id}`}
//             top={img.top}
//             left={img.left}
//             rotate={img.rotate}
//             className={img.width}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// const DragCard = ({ containerRef, src, alt, top, left, rotate, className }) => {
//   const [zIndex, setZIndex] = useState(0);

//   // Bring card to front on drag
//   const bringToFront = () => {
//     const elements = document.querySelectorAll(".drag-elements");
//     let maxZ = Math.max(
//       ...Array.from(elements).map(el => parseInt(window.getComputedStyle(el).zIndex) || 0)
//     );
//     setZIndex(maxZ + 1);
//   };

//   return (
//     <motion.img
//       onMouseDown={bringToFront}
//       style={{ top, left, rotate, zIndex }}
//       className={twMerge(
//         "drag-elements absolute rounded-lg shadow-lg cursor-grab bg-neutral-200 p-1",
//         className
//       )}
//       src={src}
//       alt={alt}
//       drag
//       dragConstraints={containerRef}
//       dragElastic={0.65}
//     />
//   );
// };
