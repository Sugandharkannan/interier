"use client";

import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function Footer() {
  const { playClick, playHover } = useAudio();

  const scrollTo = (id: string) => {
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    alert("Thank you for subscribing to our luxury design catalog.");
  };

  return (
    <footer className="relative bg-bg-dark border-t border-white/5 pt-20 pb-10 overflow-hidden font-sans">
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        {/* Brand Columns */}
        <div className="flex flex-col space-y-6">
          <span
            onClick={() => scrollTo("hero")}
            onMouseEnter={playHover}
            className="font-serif text-2xl font-bold tracking-widest text-white cursor-pointer hover:text-primary transition-colors"
          >
            LUXE<span className="text-primary">.</span>
          </span>
          <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
            Designing Spaces That Inspire. Crafting premium luxury residential and commercial architecture from concept to reality.
          </p>
          {/* Socials */}
          <div className="flex space-x-4">
            {["Instagram", "Pinterest", "WhatsApp", "LinkedIn"].map((soc) => (
              <a
                key={soc}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                }}
                onMouseEnter={playHover}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1"
                title={soc}
              >
                {soc.substring(0, 2)}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-serif text-sm uppercase tracking-widest text-white font-bold">Studio</h4>
          <ul className="space-y-3">
            {["about", "services", "blueprint", "projects", "materials"].map((lnk) => (
              <li key={lnk}>
                <button
                  onClick={() => scrollTo(lnk)}
                  onMouseEnter={playHover}
                  className="text-xs uppercase tracking-widest text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  {lnk === "blueprint" ? "3D Blueprint" : lnk}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Info */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-serif text-sm uppercase tracking-widest text-white font-bold">Offices</h4>
          <div className="text-xs text-text-secondary space-y-3 leading-relaxed">
            <p>
              <span className="text-white block font-medium">Manhattan Studio</span>
              785 Fifth Avenue, Penthouse B<br />
              New York, NY 10022
            </p>
            <p>
              <span className="text-white block font-medium">Enquiries</span>
              contact@luxeinteriors.com<br />
              +1 (212) 555-8900
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-serif text-sm uppercase tracking-widest text-white font-bold">Catalog</h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            Subscribe to receive private previews of our completed projects and material acquisitions.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Email Address"
                onMouseEnter={playHover}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              onMouseEnter={playHover}
              className="bg-primary text-bg-dark font-medium uppercase tracking-widest text-[10px] py-3 rounded-full hover:bg-white hover:text-bg-dark transition-all duration-300 cursor-pointer shadow-lg hover:shadow-primary/5"
            >
              Request Access
            </button>
          </form>
        </div>
      </div>

      {/* Footer copyright section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] md:text-xs text-text-secondary tracking-widest uppercase">
        <span>© 2026 LUXE INTERIORS. All Rights Reserved.</span>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <button
            onClick={() => scrollTo("hero")}
            onMouseEnter={playHover}
            className="hover:text-white text-primary transition-colors cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
