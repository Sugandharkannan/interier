"use client";

import { blogPosts } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function BlogGrid() {
  const { playHover, playClick } = useAudio();

  return (
    <section className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Insights
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Luxury Living Journals
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Read our notes on minimal spatial aesthetics, hidden lighting configurations, and raw materials curation.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={playHover}
              onClick={playClick}
              className="glassmorphism rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 group cursor-pointer"
            >
              {/* Blog image */}
              <div className="aspect-[16/9] overflow-hidden border-b border-white/5 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <span className="absolute top-4 left-4 bg-bg-dark/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest text-primary border border-white/10 rounded font-mono">
                  {post.category}
                </span>
              </div>

              {/* Descriptions copy */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-center text-[9px] uppercase font-mono tracking-widest text-text-secondary">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-white font-medium group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {post.excerpt}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-[10px] uppercase font-mono tracking-widest text-primary hover:text-white transition-colors">
                  <span>Read Article</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
