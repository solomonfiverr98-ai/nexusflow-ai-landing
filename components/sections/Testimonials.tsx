'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const testimonials = [
  {
    quote: "The Orchestrator agent solved our multi-cloud deployment logic in roughly four minutes. We spent six months trying to build this manually. Absolutely transformative.",
    author: "Elena Vance",
    role: "VP Engineering at Horizon Labs",
    rating: 5,
    avatar: "/api/placeholder/48/48"
  },
  {
    quote: "NexusFlow isn't just another automation layer—it's the first autonomous logic engine that actually understands context. Our Builder swarm handles 90% of our BAU tickets.",
    author: "Marcus Thorne",
    role: "CTO at Vertex Systems",
    rating: 5,
    avatar: "/api/placeholder/48/48"
  },
  {
    quote: "Shipping to 14 global regions used to take a weekend. With NexusFlow, it's a 30-second background process while I focus on our product strategy. Infinite execution.",
    author: "Sarah Jenkins",
    role: "Founder at Aether Dynamics",
    rating: 5,
    avatar: "/api/placeholder/48/48"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="py-32 relative px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-12">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                    Validated by <span className="text-brand-blue-bright">Engineers.</span>
                </h2>
                <p className="text-white/40 font-body text-lg">
                    Real results from leaders managing the world's most complex 
                    distributed architectures.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={prev}
                    className="w-12 h-12 p-0 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/10"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </Button>
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={next}
                    className="w-12 h-12 p-0 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/10"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </Button>
            </div>
        </div>

        <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                    <div className="lg:col-span-8 flex flex-col items-start gap-8">
                        <div className="p-4 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                            <Quote className="w-8 h-8 text-brand-blue-bright" />
                        </div>
                        <blockquote className="text-2xl md:text-4xl font-heading font-medium text-white leading-relaxed italic">
                            "{testimonials[current].quote}"
                        </blockquote>
                        <div className="flex items-center gap-1">
                            {[...Array(testimonials[current].rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-brand-blue-bright text-brand-blue-bright" />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 lg:border-l border-white/10 lg:pl-12">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-blue-bright/20 rounded-full blur-xl scale-150 opacity-50" />
                                <div className="w-20 h-20 rounded-full border border-white/10 glass p-1 relative z-10 overflow-hidden">
                                     <img 
                                        src={testimonials[current].avatar} 
                                        alt={testimonials[current].author}
                                        className="w-full h-full rounded-full object-cover"
                                     />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-heading font-bold text-white mb-1">
                                    {testimonials[current].author}
                                </h4>
                                <p className="text-white/40 font-mono text-xs uppercase tracking-widest leading-loose">
                                    {testimonials[current].role}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-10 p-6 rounded-2xl glass border border-white/5 bg-white/5">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 mb-2">Auth Signature:</p>
                            <div className="h-0.5 w-full bg-white/5 rounded-full mb-4">
                                <motion.div 
                                    className="h-full bg-brand-blue-bright shadow-glow-blue"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                            <span className="font-mono text-[11px] text-white/30 truncate block">
                                NEXUS_VAL_ID: {Math.random().toString(16).substring(2, 14).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-20">
            {testimonials.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        current === i ? "w-8 bg-brand-blue-bright" : "bg-white/10 hover:bg-white/30"
                    )}
                />
            ))}
        </div>
      </div>
    </section>
  );
}
