"use client";

import { projects } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const { playHover, playClick } = useAudio();

  return (
    <section id="projects" className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden font-sans">
      {/* Background glow halo */}
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-primary/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Featured Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Award-Winning Transformations
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Swipe the sliders below to see raw, untreated construction sites converted into high-fidelity luxury environments.
          </p>
        </div>

        {/* Project List Stack */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Compare (Cols 1-7) */}
              <div
                className={`lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl relative ${
                  index % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <BeforeAfterSlider
                  beforeImg={project.beforeImg}
                  afterImg={project.afterImg}
                  className="w-full h-full"
                />
              </div>

              {/* Project Specs Copy (Cols 8-12) */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-primary uppercase font-semibold font-mono block mb-2">
                    {project.category} // {project.tag}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium mb-4">
                    {project.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light tracking-wide">
                    {project.description}
                  </p>
                </div>

                {/* Specs parameters table */}
                <div className="border-t border-b border-white/5 py-6 grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-mono uppercase tracking-wider text-text-secondary">
                  <div>
                    <span className="text-[9px] text-white block mb-1">Client</span>
                    {project.client}
                  </div>
                  <div>
                    <span className="text-[9px] text-white block mb-1">Location</span>
                    {project.location}
                  </div>
                  <div>
                    <span className="text-[9px] text-white block mb-1">Area Size</span>
                    {project.area}
                  </div>
                  <div>
                    <span className="text-[9px] text-white block mb-1">Budget</span>
                    <span className="text-primary font-semibold">{project.budget}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary">
                    Handoff Time: {project.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
