import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'default' | 'outline' | 'ghost';
};

export function Button({
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'default' &&
          'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-glow hover:from-violet-400 hover:to-fuchsia-400',
        variant === 'outline' &&
          'border border-slate-700 bg-slate-950/70 text-slate-100 hover:border-violet-400 hover:text-white',
        variant === 'ghost' &&
          'bg-transparent text-slate-100 hover:bg-white/5',
        className,
      )}
      {...props}
    />
  );
}
