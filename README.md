# NexusFlow AI — Distributed Intelligence Network

The cinematic landing page for the next generation of autonomous multi-agent operating systems. Featuring a high-performance 3D/CSS hybrid hero, reactive agent workflows, and a robust waitlist infrastructure.

## 🚀 Key Features

- **Cinematic 3D Hero:** Multi-layered "Siri-style" orb built with Three.js (Desktop) and optimized CSS (Mobile).
- **Agent Workflow:** Interactive "Diamond" architecture visualization of autonomous coordination.
- **Narrative Depth:** GSAP-powered scroll triggers and text-reveal animations.
- **Waitlist Infrastructure:** Validated form connected to Supabase and Resend.
- **Performance Optimized:** Build-safe lazy client initializations and dynamic route handling for Next.js 15.

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Visuals:** [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Animations:** [GSAP](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Email:** [Resend](https://resend.com/)

## 💻 Local Development

### 1. Prerequisites
- Node.js 18+ 
- NPM / PNPM / Bun

### 2. Installation
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
# Supabase (Required for Waitlist)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend (Required for Confirmation Emails)
RESEND_API_KEY=re_your_api_key
```

### 4. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the Environment Variables in the project settings.
4. Deploy.

### Cloudflare Pages
1. Install the `@cloudflare/next-on-pages` adapter if needed (though standard Next.js 15 build is supported via the new CI/CD pipelines).
2. Configure your build command as `npm run build`.
3. Set the Environment Variables in the Cloudflare Dashboard.

## 📂 Folder Structure

```
nexusflow-ai/
├── app/                  # Next.js App Router (Pages, API, Layout)
│   ├── api/              # Backend API routes (Waitlist)
│   └── globals.css       # Global design system & animations
├── components/           # UI Components
│   ├── features/         # Bento Grid & Capabilities
│   ├── hero/             # 3D Orb, Agent Workflow, Hero Section
│   ├── layout/           # Navbar & Footer
│   ├── sections/         # Problem/Social Proof sections
│   ├── ui/               # Primary components (Button, etc.)
│   └── waitlist/         # Form & Success states
├── lib/                  # Utilities & Shared Clients (Supabase, Resend)
├── public/               # Static assets & backgrounds
└── architecture/         # Technical documentation & Design tokens
```

## 📜 Maintenance Note
The project uses **Lazy Initializers** in `lib/supabase.ts` and `lib/resend.ts`. This ensures that even if API keys are missing during the build process, `next build` will succeed, allowing for smooth CI/CD deployments. For production functionality, ensure your environment variables are correctly mapped.

---
© 2026 NexusFlow Labs
