"use client";

import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

const PROJECT_TYPES = ["Residential", "Commercial", "Villa Estate", "Bespoke Consulting"];

// Dates for booking slots
const BOOKING_DATES = [
  { day: "Mon", date: 20, time: "10:00 AM", status: "available" },
  { day: "Tue", date: 21, time: "02:30 PM", status: "available" },
  { day: "Wed", date: 22, time: "11:00 AM", status: "booked" },
  { day: "Thu", date: 23, time: "04:00 PM", status: "available" },
  { day: "Fri", date: 24, time: "09:00 AM", status: "booked" },
  { day: "Sat", date: 25, time: "01:00 PM", status: "available" },
];

export default function ContactForm() {
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Residential",
    message: "",
  });
  const { playClick, playHover } = useAudio();

  const handleSelectSlot = (idx: number, status: string) => {
    if (status === "booked") return;
    playClick();
    setSelectedSlotIdx(idx === selectedSlotIdx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const dateSelected = selectedSlotIdx !== null ? BOOKING_DATES[selectedSlotIdx] : null;

    let successMsg = `Thank you, ${formData.name}. Our studio team will reach out to you at ${formData.email} shortly.`;
    if (dateSelected) {
      successMsg += ` We have penciled in your initial consultation for ${dateSelected.day}, July ${dateSelected.date} at ${dateSelected.time}.`;
    }

    alert(successMsg);
    setFormData({ name: "", email: "", projectType: "Residential", message: "" });
    setSelectedSlotIdx(null);
  };

  return (
    <section id="contact" className="py-24 bg-bg-card border-t border-white/5 relative overflow-hidden font-sans">
      {/* Background radial lighting */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Booking & Contact
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-6">
            Begin Your Spatial Journey
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light tracking-wide">
            Book an initial creative consultation or request spatial information. Select an available slot to schedule a virtual VR consultation session.
          </p>
        </div>

        {/* Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Booking Inputs & Calendar (Cols 1-7) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 glassmorphism rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-white font-medium mb-4">Request Studio Brief</h3>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onMouseEnter={playHover}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-all duration-300"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onMouseEnter={playHover}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-all duration-300"
                />
              </div>

              {/* Project Type select */}
              <div>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  onMouseEnter={playHover}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-text-secondary focus:outline-none focus:border-primary transition-all duration-300"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-bg-card text-white">
                      {type} Project
                    </option>
                  ))}
                </select>
              </div>

              {/* Message text */}
              <div>
                <textarea
                  rows={4}
                  placeholder="Tell us about your space aspirations, architectural limits, or material preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onMouseEnter={playHover}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                />
              </div>

              {/* Interactive slot scheduler */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-white block mb-3 font-mono">
                  Select consultation date (Optional)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {BOOKING_DATES.map((slot, index) => {
                    const isAvailable = slot.status === "available";
                    const isSelected = selectedSlotIdx === index;
                    return (
                      <div
                        key={index}
                        onClick={() => handleSelectSlot(index, slot.status)}
                        className={`border rounded-xl p-2.5 flex flex-col items-center justify-between text-center select-none ${
                          !isAvailable
                            ? "border-white/3 bg-white/1 opacity-30 cursor-not-allowed"
                            : isSelected
                            ? "border-primary bg-primary text-bg-dark font-semibold cursor-pointer"
                            : "border-white/5 bg-white/3 hover:border-white/20 text-white cursor-pointer transition-colors"
                        }`}
                      >
                        <span className="text-[8px] uppercase tracking-wider block font-mono">{slot.day}</span>
                        <span className="text-sm font-serif my-0.5 block">{slot.date}</span>
                        <span className="text-[7px] uppercase font-mono tracking-wide">{slot.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="submit"
              onMouseEnter={playHover}
              className="w-full bg-primary text-bg-dark font-medium uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white hover:text-bg-dark transition-all duration-300 cursor-pointer shadow-xl"
            >
              Submit Project Inquiry
            </button>
          </form>

          {/* Location details card (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Contact numbers info */}
            <div className="glassmorphism rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <h3 className="font-serif text-lg text-white font-medium">Headquarters</h3>
              <div className="space-y-4 text-xs text-text-secondary leading-relaxed font-light">
                <p>
                  <span className="text-white block font-medium uppercase tracking-wider text-[10px] font-mono mb-1">
                    Studio Address
                  </span>
                  785 Fifth Avenue, Penthouse B<br />
                  New York, NY 10022
                </p>
                <p>
                  <span className="text-white block font-medium uppercase tracking-wider text-[10px] font-mono mb-1">
                    Call Center
                  </span>
                  Office: +1 (212) 555-8900<br />
                  Direct: +1 (212) 555-8905
                </p>
                <p>
                  <span className="text-white block font-medium uppercase tracking-wider text-[10px] font-mono mb-1">
                    Electronic Mail
                  </span>
                  General: contact@luxeinteriors.com<br />
                  Press: media@luxeinteriors.com
                </p>
              </div>
            </div>

            {/* Simulated mini Map embed placeholder */}
            <div className="glassmorphism rounded-2xl overflow-hidden aspect-[16/10] relative flex items-center justify-center border border-white/5">
              {/* Luxury map layout graphic representing location coordinate */}
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-center p-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-2 animate-bounce">
                  📍
                </div>
                <span className="font-serif text-xs text-white font-semibold">Fifth Avenue Manhattan</span>
                <span className="text-[9px] uppercase tracking-widest text-text-secondary mt-1 font-mono">
                  Latitude: 40.7644° N // Longitude: 73.9719° W
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
