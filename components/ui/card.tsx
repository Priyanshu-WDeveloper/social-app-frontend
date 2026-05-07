import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-white/5 bg-slate-900/80 shadow-soft',
        className,
      )}
    >
      {children}
    </div>
  );
}
