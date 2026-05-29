"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioControllerProps {
  audioCtx: AudioContext | null;
  masterGain: GainNode | null;
}

export default function AudioController({ audioCtx, masterGain }: AudioControllerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const synthIntervalRef = useRef<any>(null);
  const activeOscillatorsRef = useRef<any[]>([]);
  const delayNodeRef = useRef<DelayNode | null>(null);

  // Toggle Mute Volume
  const toggleMute = () => {
    if (!masterGain || !audioCtx) return;

    if (isMuted) {
      // Unmute: ramp volume to 0.4
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.5);
      setIsMuted(false);
    } else {
      // Mute: ramp volume to 0
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      setIsMuted(true);
    }
  };

  // Synthesize soft, warm ambient pads
  useEffect(() => {
    if (!audioCtx || !masterGain) return;

    // Create a spacious feedback delay loop for reverb-like echo
    const delay = audioCtx.createDelay();
    delay.delayTime.value = 1.6; // 1.6s echo

    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.5; // 50% feedback decay

    // Connect delay feedback loop
    delay.connect(feedback);
    feedback.connect(delay);

    // Route delay to master gain
    delay.connect(masterGain);
    delayNodeRef.current = delay;

    // Chord progressions: beautiful ambient notes in A minor/C major scale
    // Frequencies (Hz): 
    // Am: A2(110), C3(130.8), E3(164.8), A3(220)
    // Fmaj7: F2(87.3), C3(130.8), E3(164.8), A3(220)
    // Cmaj7: C2(65.4), G2(98), C3(130.8), E3(164.8)
    // G: G2(98), B2(123.5), D3(146.8), G3(196)
    const chords = [
      [110, 164.8, 220, 261.6], // Am7
      [87.3, 130.8, 164.8, 220], // Fmaj7
      [130.8, 164.8, 196, 261.6], // Cmaj7
      [98, 146.8, 196, 246.9],    // G6
    ];

    let chordIndex = 0;

    const playAmbientChord = () => {
      if (!audioCtx || audioCtx.state === "closed") return;

      const currentChord = chords[chordIndex];
      const now = audioCtx.currentTime;

      // Stop old notes slowly
      activeOscillatorsRef.current.forEach((oscData) => {
        const { osc, gain } = oscData;
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0); // 4-second fade out
          setTimeout(() => {
            try { osc.stop(); } catch (e) {}
          }, 4500);
        } catch (e) {}
      });
      activeOscillatorsRef.current = [];

      // Create new oscillators for the new chord
      const newOscs = currentChord.map((freq) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        const lowpass = audioCtx.createBiquadFilter();

        // Warm triangle wave
        osc.type = "triangle";
        // Slightly detune to create lush analog chorus effect
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.8 - 0.4), now);

        // Lowpass filter to keep notes warm and dark
        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(300 + Math.random() * 100, now);

        // Slow fade in (6 seconds)
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.045, now + 5.0);

        osc.connect(lowpass);
        lowpass.connect(oscGain);
        
        // Connect to master output and the delay line
        oscGain.connect(masterGain);
        if (delayNodeRef.current) {
          oscGain.connect(delayNodeRef.current);
        }

        osc.start(now);
        return { osc, gain: oscGain };
      });

      activeOscillatorsRef.current = newOscs;
      chordIndex = (chordIndex + 1) % chords.length;
    };

    // Trigger first chord and schedule interval
    playAmbientChord();
    synthIntervalRef.current = setInterval(playAmbientChord, 10000); // changes chord every 10 seconds

    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      // Clean up oscillators
      activeOscillatorsRef.current.forEach((oscData) => {
        try { oscData.osc.stop(); } catch (e) {}
      });
    };
  }, [audioCtx, masterGain]);

  return (
    <div className="fixed bottom-6 right-6 z-[990] select-none flex items-center gap-3">
      
      {/* Floating control button */}
      <button
        onClick={toggleMute}
        className="flex items-center justify-center p-3 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-amber-500/25 hover:border-amber-500 text-amber-500 transition-all cursor-pointer shadow-lg shadow-black/60 hover:scale-105 active:scale-95"
        title={isMuted ? "Unmute Theatre Sound" : "Mute Sound"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <div className="flex items-center gap-1">
            <Volume2 className="w-5 h-5" />
            
            {/* Animated Audio Wave Spectrum Bars */}
            <div className="flex items-end gap-[2px] h-4 ml-1">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
              <span className="bar bar-4" />
              <span className="bar bar-5" />
            </div>
          </div>
        )}
      </button>
      
    </div>
  );
}
