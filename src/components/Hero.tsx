"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  const itemVariants: any = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full h-[95vh] min-h-[600px] flex flex-col justify-center items-start overflow-hidden bg-transparent select-none z-10 pl-6 sm:pl-12 md:pl-20 md:pr-24">
      
      {/* Dynamic light ray backdrop overlay */}
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="volumetric-ray left-[15%] top-0 h-[80vh] opacity-20 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="volumetric-ray left-[35%] top-0 h-[90vh] opacity-15 animate-pulse" style={{ animationDuration: "12s" }} />
      </div>

      <div className="flex flex-col items-start text-left max-w-2xl z-10 pt-16 space-y-5">
        
        {/* N Original Series Tag */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1.5"
        >
          <span className="font-serif font-black text-amber-500 text-3xl logo-glow">N</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-neutral-300 uppercase font-sans">
            Tribute Series
          </span>
        </motion.div>

        {/* Cinematic Glowing DADFLIX Logo / Title */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(15px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="relative"
        >
          <h1 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide font-serif logo-glow text-white"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            THE GREATEST STORY<br />
            EVER TOLD: <span className="gold-text-gradient">DAD</span>
          </h1>
        </motion.div>

        {/* Netflix Metadata Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-sans"
        >
          <span className="text-green-500 font-bold font-mono">99% Match</span>
          <span className="text-neutral-400 font-mono">2026</span>
          <span className="border border-neutral-700/60 px-1.5 py-0.5 rounded text-[10px] text-neutral-300 font-bold font-mono">
            U/A 16+
          </span>
          <span className="text-neutral-400 font-mono">1 Season</span>
          <span className="border border-neutral-700/60 px-1 py-0.5 rounded text-[9px] text-neutral-400 font-bold font-mono">
            Ultra HD 4K
          </span>
          <span className="border border-neutral-700/60 px-1 py-0.5 rounded text-[9px] text-neutral-400 font-bold font-mono">
            HDR
          </span>
        </motion.div>

        {/* Description / Synopsis */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="text-neutral-300 text-xs sm:text-base font-light leading-relaxed max-w-xl text-shadow-md"
        >
          An emotional, biographical documentary celebrating the quiet sacrifices, wise advice, and groan-worthy jokes of the ultimate family leader. Now streaming in our hearts forever.
        </motion.p>

        {/* Play & Info Action Buttons */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 }}
          className="flex items-center gap-3.5 pt-2"
        >
          <button
            onClick={onStartClick}
            className="flex items-center gap-2.5 bg-white hover:bg-neutral-200 text-black px-7 py-3 rounded font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-black text-black" />
            Play Memories
          </button>
          
          <button
            onClick={onStartClick}
            className="flex items-center gap-2.5 bg-neutral-600/35 hover:bg-neutral-600/50 border border-neutral-700/20 text-white px-7 py-3 rounded font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Info className="w-5 h-5 text-white" />
            More Info
          </button>
        </motion.div>

      </div>

      {/* Right-aligned Age Rating Badge overlay */}
      <div className="absolute right-0 bottom-[18vh] bg-neutral-900/60 border-l-[3px] border-neutral-400/80 px-4 py-1.5 flex items-center justify-center pointer-events-none select-none z-10 pr-12 font-mono font-bold text-xs sm:text-sm text-neutral-300">
        GOAT
      </div>

      {/* Shadow Vignette fading up at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent pointer-events-none z-0" />
    </section>
  );
}
