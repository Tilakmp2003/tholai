import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductHero } from "@/components/product/ProductHero";
import { CoreArchitecture } from "@/components/product/CoreArchitecture";
import { OrganizationalHierarchy } from "@/components/product/OrganizationalHierarchy";
import { EndToEndWorkflow } from "@/components/product/EndToEndWorkflow";
import { GovernanceEngine } from "@/components/product/GovernanceEngine";
import { TechSpecs } from "@/components/product/TechSpecs";
import "@/components/product/ProductPage.css";

export default function Product() {
  return (
    <main className="product-page min-h-screen">
      <div className="product-grid-bg" />
      <Navbar />
      
      <ProductHero />
      <CoreArchitecture />
      <OrganizationalHierarchy />
      <EndToEndWorkflow />
      <GovernanceEngine />
      <TechSpecs />
      
      <Footer />
    </main>
  );
}
