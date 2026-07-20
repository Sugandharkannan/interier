"use client";

import { useState, useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Evelyn Sterling",
    role: "Lumina Penthouse Client",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    quote: "The spatial transparency ELEANOR established in our penthouse exceeded every expectation. The way daylight refracts off the fluted glass panels and strikes the marble fireplace is pure poetry. They did not just design a flat, they crafted an art piece.",
    style: "Minimalist Modern",
    rating: 5,
  },
  {
    id: 2,
    name: "Arthur Vance",
    role: "Monolith Villa Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Coordinating a 6,500 sqft estate remodel from London felt daunting, but the 3D Virtual Walkthroughs allowed us to walk through our rooms and sign off details months before construction finished. Flawless management, beautiful execution.",
    style: "Luxury Classic",
    rating: 5,
  },
  {
    id: 3,
    name: "Sonia Kincaid",
    role: "Apex Hub VP",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Our creative agency needed a workspace that stimulated collaboration without sacrificing privacy. LUXE designed modular acoustic slat pods and custom workstations that have drastically boosted team morale. Indispensable designers.",
    style: "Industrial Technical",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { playClick, playHover } = useAudio();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    playClick();
    setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    playClick();
    setActiveIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[activeIdx];

  return (
    <section className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Endorsements
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
            Client Testimonials
          </h2>
        </div>

        {/* Slider Window */}
        <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glassmorphism rounded-2xl p-8 md:p-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Reviewer Avatar (Cols 1-3) */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl mb-4 relative">
                  <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-serif text-white font-semibold text-center">{current.name}</h4>
                <span className="text-[10px] text-text-secondary tracking-wide uppercase text-center mt-1">
                  {current.role}
                </span>
              </div>

              {/* Quote details (Cols 4-12) */}
              <div className="md:col-span-9 flex flex-col space-y-4">
                {/* Stars */}
                <div className="flex space-x-1 text-primary">
                  {[...Array(current.rating)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-text-secondary italic leading-relaxed font-light">
                  "{current.quote}"
                </p>
                <div className="flex justify-between items-center pt-2 text-[9px] uppercase tracking-widest font-mono text-text-secondary">
                  <span>Interior Style // {current.style}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dot Pagination & Arrows */}
        <div className="flex justify-between items-center mt-8">
          {/* Pagination dots */}
          <div className="flex space-x-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIdx(i);
                  playClick();
                }}
                onMouseEnter={playHover}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeIdx === i ? "bg-primary w-6" : "bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              onMouseEnter={playHover}
              className="p-2 border border-white/5 bg-white/3 hover:bg-white/5 rounded-full text-white hover:text-primary transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={playHover}
              className="p-2 border border-white/5 bg-white/3 hover:bg-white/5 rounded-full text-white hover:text-primary transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
