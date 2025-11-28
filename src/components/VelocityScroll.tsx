"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, ShieldCheck, Code, Command, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import "./VelocityScroll.css";

// --- Visuals (Simplified for Industrial Look) ---

const AgentsVisual = ({ isActive }: { isActive: boolean }) => {
  const [randomIndices, setRandomIndices] = React.useState<number[]>([]);

  React.useEffect(() => {
    // Generate random indices only on the client
    const indices = Array.from({ length: 36 })
      .map((_, i) => (Math.random() > 0.8 ? i : -1))
      .filter((i) => i !== -1);
    setRandomIndices(indices);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
        {Array.from({ length: 36 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "border border-white/10", 
              isActive && randomIndices.includes(i) && "bg-blue-500/50"
            )} 
          />
        ))}
      </div>
      <motion.div 
        animate={{ rotate: isActive ? 360 : 0 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="relative z-10 w-48 h-48 border border-dashed border-white/20 rounded-full flex items-center justify-center"
      >
        <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
        <Brain className={cn("w-12 h-12", isActive ? "text-blue-500" : "text-gray-700")} />
      </motion.div>
    </div>
  );
};

const RuntimeVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full p-8 font-mono text-xs text-green-500/80 flex flex-col justify-end">
    <div className="border-l-2 border-green-900/50 pl-4 space-y-2">
      <div className="opacity-50">$ init_sequence --force</div>
      <div className="opacity-70">&gt;&gt; optimizing runtime...</div>
      <div className={cn("opacity-100", isActive && "animate-pulse")}>
        {isActive ? ">> SYSTEM_READY [OK]" : ">> WAITING..."}
      </div>
    </div>
  </div>
);

const SecurityVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className={cn("w-32 h-32 border-2 flex items-center justify-center transition-all duration-500", isActive ? "border-white rotate-45" : "border-white/10")}>
      <div className={cn("w-24 h-24 border flex items-center justify-center transition-all duration-500", isActive ? "border-white -rotate-90" : "border-white/10")}>
        <ShieldCheck className={cn("w-8 h-8", isActive ? "text-white" : "text-gray-800")} />
      </div>
    </div>
  </div>
);

// --- Sticky Card ---

// --- Sticky Card ---

// --- Scroll Reveal Card ---

const ScrollRevealCard = ({ card, index, setActiveIndex }: { card: any; index: number; setActiveIndex: (idx: number) => void }) => {
  return (
    <motion.div
      className="velocity-card-wrapper"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: [0.2, 0.65, 0.3, 0.9] // Premium easing
        } 
      }}
      viewport={{ once: false, margin: "-20%" }}
      onViewportEnter={() => setActiveIndex(index)}
    >
      <div className="velocity-card active"> {/* Always active for visual style */}
        <div className="card-header">
          <div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.description}</p>
          </div>
          <div className="card-tag">{card.tag}</div>
        </div>
        <div className="card-visual">
          {React.cloneElement(card.visual as React.ReactElement<any>, { isActive: true })}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

const features = [
  {
    title: "Autonomous Squads",
    description: "Full team of AI agents planning and coding in parallel.",
    visual: <AgentsVisual isActive={false} />,
    tag: "ORCHESTRATION_LAYER"
  },
  {
    title: "Live Runtime",
    description: "Real-time terminal streaming and execution environment.",
    visual: <RuntimeVisual isActive={false} />,
    tag: "EXECUTION_ENGINE"
  },
  {
    title: "Self-Healing",
    description: "Automatic error detection, stack trace analysis, and patching.",
    visual: <SecurityVisual isActive={false} />,
    tag: "SECURITY_PROTOCOL"
  },
];

export function VelocityScroll() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="velocity-section">
      <div className="velocity-grid" />
      
      <div className="velocity-container">
        <div className="velocity-layout">
          
          {/* Left Column: Command Center (Sticky) */}
          <div className="velocity-header">
            <div className="velocity-badge">
              <span>System Status: Online</span>
            </div>
            
            <h2 className="velocity-title">
              Velocity<span className="dot">.</span>
            </h2>
            
            <p className="velocity-description">
              The engine that powers the next generation of software development. Built for speed, scale, and autonomy.
            </p>

            <div className="velocity-timeline">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className={cn("velocity-timeline-item", activeIndex === idx && "active")}
                  onClick={() => {
                    const cards = document.querySelectorAll('.velocity-card-wrapper');
                    if (cards[idx]) {
                      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <span className="velocity-timeline-text">{feature.title}</span>
                  <span className="velocity-timeline-number">0{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Scrolling Cards */}
          <div className="velocity-cards">
            {features.map((feature, index) => (
              <ScrollRevealCard 
                key={index} 
                card={feature} 
                index={index} 
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

