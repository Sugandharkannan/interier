"use client";

import dynamic from "next/dynamic";
import { materials } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

const MaterialCard3D = dynamic(() => import("./MaterialCard3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[180px] bg-[#121212] flex items-center justify-center border border-white/5 rounded-xl">
      <div className="w-5 h-5 border border-t-primary border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function MaterialShowcase() {
  const { playHover, playClick } = useAudio();

  return (
    <section id="materials" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden font-sans">
      {/* Background glow halo */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Tactile Textures
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Luxury Materials Library
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Interact with our virtual 3D material slabs. Hover to rotate them under specular lights, and inspect custom finishing details.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {materials.map((mat, index) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={playHover}
              onClick={playClick}
              className="glassmorphism rounded-2xl p-5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Interactive R3F rotating slab */}
              <div className="mb-6 relative">
                <MaterialCard3D color={mat.color} isGlass={mat.id === "glass"} />
              </div>

              {/* Title & Description */}
              <div className="flex-grow">
                <h3 className="font-serif text-lg text-white font-medium mb-2 group-hover:text-primary transition-colors">
                  {mat.name}
                </h3>
                <p className="text-[11px] text-text-secondary leading-relaxed mb-4 font-light h-12">
                  {mat.description}
                </p>
              </div>

              {/* Spec features list */}
              <div className="border-t border-white/5 pt-4 mt-auto">
                <ul className="space-y-1.5">
                  {mat.properties.map((prop) => (
                    <li key={prop} className="flex items-center space-x-2 text-[9px] text-text-secondary font-mono uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
