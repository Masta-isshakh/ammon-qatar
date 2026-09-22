import { site } from './site';
import { services } from './services';
import { industries } from './industries';
import { process, faqs } from './process';
import { insights } from './insights';
import { form } from './form';
import { caseStudies, testimonials } from './evidence';

export const en = { site, services, industries, process, faqs, insights, form, caseStudies, testimonials };
export type LocaleContent = typeof en;
