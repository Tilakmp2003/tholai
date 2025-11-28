"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, FileText, Layout, GitBranch, Radio, Play, Users, ShieldCheck, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import "./ProductPage.css";

const phases = [
  { id: 1, title: "Intake", icon: <MessageSquare />, desc: "Socratic Interrogator resolves ambiguity.", color: "text-blue-400", border: "border-blue-500/50", shadow: "shadow-blue-500/20" },
  { id: 2, title: "Plan", icon: <FileText />, desc: "PRD creation & Executive guidance.", color: "text-purple-400", border: "border-purple-500/50", shadow: "shadow-purple-500/20" },
  { id: 3, title: "Design", icon: <Layout />, desc: "Architecture & Module decomposition.", color: "text-pink-400", border: "border-pink-500/50", shadow: "shadow-pink-500/20" },
  { id: 4, title: "Routing", icon: <GitBranch />, desc: "Fast-Track vs Deep Work classification.", color: "text-orange-400", border: "border-orange-500/50", shadow: "shadow-orange-500/20" },
  { id: 5, title: "Probe", icon: <Radio />, desc: "Canary Agents validate external APIs.", color: "text-yellow-400", border: "border-yellow-500/50", shadow: "shadow-yellow-500/20" },
  { id: 6, title: "Execute", icon: <Play />, desc: "Async development loop in sandboxes.", color: "text-green-400", border: "border-green-500/50", shadow: "shadow-green-500/20" },
  { id: 7, title: "War Room", icon: <Users />, desc: "Sync collaboration for deadlocks.", color: "text-red-400", border: "border-red-500/50", shadow: "shadow-red-500/20" },
  { id: 8, title: "Deliver", icon: <ShieldCheck />, desc: "Governance check & Insurance issue.", color: "text-cyan-400", border: "border-cyan-500/50", shadow: "shadow-cyan-500/20" }
];

export function EndToEndWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="product-section relative overflow-hidden">
      <div className="product-container" ref={containerRef}>
        <div className="text-center mb-24">
          <span className="product-label">The Lifecycle</span>
          <h2 className="product-heading">The Pulse Stream</h2>
          <p className="product-subheading mx-auto">
            A continuous, vertical flow of autonomous execution.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Energy Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2">
            <motion.div 
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex items-center gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Node on Spine */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-black border-2 border-white/20 rounded-full z-10 flex items-center justify-center group">
                  <div className={cn("w-3 h-3 rounded-full transition-all duration-500 group-hover:scale-150", phase.color.replace("text", "bg"))} />
                  <div className={cn("absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-ping", phase.color.replace("text", "bg"))} />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 w-full md:w-1/2">
                  <div className={cn(
                    "holo-card group hover:scale-105 transition-transform duration-300",
                    `hover:${phase.border}`
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn("p-3 rounded-lg bg-white/5", phase.color)}>
                        {phase.icon}
                      </div>
                      <span className="font-mono text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                        0{phase.id}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {phase.desc}
                    </p>

                    {/* Active State Indicator */}
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", phase.color.replace("text", "bg"))} />
                      <span className={cn("text-[10px] font-mono uppercase tracking-wider", phase.color)}>
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
