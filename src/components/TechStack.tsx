"use client";

import { motion } from "framer-motion";
import { 
  Code2, Database, Globe, Server, Cpu, Cloud, 
  Layers, Box, Terminal, Command 
} from "lucide-react";

const techs = [
  { icon: Code2, name: "React", x: -20, y: -10, delay: 0 },
  { icon: Database, name: "Postgres", x: 20, y: -20, delay: 1 },
  { icon: Globe, name: "Next.js", x: -30, y: 20, delay: 2 },
  { icon: Server, name: "Node.js", x: 30, y: 10, delay: 3 },
  { icon: Cpu, name: "Python", x: 0, y: -30, delay: 1.5 },
  { icon: Cloud, name: "AWS", x: 10, y: 30, delay: 2.5 },
  { icon: Layers, name: "Docker", x: -40, y: 0, delay: 0.5 },
  { icon: Box, name: "Redis", x: 40, y: -10, delay: 3.5 },
  { icon: Terminal, name: "Bash", x: -10, y: 40, delay: 1.2 },
  { icon: Command, name: "Git", x: 20, y: 20, delay: 2.8 },
];

export function TechStack() {
  return (
    <section className="py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Works With Your <span className="text-primary">Stack</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-20">
          Tholai integrates seamlessly with modern tools and frameworks.
        </p>

        <div className="relative h-[400px] w-full max-w-4xl mx-auto">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [0, tech.x, 0], 
                y: [0, tech.y, 0] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: tech.delay 
              }}
              style={{
                marginLeft: `${(i % 5 - 2) * 150}px`, // Spread horizontally
                marginTop: `${(Math.floor(i / 5) - 0.5) * 150}px`, // Spread vertically
              }}
            >
              <div className="group relative flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <tech.icon className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium text-white bg-black/80 px-3 py-1 rounded-full border border-white/10">
                  {tech.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
}
