"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User, PenTool, Terminal, Shield, Cpu, Zap, Brain, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "pm",
    role: "Product Manager",
    name: "Atlas",
    icon: User,
    description: "Transforms vague ideas into detailed technical specifications. Handles user stories and acceptance criteria.",
    stats: [
      { label: "Strategy", value: 95, color: "bg-blue-500" },
      { label: "Communication", value: 90, color: "bg-blue-400" },
      { label: "Analysis", value: 85, color: "bg-blue-300" },
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  {
    id: "arch",
    role: "Architect",
    name: "Vega",
    icon: PenTool,
    description: "Designs scalable systems, chooses the right tech stack, and ensures best practices in code structure.",
    stats: [
      { label: "System Design", value: 98, color: "bg-purple-500" },
      { label: "Scalability", value: 92, color: "bg-purple-400" },
      { label: "Security", value: 88, color: "bg-purple-300" },
    ],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
  },
  {
    id: "dev",
    role: "Senior Dev",
    name: "Neo",
    icon: Terminal,
    description: "Writes clean, efficient, and type-safe code. Implements features and fixes bugs at lightning speed.",
    stats: [
      { label: "Coding Speed", value: 99, color: "bg-green-500" },
      { label: "Algorithm", value: 95, color: "bg-green-400" },
      { label: "Debugging", value: 90, color: "bg-green-300" },
    ],
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
  },
  {
    id: "qa",
    role: "QA Engineer",
    name: "Trinity",
    icon: Shield,
    description: "Writes comprehensive test suites, performs regression testing, and ensures zero-bug releases.",
    stats: [
      { label: "Attention to Detail", value: 100, color: "bg-yellow-500" },
      { label: "Automation", value: 92, color: "bg-yellow-400" },
      { label: "Security Testing", value: 85, color: "bg-yellow-300" },
    ],
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    glow: "shadow-yellow-500/20",
  },
];

export function AgentCommandCenter() {
  const [activeId, setActiveId] = useState("dev");
  const activeAgent = agents.find(a => a.id === activeId) || agents[0];

  return (
    <section className="py-32 container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Command <span className="text-primary">Center</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Select an agent to view their capabilities and role in the pipeline.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto h-[600px]">
        {/* Left Panel: The Stage (Holographic View) */}
        <div className="flex-1 relative bg-[#0b0c0d] rounded-3xl border border-white/10 overflow-hidden flex flex-col">
          {/* Holographic Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
          
          {/* Scan Line Animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-[20%]"
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.id}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* Agent Icon / Avatar */}
                <div className={cn(
                  "w-32 h-32 rounded-full flex items-center justify-center mb-8 relative",
                  activeAgent.bg, activeAgent.border, "border-2"
                )}>
                  <activeAgent.icon className={cn("w-16 h-16", activeAgent.color)} />
                  {/* Rotating Rings */}
                  <div className={cn("absolute inset-[-10px] rounded-full border border-dashed opacity-30 animate-[spin_10s_linear_infinite]", activeAgent.border.replace('border', 'border-t'))} />
                  <div className={cn("absolute inset-[-20px] rounded-full border border-dotted opacity-20 animate-[spin_15s_linear_infinite_reverse]", activeAgent.border.replace('border', 'border-b'))} />
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">{activeAgent.role}</h3>
                <div className="text-sm font-mono text-gray-500 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ONLINE • {activeAgent.name}
                </div>
                <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                  {activeAgent.description}
                </p>

                {/* Stats Bars */}
                <div className="w-full max-w-xs space-y-4">
                  {activeAgent.stats.map((stat, i) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex justify-between text-xs uppercase tracking-wider text-gray-500">
                        <span>{stat.label}</span>
                        <span>{stat.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                          className={cn("h-full rounded-full", stat.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: The Roster (Selection) */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveId(agent.id)}
              className={cn(
                "group relative p-4 rounded-xl border transition-all duration-300 text-left hover:bg-white/5",
                activeId === agent.id 
                  ? "bg-white/5 border-primary/50 shadow-[0_0_20px_rgba(22,199,132,0.1)]" 
                  : "border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  activeId === agent.id ? agent.bg : "bg-white/5 group-hover:bg-white/10"
                )}>
                  <agent.icon className={cn("w-5 h-5", activeId === agent.id ? agent.color : "text-gray-400")} />
                </div>
                <div>
                  <div className={cn(
                    "font-bold transition-colors",
                    activeId === agent.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                  )}>
                    {agent.role}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {agent.name}
                  </div>
                </div>
                {activeId === agent.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(22,199,132,1)]"
                  />
                )}
              </div>
            </button>
          ))}
          
          {/* Decorative System Status */}
          <div className="mt-auto p-6 rounded-xl border border-white/5 bg-[#0b0c0d] font-mono text-xs text-gray-500 space-y-2">
            <div className="flex justify-between">
              <span>SYSTEM STATUS</span>
              <span className="text-green-500">OPTIMAL</span>
            </div>
            <div className="flex justify-between">
              <span>ACTIVE AGENTS</span>
              <span>4/4</span>
            </div>
            <div className="flex justify-between">
              <span>UPTIME</span>
              <span>99.99%</span>
            </div>
            <div className="h-px bg-white/5 my-2" />
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>CONNECTED TO NEURAL NET</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
