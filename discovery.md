# Google Search Console Error: Discovered – currently not indexed

## What this means
Google has found the URL (often via a sitemap or an internal link) but hasn't crawled it yet. Typically, this happens because Google wanted to crawl the URL but decided it might overload the site, or Google simply deprioritized crawling the page due to crawl budget constraints. The page is in the queue to be crawled, but it hasn't happened yet.

## Common Causes
1. **Crawl Budget/Server Load:** Google postponed the crawl to avoid overloading your server, or it simply hasn't gotten around to it yet. This is very common for newer sites or when many pages are published at once.
2. **Content Quality / Internal Linking:** Google might perceive the discovered pages as low-priority if there aren't strong internal links pointing to them from your high-traffic pages, or if the content seems "thin".
3. **Site Architecture:** If the pages are buried deep in your site structure without clear navigation, Google's bots might deprioritize them.
4. **New Content:** If the pages were just recently added to the sitemap, Google simply needs more time to process them.

## Actionable Steps to Fix for LaunchLive Studio
1. **Request Indexing Manually:** In Google Search Console, use the URL Inspection Tool on the affected URLs and click **"Request Indexing"**. This is the fastest way to get them indexed if the site is small.
2. **Improve Internal Linking:** Ensure your affected pages (like new blog posts) are linked from your homepage, main navigation, or other already-indexed, high-traffic pages. 
3. **Check Server Performance:** Ensure your hosting isn't blocking or slowing down Googlebot. If the site is fast and responsive (which it should be with Next.js), Google is more likely to crawl deeper.
4. **Review XML Sitemap:** Make sure your `sitemap.xml` is automatically updating and correctly submitted in Google Search Console. 
5. **Wait it Out:** If the content is high quality, properly linked, and the site is fast, Google will eventually crawl and index it on its next pass. This status usually resolves itself over time for healthy sites.
