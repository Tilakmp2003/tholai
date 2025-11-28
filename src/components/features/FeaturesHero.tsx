"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Cpu, Network, Shield, Zap, Globe, Database, Scan, Activity, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ScrambleText({ text, className }: { text: string, className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}

function ObsidianCard({ item }: { item: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const mouseXPct = useTransform(x, (val) => `${val * 100}%`);
  const mouseYPct = useTransform(y, (val) => `${val * 100}%`);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  // Dynamic color selection based on item.color
  const colorMap: Record<string, string> = {
    blue: '59,130,246',
    purple: '168,85,247',
    cyan: '6,182,212',
    yellow: '234,179,8',
    red: '239,68,68',
    green: '34,197,94'
  };
  const colorRGB = colorMap[item.color] || '59,130,246';

  // Use useMotionTemplate for performant style updates without React renders
  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseXPct} ${mouseYPct}, rgba(255,255,255,0.06), transparent 40%)`;
  const borderBg = useMotionTemplate`radial-gradient(400px circle at ${mouseXPct} ${mouseYPct}, rgba(${colorRGB}, 0.3), transparent 40%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full min-h-[300px] rounded-3xl bg-[#0a0a0a] border border-white/5 p-8 group transition-all duration-500 ease-out will-change-transform"
    >
      {/* Spotlight Effect - Optimized */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Border Beam - Optimized */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: borderBg,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full transform-style-3d">
        {/* Floating Icon */}
        <motion.div 
          style={{ z: 50 }}
          className={`mb-8 p-4 rounded-2xl bg-white/5 w-fit text-${item.color}-400 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(${colorRGB},0.3)] transition-all duration-500`}
        >
          {item.icon}
        </motion.div>

        <motion.h3 
          style={{ z: 30 }}
          className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300"
        >
          {item.title}
        </motion.h3>

        <motion.p 
          style={{ z: 20 }}
          className="text-gray-500 group-hover:text-gray-300 leading-relaxed max-w-[90%] transition-colors duration-300"
        >
          {item.desc}
        </motion.p>

        {/* Bottom Status Tech */}
        <div className="mt-auto pt-8 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-400">
            <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500 animate-pulse`} />
            System_Ready
          </div>
          <div className="text-[10px] font-mono text-gray-600">
            ID: {Math.floor(Math.random() * 9000) + 1000}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { width, height, left, top } = containerRef.current?.getBoundingClientRect() ?? { width: 0, height: 0, left: 0, top: 0 };
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] pt-40 perspective-container"
      style={{ perspective: "1000px" }}
    >
      {/* Dynamic 3D Grid Background */}
      <motion.div 
        style={{ rotateX, rotateY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)] opacity-50" />
        {/* Moving Data Streams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-marquee" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-marquee animation-delay-2000" />
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-pulse animation-delay-1000" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-24 relative">
            {/* Floating Holographic Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 left-10 md:left-20 opacity-20"
            >
              <Cpu className="w-24 h-24 text-blue-500" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-10 md:right-20 opacity-20"
            >
              <Network className="w-32 h-32 text-purple-500" />
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-950/50 border border-blue-500/50 text-blue-400 font-mono text-xs tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <Terminal className="w-3 h-3 text-blue-400" />
              <span className="text-blue-300 font-bold">ROOT_ACCESS_GRANTED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-green-400 font-bold shadow-green-500/50 drop-shadow-sm">SYSTEM_ACTIVE</span>
            </motion.div>

            {/* Main Title with Scramble Effect */}
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
              <div className="text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <ScrambleText text="THE VIRTUAL" />
              </div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 animate-gradient-x drop-shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                <ScrambleText text="SOFTWARE COMPANY" />
              </div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Autonomous. Hierarchical. <span className="text-white font-medium">Limitless.</span><br/>
              The first AI workforce that operates with the precision of a Fortune 500 firm.
            </p>
          </div>

          {/* Interactive Magnetic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {[
              {
                icon: <Network className="w-8 h-8" />,
                title: "Neural Hierarchy",
                desc: "Strict chain of command. No hallucinations.",
                color: "blue"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Context Packets",
                desc: "JSON-structured cognition. Zero ambiguity.",
                color: "purple"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Ironclad Governance",
                desc: "Real-time audit trails & cost controls.",
                color: "cyan"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Ephemeral Runtimes",
                desc: "Serverless agents. Infinite scalability.",
                color: "yellow"
              },
              {
                icon: <Scan className="w-8 h-8" />,
                title: "Forensic Traceability",
                desc: "Every thought logged. Every action tracked.",
                color: "red"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Human-in-the-Loop",
                desc: "AI does the heavy lifting. You steer the ship.",
                color: "green"
              }
            ].map((item, i) => (
              <ObsidianCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
