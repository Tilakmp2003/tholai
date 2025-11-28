"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocsViewer } from "@/components/docs/DocsViewer";

export default function Docs() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <DocsViewer />
      <Footer />
    </main>
  );
}
