# Capabilities Page — Design

**Status:** Approved 2026-04-27
**Site:** gears-docs-mvp (Next.js 16 + Fumadocs)
**One-liner:** Add `/docs/capabilities` — a one-page capability map showing every category a modern commerce site needs, with status indicators (Integrated / Pattern exists / Not yet) and links into the existing guides.

## Goal

Give technical evaluators (and AI coding assistants) a single page that answers the question *"can Gears do X?"* without reading 23 guides. The page lists every commerce capability worth thinking about, marks what Gears ships today, what at least one client has built, and what nobody has tackled yet — so that prospects see the breadth of the platform and developers can route requirements to the right guide quickly.

This complements the existing home page, which orients users to the toolkit. The capabilities page evaluates it.

## Non-goals

- **No vendor marketplace pages.** Each integration's depth lives in its existing guide; the capability page only links out.
- **No matrix per client.** Which-clients-use-what is a separate idea, deferred.
- **No roadmap dates.** "Not yet" cards say what's missing without committing to delivery.
- **No marketing fluff.** Same docs-style voice as the rest of the site.

## Audience

1. Developers evaluating Gears for a new brand — *"does this stack handle the things we need?"*
2. AI coding assistants reading `llms-full.txt` — *route requests to the right package fast.*
3. Existing client developers checking *"is there already a Gears way to do X?"* before going custom.

## Scope: 19 cards across 4 sections

### Storefront experience
- 🟢 **Search** — Algolia, Voyado Elevate, Centra-native → `/docs/guides/search`
- 🟢 **Product recommendations** — Voyado Elevate (PDP, cart, landing) → `/docs/guides/search`
- 🟢 **CMS** — Storyblok → `/docs/guides/storyblok`
- 🟢 **Image CDN** — Cloudflare, Storyblok pass-through → `/docs/guides/image`
- ⚪ **Reviews** — common request, no Gears integration today

### Conversion
- 🟢 **Commerce backend** — Centra → `/docs/guides/centra`
- 🟢 **Payments** — Adyen, Klarna, Qliro (via Centra checkout) → `/docs/guides/checkout`
- 🟢 **Shipping** — Ingrid → `/docs/guides/ingrid`
- ⚪ **Tax** — Centra-handled, no Gears layer
- ⚪ **Returns / RMA** — no Gears integration today

### Retention & loyalty
- 🟢 **Email / CRM** — Voyado Engage → `/docs/guides/implementing-voyado-engage`
- 🟢 **Customer identification** — passwordless via Voyado → `/docs/guides/account`
- 🟢 **Loyalty / promotions** — Voyado Engage vouchers → `/docs/guides/implementing-voyado-engage`
- ⚪ **Subscriptions** — no Gears integration today
- ⚪ **SMS / push** — no Gears integration today

### Operations
- 🟢 **Feature flags & experiments** — GrowthBook → `/docs/guides/growthbook`
- 🟢 **Analytics** — Google Tag Manager → `/docs/guides/gtm`
- 🟢 **SEO** — sitemap.xml, robots.txt, Google feed → `/docs/guides/seo-routes`
- 🟢 **withManagedProps theming** — per-client default-props layer → `/docs/guides/with-managed-props`

**Deferred (not in v1):** Wishlist (uncertain across clients), multi-market (Centra property, not an integration), gift cards, B2B, fraud, marketplace sync, PIM/ERP, customer service / chat, affiliate, personalization, A/B testing UI (covered by GrowthBook).

## Status taxonomy

| Badge | Label | Means |
|---|---|---|
| 🟢 | **Integrated** | Gears ships a packaged provider/hook + docs guide. Card links to the guide. |
| ⚪ | **Not yet** | Recognized capability with no Gears story today. No CTA — just the description. |

A third state — **Pattern exists** (amber) — is reserved in the component (`CapabilityStatus = 'integrated' | 'pattern' | 'none'`) for future use when a live client has wired a capability without a shared package. v1 ships without any Pattern cards because the only candidate (Tax) turned out to be Centra-handled rather than a real client-side pattern; reintroduce the badge when there's a concrete reusable example.

## Page structure

```
URL: /docs/capabilities

┌──────────────────────────────────────────┐
│ Hero (2 short paragraphs)                │
│   - Position: stack-with-headroom        │
│   - How to read: status legend + scope   │
└──────────────────────────────────────────┘
│ ## Storefront experience                 │
│   [card] [card] [card] [card] [card]     │
│ ## Conversion                            │
│   [card] [card] [card] [card] [card]     │
│ ## Retention & loyalty                   │
│   [card] [card] [card] [card] [card]     │
│ ## Operations                            │
│   [card] [card] [card] [card]            │
│                                          │
│ Don't see what you need?                 │
│   → BFF guide (the extension story)      │
│   → contact / repo                       │
└──────────────────────────────────────────┘
```

## Card anatomy

Each card carries:

- **Title** — capability name
- **Status badge** — colored pill, top-right
- **1-line description** — what the capability solves
- **Vendor list** — comma-separated, only when status is Integrated or Pattern
- **CTA link** — only on Integrated and (where applicable) Pattern cards. Points to the relevant guide.

Cards laid out in a responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop.

## Navigation placement

- Add `content/docs/capabilities.mdx` at the root of the docs tree (sibling to `index.mdx`).
- Add `content/docs/meta.json` (currently absent) with explicit ordering: `["index", "capabilities", "guides"]`.
- The page also needs to appear in the docs sidebar above the Guides group so it acts as an orientation entry, not as a guide.

## Implementation approach

- **Single MDX file** at `content/docs/capabilities.mdx` with frontmatter (title, description).
- **Custom MDX component `<CapabilityCard />`** defined under `app/components/` (or wherever existing custom MDX components live — verify during planning) and registered in `mdx-components.tsx`. Props: `title`, `status` (`"integrated" | "pattern" | "none"`), `description`, `vendors?: string[]`, `href?: string`.
- **Status badge styling** — Tailwind classes scoped per status (`bg-emerald-50 text-emerald-700` / `bg-amber-50 text-amber-700` / `bg-zinc-100 text-zinc-600`) using existing `fd-*` tokens where they cover it. No new design tokens needed.
- **Section wrapper** — plain MDX H2s. Cards rendered inside a `<CapabilityGrid>` wrapper component that handles the responsive grid layout. Keeps the MDX itself readable.
- **No data file.** Capability content lives inline in the MDX. Adding/editing a capability is one MDX edit, no deploys-of-data.

Render-time considerations:

- Page is fully static; renders at build like every other docs page.
- Auto-included in `/llms.txt` and `/llms-full.txt` since fumadocs walks all docs pages.
- Auto-indexed by Fumadocs search.
- OG image auto-generated by the existing `/og/docs/[...slug]` route.

## Open questions resolved during brainstorming

| Question | Decision |
|---|---|
| Granularity | One-pager (no sub-pages per capability) |
| Placement | Inside docs at `/docs/capabilities` |
| Scope | Standard commerce stack, ~15–20 rows |
| Visual format | Grouped sections with cards |
| Wishlist card | Skipped (verify and add later) |
| Multi-market card | Skipped (Centra property, not integration) |
| withManagedProps placement | Operations |

## Risks / things that could go wrong

- **Stale "Not yet" rows.** When a category gets integrated, someone has to remember to flip the badge. Mitigation: section in CONTRIBUTING (or guide-author note in the page itself) saying *"if you ship a new integration, flip its row here."*
- **Pattern-status creep.** "Pattern exists" is the squishiest of the three. If we mark too liberally, the page loses signal. Mitigation: only mark Pattern when there's something concrete to point at (a guide section, a Centra config note, an issue).
- **Card component scope creep.** Future contributors may want richer cards (vendor logos, screenshots, "used by" badges). Hold the line — the card stays minimal until a real need shows up.

## Success criteria

- Build passes (`bun run build`).
- Page renders at `/docs/capabilities` in both dev and production.
- Page appears in the docs sidebar above the Guides group.
- All Integrated cards link to existing guides; no 404s.
- llms.txt and llms-full.txt include the page.
- Internal review: a developer who has never seen Gears can use the page to answer "does Gears do search?" / "does Gears do reviews?" in under 30 seconds.
