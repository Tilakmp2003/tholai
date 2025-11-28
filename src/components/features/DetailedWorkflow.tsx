"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  MessageSquare, FileText, Component, Zap, 
  Activity, Code, ShieldAlert, CheckCircle, ChevronRight, Terminal 
} from "lucide-react";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    id: "0",
    title: "Client Intake",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "blue",
    steps: ["Ambiguity Analysis", "Socratic Q&A", "Scope Definition"]
  },
  {
    id: "1",
    title: "PRD & Setup",
    icon: <FileText className="w-8 h-8" />,
    color: "purple",
    steps: ["REQ-ID Generation", "Tech Stack Lock", "DB Initialization"]
  },
  {
    id: "2",
    title: "Architecture",
    icon: <Component className="w-8 h-8" />,
    color: "cyan",
    steps: ["Schema Design", "Module Decomposition", "Task Classification"]
  },
  {
    id: "3",
    title: "Fast-Track",
    icon: <Zap className="w-8 h-8" />,
    color: "yellow",
    steps: ["Complexity Scoring", "Agent Tiering", "Parallel Routing"]
  },
  {
    id: "4",
    title: "Canary Probe",
    icon: <Activity className="w-8 h-8" />,
    color: "orange",
    steps: ["API Detection", "Endpoint Validation", "Context Grounding"]
  },
  {
    id: "5",
    title: "Execution",
    icon: <Code className="w-8 h-8" />,
    color: "green",
    steps: ["Serverless Runtime", "Unit Testing", "Criteria Check"]
  },
  {
    id: "6",
    title: "War Room",
    icon: <ShieldAlert className="w-8 h-8" />,
    color: "red",
    steps: ["Deadlock Detection", "Multi-Agent Sync", "Auto-Remediation"]
  },
  {
    id: "7",
    title: "Delivery",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "emerald",
    steps: ["Security Audit", "Traceability Cert", "Prod Deployment"]
  }
];

function TunnelCard({ phase, index, scrollYProgress, total }: { phase: any, index: number, scrollYProgress: any, total: number }) {
  // Calculate the "time" window for this card
  // We want cards to be spaced out along the scroll timeline
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  
  // Z-position: Starts far away (negative), moves to 0 (active), then positive (behind camera)
  // We map the scroll progress to a Z value
  // When scroll is at 'start', Z should be far away (e.g., -1000)
  // When scroll is at 'end', Z should be past camera (e.g., 500)
  
  // We need a continuous Z value based on scroll
  // Let's say the whole tunnel is 2000px deep per item
  const z = useTransform(scrollYProgress, 
    [0, 1], 
    [index * -1000 + 500, (index * -1000) + (total * 1000) + 500] 
  );

  const opacity = useTransform(z, [-500, 0, 200], [0, 1, 0]);
  const scale = useTransform(z, [-1000, 0], [0.5, 1.2]);
  const blur = useTransform(z, [-1000, 0], [10, 0]);
  
  // Dynamic color map
  const colorMap: Record<string, string> = {
    blue: '59,130,246',
    purple: '168,85,247',
    cyan: '6,182,212',
    yellow: '234,179,8',
    orange: '249,115,22',
    green: '34,197,94',
    red: '239,68,68',
    emerald: '16,185,129'
  };
  const colorRGB = colorMap[phase.color];

  return (
    <motion.div
      style={{ 
        z,
        opacity,
        scale,
        filter: useMotionTemplate`blur(${blur}px)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
      }}
      className="w-[80vw] max-w-2xl aspect-video flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Holographic Card */}
      <div className={cn(
        "relative w-full h-full rounded-3xl border backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-8 text-center",
        `bg-${phase.color}-950/30 border-${phase.color}-500/30`
      )}>
        {/* Inner Glow */}
        <div className={`absolute inset-0 bg-gradient-to-b from-${phase.color}-500/10 to-transparent`} />
        
        {/* Floating Icon */}
        <div className={cn(
          "relative z-10 mb-6 p-6 rounded-full border shadow-[0_0_50px_rgba(0,0,0,0.5)]",
          `bg-${phase.color}-500/10 border-${phase.color}-500/50 text-${phase.color}-400`
        )}>
          {phase.icon}
          <div className={`absolute inset-0 rounded-full bg-${phase.color}-500/20 animate-ping`} />
        </div>

        {/* Title & ID */}
        <div className="relative z-10 mb-8">
          <div className="text-xs font-mono text-gray-400 mb-2 tracking-[0.2em]">PHASE_0{phase.id}</div>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {phase.title}
          </h3>
        </div>

        {/* Steps Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-4 w-full max-w-lg">
          {phase.steps.map((step: string, i: number) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-lg bg-black/40 border border-${phase.color}-500/20`}>
              <div className={`w-1.5 h-1.5 rounded-full bg-${phase.color}-500`} />
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* Decorative Corners */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-${phase.color}-500 rounded-tl-xl`} />
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-${phase.color}-500 rounded-tr-xl`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-${phase.color}-500 rounded-bl-xl`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-${phase.color}-500 rounded-br-xl`} />
      </div>
    </motion.div>
  );
}

export function DetailedWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="h-[500vh] bg-black relative">
      <div className="sticky top-0 h-screen overflow-hidden perspective-container" style={{ perspective: "1000px" }}>
        
        {/* Warp Speed Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="absolute inset-0 opacity-30">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom animate-grid-flow" />
        </div>

        {/* Header (Fades out) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute top-20 left-0 w-full text-center z-50 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-mono mb-6">
            <Terminal className="w-3 h-3" />
            PIPELINE_VIEWER_V1
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Workflow</span>
          </h2>
          <p className="text-gray-400">Scroll to traverse the production pipeline</p>
        </motion.div>

        {/* 3D Tunnel Container */}
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          {PHASES.map((phase, i) => (
            <TunnelCard 
              key={phase.id} 
              phase={phase} 
              index={i} 
              scrollYProgress={scrollYProgress}
              total={PHASES.length}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
