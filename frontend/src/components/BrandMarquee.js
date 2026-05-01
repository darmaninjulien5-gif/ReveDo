import React from "react";
import { BRAND_PHRASES } from "@/lib/content";

export default function BrandMarquee() {
  const items = [...BRAND_PHRASES, ...BRAND_PHRASES];
  return (
    <div
      data-testid="brand-marquee"
      className="bg-brand-cream border-y border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-wrap gap-x-10 gap-y-3 items-center justify-center text-brand-deep/70">
        {items.slice(0, 4).map((phrase, i) => (
          <div key={i} className="flex items-center gap-4 text-xs sm:text-sm tracking-wide uppercase font-medium">
            <span>{phrase}</span>
            {i < 3 && <span className="w-1.5 h-1.5 rounded-full bg-brand-aqua" />}
          </div>
        ))}
      </div>
    </div>
  );
}
