"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, X, Upload } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultMemories, MemoryItem } from "./defaultMemories";

export default function TopRated() {
  const [memories, setMemories] = useLocalStorage<MemoryItem[]>("dadflix-memories", defaultMemories);
  const [editingMemory, setEditingMemory] = useState<MemoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Take top 4 memories to display
  const top4Memories = memories.slice(0, 4);

  // Handle local file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be smaller than 2MB for browser local storage.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (editingMemory && typeof reader.result === "string") {
        setEditingMemory({ ...editingMemory, image: reader.result });
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  // Open modal for editing a memory
  const handleEditClick = (e: React.MouseEvent, memory: MemoryItem) => {
    e.stopPropagation();
    setEditingMemory({ ...memory });
    setUploadError("");
    setIsModalOpen(true);
  };

  // Save memory edits
  const handleSave = () => {
    if (!editingMemory) return;
    setMemories(memories.map((m) => (m.id === editingMemory.id ? editingMemory : m)));
    setIsModalOpen(false);
    setEditingMemory(null);
  };

  return (
    <section className="relative pt-4 pb-2 bg-black select-none z-10">
      
      {/* Background soft red glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-radial-gradient(circle, rgba(229, 9, 20, 0.03) 0%, transparent 70%) pointer-events-none filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <h2 
          className="text-lg md:text-xl font-bold font-sans tracking-wide text-white mb-3 uppercase"
          style={{ color: "#e5e5e5" }}
        >
          Top 4 Hits in Hearts Today
        </h2>

        {/* Top 4 Horizontal Grid/Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none snap-x pointer-events-auto">
          {top4Memories.map((memory, index) => {
            const displayRank = index + 1;
            
            return (
              <div 
                key={memory.id}
                className="relative flex items-center shrink-0 w-60 sm:w-80 h-44 sm:h-56 snap-start overflow-visible group"
              >
                {/* 1. Giant Outline Number */}
                <span 
                  className="absolute left-0 bottom-0 select-none font-black text-[180px] sm:text-[230px] leading-[0.7] tracking-tighter text-transparent font-sans z-0"
                  style={{
                    WebkitTextStroke: "4px rgba(89, 89, 89, 0.85)",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontWeight: 900
                  }}
                >
                  {displayRank}
                </span>

                {/* 2. Portrait Poster Card */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  onClick={(e) => handleEditClick(e, memory)}
                  className="relative ml-24 sm:ml-32 w-28 sm:w-36 h-40 sm:h-52 bg-neutral-900 border border-neutral-800 rounded overflow-hidden shadow-2xl z-10 transition-transform duration-300 pointer-events-auto cursor-pointer"
                >
                  {/* Poster Image */}
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover brightness-[0.8] group-hover:brightness-95 transition-all duration-700" 
                    loading="lazy"
                  />

                  {/* Gradient Fade overlay at bottom of poster */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                  {/* Edit Icon Button Overlay */}
                  <button
                    onClick={(e) => handleEditClick(e, memory)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white border border-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
                    title="Customize story"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>

                  {/* Text Title Overlay */}
                  <div className="absolute bottom-6 left-0 right-0 px-2 z-20 text-center">
                    <h3 
                      className="text-white font-extrabold tracking-wider text-[10px] sm:text-xs uppercase font-serif line-clamp-2"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {memory.title}
                    </h3>
                  </div>

                  {/* "Recently Added" bottom banner */}
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 py-1 text-center z-20">
                    <span className="text-[8px] sm:text-[9px] font-black tracking-widest text-white uppercase font-sans">
                      Recently added
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Editing / Customization Modal */}
      <AnimatePresence>
        {isModalOpen && editingMemory && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-red-500/30 rounded-lg shadow-2xl shadow-red-500/5 overflow-hidden text-neutral-100 cinematic-glass"
            >
              
              {/* Modal header */}
              <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-zinc-950">
                <h3 
                  className="text-lg font-bold font-serif text-red-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Edit Top Rated Memory
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body form */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                
                {/* Title and Year inputs */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase font-mono tracking-widest text-red-500/70 mb-2">Memory Title</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      placeholder="e.g. Learning to Ride a Bike"
                      value={editingMemory.title}
                      onChange={(e) => setEditingMemory({ ...editingMemory, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-red-500/70 mb-2">Year</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-500 rounded p-2.5 text-sm text-white text-center focus:outline-none transition-colors"
                      placeholder="e.g. 2012"
                      value={editingMemory.year}
                      onChange={(e) => setEditingMemory({ ...editingMemory, year: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description textarea */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-red-500/70 mb-2">The Story / Lesson</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    placeholder="Write down the detailed story..."
                    value={editingMemory.description}
                    onChange={(e) => setEditingMemory({ ...editingMemory, description: e.target.value })}
                  />
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-red-500/70 mb-2">Cover Media (Image/Photo)</label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    
                    {/* Media Preview Box */}
                    <div className="col-span-1 aspect-video w-full rounded border border-neutral-800 overflow-hidden bg-neutral-900 relative">
                      <img
                        src={editingMemory.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Uploader Trigger */}
                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white px-3 py-2.5 rounded transition-all cursor-pointer border border-neutral-700"
                        >
                          Choose Image File
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-[10px] text-neutral-500 leading-normal">
                        Supports JPEG, PNG, or GIF. Max size 2MB.
                      </p>
                      {uploadError && (
                        <p className="text-red-500 text-[10px] font-semibold">{uploadError}</p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Direct image link URL helper */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-red-500/70 mb-2">Or Paste Image URL</label>
                  <input
                    type="url"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-500 rounded p-2 text-xs text-white focus:outline-none transition-colors"
                    placeholder="https://example.com/photo.jpg"
                    value={editingMemory.image.startsWith("data:") ? "" : editingMemory.image}
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditingMemory({ ...editingMemory, image: e.target.value });
                        setUploadError("");
                      }
                    }}
                  />
                </div>

              </div>

              {/* Modal footer controls */}
              <div className="px-6 py-4 border-t border-neutral-900 flex justify-end gap-3 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded text-xs font-bold transition-all cursor-pointer"
                  disabled={!editingMemory.title || !editingMemory.description}
                >
                  Save Changes
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
