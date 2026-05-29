"use client";

import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  // Logo text animation variants
  const logoVariants: any = {
    hidden: { filter: "blur(25px)", opacity: 0, scale: 0.85 },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 2.2, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1.0, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-transparent select-none z-10">
      
      {/* Spotlight Ambient Behind Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.07) 0%, rgba(255, 140, 0, 0.02) 50%, transparent 70%) pointer-events-none filter blur-2xl z-0" />

      {/* Volumetric Light Rays */}
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="volumetric-ray left-[20%] top-0 h-[80vh] opacity-30 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="volumetric-ray left-[45%] top-0 h-[90vh] opacity-20 animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="volumetric-ray left-[75%] top-0 h-[85vh] opacity-25 animate-pulse" style={{ animationDuration: "10s" }} />
      </div>

      <div className="flex flex-col items-center text-center px-4 max-w-4xl z-10">
        {/* Cinematic Glowing DADFLIX Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-6"
        >
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[0.2em] font-serif logo-glow text-white select-none pointer-events-none"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            DAD<span className="text-amber-500">FLIX</span>
          </h1>
          
          {/* Light sweep flash across logo */}
          <motion.div 
            initial={{ left: "-150%" }}
            animate={{ left: "150%" }}
            transition={{ delay: 2.0, duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 10 }}
            className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
          />
        </motion.div>

        {/* Tribute Label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 0.8, letterSpacing: "0.4em" }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="text-amber-500/90 font-bold uppercase text-xs sm:text-sm tracking-[0.4em] mb-8 font-mono"
        >
          A Netflix Original Tribute Documenting the GOAT
        </motion.div>

        {/* Title Headline */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.4 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wider mb-6"
        >
          THE GREATEST STORY <br />
          EVER TOLD: <span className="gold-text-gradient">DAD</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
          className="text-neutral-400 text-sm sm:text-lg font-light leading-relaxed max-w-xl mb-12"
        >
          Every sacrifice. Every lesson. Every laugh. <br />
          <span className="text-amber-500/80 font-medium">Now streaming forever in our hearts.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.2 }}
        >
          <button
            onClick={onStartClick}
            className="light-sweep relative group flex items-center gap-3 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-400 text-black px-10 py-5 rounded-md font-bold text-sm sm:text-base tracking-[0.15em] uppercase transition-all shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-[1.03] cursor-pointer"
          >
            <Play className="w-5 h-5 fill-black text-black group-hover:scale-110 transition-transform" />
            Start Watching Memories
          </button>
        </motion.div>
      </div>

      {/* Pulsing Down Arrow */}
      <motion.button
        onClick={onStartClick}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ delay: 3.0, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-neutral-500 hover:text-amber-500 cursor-pointer z-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-mono">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* Ambient Floor Dark Vignette Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
    </section>
  );
}
