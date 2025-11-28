"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Brain, Code2, ShieldCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import "./ProductPage.css";

const agents = [
  {
    id: "pm",
    role: "Product Manager",
    icon: <User className="w-6 h-6" />,
    desc: "Analyzes requirements, creates user stories, and defines acceptance criteria.",
    stats: { logic: 95, creativity: 80, speed: 90 },
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "architect",
    role: "System Architect",
    icon: <Brain className="w-6 h-6" />,
    desc: "Designs scalable system architecture, database schemas, and API contracts.",
    stats: { logic: 99, creativity: 85, speed: 85 },
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    id: "dev",
    role: "Senior Developer",
    icon: <Code2 className="w-6 h-6" />,
    desc: "Implements complex logic, writes clean code, and optimizes performance.",
    stats: { logic: 90, creativity: 75, speed: 98 },
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    id: "qa",
    role: "QA Engineer",
    icon: <ShieldCheck className="w-6 h-6" />,
    desc: "Writes comprehensive test suites, performs security audits, and verifies fixes.",
    stats: { logic: 95, creativity: 60, speed: 95 },
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  }
];

export function AgentSquad() {
  const [activeAgent, setActiveAgent] = useState(agents[0]);

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="text-center mb-16">
          <span className="product-label">The Squad</span>
          <h2 className="product-heading">Meet Your New Team</h2>
          <p className="product-subheading mx-auto">
            A fully autonomous squad of specialized AI agents working in perfect harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agent List */}
          <div className="lg:col-span-5 space-y-4">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-4",
                  activeAgent.id === agent.id 
                    ? `bg-white/5 ${agent.border} shadow-[0_0_20px_rgba(0,0,0,0.5)]` 
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
                )}
                onClick={() => setActiveAgent(agent)}
                whileHover={{ x: 10 }}
              >
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", agent.bg, agent.color)}>
                  {agent.icon}
                </div>
                <div>
                  <h3 className={cn("font-bold text-lg", activeAgent.id === agent.id ? "text-white" : "text-gray-400")}>
                    {agent.role}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Specialized Agent</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agent Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="industrial-card min-h-[400px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center", activeAgent.bg, activeAgent.color)}>
                      {activeAgent.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{activeAgent.role}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">v2.5.0</span>
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">Online</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {activeAgent.desc}
                  </p>

                  {/* Stats Bars */}
                  <div className="space-y-6">
                    {Object.entries(activeAgent.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className={cn("font-mono", activeAgent.color)}>{value}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn("h-full", activeAgent.color.replace('text-', 'bg-').replace('-400', '-500'))}
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="text-sm text-gray-500 font-mono">ID: {activeAgent.id.toUpperCase()}_8X92</div>
                  <button className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
                    View Logs
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
