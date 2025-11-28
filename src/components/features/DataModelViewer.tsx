"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Database, FileJson, ArrowRight, Terminal, Cpu, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Definitions ---

const DB_ROWS = [
  { id: "agents", label: "TABLE agents", color: "blue" },
  { id: "agent_id", label: "  agent_id: UUID PK", color: "blue" },
  { id: "role", label: "  role: ENUM (CEO, Dev)", color: "blue" },
  { id: "tasks", label: "TABLE tasks", color: "purple" },
  { id: "task_id", label: "  task_id: UUID PK", color: "purple" },
  { id: "context", label: "  context: JSONB", color: "purple" },
];

const JSON_ROWS = [
  { id: "packet", label: "{", color: "gray" },
  { id: "packet_id", label: '  "packet_id": "ctx_892"', color: "purple" },
  { id: "role_json", label: '  "role": "SeniorDev"', color: "blue" },
  { id: "task_def", label: '  "task": "Refactor API"', color: "purple" },
  { id: "close", label: "}", color: "gray" },
];

// Map connections: DB Row ID -> JSON Row ID
const CONNECTIONS: Record<string, string> = {
  "agent_id": "role_json",
  "role": "role_json",
  "task_id": "packet_id",
  "context": "packet",
  "tasks": "task_def"
};

function CodeLine({ 
  text, 
  color, 
  isActive, 
  onHover 
}: { 
  text: string, 
  color: string, 
  isActive: boolean, 
  onHover: () => void 
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      animate={{ 
        x: isActive ? 10 : 0,
        backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)"
      }}
      className={cn(
        "font-mono text-sm py-1 px-2 rounded cursor-pointer transition-colors duration-200",
        isActive ? `text-${color}-400 font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]` : "text-gray-500 hover:text-gray-300"
      )}
    >
      {text}
    </motion.div>
  );
}

export function DataModelViewer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent) {
    const { width, height, left, top } = containerRef.current?.getBoundingClientRect() ?? { width: 0, height: 0, left: 0, top: 0 };
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#050505] relative overflow-hidden perspective-container"
      style={{ perspective: "1000px" }}
    >
      {/* Background Circuitry */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-6"
          >
            <Share2 className="w-3 h-3" />
            NEURAL DATA LINK
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Data-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Architecture</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just "chat" with AI. We operate on structured <span className="text-purple-400 font-mono">ContextPackets</span> and rigorous <span className="text-blue-400 font-mono">Database Schemas</span>.
          </p>
        </div>

        {/* 3D Interactive Viewer */}
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
        >
          {/* Connection Lines Layer (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {activeId && CONNECTIONS[activeId] && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d="M 400 150 C 500 150, 500 150, 600 150" // Placeholder, real coords would need refs
                className="stroke-[3px] stroke-purple-500 fill-none drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              />
            )}
            {/* Static decorative lines */}
            <path d="M 45% 30% C 50% 30%, 50% 40%, 55% 40%" className="stroke-white/5 fill-none stroke-1 dashed" />
            <path d="M 45% 60% C 50% 60%, 50% 50%, 55% 50%" className="stroke-white/5 fill-none stroke-1 dashed" />
          </svg>

          {/* Left Panel: Database */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
            <div className="relative bg-[#0b0c0d] rounded-xl border border-blue-500/20 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Database className="w-5 h-5" />
                  <span className="font-bold font-mono text-sm">PostgreSQL Schema</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
              </div>
              <div className="space-y-1">
                {DB_ROWS.map((row) => (
                  <CodeLine
                    key={row.id}
                    text={row.label}
                    color={row.color}
                    isActive={activeId === row.id}
                    onHover={() => setActiveId(row.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Connector (Mobile Only) */}
          <div className="md:hidden flex justify-center text-gray-600">
            <ArrowRight className="w-6 h-6 rotate-90" />
          </div>

          {/* Right Panel: JSON */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
            <div className="relative bg-[#0b0c0d] rounded-xl border border-purple-500/20 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <FileJson className="w-5 h-5" />
                  <span className="font-bold font-mono text-sm">Context Packet</span>
                </div>
                <div className="text-xs font-mono text-gray-500">JSON-LD</div>
              </div>
              <div className="space-y-1">
                {JSON_ROWS.map((row) => {
                  // Check if this row is the target of the active DB row
                  const isTarget = activeId && CONNECTIONS[activeId] === row.id;
                  return (
                    <CodeLine
                      key={row.id}
                      text={row.label}
                      color={row.color}
                      isActive={!!isTarget}
                      onHover={() => {}}
                    />
                  );
                })}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
