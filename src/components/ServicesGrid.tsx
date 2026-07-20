"use client";

import { services } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function ServicesGrid() {
  const { playHover, playClick } = useAudio();

  return (
    <section id="services" className="py-24 bg-bg-card border-t border-white/5 relative overflow-hidden font-sans">
      {/* Background circular lighting accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 space-y-4 lg:space-y-0">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
              Expertise
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
              Bespoke Architecture <br />
              <span className="italic font-normal text-primary">& Interior Services</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-text-secondary max-w-sm leading-relaxed font-light tracking-wide">
            From preliminary blueprints to master finishing, our team ensures world-class luxury at every coordinate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              onClick={playClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="glassmorphism rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
            >
              {/* Dynamic light streak border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-500" />

              {/* Icon Holder */}
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-bg-dark transition-all duration-500">
                <span className="font-serif text-base font-semibold">0{index + 1}</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl text-white font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light h-12">
                {service.description}
              </p>

              {/* Service Features list (expands slightly or slides in on hover) */}
              <div className="border-t border-white/5 pt-4 mt-auto">
                <ul className="space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center space-x-2 text-[10px] text-text-secondary tracking-wider uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
                      <span>{feat}</span>
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
