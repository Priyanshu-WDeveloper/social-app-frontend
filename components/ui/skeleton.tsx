import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type SkeletonProps = PropsWithChildren<{ className?: string }>;

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-3xl bg-slate-800/70',
        className,
      )}
    >
      {children}
    </div>
  );
}
