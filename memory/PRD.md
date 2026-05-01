# Rêv'dô — Site premium piscine La Réunion

## Problem Statement (résumé)
Site one-page moderne, luxe minimaliste pour Rêv'dô (entreprise piscine à La Réunion). Objectifs : image premium et fiable, génération d'appels et demandes de devis, mise en avant rapidité/sur-mesure/expertise.

Couleurs : bleu profond (#0B2545), bleu aqua (#00A8E8), blanc, crème. Typographie : Outfit (titres) + Manrope (texte). Site en français.

## User Personas
- **Propriétaire de piscine particulier** (résidence La Réunion) — cherche entretien régulier, devis rapide, rassurance premium.
- **Propriétaire en urgence** (piscine verte, pompe HS) — cherche intervention rapide, bouton appel/WhatsApp immédiat.
- **Client vacances / absent** — cherche surveillance et entretien pendant son absence.

## Core Requirements (statiques)
- One-page avec sections : Hero, Bannière urgence, Services (11), Zone intervention, Pourquoi nous, Galerie, Contact, Footer.
- CTAs récurrents : Appeler (+262 692 61 66 57), WhatsApp, Devis.
- Bouton WhatsApp flottant.
- Formulaire devis (nom, ville, tel, type problème, message) → stockage MongoDB.
- Email revedo@orange.fr affiché en contact (mailto).
- Design luxe minimaliste, effet eau subtil, animations douces.

## Implemented (2025-12)
- ✅ Backend FastAPI : endpoints `/api/`, `POST /api/quote-request`, `GET /api/quote-request` (MongoDB stockage).
- ✅ Frontend React one-page avec 9 composants : Navbar, EmergencyBanner, Hero, BrandMarquee, Services, ServiceArea, WhyUs, Gallery, Contact, Footer, FloatingWhatsApp.
- ✅ 11 services avec icônes lucide, badges "Nouveau" pour les 4 nouveaux.
- ✅ Zone intervention (Sud/Nord/Ouest) en grille glassmorphism sur fond bleu profond.
- ✅ 5 raisons "Pourquoi Rêv'dô".
- ✅ Galerie : photos réelles (avant/après, local technique) + image luxe hero.
- ✅ Formulaire contact avec validation + toast sonner + écran de succès.
- ✅ Bouton WhatsApp flottant avec animation ping.
- ✅ Responsive (mobile menu), smooth scroll, ancres de navigation.
- ✅ Tests : 6 backend + 12 frontend — tous passés.

## Backlog / Next Actions

### P0 (à faire bientôt)
- Ajouter envoi email Resend quand le client obtiendra sa clé API (chemin déjà préparé côté backend : stockage DB).
- Ajouter page admin simple pour consulter les demandes de devis stockées (vue `/api/quote-request`).

### P1
- Témoignages clients (quand de vrais avis seront disponibles).
- Photos réelles supplémentaires (interventions, équipe, réalisations).
- SEO local : schema.org LocalBusiness, balises meta optimisées par ville, Google Business.

### P2
- Avant/Après interactif (slider draggable) sur la vraie photo.
- Blog / actualités (conseils saisonniers piscine).
- Intégration Google Maps sur la zone d'intervention.
- Intégration Calendly pour prise de RDV en ligne.
