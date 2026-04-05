# Implementation Plan: NexusFlow AI Cinematic Landing Page

Creating a high-converting, Awwwards-level landing page that reflects the 2026 "Autonomous Multi-Agent" aesthetic.

## User Review Required

> [!IMPORTANT]
> **Tech Stack Confirmation:** We are using **Next.js 15 (App Router)**, **GSAP + ScrollTrigger** for cinematic story-telling, and **Framer Motion** for tactical micro-interactions.
> **Supabase & Resend:** For the waitlist, we need valid keys in `.env`. I will implement the logic with placeholders first.
> **3D Assets:** The "Hero Orb" will be implemented using a lightweight **Three.js** canvas or a high-end CSS-based shader to maintain Performance (Lighthouse 90+).

## Proposed Changes

### 1. 🎨 Design System & Tokens
We will map [design-tokens.json](file:///c:/Users/user/Desktop/Vibe%20Code/Nexus%20Flow/.agent/skills/brand-identity/resources/design-tokens.json) to Tailwind CSS variables.

- **Background:** Deep space black `#020408`.
- **Brand Glows:** Electric Blue (`#0EA5E9`) and Deep Purple (`#8B5CF6`).
- **Glassmorphism:** `rgba(13, 27, 48, 0.6)` with `backdrop-blur-xl`.
- **Typography:** Fluid scale for "Cal Sans" / "Plus Jakarta Sans".

### 2. 🎬 Animation Strategy (The "2026 Elevation")
We are moving beyond standard Framer fades to a more technical, "autonomous" feel:

| Element | Technology | Animation Pattern |
| :--- | :--- | :--- |
| **Hero Headline** | GSAP | **Character-by-character text reveal** (simulating AI calculation) |
| **Agent Orb** | Three.js / CSS | **Pulsing "Thinking" state** with particle orbiting |
| **Scroll Narrative** | ScrollTrigger | **Magnetic Agent Nodes** (cards that "float" and connect via SVG lines as you scroll) |
| **Feature Cards** | Framer Motion | **Holographic Tilt** + Glowing border tracing on hover |
| **Waitlist CTA** | GSAP | **Magnetic Hover** effect (button pulls toward cursor) |

### 3. ✍️ Copy & Messaging
Refined based on [voice-tone.md](file:///c:/Users/user/Desktop/Vibe%20Code/Nexus%20Flow/.agent/skills/brand-identity/resources/voice-tone.md):
- **Hero:** "Agents That Think, Build, and Ship — While You Focus."
- **Problem:** "Stop Coordinating. Start Shipping."
- **Social Proof:** "We replaced 3 manual workflows with NexusFlow agents in a single afternoon."

### 4. 🛰️ Integration & Data
- **Supabase:** Hooking up the `waitlist` table.
- **Resend:** Automating double-opt-in confirmation emails.
- **Zod:** Robust server-side validation for the signup form.

---

## Open Questions

- **Hero Visual:** Do you prefer a **Minimalist 3D Orb** (Apple/Siri style) or a **Technical Node Graph** (Plexus/Network style) as the primary hero visual?
- **Waitlist Flow:** Should the user get an immediate "Welcome PDF" or just a success state?

## Verification Plan

### Automated Tests
- `npm run build` to ensure zero hydration/lint errors.
- **Lighthouse CI** to verify 90+ scores.
- **Zod Schema Tests** for form validation.

### Manual Verification
- Visual audit of animations on 120Hz displays and 60Hz mobile screens.
- Test form submission with placeholder Supabase credentials.
