"use client";

import { useState } from "react";
import { projects } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Minimal", "Luxury", "Classic", "Modern", "Industrial", "Japanese"];

export default function PortfolioMasonry() {
  const [filter, setFilter] = useState("All");
  const { playHover, playClick } = useAudio();

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24 bg-bg-card border-t border-white/5 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Spatial Gallery
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Curated Styles Grid
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Filter our projects by architectural style notes to inspect spatial layouts, wood configurations, and lighting setups.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                playClick();
              }}
              onMouseEnter={playHover}
              className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 font-mono border cursor-pointer ${
                filter === cat
                  ? "bg-primary text-bg-dark border-primary font-bold shadow-lg shadow-primary/10"
                  : "bg-white/3 text-text-secondary border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onMouseEnter={playHover}
                onClick={playClick}
                className={`relative rounded-xl overflow-hidden group border border-white/5 aspect-[4/3] cursor-pointer shadow-xl ${
                  idx === 1 ? "lg:col-span-2 lg:aspect-[8/3]" : ""
                }`}
              >
                {/* Image */}
                <img
                  src={project.afterImg}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glassmorphic hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[9px] uppercase tracking-widest text-primary font-semibold font-mono block mb-2">
                      {project.category} // {project.location}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-white font-medium mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-text-secondary tracking-widest uppercase font-mono">
                      Completed Year: 2026
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
