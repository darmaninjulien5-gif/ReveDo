import React from "react";
import { BRAND } from "@/lib/content";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-brand-deep text-white/80 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={BRAND.logo}
                alt="Rêv'dô"
                className="h-12 w-12 object-contain rounded-sm bg-white/5 p-1"
              />
              <div>
                <div className="font-heading text-xl font-semibold text-white">Rêv'dô</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Piscine • La Réunion
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              L'excellence de la piscine à La Réunion. Entretien sur mesure,
              dépannage rapide, eau cristalline garantie.
            </p>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-brand-aqua mb-4">
              Zones d'intervention
            </div>
            <ul className="space-y-2 text-sm">
              <li>Sud de La Réunion</li>
              <li>Nord de La Réunion</li>
              <li>Ouest de La Réunion</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-brand-aqua mb-4">Contact</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone size={14} strokeWidth={1.6} /> {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  data-testid="footer-whatsapp"
                >
                  <MessageCircle size={14} strokeWidth={1.6} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={BRAND.emailHref}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  data-testid="footer-email"
                >
                  <Mail size={14} strokeWidth={1.6} /> {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Rêv'dô — Tous droits réservés.</div>
          <div className="italic">« Chaque piscine mérite l'excellence. »</div>
        </div>
      </div>
    </footer>
  );
}
