"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Database, Cpu, Activity, Layers, Server, Shield, Zap, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import "./ProductPage.css";

const layers = [
  {
    id: "orchestrator",
    title: "Orchestrator Layer",
    icon: <Cpu />,
    color: "bg-blue-500",
    textColor: "text-blue-400",
    desc: "The central brain. Manages dispatch, escalation, and governance loops.",
    specs: [
      { label: "Latency", value: "<10ms" },
      { label: "Throughput", value: "10k/sec" },
      { label: "Logic", value: "Planner Agent" }
    ]
  },
  {
    id: "runtime",
    title: "Ephemeral Runtime",
    icon: <Layers />,
    color: "bg-purple-500",
    textColor: "text-purple-400",
    desc: "Serverless, isolated environments for secure agent execution.",
    specs: [
      { label: "Isolation", value: "V8 Sandbox" },
      { label: "Startup", value: "Warm Pool" },
      { label: "Security", value: "Zero Trust" }
    ]
  },
  {
    id: "data",
    title: "Data Plane",
    icon: <Database />,
    color: "bg-green-500",
    textColor: "text-green-400",
    desc: "PostgreSQL for structured state, Vector Store for semantic context.",
    specs: [
      { label: "Storage", value: "PgVector" },
      { label: "Consistency", value: "Strong" },
      { label: "Backup", value: "Real-time" }
    ]
  }
];

export function CoreArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax / Explosion values
  const yOrchestrator = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200]);
  const yRuntime = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]);
  const yData = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [60, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="product-section min-h-[150vh] relative overflow-hidden flex flex-col items-center justify-center">
      
      <div className="text-center mb-20 relative z-20">
        <span className="product-label">System Blueprint</span>
        <h2 className="product-heading">System Nucleus</h2>
        <p className="product-subheading mx-auto">
          A 3D exploded view of the autonomous engine.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] perspective-container flex items-center justify-center">
        
        {/* 3D Isometric Stack */}
        <motion.div 
          className="relative w-[500px] h-[500px] preserve-3d"
          style={{ 
            rotateX, 
            rotateZ: -45,
            scale,
            opacity
          }}
        >
          {/* Orchestrator Layer (Top) */}
          <motion.div 
            className={cn(
              "absolute inset-0 rounded-3xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer group",
              activeLayer === "orchestrator" ? "bg-blue-900/40 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.3)]" : "bg-black/60 border-blue-500/30 hover:bg-blue-900/20"
            )}
            style={{ z: 100, y: yOrchestrator }}
            onMouseEnter={() => setActiveLayer("orchestrator")}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center transform -rotate-z-[45deg] -rotate-x-[60deg]">
              <Cpu className="w-24 h-24 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-4 left-4 text-blue-400 font-mono text-sm">ORCHESTRATOR_LAYER</div>
          </motion.div>

          {/* Runtime Layer (Middle) */}
          <motion.div 
            className={cn(
              "absolute inset-0 rounded-3xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer group",
              activeLayer === "runtime" ? "bg-purple-900/40 border-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.3)]" : "bg-black/60 border-purple-500/30 hover:bg-purple-900/20"
            )}
            style={{ z: 50, y: yRuntime }}
            onMouseEnter={() => setActiveLayer("runtime")}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center transform -rotate-z-[45deg] -rotate-x-[60deg]">
              <Layers className="w-24 h-24 text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-4 left-4 text-purple-400 font-mono text-sm">RUNTIME_LAYER</div>
          </motion.div>

          {/* Data Layer (Bottom) */}
          <motion.div 
            className={cn(
              "absolute inset-0 rounded-3xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer group",
              activeLayer === "data" ? "bg-green-900/40 border-green-400 shadow-[0_0_50px_rgba(34,197,94,0.3)]" : "bg-black/60 border-green-500/30 hover:bg-green-900/20"
            )}
            style={{ z: 0, y: yData }}
            onMouseEnter={() => setActiveLayer("data")}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center transform -rotate-z-[45deg] -rotate-x-[60deg]">
              <Database className="w-24 h-24 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-4 left-4 text-green-400 font-mono text-sm">DATA_LAYER</div>
          </motion.div>

          {/* Connecting Beams */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ z: 50 }}>
             <div className="absolute left-1/2 top-1/2 w-1 h-[400px] bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-sm" />
          </motion.div>

        </motion.div>

        {/* Info HUD (Floating Side Panel) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 hidden lg:block">
          <AnimatePresence mode="wait">
            {activeLayer && (
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="holo-card border-l-4"
                style={{ borderLeftColor: activeLayer === 'orchestrator' ? '#60a5fa' : activeLayer === 'runtime' ? '#c084fc' : '#4ade80' }}
              >
                {layers.map(layer => {
                  if (layer.id !== activeLayer) return null;
                  return (
                    <div key={layer.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("p-2 rounded bg-white/10", layer.textColor)}>{layer.icon}</div>
                        <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6">{layer.desc}</p>
                      
                      <div className="space-y-3">
                        {layer.specs.map((spec, i) => (
                          <div key={i} className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                            <span className="text-gray-500">{spec.label}</span>
                            <span className={cn("font-mono font-bold", layer.textColor)}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
            {!activeLayer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 font-mono text-xs"
              >
                HOVER_LAYER_FOR_TELEMETRY
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
