"use client";

import { SpotlightCard } from "@/components/SpotlightCard";
import { motion } from "framer-motion";
import { Brain, Code2, ShieldCheck, Zap, Layers, GitBranch, Terminal } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-32 container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Engineered for <span className="text-primary">Velocity</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Every tool you need to ship software, orchestrated by AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Large Card - Left */}
        <SpotlightCard className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Autonomous Squads</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Deploy a full team of AI agents: Product Managers to plan, Architects to design, Developers to code, and QA to test. They work in parallel, 24/7.
            </p>
          </div>
          <div className="mt-8 relative h-48 rounded-lg bg-black/50 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            {/* Abstract visualization of agents connecting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center gap-4">
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50" />
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50" />
               <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50" />
            </div>
          </div>
        </SpotlightCard>

        {/* Tall Card - Right */}
        <SpotlightCard className="md:row-span-2 p-8 flex flex-col min-h-[400px]">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Live Execution</h3>
          <p className="text-gray-400 mb-8">
            Watch every command, file change, and test run in real-time.
          </p>
          <div className="flex-1 rounded-lg bg-[#0b0c0d] border border-white/10 p-4 font-mono text-xs text-green-400 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b0c0d]" />
            <div className="space-y-2 opacity-70">
              <div>$ npm install</div>
              <div>$ git checkout -b feat/auth</div>
              <div>$ tholai generate</div>
              <div className="text-white">Generating components...</div>
              <div className="text-blue-400">Created src/auth.ts</div>
              <div className="text-blue-400">Created src/login.tsx</div>
              <div>$ npm test</div>
              <div className="text-green-400">PASS src/auth.test.ts</div>
            </div>
          </div>
        </SpotlightCard>

        {/* Small Card 1 */}
        <SpotlightCard className="p-6">
          <GitBranch className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Git Native</h3>
          <p className="text-gray-400 text-sm">
            Auto-PRs, clean commits, and branch management.
          </p>
        </SpotlightCard>

        {/* Small Card 2 */}
        <SpotlightCard className="p-6">
          <ShieldCheck className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Human Gates</h3>
          <p className="text-gray-400 text-sm">
            You approve critical changes before they ship.
          </p>
        </SpotlightCard>

        {/* Wide Card - Bottom */}
        <SpotlightCard className="md:col-span-3 p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Self-Healing Infrastructure</h3>
            <p className="text-gray-400 text-lg">
              When tests fail, Tholai reads the stack trace, researches the error, and patches the code automatically. No human intervention needed for routine bugs.
            </p>
          </div>
          <div className="flex-1 w-full h-32 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-green-500/10 rounded-lg border border-white/10 flex items-center justify-around">
            <div className="text-red-400 font-mono text-sm">Error</div>
            <div className="w-8 h-0.5 bg-white/20" />
            <div className="text-yellow-400 font-mono text-sm">Patch</div>
            <div className="w-8 h-0.5 bg-white/20" />
            <div className="text-green-400 font-mono text-sm">Fixed</div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
