"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingViewer } from "@/components/pricing/PricingViewer";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#020202]">
      <Navbar />
      <PricingViewer />
      <Footer />
    </main>
  );
}
