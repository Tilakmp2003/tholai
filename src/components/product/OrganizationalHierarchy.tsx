"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Terminal, Shield, Cpu, Zap, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import "./ProductPage.css";

const hierarchy = [
  {
    level: "L4",
    title: "Executive Function",
    desc: "Strategic planning & resource allocation",
    roles: [
      { id: "planner", title: "Project Planner", icon: <Brain />, stats: { iq: 98, speed: 40, cost: 90 }, desc: "Decomposes vague requirements into actionable PRDs." },
      { id: "architect", title: "Chief Architect", icon: <Cpu />, stats: { iq: 95, speed: 50, cost: 85 }, desc: "Designs scalable system topology and data models." }
    ]
  },
  {
    level: "L3",
    title: "Engineering Management",
    desc: "Coordination & unblocking",
    roles: [
      { id: "lead", title: "Tech Lead", icon: <Terminal />, stats: { iq: 90, speed: 70, cost: 75 }, desc: "Orchestrates parallel work streams and resolves conflicts." },
      { id: "security", title: "Security Officer", icon: <Shield />, stats: { iq: 92, speed: 60, cost: 80 }, desc: "Enforces zero-trust policies on all generated code." }
    ]
  },
  {
    level: "L2",
    title: "Core Development",
    desc: "Implementation & logic",
    roles: [
      { id: "senior", title: "Senior Dev", icon: <Code />, stats: { iq: 85, speed: 85, cost: 60 }, desc: "Implements complex business logic and core algorithms." },
      { id: "fullstack", title: "Full Stack", icon: <Zap />, stats: { iq: 80, speed: 90, cost: 50 }, desc: "Rapidly builds UI components and API endpoints." }
    ]
  },
  {
    level: "L1",
    title: "Quality Assurance",
    desc: "Verification & testing",
    roles: [
      { id: "qa", title: "QA Engineer", icon: <Shield />, stats: { iq: 75, speed: 95, cost: 40 }, desc: "Writes and executes comprehensive test suites." },
      { id: "perf", title: "Perf Analyst", icon: <Activity />, stats: { iq: 80, speed: 90, cost: 45 }, desc: "Identifies bottlenecks and optimizes query performance." }
    ]
  }
];

export function OrganizationalHierarchy() {
  const [activeLevel, setActiveLevel] = useState("L3");

  return (
    <section className="product-section relative overflow-hidden min-h-screen flex items-center">
      <div className="product-container">
        <div className="text-center mb-16">
          <span className="product-label">The Workforce</span>
          <h2 className="product-heading">The Neural Grid</h2>
          <p className="product-subheading mx-auto">
            Select a clearance level to inspect your autonomous staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
          
          {/* Tier Elevator (Navigation) */}
          <div className="lg:col-span-3 flex flex-col justify-center relative border-r border-white/10 pr-8">
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
            {/* Active Puck */}
            <motion.div 
              layoutId="elevator-puck"
              className="absolute right-[-2px] w-[3px] h-12 bg-blue-500 shadow-[0_0_20px_#3b82f6]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ 
                top: hierarchy.findIndex(h => h.level === activeLevel) * 100 + 100 // Approximate positioning logic
              }} 
            />
            
            <div className="space-y-2">
              {hierarchy.map((tier, idx) => (
                <button
                  key={tier.level}
                  onClick={() => setActiveLevel(tier.level)}
                  className={cn(
                    "w-full text-right p-6 rounded-l-xl transition-all duration-300 group relative overflow-hidden",
                    activeLevel === tier.level
                      ? "bg-gradient-to-l from-blue-500/10 to-transparent text-white"
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-3xl font-bold font-mono mb-1">{tier.level}</div>
                    <div className="text-xs uppercase tracking-widest opacity-70">{tier.title}</div>
                  </div>
                  {activeLevel === tier.level && (
                    <motion.div 
                      layoutId="active-glow"
                      className="absolute inset-0 bg-blue-500/5"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Glass Monoliths (Display) */}
          <div className="lg:col-span-9 relative perspective-container flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, z: -500, scale: 0.8 }}
                animate={{ opacity: 1, z: 0, scale: 1 }}
                exit={{ opacity: 0, z: 500, scale: 1.2 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl preserve-3d"
              >
                {hierarchy.find(h => h.level === activeLevel)?.roles.map((role, idx) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="holo-card min-h-[400px] flex flex-col relative group overflow-hidden border-t-4 border-t-transparent hover:border-t-blue-500 transition-all duration-300"
                  >
                    {/* Background Circuitry Video/Effect */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                      <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 flex items-start justify-between mb-8">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                        <div className="w-8 h-8">
                          {role.icon}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-gray-500 mb-1">UNIT_ID</div>
                        <div className="font-mono font-bold text-white/30">8X-{role.id.toUpperCase().slice(0, 3)}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        {role.desc}
                      </p>

                      {/* Stats Grid */}
                      <div className="space-y-4">
                        {Object.entries(role.stats).map(([key, value], i) => (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-500">
                              <span>{key}</span>
                              <span className="text-blue-400 font-mono">{value}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${value}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={cn(
                                  "h-full rounded-full shadow-[0_0_10px_currentColor]",
                                  key === 'cost' ? 'bg-amber-500 text-amber-500' : 
                                  key === 'speed' ? 'bg-cyan-500 text-cyan-500' : 
                                  'bg-blue-500 text-blue-500'
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-green-500 font-mono">ONLINE</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
