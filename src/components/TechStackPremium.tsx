"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Code2, Database, Globe, Server, Cpu, Cloud, 
  Layout, Box, Terminal, Zap, GitBranch,
  Workflow, Container, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Tools" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI & Data" },
];

const tools = [
  { id: "react", name: "React", icon: Code2, category: "frontend", ring: 1, startAngle: 0 },
  { id: "next", name: "Next.js", icon: Globe, category: "frontend", ring: 1, startAngle: 120 },
  { id: "tailwind", name: "Tailwind", icon: Layout, category: "frontend", ring: 1, startAngle: 240 },
  
  { id: "node", name: "Node.js", icon: Server, category: "backend", ring: 2, startAngle: 45 },
  { id: "postgres", name: "Postgres", icon: Database, category: "backend", ring: 2, startAngle: 135 },
  { id: "redis", name: "Redis", icon: Box, category: "backend", ring: 2, startAngle: 225 },
  { id: "python", name: "Python", icon: Cpu, category: "backend", ring: 2, startAngle: 315 },
  
  { id: "docker", name: "Docker", icon: Container, category: "devops", ring: 3, startAngle: 90 },
  { id: "aws", name: "AWS", icon: Cloud, category: "devops", ring: 3, startAngle: 210 },
  { id: "git", name: "Git", icon: GitBranch, category: "devops", ring: 3, startAngle: 330 },
  
  { id: "openai", name: "OpenAI", icon: Brain, category: "ai", ring: 2, startAngle: 0 },
  { id: "tensorflow", name: "TensorFlow", icon: Workflow, category: "ai", ring: 3, startAngle: 180 },
];

export function TechStackPremium() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const filteredTools = activeCategory === "all" 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <section className="py-32 overflow-hidden relative min-h-[900px] flex flex-col items-center">
      <div className="container mx-auto px-4 text-center relative z-10 mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ecosystem <span className="text-primary">Orbit</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Seamlessly integrated with the tools you already use.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === cat.id
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(22,199,132,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orbit Visualization */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center -mt-32 scale-[0.45] md:scale-100 origin-center">
        {/* Central Core */}
        <div className="absolute z-20 w-24 h-24 rounded-full bg-black border border-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(22,199,132,0.3)]">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20" />
          <Zap className="w-10 h-10 text-primary animate-pulse" />
        </div>

        {/* Orbital Rings */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-white/5"
            style={{
              width: ring * 240 + "px",
              height: ring * 240 + "px",
            }}
          />
        ))}

        {/* Tools */}
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Rotating Container */}
              <motion.div
                className="absolute w-full h-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 40 + tool.ring * 10, 
                  repeat: Infinity, 
                  ease: "linear",
                }}
                style={{ 
                  // Start at specific angle
                  rotate: tool.startAngle 
                }}
              >
                {/* Position on Ring */}
                <div 
                  className="absolute pointer-events-auto"
                  style={{ 
                    transform: `translateX(${tool.ring * 120}px)` 
                  }}
                >
                  {/* Counter-Rotate Icon */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 40 + tool.ring * 10, 
                      repeat: Infinity, 
                      ease: "linear",
                    }}
                    style={{ 
                      rotate: -tool.startAngle 
                    }}
                  >
                    <div 
                      className="group relative flex flex-col items-center justify-center"
                      onMouseEnter={() => setHoveredTool(tool.id)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all duration-300",
                        hoveredTool === tool.id 
                          ? "bg-primary/20 border-primary scale-125 shadow-[0_0_20px_rgba(22,199,132,0.5)] z-50" 
                          : "bg-[#0b0c0d]/80 border-white/10 hover:border-primary/50"
                      )}>
                        <tool.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredTool === tool.id ? "text-primary" : "text-gray-400"
                        )} />
                      </div>
                      
                      {/* Tooltip */}
                      <div className={cn(
                        "absolute -bottom-8 px-2 py-1 rounded bg-black/90 border border-white/10 text-xs font-medium text-white whitespace-nowrap transition-opacity duration-200",
                        hoveredTool === tool.id ? "opacity-100" : "opacity-0"
                      )}>
                        {tool.name}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Scanning Radar Effect */}
        <div className="absolute inset-0 rounded-full border border-primary/5 animate-[spin_10s_linear_infinite] pointer-events-none">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-transparent via-primary/5 to-transparent blur-xl origin-bottom-right" />
        </div>
      </div>
    </section>
  );
}
