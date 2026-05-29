"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload, ZoomIn, Eye } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface WallItem {
  id: string;
  type: "polaroid" | "classic";
  title: string;
  year: string;
  caption: string;
  image: string;
}

export const defaultWallItems: WallItem[] = [
  {
    id: "wall-1",
    type: "polaroid",
    title: "Summer of '84",
    year: "1984",
    caption: "A vintage snapshot of Dad before life became busy, full of energy and big dreams.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "wall-2",
    type: "classic",
    title: "First Christmas Together",
    year: "1999",
    caption: "Holding me in front of the giant pine tree, shielding me from the winter breeze.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "wall-3",
    type: "polaroid",
    title: "Fixing the Old Chevrolet",
    year: "1992",
    caption: "Grease-stained hands, mechanical maps, and that wide, proud smile after the engine roared to life.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "wall-4",
    type: "classic",
    title: "Teaching Me to Swim",
    year: "2005",
    caption: "Splashing in the deep end. You let me float but never let go of my shoulders.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "wall-5",
    type: "polaroid",
    title: "Priceless Napping",
    year: "2015",
    caption: "Fallen fast asleep on the lazy chair with a history book resting on his chest.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "wall-6",
    type: "classic",
    title: "Summertime Fishing Pier",
    year: "2008",
    caption: "Waiting for a bite. Hours of silence, yet it was the best conversation we ever had.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
  },
];

export default function MemoryWall() {
  const [items, setItems] = useLocalStorage<WallItem[]>("dadflix-wall-items", defaultWallItems);
  const [selectedItem, setSelectedItem] = useState<WallItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New item upload states
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newType, setNewType] = useState<"polaroid" | "classic">("polaroid");
  const [newImage, setNewImage] = useState("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be smaller than 2MB for storage limits.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setNewImage(reader.result);
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    if (!newTitle || !newCaption) return;

    const newItem: WallItem = {
      id: `wall-${Date.now()}`,
      type: newType,
      title: newTitle,
      year: newYear || new Date().getFullYear().toString(),
      caption: newCaption,
      image: newImage,
    };

    setItems([newItem, ...items]);
    setIsUploadOpen(false);
    
    // Reset form states
    setNewTitle("");
    setNewYear("");
    setNewCaption("");
    setNewType("polaroid");
    setNewImage("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80");
  };

  // Split items into 3 columns dynamically for masonry grid
  const col1 = items.filter((_, idx) => idx % 3 === 0);
  const col2 = items.filter((_, idx) => idx % 3 === 1);
  const col3 = items.filter((_, idx) => idx % 3 === 2);

  return (
    <section className="relative py-28 px-4 md:px-8 bg-zinc-950/40 backdrop-blur-sm overflow-hidden z-10 select-none">
      
      {/* Background spotlights */}
      <div className="absolute right-0 top-1/3 w-[50vw] h-[50vw] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.03) 0%, transparent 70%) pointer-events-none filter blur-3xl" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <div>
            <h2 
              className="text-2xl md:text-3xl font-extrabold font-serif tracking-wider text-white uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              MEMORIES GALLERY WALL
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-light mt-1">
              An infinite masonry collection of vintage photos, Polaroid captures, and family cards.
            </p>
          </div>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs md:text-sm tracking-wider uppercase px-5 py-3 rounded shadow-lg transition-all hover:scale-105 cursor-pointer font-sans"
          >
            <Plus className="w-4 h-4 text-black font-bold" />
            Add To Gallery
          </button>
        </div>

        {/* Masonry Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
          {[col1, col2, col3].map((column, colIdx) => (
            <div key={colIdx} className="space-y-6">
              {column.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`wall-item-${item.id}`}
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.025,
                    boxShadow: "0 15px 35px rgba(245, 196, 79, 0.15)"
                  }}
                  className={`cursor-pointer overflow-hidden border border-neutral-800 rounded-lg group select-none transition-all duration-300
                    ${item.type === "polaroid" 
                      ? "bg-stone-100 p-4 pb-8 text-neutral-800 border-stone-200" 
                      : "bg-neutral-900 border-neutral-800"
                    }`}
                >
                  {/* Photo content container */}
                  <div className="relative overflow-hidden aspect-[4/3] rounded-sm bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
                      loading="lazy"
                    />
                    
                    {/* Hover magnifying eye indicator */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className={`w-8 h-8 ${item.type === "polaroid" ? "text-white" : "text-amber-500"}`} />
                    </div>
                  </div>

                  {/* Caption & Metadata description bottom */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 
                        className={`text-sm font-bold tracking-wide uppercase truncate
                          ${item.type === "polaroid" 
                            ? "font-serif text-stone-900" 
                            : "font-serif text-white"
                          }`}
                        style={item.type === "polaroid" ? { fontFamily: "var(--font-caveat), cursive", fontSize: "1.25rem", textTransform: "none" } : {}}
                      >
                        {item.title}
                      </h4>
                      <span 
                        className={`text-[10px] font-mono font-bold
                          ${item.type === "polaroid" ? "text-stone-500" : "text-amber-500"}`}
                      >
                        {item.year}
                      </span>
                    </div>
                    <p 
                      className={`text-xs font-light leading-normal line-clamp-2
                        ${item.type === "polaroid" 
                          ? "text-stone-600 font-medium" 
                          : "text-neutral-400"
                        }`}
                      style={item.type === "polaroid" ? { fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem", lineHeight: "1.2" } : {}}
                    >
                      {item.caption}
                    </p>
                  </div>

                </motion.div>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Cinematic Preview Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div 
            className="fixed inset-0 w-full h-full flex items-center justify-center z-[1100] p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              layoutId={`wall-item-${selectedItem.id}`}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-2xl w-full rounded-lg overflow-hidden border shadow-2xl flex flex-col items-center justify-center p-4 md:p-6
                ${selectedItem.type === "polaroid" 
                  ? "bg-stone-50 border-stone-200 text-neutral-800 pb-12" 
                  : "bg-neutral-950 border-amber-500/20 text-neutral-100 cinematic-glass"
                }`}
            >
              
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-neutral-800 text-white rounded-full transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-neutral-900/10 shadow-inner bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text content details */}
              <div className="w-full mt-6 text-center max-w-lg space-y-3">
                <div className="flex justify-center items-center gap-3">
                  <h3 
                    className="text-2xl font-bold tracking-wide uppercase"
                    style={{ 
                      fontFamily: selectedItem.type === "polaroid" ? "var(--font-caveat), cursive" : "var(--font-cinzel), serif",
                      textTransform: selectedItem.type === "polaroid" ? "none" : "uppercase",
                      fontSize: selectedItem.type === "polaroid" ? "2rem" : "1.5rem",
                      color: selectedItem.type === "polaroid" ? "#1a252f" : "#fff"
                    }}
                  >
                    {selectedItem.title}
                  </h3>
                  <span 
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded
                      ${selectedItem.type === "polaroid" 
                        ? "bg-stone-200 text-stone-600" 
                        : "bg-amber-500/15 text-amber-500"
                      }`}
                  >
                    {selectedItem.year}
                  </span>
                </div>
                
                <p 
                  className={`text-sm leading-relaxed
                    ${selectedItem.type === "polaroid" 
                      ? "text-stone-700 font-semibold" 
                      : "text-neutral-300 font-light"
                    }`}
                  style={selectedItem.type === "polaroid" ? { fontFamily: "var(--font-caveat), cursive", fontSize: "1.4rem", lineHeight: "1.2" } : {}}
                >
                  &ldquo;{selectedItem.caption}&rdquo;
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Item Modal Form */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1100] p-4 bg-black/85 backdrop-blur-md">
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
                  Add Picture to Wall
                </h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                
                {/* Style selector */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Display Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setNewType("polaroid")}
                      className={`py-3 px-4 rounded font-bold text-xs uppercase transition-all border cursor-pointer
                        ${newType === "polaroid" 
                          ? "bg-amber-500 text-black border-transparent" 
                          : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                        }`}
                    >
                      Vintage Polaroid Frame
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewType("classic")}
                      className={`py-3 px-4 rounded font-bold text-xs uppercase transition-all border cursor-pointer
                        ${newType === "classic" 
                          ? "bg-amber-500 text-black border-transparent" 
                          : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                        }`}
                    >
                      Classic Landscape Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Photo Title</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Fishing with Dad"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Year</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white text-center focus:outline-none"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="e.g. 2008"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Short Caption</label>
                  <textarea
                    rows={3}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Write a brief nostalgic description..."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Choose Image</label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-1 aspect-video w-full rounded border border-neutral-800 overflow-hidden bg-neutral-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newImage}
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
                    value={newImage.startsWith("data:") ? "" : newImage}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNewImage(e.target.value);
                        setUploadError("");
                      }
                    }}
                  />
                </div>

              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 border-t border-neutral-900 flex justify-end gap-3 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded text-xs font-bold cursor-pointer"
                  disabled={!newTitle || !newCaption}
                >
                  Save Photo
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
