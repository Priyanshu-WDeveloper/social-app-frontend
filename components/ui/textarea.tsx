import { clsx } from 'clsx';
import type {
  TextareaHTMLAttributes,
  DetailedHTMLProps,
} from 'react';

export function Textarea(
  props: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) {
  return (
    <textarea
      className={clsx(
        'min-h-[140px] w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 placeholder:text-slate-500',
        props.className,
      )}
      {...props}
    />
  );
}
