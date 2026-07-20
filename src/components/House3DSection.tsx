"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { roomsData } from "@/utils/mockData";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useAudio } from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";

const HouseScene = dynamic(() => import("./HouseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-full bg-[#101010] flex items-center justify-center border border-white/5 rounded-2xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-6 h-6 border border-t-primary border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">
          Drafting Blueprint...
        </span>
      </div>
    </div>
  ),
});

export default function House3DSection() {
  const [selectedRoomId, setSelectedRoomId] = useState("living");
  const { playClick, playHover } = useAudio();

  const currentRoom = roomsData.find((r) => r.id === selectedRoomId) || roomsData[0];

  const handleSelectRoom = (id: string) => {
    setSelectedRoomId(id);
    playClick();
  };

  return (
    <section id="blueprint" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Interactive Blueprint
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Explore Our 3D Interior Floorplan
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed tracking-wider font-light">
            Rotate and zoom the 3D model. Click on the highlighted rooms to inspect design stats, budgets, and swipe the Before/After transformation slider.
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[620px] items-stretch">
          {/* R3F Floorplan Canvas (7 Cols) */}
          <div className="lg:col-span-7 h-[400px] lg:h-full rounded-2xl overflow-hidden border border-white/5 relative shadow-2xl">
            {/* Legend buttons for rooms */}
            <div className="absolute top-4 left-4 z-30 flex flex-wrap gap-2 pointer-events-auto">
              {roomsData.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleSelectRoom(room.id)}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all duration-300 font-medium cursor-pointer border ${
                    selectedRoomId === room.id
                      ? "bg-primary text-bg-dark border-primary shadow-lg shadow-primary/20"
                      : "bg-bg-dark/80 text-text-secondary border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Instruction tooltip */}
            <div className="absolute bottom-4 right-4 z-30 bg-bg-dark/70 border border-white/5 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-widest text-text-secondary backdrop-blur-sm pointer-events-none font-mono flex items-center space-x-2">
              <svg className="w-3.5 h-3.5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Left-click & Drag to rotate</span>
            </div>

            <HouseScene
              selectedRoom={selectedRoomId}
              onSelectRoom={handleSelectRoom}
              playHover={playHover}
            />
          </div>

          {/* Room Specs Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glassmorphic rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            {/* Background luxury gradient lighting */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoomId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between space-y-6"
              >
                {/* Header */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-mono mb-2 block">
                    Selected Zone
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium mb-3">
                    {currentRoom.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light tracking-wide">
                    {currentRoom.description}
                  </p>
                </div>

                {/* Before/After slider inside drawer */}
                <div className="w-full h-[200px] lg:h-[220px] relative">
                  <BeforeAfterSlider
                    beforeImg={currentRoom.beforeImg}
                    afterImg={currentRoom.afterImg}
                    className="w-full h-full"
                  />
                </div>

                {/* Room Statistics Card Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                      Estimated Cost
                    </span>
                    <span className="text-sm lg:text-base font-serif text-primary mt-1 font-bold">
                      {currentRoom.budget}
                    </span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                      Time Frame
                    </span>
                    <span className="text-sm lg:text-base font-serif text-white mt-1 font-medium">
                      {currentRoom.duration}
                    </span>
                  </div>
                </div>

                {/* Sourced Materials */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-white font-bold mb-3 font-mono">
                    Premium Materials Sourced
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentRoom.materials.map((mat) => (
                      <span
                        key={mat}
                        className="text-[9px] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded text-text-secondary"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
