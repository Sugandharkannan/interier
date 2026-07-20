"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

const WalkthroughScene = dynamic(() => import("./WalkthroughScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#080808] flex items-center justify-center border border-white/5 rounded-2xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-6 h-6 border border-t-primary border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">
          Initializing 360° VR...
        </span>
      </div>
    </div>
  ),
});

const PANORAMA_ROOMS = [
  {
    id: "lounge",
    name: "Living Lounge",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    desc: "Italian marble fireplace meeting custom dark wood shelving.",
  },
  {
    id: "suite",
    name: "Master Suite",
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=80",
    desc: "Minimal master bedroom featuring a floating king bed design.",
  },
  {
    id: "spa",
    name: "Spa Bath",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80",
    desc: "Acoustically isolated spa bath wrapped in basalt stone tiles.",
  },
];

export default function Walkthrough360() {
  const [activeRoomId, setActiveRoomId] = useState("lounge");
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useAudio();

  const activeRoom = PANORAMA_ROOMS.find((r) => r.id === activeRoomId) || PANORAMA_ROOMS[0];

  const handleToggleFullscreen = () => {
    playClick();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section className="py-24 bg-bg-dark border-t border-white/5 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Virtual Reality
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Immersive 360° VR Walkthrough
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Select a room to enter its VR projection dome. Drag inside the viewport to look around in any direction. Enter fullscreen for a cinematic view.
          </p>
        </div>

        {/* 360 Viewer Wrapper */}
        <div
          ref={containerRef}
          className="relative w-full h-[450px] lg:h-[550px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-[#050505]"
        >
          {/* Active room 360 canvas */}
          <WalkthroughScene url={activeRoom.url} />

          {/* Navigation HUD Controls */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none">
            {/* Info pane */}
            <div className="bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-xs shadow-xl pointer-events-auto">
              <span className="text-[8px] uppercase tracking-widest text-primary font-mono block mb-1">
                Currently Viewing
              </span>
              <h4 className="font-serif text-base text-white font-semibold mb-1">
                {activeRoom.name}
              </h4>
              <p className="text-[10px] text-text-secondary leading-relaxed font-light">
                {activeRoom.desc}
              </p>
            </div>

            {/* Room selectors & Fullscreen */}
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              {PANORAMA_ROOMS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    playClick();
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-2 rounded-lg text-[9px] uppercase tracking-widest font-mono border transition-all duration-300 cursor-pointer ${
                    activeRoomId === room.id
                      ? "bg-primary text-bg-dark border-primary font-bold"
                      : "bg-bg-dark/70 text-text-secondary border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {room.name}
                </button>
              ))}

              <button
                onClick={handleToggleFullscreen}
                onMouseEnter={playHover}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg cursor-pointer transition-colors"
                title="Toggle Fullscreen VR"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interactive HUD instructions overlay */}
          <div className="absolute top-6 left-6 z-30 bg-bg-dark/60 border border-white/5 rounded-full px-3 py-1 text-[9px] uppercase tracking-widest text-text-secondary backdrop-blur-sm pointer-events-none font-mono">
            ↕ Swipe / Drag to look around
          </div>
        </div>
      </div>
    </section>
  );
}
