"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Award, Edit3, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AwardCard {
  id: string;
  category: string;
  awardName: string;
  narrative: string;
  ratingScore: string;
  starsCount: number;
}

const defaultAwards: AwardCard[] = [
  {
    id: "award-1",
    category: "Best Advice Ever Given",
    awardName: "Academy Award for Wisdom",
    narrative: "\"Listen to understand, not to respond. Never build your home on anger. Build it on forgiveness and patience, and it will weather any storm.\"",
    ratingScore: "9.9/10 Wisdom Index",
    starsCount: 5,
  },
  {
    id: "award-2",
    category: "Funniest Dad Joke",
    awardName: "Golden Globe for Comedy",
    narrative: "\"I'm reading a book on anti-gravity. I just can't seem to put it down!\" (Laughed at his own joke for 10 straight minutes).",
    ratingScore: "10/10 Groan Rating",
    starsCount: 5,
  },
  {
    id: "award-3",
    category: "Greatest Family Trip",
    awardName: "Best Adventure Feature",
    narrative: "The road trip to the lakehouse in a torrential downpour. The wipers failed, we got lost, and ended up singing camp songs inside the car till dawn.",
    ratingScore: "9.8/10 Happiness Rating",
    starsCount: 5,
  },
  {
    id: "award-4",
    category: "Most Inspiring Moment",
    awardName: "Lifetime Achievement",
    narrative: "Completing his degree at night school while working full-time. He came home exhausted but always had time to read us a bedtime story.",
    ratingScore: "10/10 Perseverance Score",
    starsCount: 5,
  },
];

export default function TopRated() {
  const [awards, setAwards] = useLocalStorage<AwardCard[]>("dadflix-awards", defaultAwards);
  const [editingAward, setEditingAward] = useState<AwardCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mouse hover coordinate tracking for spotlight cursor effect
  const [hoverStates, setHoverStates] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverStates((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleEditClick = (e: React.MouseEvent, award: AwardCard) => {
    e.stopPropagation();
    setEditingAward({ ...award });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingAward) return;
    setAwards(awards.map((a) => (a.id === editingAward.id ? editingAward : a)));
    setIsModalOpen(false);
    setEditingAward(null);
  };

  // Card reveal animation container
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: any = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-28 px-4 md:px-8 bg-black overflow-hidden z-10 select-none">
      
      {/* Background Volumetric Glow */}
      <div className="absolute left-0 bottom-1/4 w-[50vw] h-[50vw] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.04) 0%, transparent 70%) pointer-events-none filter blur-3xl" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em] mb-3"
          >
            Audience Favorites
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif tracking-wider text-white"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            DAD&apos;S TOP RATED MOMENTS
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[2px] bg-amber-500 mx-auto mt-4"
          />
        </div>

        {/* Awards Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {awards.map((award) => {
            const hoverPos = hoverStates[award.id] || { x: 0, y: 0 };
            
            return (
              <motion.div
                key={award.id}
                variants={cardVariants}
                onMouseMove={(e) => handleMouseMove(e, award.id)}
                className="relative p-8 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm group transition-all duration-300 hover:border-amber-500/35 hover:-translate-y-1.5 flex flex-col justify-between"
                style={{ minHeight: "260px" }}
              >
                
                {/* Dynamic cursor radial spotlight highlight */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 200px at ${hoverPos.x}px ${hoverPos.y}px, rgba(245, 196, 79, 0.08) 0%, transparent 80%)`,
                  }}
                />

                {/* Golden Shine sweep on hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] left-[-150%] group-hover:animate-[sweep_1.8s_ease-in-out_infinite] pointer-events-none" />

                {/* Card Top: Header and Rating */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase font-bold">
                        {award.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-extrabold text-white mt-1 uppercase font-serif tracking-wide">
                        {award.awardName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Award className="w-5 h-5 text-amber-500" />
                      <button
                        onClick={(e) => handleEditClick(e, award)}
                        className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-white transition-all cursor-pointer"
                        title="Edit Award Story"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Animated Stars list */}
                  <div className="flex items-center gap-1">
                    {[...Array(award.starsCount)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      >
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Narrative Quote */}
                  <p className="text-neutral-300 text-sm font-light leading-relaxed italic pt-2">
                    {award.narrative}
                  </p>
                </div>

                {/* Card Bottom: Score */}
                <div className="pt-6 border-t border-neutral-900/60 mt-4 flex items-center justify-between text-xs font-mono font-bold text-neutral-500">
                  <span className="tracking-widest uppercase">Verified Tribute Record</span>
                  <span className="text-amber-500/80 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                    {award.ratingScore}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Editing Modal */}
      <AnimatePresence>
        {isModalOpen && editingAward && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden text-neutral-100 cinematic-glass"
            >
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-zinc-950">
                <h3 
                  className="text-lg font-bold font-serif text-amber-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Customize Award Details
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body form */}
              <div className="p-6 space-y-5">
                
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Award Category</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none"
                    value={editingAward.category}
                    disabled
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Award Name</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      value={editingAward.awardName}
                      onChange={(e) => setEditingAward({ ...editingAward, awardName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Rating Label</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white text-center focus:outline-none transition-colors"
                      value={editingAward.ratingScore}
                      onChange={(e) => setEditingAward({ ...editingAward, ratingScore: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Narrative Story / Wisdom</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    value={editingAward.narrative}
                    onChange={(e) => setEditingAward({ ...editingAward, narrative: e.target.value })}
                  />
                </div>

              </div>

              {/* Modal controls */}
              <div className="px-6 py-4 border-t border-neutral-900 flex justify-end gap-3 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded text-xs font-bold cursor-pointer"
                  disabled={!editingAward.awardName || !editingAward.narrative}
                >
                  Save Award
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
