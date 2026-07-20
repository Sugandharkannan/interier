"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

// Dynamically import the 3D Canvas with SSR disabled to prevent hydration errors
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-t-primary border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-text-secondary">
          Initializing 3D Space...
        </span>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const { playClick, playHover } = useAudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-bg-dark">
      {/* 3D Canvas Scene */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
      )}

      {/* Decorative dark overlay on top/bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-transparent to-bg-dark z-10 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-primary font-semibold bg-primary/5 px-4 py-2 border border-primary/20 rounded-full backdrop-blur-sm">
              LUXURY ARCHITECTURE STUDIO
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-7xl lg:text-8xl text-white font-medium mb-6 leading-[1.1] tracking-tight"
          >
            Design Beyond <br className="hidden md:inline" />
            <span className="gold-gradient-text italic font-normal">Imagination.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs md:text-sm lg:text-base text-text-secondary max-w-xl mb-10 leading-relaxed font-light tracking-wider"
          >
            LUXE INTERIORS drafts high-end spaces that combine spatial fluidity with timeless material textures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pointer-events-auto"
          >
            <button
              onClick={() => scrollTo("projects")}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-bg-dark bg-primary hover:bg-white hover:text-bg-dark transition-all duration-300 shadow-xl shadow-primary/10 cursor-pointer"
            >
              Explore Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white border border-white/20 hover:border-primary/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              Book Consultation
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-text-secondary/60 mb-2 font-mono">
          Scroll to enter
        </span>
        <div className="w-[18px] h-[32px] border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
