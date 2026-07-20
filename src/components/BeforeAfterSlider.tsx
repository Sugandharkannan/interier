"use client";

import { useState, useRef, useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover } = useAudio();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl border border-white/5 bg-neutral-900 group cursor-ew-resize ${className}`}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImg}
        alt="Before interior layout"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div className="absolute top-4 left-4 bg-bg-dark/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest rounded border border-white/10 text-text-secondary select-none font-mono">
        Before
      </div>

      {/* After Image (Overlay with clipping) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={afterImg}
          alt="After finished layout"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-primary/90 text-bg-dark px-3 py-1 text-[9px] uppercase tracking-widest rounded font-semibold select-none font-mono">
          After
        </div>
      </div>

      {/* Split slider handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-primary z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glow halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg border border-white/20">
          <svg
            className="w-4 h-4 text-bg-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
