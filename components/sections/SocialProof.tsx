'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Nexus Labs", "Aether VC", "Vector Dynamics", "Sentient Capital", 
  "Parity Systems", "Flow Intelligence", "Cognitive Core", "Alpha Node"
];

export default function SocialProof() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center overflow-hidden">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-mono font-bold text-white/30 text-center">
            Distributed Intelligence Backed by the Best
        </h3>
      </div>

      <div className="relative flex overflow-hidden">
        {/* First Marquee Row */}
        <motion.div 
            animate={{ x: [0, -100 + "%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 pr-16"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
                {logos.map((logo) => (
                    <div key={logo} className="flex items-center gap-2 group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-125 transition-all duration-300" />
                        <span className="text-2xl md:text-3xl font-heading font-extrabold text-white/20 group-hover:text-white/60 transition-colors duration-500 tracking-tighter">
                            {logo}
                        </span>
                    </div>
                ))}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Second Marquee Row (Duplicate for seamless loop) */}
        <motion.div 
            animate={{ x: [0, -100 + "%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 pr-16 absolute top-0 left-full h-full items-center"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
                {logos.map((logo) => (
                    <div key={logo} className="flex items-center gap-2 group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-125 transition-all duration-300" />
                        <span className="text-2xl md:text-3xl font-heading font-extrabold text-white/20 group-hover:text-white/60 transition-colors duration-500 tracking-tighter">
                            {logo}
                        </span>
                    </div>
                ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Gradients on edges for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
