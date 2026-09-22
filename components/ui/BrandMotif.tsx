import { cn } from '@/lib/utils';

/**
 * Signature geometry inspired by the shield logo: a chevron-shield outline
 * with a gold rule. Pure inline SVG — decorative, aria-hidden.
 */
export function ShieldMotif({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'primary' }) {
  const stroke = tone === 'gold' ? 'var(--color-gold-500)' : 'var(--color-primary-900)';
  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden className={cn('pointer-events-none', className)}>
      <path d="M100 8 L184 44 V120 C184 176 148 212 100 232 C52 212 16 176 16 120 V44 Z" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
      <path d="M100 40 L156 64 V118 C156 158 130 184 100 200 C70 184 44 158 44 118 V64 Z" stroke={stroke} strokeWidth="1.5" opacity="0.3" />
      <path d="M62 128 L100 150 L138 128" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M62 104 L100 126 L138 104" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
    </svg>
  );
}

/** Animated gold line (scaleX). Wrap in a Reveal so `.is-in` triggers it. */
export function GoldLine({ className }: { className?: string }) {
  return <span aria-hidden className={cn('gold-line block h-[3px] w-24 rounded-full bg-gradient-to-r from-gold-500 to-gold-300', className)} />;
}
