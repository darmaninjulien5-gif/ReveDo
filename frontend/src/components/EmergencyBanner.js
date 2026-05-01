import React from "react";
import { AlertTriangle } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div
      data-testid="emergency-banner"
      className="relative z-50 bg-brand-aqua text-white text-center py-2.5 overflow-hidden"
    >
      <div className="absolute inset-0 shimmer pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
        <AlertTriangle size={14} strokeWidth={2} className="shrink-0" />
        <span>URGENCE piscine verte ?</span>
        <span className="hidden sm:inline opacity-90">Intervention rapide sur toute l'île —</span>
        <a
          href="tel:+262692616657"
          data-testid="emergency-call-link"
          className="underline underline-offset-2 decoration-white/60 hover:decoration-white font-semibold"
        >
          +262 692 61 66 57
        </a>
      </div>
    </div>
  );
}
