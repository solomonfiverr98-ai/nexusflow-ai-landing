'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BrainCircuit, Cpu, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: "01",
    title: "Define Logic",
    description: "Map your enterprise requirements in simple markdown or natural language. NexusFlow's Orchestrator decodes complex intent into atomic agent tasks.",
    icon: <BrainCircuit className="w-8 h-8 text-indigo-400" />,
    image: "/api/placeholder/600/400", // Will use visual abstractions
    color: "bg-indigo-500/20"
  },
  {
    number: "02",
    title: "Autonomous Build",
    description: "The Builder swarm generates code, configures infrastructure, and integrates security protocols in parallel. Zero manual intervention required.",
    icon: <Cpu className="w-8 h-8 text-brand-blue-bright" />,
    image: "/api/placeholder/600/400",
    color: "bg-brand-blue/20"
  },
  {
    number: "03",
    title: "Instant Deployment",
    description: "Continuous validation agents verify every line before shipping to edge nodes globally. Scale from dev to production in under 60 seconds.",
    icon: <Ship className="w-8 h-8 text-purple-400" />,
    image: "/api/placeholder/600/400",
    color: "bg-purple-500/20"
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".how-step", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 1.2,
      ease: "power4.out"
    });

    // Connecting line animation
    gsap.from(".connect-line", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 80%",
        scrub: 1
      },
      scaleY: 0,
      transformOrigin: "top"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 relative px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 overflow-hidden">
          <motion.h2 
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            From Intent to <span className="text-brand-blue-bright">Production.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white/40 max-w-2xl mx-auto font-body text-lg"
          >
            The NexusFlow pipeline automates the entire software lifecycle using 
            distributed intelligence.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Path Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block">
            <div className="connect-line w-full h-full bg-gradient-to-b from-brand-blue-bright via-purple-500 to-transparent" />
          </div>

          <div className="space-y-32">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className={cn(
                  "how-step flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative",
                  idx % 2 !== 0 && "lg:flex-row-reverse"
                )}
              >
                {/* Visual Side */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className={cn(
                        "absolute -inset-4 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700",
                        step.color
                    )} />
                    <div className="relative aspect-video rounded-2xl border border-white/10 glass overflow-hidden flex items-center justify-center p-12">
                        {/* Abstract Step Visual */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="z-10"
                            >
                                {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { 
                                  className: "w-24 h-24 text-white opacity-20" 
                                })}
                            </motion.div>
                            
                            {/* HUD Overlays */}
                            <div className="absolute bottom-4 left-6 font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                                Status: Executing_Logic
                            </div>
                            <div className="absolute top-4 right-6 font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                                Phase_{step.number}
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-brand-blue-bright font-mono text-sm font-bold mb-6">
                    Step {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-lg leading-relaxed font-body mb-8">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="h-0.5 w-12 bg-brand-blue-bright/30 rounded-full" />
                    <span className="text-xs font-mono text-white/20 uppercase tracking-widest italic">Core Protocol Active</span>
                  </div>
                </div>

                {/* Connection Dot - Desktop only */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden lg:block z-20">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-brand-blue-bright shadow-glow-blue" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
