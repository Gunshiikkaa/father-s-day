"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Edit3, X, Save } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const defaultLetter = 
`Dear Dad,

Thank you for every sacrifice,
every lesson,
and every moment you've been there.

You have taught me what it means to be strong,
to be kind, and to love unconditionally.
I am who I am today because of you.

Happy Father's Day.`;

export default function QuoteAndLetter() {
  const [customLetter, setCustomLetter] = useLocalStorage<string>("dadflix-custom-letter", defaultLetter);
  const [isEditing, setIsEditing] = useState(false);
  const [editorText, setEditorText] = useState(customLetter);

  // Typewriter display states
  const [typedText, setTypedText] = useState("");
  const [typeKey, setTypeKey] = useState(0); // Key to force restart typing animation

  // InView triggers
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  const letterRef = useRef<HTMLDivElement>(null);
  const letterInView = useInView(letterRef, { once: true, margin: "-100px" });

  // Typewriter effect logic
  useEffect(() => {
    if (!letterInView) return;
    
    setTypedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < customLetter.length) {
        // Handle slice safely
        setTypedText(customLetter.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45); // Adjust typing speed here (ms per character)

    return () => clearInterval(interval);
  }, [customLetter, letterInView, typeKey]);

  const handleEditClick = () => {
    setEditorText(customLetter);
    setIsEditing(true);
  };

  const handleSave = () => {
    setCustomLetter(editorText);
    setIsEditing(false);
    setTypeKey((prev) => prev + 1); // Trigger typewriter restart
  };

  // Split quote text for sequential word-by-word reveal
  const quoteText = "A father is someone you look up to no matter how tall you grow.";
  const quoteWords = quoteText.split(" ");

  return (
    <div className="relative w-full overflow-hidden bg-black select-none z-10">
      
      {/* 1. EMOTIONAL QUOTE SECTION */}
      <section 
        ref={quoteRef}
        className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center px-4 md:px-8 border-b border-neutral-950"
      >
        {/* Soft volumetric spotlight centered on quote */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.05) 0%, rgba(255, 140, 0, 0.01) 60%, transparent 80%) pointer-events-none filter blur-3xl z-0" />

        {/* Ambient rising CSS dust particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-500/20 rounded-full blur-[1px]"
              style={{
                top: `${80 + Math.random() * 20}%`,
                left: `${10 + Math.random() * 80}%`,
                animation: `floatUpSlow ${10 + Math.random() * 15}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl text-center z-10 space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={quoteInView ? { scale: 1, opacity: 0.7 } : {}}
            transition={{ duration: 1.0 }}
            className="text-amber-500 font-mono tracking-[0.4em] uppercase text-xs sm:text-sm font-bold"
          >
            Tribute Citation
          </motion.div>

          <h2 
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide leading-tight text-white font-serif"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {quoteWords.map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-3 md:mr-4"
                initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
                animate={quoteInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.1, 
                  ease: "easeOut" 
                }}
              >
                {word === "look" || word === "up" || word === "tall" ? (
                  <span className="gold-text-gradient">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={quoteInView ? { opacity: 0.4 } : {}}
            transition={{ delay: 1.8, duration: 1.0 }}
            className="text-neutral-500 font-light text-xs tracking-wider uppercase font-mono pt-4"
          >
            — Author Unknown
          </motion.div>
        </div>
      </section>

      {/* 2. PERSONAL LETTER SECTION */}
      <section 
        ref={letterRef}
        className="relative w-full min-h-screen py-24 flex flex-col justify-center items-center px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950 to-black border-b border-neutral-950"
      >
        <div className="max-w-3xl w-full z-10 flex flex-col items-center">
          
          <div className="text-center mb-10">
            <h3 
              className="text-2xl md:text-3xl font-extrabold font-serif text-white tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              A PERSONAL TRIBUTE LETTER
            </h3>
            <p className="text-xs text-neutral-500 mt-2 font-mono uppercase tracking-wider">
              Write a personalized note to show him how much he means
            </p>
          </div>

          {/* Letter Container with Lined Paper Styling */}
          <motion.div
            initial={{ y: 50, opacity: 0, rotate: -1 }}
            animate={letterInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 1.0, type: "spring", bounce: 0.2 }}
            className="relative w-full max-w-2xl min-h-[450px] bg-[#faf6eb] text-neutral-800 p-8 sm:p-12 md:p-16 rounded-md shadow-2xl border-l-[6px] border-amber-500/70 overflow-hidden"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 196, 79, 0.05)",
            }}
          >
            {/* Paper Texture Background */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Notebook margins and lines */}
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-[1px] bg-red-400/40 pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(160,190,220,0.15) 27px, rgba(160,190,220,0.15) 28px)",
                backgroundSize: "100% 28px",
                lineHeight: "28px",
                paddingTop: "24px"
              }}
            />

            {/* Handwritten Text */}
            <div 
              className="relative z-10 pl-6 sm:pl-10 font-medium text-lg sm:text-xl text-neutral-800 whitespace-pre-wrap leading-[28px] mt-2 select-text"
              style={{ 
                fontFamily: "var(--font-caveat), cursive", 
                color: "#1c2833",
                textShadow: "0.5px 0.5px 0.5px rgba(0,0,0,0.05)"
              }}
            >
              {typedText}
              
              {/* Typewriter Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-5 bg-amber-600/80 ml-1 translate-y-0.5"
              />
            </div>
            
            {/* Ink Writing Blur Vignette Filter */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neutral-900/5 pointer-events-none" />
          </motion.div>

          {/* Letter Editor Controls */}
          <div className="mt-8 flex justify-center z-20">
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-amber-500 border border-amber-500/20 hover:border-transparent text-white hover:text-black font-bold text-xs tracking-wider uppercase px-5 py-3 rounded transition-all cursor-pointer shadow-lg"
            >
              <Edit3 className="w-4 h-4" />
              Write Your Own Letter
            </button>
          </div>

        </div>
      </section>

      {/* Letter Customization Drawer Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden text-neutral-100 cinematic-glass"
            >
              <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-zinc-950">
                <h3 
                  className="text-lg font-bold font-serif text-amber-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Write Your Personal Tribute
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-neutral-400">
                  Compose a heartfelt letter to your dad. When saved, it will typewriter-animate on the parchment paper.
                </p>
                <textarea
                  rows={10}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-4 text-sm text-white focus:outline-none transition-colors font-mono leading-relaxed"
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Dear Dad, ..."
                />
              </div>

              <div className="px-6 py-4 border-t border-neutral-900 flex justify-end gap-3 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded text-xs font-bold cursor-pointer shadow-lg"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes floatUpSlow {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) scale(0.6) rotate(360deg); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
