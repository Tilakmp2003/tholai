"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Check, Loader2, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function ScrambleText({ text, trigger = true }: { text: string, trigger?: boolean }) {
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

  return <span>{display}</span>;
}

function RequestInviteContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || "";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail,
    company: "",
    role: "Founder / CTO"
  });
  const [ticketId, setTicketId] = useState("");
  const [queuePosition, setQueuePosition] = useState(0);
  const [status, setStatus] = useState("PENDING_REVIEW");

  useEffect(() => {
    if (initialEmail) {
      // If email is passed, we might want to check status immediately if they are returning
      // But usually they are here because they are not found or pending.
      // Let's just pre-fill.
      // Optionally, we could check status if we wanted to be super smart, 
      // but the previous page likely already did that.
      // However, if they come from a direct link, checking status is good.
      checkStatus(initialEmail);
    } else {
      const savedEmail = localStorage.getItem("tholai_waitlist_email");
      if (savedEmail) {
        checkStatus(savedEmail);
      }
    }
  }, [initialEmail]);

  const checkStatus = async (email: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/deploy?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setTicketId(data.ticketId);
        setQueuePosition(data.queuePosition);
        setStatus(data.status);
        setStep(2); // Go directly to status view
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setTicketId(data.ticketId);
        setQueuePosition(data.queuePosition);
        setStatus(data.status);
        localStorage.setItem("tholai_waitlist_email", formData.email);
        setStep(2); // Success
      } else {
        console.error('Deployment failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-mono selection:bg-blue-500/30 relative overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              SECURE_UPLINK_ESTABLISHED
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
              <ScrambleText text={status === 'ACCEPTED' ? "ACCESS GRANTED" : "INITIALIZE DEPLOYMENT"} />
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              {status === 'ACCEPTED' 
                ? "Your instance is ready. Proceed to terminal login."
                : "Configure your sovereign instance. Access is granted on a rolling basis to ensure network stability."}
            </p>
          </motion.div>

          <div className="relative">
            {/* Terminal Window */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-[10px] text-gray-500 flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  deploy_config.sh
                </div>
              </div>

              <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {step === 0 && !loading && (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <label className="text-xs text-blue-400 flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          ENTER_IDENTITY
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-2 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-blue-400 flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          WORK_EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-2 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs text-blue-400 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            ORGANIZATION
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10"
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-blue-400 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            CLEARANCE_LEVEL
                          </label>
                          <select 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-xl focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-black"
                          >
                            <option>Founder / CTO</option>
                            <option>Engineering Manager</option>
                            <option>Senior Developer</option>
                            <option>Product Manager</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-8">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity animate-gradient-x" />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                ENCRYPTING_PACKET...
                              </>
                            ) : (
                              <>
                                INITIALIZE_REQUEST <Terminal className="w-4 h-4" />
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {loading && step === 0 && (
                     <div className="flex flex-col items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                        <p className="text-sm text-blue-400 animate-pulse">ESTABLISHING_SECURE_CONNECTION...</p>
                     </div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      {status === 'ACCEPTED' ? (
                        <>
                          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20 relative">
                            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
                            <Terminal className="w-10 h-10 text-blue-500" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            <ScrambleText text="SYSTEM_UNLOCKED" />
                          </h3>
                          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                            Your clearance has been approved. You may now access the command terminal.
                          </p>
                          <a href="/login">
                            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors uppercase tracking-widest text-sm">
                              Enter Terminal
                            </button>
                          </a>
                        </>
                      ) : (
                        <>
                          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 relative">
                            <div className="absolute inset-0 rounded-full border border-green-500/20 animate-ping" />
                            <Check className="w-10 h-10 text-green-500" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            <ScrambleText text="REQUEST_ACKNOWLEDGED" />
                          </h3>
                          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                            Your cryptographic signature has been logged. You are position #{queuePosition.toLocaleString()} in the queue.
                          </p>
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 font-mono text-xs text-gray-500">
                            <Shield className="w-3 h-3" />
                            TICKET_ID: {ticketId}
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-blue-500/20 rounded-tl-3xl" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-blue-500/20 rounded-br-3xl" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function RequestInvite() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <RequestInviteContent />
    </Suspense>
  );
}
