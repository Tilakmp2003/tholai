"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Code2, TestTube, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Plan",
    description: "Product Manager Agent analyzes requirements and writes specs.",
    icon: ClipboardList,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: 2,
    title: "Code",
    description: "Architect & Dev Agents design systems and write clean code.",
    icon: Code2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    id: 3,
    title: "Verify",
    description: "QA Agent runs test suites and auto-fixes regressions.",
    icon: TestTube,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    id: 4,
    title: "Ship",
    description: "Release Agent deploys to production with zero downtime.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

export function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-primary">Autonomous</span> Pipeline
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From idea to production in minutes, not weeks. Watch the agents work.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 hidden md:block" />
          
          {/* Animated Beam */}
          <motion.div 
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-accent to-primary -translate-x-1/2 hidden md:block origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex items-center gap-8 md:gap-16 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Content Side */}
                  <div className={`flex-1 text-center ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <h3 className={`text-3xl font-bold mb-4 ${step.color}`}>{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-16 h-16 rounded-full ${step.bg} ${step.border} border-2 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    {/* Pulse Effect */}
                    <div className={`absolute inset-0 rounded-full ${step.bg} animate-ping opacity-20`} />
                  </div>

                  {/* Empty Side for Balance */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
