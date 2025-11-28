"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
          "bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50",
          scrolled ? "w-full max-w-5xl" : "w-full max-w-6xl"
        )}
      >
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {["Product", "Features", "Docs", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white px-4 py-2">
            Log in
          </Link>
          <Link href="/request-invite">
            <button className="bg-white text-black hover:bg-gray-200 font-medium px-5 py-2 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Request Invite
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-[#0b0c0d] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 z-50"
          >
            {["Product", "Features", "Docs", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link
              href="/request-invite"
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-black font-medium px-4 py-3 rounded-xl text-sm text-center"
            >
              Request Invite
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
