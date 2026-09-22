import { Clock, Mail, Phone } from 'lucide-react';
import { COMPANY, formatPhoneDisplay } from '@/lib/constants/company';

interface UtilityBarProps {
  tagline: string;
  hoursLabel: string;
}

export function UtilityBar({ tagline, hoursLabel }: UtilityBarProps) {
  return (
    <div className="hidden bg-[#1c0a10] text-[0.8125rem] text-white/70 md:block">
      <div className="container-x flex h-[var(--utility-h)] items-center justify-between gap-6">
        <p className="truncate">{tagline}</p>
        <ul className="flex items-center gap-5">
          <li className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-gold-400" aria-hidden />
            <span>
              {hoursLabel} · <span dir="ltr">{COMPANY.hours.opens}–{COMPANY.hours.closes}</span>
            </span>
          </li>
          <li>
            <a href={`tel:${COMPANY.phoneE164}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5 text-gold-400" aria-hidden />
              <span dir="ltr">{formatPhoneDisplay()}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5 text-gold-400" aria-hidden />
              {COMPANY.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
