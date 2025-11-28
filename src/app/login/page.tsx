"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Lock, Loader2, ChevronRight, AlertCircle, Fingerprint, ScanLine, Shield, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function ScrambleText({ text, trigger = true, className }: { text: string, trigger?: boolean, className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!trigger) return;
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
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{display}</span>;
}

function SecurityVisualizer() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      
      {/* Rotating Rings */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            className={cn(
              "absolute rounded-full border border-blue-500/10",
              i === 0 ? "w-full h-full border-dashed" : 
              i === 1 ? "w-3/4 h-3/4 border-dotted opacity-50" : "w-1/2 h-1/2 border-solid opacity-30"
            )}
          />
        ))}
        
        {/* Core */}
        <div className="relative z-10 w-32 h-32 bg-blue-500/5 rounded-full backdrop-blur-md border border-blue-500/20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
          <Lock className="w-12 h-12 text-blue-400" />
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 400 - 200, 
              y: Math.random() * 400 - 200, 
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      {/* Status Text */}
      <div className="absolute bottom-20 left-10 font-mono text-xs text-blue-500/50 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          SECURE_GATEWAY_ACTIVE
        </div>
        <div>ENCRYPTION: AES-256-GCM</div>
        <div>ZONE: RESTRICTED</div>
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("tholai_session", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network Protocol Error. Connection Terminated.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-mono selection:bg-blue-500/30 flex">
      {/* Left Side - Visualizer (Hidden on Mobile) */}
      <div className="hidden lg:block w-1/2 relative border-r border-white/5">
        <SecurityVisualizer />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center px-8 sm:px-20 pt-20">
          <div className="w-full max-w-lg space-y-12">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400">
                <Shield className="w-3 h-3" />
                AUTHORIZED PERSONNEL ONLY
              </div>
              <h1 className="text-5xl font-black tracking-tighter">
                <ScrambleText text="SYSTEM ACCESS" />
              </h1>
              <p className="text-gray-400 text-lg">
                Enter your identity token to decrypt the dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs text-blue-400 font-bold tracking-widest flex items-center gap-2 uppercase">
                  <Terminal className="w-3 h-3" />
                  Identity Token
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-light focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10"
                    placeholder="name@company.com"
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border-l-2 border-red-500 p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative px-8 py-6 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-between">
                  {loading ? "VERIFYING HASH..." : "INITIATE SESSION"}
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </form>

            {/* Footer Info */}
            <div className="pt-12 border-t border-white/5 flex justify-between text-xs text-gray-600 font-mono">
              <div>ID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
              <div>LATENCY: 12ms</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
