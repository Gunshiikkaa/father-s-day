"use client";

import { useState, useRef } from "react";
import { motion as motionFramer, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Edit2, Plus, X, Upload } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultMemories, MemoryItem } from "./defaultMemories";

interface SlidersSectionProps {
  id?: string;
}

export default function SlidersSection({ id }: SlidersSectionProps) {
  const [memories, setMemories] = useLocalStorage<MemoryItem[]>("dadflix-memories", defaultMemories);
  const [editingMemory, setEditingMemory] = useState<MemoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Group rows
  const categories = [
    "Childhood Adventures",
    "Dad's Best Lessons",
    "Family Vacations",
    "Funny Dad Moments",
    "Life's Greatest Hero",
    "Dad's Greatest Achievements",
  ];

  // Horizontally scroll a slider row
  const scroll = (category: string, direction: "left" | "right") => {
    const container = document.getElementById(`slider-${category.replace(/\s+/g, "-")}`);
    if (container) {
      const scrollAmount = window.innerWidth * 0.7;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Open modal for editing a memory
  const handleEditClick = (e: React.MouseEvent, memory: MemoryItem) => {
    e.stopPropagation();
    setEditingMemory({ ...memory });
    setUploadError("");
    setIsModalOpen(true);
  };

  // Open modal to add a new memory
  const handleAddNewClick = (category: string) => {
    const newMemory: MemoryItem = {
      id: `custom-${Date.now()}`,
      category,
      title: "",
      year: new Date().getFullYear().toString(),
      description: "",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80", // default placeholder
    };
    setEditingMemory(newMemory);
    setUploadError("");
    setIsModalOpen(true);
  };

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

  // Save memory edits
  const handleSave = () => {
    if (!editingMemory) return;

    const exists = memories.some((m) => m.id === editingMemory.id);
    if (exists) {
      setMemories(memories.map((m) => (m.id === editingMemory.id ? editingMemory : m)));
    } else {
      setMemories([...memories, editingMemory]);
    }
    setIsModalOpen(false);
    setEditingMemory(null);
  };

  // Reset a category to default settings
  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to restore default memories? This will overwrite your custom changes.")) {
      setMemories(defaultMemories);
    }
  };

  return (
    <section id={id} className="relative py-20 bg-gradient-to-b from-black via-zinc-950 to-black select-none z-10">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 
            className="text-2xl md:text-3xl font-extrabold font-serif tracking-wider text-white"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            BROWSE TRIBUTE COLLECTIONS
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-light mt-1">
            Hover cards to expand details. Click the edit icon to customize any memory with your own story.
          </p>
        </div>
        <button
          onClick={handleResetDefaults}
          className="text-xs border border-amber-500/20 hover:border-amber-500/80 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 px-4 py-2 rounded transition-all cursor-pointer font-mono"
        >
          Restore Original Stories
        </button>
      </div>

      {categories.map((category) => {
        const categoryMemories = memories.filter((m) => m.category === category);

        return (
          <div key={category} className="group relative w-full mb-16 overflow-visible">
            
            {/* Category title */}
            <h3 className="max-w-7xl mx-auto px-4 md:px-8 text-lg sm:text-xl font-semibold tracking-wide text-amber-500/90 mb-4 font-serif">
              {category}
            </h3>

            {/* Slider container wrapper */}
            <div className="relative w-full overflow-visible">
              
              {/* Navigation Left Button */}
              <button
                onClick={() => scroll(category, "left")}
                className="absolute left-0 top-0 bottom-0 w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer border-r border-amber-500/10"
              >
                <ChevronLeft className="w-8 h-8 text-amber-500" />
              </button>

              {/* Slider list */}
              <div
                id={`slider-${category.replace(/\s+/g, "-")}`}
                className="w-full flex items-stretch gap-4 overflow-x-auto overflow-y-visible px-4 md:px-8 py-4 scroll-smooth scrollbar-none"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {categoryMemories.map((memory) => (
                  <motionFramer.div
                    key={memory.id}
                    layoutId={`card-${memory.id}`}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(245, 196, 79, 0.25)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex-shrink-0 w-64 md:w-72 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden cursor-pointer group/card group-hover:scale-95 hover:!scale-100 transition-transform duration-300"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {/* Media Image Area */}
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 brightness-90 group-hover/card:brightness-100"
                        loading="lazy"
                      />
                      {/* Overlay card gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                      
                      {/* Interactive Edit Button Overlay */}
                      <button
                        onClick={(e) => handleEditClick(e, memory)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-amber-500 text-white hover:text-black border border-amber-500/20 hover:border-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 z-10 cursor-pointer"
                        title="Customize story"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Reflection / shine sweep on card hover */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] left-[-150%] group-hover/card:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />

                    {/* Card Content details */}
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center gap-2 mb-1">
                          <h4 className="text-white font-bold tracking-wide text-sm truncate uppercase font-serif">
                            {memory.title || "Untitled Memory"}
                          </h4>
                          <span className="text-amber-500 font-mono font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded">
                            {memory.year || "----"}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-3">
                          {memory.description || "Click edit to write this tribute story."}
                        </p>
                      </div>
                    </div>
                  </motionFramer.div>
                ))}

                {/* Add new memory card placeholder */}
                <button
                  onClick={() => handleAddNewClick(category)}
                  className="flex-shrink-0 w-64 md:w-72 border-2 border-dashed border-neutral-800 hover:border-amber-500/50 bg-neutral-900/30 hover:bg-amber-500/5 rounded-md flex flex-col items-center justify-center p-6 text-center group/add cursor-pointer transition-all duration-300 min-h-[220px]"
                >
                  <Plus className="w-10 h-10 text-neutral-600 group-hover/add:text-amber-500 group-hover/add:scale-110 transition-all" />
                  <span className="text-sm font-bold text-neutral-400 group-hover/add:text-amber-400 mt-3 font-serif tracking-wider uppercase">
                    Add Custom Story
                  </span>
                  <span className="text-xs text-neutral-600 group-hover/add:text-amber-500/60 mt-1 font-mono">
                    Upload your own media
                  </span>
                </button>
              </div>

              {/* Navigation Right Button */}
              <button
                onClick={() => scroll(category, "right")}
                className="absolute right-0 top-0 bottom-0 w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer border-l border-amber-500/10"
              >
                <ChevronRight className="w-8 h-8 text-amber-500" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Editing / Customization Modal */}
      <AnimatePresence>
        {isModalOpen && editingMemory && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4 bg-black/80 backdrop-blur-md">
            <motionFramer.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/30 rounded-lg shadow-2xl shadow-amber-500/5 overflow-hidden text-neutral-100 cinematic-glass"
            >
              
              {/* Modal header */}
              <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-zinc-950">
                <h3 
                  className="text-lg font-bold font-serif text-amber-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {editingMemory.title ? "Edit Tribute Memory" : "Add New Tribute Memory"}
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
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Memory Title</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      placeholder="e.g. Learning to Ride a Bike"
                      value={editingMemory.title}
                      onChange={(e) => setEditingMemory({ ...editingMemory, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Year</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white text-center focus:outline-none transition-colors"
                      placeholder="e.g. 2012"
                      value={editingMemory.year}
                      onChange={(e) => setEditingMemory({ ...editingMemory, year: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description textarea */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">The Story / Lesson</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    placeholder="Write down the detailed story, emotion, or advice Dad shared in this moment..."
                    value={editingMemory.description}
                    onChange={(e) => setEditingMemory({ ...editingMemory, description: e.target.value })}
                  />
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Cover Media (Image/Photo)</label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    
                    {/* Media Preview Box */}
                    <div className="col-span-1 aspect-video w-full rounded border border-neutral-800 overflow-hidden bg-neutral-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                          <Upload className="w-3.5 h-3.5 text-amber-500" />
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
                        Supports JPEG, PNG, or GIF. Max size 2MB for storage limits.
                      </p>
                      {uploadError && (
                        <p className="text-red-500 text-[10px] font-semibold">{uploadError}</p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Direct image link URL helper */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Or Paste Image URL</label>
                  <input
                    type="url"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2 text-xs text-white focus:outline-none transition-colors"
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
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/10 cursor-pointer"
                  disabled={!editingMemory.title || !editingMemory.description}
                >
                  Save Tribute
                </button>
              </div>

            </motionFramer.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
