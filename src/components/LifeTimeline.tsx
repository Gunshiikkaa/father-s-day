"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Edit, X, Upload } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Milestone {
  id: string;
  label: string;
  year: string;
  title: string;
  description: string;
  image: string;
}

const defaultMilestones: Milestone[] = [
  {
    id: "milestone-1",
    label: "First Steps",
    year: "1999",
    title: "Learning to Walk",
    description: "Holding onto my tiny hands, guiding me across the living room carpet. You were there, cheering me on, ready to catch me if I fell. You've been my safety net ever since.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "milestone-2",
    label: "School Days",
    year: "2006",
    title: "The Science Fair Volcano",
    description: "Spending three nights in the garage building a messy baking-soda volcano. We ruined the garage workbench and got vinegar everywhere, but the second-place ribbon was pure gold to us.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "milestone-3",
    label: "Family Memories",
    year: "2012",
    title: "Building the Blanket Fort",
    description: "The rainy Sunday we spent building a massive blanket fort in the family room. We watched old films on a tiny screen and ate popcorn. You showed me that joy doesn't require a ticket.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "milestone-4",
    label: "Milestones",
    year: "2018",
    title: "Leaving for University",
    description: "Helping me load cardboard boxes into the dorm room in the sweltering August heat. Before you drove off, you gave me a firm hug, cleared your throat, and whispered: 'You've got this.'",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "milestone-5",
    label: "Today",
    year: "2026",
    title: "A Shared Reflection",
    description: "Standing here today, seeing your wisdom, courage, and unconditional love reflected in my own life. The chapters keep compiling, but you will always be my primary hero.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
}

export default function LifeTimeline() {
  const [milestones, setMilestones] = useLocalStorage<Milestone[]>("dadflix-timeline", defaultMilestones);
  const [activeIndex, setActiveIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate particle explosion from clicked coordinates
  const triggerParticles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const colors = ["#f5c44f", "#ffe58f", "#d4af37", "#b8860b", "#ffa500"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: Math.random() + i,
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);

    // Clean up particles
    setTimeout(() => {
      setParticles([]);
    }, 1200);
  };

  const handleMilestoneClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveIndex(index);
    triggerParticles(e);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMilestone({ ...milestones[activeIndex] });
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be smaller than 2MB for browser local storage.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (editingMilestone && typeof reader.result === "string") {
        setEditingMilestone({ ...editingMilestone, image: reader.result });
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!editingMilestone) return;
    const updated = milestones.map((m, idx) => (idx === activeIndex ? editingMilestone : m));
    setMilestones(updated);
    setIsModalOpen(false);
    setEditingMilestone(null);
  };

  const activeMilestone = milestones[activeIndex];

  return (
    <section className="relative py-28 px-4 md:px-8 bg-zinc-950/60 backdrop-blur-sm overflow-hidden z-10 select-none">
      
      {/* Background radial highlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.03) 0%, transparent 70%) pointer-events-none filter blur-3xl" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-extrabold font-serif tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            INTERACTIVE LIFE TIMELINE
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[2px] bg-amber-500 mx-auto mt-3"
          />
        </div>

        {/* Timeline Bar Journey */}
        <div className="relative w-full mb-20 px-6">
          {/* Background horizontal line */}
          <div className="absolute top-[18px] left-8 right-8 h-[3px] bg-neutral-800 rounded-full z-0" />
          
          {/* Active highlighted horizontal line */}
          <motion.div 
            className="absolute top-[18px] left-8 h-[3px] bg-gradient-to-r from-amber-600 to-amber-400 rounded-full z-0"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeIndex / (milestones.length - 1)) * 94}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Milestone checkpoints */}
          <div className="relative flex justify-between items-start w-full z-10">
            {milestones.map((milestone, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx <= activeIndex;

              return (
                <div key={milestone.id} className="flex flex-col items-center group/node">
                  
                  {/* Clickable Circle Node */}
                  <button
                    onClick={(e) => handleMilestoneClick(idx, e)}
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer shadow-lg
                      ${isActive 
                        ? "bg-black border-amber-500 scale-125 ring-4 ring-amber-500/25" 
                        : isPassed 
                          ? "bg-amber-500 border-amber-600 hover:scale-110" 
                          : "bg-neutral-900 border-neutral-700 hover:border-neutral-500 hover:scale-110"
                      }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300
                      ${isActive 
                        ? "bg-amber-500 animate-pulse" 
                        : isPassed 
                          ? "bg-black" 
                          : "bg-transparent"
                      }`} 
                    />
                  </button>

                  {/* Node labels */}
                  <span 
                    className={`mt-4 text-xs font-serif tracking-widest uppercase transition-all duration-300 font-bold whitespace-nowrap
                      ${isActive 
                        ? "text-amber-500 scale-105" 
                        : isPassed 
                          ? "text-white" 
                          : "text-neutral-500 group-hover/node:text-neutral-300"
                      }`}
                  >
                    {milestone.label}
                  </span>
                  
                  {/* Node Year */}
                  <span className={`text-[10px] font-mono tracking-widest font-bold mt-1 transition-all duration-300
                    ${isActive ? "text-amber-400" : "text-neutral-600"}`}>
                    {milestone.year}
                  </span>

                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Display Box */}
        <AnimatePresence mode="wait">
          {activeMilestone && (
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-neutral-950/80 border border-neutral-800 rounded-lg p-6 md:p-8 cinematic-glass"
            >
              
              {/* Milestone cover image */}
              <div className="md:col-span-5 relative group overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 aspect-video md:aspect-[4/3] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMilestone.image}
                  alt={activeMilestone.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
              </div>

              {/* Milestone Details */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs font-mono">
                    Milestone Tribute
                  </span>
                  <span className="h-4 w-[1px] bg-neutral-800" />
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>{activeMilestone.year}</span>
                  </div>
                </div>

                <h3 
                  className="text-2xl md:text-3xl font-extrabold tracking-wide text-white uppercase font-serif"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {activeMilestone.title || "Untitled Milestone"}
                </h3>

                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  &ldquo;{activeMilestone.description || "Write this milestone description by clicking edit."}&rdquo;
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-1.5 bg-neutral-900 hover:bg-amber-500 border border-amber-500/20 hover:border-transparent text-white hover:text-black font-bold text-xs tracking-wider uppercase px-4 py-2 rounded transition-all cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Milestone
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Particle Explosion Canvas Overlay */}
      <AnimatePresence>
        {particles.length > 0 && (
          <div className="fixed inset-0 w-full h-full pointer-events-none z-[999] overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: p.x, 
                  y: p.y, 
                  scale: 1, 
                  opacity: 0.8 
                }}
                animate={{ 
                  x: p.x + Math.cos(p.angle) * p.speed * 25, 
                  y: p.y + Math.sin(p.angle) * p.speed * 25 + 50, // slightly affected by gravity
                  scale: 0.1, 
                  opacity: 0 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Timeline Customization Modal */}
      <AnimatePresence>
        {isModalOpen && editingMilestone && (
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
                  Edit Timeline Milestone
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body form */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Milestone Title</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      value={editingMilestone.title}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Year</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white text-center focus:outline-none transition-colors"
                      value={editingMilestone.year}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Detailed Narrative</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    value={editingMilestone.description}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Upload Photo</label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-1 aspect-video w-full rounded border border-neutral-800 overflow-hidden bg-neutral-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingMilestone.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white px-3 py-2.5 rounded transition-all cursor-pointer border border-neutral-700"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-500" />
                        Choose Image
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      {uploadError && (
                        <p className="text-red-500 text-[10px] font-semibold">{uploadError}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Or Paste Image URL</label>
                  <input
                    type="url"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2 text-xs text-white focus:outline-none"
                    placeholder="https://example.com/photo.jpg"
                    value={editingMilestone.image.startsWith("data:") ? "" : editingMilestone.image}
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditingMilestone({ ...editingMilestone, image: e.target.value });
                        setUploadError("");
                      }
                    }}
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
                  disabled={!editingMilestone.title || !editingMilestone.description}
                >
                  Save Milestone
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
