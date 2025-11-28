"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { DataModelViewer } from "@/components/features/DataModelViewer";
import { DetailedWorkflow } from "@/components/features/DetailedWorkflow";
import { ComplianceShield } from "@/components/features/ComplianceShield";

export default function Features() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <FeaturesHero />
      <DataModelViewer />
      <DetailedWorkflow />
      <ComplianceShield />

      <Footer />
    </main>
  );
}
