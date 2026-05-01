import React from "react";
import { WHY_US } from "@/lib/content";
import * as Icons from "lucide-react";

export default function WhyUs() {
  return (
    <section
      id="pourquoi"
      data-testid="why-us-section"
      className="relative py-24 lg:py-32 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-aqua mb-4">
            <span className="w-8 h-px bg-brand-aqua" /> Pourquoi Rêv'dô
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-brand-deep tracking-tight">
            Une exigence au service
            <br />
            <span className="italic font-extralight text-brand-aqua">de votre piscine.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {WHY_US.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Check;
            return (
              <div
                key={item.title}
                data-testid={`why-card-${i}`}
                className="group bg-white border border-gray-200/80 p-7 rounded-sm hover:border-brand-aqua hover:-translate-y-1 transition-all duration-500"
              >
                <div className="mb-5 w-11 h-11 flex items-center justify-center bg-brand-cream rounded-sm text-brand-deep group-hover:bg-brand-deep group-hover:text-white transition-colors duration-500">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-base lg:text-lg font-medium text-brand-deep leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-brand-deep/60 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
