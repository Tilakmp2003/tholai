import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap } from "lucide-react";

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Changelog
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Track our journey as we build the future.
        </p>
        
        <div className="relative border-l border-white/10 pl-8 ml-4 md:ml-0 max-w-2xl w-full text-left space-y-12">
          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <div className="text-sm text-blue-400 font-mono mb-2">v1.0.0 • NOV 2025</div>
            <h3 className="text-2xl font-bold mb-4">Initial Public Release</h3>
            <p className="text-gray-400 leading-relaxed">
              Tholai is now live. We've introduced the first autonomous multi-agent engineering team capable of planning, coding, and deploying full-stack applications.
            </p>
            <ul className="mt-4 space-y-2 text-gray-500 text-sm">
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" /> Project Planner Agent</li>
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" /> Auto-Deployment Pipelines</li>
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" /> Real-time Collaboration</li>
            </ul>
          </div>
          
          <div className="relative opacity-50">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-800 border-4 border-black" />
            <div className="text-sm text-gray-500 font-mono mb-2">v0.9.0 • OCT 2025</div>
            <h3 className="text-xl font-bold mb-2">Beta Access</h3>
            <p className="text-gray-400">
              Private beta testing with select partners. Introduced the core "Agent Squad" architecture.
            </p>
          </div>

          <div className="pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Roadmap 2026
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 text-sm text-gray-500 font-mono pt-1">Q1</div>
                <div>
                  <h4 className="font-semibold text-white">Mobile App Generation</h4>
                  <p className="text-sm text-gray-500">Native iOS and Android builds directly from prompts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 text-sm text-gray-500 font-mono pt-1">Q2</div>
                <div>
                  <h4 className="font-semibold text-white">Enterprise On-Prem</h4>
                  <p className="text-sm text-gray-500">Self-hosted agents for high-security environments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
