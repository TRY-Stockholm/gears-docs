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

export function CapabilityGrid({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="my-6 grid gap-4 not-prose md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
