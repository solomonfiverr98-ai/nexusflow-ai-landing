# Architecture SOP: Animations (NexusFlow AI)

## 1. Animation Logic
We use a hybrid approach:
- **GSAP:** Complex timelines, ScrollTrigger narratives, and high-performance transforms.
- **Framer Motion:** Interaction-heavy micro-elements (hovers, tap states, layout transitions).

## 2. Presets
### Text Reveal (GSAP)
- **Effect:** Character-by-character opacity and Y-translation.
- **Duration:** 0.8s total.
- **Stagger:** 0.02s per char.

### Magnetic Hover (GSAP)
- **Effect:** Element follows mouse cursor within a small radius (magnetic pull).
- **Implementation:** `gsap.to(el, { x: dampX, y: dampY, duration: 0.3 })`.

### Section Entrance (ScrollTrigger)
- **Trigger:** `start: "top 80%"`.
- **Effect:** Fade in + `y: 40` to `y: 0`.

## 3. Performance
- Use `will-change-transform` for heavy GSAP elements.
- Always use `dynamic()` imports for heavy animation components to avoid blocking LCP.
