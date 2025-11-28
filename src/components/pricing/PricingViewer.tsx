"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import {
  Check, X, HelpCircle, Zap, Shield,
  Cpu, Globe, Lock, Activity, DollarSign,
  Terminal, Scan, ChevronRight, Users,
  Code, Server, Database, Layout, GitBranch
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Shared High-Fidelity Components ---

function ScrambleText({ text, className, trigger = true }: { text: string, className?: string, trigger?: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{display}</span>;
}

function HolographicCard({ children, className, color = "blue" }: { children: React.ReactNode, className?: string, color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXPct = useTransform(x, (val) => `${val * 100}%`);
  const mouseYPct = useTransform(y, (val) => `${val * 100}%`);

  const colorMap: Record<string, string> = {
    blue: '59,130,246',
    purple: '168,85,247',
    cyan: '6,182,212',
    green: '34,197,94'
  };
  const rgb = colorMap[color] || '59,130,246';

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      className={cn(
        "relative rounded-3xl bg-black/40 border border-white/10 overflow-hidden group backdrop-blur-sm",
        className
      )}
      style={{
        boxShadow: `0 0 0 1px rgba(${rgb}, 0.1)`
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseXPct} ${mouseYPct}, rgba(${rgb}, 0.15), transparent 40%)`
        }}
      />
      <div className="relative z-10 p-8">{children}</div>
      
      {/* Corner Accents */}
      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-${color}-500/30 rounded-tl-xl opacity-50`} />
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-${color}-500/30 rounded-br-xl opacity-50`} />
    </motion.div>
  );
}

// --- New "Billion Dollar" Sections ---

function HolographicGlobe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden perspective-[1000px]">
      <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] preserve-3d animate-[spin_20s_linear_infinite]">
        {/* Core Sphere */}
        <div className="absolute inset-0 rounded-full border border-blue-500/20 shadow-[0_0_100px_rgba(59,130,246,0.2)]" />
        
        {/* Rotating Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-blue-400/10"
            style={{ rotateX: i * 60, rotateY: i * 45 }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            {/* Nodes on Rings */}
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
          </motion.div>
        ))}

        {/* Orbital Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x: 0, y: 0, z: 0 }}
            animate={{
              x: Math.cos(i) * 400,
              y: Math.sin(i) * 400,
              z: Math.sin(i * 2) * 200,
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
      
      {/* Central Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[200vh] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent blur-sm" />
    </div>
  );
}

function TacticalHUD() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Corners */}
      <div className="absolute top-8 left-8 w-32 h-32 border-t border-l border-blue-500/30 rounded-tl-3xl" />
      <div className="absolute top-8 right-8 w-32 h-32 border-t border-r border-blue-500/30 rounded-tr-3xl" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-blue-500/30 rounded-bl-3xl" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-blue-500/30 rounded-br-3xl" />

      {/* Data Streams */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden md:flex flex-col gap-4 text-[10px] font-mono text-blue-500/50">
        {["SYS_READY", "UPLINK_OK", "ENCRYPTION_ACTIVE", "NODES_SYNCED"].map((text, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 animate-pulse" />
            <ScrambleText text={text} />
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:flex flex-col gap-4 text-[10px] font-mono text-right text-blue-500/50">
        {["LATENCY: 1ms", "PACKET_LOSS: 0%", "CPU_LOAD: 12%", "MEMORY: 4TB"].map((text, i) => (
          <div key={i} className="flex items-center justify-end gap-2">
            <ScrambleText text={text} />
            <div className="w-1 h-1 bg-blue-500 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalCommandHero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <HolographicGlobe />
      <TacticalHUD />

      <div className="relative z-10 text-center max-w-6xl px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/50 border border-blue-500/30 text-blue-400 font-mono text-xs mb-12 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="tracking-[0.2em]">GLOBAL_CAPACITY: UNLIMITED</span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none mix-blend-difference">
          VIRTUAL <br />
          <span className="relative inline-block">
            <span className="absolute -inset-2 bg-blue-500/20 blur-xl" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-blue-500">
              DOMINION
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100/60 max-w-3xl mx-auto leading-relaxed mb-16 font-light tracking-wide">
          The age of hiring is over. The age of <span className="text-white font-semibold glow-text">instantiation</span> has begun.
          <br />Deploy a sovereign engineering workforce in seconds.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <button 
            onClick={() => document.getElementById('deploy-terminal')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm rounded-none overflow-hidden hover:scale-105 transition-transform clip-path-button"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity animate-gradient-x" />
            <span className="relative z-10 flex items-center gap-3">
              Initialize Protocol <ChevronRight className="w-4 h-4" />
            </span>
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" />
          </button>
          
          <button 
            onClick={() => document.getElementById('neural-squad')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-10 py-5 bg-transparent text-white border border-white/20 font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/5 transition-colors backdrop-blur-md relative overflow-hidden"
          >
            <span className="relative z-10">View Architecture</span>
            <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ManifestoTerminal() {
  const [activeLine, setActiveLine] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const lines = [
    { text: "ESTABLISHING SECURE UPLINK...", type: "system" },
    { text: "IDENTITY VERIFIED: ADMIN_OVERRIDE", type: "success" },
    { text: "ACCESSING CORE DIRECTIVE:", type: "header" },
    { text: "The old world relies on headcount.", type: "content" },
    { text: "The new world relies on compute.", type: "content" },
    { text: "We do not sell software.", type: "content" },
    { text: "We sell the *production* of software.", type: "highlight" },
    { text: "Autonomous. Governed. Infinite.", type: "highlight" },
    { text: "// TRANSMISSION COMPLETE", type: "system" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine(prev => (prev < lines.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="perspective-[2000px] py-32 relative z-20">
      <motion.div 
        style={{ rotateX, opacity }}
        className="max-w-5xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative group"
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none" />
        
        {/* Scanline Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="font-mono text-[10px] text-blue-400 tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3" />
              ENCRYPTED_CHANNEL_v9.2
            </div>
          </div>
          <div className="font-mono text-[10px] text-gray-600">
            LATENCY: 12ms
          </div>
        </div>

        {/* Content */}
        <div className="p-12 min-h-[500px] font-mono relative">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={{ 
                opacity: i <= activeLine ? 1 : 0, 
                x: i <= activeLine ? 0 : -20,
                filter: i <= activeLine ? "blur(0px)" : "blur(10px)"
              }}
              className={cn(
                "mb-6 text-lg md:text-2xl tracking-tight",
                line.type === "system" && "text-gray-600 text-sm",
                line.type === "success" && "text-green-400 text-sm",
                line.type === "header" && "text-blue-400 mt-8 mb-4",
                line.type === "content" && "text-gray-300 pl-4 border-l-2 border-white/10",
                line.type === "highlight" && "text-white pl-4 border-l-2 border-blue-500 font-bold glow-text",
              )}
            >
              <ScrambleText text={line.text} trigger={i <= activeLine} />
            </motion.div>
          ))}
          
          {/* Blinking Cursor */}
          {activeLine < lines.length && (
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="w-4 h-8 bg-blue-500 mt-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
             />
          )}
        </div>
        
        {/* Footer Status */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/50 flex justify-between items-center text-[10px] font-mono text-gray-600">
          <div>ID: 8492-ALPHA</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            STREAMING
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NeuralSquadVisualizer() {
  const roles = [
    { id: "PM", icon: <Layout />, label: "Product Manager", color: "purple" },
    { id: "ARCH", icon: <GitBranch />, label: "Systems Architect", color: "blue" },
    { id: "DEV", icon: <Code />, label: "Senior Developer", color: "cyan" },
    { id: "QA", icon: <Shield />, label: "QA Engineer", color: "green" }
  ];

  return (
    <div id="neural-squad" className="my-32 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">THE NEURAL SQUAD</h2>
        <p className="text-gray-400">A fully connected, autonomous unit. Not just a chatbot.</p>
      </div>

      <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center">
        {/* Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
          {/* Central Hub Connections */}
          <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" />
        </svg>

        {/* Central Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
          <div className="text-center">
            <Cpu className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
            <div className="text-[10px] font-mono text-blue-400">ORCHESTRATOR</div>
          </div>
        </div>

        {/* Roles */}
        {roles.map((role, i) => {
          const positions = [
            "top-0 left-0 md:top-10 md:left-20",
            "top-0 right-0 md:top-10 md:right-20",
            "bottom-0 left-0 md:bottom-10 md:left-20",
            "bottom-0 right-0 md:bottom-10 md:right-20"
          ];
          
          return (
            <motion.div
              key={i}
              className={cn(
                "absolute p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl w-48 hover:scale-110 transition-transform cursor-pointer group",
                positions[i]
              )}
              whileHover={{ borderColor: `var(--${role.color}-500)` }}
            >
              <div className={`w-10 h-10 rounded-lg bg-${role.color}-500/20 flex items-center justify-center mb-3 text-${role.color}-400`}>
                {role.icon}
              </div>
              <div className="font-bold text-white text-sm mb-1">{role.label}</div>
              <div className="text-[10px] font-mono text-gray-500">L{3-i} AGENT</div>
              
              <div className={`absolute inset-0 bg-${role.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FinancialSimulation() {
  const [engineers, setEngineers] = useState(10);
  const humanCost = engineers * 150000;
  const aiCost = humanCost * 0.01;
  
  return (
    <div className="my-32 bg-white/5 border-y border-white/5 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-6">
              <ScrambleText text="FINANCIAL SIMULATION ENGINE" />
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Run the numbers. See the surplus. The transition to virtual labor isn't just about speed—it's about 
              <span className="text-white font-bold"> capital efficiency</span>.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-mono text-gray-500 mb-2">
                  <span>WORKFORCE_UNITS</span>
                  <span className="text-white">{engineers}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={engineers} 
                  onChange={(e) => setEngineers(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">TRADITIONAL COST</div>
                  <div className="text-xl font-mono text-red-400">${(humanCost / 1000000).toFixed(2)}M</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="text-xs text-blue-400 mb-1">VIRTUAL COST</div>
                  <div className="text-xl font-mono text-blue-300">${(aiCost / 1000).toFixed(0)}k</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[300px] relative flex items-end gap-2 p-8 border-l border-b border-white/10">
            {/* Simulated Graph */}
            {[...Array(12)].map((_, i) => {
              const height = 20 + Math.random() * 60;
              return (
                <motion.div
                  key={i}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/50 transition-colors relative group"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {height.toFixed(0)}%
                  </div>
                </motion.div>
              );
            })}
            <div className="absolute top-4 right-4 text-xs font-mono text-green-500 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              EFFICIENCY_DELTA: +9,900%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemStatusTicker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-md border-t border-white/5 py-2 z-50 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-widest text-gray-500">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE</span>
            <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-blue-500" /> AGENTS_ACTIVE: 8,492</span>
            <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-purple-500" /> NODES: 142</span>
            <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" /> LATENCY: 12ms</span>
            <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-red-500" /> THREATS_BLOCKED: 942</span>
            <span className="flex items-center gap-2 text-blue-400"> // JOIN_THE_REVOLUTION // </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingViewer() {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-blue-500/30 relative overflow-x-hidden pb-20">
      <SystemStatusTicker />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)] pointer-events-none z-0" />

      <GlobalCommandHero />
      <ManifestoTerminal />
      <NeuralSquadVisualizer />
      <FinancialSimulation />

      {/* Final CTA */}
      <div id="deploy-terminal" className="container mx-auto px-4 text-center mb-32">
        <HolographicCard className="max-w-2xl mx-auto py-16 bg-gradient-to-b from-blue-900/10 to-black">
          <h2 className="text-3xl font-bold text-white mb-6">READY TO DEPLOY?</h2>
          <p className="text-gray-400 mb-8">
            The queue is processing. Secure your position in the new economy.
          </p>
          <Link href="/request-invite">
            <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-blue-50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Join Waitlist
            </button>
          </Link>
        </HolographicCard>
      </div>
    </div>
  );
}
