import Image, { type ImageProps } from 'next/image';
import { ALL_IMAGES, type AnyImageKey } from '@/content/images';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface SiteImageProps extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> {
  image: AnyImageKey;
  locale: Locale;
  /** Override alt when the surrounding content supplies better context. */
  alt?: string;
}

/**
 * Image slot bound to content/images.ts. Every entry has fixed intrinsic
 * dimensions so the layout never shifts, and a locale-aware alt.
 *
 * Loading strategy is decided per usage, never in the registry: `priority`
 * marks the one above-the-fold image on a page, everything else lazy-loads.
 * `priority` and `loading` are mutually exclusive in next/image, so this
 * component guarantees only one of them is ever passed through.
 */
export function SiteImage({ image, locale, alt, className, sizes, priority = false, loading, ...rest }: SiteImageProps) {
  const def = ALL_IMAGES[image];
  return (
    <Image
      src={def.src}
      alt={alt ?? def.alt[locale]}
      width={def.width}
      height={def.height}
      sizes={sizes ?? def.sizes}
      placeholder={def.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={def.blurDataURL}
      className={cn('h-auto w-full', className)}
      {...(priority ? { priority: true } : { loading: loading ?? 'lazy' })}
      {...rest}
    />
  );
}
