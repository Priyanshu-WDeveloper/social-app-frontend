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
        'h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827]',
        'placeholder:font-medium placeholder:text-[#00000069]',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        'transition-all duration-200',
        'focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none',
        props.className,
      )}
      {...props}
    />
  );
}
