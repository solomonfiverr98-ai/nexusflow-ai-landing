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
  },
  {
    title: "Millisecond Inference",
    description: "Low-latency edge processing for real-time intelligence.",
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    className: "lg:col-span-4 lg:row-span-1",
  },
  {
    title: "Enterprise Security",
    description: "SOC-2 Type II compliant agent isolation for data privacy.",
    icon: <Shield className="w-8 h-8 text-emerald-400" />,
    className: "lg:col-span-4 lg:row-span-1",
  },
  {
    title: "Infinite Scalability",
    description: "From single tasks to 10M+ concurrent agent operations.",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    className: "lg:col-span-4",
  },
  {
    title: "Native Integrations",
    description: "Connect to 2,000+ business tools via secure API gateways.",
    icon: <Network className="w-8 h-8 text-blue-400" />,
    className: "lg:col-span-4",
  },
  {
    title: "Self-Healing Workflows",
    description: "Agents automatically detect errors and re-route logic to ensure 99.99% operational uptime.",
    icon: <Workflow className="w-8 h-8 text-rose-400" />,
    className: "lg:col-span-4",
  },
];

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  className 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group relative flex flex-col p-8 rounded-3xl holographic-card tracing-border transition-all duration-500",
        className
      )}
    >
      {/* Subtle Scanline */}
      <div className="scanline" />

      {/* Holographic Glow Effect - Kept extremely subtle */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-indigo-500/10 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 mb-6 group-hover:scale-110 transition-transform duration-500">
        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
          {icon}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-brand-blue-bright transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/40 leading-relaxed font-body group-hover:text-white/60 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative Hud Elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
        <Cpu className="w-3 h-3 text-indigo-400" />
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
