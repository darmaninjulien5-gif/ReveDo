import React from "react";
import { BRAND } from "@/lib/content";

export default function Gallery() {
  return (
    <section
      id="galerie"
      data-testid="gallery-section"
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">
              <span className="w-8 h-px bg-brand-aqua" /> Galerie & réalisations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-brand-deep tracking-tight">
              Avant, après —
              <br />
              <span className="italic font-extralight text-brand-aqua">une eau cristalline.</span>
            </h2>
          </div>
          <p className="text-sm lg:text-base text-brand-deep/60 max-w-sm">
            Résultats visibles immédiatement. De la piscine verte à l'eau
            parfaitement claire, chaque intervention reflète notre exigence.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 lg:gap-4">
          {/* Before/After large */}
          <div
            data-testid="gallery-item-before-after"
            className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-sm border border-gray-200 group"
          >
            <img
              src={BRAND.beforeAfter}
              alt="Avant - Après"
              className="w-full h-[420px] lg:h-[560px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-brand-deep text-[10px] uppercase tracking-[0.2em] font-medium rounded-sm">
              Avant / Après
            </div>
          </div>

          {/* Tech room */}
          <div
            data-testid="gallery-item-tech-room"
            className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-sm border border-gray-200 group"
          >
            <img
              src={BRAND.techRoom}
              alt="Local technique"
              className="w-full h-[260px] lg:h-[560px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-brand-deep text-[10px] uppercase tracking-[0.2em] font-medium rounded-sm">
              Local technique
            </div>
          </div>

          {/* Hero pool */}
          <div
            data-testid="gallery-item-luxury-pool"
            className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-sm border border-gray-200 group"
          >
            <img
              src={BRAND.beforeAfterAlt}
              alt="Avant / Après piscine"
              className="w-full h-[300px] lg:h-[380px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="px-3 py-1 bg-white/90 backdrop-blur text-brand-deep text-[10px] uppercase tracking-[0.2em] font-medium rounded-sm">
                Transformation — piscine de villa
              </div>
            </div>
          </div>

          {/* Quote card */}
          <div
            data-testid="gallery-quote-card"
            className="col-span-12 lg:col-span-5 bg-brand-deep text-white p-8 lg:p-10 rounded-sm flex flex-col justify-between"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">Engagement</div>
            <p className="font-heading text-2xl lg:text-3xl font-light italic leading-snug">
              « Une eau parfaite, sans compromis. »
            </p>
            <div className="mt-6 text-sm text-white/60">
              Chaque piscine reçoit la même attention — parce qu'elle mérite
              l'excellence.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
