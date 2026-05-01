import React from "react";
import { BRAND } from "@/lib/content";
import { Phone, MessageCircle, Send, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-brand-deep"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={BRAND.heroImage}
          alt="Piscine de luxe à La Réunion"
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/95 via-brand-deep/70 to-brand-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-brand-deep/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pt-40 pb-24 lg:pt-52 lg:pb-32 min-h-[100svh] flex flex-col justify-center">
        {/* SEO H1 (hidden visually, read by crawlers & screen readers) */}
        <h1 className="sr-only">
          Rêv'dô — Pisciniste premium à La Réunion : entretien, dépannage et installation piscine à Saint-Denis, Saint-Pierre, Saint-Paul, Saint-Gilles, Le Tampon et dans toute l'île.
        </h1>

        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua/90 mb-6">
            <span className="w-8 h-px bg-brand-aqua" /> Piscine • La Réunion
          </span>

          <h1
            data-testid="hero-title"
            className="font-heading text-white text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.05] tracking-tight"
            aria-hidden="true"
          >
            L'excellence
            <br />
            de la piscine à<br />
            <span className="italic font-extralight text-brand-aqua">La Réunion.</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-8 text-white/90 text-base sm:text-lg font-light max-w-xl"
          >
            {BRAND.subtitle}
          </p>

          <p className="mt-5 text-white/70 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
            Rêv'dô sublime et entretient votre piscine avec une exigence
            professionnelle et un savoir-faire précis. Nous intervenons
            rapidement pour garantir une eau propre, saine et un système
            parfaitement fonctionnel.
          </p>

          <p className="mt-8 font-heading text-lg sm:text-xl italic text-white font-light border-l border-brand-aqua pl-5 max-w-xl">
            « Chaque piscine mérite une attention d'exception. »
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={BRAND.phoneHref}
              data-testid="hero-call-button"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-aqua text-white text-sm tracking-wide hover:bg-brand-aquaDark transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={16} strokeWidth={1.8} />
              Appeler maintenant
            </a>
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-button"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-md text-white text-sm tracking-wide border border-white/30 hover:bg-white hover:text-brand-deep transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              WhatsApp
            </a>
            <a
              href="#contact"
              data-testid="hero-quote-button"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white text-sm tracking-wide border border-white/40 hover:border-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Send size={16} strokeWidth={1.8} />
              Demander un devis
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors flex flex-col items-center gap-2"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Explorer</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
