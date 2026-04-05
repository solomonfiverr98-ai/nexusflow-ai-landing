"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = false, icon, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const innerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!magnetic || !buttonRef.current) return;

      const el = buttonRef.current;
      const inner = innerRef.current;

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(el, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });

        if (inner) {
          gsap.to(inner, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to([el, inner], {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    }, [magnetic]);

    const variants = {
      primary: "bg-gradient-brand text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)]",
      secondary: "border border-brand-blue/30 text-brand-blue-bright hover:bg-brand-blue/10",
      ghost: "text-foreground/80 hover:text-foreground hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-8 py-4 text-base gap-3",
      lg: "px-10 py-5 text-lg font-semibold gap-3",
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span ref={innerRef} className="relative z-10 flex items-center gap-inherit">
          {children}
          {icon && <span className="flex-shrink-0">{icon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
