"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 transition-all duration-500 pointer-events-none",
        isScrolled ? "pt-4" : "pt-8"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-between w-full max-w-7xl px-6 py-3 border rounded-full glass transition-all duration-500 pointer-events-auto",
          isScrolled ? "border-brand-blue/20 bg-background/80 shadow-lg" : "border-white/5 bg-background/40"
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-sm tracking-tighter">NF</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">
              Nexus<span className="text-brand-blue-bright">Flow</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Solutions", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="text-sm font-medium text-foreground/60 hover:text-white transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue-bright transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/60 hover:text-white">
            Log In
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            magnetic 
            className="shadow-glow-blue"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

