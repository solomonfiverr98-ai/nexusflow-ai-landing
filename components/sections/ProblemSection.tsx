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
            {"Legacy systems are drowning in".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3">{word}</span>
            ))}
            <span className="text-rose-500">{"Reactive Complexity."}</span>
          </h2>

          <p className="text-white/40 text-lg md:text-xl font-body max-w-xl leading-relaxed">
            While your competitors scale with autonomous logic, your teams are 
            stuck managing brittle automations and prompt-switching. 
            NexusFlow isn't just another tool—it's the antidote to operational decay.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {problems.map((p, i) => (
              <div 
                key={i}
                className="problem-card glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-rose-500/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:bg-rose-500/10 transition-colors">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-white font-heading font-bold mb-1">{p.label}</h4>
                  <p className="text-white/30 text-sm font-body">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Visualizing "Chaos" vs "Order" */}
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Chaos Mesh */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-dashed border-white/10 animate-spin-slow" />
              <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-rose-500/10 animate-spin-slow reverse" />
            </div>

            {/* Central "Nexus" Core (Visual hint of the Hero Orb) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass rounded-2xl flex items-center justify-center border border-rose-500/40 shadow-glow-rose">
                <AlertTriangle className="w-8 h-8 text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
