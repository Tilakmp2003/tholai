"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Code, Terminal, Rocket, ArrowRight } from "lucide-react";
import "./ProductPage.css";

const steps = [
  {
    id: 1,
    title: "Plan",
    icon: <FileText className="w-6 h-6" />,
    desc: "PM Agents analyze requirements & create specs.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: 2,
    title: "Code",
    icon: <Code className="w-6 h-6" />,
    desc: "Dev Agents write code in isolated sandboxes.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    id: 3,
    title: "Verify",
    icon: <Terminal className="w-6 h-6" />,
    desc: "QA Agents run tests & security scans.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    id: 4,
    title: "Ship",
    icon: <Rocket className="w-6 h-6" />,
    desc: "Ops Agents handle deployment & release.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  }
];

export function ProcessPipeline() {
  return (
    <section className="product-section">
      <div className="product-container">
        <div className="text-center mb-20">
          <span className="product-label">The Pipeline</span>
          <h2 className="product-heading">Autonomous Workflow</h2>
          <p className="product-subheading mx-auto">
            From idea to production in minutes, not weeks.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-12 left-0 w-full h-0.5 bg-white/5 hidden md:block">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              viewport={{ once: true }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="industrial-card h-full flex flex-col items-center text-center group hover:border-white/20 transition-colors">
                  <div className={`w-24 h-24 rounded-full ${step.bg} ${step.border} border flex items-center justify-center mb-6 relative`}>
                    <div className={`absolute inset-0 rounded-full ${step.bg} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                    <div className={step.color}>{step.icon}</div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black border border-white/20 rounded-full flex items-center justify-center text-xs font-mono text-gray-400">
                      0{step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-6 text-gray-600">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
