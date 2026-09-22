import type { CaseStudy, Testimonial } from '../types';

/**
 * Case studies are published ONLY with written client permission and with
 * identifying details removed. Leave empty until real, approved entries exist.
 * The site renders an educational section instead when this array is empty.
 */
export const caseStudies: CaseStudy[] = [];

/**
 * Only verified testimonials supplied by the company with consent.
 * Never add placeholder or generated reviews. Section is hidden while empty.
 */
export const testimonials: Testimonial[] = [];
