import { Box, Hexagon, Triangle, Circle, Square, Cloud, Database, Server } from "lucide-react";

export function InfiniteMarquee() {
  const logos = [
    { icon: Box, name: "ACME" },
    { icon: Hexagon, name: "Polymath" },
    { icon: Triangle, name: "Vercel" },
    { icon: Circle, name: "Circle" },
    { icon: Square, name: "Square" },
    { icon: Cloud, name: "Cloud" },
    { icon: Database, name: "Data" },
    { icon: Server, name: "Host" },
  ];

  return (
    <section className="border-y border-white/5 bg-black/30 py-10 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060608] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060608] to-transparent z-10" />
      
      <div className="flex w-max animate-marquee gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center gap-3 text-white font-bold text-xl">
            <logo.icon className="w-8 h-8" />
            {logo.name}
          </div>
        ))}
      </div>
    </section>
  );
}
