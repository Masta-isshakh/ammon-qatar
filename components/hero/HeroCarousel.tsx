'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SiteImage } from '@/components/ui/SiteImage';
import type { AnyImageKey } from '@/content/images';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export interface HeroSlide {
  image: AnyImageKey;
  /** Short line shown with the slide indicator. */
  caption: string;
  /**
   * Mirror the photograph in left-to-right layouts from `lg` up, where the
   * copy sits beside the image: flipping moves the subject into the clear half
   * of the frame. Only safe for images that contain no text.
   */
  mirrorInLtr?: boolean;
  /**
   * Which part of the frame to keep when the photograph is cropped on narrow
   * screens. Wide images lose most of their width on a phone.
   */
  focusOnMobile?: 'start' | 'end';
}

interface HeroCarouselProps {
  locale: Locale;
  /** First entry is the default slide and the LCP image. */
  slides: HeroSlide[];
  labels: { label: string; slide: string; pause: string; play: string };
  children: React.ReactNode;
}

const INTERVAL_MS = 7000;

/**
 * Full-bleed hero carousel: the photographs are the background, the hero copy
 * sits on top of a gradient scrim.
 *
 * Performance / accessibility notes:
 * - Only `opacity` and `transform` animate, so frames are GPU-composited and
 *   nothing triggers layout. The section has a fixed min-height, so CLS is 0.
 * - The first slide renders with `priority` and is the LCP element. The rest
 *   are not mounted until the browser is idle, so they never compete with the
 *   initial load.
 * - Rotation stops on hover, focus, hidden tab and prefers-reduced-motion, and
 *   there is an explicit pause control (WCAG 2.2.2).
 */
export function HeroCarousel({ locale, slides, labels, children }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
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

  // Mount the remaining slides only once the page has loaded and the browser is idle.
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

  const label = (t: string, n: number) => t.replace('{n}', String(n)).replace('{total}', String(slides.length));
  const show = (i: number) => {
    setReady(true);
    setIndex(i);
  };

  return (
    <section
      className="hero-shell relative isolate flex min-h-[32rem] items-center overflow-hidden bg-primary-950 text-white sm:min-h-[36rem] lg:min-h-[40rem]"
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
      {/* Background slides */}
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, i) =>
          i > 0 && !ready ? null : (
            <div
              key={slide.image}
              id={`${uid}-slide-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={label(labels.slide, i + 1)}
              aria-hidden={i !== index}
              className={cn(
                'absolute inset-0 transition-opacity duration-[1200ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none',
                i === index ? 'opacity-100' : 'opacity-0',
                slide.mirrorInLtr && 'lg:ltr:-scale-x-100',
                slide.focusOnMobile === 'start' && 'hero-focus-start',
                slide.focusOnMobile === 'end' && 'hero-focus-end',
              )}
            >
              <SiteImage
                image={slide.image}
                locale={locale}
                priority={i === 0}
                sizes="100vw"
                className={cn('size-full object-cover', i === index && 'hero-kenburns')}
              />
            </div>
          ),
        )}
      </div>

      {/* Scrim: keeps the copy legible over any photograph, mirrored for RTL. */}
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-primary-950 to-transparent" />

      <div className="container-x relative py-12 sm:py-14 lg:py-16">
        <div className="max-w-xl lg:max-w-3xl">{children}</div>

        {slides.length > 1 && (
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={label(labels.slide, i + 1)}
                  aria-current={i === index}
                  aria-controls={`${uid}-slide-${i}`}
                  onClick={() => show(i)}
                  className="group grid h-8 place-items-center px-0.5"
                >
                  <span
                    className={cn(
                      'block h-1 rounded-full transition-all duration-500',
                      i === index ? 'w-12 bg-gold-400' : 'w-5 bg-white/40 group-hover:bg-white/70',
                    )}
                  />
                </button>
              ))}
            </span>

            <p aria-live="polite" className="min-w-0 flex-1 text-sm text-white/70">
              {slides[index].caption}
            </p>

            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? labels.play : labels.pause}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
