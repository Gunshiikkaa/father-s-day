"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Edit, X, Upload, Calendar } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface SpotlightData {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  image: string;
}

const defaultSpotlight: SpotlightData = {
  title: "THE MOMENT THAT CHANGED EVERYTHING",
  subtitle: "A Father's Greatest Promise",
  year: "1998",
  description: "It was a quiet Tuesday morning in November. The doctor handed me a tiny, breathing bundle wrapped in a soft blanket. I looked down at your face, and in that split second, the weight of the entire universe shifted. I made a silent vow right then and there: to protect you, guide you, and love you more than life itself. Every single sacrifice since that day has been my greatest honor.",
  image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80",
};

export default function Spotlight() {
  const [data, setData] = useLocalStorage<SpotlightData>("dadflix-spotlight", defaultSpotlight);
  const [editingData, setEditingData] = useState<SpotlightData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setEditingData({ ...data });
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be smaller than 2MB for storage limits.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (editingData && typeof reader.result === "string") {
        setEditingData({ ...editingData, image: reader.result });
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (editingData) {
      setData(editingData);
      setIsModalOpen(false);
      setEditingData(null);
    }
  };

  return (
    <section className="relative py-28 px-4 md:px-8 bg-black overflow-hidden z-10 select-none">
      
      {/* Background Volumetric Glow */}
      <div className="absolute right-0 top-1/4 w-[50vw] h-[50vw] rounded-full bg-radial-gradient(circle, rgba(245, 196, 79, 0.04) 0%, transparent 70%) pointer-events-none filter blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          
          {/* Left Side: Cinematic Media Frame */}
          <div className="lg:col-span-7 relative group">
            
            {/* Spotlight Glowing outline */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-lg overflow-hidden border border-amber-500/25 bg-neutral-950">
              
              {/* Media Image with continuous slow scale zoom */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover animate-[zoomSlow_45s_linear_infinite] brightness-90 contrast-[1.05]"
              />

              {/* Floating dust particles overlay within the media image */}
              <div className="absolute inset-0 bg-transparent pointer-events-none opacity-40 mix-blend-screen">
                <div className="absolute w-2 h-2 bg-amber-200 rounded-full blur-[1px] animate-[floatUp_8s_ease-in-out_infinite] top-[70%] left-[20%]" />
                <div className="absolute w-1 h-1 bg-amber-100 rounded-full blur-[0.5px] animate-[floatUp_12s_ease-in-out_infinite] top-[50%] left-[65%]" />
                <div className="absolute w-3 h-3 bg-amber-300 rounded-full blur-[2px] animate-[floatUp_10s_ease-in-out_infinite] top-[80%] left-[80%]" style={{ animationDelay: "2s" }} />
              </div>

              {/* Golden Lens Flare Sweep Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-yellow-300/5 pointer-events-none" />

              {/* Spotlight Vignette Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

              {/* Top Rated Golden Ribbon Badge */}
              <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded text-xs font-black tracking-widest uppercase shadow-md flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                Featured Memory
              </div>

              {/* Action Overlay buttons */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 bg-black/75 hover:bg-amber-500 border border-amber-500/30 hover:border-transparent text-white hover:text-black font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded transition-all cursor-pointer shadow-lg"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Customize Story
                </button>
              </div>

            </div>
          </div>

          {/* Right Side: Memory Story Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Genre tags */}
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold uppercase tracking-[0.25em] text-xs font-mono">
                Netflix Documentary Spotlight
              </span>
              <span className="h-4 w-[1px] bg-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400 font-mono text-xs">
                <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
                <span>EST. {data.year}</span>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider leading-tight text-white uppercase font-serif"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              {data.title}
            </h3>

            {/* Subtitle */}
            <h4 className="text-amber-400/90 font-bold tracking-widest text-sm uppercase italic">
              {data.subtitle}
            </h4>

            {/* Cinematic Divider */}
            <div className="h-[2px] w-1/4 bg-gradient-to-r from-amber-500 to-transparent" />

            {/* Story Text Description */}
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              &ldquo;{data.description}&rdquo;
            </p>

            {/* Emotional Tagline */}
            <div className="bg-neutral-900/50 border-l-2 border-amber-500 p-4 rounded-r-md">
              <p className="text-xs italic text-neutral-400 font-light">
                &ldquo;You never know the value of a moment, until it becomes a memory that stays with you forever.&rdquo;
              </p>
            </div>

          </div>

        </motion.div>
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {isModalOpen && editingData && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden text-neutral-100 cinematic-glass"
            >
              
              {/* Modal header */}
              <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center bg-zinc-950">
                <h3 
                  className="text-lg font-bold font-serif text-amber-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Edit Spotlight Memory
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                
                {/* Title and Subtitle */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Spotlight Title</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                    value={editingData.title}
                    onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Spotlight Subtitle</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors"
                      value={editingData.subtitle}
                      onChange={(e) => setEditingData({ ...editingData, subtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Year</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white text-center focus:outline-none transition-colors"
                      value={editingData.year}
                      onChange={(e) => setEditingData({ ...editingData, year: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">The Story</label>
                  <textarea
                    rows={5}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    value={editingData.description}
                    onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                  />
                </div>

                {/* Image upload */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Featured Image</label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    
                    <div className="col-span-1 aspect-video w-full rounded border border-neutral-800 overflow-hidden bg-neutral-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
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
                      </div>
                      {uploadError && (
                        <p className="text-red-500 text-[10px] font-semibold">{uploadError}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* URL paste */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-amber-500/70 mb-2">Or Paste Image URL</label>
                  <input
                    type="url"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded p-2 text-xs text-white focus:outline-none"
                    placeholder="https://example.com/photo.jpg"
                    value={editingData.image.startsWith("data:") ? "" : editingData.image}
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditingData({ ...editingData, image: e.target.value });
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
                  onClick={() => setIsModalOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded text-xs font-bold cursor-pointer"
                  disabled={!editingData.title || !editingData.description}
                >
                  Save Changes
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CSS Keyframe Animations for floating effects inside the media spotlight */}
      <style jsx global>{`
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
          50% { transform: translateY(-40px) translateX(10px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-80px) translateX(0) scale(1); opacity: 0; }
        }
      `}</style>

    </section>
  );
}
