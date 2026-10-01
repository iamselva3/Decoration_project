import { getWhatsAppLink } from "../config";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[80] w-12 h-12 bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-lg shadow-green-500/20 transition-all duration-200 hover:scale-110"
      style={{ borderRadius: 0 }}
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
