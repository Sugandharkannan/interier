"use client";

import { team } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function TeamGrid() {
  const { playHover, playClick } = useAudio();

  return (
    <section className="py-24 bg-bg-card border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 space-y-4 lg:space-y-0">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
              Creative Minds
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
              Meet Our Designers
            </h2>
          </div>
          <p className="text-xs md:text-sm text-text-secondary max-w-sm leading-relaxed font-light tracking-wide">
            Our directors direct the architectural geometry and texture selections of every spatial commission.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={playHover}
              onClick={playClick}
              className="glassmorphism rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-300"
            >
              {/* Image box with relative aspect ratio */}
              <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-white/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
                />

                {/* Overlap social cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-start items-end p-6">
                  <div className="flex space-x-3">
                    {["Instagram", "Pinterest", "Linkedin"].map((soc) => (
                      <span
                        key={soc}
                        className="text-[9px] uppercase tracking-widest bg-white/5 border border-white/10 hover:border-primary hover:text-primary transition-all duration-300 px-3 py-1 rounded text-text-secondary font-mono"
                      >
                        {soc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Descriptions copy */}
              <div className="p-6 md:p-8 space-y-3">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-primary font-semibold font-mono block mb-1">
                    {member.experience} // {member.specialization}
                  </span>
                  <h3 className="font-serif text-xl text-white font-medium group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs text-text-secondary uppercase tracking-widest mt-1 block">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-light pt-2 border-t border-white/5">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
