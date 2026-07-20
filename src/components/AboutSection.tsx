"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { value: 500, suffix: "+", label: "Completed Projects" },
    { value: 98, suffix: "%", label: "Happy Clients" },
    { value: 24, suffix: "", label: "Awwwards & Honors" },
    { value: 15, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-28 bg-bg-dark relative overflow-hidden font-sans">
      {/* Background glow halos */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Creative Images Stack */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="Luxury studio design concept"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Overlapping Floating Small Card */}
          <div className="absolute bottom-[-30px] right-[-10px] sm:right-0 bg-bg-card/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl max-w-[200px] hidden sm:block">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold block mb-2 font-mono">
              Philosophy
            </span>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              We believe a room is not just static space, but a choreography of light, materials, and living lines.
            </p>
          </div>
        </div>

        {/* Right Side: Copywriting details */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
              The Studio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6 leading-tight">
              Crafting Luxury Living <br />
              <span className="italic font-normal text-primary">Through Pure Geometry</span>
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6 font-light tracking-wide">
              Established in 2011, LUXE INTERIORS is a boutique creative agency specializing in luxury residential, commercial architectures, and bespoke spatial layouts. We combine cutting-edge parametric visualization with traditional European craftsmanship.
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
              Every curve, metal finish, and illumination shaft is modeled down to millimeter tolerances to ensure the final execution is indistinguishable from the digital layout.
            </p>
          </div>

          {/* Stats counters */}
          <div
            ref={containerRef}
            className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-serif text-white font-semibold">
                  {isInView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    0
                  )}
                  <span className="text-primary font-sans font-medium">{stat.suffix}</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
