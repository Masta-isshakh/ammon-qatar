import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: 'start' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({ eyebrow, heading, body, align = 'start', tone = 'dark', as: Tag = 'h2', className }: SectionHeadingProps) {
  const light = tone === 'light';
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow', light && 'eyebrow-light', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <Tag
        className={cn(
          'mt-4 text-balance font-bold',
          Tag === 'h1' ? 'text-h1' : 'text-h2',
          light ? 'text-white' : 'text-primary-900',
        )}
      >
        {heading}
      </Tag>
      {body && <p className={cn('mt-4 text-pretty text-lead', light ? 'text-white/75' : 'text-slate-muted')}>{body}</p>}
    </div>
  );
}
