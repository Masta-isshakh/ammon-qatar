import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';
import { ShieldMotif } from '@/components/ui/BrandMotif';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  crumbs: Crumb[];
  crumbsLabel: string;
  children?: React.ReactNode;
  className?: string;
}

/** Navy page band used by every inner page: breadcrumb → eyebrow → H1 → intro (+ optional actions). */
export function PageHeader({ eyebrow, heading, intro, crumbs, crumbsLabel, children, className }: PageHeaderProps) {
  return (
    <section className={cn('relative overflow-hidden bg-primary-gradient text-white', className)}>
      <ShieldMotif className="pointer-events-none absolute -end-10 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-60 lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="container-x relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} ariaLabel={crumbsLabel} className="mb-6" />
        <div className="max-w-4xl">
          {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
          <h1 className="mt-4 text-balance text-h1 font-bold text-white">{heading}</h1>
          {intro && <p className="mt-5 text-pretty text-lead text-white/75">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
