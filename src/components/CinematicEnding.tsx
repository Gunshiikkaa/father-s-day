"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Crown, Heart, Music, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultMemories, MemoryItem } from "./defaultMemories";

interface CinematicEndingProps {
  audioCtx: AudioContext | null;
  masterGain: GainNode | null;
}

interface ConfettiPiece {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  delay: number;
  speed: number;
  rotation: number;
}

export default function CinematicEnding({ audioCtx, masterGain }: CinematicEndingProps) {
  const [memories] = useLocalStorage<MemoryItem[]>("dadflix-memories", defaultMemories);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Get the first 6 memories to show in the scattered polaroid collage
  const collageMemories = memories.slice(0, 6);

  // Fallback to defaults if memories are somehow empty
  const activeCollage = collageMemories.length >= 6 
    ? collageMemories 
    : defaultMemories.slice(0, 6);

  // Generate background falling ember/confetti sparks on load
  useEffect(() => {
    generateConfetti(35, true);
  }, []);

  const generateConfetti = (count: number, isEmberBackground = false) => {
    const pieces: ConfettiPiece[] = [];
    const colors = [
      "#e50914", // Netflix Red
      "#ff4d55", // Soft Red
      "#b20710", // Deep Red
      "#f5c44f", // Warm gold
      "#ffe58f", // Soft gold
      "#ffffff", // White
    ];

    for (let i = 0; i < count; i++) {
      pieces.push({
        id: i + (isEmberBackground ? 1000 : Date.now()),
        left: Math.random() * 100,
        top: isEmberBackground ? -10 - Math.random() * 20 : -10,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * (isEmberBackground ? 8 : 0.5),
        speed: 4 + Math.random() * 5, // time to fall (seconds)
        rotation: Math.random() * 360,
      });
    }

    if (isEmberBackground) {
      setConfetti((prev) => [...prev, ...pieces]);
    } else {
      setConfetti((prev) => [...prev.filter((p) => p.id >= 1000), ...pieces]);
    }
  };

  // Trigger celebration explosion
  const handleCelebrate = () => {
    setCelebrationActive(true);
    generateConfetti(65, false);
    
    // Play a happy synthesized chord chime if AudioContext is active
    playChime();

    setTimeout(() => {
      setCelebrationActive(false);
    }, 5000);
  };

  // Play a beautiful synthesized arpeggio melody
  const playChime = () => {
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      
      // Node settings
      const chimeGain = audioCtx.createGain();
      chimeGain.gain.setValueAtTime(0, now);
      
      // Setup a compressor or connect directly to masterGain
      if (masterGain) {
        chimeGain.connect(masterGain);
      } else {
        chimeGain.connect(audioCtx.destination);
      }

      // 4-note arpeggio chord chime (A major key / emotional): A4, C#5, E5, A5
      const notes = [440.00, 554.37, 659.25, 880.00];
      
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.15;
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        
        oscGain.gain.setValueAtTime(0, time);
        oscGain.gain.linearRampToValueAtTime(0.12, time + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);
        
        osc.connect(oscGain);
        oscGain.connect(chimeGain);
        
        osc.start(time);
        osc.stop(time + 1.0);
      });

      // Ramp main chime node for smooth overall volume envelope
      chimeGain.gain.setValueAtTime(0, now);
      chimeGain.gain.linearRampToValueAtTime(0.8, now + 0.15);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    } catch (e) {
      console.warn("Melody synthesis failed:", e);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#0c0c0c] overflow-hidden z-10 select-none pt-8 pb-4"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 via-[#0e0e0e] to-black pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-red-950/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Confetti Sparks Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {confetti.map((spark) => (
          <div
            key={spark.id}
            className="absolute rounded-sm opacity-60"
            style={{
              left: `${spark.left}%`,
              top: `${spark.top}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.color,
              transform: `rotate(${spark.rotation}deg)`,
              animation: `fallDownSparks ${spark.speed}s linear infinite`,
              animationDelay: `${spark.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Collage Polaroid Cards - Scattered Absolute Layout for Large Screens */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block">
        
        {/* Card 1: Top Left */}
        {activeCollage[0] && (
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -8 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="absolute left-[4%] top-[12%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-40 aspect-[3/4] flex flex-col rotate-[-8deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[0].image} alt={activeCollage[0].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[0].title}
            </span>
          </motion.div>
        )}

        {/* Card 2: Middle/Lower Left */}
        {activeCollage[1] && (
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: 18 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 12 } : {}}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="absolute left-[2%] bottom-[22%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-42 aspect-[3/4] flex flex-col rotate-[12deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[1].image} alt={activeCollage[1].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[1].title}
            </span>
          </motion.div>
        )}

        {/* Card 3: Bottom Left */}
        {activeCollage[2] && (
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: -4 } : {}}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="absolute left-[14%] bottom-[5%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-40 aspect-[3/4] flex flex-col rotate-[-4deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[2].image} alt={activeCollage[2].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[2].title}
            </span>
          </motion.div>
        )}

        {/* Card 4: Top Right */}
        {activeCollage[3] && (
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 8 } : {}}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="absolute right-[6%] top-[15%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-40 aspect-[3/4] flex flex-col rotate-[8deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[3].image} alt={activeCollage[3].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[3].title}
            </span>
          </motion.div>
        )}

        {/* Card 5: Middle/Lower Right */}
        {activeCollage[4] && (
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: -16 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -10 } : {}}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="absolute right-[2%] bottom-[20%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-42 aspect-[3/4] flex flex-col rotate-[-10deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[4].image} alt={activeCollage[4].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[4].title}
            </span>
          </motion.div>
        )}

        {/* Card 6: Bottom Right */}
        {activeCollage[5] && (
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 12 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 6 } : {}}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="absolute right-[12%] bottom-[6%] bg-white p-2.5 pb-6 border border-stone-200/80 shadow-2xl rounded-sm w-40 aspect-[3/4] flex flex-col rotate-[6deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <div className="w-full h-[78%] overflow-hidden bg-neutral-900 rounded-sm">
              <img src={activeCollage[5].image} alt={activeCollage[5].title} className="w-full h-full object-cover brightness-95" />
            </div>
            <span className="text-stone-800 text-center mt-2 text-sm tracking-wide truncate uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              {activeCollage[5].title}
            </span>
          </motion.div>
        )}

      </div>

      {/* Main Center Card (Content from Climax, Design from Birthday Special Card) */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 w-full max-w-2xl z-20 text-center space-y-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-zinc-950/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-red-950/10 w-full overflow-hidden"
        >
          {/* Subtle reflection card glow overlay */}
          <div className="absolute -inset-[500px] bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-150%] animate-[sweep_6s_linear_infinite] pointer-events-none" />

          {/* Top Circular Gradient Crown Badge */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 flex items-center justify-center mx-auto mb-4 border-2 border-red-500/30 shadow-lg shadow-red-600/20">
            <Crown className="w-6 h-6 text-black fill-black" />
            
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full border border-red-500/20 animate-ping opacity-75" />
          </div>

          {/* Special Production Subtitle */}
          <span className="block text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-red-500 uppercase mb-4">
            A DADFLIX ORIGINAL TRIBUTE
          </span>

          {/* Main Hero Header */}
          <h2 
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-sans tracking-wide text-white uppercase leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            THANK YOU FOR BEING THE <span className="text-red-500">HERO</span> OF MY <span className="text-red-500">STORY</span>.
          </h2>

          {/* Quote Block */}
          <p className="text-neutral-400 text-sm sm:text-base font-light italic max-w-md mx-auto leading-relaxed border-t border-neutral-900 pt-5 mb-4 font-serif">
            &ldquo;Some heroes wear capes. Mine simply answered to &lsquo;Dad&rsquo;.&rdquo;
          </p>

          {/* Interactive Button row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Replay Confetti Button */}
            <button
              onClick={handleCelebrate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-full shadow-lg shadow-red-950/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              Celebrate Dad! 🥳
            </button>

            {/* Play Melody Button */}
            <button
              onClick={playChime}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Music className="w-4 h-4" />
              Play Theme Song 🎵
            </button>
          </div>

        </motion.div>

        {/* Small Screens Collage List - Horizontal scroll visible only on smaller viewports */}
        <div className="w-full lg:hidden block">
          <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase text-center mb-3">
            Moments Collage
          </p>
          <div className="flex items-center gap-4 overflow-x-auto py-4 px-2 scrollbar-none snap-x">
            {activeCollage.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 bg-white p-2 pb-4 border border-stone-200 shadow-xl rounded-sm w-32 aspect-[3/4] flex flex-col snap-center rotate-1"
              >
                <div className="w-full h-[76%] overflow-hidden bg-neutral-900 rounded-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-stone-800 text-center mt-1.5 text-xs truncate" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Elegant Cinematic Footer */}
      <footer className="w-full border-t border-neutral-900 bg-black/90 py-6 px-6 text-center space-y-3 z-20">
        <div className="flex items-center justify-center gap-1.5 text-red-500 font-bold uppercase tracking-[0.2em] text-xs font-serif">
          <span>DadFlix</span>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-400 font-mono tracking-widest text-[9px]">Tribute Registry</span>
        </div>
        
        <p className="text-neutral-500 text-[10px] sm:text-xs tracking-wider max-w-md mx-auto leading-relaxed">
          A Lifetime of Memories. Streaming Since Day One.<br />
          All custom memories, awards, and letters are stored safely inside your browser.
        </p>

        <div className="flex items-center justify-center gap-1.5 text-[9px] text-neutral-600 font-mono">
          <span>Made with</span>
          <Heart className="w-2.5 h-2.5 text-red-600 fill-red-600 animate-pulse" />
          <span>for the world&apos;s greatest father.</span>
        </div>
      </footer>

      {/* Falling Sparks & Confetti CSS Keyframes */}
      <style jsx global>{`
        @keyframes fallDownSparks {
          0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(105vh) rotate(360deg) translateX(40px); opacity: 0; }
        }
      `}</style>

    </section>
  );
}
