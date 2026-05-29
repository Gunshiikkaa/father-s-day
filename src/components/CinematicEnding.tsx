"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultWallItems, WallItem } from "./MemoryWall";

export default function CinematicEnding() {
  const [wallItems] = useLocalStorage<WallItem[]>("dadflix-wall-items", defaultWallItems);
  const [floatingPhotos, setFloatingPhotos] = useState<Array<{ id: number; image: string; left: number; delay: number; scale: number; speed: number }>>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    // Generate a set of floating photos dynamically from user's memory gallery
    if (wallItems.length === 0) return;

    const photos = [];
    for (let i = 0; i < 8; i++) {
      const item = wallItems[i % wallItems.length];
      photos.push({
        id: i + Date.now(),
        image: item.image,
        left: 5 + Math.random() * 85, // random horizontal offset (percentage)
        delay: Math.random() * 8, // staggered animation starts
        scale: 0.5 + Math.random() * 0.4, // random polaroid scales
        speed: 12 + Math.random() * 10, // speed of float upward (seconds)
      });
    }
    setFloatingPhotos(photos);
  }, [wallItems]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-gradient-to-t from-[#261502] via-[#050505] to-black overflow-hidden z-10 select-none pt-24"
    >
      
      {/* Sunset Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] rounded-full bg-radial-gradient(circle, rgba(245, 140, 0, 0.08) 0%, rgba(212, 175, 55, 0.02) 50%, transparent 70%) pointer-events-none filter blur-3xl z-0" />

      {/* Rinsing sparks/dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500/30 rounded-full blur-[0.5px]"
            style={{
              bottom: "-5%",
              left: `${Math.random() * 100}%`,
              animation: `floatUpEnding ${8 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Memory Photos floating vertically */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingPhotos.map((photo) => (
          <div
            key={photo.id}
            className="absolute bg-white p-2 pb-5 border border-stone-200 shadow-xl opacity-0 rotate-6 rounded-sm w-24 sm:w-32 aspect-[3/4]"
            style={{
              left: `${photo.left}%`,
              bottom: "-200px",
              transform: `scale(${photo.scale})`,
              animation: `floatPhotoUp ${photo.speed}s linear infinite`,
              animationDelay: `${photo.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.image}
              alt="Floating memory"
              className="w-full h-full object-cover rounded-sm brightness-95"
            />
          </div>
        ))}
      </div>

      {/* Center Cinematic Message Climax */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 max-w-4xl z-10 space-y-8">
        
        {/* Glowing Logo that slowly scales up */}
        <motion.div
          animate={isInView ? { scale: [0.95, 1.05], opacity: 1 } : { scale: 0.95, opacity: 0.5 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="mb-4"
        >
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.25em] font-serif logo-glow text-white pointer-events-none"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            DAD<span className="text-amber-500">FLIX</span>
          </h2>
        </motion.div>

        {/* Final Tribute Statement */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase leading-tight">
            {["THANK YOU", "FOR BEING THE HERO", "OF MY STORY."].map((line, idx) => (
              <motion.span
                key={idx}
                className="block"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.2, ease: "easeOut" }}
              >
                {idx === 2 ? <span className="gold-text-gradient">{line}</span> : line}
              </motion.span>
            ))}
          </h3>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.8 } : {}}
          transition={{ duration: 1.0, delay: 1.0 }}
          className="text-neutral-400 text-sm sm:text-lg font-light italic max-w-xl font-serif"
        >
          &ldquo;Some heroes wear capes. Mine simply answered to &lsquo;Dad&rsquo;.&rdquo;
        </motion.p>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900 bg-black/85 py-12 px-6 text-center space-y-4 z-10">
        <div className="flex items-center justify-center gap-1.5 text-amber-500/80 font-bold uppercase tracking-[0.2em] text-xs font-serif">
          <span>DadFlix</span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-400 font-mono tracking-widest text-[10px]">Tribute Registry</span>
        </div>
        
        <p className="text-neutral-500 text-xs tracking-wider max-w-md mx-auto leading-relaxed">
          A Lifetime of Memories. Streaming Since Day One.<br />
          All custom memories, awards, and letters are stored safely inside your browser.
        </p>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-600 font-mono">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
          <span>for the world&apos;s greatest father.</span>
        </div>
      </footer>

      {/* Styles for floating animations */}
      <style jsx global>{`
        @keyframes floatUpEnding {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-110vh) scale(0.5) translateX(30px); opacity: 0; }
        }
        @keyframes floatPhotoUp {
          0% { transform: translateY(0) rotate(5deg) scale(0.6); opacity: 0; }
          15% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { transform: translateY(-120vh) rotate(-15deg) scale(0.85); opacity: 0; }
        }
      `}</style>

    </section>
  );
}
