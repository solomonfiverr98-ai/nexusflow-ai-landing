# Deployment Guide: NexusFlow AI (Cloudflare Pages)

This guide outlines the steps to deploy the **NexusFlow AI** landing page to **Cloudflare Pages**.

## 🚀 1. Repository Preparation
Ensure all changes are pushed to your primary branch (e.g., `main`).
```bash
# Our final production push
git push origin main
```

## 📦 2. Cloudflare Pages Configuration
1.  **Dashboard:** Log in to [dash.cloudflare.com](https://dash.cloudflare.com/).
2.  **Create Project:** Go to **Workers & Pages > Create application > Pages**.
3.  **Connect Git:** Choose your GitHub repository: `solomonfiverr98-ai/nexusflow-ai-landing`.
4.  **Build Settings:**
    - **Framework Preset:** `Next.js`
    - **Build Command:** `npx @cloudflare/next-on-pages@1`
    - **Build Output Directory:** `.next`
    - **Root Directory:** `/`
5.  **Environment Variables:** Add these from your dashboards:
    - `NEXT_PUBLIC_SUPABASE_URL` → From Supabase Project Settings
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → From Supabase Project Settings
    - `RESEND_API_KEY` → From Resend API keys (if using server-side forms)
6.  **Compatibility Flag (CRITICAL):** 
    - Go to **Settings > Functions > Compatibility Flags**.
    - Set the **Production** flag to `2024-05-02` or newer.
    - Set the **Node.js compatibility** flag to `enabled` or add `NODE_VERSION: 20` to variables.

## ⚙️ 3. Optimization Checklist
- [x] **SEO:** `robots.txt` and `sitemap.xml` are dynamically generated in the `app/` directory.
- [x] **Metadata:** `metadataBase` is set to `https://nexusflow.ai`.
- [x] **Assets:** High-resolution `og-image.png` and `favicon.png` are in the `public/` directory.
- [x] **Build:** `npm run build` verified with 0 errors/warnings on Next.js 15+.

## 🛠 4. Maintenance
- **Auto-Deploys:** Every commit to `main` triggers a new production build.
- **Preview URLs:** Pull requests generate unique staging links automatically.

---
**© 2026 NexusFlow Labs. Production Build Verified.**
