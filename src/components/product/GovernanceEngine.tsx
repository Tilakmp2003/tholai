"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, DollarSign, FileCheck, AlertTriangle, Activity, Lock, Eye } from "lucide-react";
import "./ProductPage.css";

const logs = [
  { time: "10:42:01", level: "WARN", msg: "JuniorDev_04 exceeded token budget.", color: "text-yellow-400" },
  { time: "10:42:02", level: "INFO", msg: "Escalating to TeamLead_Alpha for review.", color: "text-blue-400" },
  { time: "10:42:05", level: "BLOCK", msg: "SecurityAgent detected hardcoded secret.", color: "text-red-400" },
  { time: "10:42:06", level: "FIX", msg: "Secret moved to env vars. Deployment approved.", color: "text-green-400" },
  { time: "10:42:09", level: "INFO", msg: "Canary deployment started in eu-west-1.", color: "text-blue-400" },
  { time: "10:42:12", level: "SUCCESS", msg: "Canary health check passed (200 OK).", color: "text-green-400" },
];

export function GovernanceEngine() {
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="product-section relative overflow-hidden">
      <div className="product-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <span className="product-label">
              <Shield className="w-3 h-3" />
              Safety & Trust
            </span>
            <h2 className="product-heading">Live War Room</h2>
            <p className="product-subheading mb-8">
              Strict protocols ensure that the autonomous workforce operates within safe, legal, and economic boundaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: "Cost Control", 
                  desc: "Elastic hierarchy routing prevents senior agents from doing junior work.",
                  icon: <DollarSign className="w-5 h-5" />
                },
                { 
                  title: "Traceability", 
                  desc: "Every decision is logged. If AI fails, we pay for the fix.",
                  icon: <FileCheck className="w-5 h-5" />
                },
                { 
                  title: "Deadlock Resolution", 
                  desc: "Automatic 'War Room' sessions resolve circular dependencies.",
                  icon: <AlertTriangle className="w-5 h-5" />
                },
                { 
                  title: "Security Gates", 
                  desc: "L0 Security Agents block unsafe code before it ships.",
                  icon: <Lock className="w-5 h-5" />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live Dashboard Visual */}
          <div className="relative perspective-container">
            <motion.div 
              className="holo-card bg-black/80 border-blue-500/30 p-0 overflow-hidden"
              initial={{ rotateY: 10, rotateX: 5 }}
              whileHover={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono text-white font-bold">LIVE_GOVERNANCE_FEED</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Radar & Stats */}
              <div className="grid grid-cols-3 border-b border-white/10 h-32">
                <div className="col-span-1 border-r border-white/10 relative flex items-center justify-center overflow-hidden">
                  {/* Radar Scan */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.2)_360deg)] animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-blue-500/30" />
                  <div className="absolute inset-8 rounded-full border border-blue-500/10" />
                  <div className="relative z-10 text-center">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-[10px] text-blue-400 uppercase">Compliance</div>
                  </div>
                </div>
                <div className="col-span-2 p-4 flex flex-col justify-center gap-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Active Agents</span>
                    <span className="text-white">1,024</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-blue-500" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Threats Blocked</span>
                    <span className="text-red-400">12</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[10%] bg-red-500" />
                  </div>
                </div>
              </div>
              
              {/* Terminal Logs */}
              <div className="p-4 font-mono text-xs h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none z-10" />
                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: i === activeLogIndex ? 1 : 0.3,
                        x: i === activeLogIndex ? 0 : -10
                      }}
                      className="flex gap-3 items-center"
                    >
                      <span className="text-gray-600 shrink-0">{log.time}</span>
                      <span className={`shrink-0 w-12 font-bold ${log.color}`}>{log.level}</span>
                      <span className="text-gray-300 truncate">{log.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-blue-900/20 border-t border-blue-500/20 flex items-center justify-between text-[10px] text-blue-300">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  <span>SYSTEM_OPTIMAL</span>
                </div>
                <div>SECURE_CONNECTION_ESTABLISHED</div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
