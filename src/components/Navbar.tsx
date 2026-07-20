"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

const NAV_ITEMS = [
  { name: "About", target: "about" },
  { name: "Services", target: "services" },
  { name: "3D Blueprint", target: "blueprint" },
  { name: "Projects", target: "projects" },
  { name: "Materials", target: "materials" },
  { name: "AI Consultant", target: "consultant" },
  { name: "Contact", target: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying, toggle, playClick, playHover } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
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
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-bg-dark/70 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => scrollTo("hero")}
            onMouseEnter={playHover}
            className="font-serif text-xl tracking-widest text-white hover:text-primary transition-colors duration-300 font-bold cursor-pointer"
          >
            LUXE<span className="text-primary">.</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-8 font-sans">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                onMouseEnter={playHover}
                className="text-xs uppercase tracking-widest text-text-secondary hover:text-white transition-colors duration-300 relative py-1 group cursor-pointer"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Action elements (Audio toggle + CTA) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Audio Toggle */}
            <button
              onClick={toggle}
              onMouseEnter={playHover}
              className="flex items-center space-x-3 cursor-pointer text-text-secondary hover:text-white transition-colors py-2 px-3 border border-white/5 hover:border-primary/20 rounded-full bg-white/5 backdrop-blur-sm"
              title={isPlaying ? "Mute ambient music" : "Play ambient music"}
            >
              <div className="w-5 h-4 flex items-end justify-center space-x-[2.5px]">
                {[...Array(4)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[2.5px] bg-primary rounded-full origin-bottom"
                    animate={{
                      scaleY: isPlaying ? [1, i === 1 ? 2.5 : i === 2 ? 3 : 1.8, 1] : 0.25,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono">
                {isPlaying ? "Ambient On" : "Sound Off"}
              </span>
            </button>

            {/* Consultation CTA */}
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={playHover}
              className="relative px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-bg-dark bg-primary hover:bg-white hover:text-bg-dark transition-all duration-300 font-medium cursor-pointer shadow-lg hover:shadow-primary/10 overflow-hidden group"
            >
              <span className="relative z-10">Book Studio</span>
            </button>
          </div>

          {/* Mobile menu and audio toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Audio Toggle mobile */}
            <button
              onClick={toggle}
              className="p-2 border border-white/5 bg-white/5 backdrop-blur-sm rounded-full text-primary"
            >
              <div className="w-4 h-4 flex items-end justify-center space-x-[2px]">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] bg-primary rounded-full origin-bottom"
                    animate={{
                      scaleY: isPlaying ? [1, i === 1 ? 2.5 : 1.8, 1] : 0.25,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7 + i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                playClick();
              }}
              className="p-2 border border-white/5 bg-white/5 backdrop-blur-sm rounded-full text-white cursor-pointer"
            >
              {isOpen ? (
                // Close SVG
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger SVG
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-bg-dark/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center lg:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.6 }}
          >
            <div className="flex flex-col items-center space-y-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  onMouseEnter={playHover}
                  className="font-serif text-2xl text-white hover:text-primary transition-colors py-2 uppercase tracking-wider cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05, duration: 0.5 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("contact")}
                className="mt-6 px-8 py-3 rounded-full text-xs uppercase tracking-widest bg-primary text-bg-dark font-bold cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                Book Studio
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
