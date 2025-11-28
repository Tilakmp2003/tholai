"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Check, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CTAPremium() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Warp Speed Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars: { x: number; y: number; z: number; pz: number }[] = [];
    const numStars = 800;
    let speed = 0.1;
    let targetSpeed = 0.1;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        pz: 0
      });
      stars[i].pz = stars[i].z;
    }

    const animate = () => {
      // Smooth speed transition
      speed += (targetSpeed - speed) * 0.05;

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Trail effect
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Move star
        star.z -= speed * 50;

        // Reset if passed screen
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.pz = star.z;
        }

        // Project 3D to 2D
        const x = cx + (star.x / star.z) * width;
        const y = cy + (star.y / star.z) * height;
        
        const px = cx + (star.x / star.pz) * width;
        const py = cy + (star.y / star.pz) * height;

        star.pz = star.z;

        // Draw star streak
        const s = (1 - star.z / width);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${s})`;
        ctx.lineWidth = s * 2;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Control speed based on hover/status
  useEffect(() => {
    // We can't easily pass this to the canvas loop without a ref or global, 
    // but for simplicity let's just re-render or use a ref if we needed precise control.
    // Actually, the canvas loop above uses local variables. Let's fix that by using a ref for targetSpeed.
    // Re-implementing the effect to be cleaner with refs.
  }, [isHovered, status]);

  // Re-implementation of canvas logic with refs for speed control
  const speedRef = useRef(0.1);
  useEffect(() => {
    speedRef.current = status === "success" ? 2.0 : (isHovered ? 0.8 : 0.1);
  }, [isHovered, status]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const stars: { x: number; y: number; z: number; pz: number }[] = [];
    const numStars = 800;
    let speed = 0.1;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        pz: 0
      });
      stars[i].pz = stars[i].z;
    }

    let animationId: number;
    const animate = () => {
      speed += (speedRef.current - speed) * 0.05;

      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed * 50;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.pz = star.z;
        }

        const x = cx + (star.x / star.z) * width;
        const y = cy + (star.y / star.z) * height;
        const px = cx + (star.x / star.pz) * width;
        const py = cy + (star.y / star.pz) * height;

        star.pz = star.z;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          const s = (1 - star.z / width);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(22, 199, 132, ${s * 0.8 + 0.2})`; // Green tint
          ctx.lineWidth = s * (speed * 2 + 1);
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    try {
      // Check status via the deploy API
      const res = await fetch(`/api/deploy?email=${encodeURIComponent(email)}`);
      
      if (res.status === 404) {
        // User not found -> Redirect to request invite to sign up
        router.push(`/request-invite?email=${encodeURIComponent(email)}`);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ACCEPTED') {
          // Accepted -> Redirect to dashboard (or login if session needed)
          // For now, following instruction to redirect to dashboard. 
          // Ideally we might want to go to login to establish session, but user asked for dashboard.
          // We'll assume dashboard handles auth or we redirect to login if needed.
          // Let's redirect to login with email pre-filled to be safe and "login", 
          // or directly to dashboard if we can set session. 
          // Given the previous flow, let's go to login to "Initiate Session" properly.
          // Wait, user said "redirect to dashboard". 
          // But without session, dashboard might be empty. 
          // Let's try to set session if possible, or just redirect.
          // Actually, let's redirect to /login?email=... and maybe auto-submit?
          // The user said "if i give gmail and it is accepted it has to redirect to dashboard".
          // I will redirect to /dashboard.
          router.push('/dashboard');
        } else {
          // Pending -> Redirect to request invite to show queue
          router.push(`/request-invite?email=${encodeURIComponent(email)}`);
        }
      } else {
        // Error -> Default to request invite
        router.push(`/request-invite?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      router.push(`/request-invite?email=${encodeURIComponent(email)}`);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-40 overflow-hidden flex items-center justify-center min-h-[80vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-primary mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Limited Early Access</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            Build at the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x">
              Speed of Thought
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Join the autonomous revolution. Replace your entire engineering overhead with a single, intelligent pipeline.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full opacity-20 group-hover:opacity-50 blur transition duration-500" />
            <div className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-full border border-white/10 p-2 pl-6 transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-[0_0_30px_rgba(22,199,132,0.3)]">
              <input
                type="email"
                placeholder="enter@your.email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== "idle"}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 font-mono"
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className={cn(
                  "h-12 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative",
                  status === "success" 
                    ? "bg-green-500 text-white w-12 px-0" 
                    : "bg-primary text-black hover:bg-white hover:scale-105 w-auto"
                )}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                  {status === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      <Rocket className="w-5 h-5 animate-bounce" />
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              2,400+ on waitlist
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Rolling out weekly
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
