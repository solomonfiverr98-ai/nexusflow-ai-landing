"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Code2, Rocket, Search, Cpu, Zap, CheckCircle2 } from "lucide-react";
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
      "relative z-10 glass p-4 rounded-2xl border border-white/5 w-44 shadow-2xl overflow-hidden",
      active && "border-brand-blue/30 shadow-[0_0_30px_rgba(14,165,233,0.1)]",
      className
    )}
  >
    <div className="scanline" />
    <div className="flex items-center gap-3 mb-3">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500",
        active ? "bg-gradient-brand text-white" : "bg-white/5 text-white/40"
      )}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono font-bold leading-none mb-1">
          {label}
        </span>
        <span className={cn(
          "text-[11px] font-mono font-medium",
          active ? "text-brand-blue-bright" : "text-white/20"
        )}>
          {status}
        </span>
      </div>
    </div>
    
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ x: "-100%" }}
        animate={active ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={cn(
          "h-full w-full rounded-full",
          active ? "bg-gradient-brand" : "bg-white/10"
        )} 
      />
    </div>
  </motion.div>
);

const Connection = ({ className, delay = 0, active = false }: { className?: string; delay?: number; active?: boolean }) => (
  <div className={cn("absolute pointer-events-none overflow-hidden", className)}>
    <div className={cn(
        "w-full h-full transition-opacity duration-1000",
        active ? "opacity-100" : "opacity-20"
    )}>
        {/* Animated flow line */}
        <motion.div 
            initial={{ offset: 0 }}
            animate={{ offset: [0, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
        >
            <svg width="100%" height="100%" preserveAspectRatio="none">
                <line 
                    x1="0" y1="50%" x2="100%" y2="50%" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="2" 
                    strokeDasharray="4 8"
                />
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    </div>
  </div>
);

export default function AgentWorkflow() {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] mt-12 flex items-center justify-center">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-blue/5 via-transparent to-transparent blur-3xl" />

      {/* Center Core Node */}
      <Node 
        icon={<Cpu className="w-5 h-5" />}
        label="Orchestrator"
        status="System_Active"
        active={true}
        className="scale-110 shadow-glow-blue z-20"
        delay={0.5}
      />

      {/* Top Node: Research */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <Node 
          icon={<Search className="w-5 h-5" />}
          label="Researcher"
          status="Synthesizing..."
          active={true}
          delay={0.7}
        />
        <Connection className="h-20 w-1 bottom-[-80px] left-1/2 -translate-x-1/2 rotate-90" active={true} />
      </div>

      {/* Bottom Node: Deploy */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Node 
          icon={<Rocket className="w-5 h-5" />}
          label="Shipper"
          status="Waiting_Signal"
          delay={1.1}
        />
        <Connection className="h-20 w-1 top-[-80px] left-1/2 -translate-x-1/2 rotate-90" />
      </div>

      {/* Left Node: Builder */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <Node 
          icon={<Code2 className="w-5 h-5" />}
          label="Engineer"
          status="Processing_Code"
          active={true}
          delay={0.9}
        />
        <Connection className="w-24 h-1 right-[-96px] top-1/2 -translate-y-1/2" active={true} />
      </div>

      {/* Right Node: Quality */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <Node 
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="QA_Agent"
          status="Idle"
          delay={1.3}
        />
        <Connection className="w-24 h-1 left-[-96px] top-1/2 -translate-y-1/2" />
      </div>

      {/* Connecting Path Indicators */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.2))' }}>
        <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14, 165, 233, 0.2)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
            </linearGradient>
        </defs>
        <path 
            d="M 50% 10% L 90% 50% L 50% 90% L 10% 50% Z" 
            fill="none" 
            stroke="url(#diamondGradient)" 
            strokeWidth="1" 
            strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
