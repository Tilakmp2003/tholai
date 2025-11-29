"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, Zap, Shield, Cpu, Globe, Users, Code, BarChart, Lock } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-400 mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          ABOUT THOLAI
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
            The Next Evolution
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
            of Work
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
          Tholai is an autonomous virtual workforce that operates with precision, speed, and zero idle cost.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-8 text-sm font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full" />
              <span>ALWAYS ON</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-500 rounded-full" />
              <span>ZERO LATENCY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-purple-500 rounded-full" />
              <span>INFINITE SCALE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MissionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div style={{ y, opacity }} className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              We replace repetitive tasks with <span className="text-blue-400">intelligent agents</span>.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Our platform combines serverless compute, agentic reasoning, and real-time orchestration to help startups and enterprises ship faster, scale instantly, and reduce operational overhead by up to 95%.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30" />
            <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <Globe className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To democratize access to high-caliber engineering and operational talent through AI-driven, always-on virtual teams — empowering founders to build more, ship faster, and operate smarter.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="py-32 bg-black/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why We Built Tholai</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Traditional teams are slow. Modern tools are fragmented. We built the solution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Card 1: Traditional Teams */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between group hover:border-red-500/30 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Traditional Teams</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3"><span className="text-red-400">×</span> Expensive to hire</li>
                <li className="flex items-center gap-3"><span className="text-red-400">×</span> Slow to scale</li>
                <li className="flex items-center gap-3"><span className="text-red-400">×</span> Constrained by time</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Tholai (Centerpiece) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-1 md:row-span-1 p-8 rounded-3xl bg-gradient-to-b from-blue-900/20 to-black border border-blue-500/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">The Tholai Way</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Coordinated virtual squad</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Runs 24/7, no burnout</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Fraction of the cost</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Perfect recall & compliance</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Modern AI Tools */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between group hover:border-yellow-500/30 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Modern AI Tools</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3"><span className="text-yellow-400">!</span> Helpful but fragmented</li>
                <li className="flex items-center gap-3"><span className="text-yellow-400">!</span> Lack coordination</li>
                <li className="flex items-center gap-3"><span className="text-yellow-400">!</span> Require oversight</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const capabilities = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Engineering",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      items: ["Code generation & refactoring", "Testing, QA, and CI/CD", "API development", "Documentation & architecture"]
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Operations",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      items: ["Customer support workflows", "Data processing & analytics", "Scheduling & task automation", "Resource optimization"]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security",
      color: "text-green-400",
      bg: "bg-green-500/10",
      items: ["Audit trails & Traceability", "Canary detection", "Policy enforcement", "Vulnerability scanning"]
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">What Tholai Can Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${cap.bg} flex items-center justify-center ${cap.color} mb-8 group-hover:scale-110 transition-transform`}>
                {cap.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-6 ${cap.color}`}>{cap.title}</h3>
              <ul className="space-y-4">
                {cap.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full ${cap.color.replace('text-', 'bg-')} mt-2`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionAndTeam() {
  return (
    <section className="py-32 border-t border-white/10 bg-gradient-to-b from-black to-blue-950/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-3xl font-bold mb-8">Our Vision</h3>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              To become the world’s first fully autonomous cloud workforce, capable of powering companies at every stage — from solo founders to global enterprises.
            </p>
            <p className="text-gray-500 leading-relaxed">
              We imagine a future where businesses no longer wait weeks to hire, software ships daily, and humans focus entirely on creativity, strategy, and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-8">Who We Are</h3>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Tholai was created by a small team of engineers who believe that the future of work is agentic, decentralized, and autonomous.
            </p>
            <p className="text-gray-500 leading-relaxed">
              We’re building at the intersection of AI systems, distributed computing, agent governance, and developer tooling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative p-16 rounded-[3rem] bg-gradient-to-b from-white/10 to-black border border-white/10 text-center overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to evolve?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              We’re looking for early adopters and visionary founders who want to redefine how software and operations are executed.
            </p>
            <Link href="/request-invite">
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)]">
                Request an Invite <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <BentoGrid />
      <Capabilities />
      <VisionAndTeam />
      <CTA />
      <Footer />
    </main>
  );
}
