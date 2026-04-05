'use client';

import React from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Bot, 
  Zap, 
  Shield, 
  Workflow, 
  Layers, 
  Cpu, 
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "Autonomous Agent Orchestration",
    description: "Chain multi-agent workflows that reason, verify, and execute tasks across your entire enterprise stack.",
    icon: <Bot className="w-10 h-10 text-indigo-400" />,
    className: "lg:col-span-8 lg:row-span-2",
    simulation: "nodes"
  },
  {
    title: "Millisecond Inference",
    description: "Low-latency edge processing for real-time intelligence.",
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    className: "lg:col-span-4 lg:row-span-1",
    simulation: "pulse"
  },
  {
    title: "Enterprise Security",
    description: "SOC-2 Type II compliant agent isolation for data privacy.",
    icon: <Shield className="w-8 h-8 text-emerald-400" />,
    className: "lg:col-span-4 lg:row-span-1",
    simulation: "scan"
  },
  {
    title: "Infinite Scalability",
    description: "From single tasks to 10M+ concurrent agent operations.",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    className: "lg:col-span-4",
    simulation: "grid"
  },
  {
    title: "Native Integrations",
    description: "Connect to 2,000+ business tools via secure API gateways.",
    icon: <Network className="w-8 h-8 text-blue-400" />,
    className: "lg:col-span-4",
    simulation: "circles"
  },
  {
    title: "Self-Healing Workflows",
    description: "Agents automatically detect errors and re-route logic to ensure 99.99% operational uptime.",
    icon: <Workflow className="w-8 h-8 text-rose-400" />,
    className: "lg:col-span-4",
    simulation: "radar"
  },
];

const HoverSimulation = ({ type }: { type?: string }) => {
  if (!type) return null;

  switch (type) {
    case "nodes":
      return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      );
    case "scan":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      );
    case "pulse":
      return (
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
        </div>
      );
    default:
      return null;
  }
};

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  className,
  simulation
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  className?: string;
  simulation?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative flex flex-col p-8 rounded-3xl holographic-card tracing-border transition-all duration-500 overflow-hidden",
        className
      )}
    >
      <HoverSimulation type={simulation} />
      
      {/* Subtle Scanline */}
      <div className="scanline" />

      {/* Holographic Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 mb-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:shadow-glow-blue transition-all">
          {icon}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-brand-blue-bright transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/40 leading-relaxed font-body group-hover:text-white/70 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative Hud Elements */}
      <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
        <Cpu className="w-3 h-3 text-white/50" />
      </div>
    </motion.div>
  );
};

export default function BentoGrid() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".bento-header > *", {
      scrollTrigger: {
        trigger: ".bento-header",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Card reveal stagger
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: ".bento-grid-container",
        start: "top 70%",
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 relative px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bento-header text-center mb-20 space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] font-mono text-indigo-500 font-bold">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            The Engine of Autonomous Operations
          </h3>
          <p className="text-white/40 max-w-2xl mx-auto font-body">
            NexusFlow transforms traditional static software into dynamic, self-thinking 
            ecosystems that grow with your business logic.
          </p>
      </div>

      <div className="bento-grid-container grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 auto-rows-[280px]">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} className={cn(feature.className, "bento-card")} />
        ))}
      </div>
    </section>
  );
}
