import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "9360962810";
  const message = "Hello TechnovaHub, I have an enquiry!";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-7 right-3 bg-green-500 hover:bg-green-600 text-white p-2  w-[40px] h-[40px] rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 z-50"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </button>
  );
};

export default WhatsAppButton;
