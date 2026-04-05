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
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              className="flex flex-col items-center justify-center space-y-6 py-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">You're in.</h3>
                <p className="text-white/50 text-lg font-body max-w-sm mx-auto">
                    Early access begins soon. We'll reach out the moment your node is ready.
                </p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => { setState('idle'); setFormData({ name: "", email: "" }); setMessage(""); }}
                className="mt-6 glass border-white/10 text-white/60 hover:text-white"
              >
                Return to Network
              </Button>
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
