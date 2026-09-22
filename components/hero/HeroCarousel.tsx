'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SiteImage } from '@/components/ui/SiteImage';
import type { AnyImageKey } from '@/content/images';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  locale: Locale;
  /** First entry is the default slide and is the LCP image. */
  slides: AnyImageKey[];
  caption: string;
  labels: { label: string; slide: string; pause: string; play: string };
}

const INTERVAL_MS = 6500;

/**
 * Cross-fading hero carousel.
 *
 * - Only `opacity` animates, so every frame is composited (no layout work).
 * - The first slide renders eagerly with `priority` and stays the LCP element.
 *   The remaining slides are not mounted until the browser is idle, so they
 *   never compete with the initial page load.
 * - Auto-rotation stops on hover, focus, tab-hide and prefers-reduced-motion,
 *   and there is an explicit pause control (WCAG 2.2.2).
 */
export function HeroCarousel({ locale, slides, caption, labels }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Extra slides mount only once the page is loaded and the browser is idle. */
  const [ready, setReady] = useState(false);
  const hovering = useRef(false);
  const uid = useId();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (!cancelled) setReady(true);
    };
    const schedule = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
      if (idle) idle(mount, { timeout: 2500 });
      else window.setTimeout(mount, 1200);
    };
    if (document.readyState === 'complete') {
      schedule();
      return () => {
        cancelled = true;
      };
    }
    window.addEventListener('load', schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
    };
  }, []);

  const advance = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (!ready || paused || reduced || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (!hovering.current && !document.hidden) advance();
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [ready, paused, reduced, advance, slides.length]);

  const label = (template: string, n: number) => template.replace('{n}', String(n)).replace('{total}', String(slides.length));

  return (
    <figure
      className="relative"
      aria-roledescription="carousel"
      aria-label={labels.label}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
      onFocusCapture={() => {
        hovering.current = true;
      }}
      onBlurCapture={() => {
        hovering.current = false;
      }}
    >
      <div aria-hidden className="absolute -inset-3 rounded-[1.75rem] border border-gold-500/30" />
      <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgb(0_17_47/0.9)]">
        {/* Aspect box keeps the height fixed so switching slides never shifts layout. */}
        <div className="relative aspect-[4/3] w-full lg:aspect-[16/11]">
          {slides.map((slide, i) =>
            i > 0 && !ready ? null : (
            <div
              key={slide}
              id={`${uid}-slide-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== index}
              className={cn(
                'absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-quart)] motion-reduce:transition-none',
                i === index ? 'opacity-100' : 'opacity-0',
              )}
            >
              <SiteImage
                image={slide}
                locale={locale}
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="size-full object-cover"
              />
            </div>
            ),
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary-950/75 via-primary-950/10 to-transparent" />
        </div>
      </div>

      <figcaption className="absolute bottom-5 start-5 end-5 flex items-end justify-between gap-4">
        <span className="text-sm font-medium text-white/90">{caption}</span>
        {slides.length > 1 && (
          <span className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-1.5">
              {slides.map((slide, i) =>
            i > 0 && !ready ? null : (
                <button
                  key={slide}
                  type="button"
                  aria-label={label(labels.slide, i + 1)}
                  aria-current={i === index}
                  aria-controls={`${uid}-slide-${i}`}
                  onClick={() => {
                    setReady(true);
                    setIndex(i);
                  }}
                  className="group grid size-6 place-items-center"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-300',
                      i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/55 group-hover:bg-white/85',
                    )}
                  />
                </button>
              ))}
            </span>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? labels.play : labels.pause}
                className="grid size-7 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
              </button>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
