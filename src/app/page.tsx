import { FloatingNavbar } from "@/components/FloatingNavbar";
import { HeroPremium } from "@/components/HeroPremium";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { VelocityScroll } from "@/components/VelocityScroll";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PipelinePremium } from "@/components/PipelinePremium";
import { AgentCommandCenter } from "@/components/AgentCommandCenter";
import { TechStackPremium } from "@/components/TechStackPremium";
import { CodePreviewPremium } from "@/components/CodePreviewPremium";
import { CTAPremium } from "@/components/CTAPremium";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <FloatingNavbar />
      <HeroPremium />

      <VelocityScroll />
      <ComparisonSection />
      <PipelinePremium />
      <AgentCommandCenter />
      <TechStackPremium />
      <CodePreviewPremium />
      <CTAPremium />
      <Footer />
    </main>
  );
}
