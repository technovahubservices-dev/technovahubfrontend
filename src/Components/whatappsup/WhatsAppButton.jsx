import React from "react";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../../data/company";

const WhatsAppButton = ({ open = false, onClick }) => {
  const handleChatClick = () => {
    if (onClick) onClick();
  };

  const handleWhatsAppClick = () => {
    window.open(CONTACT.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-7 right-3 z-[99998] flex flex-col items-end gap-3">
      <button
        onClick={handleWhatsAppClick}
        className="w-[56px] h-[56px] rounded-full shadow-lg flex items-center justify-center text-white bg-[#25D366] hover:bg-[#1faa52] transition-transform transform hover:scale-110"
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp size={28} />
      </button>

      <button
        onClick={handleChatClick}
        className="w-[56px] h-[56px] rounded-full shadow-lg flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-transform transform hover:scale-110"
        aria-label="Chatbot open"
        aria-pressed={open}
      >
        <MessageCircle size={27} strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default WhatsAppButton;
