"use client";

import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Shield, Lock, DollarSign, Eye, AlertTriangle, FileCheck, Activity, Scan, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTORS = [
  {
    id: "cost",
    title: "Economic Efficiency",
    icon: <DollarSign className="w-6 h-6" />,
    color: "green",
    stats: "COST_OPTIMAL",
    details: [
      "Elastic Hierarchy: Senior agents only invoked for complex tasks.",
      "Serverless Runtimes: Zero idle cost. Agents hydrate only when needed.",
      "Budget Caps: Hard limits on token usage per project."
    ]
  },
  {
    id: "safety",
    title: "Reliability & Safety",
    icon: <Lock className="w-6 h-6" />,
    color: "blue",
    stats: "SECURE_LOCK",
    details: [
      "Double Review: Every PR reviewed by Team Lead + QA Agent.",
      "Canary Probing: External APIs tested before implementation.",
      "War Room: Auto-escalation for stuck tasks to prevent loops."
    ]
  },
  {
    id: "audit",
    title: "Enterprise Compliance",
    icon: <FileCheck className="w-6 h-6" />,
    color: "purple",
    stats: "AUDIT_LOGGED",
    details: [
      "Full Audit Trail: Every thought and tool call is logged.",
      "Traceability Cert: Generated proof of work for every delivery.",
      "Insurance Model: Platform-backed warranty on AI errors."
    ]
  }
];

function ShieldSector({ sector, isActive, onHover, index }: { sector: any, isActive: boolean, onHover: () => void, index: number }) {
  return (
    <motion.div
      onMouseEnter={onHover}
      className={cn(
        "relative p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 group",
        isActive 
          ? `bg-${sector.color}-500/10 border-${sector.color}-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]` 
          : "bg-white/5 border-white/10 hover:border-white/20"
      )}
    >
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          layoutId="active-glow"
          className={`absolute inset-0 rounded-2xl bg-${sector.color}-500/5`} 
        />
      )}

      <div className="flex items-start gap-4 relative z-10">
        <div className={cn(
          "p-3 rounded-xl transition-colors duration-300",
          isActive ? `bg-${sector.color}-500/20 text-${sector.color}-400` : "bg-white/5 text-gray-400"
        )}>
          {sector.icon}
        </div>
        <div>
          <h3 className={cn(
            "text-lg font-bold mb-1 transition-colors duration-300",
            isActive ? "text-white" : "text-gray-400"
          )}>
            {sector.title}
          </h3>
          <div className={cn(
            "text-xs font-mono mb-4 transition-colors duration-300",
            isActive ? `text-${sector.color}-400` : "text-gray-600"
          )}>
            STATUS: {sector.stats}
          </div>
          
          <motion.div 
            initial={false}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 text-sm text-gray-400">
              {sector.details.map((detail: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1 h-1 rounded-full bg-${sector.color}-500`} />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ComplianceShield() {
  const [activeSector, setActiveSector] = useState("safety");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax for Shield
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent) {
    const { width, height, left, top } = containerRef.current?.getBoundingClientRect() ?? { width: 0, height: 0, left: 0, top: 0 };
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#020202] relative overflow-hidden perspective-container"
      style={{ perspective: "1000px" }}
    >
      {/* Digital Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-[10px] leading-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Holographic Shield Model */}
          <div className="relative flex items-center justify-center h-[500px]">
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-80 h-96 transform-style-3d"
            >
              {/* Shield Layers */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotateZ: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                  className={cn(
                    "absolute inset-0 border rounded-[50%] pointer-events-none",
                    i === 0 ? "border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.3)]" : 
                    i === 1 ? "border-purple-500/30 border-dashed" :
                    i === 2 ? "border-green-500/30 border-dotted" :
                    "border-white/10"
                  )}
                  style={{ 
                    transform: `translateZ(${i * 20}px)`,
                    width: `${100 + i * 20}%`,
                    height: `${100 + i * 20}%`,
                    left: `-${i * 10}%`,
                    top: `-${i * 10}%`
                  }}
                />
              ))}

              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-40 bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-[50%] flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                >
                  <Shield className="w-16 h-16 text-white/80" />
                </motion.div>
              </div>

              {/* Floating Particles (Threats being blocked) */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ 
                    x: [Math.random() * 200 - 100, 0],
                    y: [Math.random() * 200 - 100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                />
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive Sectors */}
          <div>
            <div className="mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/30 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6"
              >
                <Scan className="w-3 h-3" />
                SECURITY_LEVEL_MAX
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Holographic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Fortress</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We don't just write code. We insure it. Built-in cost controls, safety rails, and forensic auditability.
              </p>
            </div>

            <div className="space-y-4">
              {SECTORS.map((sector, i) => (
                <ShieldSector 
                  key={sector.id} 
                  sector={sector} 
                  index={i}
                  isActive={activeSector === sector.id}
                  onHover={() => setActiveSector(sector.id)}
                />
              ))}
            </div>

            {/* Live Feed Footer */}
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                SYSTEM_INTEGRITY: 100%
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="w-3 h-3" />
                ID: 892-ALPHA-SECURE
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
