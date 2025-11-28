"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Code2, TestTube, Rocket, Check, AlertCircle, Terminal, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Plan",
    description: "Product Manager Agent analyzes requirements and writes specs.",
    icon: ClipboardList,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    simulation: "kanban",
  },
  {
    id: 2,
    title: "Code",
    description: "Architect & Dev Agents design systems and write clean code.",
    icon: Code2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    simulation: "code",
  },
  {
    id: 3,
    title: "Verify",
    description: "QA Agent runs test suites and auto-fixes regressions.",
    icon: TestTube,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    simulation: "test",
  },
  {
    id: 4,
    title: "Ship",
    description: "Release Agent deploys to production with zero downtime.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    simulation: "deploy",
  },
];

function KanbanSimulation() {
  return (
    <div className="w-full h-full bg-[#0b0c0d] p-4 rounded-lg border border-white/5 flex gap-3 overflow-hidden">
      {["To Do", "In Progress", "Done"].map((col, i) => (
        <div key={col} className="flex-1 bg-white/5 rounded-md p-2 flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{col}</div>
          {i === 0 && (
            <motion.div 
              className="h-12 bg-blue-500/20 border border-blue-500/30 rounded flex items-center px-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              <div className="w-full h-2 bg-blue-500/40 rounded-full" />
            </motion.div>
          )}
          {i === 1 && (
            <motion.div 
              className="h-12 bg-purple-500/20 border border-purple-500/30 rounded flex items-center px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [10, 0, 0] }}
              transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
            >
              <div className="w-full h-2 bg-purple-500/40 rounded-full" />
            </motion.div>
          )}
          {i === 2 && (
            <motion.div 
              className="h-12 bg-green-500/20 border border-green-500/30 rounded flex items-center px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 4.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <div className="w-full h-2 bg-green-500/40 rounded-full" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

function CodeSimulation() {
  return (
    <div className="w-full h-full bg-[#0b0c0d] p-4 rounded-lg border border-white/5 font-mono text-xs overflow-hidden">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
      </div>
      <div className="space-y-1">
        <div className="text-purple-400">function <span className="text-blue-400">generateAPI</span>() {"{"}</div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
          className="overflow-hidden whitespace-nowrap pl-4 text-gray-300"
        >
          const data = await db.fetch();
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 2, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
          className="overflow-hidden whitespace-nowrap pl-4 text-gray-300"
        >
          return process(data);
        </motion.div>
        <div className="text-purple-400">{"}"}</div>
      </div>
    </div>
  );
}

function TestSimulation() {
  return (
    <div className="w-full h-full bg-[#0b0c0d] p-4 rounded-lg border border-white/5 font-mono text-xs flex flex-col gap-2">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-gray-500">Test Suite</span>
        <span className="text-green-400 text-[10px]">Running...</span>
      </div>
      {[1, 2, 3].map((i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8, repeat: Infinity, repeatDelay: 3 }}
          className="flex items-center gap-2"
        >
          <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-500" />
          </div>
          <span className="text-gray-300">Test Case #{i} passed</span>
        </motion.div>
      ))}
    </div>
  );
}

function DeploySimulation() {
  return (
    <div className="w-full h-full bg-[#0b0c0d] p-4 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
      {/* World Map Background Hint */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-green-400" />
          </div>
          <motion.div 
            className="absolute inset-0 rounded-full border border-green-500"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="text-center">
          <div className="text-green-400 font-bold text-sm">Deployed</div>
          <div className="text-gray-500 text-xs">US-East-1 • v2.4.0</div>
        </div>
      </div>
    </div>
  );
}

export function PipelinePremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Neural Pipeline</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch your idea transform into production code through our autonomous assembly line.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Neural Spine */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary -translate-x-1/2 origin-top shadow-[0_0_20px_rgba(22,199,132,0.5)]"
            style={{ scaleY }}
          />

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "flex items-center gap-8 md:gap-20",
                    "flex-col md:flex-row",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Content Side */}
                  <div className={cn(
                    "flex-1 pl-12 md:pl-0",
                    isEven ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-4 text-gray-400",
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    )}>
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Step 0{step.id}
                    </div>
                    <h3 className={cn("text-4xl font-bold mb-4", step.color)}>{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#060608] border-4 border-[#0b0c0d] z-10">
                    <div className={cn("w-3 h-3 rounded-full", step.bg.replace('/10', ''))} />
                  </div>

                  {/* Simulation Card */}
                  <div className="flex-1 w-full pl-12 md:pl-0">
                    <div className="relative group">
                      <div className={cn(
                        "absolute -inset-1 bg-gradient-to-r opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40",
                        step.color.includes("blue") ? "from-blue-500 to-cyan-500" :
                        step.color.includes("purple") ? "from-purple-500 to-pink-500" :
                        step.color.includes("yellow") ? "from-yellow-500 to-orange-500" :
                        "from-green-500 to-emerald-500"
                      )} />
                      <div className="relative h-48 bg-[#0b0c0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 overflow-hidden shadow-2xl">
                        {step.simulation === "kanban" && <KanbanSimulation />}
                        {step.simulation === "code" && <CodeSimulation />}
                        {step.simulation === "test" && <TestSimulation />}
                        {step.simulation === "deploy" && <DeploySimulation />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
