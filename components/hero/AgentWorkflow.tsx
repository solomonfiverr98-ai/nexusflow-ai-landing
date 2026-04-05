"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Code2, LineChart, Search, Cpu, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  status: string;
  active?: boolean;
  className?: string;
  delay?: number;
}

const Node = ({ icon, label, status, active, className, delay = 0 }: NodeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={cn(
      "relative z-10 glass p-5 rounded-2xl border border-white/5 w-48 shadow-2xl overflow-hidden",
      active && "border-brand-blue/40 shadow-[0_0_40px_rgba(14,165,233,0.15)]",
      className
    )}
  >
    <div className="scanline" />
    <div className="flex items-center gap-3 mb-4">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700",
        active ? "bg-gradient-brand text-white shadow-glow-blue" : "bg-white/5 text-white/40"
      )}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono font-bold leading-none mb-1.5">
          {label}
        </span>
        <span className={cn(
          "text-[11px] font-mono font-medium truncate max-w-[100px]",
          active ? "text-brand-blue-bright" : "text-white/20"
        )}>
          {active ? (
            <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-bright animate-pulse" />
                {status}
            </span>
          ) : status}
        </span>
      </div>
    </div>
    
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ x: "-100%" }}
        animate={active ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "h-full w-full rounded-full",
          active ? "bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue" : "bg-white/10"
        )} 
      />
    </div>
  </motion.div>
);

const Connection = ({ className, active = false }: { className?: string; active?: boolean }) => (
  <div className={cn("absolute pointer-events-none overflow-hidden", className)}>
    <div className={cn(
        "w-full h-full transition-opacity duration-1000",
        active ? "opacity-100" : "opacity-10"
    )}>
        <motion.div 
            initial={{ backgroundPosition: "0% 0%" }}
            animate={active ? { backgroundPosition: ["0% 0%", "100% 100%"] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
            style={{
                backgroundImage: 'linear-gradient(90deg, transparent 0%, #38BDF8 50%, transparent 100%)',
                backgroundSize: '200% 100%',
            }}
        />
    </div>
  </div>
);

export default function AgentWorkflow() {
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[600px] mt-12 flex items-center justify-center">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-blue/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* Center Hub: Orchestrator */}
      <Node 
        icon={<Cpu className="w-6 h-6" />}
        label="Orchestrator"
        status="Synchronizing..."
        active={true}
        className="scale-125 shadow-glow-blue z-30"
        delay={0.4}
      />

      {/* Top Node: Research Agent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <Node 
          icon={<Search className="w-6 h-6" />}
          label="Research Agent"
          status="Synthesizing..."
          active={true}
          delay={0.6}
        />
        {/* Connection to Orchestrator */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-0.5 h-24 bg-white/5">
            <Connection className="w-full h-full" active={true} />
        </div>
      </div>

      {/* Left Node: Builder Agent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
        <Node 
          icon={<Code2 className="w-6 h-6" />}
          label="Builder Agent"
          status="Compiling..."
          active={true}
          delay={0.8}
        />
        {/* Connection to Orchestrator */}
        <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-28 h-0.5 bg-white/5">
            <Connection className="w-full h-full" active={true} />
        </div>
      </div>

      {/* Right Node: Analytics Agent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
        <Node 
          icon={<LineChart className="w-6 h-6" />}
          label="Analytics Agent"
          status="Optimizing..."
          active={true}
          delay={1.0}
        />
        {/* Connection to Orchestrator */}
        <div className="absolute left-[-120px] top-1/2 -translate-y-1/2 w-28 h-0.5 bg-white/5 rotate-180">
            <Connection className="w-full h-full" active={true} />
        </div>
      </div>

      {/* Bottom Node: Production Ready (Final state) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
        <Node 
          icon={<Activity className="w-6 h-6" />}
          label="Production Hub"
          status="Awaiting Sig..."
          delay={1.2}
        />
        {/* Connection to Orchestrator */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-0.5 h-20 bg-white/5">
            <Connection className="w-full h-full" />
        </div>
      </div>

      {/* Diamond Perimeter Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 600">
        <defs>
            <linearGradient id="diamondPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.1)" />
            </linearGradient>
        </defs>
        <motion.path 
            d="M 500 50 L 900 300 L 500 550 L 100 300 Z" 
            fill="none" 
            stroke="url(#diamondPathGradient)" 
            strokeWidth="1" 
            strokeDasharray="5 10"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
