import React, { useState, useEffect } from "react";
import { BRAND } from "@/lib/content";
import { Menu, X, Phone } from "lucide-react";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Zone", href: "#zone" },
  { label: "Pourquoi nous", href: "#pourquoi" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/70"
          : "bg-transparent"
      }`}
      style={{ marginTop: scrolled ? 0 : 0 }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-20">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
          <img
            src={BRAND.logo}
            alt="Rêv'dô"
            className="h-12 w-12 object-contain rounded-sm transition-transform duration-500 group-hover:scale-105"
          />
          <div className="leading-tight">
            <div className="font-heading text-xl font-semibold text-brand-deep tracking-tight">
              Rêv'dô
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-deep/60">
              Piscine • La Réunion
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-${item.href.replace("#", "")}`}
              className="nav-link text-sm font-medium text-brand-deep/80 hover:text-brand-deep transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            data-testid="nav-call-button"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-deep text-white text-sm rounded-sm hover:bg-brand-aqua transition-colors duration-300"
          >
            <Phone size={15} strokeWidth={1.8} />
            Appeler
          </a>
          <a
            href="#contact"
            data-testid="nav-quote-button"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-aqua text-white text-sm rounded-sm hover:bg-brand-aquaDark transition-colors duration-300"
          >
            Devis gratuit
          </a>
        </div>

        <button
          className="lg:hidden text-brand-deep p-2"
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-5 py-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-${item.href.replace("#", "")}`}
              className="block text-brand-deep font-medium"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <a
              href={BRAND.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-deep text-white text-sm rounded-sm"
              data-testid="mobile-nav-call"
            >
              <Phone size={15} /> Appeler {BRAND.phone}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-aqua text-white text-sm rounded-sm"
              data-testid="mobile-nav-quote"
            >
              Demander un devis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
