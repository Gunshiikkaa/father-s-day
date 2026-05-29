"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  avatarGradient: string;
  borderColor: string;
  glowColor: string;
  initial: string;
  role: string;
  icon?: any;
}

interface ProfileSelectorProps {
  onSelect: (profile: Profile) => void;
}

export const PROFILES: Profile[] = [
  {
    id: "dad",
    name: "Dad",
    avatarGradient: "from-red-600 via-red-500 to-amber-500",
    borderColor: "border-red-500",
    glowColor: "rgba(229, 9, 20, 0.4)",
    initial: "D",
    role: "The G.O.A.T. 👑",
    icon: Crown,
  },
  {
    id: "me",
    name: "Me",
    avatarGradient: "from-blue-600 via-indigo-500 to-violet-500",
    borderColor: "border-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    initial: "M",
    role: "The Creator 🚀",
    icon: Sparkles,
  },
];

export default function ProfileSelector({ onSelect }: ProfileSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (profile: Profile) => {
    setSelectedId(profile.id);
    // Let the animation play before revealing the dashboard
    setTimeout(() => {
      onSelect(profile);
    }, 1300);
  };

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen bg-black flex flex-col justify-center items-center z-[9999] select-none overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-neutral-900/5 to-red-900/5 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence>
        {selectedId === null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="flex flex-col items-center justify-center space-y-10 px-4 z-10"
          >
            {/* Header Title */}
            <div className="text-center space-y-3">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl sm:text-5xl font-extrabold tracking-wide text-white"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Who's watching?
              </motion.h1>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-neutral-400 text-xs sm:text-sm tracking-widest font-mono uppercase"
              >
                Choose a profile to start streaming memories
              </motion.p>
            </div>

            {/* Profile Grid (Exactly 2 Profiles: Dad and Me) */}
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 py-4">
              {PROFILES.map((profile, index) => {
                const Icon = profile.icon;
                return (
                  <motion.div
                    key={profile.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center space-y-4 group cursor-pointer"
                    onClick={() => handleSelect(profile)}
                  >
                    {/* Avatar Container */}
                    <div className="relative">
                      {/* Interactive Hover Glow Outline */}
                      <div
                        className={`absolute -inset-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`}
                        style={{ backgroundColor: profile.glowColor }}
                      />

                      {/* Avatar Square */}
                      <div
                        className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg bg-gradient-to-tr ${profile.avatarGradient} flex items-center justify-center font-bold text-4xl sm:text-5xl text-black border-2 border-transparent group-hover:border-white transition-all duration-300 overflow-hidden shadow-2xl scale-95 group-hover:scale-105 active:scale-95`}
                      >
                        {profile.initial}

                        {/* Shine Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:animate-[sweep_1s_ease-in-out_infinite]" />

                        {/* Top corner role badge */}
                        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] text-white flex items-center gap-1 font-mono tracking-widest uppercase border border-neutral-700/30">
                          {Icon && <Icon className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />}
                          {profile.name}
                        </div>
                      </div>
                    </div>

                    {/* Name Label */}
                    <div className="text-center">
                      <span className="block text-neutral-400 group-hover:text-white transition-colors duration-300 font-bold text-sm sm:text-base tracking-wide font-sans">
                        {profile.name}
                      </span>
                      <span className="block text-[10px] sm:text-xs text-neutral-500 font-mono tracking-widest uppercase mt-0.5">
                        {profile.role}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Manage Profiles Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-6 py-2 border border-neutral-700 hover:border-white text-neutral-500 hover:text-white bg-transparent rounded text-xs sm:text-sm uppercase tracking-[0.2em] font-mono transition-colors duration-300 cursor-pointer"
            >
              Manage Profiles
            </motion.button>
          </motion.div>
        ) : (
          /* Animated Cinematic Profile Transition Zoom */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center space-y-6 z-50 absolute"
          >
            {PROFILES.filter((p) => p.id === selectedId).map((profile) => (
              <div key={profile.id} className="flex flex-col items-center space-y-6">
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{
                    scale: [1, 1.1, 80],
                    opacity: [1, 1, 0],
                    rotate: [0, 2, -5],
                  }}
                  transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
                  className={`w-28 h-28 sm:w-36 sm:h-36 rounded-lg bg-gradient-to-tr ${profile.avatarGradient} flex items-center justify-center font-bold text-4xl sm:text-5xl text-black border-2 border-white shadow-2xl overflow-hidden`}
                >
                  {profile.initial}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="text-white text-xl sm:text-2xl font-bold tracking-wide"
                >
                  Entering {profile.name}'s DadFlix...
                </motion.h2>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
