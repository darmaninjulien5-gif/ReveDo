import React from "react";
import { BRAND } from "@/lib/content";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href={BRAND.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 group-hover:opacity-0" />
      <div className="relative w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300">
        <MessageCircle size={24} strokeWidth={1.8} />
      </div>
      <span className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-deep text-white text-xs px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Discuter sur WhatsApp
      </span>
    </a>
  );
}
