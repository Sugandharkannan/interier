"use client";

import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

const TIMELINE_STEPS = [
  {
    phase: "01",
    title: "Initial Consultation",
    desc: "A private consultation to map your spatial aspirations, timeline requirements, and budget framework.",
  },
  {
    phase: "02",
    title: "Spatial Planning",
    desc: "Drafting multiple layout configurations exploring spatial flow, traffic lines, and ergonomic layouts.",
  },
  {
    phase: "03",
    title: "Interactive Moodboard",
    desc: "Curating a digital color palette and fabric samples to align on tactile textures and light reflections.",
  },
  {
    phase: "04",
    title: "3D Rendering & VR",
    desc: "Constructing the exact room blueprints in WebGL to explore shadows, light shafts, and geometry.",
  },
  {
    phase: "05",
    title: "Material Selection",
    desc: "Sourcing premium marbles, smoked woods, and brushed brasses directly from global quarries and ateliers.",
  },
  {
    phase: "06",
    title: "Studio Handoff & Delivery",
    desc: "Coordination of construction teams, bespoke furniture installations, and creative styling.",
  },
];

export default function ProcessTimeline() {
  const { playHover, playClick } = useAudio();

  return (
    <section className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Methodology
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            The Design Process
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Our step-by-step studio workflow translates structural plans into bespoke living coordinates.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {TIMELINE_STEPS.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                onMouseEnter={playHover}
                className={`relative flex flex-col md:flex-row items-stretch ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Connector Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-primary z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                </div>

                {/* Left/Right content split */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div
                    className={`glassmorphic rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300 ${
                      index % 2 === 1 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <span className="font-serif text-primary text-xl font-bold block mb-2">
                      Phase {step.phase}
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Empty buffer for desktop grid spacing */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
