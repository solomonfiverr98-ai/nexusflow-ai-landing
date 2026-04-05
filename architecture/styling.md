# Architecture SOP: Styling (NexusFlow AI)

## 1. Core Tokens
- **Background:** `#020408` (Deep Space Black)
- **Primary Gradient:** `linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)`
- **Text Gradient:** `linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)`

## 2. Component Patterns
### Glassmorphism (`.glass`)
- **Background:** `rgba(13, 27, 48, 0.6)`
- **Blur:** `backdrop-blur(24px)`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`

### Buttons
- **Primary:** Full brand gradient + `shadow-[0_0_40px_rgba(14,165,233,0.3)]` on hover.
- **Secondary:** Transparent + `border-brand-blue/40` + `hover:bg-brand-blue/10`.

## 3. Atomic Rules
- Never use `#000000`.
- All cards must have a `transition-all duration-300` for hover states.
- Mobile padding: `px-6`. Desktop padding: `px-12`.
