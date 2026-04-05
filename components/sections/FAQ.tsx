'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How does NexusFlow handle agent hallucinations?",
    answer: "Every logic step is cross-verified by a separate 'Verifier' agent node using our proprietary Consensus Protocol. If the output doesn't match the initial intent, the cycle re-runs automatically with adjusted parameters."
  },
  {
    question: "Can I deploy on-premise for high-security environments?",
    answer: "Yes. Our 'Grid' tier allows for completely air-gapped deployments within your own private cloud or bare-metal infrastructure. No data ever leaves your network."
  },
  {
    question: "Which LLM models does the platform use?",
    answer: "NexusFlow is model-agnostic. By default, we use a fine-tuned ensemble of Gemini 1.5 Pro and Flash for speed and reasoning, but you can integrate custom models via our standard API gateway."
  },
  {
    question: "Do I need to learn a new language to use NexusFlow?",
    answer: "No. You define your intent in natural language or standard Markdown. NexusFlow translates this into executable logic. Expert users can also use our TypeScript SDK for deeper control."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }: { 
    question: string; 
    answer: string; 
    isOpen: boolean; 
    onClick: () => void; 
}) => {
  return (
    <div className={cn(
        "border-b border-white/5 transition-all duration-500",
        isOpen && "bg-white/[0.02]"
    )}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 px-6 text-left group"
      >
        <span className="text-xl md:text-2xl font-heading font-medium text-white group-hover:text-brand-blue-bright transition-colors">
          {question}
        </span>
        <div className={cn(
            "p-2 rounded-full border border-white/10 transition-transform duration-500",
            isOpen ? "rotate-180 bg-brand-blue/20 border-brand-blue/30" : "group-hover:bg-white/10"
        )}>
           {isOpen ? <Minus className="w-5 h-5 text-brand-blue-bright" /> : <Plus className="w-5 h-5 text-white/40" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-6 max-w-3xl text-white/40 font-body text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <HelpCircle className="w-3 h-3 text-white/40" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">Query Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Frequently Asked <span className="text-brand-blue-bright">Questions.</span>
            </h2>
            <p className="text-white/40 font-body text-lg">
                Technical insights into the NexusFlow agentic ecosystem.
            </p>
        </div>

        <div className="border-t border-white/5">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              {...faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
        
        {/* Decorative HUD detail */}
        <div className="mt-12 p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">System_Status: Optimal</span>
            <div className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75" />
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150" />
            </div>
        </div>
      </div>
    </section>
  );
}
