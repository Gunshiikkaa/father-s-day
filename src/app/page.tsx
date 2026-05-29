"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import ProfileSelector from "@/components/ProfileSelector";
import MemoryCanvas from "@/components/MemoryCanvas";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SlidersSection from "@/components/SlidersSection";
import TopRated from "@/components/TopRated";
import MemoryWall from "@/components/MemoryWall";
import CinematicEnding from "@/components/CinematicEnding";
import AudioController from "@/components/AudioController";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<any>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [masterGain, setMasterGain] = useState<GainNode | null>(null);

  // Capture Audio Context from preloader button activation
  const handleAudioInit = (ctx: AudioContext, gain: GainNode) => {
    setAudioCtx(ctx);
    setMasterGain(gain);
  };

  // Scroll smoothly to sliders section
  const handleScrollToSliders = () => {
    const sliderSection = document.getElementById("memories-sliders");
    if (sliderSection) {
      sliderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {showPreloader ? (
        <Preloader 
          onComplete={() => setShowPreloader(false)} 
        />
      ) : !currentProfile ? (
        <ProfileSelector 
          onSelect={(profile, ctx, gain) => {
            if (ctx && gain) {
              setAudioCtx(ctx);
              setMasterGain(gain);
            }
            setCurrentProfile(profile);
          }} 
        />
      ) : (
        <>
          {/* Real-time Three.js 3D background behind content */}
          <MemoryCanvas />

          {/* Foreground page content */}
          <div className="relative z-10 w-full flex flex-col">
            
            {/* Sticky Navigation Header */}
            <Header currentProfile={currentProfile} onProfileChange={setCurrentProfile} />

            {/* Hero Header */}
            <Hero onStartClick={handleScrollToSliders} />

            {/* Netflix-style horizontal row sliders */}
            <SlidersSection id="memories-sliders" />

            {/* Top Rated moments row (Top 4 Hits) */}
            <TopRated />

            {/* Infinite memory masonry gallery */}
            <MemoryWall />

            {/* Sunset Cinematic climax and Footer */}
            <CinematicEnding audioCtx={audioCtx} masterGain={masterGain} />

          </div>

          {/* Sound controller toggle in the corner */}
          <AudioController audioCtx={audioCtx} masterGain={masterGain} />
        </>
      )}
    </div>
  );
}
