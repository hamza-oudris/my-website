# Dark & Premium Fashion Ecommerce — MAISON NOIR

## Context
Building a full ecommerce site on a bare Next.js 16.4 / React 19 / Tailwind CSS v4 skeleton. The store is a dark, luxury fashion brand ("MAISON NOIR") with gold/off-white accents, editorial typography (Cormorant Garamond + Geist), and smooth pure-CSS animations. No additional npm packages — only what's already installed (next, react, react-dom, lucide-react, tailwindcss).

Pages: Home/Hero · Product Listing (`/shop`) · Product Detail (`/shop/[slug]`) · Cart + Checkout · Order Success

---

## Implementation Order

### 1. `app/globals.css` — Design tokens + keyframes
Replace current file entirely. Define:
- CSS custom properties: `--bg-base #0A0A0A`, `--bg-surface #111111`, `--bg-elevated #1A1A1A`, `--gold-primary #D4AF37`, `--gold-muted #B8960C`, `--text-primary #F5F0E8`, `--text-secondary #A09880`, `--border-default #2A2520`, `--border-gold rgba(212,175,55,0.3)`
- Tailwind v4 `@theme inline { ... }` block mapping `--color-*` to those vars (no tailwind.config.js — v4 uses css-only config)
- `@theme inline { --font-display: var(--font-cormorant); --font-body: var(--font-geist-sans); }`
- Keyframes: `fade-up`, `slide-in-right`, `slide-out-right`, `fade-in`, `letterspace-in`, `marquee`, `shimmer`, `pulse-dot`
- `@layer utilities`: `.animate-fade-up`, `.animate-slide-in-right`, `.animate-slide-out-right`, `.animate-fade-in`, `.delay-{100-500}`, `.text-gold-gradient`, `.scrollbar-hide`

### 2. `lib/products.ts` — New data layer
Full replacement. New types:
```ts
type ProductVariant = { size: string; inStock: boolean }
type Product = {
  id: string; slug: string; name: string; price: number; originalPrice?: number
  description: string; details: string[]; images: string[]; category: string
  variants: ProductVariant[]; rating: number; reviews: number
  badge?: "New" | "Sale" | "Limited"; featured: boolean
}
```
10 fashion products using `images.unsplash.com` URLs (dark editorial fashion photos).
Functions: `getProducts(filters?)`, `getProductBySlug(slug)`, `getFeaturedProducts()`, `getCategories()`.
`generateStaticParams` helper: `products.map(p => ({ slug: p.slug }))`.

### 3. `context/cart.tsx` — Cart context extension
Add to existing context:
- `selectedSize?: string` on `CartItem`
- Dedup key: `id + size` (not just `id`)
- `drawerOpen: boolean` + `setDrawerOpen(v: boolean)` so Navbar can open the drawer
- `increment(id, size)` / `decrement(id, size)` for qty control

### 4. `next.config.ts` — Image domains
Add:
```ts
images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] }
```

### 5. `app/layout.tsx` — Root layout
- Load `Cormorant_Garamond` from `next/font/google` (weights 300/400/500/600, normal+italic) alongside Geist
- `<html lang="en" class="dark {geist.variable} {cormorant.variable}">`
- `<body class="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">`
- Wrap with `<Providers>`, render `<Navbar />`, `<CartDrawer />`, `<main>`, `<Footer />`
- Metadata: `{ title: "MAISON NOIR — Luxury Fashion", description: "..." }`

### 6. Components

#### `components/Providers.tsx`
Wraps children in CartContext provider. No change to logic, just ensure it accepts children correctly.

#### `components/Navbar.tsx` (full rebuild)
`"use client"`. Uses `useCart()` for count + `setDrawerOpen`.
- Fixed top, `backdrop-blur-md bg-[var(--bg-base)]/80 border-b border-[var(--border-default)]`
- Logo: "MAISON NOIR" in Cormorant, `tracking-[0.3em] text-xl font-light`
- Center nav: SHOP · COLLECTIONS · ABOUT — `text-xs tracking-widest uppercase`
- Right: `<Search>` + `<ShoppingBag>` (Lucide) with gold count badge
- Scroll effect: `useEffect` → listen to scroll → toggle `border-b-[var(--border-gold)]`
- Mobile: hamburger → full-screen overlay nav (fixed inset-0, z-50)

#### `components/CartDrawer.tsx` (new)
`"use client"`. Reads `drawerOpen`, `items`, `total`, `setDrawerOpen`, `remove`, `increment`, `decrement` from `useCart()`.
- Backdrop: `fixed inset-0 bg-black/70 z-40 animate-fade-in`
- Drawer: `fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-surface)] z-50 flex flex-col animate-slide-in-right border-l border-[var(--border-gold)]`
- Exit animation: add `animate-slide-out-right` on dismiss, listen `animationend` → then actually close
- Footer: total + "VIEW BAG" Link + "CHECKOUT" Link

#### `components/Footer.tsx` (full rebuild)
4 columns: Brand (logo + tagline), Shop links, Info, Newsletter input.
`border-t border-[var(--border-gold)]/30`. Copyright in `text-[var(--text-muted)]`.

#### `components/ProductCard.tsx` (full rebuild)
Props: `{ product: Product; index?: number }`
- Container: `group relative bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--border-gold)] transition-colors duration-300 overflow-hidden`
- Image: `aspect-[3/4]`, `object-cover group-hover:scale-105 transition-transform duration-700`
- Gold underline: `absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--gold-primary)] transition-all duration-500`
- Quick-add button: `absolute bottom-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300`
- Badge: absolute top-2 left-2, gold bg for "New"
- Name: Cormorant italic `text-xl`. Category: `text-xs tracking-widest uppercase text-[var(--text-secondary)]`. Price: Geist mono.
- Link: `/shop/${product.slug}`

#### `components/StaggerReveal.tsx` (new)
`"use client"`. `IntersectionObserver` → adds `animate-fade-up` + `animationDelay` when in viewport. Initial state `opacity-0`.

#### `components/ImageGallery.tsx` (new)
`"use client"`. Props: `{ images: string[]; name: string }`. `useState<number>(0)` for active. Main image transitions opacity. Thumbnails with `ring-2 ring-[var(--gold-primary)]` on active.

#### `components/Accordion.tsx` (new)
`"use client"`. Props: `{ items: {title: string; content: string}[] }`. CSS `max-height` transition (0 → 24rem). Chevron rotates `transition-transform duration-300`.

#### `components/VariantSelector.tsx` (new)
`"use client"`. Props: `{ variants: ProductVariant[]; selected: string; onSelect: (s: string) => void }`. Size pill buttons. Selected: gold ring. OOS: `opacity-40 line-through cursor-not-allowed`.

### 7. Pages

#### `app/page.tsx` — Home
Server Component. Sections:
1. **HeroSection** — `min-h-screen` relative. `<Image fill priority className="object-cover object-top brightness-[0.35]">` (Unsplash dark editorial). Headline: Cormorant `text-7xl font-light italic`, `animate-letterspace-in`. Sub: `animate-fade-up delay-200`. CTAs: `animate-fade-up delay-400`. Gold border button + ghost button.
2. **MarqueeStrip** — `overflow-hidden`. Two copies of text in flex row, `animation: marquee 25s linear infinite`. `"NEW SEASON · AW26 · MAISON NOIR ·"`.
3. **FeaturedGrid** — Asymmetric CSS grid (`grid-cols-2`, first card `row-span-2`). `getFeaturedProducts()`. Each card in `<StaggerReveal delay={i * 100}>`.
4. **CategoryStrip** — horizontal scroll with `scrollbar-hide`. 5 category tiles with background image, overlay, hover gold tint.
5. **EditorialBanner** — full-width dark section, large Cormorant quote, link to `/shop`.

#### `app/shop/page.tsx` — Product Listing
```
ShopPage (Server, reads searchParams: Promise<{category, sort, priceMin, priceMax}>)
├── FilterSidebar ("use client", sticky desktop / slide-in mobile)
└── Suspense fallback=<ProductGridSkeleton>
    └── ProductGrid (filtered/sorted products)
        └── ProductCard[] with stagger animate-fade-up
```
Filter sidebar: category checkboxes + sort radio → `router.push` with URL params. Mobile: off-canvas with backdrop.

#### `app/shop/[slug]/page.tsx` — Product Detail
```
// params: Promise<{ slug: string }> — await in component
ProductDetailPage (Server)
├── generateStaticParams → products.map(p => ({ slug: p.slug }))
├── generateMetadata (async, awaits params)
├── Breadcrumb (server)
├── ImageGallery ("use client")
└── ProductActions ("use client") — owns selectedSize state
    ├── Name/price/rating block (Cormorant heading)
    ├── VariantSelector
    ├── AddToCartButton (useOptimistic for instant feedback)
    └── Accordion (product details)
└── RelatedProducts (server — other products in same category)
```
`AddToCartButton` uses React 19 `useOptimistic`: wraps add in a 400ms async fn, shows gold checkmark immediately.

#### `app/cart/page.tsx` — Cart
`"use client"`. 
- Empty state: bag icon + "Your bag is empty" + link to shop
- Two-column layout (cart items left, order summary right/sticky)
- `CartItemRow`: image, name, size badge, qty stepper (−/+), remove button (X icon)
- `OrderSummary`: subtotal, shipping ("Free"), total in gold, promo input, checkout form
- Checkout form: Name, Email, Address, City, Country — uncontrolled with `useRef` or controlled. "PLACE ORDER" button → clears cart → navigates to `/cart/success`

#### `app/cart/success/page.tsx` — Order Success (new)
Server Component. Centered content: gold checkmark SVG, "Thank You" in Cormorant large italic, order confirmation text, "CONTINUE SHOPPING" link. `animate-fade-up`.

---

## Verification
1. `npm run dev` — check all routes: `/`, `/shop`, `/shop/[slug]`, `/cart`, `/cart/success`
2. Check Hero image loads (Unsplash remote pattern configured)
3. Open cart drawer from Navbar bag icon → verify slide-in/out animation
4. Add a product to cart from product detail → verify `useOptimistic` gold checkmark
5. Filter products by category on `/shop` → verify URL param + grid re-render
6. Place order → verify cart clears + redirect to success
7. Resize to mobile → verify hamburger nav and filter drawer work
8. `npm run build` — confirm no TypeScript errors
