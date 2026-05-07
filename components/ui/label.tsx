import { clsx } from 'clsx';
import type { LabelHTMLAttributes, DetailedHTMLProps } from 'react';

export function Label(
  props: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >,
) {
  return (
    <label
      className={clsx(
        'block text-sm font-medium text-slate-200',
        props.className,
      )}
      {...props}
    />
  );
}
