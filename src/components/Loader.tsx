"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STATUSES = [
  "Sourcing Italian Marble...",
  "Aligning Oak Wood Panels...",
  "Calibrating Ambient Sunlight...",
  "Polishing Glass Materials...",
  "Rendering LUXE Architecture...",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Increment loading progress smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFinished(true);
          setTimeout(onComplete, 800); // Trigger completion callback
          return 100;
        }
        // Varying speed for realistic rendering load
        const increment = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Cycle status labels based on progress
    const idx = Math.min(
      Math.floor((progress / 100) * LOADING_STATUSES.length),
      LOADING_STATUSES.length - 1
    );
    setStatusIdx(idx);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 bg-bg-dark z-99999 flex flex-col justify-between p-8 lg:p-16 select-none pointer-events-auto"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <span className="font-serif text-lg tracking-widest text-primary font-bold">
              LUXE INTERIORS
            </span>
            <span className="text-xs uppercase tracking-widest text-text-secondary">
              Est. 2026
            </span>
          </div>

          {/* Core display */}
          <div className="flex flex-col justify-center items-start space-y-6">
            <h1 className="font-serif text-5xl md:text-8xl text-white font-medium flex items-center leading-none">
              {progress < 10 ? `0${progress}` : progress}
              <span className="text-primary text-3xl md:text-5xl ml-2 font-sans">%</span>
            </h1>
            <motion.p
              key={statusIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs md:text-sm uppercase tracking-widest text-text-secondary h-4 font-sans"
            >
              {LOADING_STATUSES[statusIdx]}
            </motion.p>
          </div>

          {/* Footer bar */}
          <div className="w-full flex flex-col space-y-4">
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] md:text-xs text-text-secondary tracking-wider font-sans uppercase">
              <span>Designing Spaces That Inspire</span>
              <span>All Rights Reserved © 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
