import { Box, Hexagon, Triangle, Circle, Square } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="border-y border-white/5 bg-black/50 py-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos using Lucide Icons to simulate brands */}
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Box className="w-6 h-6" /> ACME Corp
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Hexagon className="w-6 h-6" /> Polymath
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Triangle className="w-6 h-6" /> Vercel
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Circle className="w-6 h-6" /> Circle
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Square className="w-6 h-6" /> Square
          </div>
        </div>
      </div>
    </section>
  );
}
