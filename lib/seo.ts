export const SITE_URL = "https://www.launchlive.studio";

/**
 * Generates canonical and multi-region hreflang alternates adhering strictly
 * to Google Search Console International SEO / ISO 639-1 & ISO 3166-1 standards.
 *
 * @param path - Relative route path (e.g., '/blogs/nextjs-15-app-router' or '')
 * @returns Metadata alternates object with canonical and localized languages + x-default
 */
export function getAlternates(path: string = "") {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      "en": canonicalUrl,
      "en-US": canonicalUrl,
      "en-GB": canonicalUrl,
      "en-IN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  };
}
