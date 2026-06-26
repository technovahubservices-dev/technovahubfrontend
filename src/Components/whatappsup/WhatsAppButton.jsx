import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../../data/company";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open(CONTACT.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-7 left-3 z-[99998] flex flex-col items-start gap-3">
      <button
        onClick={handleWhatsAppClick}
        className="w-[56px] h-[56px] rounded-full shadow-lg flex items-center justify-center text-white bg-[#25D366] hover:bg-[#1faa52] transition-transform transform hover:scale-110"
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
};

export default WhatsAppButton;
