import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-violet-600 text-white hover:bg-violet-700',

        outline:
          'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',

        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',

        ghost: 'hover:bg-slate-100 text-slate-900',

        destructive: 'bg-red-500 text-white hover:bg-red-600',

        link: 'text-violet-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2 text-sm rounded-xl',

        xs: 'h-7 px-2 text-xs rounded-lg',

        sm: 'h-9 px-4 text-sm rounded-xl',

        lg: 'h-12 px-6 text-base rounded-2xl',

        icon: 'h-11 w-11 rounded-xl',

        'icon-xs': 'h-7 w-7 rounded-lg',

        'icon-sm': 'h-9 w-9 rounded-xl',

        'icon-lg': 'h-12 w-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
