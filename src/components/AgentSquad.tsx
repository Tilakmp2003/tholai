"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, PenTool, Terminal, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "pm",
    role: "Product Manager",
    name: "Atlas",
    icon: User,
    description: "Transforms vague ideas into detailed technical specifications. Handles user stories and acceptance criteria.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "arch",
    role: "Architect",
    name: "Vega",
    icon: PenTool,
    description: "Designs scalable systems, chooses the right tech stack, and ensures best practices in code structure.",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "dev",
    role: "Senior Dev",
    name: "Neo",
    icon: Terminal,
    description: "Writes clean, efficient, and type-safe code. Implements features and fixes bugs at lightning speed.",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "qa",
    role: "QA Engineer",
    name: "Trinity",
    icon: Shield,
    description: "Writes comprehensive test suites, performs regression testing, and ensures zero-bug releases.",
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export function AgentSquad() {
  const [activeId, setActiveId] = useState<string | null>("dev");

  return (
    <section className="py-32 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Meet Your <span className="text-primary">Dream Team</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Expert AI agents dedicated to every stage of your software lifecycle.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px] max-w-6xl mx-auto">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            layout
            onClick={() => setActiveId(agent.id)}
            onHoverStart={() => setActiveId(agent.id)}
            className={cn(
              "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out",
              activeId === agent.id ? "flex-[3]" : "flex-[1] opacity-50 hover:opacity-80"
            )}
          >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", agent.gradient)} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg",
                agent.color
              )}>
                <agent.icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{agent.role}</h3>
              <div className="text-sm font-mono text-gray-400 mb-4">Code Name: {agent.name}</div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: activeId === agent.id ? 1 : 0,
                  height: activeId === agent.id ? "auto" : 0
                }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 leading-relaxed">
                  {agent.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
