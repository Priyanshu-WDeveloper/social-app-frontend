import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{ className?: string }>;

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200',
        className,
      )}
    >
      {children}
    </span>
  );
}
