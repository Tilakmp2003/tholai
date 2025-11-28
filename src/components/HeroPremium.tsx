"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

const reveal = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function HeroPremium() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-20 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-aurora opacity-30 -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Headline & CTAs */}
          <motion.div 
            variants={reveal} 
            initial="hidden" 
            animate="show"
            style={{ y, opacity }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Accepting invite-only beta
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Autonomous <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Dev Teams.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-xl text-gray-400 leading-relaxed">
              Tholai automates requirements → design → code → QA in sandboxed cloud
              environments. Ship software while you sleep.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/request-invite"
                className="inline-flex justify-center items-center gap-3 rounded-full bg-white text-black px-8 py-4 text-base font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
              >
                Request Invite
              </Link>
              <Link
                href="/demo"
                className="inline-flex justify-center items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                Watch Demo
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-[#060608]" />
                ))}
              </div>
              <p>Trusted by <strong className="text-white">65+ engineering teams</strong></p>
            </div>
          </motion.div>

          {/* Right: 3D Terminal */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ scale }}
            className="relative mx-auto w-full max-w-[90vw] md:max-w-2xl perspective-1000"
          >
            <div className="relative rounded-2xl bg-[#0b0c0d]/90 border border-white/10 p-2 shadow-2xl shadow-primary/20 backdrop-blur-xl transform transition-transform hover:scale-[1.02] duration-500">
              {/* Glow behind terminal */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl -z-10 opacity-50" />
              
              <div className="rounded-xl bg-black/80 p-6 h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                    <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="ml-auto text-xs text-gray-500 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    agent-1 — active
                  </div>
                </div>

                <div className="font-mono text-sm leading-relaxed space-y-4 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex gap-2">
                      <span className="text-primary">➜</span>
                      <span className="text-white">tholai plan "Redesign landing page"</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="pl-4 border-l-2 border-white/10 space-y-2"
                  >
                    <div className="text-blue-400">ℹ Analyzing design system...</div>
                    <div className="text-gray-400">✓ Found globals.css</div>
                    <div className="text-gray-400">✓ Found Tailwind config</div>
                    <div className="text-purple-400">⚠ Detected legacy components</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="pl-4 space-y-2"
                  >
                    <div className="text-yellow-400">➜ Generating new components...</div>
                    <div className="text-gray-500">  • FloatingNavbar.tsx</div>
                    <div className="text-gray-500">  • BentoGrid.tsx</div>
                    <div className="text-gray-500">  • SpotlightCard.tsx</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                    className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 flex items-center gap-2"
                  >
                    <span>✔</span>
                    <span>Deployment successful (24ms)</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
