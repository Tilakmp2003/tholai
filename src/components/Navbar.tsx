"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Cpu, ChevronRight, Terminal, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function ScrambleText({ text, hover }: { text: string, hover: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!hover) {
      setDisplay(text);
      return;
    }
    
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
  }, [hover, text]);

  return <span>{display}</span>;
}

function NavLink({ href, label, isActive }: { href: string, label: string, isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <ScrambleText text={label} hover={isHovered} />
        {isActive && <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />}
      </span>
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/product", label: "PRODUCT" },
    { href: "/features", label: "FEATURES" },
    { href: "/docs", label: "DOCS" },
    { href: "/pricing", label: "PRICING" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300",
          scrolled ? "pt-4" : "pt-6"
        )}
      >
        <div className={cn(
          "w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
          "bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]",
          scrolled && "bg-black/90 border-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 group-hover:border-blue-500/50 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Cpu className="h-5 w-5 text-blue-400 transition-transform duration-700 group-hover:rotate-180 relative z-10" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline tracking-tighter leading-none">
                <span className="text-lg font-mono text-white mr-[1px]">thol</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                  AI
                </span>
              </div>
              <div className="text-[8px] font-mono text-gray-500 tracking-widest uppercase">
                System v2.0
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => (
              <NavLink 
                key={link.href}
                href={link.href} 
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 border-r border-white/10 pr-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>ONLINE</span>
            </div>
            
            <Link href="/login" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              LOGIN
            </Link>
            
            <Link href="/request-invite">
              <button className="group relative px-5 py-2 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Deploy <ChevronRight className="w-3 h-3" />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 mx-4 z-50 md:hidden rounded-3xl border border-white/10 bg-black/95 backdrop-blur-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "text-lg font-medium p-4 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/5 transition-all",
                    pathname === link.href ? "text-white bg-white/5 border-white/5" : "text-gray-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {link.label}
                    {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  </div>
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link href="/login" className="text-sm text-gray-400 p-4" onClick={() => setIsOpen(false)}>
                Terminal Login
              </Link>
              <Link href="/request-invite" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm uppercase tracking-wider">
                  Initialize Protocol
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
