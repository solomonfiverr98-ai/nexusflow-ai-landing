'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, Clock, XCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const problems = [
  {
    icon: <XCircle className="w-6 h-6 text-rose-500" />,
    label: "Fragmentation",
    text: "Broken context across 50+ tools."
  },
  {
    icon: <Clock className="w-6 h-6 text-amber-500" />,
    label: "Latency",
    text: "Human-in-the-loop bottlenecks."
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
    label: "Fragility",
    text: "Brittle scripts that break on updates."
  }
];

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".problem-label", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".problem-title span", {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out"
    }, "-=0.4")
    .from(".problem-card", {
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    // Parallax background elements
    gsap.to(".bg-drift", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: 100,
      rotate: 5
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden px-4 sm:px-6"
    >
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full bg-drift" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="problem-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-400 font-mono tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            The Crisis of Scale
          </div>

          <h2 className="problem-title text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1]">
            {"Managing infrastructure manually is now a".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3">{word}</span>
            ))}
            <span className="text-rose-500">{"Strategic Liability."}</span>
          </h2>

          <p className="text-white/40 text-lg md:text-xl font-body max-w-xl leading-relaxed">
            While industry leaders scale with autonomous logic, 80% of DevOps teams 
            are buried in "Reactive Ops"—shifting from one brittle automation to the next. 
            NexusFlow ends the cycle of operational decay.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {problems.map((p, i) => (
              <div 
                key={i}
                className="problem-card glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-rose-500/30 transition-all duration-500 hover:bg-rose-500/5 shadow-inner"
              >
                <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:bg-rose-500/20 group-hover:scale-110 transition-all duration-500">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-white font-heading font-bold mb-1 group-hover:text-rose-400 transition-colors">{p.label}</h4>
                  <p className="text-white/30 text-sm font-body group-hover:text-white/50 transition-colors">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          {/* Visualizing "Chaos" vs "Order" */}
          <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Chaos Mesh Layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-dashed border-white/10 animate-spin-slow opacity-40" />
              <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-rose-500/20 animate-spin-slow reverse opacity-60" />
              <div className="absolute w-[70%] h-[70%] rounded-full border border-dotted border-rose-500/10 animate-pulse-slow" />
            </div>

            {/* Floating Error Nodes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: [0, Math.random() * 40 - 20, 0],
                        y: [0, Math.random() * 40 - 20, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-rose-500 rounded-full blur-[2px]"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`
                    }}
                />
            ))}

            {/* Central "Nexus" Core (Visual hint of the Hero Orb) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-[60px] group-hover:bg-rose-500/20 transition-colors duration-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 glass rounded-[2rem] flex items-center justify-center border border-rose-500/40 shadow-glow-rose group-hover:scale-110 transition-transform duration-700">
                <AlertTriangle className="w-10 h-10 text-rose-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
