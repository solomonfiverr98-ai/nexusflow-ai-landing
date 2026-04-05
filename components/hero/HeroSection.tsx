'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import InteractiveOrb and AgentWorkflow for performance
const InteractiveOrb = dynamic(() => import('./InteractiveOrb'), { ssr: false });
const AgentWorkflow = dynamic(() => import('./AgentWorkflow'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Character reveal for the title
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text
        .split("")
        .map(char => `<span class="char opacity-0 inline-block translate-y-20 rotate-12 scale-50 filter blur-sm">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      tl.to(".char", {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: {
            amount: 1.5,
            from: "start"
        },
        duration: 1.2,
      });
    }

    // Fade in text, CTA, and workflow
    tl.fromTo([textRef.current, ctaRef.current, workflowRef.current], 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, stagger: 0.3 },
      "-=0.8"
    );

    // Parallax Orb on Scroll
    gsap.to(".orb-wrapper", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 150,
      scale: 0.9,
      opacity: 0.3,
    });

    // Content drift on Scroll
    gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "30% top",
          scrub: 1,
        },
        opacity: 0,
        y: -100,
        filter: "blur(20px)"
      });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[140vh] flex flex-col items-center justify-start overflow-hidden px-4 sm:px-6 pt-32"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="hero-content relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Cinematic Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-white/5 mb-10 shadow-glow-blue animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-blue-bright" />
          <span className="text-xs font-bold text-white/70 uppercase tracking-[0.3em] font-mono">
            NexusFlow Agentic 2.1 — Live
          </span>
        </div>

        {/* Brand Headline with character-by-character reveal */}
        <h1 
          ref={titleRef}
          className="text-[40px] sm:text-[64px] md:text-[84px] lg:text-[100px] font-heading font-extrabold text-white tracking-tight leading-[1] mb-10 max-w-4xl"
        >
          Agents That Think, Build, and Ship — While You Focus.
        </h1>

        {/* Narrative Description */}
        <p 
          ref={textRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-body font-medium"
        >
          Deploy autonomous agent swarms that coordinate workflows, 
          manage codebases, and ship features 24/7. 
          Zero prompt-engineering. Infinite execution.
        </p>

        {/* Core CTAs */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} magnetic>
            Join the Waitlist — Free
          </Button>
          <Button variant="secondary" size="lg" icon={<Zap className="w-5 h-5" />} magnetic>
            Technical Deep Dive
          </Button>
        </div>
      </div>

      {/* 3D Visual Centerpiece */}
      <div className="orb-wrapper relative w-full max-w-7xl h-[400px] md:h-[600px] z-20 pointer-events-auto">
        <InteractiveOrb />
      </div>

      {/* Agent Workflow Diamond Mockup */}
      <div 
        ref={workflowRef}
        className="relative z-10 w-full mt-[-50px] pb-32"
      >
        <div className="text-center mb-16">
            <h2 className="text-sm font-mono font-bold uppercase tracking-[0.4em] text-brand-blue-bright/60 mb-2">
                Distributed Logic Network
            </h2>
            <div className="h-0.5 w-12 bg-gradient-brand mx-auto rounded-full" />
        </div>
        <AgentWorkflow />
      </div>
    </section>
  );
}

