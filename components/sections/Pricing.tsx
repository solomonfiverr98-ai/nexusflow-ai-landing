'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Globe, Shield, Cpu, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const plans = [
  {
    name: "Node",
    description: "For individual builders and single-repo projects.",
    price: "0",
    features: [
      "1 Autonomous Agent Node",
      "5GB Inference Bandwidth",
      "Standard LLM Models",
      "2,000+ API Integrations",
      "Community Support"
    ],
    cta: "Start Free",
    popular: false,
    icon: <Cpu className="w-6 h-6" />
  },
  {
    name: "Cluster",
    description: "For scaling teams and production infrastructure.",
    price: "199",
    features: [
      "25 Autonomous Agent Nodes",
      "Unlimited Inference",
      "Custom Model Support",
      "SOC-2 Type II Security",
      "Distributed Builder Swarm",
      "24/7 Priority Support"
    ],
    cta: "Join the Cluster",
    popular: true,
    icon: <Activity className="w-6 h-6 text-brand-blue-bright" />
  },
  {
    name: "Grid",
    description: "Enterprise-grade logic for massive global scale.",
    price: "Custom",
    features: [
      "Infinite Agent Nodes",
      "Dedicated Edge Compute",
      "Private Model Hosting",
      "Air-Gapped Isolation",
      "On-Premise Deployment",
      "Dedicated Logic Architect"
    ],
    cta: "Configure Grid",
    popular: false,
    icon: <Globe className="w-6 h-6 text-purple-400" />
  }
];

export default function Pricing() {
  return (
    <section className="py-32 relative px-4 sm:px-6 overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-blue/5 blur-[150px] rounded-full" />
        </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Predictable <span className="text-brand-blue-bright">Scale.</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto font-body text-lg">
                NexusFlow pricing is tied to execution, not seats. 
                Deploy agent nodes as your logic grid grows.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className={cn(
                "group relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500",
                plan.popular 
                  ? "bg-white/[0.03] border-brand-blue/30 shadow-[0_0_80px_rgba(14,165,233,0.15)] ring-1 ring-brand-blue/40" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-brand-blue-bright text-xs font-mono font-bold text-white uppercase tracking-widest shadow-glow-blue">
                  Most Popular
                </div>
              )}

              <div className="mb-10 flex items-center justify-between">
                <div className={cn(
                    "p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-500",
                    plan.popular && "bg-brand-blue/10 border-brand-blue/20"
                )}>
                  {plan.icon}
                </div>
                {plan.name === "Node" && (
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Alpha_v0.1</span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-3xl font-heading font-bold text-white mb-3">
                  {plan.name}
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed h-10">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-heading font-extrabold text-white">
                  {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                </span>
                {plan.price !== "Custom" && (
                    <span className="text-white/20 font-mono text-xs uppercase tracking-widest">/ Node / Month</span>
                )}
              </div>

              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-0.5 rounded-full bg-brand-blue-bright/10 border border-brand-blue-bright/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-blue-bright" />
                    </div>
                    <span className="text-sm font-body text-white/50 group-hover:text-white/70 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "primary" : "secondary"} 
                size="lg" 
                className="w-full"
                magnetic
              >
                {plan.cta}
              </Button>

              {/* Decorative Scanline */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
