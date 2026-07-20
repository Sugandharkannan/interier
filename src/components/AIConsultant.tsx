"use client";

import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";

const BARE_ROOMS = [
  {
    id: "condo",
    name: "Bare Concrete Condo",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    style: "Japandi Minimalism",
    budget: "$40,000 - $55,000",
    colors: ["#050505", "#e6e1d7", "#5b4033", "#D4AF37"],
    materials: ["Smoked American Walnut", "Bouclé Textiles", "Limestone Plaster"],
    advice: "Celebrate raw concrete by pairing it with highly textured American Walnut slabs and floating warm indirect lights to lift the dark ceiling limits.",
  },
  {
    id: "warehouse",
    name: "Empty Brick Warehouse",
    img: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=600&q=80",
    style: "Industrial Technical Loft",
    budget: "$80,000 - $110,000",
    colors: ["#101010", "#8FA3A6", "#c5a059", "#4A1525"],
    materials: ["Ribbed Fluted Glass", "Champagne Brass", "Raw Structural Steel"],
    advice: "Inject clean, geometric structures like fluted glass dividers to separate zones while allowing daylight to illuminate raw brick walls.",
  },
  {
    id: "suburban",
    name: "Suburban Shell Room",
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    style: "Modern Neoclassical Villa",
    budget: "$60,000 - $75,000",
    colors: ["#0b0a09", "#ffffff", "#c5a059", "#8FA3A6"],
    materials: ["Italian Calacatta Marble", "Brushed Brass Details", "Polished Plaster"],
    advice: "Build deep panel moldings and install vertical linear brass tracks to bounce ambient light off white marble tiles.",
  },
];

export default function AIConsultant() {
  const [selectedRoomId, setSelectedRoomId] = useState("condo");
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [lightTone, setLightTone] = useState("neutral"); // warm, neutral, cyberpunk
  const { playClick, playHover } = useAudio();

  const selectedRoom = BARE_ROOMS.find((r) => r.id === selectedRoomId) || BARE_ROOMS[0];

  const triggerScan = () => {
    playClick();
    setIsScanning(true);
    setHasScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2500);
  };

  const getOverlayColor = () => {
    switch (lightTone) {
      case "warm":
        return "rgba(251, 191, 36, 0.15)";
      case "cyberpunk":
        return "rgba(236, 72, 153, 0.12)";
      default:
        return "rgba(255, 255, 255, 0)";
    }
  };

  return (
    <section id="consultant" className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Creative AI
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            AI Space Stylist & Calculator
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Select a raw, untreated spatial layout. Run our visual AI scanner to automatically recommend architectural styles, color palettes, and calculate budget ranges.
          </p>
        </div>

        {/* AI Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Scanner view (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Room templates select */}
            <div className="flex gap-2">
              {BARE_ROOMS.map((room) => (
                <button
                  key={room.id}
                  disabled={isScanning}
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setHasScanned(false);
                    playClick();
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-2 rounded-lg text-[9px] uppercase tracking-widest font-mono border transition-all duration-300 cursor-pointer ${
                    selectedRoomId === room.id
                      ? "bg-primary text-bg-dark border-primary font-bold"
                      : "bg-white/3 text-text-secondary border-white/5 hover:border-white/20 hover:text-white disabled:opacity-50"
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Room display area with laser scanner sweep overlay */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl">
              <img src={selectedRoom.img} alt="Raw room shell" className="w-full h-full object-cover" />

              {/* Lighting overlay tint */}
              <div
                className="absolute inset-0 transition-colors duration-500 pointer-events-none"
                style={{ backgroundColor: getOverlayColor() }}
              />

              {/* Laser Scanning line sweep */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-primary z-20"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{
                      repeat: 2,
                      repeatType: "reverse",
                      duration: 1.25,
                      ease: "easeInOut",
                    }}
                    style={{
                      boxShadow: "0 0 15px #D4AF37, 0 0 5px #D4AF37",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Status card */}
              <div className="absolute bottom-4 left-4 bg-bg-dark/80 backdrop-blur-md px-3 py-1.5 rounded text-[8px] uppercase tracking-widest text-text-secondary border border-white/5 font-mono">
                {isScanning ? "Analyzing layout points..." : hasScanned ? "Analysis Complete" : "Standby for Scan"}
              </div>
            </div>

            {/* Trigger buttons */}
            <button
              onClick={triggerScan}
              disabled={isScanning}
              className="w-full bg-primary text-bg-dark text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:text-bg-dark transition-all duration-300 font-bold cursor-pointer disabled:opacity-50 shadow-xl"
            >
              {isScanning ? "Processing Layout..." : "Scan Space Configuration"}
            </button>
          </div>

          {/* AI Results panel (Cols 8-12) */}
          <div className="lg:col-span-5 glassmorphic rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!hasScanned ? (
                <motion.div
                  key="standby"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center text-center h-full space-y-4"
                >
                  <div className="w-12 h-12 rounded-full border border-dashed border-primary/40 flex items-center justify-center text-primary animate-spin">
                    ◈
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium">Ready to Model</h4>
                  <p className="text-[11px] text-text-secondary max-w-xs leading-relaxed font-light">
                    Select a raw room template on the left and run the scanner to extract color schemes, layout properties, and material guides.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 flex flex-col justify-between h-full"
                >
                  {/* Category output */}
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-primary font-mono block mb-1">
                      Calculated Style Match
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl text-white font-medium">
                      {selectedRoom.style}
                    </h3>
                  </div>

                  {/* Recommendation Text */}
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white block mb-2 font-mono">
                      AI Architect Recommendation
                    </span>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-light tracking-wide">
                      {selectedRoom.advice}
                    </p>
                  </div>

                  {/* Copyable color palettes */}
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white block mb-2.5 font-mono">
                      Calculated Color Palette
                    </span>
                    <div className="flex space-x-2">
                      {selectedRoom.colors.map((c) => (
                        <div
                          key={c}
                          onClick={() => {
                            navigator.clipboard.writeText(c);
                            playClick();
                          }}
                          onMouseEnter={playHover}
                          className="flex-grow aspect-square rounded-lg border border-white/10 cursor-pointer relative group flex items-end p-1.5"
                          style={{ backgroundColor: c }}
                          title={`Click to copy: ${c}`}
                        >
                          <span className="text-[8px] font-mono text-white bg-bg-dark/80 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {c}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive lighting switcher */}
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white block mb-3 font-mono">
                      Interactive Ambient Lighting Tone
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {["neutral", "warm", "cyberpunk"].map((tone) => (
                        <button
                          key={tone}
                          onClick={() => {
                            setLightTone(tone);
                            playClick();
                          }}
                          onMouseEnter={playHover}
                          className={`py-2 rounded text-[9px] uppercase tracking-widest font-mono border transition-all duration-300 cursor-pointer ${
                            lightTone === tone
                              ? "bg-white text-bg-dark border-white font-bold"
                              : "bg-white/5 text-text-secondary border-white/5 hover:border-white/10 hover:text-white"
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cost estimation results */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                      Estimated Outfitting Budget
                    </span>
                    <span className="text-base font-serif text-primary mt-1 font-bold">
                      {selectedRoom.budget}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
