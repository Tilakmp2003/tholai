import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Join the Revolution
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          We're looking for world-class engineers, designers, and thinkers to help us build the future of coding.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-16">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-sm font-semibold">Remote First</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-semibold">Top 1% Salary</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">🏥</div>
            <div className="text-sm font-semibold">Full Health</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-sm font-semibold">High Equity</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="p-6 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-colors">
            <div className="text-left">
              <h3 className="font-semibold text-white">Senior AI Engineer</h3>
              <p className="text-sm text-gray-500">Remote • Full-time</p>
            </div>
            <ArrowRight className="text-gray-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="p-6 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-colors">
            <div className="text-left">
              <h3 className="font-semibold text-white">Founding Designer</h3>
              <p className="text-sm text-gray-500">San Francisco • Hybrid</p>
            </div>
            <ArrowRight className="text-gray-500 group-hover:text-blue-400 transition-colors" />
          </div>
        </div>
        
        <p className="mt-12 text-gray-500 text-sm">
          Don't see your role? Email us at <span className="text-white">career@tholai.xyz</span>
        </p>
      </div>
      <Footer />
    </main>
  );
}
