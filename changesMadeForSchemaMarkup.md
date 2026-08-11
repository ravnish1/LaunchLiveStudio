# Schema Markup Changes Log

This file tracks all modifications made to the application to support Google rich results and properly formatted JSON-LD schema markup.

## Changes Implemented

- **`lib/faq-data.tsx` & `app/faq/page.tsx`**: Added `plainTextAnswer` property to FAQ items and used it in the JSON-LD `FAQPage` schema to resolve JSX rendering errors inside JSON.
- **`app/page.tsx`**: Enhanced the existing `Organization` schema to correctly format `logo` as an `ImageObject` and added `sameAs` array (social links) and `contactPoint`.
- **`app/blogs/[slug]/page.tsx`**: Upgraded `BlogPosting` schema by adding `mainEntityOfPage`, correctly formatting `image` and `publisher.logo` as `ImageObject`s, and including `dateModified`.
- **`app/blogs/page.tsx`**: Inserted a `CollectionPage` schema into the blog list index page to provide context about the collection of articles.
- **`app/services/page.tsx`**: Enhanced the `Service` schema by adding an `OfferCatalog` which enumerates the specific services provided by Launch Live Studio.
- **`app/services/[slug]/page.tsx`**: Injected a specific `Service` schema into the server component wrapping the service detail client component. Formatted provider details accurately.
- **`app/work/page.tsx`**: Inserted a `CollectionPage` JSON-LD schema describing the portfolio, using `next/script`.
- **`app/book-a-call/page.tsx`**: Added a `ContactPage` JSON-LD schema with full publisher information using `next/script`.
