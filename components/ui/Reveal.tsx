'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger direct children (they need the `reveal-child` class). */
  group?: boolean;
  as?: ElementType;
  delayMs?: number;
  id?: string;
}

/**
 * Adds `.is-in` when the element enters the viewport (once). CSS in
 * globals.css handles the actual transition; nothing here runs per frame.
 */
export function Reveal({ children, className, group = false, as: Tag = 'div', delayMs = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-in');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(group ? 'reveal-group' : 'reveal', className)}
      style={delayMs ? ({ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
