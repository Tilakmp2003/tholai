import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Engineering Blog
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8">
          Insights, tutorials, and stories from the frontier of AI-driven development.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4 text-left opacity-50 pointer-events-none">
           {/* Placeholder Cards */}
           {[1, 2, 3].map((i) => (
             <div key={i} className="border border-white/10 rounded-2xl p-6 bg-white/5">
               <div className="h-40 bg-white/5 rounded-xl mb-4 animate-pulse" />
               <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
               <div className="h-4 w-1/2 bg-white/10 rounded" />
             </div>
           ))}
        </div>
        <p className="mt-12 text-blue-400 font-mono text-sm">COMING SOON</p>
      </div>
      <Footer />
    </main>
  );
}
