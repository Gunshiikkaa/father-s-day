"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(1); // 1: presents, 2: lifetime, 3: streaming, 4: transition

  useEffect(() => {
    // Progression of cinematic text stages automatically on mount
    const timer1 = setTimeout(() => setStage(2), 1600);
    const timer2 = setTimeout(() => setStage(3), 3200);
    const timer3 = setTimeout(() => setStage(4), 4800);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 5800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Visual background volumetric lens glow */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(229, 9, 20, 0.03) 0%, transparent 70%) pointer-events-none" />

      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.div
            key="stage-presents"
            initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(5px)" }}
            animate={{ opacity: 1, letterSpacing: "0.5em", filter: "blur(0px)" }}
            exit={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-center px-4"
          >
            <h2 className="text-xl md:text-2xl font-bold font-serif tracking-[0.5em] text-white opacity-90 uppercase">
              DAD<span className="text-amber-500">FLIX</span> PRESENTS
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-4" />
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="stage-lifetime"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-center px-4"
          >
            <h3 
              className="text-3xl md:text-4xl lg:text-5xl font-light italic text-amber-500 opacity-90"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              &ldquo;A Lifetime of Memories&rdquo;
            </h3>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="stage-streaming"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="text-center px-4"
          >
            <p className="text-neutral-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-2">
              Original tribute film
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-widest text-white"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              STREAMING SINCE DAY ONE
            </h2>
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key="shutter-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            {/* Shutter red flare sweep */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 4], opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="w-96 h-96 rounded-full bg-radial-gradient(circle, rgba(229, 9, 20, 0.3) 0%, rgba(229, 9, 20, 0.05) 50%, transparent 70%)"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
