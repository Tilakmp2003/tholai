"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, AlertTriangle, Zap, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import "./ComparisonSection.css";

const comparisonData = [
  { feature: "Full Multi-Agent Team", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Project-wide Planning", tholai: true, devin: "partial", cursor: "partial", replit: false, others: false },
  { feature: "Runs in Isolated Cloud Sandboxes", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Executes Code Autonomously", tholai: true, devin: "limited", cursor: false, replit: "partial", others: false },
  { feature: "Self-Healing Builds", tholai: true, devin: "partial", cursor: false, replit: false, others: false },
  { feature: "Multi-step Task Graph", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Full CI-like testing + debugging", tholai: true, devin: "experimental", cursor: false, replit: false, others: false },
  { feature: "Git-Native PR Creation", tholai: true, devin: false, cursor: "partial", replit: false, others: false },
  { feature: "Human-in-the-loop Approvals", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Cost Controls / Budget Limits", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Builds Real Production Apps", tholai: true, devin: "sometimes", cursor: "assisted", replit: "mvp", others: "suggestions" },
  { feature: "Auto-Design (UI/UX wireframes)", tholai: true, devin: false, cursor: false, replit: false, others: false },
  { feature: "Team-Ready Outputs", tholai: true, devin: false, cursor: "partial", replit: false, others: false },
];

const StatusIcon = ({ status }: { status: boolean | string }) => {
  if (status === true) return (
    <motion.div 
      initial={{ scale: 0 }} 
      whileInView={{ scale: 1 }} 
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Check className="status-icon check" />
    </motion.div>
  );
  if (status === false) return <Minus className="status-icon cross" />;
  return <AlertTriangle className="status-icon partial" />;
};

const StatusText = ({ status }: { status: boolean | string }) => {
  if (status === true) return <span className="text-blue-400 font-bold tracking-wide">Yes</span>;
  if (status === false) return <span className="text-gray-800 font-mono text-xs">NO</span>;
  return <span className="text-yellow-500 font-mono text-xs uppercase">{status}</span>;
};

export function ComparisonSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="comparison-section">
      <div className="comparison-bg-glow" />
      
      <div className="comparison-container">
        
        {/* Header */}
        <div className="comparison-header">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>65+ engineering teams switched to Tholai</span>
          </motion.div>
          
          <h2 className="comparison-title">
            The future of software <br /> development, compared.
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Tholai replaces assistants with fully autonomous engineering teams. <br />
            Here’s how it stands against the best AI coding tools today.
          </p>
        </div>

        {/* Holographic Grid */}
        <div 
          className="comparison-grid-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredRow(null)}
          ref={gridRef}
          style={{
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          } as React.CSSProperties}
        >
          <div className="grid-spotlight" />
          
          <div className="comparison-table">
            {/* Header Row */}
            <div className="comp-cell header">Feature / Capability</div>
            <div className="comp-cell header tholai">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <span className="text-2xl">⚡️</span>
                </div>
                <span className="text-white font-bold tracking-wider">THOLAI</span>
              </div>
            </div>
            <div className="comp-cell header">Devin</div>
            <div className="comp-cell header">Cursor</div>
            <div className="comp-cell header">Replit</div>
            <div className="comp-cell header">GPT-o1</div>

            {/* Data Rows */}
            {comparisonData.map((row, idx) => {
              const isHovered = hoveredRow === idx;
              const isDimmed = hoveredRow !== null && !isHovered;
              
              return (
                <React.Fragment key={idx}>
                  <motion.div 
                    className={cn("comp-cell feature-name", isDimmed && "opacity-30 blur-[1px]")}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    {row.feature}
                  </motion.div>
                  
                  {/* Tholai */}
                  <motion.div 
                    className={cn("comp-cell tholai justify-center", isDimmed && "opacity-30 blur-[1px]")}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <StatusIcon status={row.tholai} />
                      <StatusText status={row.tholai} />
                    </div>
                  </motion.div>

                  {/* Competitors */}
                  <div 
                    className={cn("comp-cell justify-center flex-col gap-1", isDimmed && "opacity-30 blur-[1px]")}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    <StatusIcon status={row.devin} /><StatusText status={row.devin} />
                  </div>
                  <div 
                    className={cn("comp-cell justify-center flex-col gap-1", isDimmed && "opacity-30 blur-[1px]")}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    <StatusIcon status={row.cursor} /><StatusText status={row.cursor} />
                  </div>
                  <div 
                    className={cn("comp-cell justify-center flex-col gap-1", isDimmed && "opacity-30 blur-[1px]")}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    <StatusIcon status={row.replit} /><StatusText status={row.replit} />
                  </div>
                  <div 
                    className={cn("comp-cell justify-center flex-col gap-1", isDimmed && "opacity-30 blur-[1px]")}
                    onMouseEnter={() => setHoveredRow(idx)}
                  >
                    <StatusIcon status={row.others} /><StatusText status={row.others} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom Claim */}
        <div className="claim-section">
          <div className="claim-title-wrapper">
            <motion.div 
              className="claim-line"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Build apps.
            </motion.div>
            <motion.div 
              className="claim-line highlight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Ship features.
            </motion.div>
            <motion.div 
              className="claim-line gradient"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Fix <span className="glitch-text">bugs</span> instantly.
            </motion.div>
          </div>

          <motion.div 
            className="claim-quote-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="claim-quote-text">The Old Way</div>
            <div className="text-xl text-gray-500 mb-4">“Others give you an assistant.”</div>
            
            <div className="w-full h-px bg-white/10 my-2" />
            
            <div className="claim-quote-text text-blue-500">The Tholai Way</div>
            <div className="claim-quote-highlight">
              “Tholai gives you a <br />
              <span>full engineering team.</span>”
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
