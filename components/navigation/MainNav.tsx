'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { track } from '@/lib/analytics/events';
import { localePath, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export interface NavLink {
  href: string;
  label: string;
}

interface MainNavProps {
  locale: Locale;
  links: NavLink[];
  labels: {
    cta: string;
    whatsapp: string;
    whatsappLabel: string;
    call: string;
    menu: string;
    close: string;
    home: string;
    switchLocale: string;
    switchLocaleLabel: string;
  };
  whatsappHref: string;
  phoneHref: string;
}

export function MainNav({ locale, links, labels, whatsappHref, phoneHref }: MainNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Focus management + Escape + simple focus trap while the menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        // Light header: the brand logo is royal blue on white, so it needs a light surface to read correctly.
        'sticky top-0 z-50 border-b transition-[background-color,box-shadow,height,border-color] duration-300',
        scrolled || open
          ? 'border-line bg-white/95 shadow-[0_6px_24px_-14px_rgb(0_28_85/0.35)] backdrop-blur-md'
          : 'border-transparent bg-white',
      )}
    >
      <nav className="container-x flex items-center justify-between gap-4" aria-label="Primary" style={{ height: scrolled ? '4rem' : 'var(--header-h)' }}>
        <Link href={localePath(locale)} className="flex shrink-0 items-center" aria-label={labels.home}>
          <Image
            src="/logo/ammon-qatar-logo-wide.png"
            alt=""
            width={939}
            height={220}
            priority
            sizes="(min-width: 640px) 180px, 160px"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-primary-900/75 transition-colors hover:bg-primary-900/5 hover:text-primary-900',
                  isActive(l.href) && 'text-primary-900',
                )}
              >
                <span className={cn('border-b-2 border-transparent pb-0.5', isActive(l.href) && 'border-gold-500')}>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher locale={locale} label={labels.switchLocale} ariaLabel={labels.switchLocaleLabel} tone="dark" />
          <Button asChild variant="ghost" size="icon" aria-label={labels.whatsappLabel}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => track({ event: 'whatsapp_click', location: 'header' })}>
              <MessageCircle />
            </a>
          </Button>
          <Button asChild variant="primary" size="md">
            <Link href={localePath(locale, 'contact')} onClick={() => track({ event: 'cta_click', cta_id: 'header_assessment', location: 'header' })}>
              {labels.cta}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <LanguageSwitcher locale={locale} label={labels.switchLocale} ariaLabel={labels.switchLocaleLabel} tone="dark" />
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-primary-900 xl:hidden"
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={cn(
                  'flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold text-white/90 hover:bg-white/8',
                  isActive(l.href) && 'bg-white/8 text-gold-300',
                )}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-5">
              <Button asChild variant="gold" size="lg">
                <Link href={localePath(locale, 'contact')} onClick={() => { setOpen(false); track({ event: 'cta_click', cta_id: 'menu_assessment', location: 'mobile_menu' }); }}>
                  {labels.cta}
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outlineLight" size="lg">
                  <a href={phoneHref} onClick={() => track({ event: 'call_click', location: 'mobile_menu' })}>
                    <Phone /> {labels.call}
                  </a>
                </Button>
                <Button asChild variant="outlineLight" size="lg">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => track({ event: 'whatsapp_click', location: 'mobile_menu' })}>
                    <MessageCircle /> {labels.whatsapp}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
