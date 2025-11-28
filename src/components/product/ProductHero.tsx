"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Activity, Globe, Shield, Command, Network, Share2 } from "lucide-react";
import "./ProductPage.css";

export function ProductHero() {
  const [isBooting, setIsBooting] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center perspective-container"
      onMouseMove={handleMouseMove}
    >
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center font-mono text-green-500"
          >
            <div className="w-64">
              <Typewriter text={[
                "INITIALIZING_NEURAL_NET...",
                "LOADING_CONTEXT_VECTORS...",
                "ESTABLISHING_UPLINK...",
                "SYSTEM_READY"
              ]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background: Global Neural Network */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        
        {/* Floating Particles */}
        {!isBooting && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center">
        
        {/* Cinematic Typography (Layered Behind Core) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="text-blue-400 font-mono tracking-[1em] text-sm md:text-base mb-4 uppercase"
          >
            The Virtual
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 0.1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.8, duration: 1.5 }}
            className="text-[10vw] md:text-[12vw] font-black leading-none text-white text-center tracking-tighter"
          >
            SOFTWARE
            <br />
            COMPANY
          </motion.h1>
        </div>

        {/* The Artificial Brain (Centerpiece) */}
        <motion.div
          className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] preserve-3d z-10"
          style={{
            rotateX: -mousePos.y,
            rotateY: mousePos.x,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Core Sphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-black rounded-full border border-blue-500 shadow-[0_0_100px_rgba(59,130,246,0.6)] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
            <Cpu className="w-16 h-16 md:w-24 md:h-24 text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,1)]" />
          </div>

          {/* Spinning Data Rings */}
          {[
            { size: 300, color: "border-blue-500/30", speed: 20, tilt: 60 },
            { size: 450, color: "border-purple-500/30", speed: 25, tilt: -45 },
            { size: 600, color: "border-cyan-500/30", speed: 30, tilt: 30 },
          ].map((ring, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 preserve-3d"
              style={{
                width: `${ring.size}px`,
                height: `${ring.size}px`,
                transform: `translate(-50%, -50%) rotateX(${ring.tilt}deg)`,
              }}
            >
              <div 
                className={`w-full h-full rounded-full border ${ring.color}`}
                style={{
                  animation: `spin ${ring.speed}s linear infinite`
                }}
              >
                {/* Nodes on Ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
              </div>
            </div>
          ))}

          {/* Floating Satellites */}
          {[
            { icon: <Globe />, label: "NET", x: -180, y: -120, z: 50 },
            { icon: <Shield />, label: "SEC", x: 180, y: -120, z: 0 },
            { icon: <Activity />, label: "OPS", x: 0, y: 200, z: 100 },
            { icon: <Zap />, label: "PWR", x: -150, y: 100, z: -50 },
            { icon: <Network />, label: "LINK", x: 150, y: 100, z: -50 },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-12 h-12 bg-black/80 border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              style={{ x: node.x, y: node.y, z: node.z }}
              animate={{
                y: [node.y - 15, node.y + 15, node.y - 15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              <div className="text-white/80">{node.icon}</div>
              <div className="absolute -bottom-5 text-[8px] font-mono text-blue-400 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {node.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom HUD */}
        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-12 text-xs font-mono text-gray-500 uppercase tracking-widest z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Online
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" />
            Latency: 12ms
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="w-3 h-3" />
            Nodes: 1,024
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Helper for Boot Sequence Text
function Typewriter({ text }: { text: string[] }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentLine >= text.length) return;

    let charIndex = 0;
    const line = text[currentLine];
    
    const interval = setInterval(() => {
      if (charIndex <= line.length) {
        setCurrentText(line.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentText("");
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLine, text]);

  return (
    <div className="flex flex-col items-start gap-2">
      {text.slice(0, currentLine).map((line, i) => (
        <div key={i} className="opacity-50">{line}</div>
      ))}
      <div className="flex">
        {currentText}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
