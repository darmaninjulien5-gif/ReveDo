import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmergencyBanner from "@/components/EmergencyBanner";
import Services from "@/components/Services";
import ServiceArea from "@/components/ServiceArea";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BrandMarquee from "@/components/BrandMarquee";

export default function Home() {
  return (
    <main data-testid="home-page" className="relative">
      <Navbar />
      <EmergencyBanner />
      <Hero />
      <BrandMarquee />
      <Services />
      <ServiceArea />
      <WhyUs />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
