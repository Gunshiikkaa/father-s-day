"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Play } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
  onAudioInit: (ctx: AudioContext, gain: GainNode) => void;
}

export default function Preloader({ onComplete, onAudioInit }: PreloaderProps) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(0); // 0: enter screen, 1: presents, 2: lifetime, 3: streaming, 4: transition
  const audioCtxRef = useRef<AudioContext | null>(null);
  const clickIntervalRef = useRef<any>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const startTheatre = async () => {
    setStarted(true);
    setStage(1);

    try {
      // Initialize Web Audio API for film projector sound effects
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      // Master Gain for smooth fadeout
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 1.0);
      masterGain.connect(audioCtx.destination);
      masterGainRef.current = masterGain;

      // Share audio connection with page for ambient music
      onAudioInit(audioCtx, masterGain);

      // Create white noise buffer for projector clicks and fan noise
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      // 1. Motor Hum: Warm low-frequency sawtooth whirr
      const motorOsc = audioCtx.createOscillator();
      const motorGain = audioCtx.createGain();
      const motorFilter = audioCtx.createBiquadFilter();

      motorOsc.type = "sawtooth";
      motorOsc.frequency.setValueAtTime(85, audioCtx.currentTime); // Low motor frequency

      motorFilter.type = "lowpass";
      motorFilter.frequency.setValueAtTime(140, audioCtx.currentTime);

      motorGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

      motorOsc.connect(motorFilter);
      motorFilter.connect(motorGain);
      motorGain.connect(masterGain);
      motorOsc.start();

      // 2. Fan noise: Low-passed white noise whirring
      const fanNoise = audioCtx.createBufferSource();
      fanNoise.buffer = noiseBuffer;
      fanNoise.loop = true;
      const fanFilter = audioCtx.createBiquadFilter();
      const fanGain = audioCtx.createGain();

      fanFilter.type = "lowpass";
      fanFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
      fanGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

      fanNoise.connect(fanFilter);
      fanFilter.connect(fanGain);
      fanGain.connect(masterGain);
      fanNoise.start();

      // 3. Rhythmic Projector clicks: High-passed noise spikes at 18fps (approx. every 55ms)
      const playClick = () => {
        if (!audioCtx || audioCtx.state === "closed") return;
        
        const clickSource = audioCtx.createBufferSource();
        clickSource.buffer = noiseBuffer;

        const clickFilter = audioCtx.createBiquadFilter();
        clickFilter.type = "bandpass";
        clickFilter.frequency.value = 1200;
        clickFilter.Q.value = 4;

        const clickGain = audioCtx.createGain();
        clickGain.gain.setValueAtTime(0.07 * (0.85 + Math.random() * 0.3), audioCtx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);

        clickSource.connect(clickFilter);
        clickFilter.connect(clickGain);
        clickGain.connect(masterGain);
        clickSource.start();
      };

      clickIntervalRef.current = setInterval(playClick, 55);

    } catch (error) {
      console.warn("Audio Context failed to start:", error);
    }
  };

  useEffect(() => {
    if (!started) return;

    // Progression of cinematic text stages
    const timer1 = setTimeout(() => setStage(2), 1600);
    const timer2 = setTimeout(() => setStage(3), 3200);
    const timer3 = setTimeout(() => setStage(4), 4800);
    const timer4 = setTimeout(() => {
      // Fade out projector sound
      if (masterGainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      }
      setTimeout(() => {
        if (clickIntervalRef.current) clearInterval(clickIntervalRef.current);
        onComplete();
      }, 600);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [started, onComplete]);

  // Clean up sounds on unmount if any
  useEffect(() => {
    return () => {
      if (clickIntervalRef.current) clearInterval(clickIntervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Visual background volumetric lens glow */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(245, 196, 79, 0.03) 0%, transparent 70%) pointer-events-none" />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="enter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center px-6 max-w-lg z-10"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-amber-500 font-semibold tracking-[0.3em] text-xs md:text-sm uppercase mb-4 opacity-80"
            >
              A Netflix Original Tribute
            </motion.div>
            
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest mb-6 font-serif logo-glow text-white"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              DAD<span className="text-amber-500">FLIX</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
              Plug in headphones or turn on speakers for the best experience.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 196, 79, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={startTheatre}
              className="flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black px-8 py-4 rounded-full font-bold text-sm md:text-base tracking-wider uppercase transition-all shadow-lg shadow-amber-950/20"
            >
              <Play className="w-4 h-4 fill-black" />
              Enter Theatre
            </motion.button>
          </motion.div>
        )}

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
            {/* Shutter golden flare sweep */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 4], opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="w-96 h-96 rounded-full bg-radial-gradient(circle, rgba(245,196,79,0.3) 0%, rgba(245,196,79,0.05) 50%, transparent 70%)"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
