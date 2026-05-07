import { clsx } from 'clsx';
import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      className={clsx(
        'w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 placeholder:text-slate-500',
        props.className,
      )}
      {...props}
    />
  );
}
