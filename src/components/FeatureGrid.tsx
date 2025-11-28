"use client";

import { motion } from "framer-motion";
import { Brain, Code2, ShieldCheck, Zap, Layers, GitBranch } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Multi-Role Agents",
    description: "Specialized agents for Architecture, Design, Development, and QA working in concert.",
  },
  {
    icon: <Layers className="w-6 h-6 text-accent" />,
    title: "Isolated Sandboxes",
    description: "Every task runs in a secure, ephemeral Docker container. No pollution of your local env.",
  },
  {
    icon: <GitBranch className="w-6 h-6 text-blue-400" />,
    title: "Git Integration",
    description: "Auto-branching, commit generation, and PR creation. Agents work like real devs.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Human-in-the-Loop",
    description: "Approval gates for critical actions. You maintain full control over the output.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    title: "Self-Healing Code",
    description: "Agents analyze errors, read docs, and patch their own code until tests pass.",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Cost Controls",
    description: "Set strict budget limits per task or project. No surprise API bills.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to <br />
            <span className="text-primary">ship software autonomously.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tholai replaces the friction of manual coding with an intelligent, automated pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
