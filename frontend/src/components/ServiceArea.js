import React from "react";
import { ZONES } from "@/lib/content";
import { MapPin } from "lucide-react";

export default function ServiceArea() {
  return (
    <section
      id="zone"
      data-testid="zone-section"
      className="relative py-24 lg:py-32 bg-brand-deep text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1756363831213-e4e4b40063ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzd2ltbWluZyUyMHBvb2wlMjBjbGVhciUyMHdhdGVyfGVufDB8fHx8MTc3NzYxNjQzN3ww&ixlib=rb-4.1.0&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-deep/90 to-brand-deep/70" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">
              <span className="w-8 h-px bg-brand-aqua" /> Zone d'intervention
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
              Rêv'dô intervient rapidement
              <br />
              <span className="italic font-extralight text-brand-aqua">
                sur toute l'île de La Réunion.
              </span>
            </h2>
            <p className="mt-6 text-white/70 text-sm lg:text-base max-w-md leading-relaxed">
              Du Sud au Nord en passant par l'Ouest, notre équipe se déplace
              rapidement pour offrir un service premium, réactif et soigné.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:gap-5">
            {ZONES.map((zone, i) => (
              <div
                key={zone}
                data-testid={`zone-card-${zone.toLowerCase()}`}
                className="group aspect-[3/4] bg-white/5 backdrop-blur-md border border-white/15 hover:border-brand-aqua p-5 lg:p-6 flex flex-col justify-between rounded-sm transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <MapPin size={22} strokeWidth={1.5} className="text-brand-aqua" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">
                    Zone
                  </div>
                  <div className="font-heading text-2xl lg:text-3xl font-light">{zone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
