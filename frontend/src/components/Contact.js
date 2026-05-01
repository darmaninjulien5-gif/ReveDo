import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BRAND, PROBLEM_TYPES } from "@/lib/content";
import { Phone, MessageCircle, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    problem_type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.problem_type.trim()) {
      toast.error("Merci de remplir votre nom, ville et le type de problème.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/quote-request`, {
        name: form.name.trim(),
        city: form.city.trim(),
        problem_type: form.problem_type,
        phone: form.phone.trim() || null,
        message: form.message.trim() || null,
      });
      toast.success("Demande envoyée ! Nous vous recontactons rapidement.");
      setSent(true);
      setForm({ name: "", city: "", phone: "", problem_type: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez nous appeler directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 lg:py-32 bg-brand-cream overflow-hidden"
    >
      <div className="water-ripple opacity-[0.07]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: info */}
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">
            <span className="w-8 h-px bg-brand-aqua" /> Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-brand-deep tracking-tight">
            Besoin d'un service
            <br />
            <span className="italic font-extralight text-brand-aqua">d'exception ?</span>
          </h2>
          <p className="mt-6 text-sm lg:text-base text-brand-deep/70 leading-relaxed max-w-md">
            Décrivez votre besoin — entretien, dépannage, installation — nous
            vous répondons rapidement avec un devis clair et transparent.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={BRAND.phoneHref}
              data-testid="contact-call-link"
              className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-sm hover:border-brand-aqua hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-brand-cream rounded-sm text-brand-deep group-hover:bg-brand-deep group-hover:text-white transition-colors">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand-deep/50">
                    Appeler
                  </div>
                  <div className="font-heading text-brand-deep text-lg">{BRAND.phone}</div>
                </div>
              </div>
              <span className="text-brand-aqua text-sm">→</span>
            </a>

            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-link"
              className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-sm hover:border-brand-aqua hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-brand-cream rounded-sm text-brand-deep group-hover:bg-brand-deep group-hover:text-white transition-colors">
                  <MessageCircle size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand-deep/50">WhatsApp</div>
                  <div className="font-heading text-brand-deep text-lg">{BRAND.phone}</div>
                </div>
              </div>
              <span className="text-brand-aqua text-sm">→</span>
            </a>

            <a
              href={BRAND.emailHref}
              data-testid="contact-email-link"
              className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-sm hover:border-brand-aqua hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-brand-cream rounded-sm text-brand-deep group-hover:bg-brand-deep group-hover:text-white transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand-deep/50">Email</div>
                  <div className="font-heading text-brand-deep text-lg">{BRAND.email}</div>
                </div>
              </div>
              <span className="text-brand-aqua text-sm">→</span>
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="bg-white border border-gray-200 rounded-sm p-7 lg:p-10 relative"
        >
          {sent && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur flex flex-col items-center justify-center rounded-sm z-10 text-center p-6" data-testid="form-success">
              <CheckCircle2 size={48} strokeWidth={1.2} className="text-brand-aqua mb-4" />
              <h3 className="font-heading text-2xl font-light text-brand-deep">Demande envoyée</h3>
              <p className="text-brand-deep/60 text-sm mt-2 max-w-sm">
                Nous vous recontactons dans les plus brefs délais. Merci pour votre confiance.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-brand-aqua hover:underline"
                data-testid="form-reset-button"
              >
                Envoyer une nouvelle demande
              </button>
            </div>
          )}

          <div className="text-xs uppercase tracking-[0.25em] text-brand-aqua mb-2">
            Devis gratuit
          </div>
          <h3 className="font-heading text-2xl lg:text-3xl font-light text-brand-deep tracking-tight">
            Demander un devis
          </h3>
          <p className="text-sm text-brand-deep/60 mt-2">Réponse rapide et personnalisée.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-deep/60 mb-2">
                Nom *
              </label>
              <input
                type="text"
                required
                data-testid="form-input-name"
                value={form.name}
                onChange={onChange("name")}
                placeholder="Votre nom"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-brand-deep focus:outline-none focus:border-brand-aqua transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-deep/60 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  required
                  data-testid="form-input-city"
                  value={form.city}
                  onChange={onChange("city")}
                  placeholder="Saint-Denis, Saint-Pierre..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-brand-deep focus:outline-none focus:border-brand-aqua transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-deep/60 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  data-testid="form-input-phone"
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+262 ..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-brand-deep focus:outline-none focus:border-brand-aqua transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-deep/60 mb-2">
                Type de problème *
              </label>
              <select
                required
                data-testid="form-input-problem"
                value={form.problem_type}
                onChange={onChange("problem_type")}
                className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-brand-deep focus:outline-none focus:border-brand-aqua transition-colors"
              >
                <option value="">Choisir...</option>
                {PROBLEM_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-deep/60 mb-2">
                Message (optionnel)
              </label>
              <textarea
                data-testid="form-input-message"
                value={form.message}
                onChange={onChange("message")}
                rows={3}
                placeholder="Détails sur votre besoin..."
                className="w-full px-4 py-3 border border-gray-200 rounded-sm bg-white text-brand-deep focus:outline-none focus:border-brand-aqua transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="form-submit-button"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-deep text-white text-sm tracking-wide hover:bg-brand-aqua transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Envoi...
                </>
              ) : (
                <>
                  <Send size={16} strokeWidth={1.8} /> Envoyer ma demande
                </>
              )}
            </button>

            <p className="text-xs text-brand-deep/50 text-center">
              En envoyant, vous acceptez d'être recontacté par Rêv'dô concernant votre demande.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
