import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <div className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary overflow-hidden",
        iconClassName
      )}>
        <Image 
          src="/image/icon.png" 
          alt="Tholai Logo" 
          width={64} 
          height={64} 
          className="object-cover w-full h-full"
          priority
          unoptimized
        />
      </div>
      <div className="font-bold text-xl tracking-tight flex items-baseline">
        <span className="text-white">thol</span>
        <span className="text-primary neon-text">Ai</span>
      </div>
    </div>
  );
}
