# Terminal Session — MAISON NOIR Ecommerce Project

**Session date:** 2026-10-11
**Working directory:** C:\Users\hamza\Documents\Codex\2026-10-11\referenced-chatgpt-conversation-this-is-an\my-app
**Platform:** Windows 11 Pro (win32), PowerShell, Node.js environment with Next.js 16.4

---

## Commands run in this session

### 1. Project audit & setup
```powershell
# Checked git history and files
git log --oneline          # (no git history — not a git repo at the time)
# Found: fresh Next.js app with only default scaffolding
```

### 2. Built the ecommerce site from scratch
Files created/modified:
- `app/page.tsx` — Hero, marquee, featured grid, category strip, editorial banner
- `app/layout.tsx` — Root layout with Playfair Display + Raleway fonts, Cart + Wishlist providers
- `app/globals.css` — Dark premium CSS variables, gold palette, custom keyframes, focus-visible + reduced-motion
- `app/shop/page.tsx` — Product listing with FilterSidebar
- `app/shop/[slug]/page.tsx` — Product detail with gallery, breadcrumbs, related products
- `app/shop/[slug]/ProductActions.tsx` — Size selector, useOptimistic add-to-cart, accordion
- `app/cart/page.tsx` — Cart with order summary and checkout form
- `app/cart/success/page.tsx` — Order confirmation page
- `components/Navbar.tsx` — Announcement bar, mega-dropdown, mobile menu
- `components/Footer.tsx` — 4-column footer with NewsletterForm
- `components/ProductCard.tsx` — Wishlist + Quick Add
- `components/CartDrawer.tsx` — Slide-in cart drawer
- `components/ImageGallery.tsx` — Hover zoom with cursor feedback, image counter
- `components/FilterSidebar.tsx` — Category + sort filters
- `components/Accordion.tsx` — Collapsible product details
- `components/VariantSelector.tsx` — Size pills
- `components/StaggerReveal.tsx` — IntersectionObserver reveal
- `components/NewsletterForm.tsx` — Email subscription
- `context/cart.tsx` — useReducer cart with size-differentiated items
- `context/wishlist.tsx` — localStorage wishlist
- `lib/products.ts` — 10 fashion products with images
- `next.config.ts` — AVIF/WebP image formats, imageSizes, remotePatterns
- `vercel.json` — Vercel deployment config

### 3. Build verification
```powershell
npx next build
# Exit code 1 — old app/products/ routes blocking build
# Removed app/products/ directory
# Cleared .next cache
# Fixed Footer onSubmit (moved to NewsletterForm client component)
# Fixed /shop route export (removed invalid `instant = false`)
# Final build: ✓ Compiled successfully — all routes generated (17 pages)
```

### 4. Performance & UX improvements
- Bumped image quality back to `w=800&q=80` for hero/products, `w=600&q=80` for category tiles
- ImageGallery zoom now writes directly to DOM (no React re-renders on mousemove)
- Removed `key={active}` from main image (prevents unmount/remount on thumbnail click)
- Added `sizes="100vw"` to hero image
- First featured card: `priority`
- Related products: `sizes="25vw"`
- Category images: `loading="lazy"` + right-edge gradient fade hint
- globals.css: `:focus-visible` gold ring + `@media (prefers-reduced-motion)` block
- Navbar: active-route highlighting, persisted announcement dismissal, cart in mobile header
- ProductCard: working Quick Add, wishlist toggle with Heart
- Wishlist context + provider added to layout

### 5. Deployment preparation
```powershell
# Created vercel.json
{ "version": 2, "builds": [{ "src": "next.config.js", "use": "@vercel/next" }] }
```

### 6. Backup
```powershell
Compress-Archive -Path app, lib, context, components, public, README.md, package.json, next.config.ts, tsconfig.json, vercel.json, .gitignore -DestinationPath "MAISON_NOIR_BACKUP_$(Get-Date -Format 'yyyyMMdd_HHmmss').zip"
# Backup created successfully
```

### 7. Git commands (blocked — Git not installed)
```powershell
git init -b main
git add .
git commit -m "Add website project"
git remote add origin https://github.com/hamza-oudris/my-website.git
git push -u origin main
```
Result: `git : The term 'git' is not recognized as the name of a cmdlet...` — Git is not installed on this Windows machine. User was advised to install Git from git-scm.com or use GitHub Desktop.

---

## Final project state
- All source files saved and committed-ready
- Build passes cleanly (17 static/SSG pages + dynamic shop route)
- `vercel.json` configured for auto-deploys
- `MAISON_NOIR_BACKUP_*.zip` created in the project folder
- Ready to push to GitHub → connect to Vercel → public URL

## Known limitations / manual follow-ups
- Git not installed — repo not yet pushed to GitHub
- Product copy has em-dashes (no encoding issues found in final build)
- Newsletter form has no backend (e.preventDefault only — documented as local-only)
- Checkout form collects delivery details but does not process payments (documented as demo flow)
