import {
  BarChart3,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Handshake,
  Landmark,
  Scale,
  Stamp,
  UserRound,
  type LucideProps,
} from 'lucide-react';
import type { ServiceIcon } from '@/content/types';

const MAP: Record<ServiceIcon, React.ComponentType<LucideProps>> = {
  building: Building2,
  user: UserRound,
  clock: Clock,
  'file-text': FileText,
  landmark: Landmark,
  handshake: Handshake,
  chart: BarChart3,
  scale: Scale,
  briefcase: Briefcase,
  stamp: Stamp,
};

export function ServiceIconGlyph({ name, className }: { name: ServiceIcon; className?: string }) {
  const Cmp = MAP[name];
  return <Cmp className={className} aria-hidden strokeWidth={1.6} />;
}
