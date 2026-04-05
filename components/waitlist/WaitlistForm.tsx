'use client';

import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Send, CheckCircle2, Loader2, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Validation schema
const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid business email."),
});

type WaitlistFormState = 'idle' | 'loading' | 'success' | 'error';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [state, setState] = useState<WaitlistFormState>('idle');
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const result = waitlistSchema.safeParse(formData);
    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      setState('loading');
      
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        // Handle the "already on list" case which comes back as 200 with a message
        if (data.message) {
          setMessage(data.message);
        }

        setState('success');
      } catch (err: any) {
        setState('error');
        setMessage(err.message || "Failed to join. Please try again.");
      }
    });
  };

  return (
    <div id="waitlist" className="w-full max-w-2xl mx-auto py-32 px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 glass border border-white/5 rounded-[40px] p-10 md:p-16 text-center shadow-2xl overflow-hidden">
        <div className="scanline opacity-20" />
        
        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="max-w-2xl mx-auto glass p-16 rounded-[3rem] border border-brand-blue/30 text-center relative overflow-hidden"
            >
              {/* Success Background Ambience */}
              <div className="absolute inset-0 bg-brand-blue/5 -z-10 animate-pulse-slow" />
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-blue-bright/10 blur-[120px] rounded-full pointer-events-none" />

              <div className="mb-10 relative">
                <div className="w-24 h-24 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto shadow-glow-blue relative z-10 scale-110">
                  <CheckCircle2 className="w-12 h-12 text-brand-blue-bright animate-bounce-subtle" />
                </div>
                {/* Decorative Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-brand-blue/20 rounded-full animate-ping opacity-20" />
              </div>

              <h2 className="text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                Access Status: <span className="text-brand-blue-bright">Reserved.</span>
              </h2>
              
              <p className="text-white/40 text-lg font-body leading-relaxed mb-10 max-w-sm mx-auto">
                Your node ID has been registered in the Alpha-v2.1 queue. 
                Keep an eye on <span className="text-white/70 italic">{formData.email}</span> for your invite key.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold italic">Verification Signature:</span>
                  <div className="font-mono text-xs text-brand-blue-bright/60 break-all select-all hover:text-brand-blue-bright transition-colors cursor-pointer">
                      {Math.random().toString(36).substring(2, 18).toUpperCase()}_{Date.now()}
                  </div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-bright shadow-glow-blue animate-pulse" />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">Queue Position Monitoring Active</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-brand-blue-bright font-mono tracking-[0.3em] uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Priority Protocol 2.1
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1]">
                  Secure Your Seat in <br/>
                  <span className="text-gradient-brand">the Network.</span>
                </h2>
                <p className="text-white/40 max-w-md mx-auto text-lg font-body">
                  Limited nodes are opening for early adopters of autonomous operations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-blue-bright transition-colors" />
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                      disabled={state === 'loading'}
                      className={cn(
                        "w-full h-16 bg-white/[0.03] border rounded-2xl pl-14 pr-6 outline-none transition-all duration-500 font-body text-white placeholder:text-white/20",
                        "border-white/5 focus:border-brand-blue/30 focus:bg-brand-blue/5"
                      )}
                    />
                  </div>

                  <div className="relative group">
                    <Send className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-blue-bright transition-colors" />
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enterprise Email"
                      disabled={state === 'loading'}
                      className={cn(
                        "w-full h-16 bg-white/[0.03] border rounded-2xl pl-14 pr-6 outline-none transition-all duration-500 font-body text-white placeholder:text-white/20",
                        "border-white/5 focus:border-brand-blue/30 focus:bg-brand-blue/5"
                      )}
                    />
                  </div>
                </div>

                <Button 
                    variant="primary" 
                    className="w-full h-16 text-lg font-bold shadow-glow-blue" 
                    type="submit"
                    disabled={state === 'loading'}
                    magnetic
                >
                    {state === 'loading' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                    <span className="flex items-center justify-center gap-2">
                        Get Early Access <ArrowRight className="w-5 h-5" />
                    </span>
                    )}
                </Button>

                <AnimatePresence>
                  {message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn(
                        "text-sm font-body font-medium mt-4",
                        state === 'error' ? "text-rose-400" : "text-brand-blue-bright"
                      )}
                    >
                      {message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <div className="flex items-center justify-center gap-8 pt-4">
                  {['Secure', 'Privacy First', 'High Priority'].map((tag) => (
                      <span key={tag} className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
                          {tag}
                      </span>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
