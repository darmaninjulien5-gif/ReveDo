import React from "react";
import { SERVICES } from "@/lib/content";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

function ServiceCard({ s, index }) {
  const Icon = Icons[s.icon] || Icons.Wrench;
  return (
    <a
      href="#contact"
      data-testid={`service-card-${s.id}`}
      className="group relative flex flex-col bg-white border border-gray-200/80 p-7 lg:p-8 rounded-sm transition-all duration-500 hover:border-brand-aqua hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,37,69,0.25)]"
    >
      {s.isNew && (
        <span className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase bg-brand-aqua text-white px-2 py-0.5 rounded-sm">
          Nouveau
        </span>
      )}
      <div className="mb-6 w-11 h-11 flex items-center justify-center bg-brand-cream rounded-sm text-brand-deep group-hover:bg-brand-deep group-hover:text-white transition-colors duration-500">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-lg lg:text-xl font-medium text-brand-deep tracking-tight">
        {s.title}
      </h3>
      <ul className="mt-4 space-y-1.5 text-sm text-brand-deep/70 flex-1">
        {s.lines.map((line, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-brand-aqua shrink-0" />
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-gray-200/80 flex items-center justify-between text-sm">
        <span className="text-brand-deep font-medium">{s.tag}</span>
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          className="text-brand-deep/40 group-hover:text-brand-aqua group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </a>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="water-ripple opacity-[0.04]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">
              <span className="w-8 h-px bg-brand-aqua" /> Nos services
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-brand-deep tracking-tight">
              Une exigence professionnelle,
              <br />
              <span className="italic font-extralight text-brand-aqua">à chaque intervention.</span>
            </h2>
          </div>
          <p className="text-sm lg:text-base text-brand-deep/60 max-w-sm">
            Entretien, dépannage, installation — nous couvrons l'ensemble de vos
            besoins piscine avec un soin précis et des résultats visibles
            immédiatement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 stagger">
          {SERVICES.map((s, idx) => (
            <ServiceCard key={s.id} s={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
