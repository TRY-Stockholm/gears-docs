import Link from 'next/link';
import type { ReactNode } from 'react';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <WhatsInside />
      <LiveStores />
      <StartingPoints />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-fd-border px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-fd-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-fd-border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center rounded-full border border-fd-border bg-fd-muted/50 px-3 py-1 text-xs font-medium text-fd-muted-foreground">
          Made People · React toolkit for Centra
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Build production Centra storefronts, fast.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-fd-muted-foreground">
          Gears is a family of React packages for headless commerce on Centra. Cart,
          checkout, product, and account ship as a core; search, CMS, and analytics
          plug in on top. Remix is the reference host.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row">
          <Link
            href="/docs/guides/getting-started"
            className="inline-flex flex-col items-start rounded-lg bg-fd-foreground px-5 py-3 text-left text-fd-background transition hover:opacity-90"
          >
            <span className="text-sm font-medium">
              Get started
              <Arrow className="ml-1 inline h-4 w-4" />
            </span>
            <span className="text-xs opacity-80">Inside the monorepo</span>
          </Link>
          <Link
            href="/docs/guides/tutorial"
            className="inline-flex flex-col items-start rounded-lg border border-fd-border bg-fd-background px-5 py-3 text-left transition hover:bg-fd-muted"
          >
            <span className="text-sm font-medium">
              Build a minimal client
              <Arrow className="ml-1 inline h-4 w-4" />
            </span>
            <span className="text-xs text-fd-muted-foreground">
              Fresh Remix app, outside the monorepo
            </span>
          </Link>
        </div>

        <div className="mt-10 text-sm text-fd-muted-foreground">
          <Link
            href="/docs"
            className="underline-offset-4 transition hover:text-fd-foreground hover:underline"
          >
            Or jump into the full index — 23 guides
            <Arrow className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

type Feature = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const coreFeatures: Feature[] = [
  {
    title: 'Cart',
    description:
      'Session-scoped cart state with optimistic updates, line items, and voucher codes.',
    href: '/docs/guides/cart',
    icon: <IconBag />,
  },
  {
    title: 'Checkout',
    description:
      'Multi-PSP flows (Adyen, Klarna, Qliro) with pluggable shipping widgets.',
    href: '/docs/guides/checkout',
    icon: <IconCard />,
  },
  {
    title: 'Product',
    description:
      'Variant resolution, attribute mappers, PDP + PLP scaffolding.',
    href: '/docs/guides/product',
    icon: <IconTag />,
  },
  {
    title: 'Account',
    description:
      'Login, session restore, order history, passwordless identification.',
    href: '/docs/guides/account',
    icon: <IconUser />,
  },
];

const platform: Feature[] = [
  {
    title: 'Search',
    description:
      'One hook surface, swappable adapters (Algolia, Voyado Elevate, Centra).',
    href: '/docs/guides/search',
    icon: <IconSearch />,
  },
  {
    title: 'Image',
    description:
      'CDN-agnostic URL rewriting via a processor chain — Cloudflare, Storyblok, custom.',
    href: '/docs/guides/image',
    icon: <IconImage />,
  },
  {
    title: 'Centra Mappers',
    description:
      '27 default mappers, spread-and-override to attach brand-specific fields.',
    href: '/docs/guides/centra-mappers',
    icon: <IconLayers />,
  },
  {
    title: 'SEO Routes',
    description:
      'sitemap.xml, robots.txt, Google feed — raw XML served through Remix loaders.',
    href: '/docs/guides/seo-routes',
    icon: <IconRss />,
  },
];

const integrations: Feature[] = [
  {
    title: 'Algolia',
    description: 'Faceted product search and recommendations.',
    href: '/docs/guides/algolia',
    icon: <IconSearch />,
  },
  {
    title: 'Storyblok',
    description: 'Headless CMS with live preview.',
    href: '/docs/guides/storyblok',
    icon: <IconDoc />,
  },
  {
    title: 'GrowthBook',
    description: 'Feature flags and A/B experiments.',
    href: '/docs/guides/growthbook',
    icon: <IconFlag />,
  },
  {
    title: 'GTM',
    description: 'GA4 events pushed from cart, order, product emitters.',
    href: '/docs/guides/gtm',
    icon: <IconChart />,
  },
  {
    title: 'Voyado',
    description: 'Identification, newsletter, promotions, tracking.',
    href: '/docs/guides/implementing-voyado-engage',
    icon: <IconMail />,
  },
  {
    title: 'Ingrid',
    description: 'Shipping widget at checkout.',
    href: '/docs/guides/ingrid',
    icon: <IconTruck />,
  },
];

function WhatsInside() {
  return (
    <section className="border-b border-fd-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">
            What&apos;s in the box
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            A core you always use, integrations you choose.
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            The four commerce-core packages are how every client starts. Layer
            integrations on top as you need them.
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-fd-foreground" />
          Commerce core
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <FeatureTile key={feature.href} feature={feature} />
          ))}
        </div>

        <div className="mb-4 mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-fd-foreground/80" />
          Platform
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4">
          {platform.map((feature) => (
            <FeatureTile key={feature.href} feature={feature} />
          ))}
        </div>

        <div className="mb-4 mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60" />
          Optional integrations
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((feature) => (
            <FeatureTile key={feature.href} feature={feature} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTile({
  feature,
  compact = false,
}: {
  feature: Feature;
  compact?: boolean;
}) {
  return (
    <Link
      href={feature.href}
      className="group flex flex-col gap-3 bg-fd-background p-6 transition hover:bg-fd-muted/50"
    >
      <div className="text-fd-muted-foreground">{feature.icon}</div>
      <div>
        <h3 className="text-sm font-semibold">{feature.title}</h3>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          {feature.description}
        </p>
      </div>
      {!compact && (
        <span className="mt-auto inline-flex items-center text-xs font-medium text-fd-muted-foreground transition group-hover:text-fd-foreground">
          Read guide
          <Arrow className="ml-1 h-3 w-3" />
        </span>
      )}
    </Link>
  );
}

const stores: Array<{ name: string; url: string; description: string }> = [
  {
    name: 'Dedicated',
    url: 'https://www.dedicatedbrand.com',
    description: 'Sustainable fashion, multi-market storefront.',
  },
  {
    name: 'Miss Mary',
    url: 'https://www.missmary.com',
    description: 'Swedish lingerie, D2C across Europe.',
  },
  {
    name: 'Stronger',
    url: 'https://www.strongerlabel.com',
    description: 'Activewear with global fulfillment.',
  },
];

function LiveStores() {
  return (
    <section className="border-b border-fd-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">
            In production
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Three storefronts, one toolkit.
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            Every pattern in these docs is lifted from a live store. If a snippet is
            here, it&apos;s running in production.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stores.map((store) => (
            <a
              key={store.url}
              href={store.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-2 rounded-lg border border-fd-border bg-fd-background p-6 transition hover:border-fd-foreground/30 hover:bg-fd-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{store.name}</span>
                <External className="h-4 w-4 text-fd-muted-foreground transition group-hover:text-fd-foreground" />
              </div>
              <p className="text-sm text-fd-muted-foreground">
                {store.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const startingPoints: Array<{
  audience: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}> = [
  {
    audience: 'Building a new client',
    title: 'Start from scratch',
    description:
      'Set up the monorepo, scaffold a Remix app, and ship a PDP + working cart.',
    cta: 'Getting Started',
    href: '/docs/guides/getting-started',
  },
  {
    audience: 'Extending an existing client',
    title: 'Jump to a guide',
    description:
      'Each package is self-contained. Cart, checkout, account — pick what you need.',
    cta: 'Browse guides',
    href: '/docs',
  },
  {
    audience: 'Understanding the pieces',
    title: 'See the render tree',
    description:
      'Provider stacking, service-URL resolution, Remix routing conventions.',
    cta: 'Anatomy of a client',
    href: '/docs/guides/anatomy-of-a-gears-client',
  },
  {
    audience: 'AI coding assistant',
    title: 'Full docs, plain Markdown',
    description:
      'Every guide concatenated into one file. Paste into Claude, ChatGPT, or any LLM context window and ask away.',
    cta: 'Open /llms-full.txt',
    href: '/llms-full.txt',
  },
];

function StartingPoints() {
  return (
    <section className="border-b border-fd-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">
            Where to start
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Pick your path.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {startingPoints.map((point) => (
            <Link
              key={point.href}
              href={point.href}
              className="group flex flex-col gap-3 rounded-lg border border-fd-border bg-fd-background p-6 transition hover:border-fd-foreground/30 hover:bg-fd-muted/30"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
                {point.audience}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  {point.description}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center text-sm font-medium transition group-hover:translate-x-0.5">
                {point.cta}
                <Arrow className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-fd-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          Built by <span className="font-medium text-fd-foreground">Made People</span> ·
          Docs by TRY Stockholm
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/docs" className="transition hover:text-fd-foreground">
            Docs
          </Link>
          <Link
            href="/docs/guides/getting-started"
            className="transition hover:text-fd-foreground"
          >
            Getting Started
          </Link>
          <Link
            href="/docs/guides/tutorial"
            className="transition hover:text-fd-foreground"
          >
            Tutorial
          </Link>
          <a href="/llms.txt" className="transition hover:text-fd-foreground">
            llms.txt
          </a>
          <a href="/llms-full.txt" className="transition hover:text-fd-foreground">
            llms-full.txt
          </a>
        </div>
      </div>
    </section>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

function External({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 3H3v10h10v-3" />
      <path d="M10 3h3v3" />
      <path d="M8 8l5-5" />
    </svg>
  );
}

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconBag() {
  return (
    <IconBase>
      <path d="M6 7h12l-1 13H7L6 7z" />
      <path d="M9 10V6a3 3 0 016 0v4" />
    </IconBase>
  );
}

function IconCard() {
  return (
    <IconBase>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </IconBase>
  );
}

function IconTag() {
  return (
    <IconBase>
      <path d="M12 3H5a2 2 0 00-2 2v7l9 9 9-9-9-9z" />
      <circle cx="8" cy="8" r="1" />
    </IconBase>
  );
}

function IconUser() {
  return (
    <IconBase>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </IconBase>
  );
}

function IconSearch() {
  return (
    <IconBase>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </IconBase>
  );
}

function IconDoc() {
  return (
    <IconBase>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h4" />
    </IconBase>
  );
}

function IconFlag() {
  return (
    <IconBase>
      <path d="M5 3v18" />
      <path d="M5 4h12l-2 4 2 4H5" />
    </IconBase>
  );
}

function IconChart() {
  return (
    <IconBase>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </IconBase>
  );
}

function IconMail() {
  return (
    <IconBase>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </IconBase>
  );
}

function IconTruck() {
  return (
    <IconBase>
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </IconBase>
  );
}

function IconImage() {
  return (
    <IconBase>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M21 16l-5-5-8 8" />
    </IconBase>
  );
}

function IconLayers() {
  return (
    <IconBase>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </IconBase>
  );
}

function IconRss() {
  return (
    <IconBase>
      <path d="M4 11a9 9 0 019 9" />
      <path d="M4 5a15 15 0 0115 15" />
      <circle cx="5.5" cy="18.5" r="1.5" />
    </IconBase>
  );
}
