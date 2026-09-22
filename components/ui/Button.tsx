import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-[var(--ease-out-quart)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/50 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px [&_svg]:size-[1.1em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary-900 text-white shadow-[0_8px_20px_-12px_rgb(0_28_85/0.7)] hover:bg-primary-700',
        gold: 'bg-gold-gradient text-primary-950 shadow-gold hover:brightness-110',
        outline: 'border border-primary-900/25 bg-transparent text-primary-900 hover:border-primary-900 hover:bg-primary-900/5',
        outlineLight: 'border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10',
        ghost: 'bg-transparent text-primary-900 hover:bg-primary-900/5',
        ghostLight: 'bg-transparent text-white hover:bg-white/10',
        whatsapp: 'bg-whatsapp text-primary-950 hover:brightness-105',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-[0.9375rem]',
        lg: 'px-7 py-3.5 text-base',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(asChild ? {} : { type: type ?? 'button' })}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
