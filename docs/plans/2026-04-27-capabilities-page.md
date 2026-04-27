# Capabilities Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `/docs/capabilities` — a one-page MDX route showing 19 commerce capabilities grouped into 4 sections, each marked with a status badge (Integrated / Pattern / Not yet) and linking into existing guides where applicable.

**Architecture:** Two custom MDX components (`<CapabilityCard>`, `<CapabilityGrid>`) registered in `components/mdx.tsx`, consumed from a single MDX file at `content/docs/capabilities.mdx`. Sidebar order controlled via a new `content/docs/meta.json`. No new build steps, no data files, no tests — this is a static docs page; verification is build-passes + visual check + production URL fetch.

**Tech Stack:** Next.js 16 (App Router), Fumadocs (UI + MDX collections), Tailwind v4 with Fumadocs neutral preset (`fd-*` color tokens), Bun, Vercel.

**Design doc:** `docs/plans/2026-04-27-capabilities-page-design.md` — read it once before starting Task 1 for the full content list and rationale.

**Working directory:** `/Users/williammartinsson/web/experiment/gears-docs-mvp` (the docs site, not the monorepo).

**Repo state:** branch `main`, clean. The design doc was committed in `760756f`. New work happens directly on `main` and ships via push + double `vercel deploy --prod --yes` (the project's established release dance).

---

## Task 1: `CapabilityCard` component — skeleton

**Files:**
- Create: `components/capability-card.tsx`

**Step 1: Define the component contract**

Create `components/capability-card.tsx` with this exact content:

```tsx
import Link from 'fumadocs-core/link';
import type { ReactNode } from 'react';

export type CapabilityStatus = 'integrated' | 'pattern' | 'none';

const statusBadgeClasses: Record<CapabilityStatus, string> = {
  integrated:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  pattern:
    'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
  none:
    'bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800',
};

const statusLabel: Record<CapabilityStatus, string> = {
  integrated: 'Integrated',
  pattern: 'Pattern exists',
  none: 'Not yet',
};

export interface CapabilityCardProps {
  title: string;
  status: CapabilityStatus;
  description: string;
  vendors?: string[];
  href?: string;
}

export function CapabilityCard(props: CapabilityCardProps): ReactNode {
  const { title, status, description, vendors, href } = props;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-5 transition hover:border-fd-foreground/30">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-fd-foreground m-0">
          {title}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusBadgeClasses[status]}`}
        >
          {statusLabel[status]}
        </span>
      </div>

      <p className="text-sm text-fd-muted-foreground m-0">{description}</p>

      {vendors && vendors.length > 0 && (
        <p className="text-xs text-fd-muted-foreground m-0">
          <span className="font-medium text-fd-foreground/80">Vendors:</span>{' '}
          {vendors.join(' · ')}
        </p>
      )}

      {href && (
        <Link
          href={href}
          className="mt-auto text-sm font-medium text-fd-foreground hover:underline"
        >
          Read the guide →
        </Link>
      )}
    </div>
  );
}
```

**Step 2: Verify the build picks it up**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -20`

Expected: build completes, no TypeScript errors, no "module not found".

**Step 3: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add components/capability-card.tsx
git commit -m "feat(capabilities): add CapabilityCard component"
```

---

## Task 2: `CapabilityGrid` wrapper

**Files:**
- Modify: `components/capability-card.tsx` (append `CapabilityGrid` export at the bottom)

**Step 1: Append the wrapper**

Add this at the end of `components/capability-card.tsx`:

```tsx
export function CapabilityGrid({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="my-6 grid gap-4 not-prose md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
```

The `not-prose` class disables Fumadocs' prose typography inside the grid (otherwise the body text styling would override the card's own typography). `my-6` gives breathing room from the surrounding H2.

**Step 2: Verify build**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes.

**Step 3: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add components/capability-card.tsx
git commit -m "feat(capabilities): add CapabilityGrid wrapper"
```

---

## Task 3: Register components with MDX

**Files:**
- Modify: `components/mdx.tsx`

**Step 1: Update the registry**

Open `components/mdx.tsx`. The current file is:

```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
```

Replace it with:

```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CapabilityCard, CapabilityGrid } from './capability-card';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    CapabilityCard,
    CapabilityGrid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
```

**Step 2: Verify build**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes.

**Step 3: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add components/mdx.tsx
git commit -m "feat(capabilities): register CapabilityCard and CapabilityGrid in MDX"
```

---

## Task 4: Create `capabilities.mdx` — hero + Storefront section

**Files:**
- Create: `content/docs/capabilities.mdx`

**Step 1: Write the page with the first section only**

Create `content/docs/capabilities.mdx` with:

```mdx
---
title: Capabilities
description: What Gears ships out of the box, what clients have built as patterns, and what you'd add yourself — by capability rather than by package.
---

Gears is a stack with headroom. The packaged integrations cover most of what a modern Centra storefront needs; everything else is reachable through the BFF or the same provider patterns the existing packages use.

This page is the map. Cards are tagged **Integrated** when Gears ships a packaged provider and a guide, **Pattern exists** when at least one live client has wired it up without a shared package, and **Not yet** when the capability is recognized but unaddressed today.

## Storefront experience

<CapabilityGrid>
  <CapabilityCard
    title="Search"
    status="integrated"
    description="Faceted product search and PLP results with swappable vendor adapters behind a single hook surface."
    vendors={['Algolia', 'Voyado Elevate', 'Centra-native']}
    href="/docs/guides/search"
  />
  <CapabilityCard
    title="Product recommendations"
    status="integrated"
    description="PDP, cart, and landing-page recommendations driven by Voyado Elevate query types."
    vendors={['Voyado Elevate']}
    href="/docs/guides/search"
  />
  <CapabilityCard
    title="CMS"
    status="integrated"
    description="Headless content with live preview, component transformers, and per-market localization."
    vendors={['Storyblok']}
    href="/docs/guides/storyblok"
  />
  <CapabilityCard
    title="Image CDN"
    status="integrated"
    description="CDN-agnostic image URL rewriting via a processor chain — plug in a new CDN without touching components."
    vendors={['Cloudflare', 'Storyblok pass-through']}
    href="/docs/guides/image"
  />
  <CapabilityCard
    title="Reviews"
    status="none"
    description="Common request, no Gears integration today. Bring your own (Yotpo, Trustpilot, Reviews.io) and call it from Blueprint components directly."
  />
</CapabilityGrid>
```

**Step 2: Visual check in dev**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run dev > /tmp/dev.log 2>&1 &` then wait a few seconds and: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/docs/capabilities`

Expected: `200`.

Then visit `http://localhost:3000/docs/capabilities` in a browser and confirm:
- Hero paragraphs render
- "Storefront experience" H2 renders
- Five cards render in a responsive grid
- Status badges show correct colors (4 green, 1 grey)
- "Read the guide →" links present on the four Integrated cards

Kill the dev server when done: `pkill -f "next dev"`

**Step 3: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -15`

Expected: build completes, route list now includes `/docs/capabilities` under the `/docs/[[...slug]]` SSG paths.

**Step 4: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add content/docs/capabilities.mdx
git commit -m "feat(capabilities): add page with Storefront section"
```

---

## Task 5: Add Conversion section

**Files:**
- Modify: `content/docs/capabilities.mdx`

**Step 1: Append the Conversion section**

Add this *after* the closing `</CapabilityGrid>` of the Storefront section:

```mdx

## Conversion

<CapabilityGrid>
  <CapabilityCard
    title="Commerce backend"
    status="integrated"
    description="Cart, checkout, orders, customers, products. The required foundation."
    vendors={['Centra']}
    href="/docs/guides/centra"
  />
  <CapabilityCard
    title="Payments"
    status="integrated"
    description="PSP-pluggable checkout flow. Drivers ship for the major regional providers; new ones plug in via the same interface."
    vendors={['Adyen', 'Klarna', 'Qliro']}
    href="/docs/guides/checkout"
  />
  <CapabilityCard
    title="Shipping"
    status="integrated"
    description="Embedded shipping widget for delivery options, pickup points, and home delivery."
    vendors={['Ingrid']}
    href="/docs/guides/ingrid"
  />
  <CapabilityCard
    title="Tax"
    status="pattern"
    description="Calculated by Centra per market. No Gears layer — clients configure tax rates inside Centra, not in code."
  />
  <CapabilityCard
    title="Returns / RMA"
    status="none"
    description="No Gears integration today. Order status surfaces in the account guide; an RMA portal would be a custom build."
  />
</CapabilityGrid>
```

**Step 2: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes.

**Step 3: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add content/docs/capabilities.mdx
git commit -m "feat(capabilities): add Conversion section"
```

---

## Task 6: Add Retention & loyalty section

**Files:**
- Modify: `content/docs/capabilities.mdx`

**Step 1: Append the Retention section**

Add after the Conversion `</CapabilityGrid>`:

```mdx

## Retention & loyalty

<CapabilityGrid>
  <CapabilityCard
    title="Email / CRM"
    status="integrated"
    description="Newsletter signup, customer identification, and event tracking into the marketing stack."
    vendors={['Voyado Engage']}
    href="/docs/guides/implementing-voyado-engage"
  />
  <CapabilityCard
    title="Customer identification"
    status="integrated"
    description="Passwordless login flow that ties the storefront session to a known marketing contact."
    vendors={['Voyado']}
    href="/docs/guides/account"
  />
  <CapabilityCard
    title="Loyalty / promotions"
    status="integrated"
    description="Voucher codes, automatic vouchers, and segment-driven promotions surface through the cart."
    vendors={['Voyado Engage']}
    href="/docs/guides/implementing-voyado-engage"
  />
  <CapabilityCard
    title="Subscriptions"
    status="none"
    description="No Gears integration today. Centra has primitives but no shipped Gears wiring."
  />
  <CapabilityCard
    title="SMS / push"
    status="none"
    description="No Gears integration today."
  />
</CapabilityGrid>
```

**Step 2: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes.

**Step 3: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add content/docs/capabilities.mdx
git commit -m "feat(capabilities): add Retention & loyalty section"
```

---

## Task 7: Add Operations section + closing footer

**Files:**
- Modify: `content/docs/capabilities.mdx`

**Step 1: Append Operations + footer**

Add after the Retention `</CapabilityGrid>`:

```mdx

## Operations

<CapabilityGrid>
  <CapabilityCard
    title="Feature flags & experiments"
    status="integrated"
    description="Server-resolved flags and A/B experiments wired into the managed-props layer for runtime overrides."
    vendors={['GrowthBook']}
    href="/docs/guides/growthbook"
  />
  <CapabilityCard
    title="Analytics"
    status="integrated"
    description="Ecommerce events, cart and checkout tracking, server-tagged page views."
    vendors={['Google Tag Manager']}
    href="/docs/guides/gtm"
  />
  <CapabilityCard
    title="SEO"
    status="integrated"
    description="sitemap.xml, robots.txt, and the Google product feed served as raw XML through Remix loaders."
    href="/docs/guides/seo-routes"
  />
  <CapabilityCard
    title="withManagedProps theming"
    status="integrated"
    description="Per-client default-props layer that lets each brand skin Blueprint components without forking."
    href="/docs/guides/with-managed-props"
  />
</CapabilityGrid>

---

## Don't see what you need?

Two extension paths handle anything not on this map:

- **The BFF** is the place for new server-side data sources, vendor proxying, and webhook endpoints. See [The BFF](/docs/guides/bff) for the architecture and how to add an endpoint.
- **A new Blueprint package** is the place for new UI surfaces that aren't already covered. See [Build a Blueprint component](/docs/guides/build-a-blueprint-component) for the generator and conventions.

If a capability you need isn't here and feels like it should be packaged for everyone, open an issue on the monorepo.
```

**Step 2: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes, route list still shows `/docs/capabilities`.

**Step 3: Visual review in dev**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run dev > /tmp/dev.log 2>&1 &` then visit `http://localhost:3000/docs/capabilities` and confirm:
- All 4 H2 sections render with their cards
- Total of 19 cards (5 + 5 + 5 + 4)
- Footer renders with two extension links
- All `Read the guide →` links point to existing routes (none 404)

Kill the dev server: `pkill -f "next dev"`

**Step 4: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add content/docs/capabilities.mdx
git commit -m "feat(capabilities): add Operations section and closing extension note"
```

---

## Task 8: Add root `meta.json` for sidebar order

**Files:**
- Create: `content/docs/meta.json`

**Step 1: Decide what the root tree should look like**

Currently `content/docs/` contains:
- `index.mdx`
- `capabilities.mdx` (added in Task 4)
- `guides/` (folder with its own `meta.json`)

Without a root `meta.json`, Fumadocs orders these alphabetically — Capabilities → Guides → Index — which is wrong. We want: Index → Capabilities → Guides.

**Step 2: Create the file**

Create `content/docs/meta.json` with:

```json
{
  "pages": ["index", "capabilities", "guides"]
}
```

**Step 3: Verify nav placement**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run dev > /tmp/dev.log 2>&1 &` then visit `http://localhost:3000/docs` (any docs page) and inspect the sidebar:

Expected order in sidebar:
1. Gears Documentation (the index page)
2. Capabilities
3. Guides (expandable group)

Kill the dev server: `pkill -f "next dev"`

**Step 4: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -10`

Expected: build completes.

**Step 5: Commit**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add content/docs/meta.json
git commit -m "feat(capabilities): add root meta.json to control sidebar order"
```

---

## Task 9: Verify llms.txt + llms-full.txt include the page

**Files:**
- No changes; verification only.

**Step 1: Build the site**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -5`

Expected: build completes.

**Step 2: Inspect built llms.txt**

Run: `grep -n "capabilities" /Users/williammartinsson/web/experiment/gears-docs-mvp/.next/server/app/llms.txt.body`

Expected: at least one match — a line like `[Capabilities](/docs/capabilities): What Gears ships out of the box…`

**Step 3: Inspect built llms-full.txt**

Run: `grep -n "^# Capabilities" /Users/williammartinsson/web/experiment/gears-docs-mvp/.next/server/app/llms-full.txt.body`

Expected: one match — `# Capabilities (/docs/capabilities)`.

If both fail, double-check that `capabilities.mdx` has valid frontmatter and is under `content/docs/`.

**Step 4: Spot-check internal links**

Run this to extract every `href` on the page and verify each one resolves:

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
grep -oE 'href="/docs/[^"]+"' content/docs/capabilities.mdx | sort -u
```

For each printed path, confirm the file exists under `content/docs/` (e.g. `/docs/guides/search` → `content/docs/guides/search.mdx`). The eight paths should all resolve: `search`, `storyblok`, `image`, `centra`, `checkout`, `ingrid`, `implementing-voyado-engage`, `account`, `growthbook`, `gtm`, `seo-routes`, `with-managed-props`, `bff`, `build-a-blueprint-component`.

**Step 5: No commit needed for verification.**

If anything failed, return to the relevant earlier task and fix.

---

## Task 10: Push and deploy to production

**Files:**
- No changes; deployment.

**Step 1: Push**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && git push origin main 2>&1 | tail -5`

Expected: push succeeds.

**Step 2: First Vercel deploy (build + ready)**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && vercel deploy --prod --yes 2>&1 | tail -5`

Expected: a `READY` deployment URL printed.

**Step 3: Second Vercel deploy (alias promotion)**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && vercel deploy --prod --yes 2>&1 | tail -5`

This is the project's established alias-promotion dance — a single deploy doesn't always update `gears-docs-mvp.vercel.app`.

**Step 4: Verify production**

Run:

```bash
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" https://gears-docs-mvp.vercel.app/docs/capabilities
curl -s -L https://gears-docs-mvp.vercel.app/llms.txt | grep -i capabilities
curl -s -L https://gears-docs-mvp.vercel.app/llms-full.txt | grep -E "^# Capabilities"
```

Expected:
- `200` for the page
- `Capabilities` line in llms.txt index
- `# Capabilities (/docs/capabilities)` line in llms-full.txt

**Step 5: No commit needed.**

---

## Task 11: Update home page link to capabilities (optional polish)

**Files:**
- Modify: `app/(home)/page.tsx`

**Step 1: Decide if this belongs here**

Look at the existing home page hero CTAs. There's a "Or jump into the full index — 23 guides" link. Adding *"or browse capabilities"* next to it is a nice-to-have that surfaces the new page from the front door.

If the team wants the capabilities page discoverable from the home, do this. If not, skip Task 11 entirely.

**Step 2: Add the link**

Find the line in `app/(home)/page.tsx` that reads:

```tsx
            Or jump into the full index — 23 guides
```

Replace the surrounding paragraph (verify exact JSX before editing) with one that adds a second link. For example:

```tsx
<p className="mt-6 text-sm text-fd-muted-foreground">
  Or browse{' '}
  <Link href="/docs/capabilities" className="font-medium text-fd-foreground hover:underline">
    capabilities
  </Link>{' '}
  · jump into the{' '}
  <Link href="/docs" className="font-medium text-fd-foreground hover:underline">
    full index
  </Link>{' '}
  · 23 guides
</p>
```

(Adapt to whatever the actual surrounding markup looks like — the file has been edited a lot, this is illustrative.)

**Step 3: Build check**

Run: `cd /Users/williammartinsson/web/experiment/gears-docs-mvp && bun run build 2>&1 | tail -5`

**Step 4: Commit + redeploy**

```bash
cd /Users/williammartinsson/web/experiment/gears-docs-mvp
git add app/\(home\)/page.tsx
git commit -m "feat(home): link to /docs/capabilities from hero"
git push origin main
vercel deploy --prod --yes
vercel deploy --prod --yes
```

---

## Done

Once Task 10 (or 11 if pursued) verifies green, the page is live. The design doc `docs/plans/2026-04-27-capabilities-page-design.md` stays in the repo as the explanation for why the page looks the way it does.

## Maintenance notes (for future contributors)

- **Adding a new integration?** Flip the matching capability card from `none` or `pattern` to `integrated`, fill in `vendors` and `href`. Update the design doc's category list while you're at it.
- **New capability worth a card?** Add it to the appropriate `<CapabilityGrid>` and bump the design doc.
- **Section feels too long?** Each `<CapabilityGrid>` is independent — splitting one section into two is just a new H2 and a new grid; no component changes needed.
