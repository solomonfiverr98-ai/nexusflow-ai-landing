import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import BentoGrid from '@/components/features/BentoGrid';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import ProblemSection from '@/components/sections/ProblemSection';
import SocialProof from '@/components/sections/SocialProof';
import { Globe, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-brand-blue/30 selection:text-white">
      {/* Global Background Noise/Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Global Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[90] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      <Navbar />
      
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Cinematic Hero */}
        <HeroSection />
        
        {/* Social Proof Marquee */}
        <SocialProof />
        
        {/* Problem Definition */}
        <ProblemSection />

        {/* Technical Capabilities / Solution */}
        <div className="relative">
            {/* Transition Gradient */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
            <BentoGrid />
        </div>

        {/* Priority Waitlist Access */}
        <WaitlistForm />
      </main>

      {/* Modern Cinematic Footer */}
      <footer className="relative z-10 py-24 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center font-bold text-white text-lg shadow-glow-blue">N</div>
              <span className="text-2xl font-heading font-extrabold text-white tracking-[0.2em] uppercase">NexusFlow</span>
            </div>
            <p className="text-white/40 text-sm font-body max-w-sm text-center md:text-left leading-relaxed">
              The autonomous multi-agent operating system for the next generation of enterprise logic.
              Distributed. Intelligent. Invisible.
            </p>
          </div>

          <div className="flex items-center gap-10">
            {[Zap, Globe, Shield].map((Icon, idx) => (
                <a key={idx} href="#" className="text-white/20 hover:text-brand-blue-bright transition-all duration-300 hover:scale-110">
                    <Icon className="w-6 h-6" />
                </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-white/20">
            <span>© 2026 NexusFlow Labs</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Stack Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
