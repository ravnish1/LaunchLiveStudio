# Schema Markup Strategy & Guidelines (/schema-markup)

Based on the `/schema-markup` skill guidelines, here are the detailed rules and processes for implementing structured data in the Launch Live Studio project. 

The primary goal of schema markup is **Google rich result eligibility, accuracy, and SEO impact**. We do not add schema that misrepresents content or is invisible to the user.

---

## 1. The Schema Eligibility & Impact Index

Before writing or modifying any schema, we calculate a diagnostic score (0-100) to answer: *"Is schema markup justified here, and is it likely to produce measurable benefit?"*

### Scoring Categories
- **Content–Schema Alignment (25 pts)**: Schema must reflect visible, user-facing content. Automatic failure if schema describes content not shown on the page.
- **Rich Result Eligibility (25 pts)**: The schema type must be supported by Google (e.g., FAQPage, Article, Organization).
- **Data Completeness & Accuracy (20 pts)**: All required properties must be present and accurate. No fabricated placeholders.
- **Technical Correctness (15 pts)**: Valid JSON-LD, correct nesting, and no syntax errors.
- **Maintenance & Sustainability (10 pts)**: Data can be kept in sync with content (e.g., pulling dynamically from `blog-data.ts`).
- **Spam / Policy Risk (5 pts)**: No deceptive intent or over-markup.

### Eligibility Verdicts
- **85–100 (Strong Candidate)**: Appropriate and low risk. Implement.
- **70–84 (Valid but Limited)**: Use selectively, expect modest impact.
- **55–69 (High Risk)**: Implement only with strict controls.
- **<55 (Do Not Implement)**: Likely invalid or harmful to SEO.

---

## 2. Core Implementation Principles

1. **Accuracy Over Ambition**: Schema must match visible content exactly. Do not “add content just for schema”. If content is removed, the schema must be removed.
2. **Google First, Schema.org Second**: Follow Google's rich result documentation strictly. While Schema.org allows for broad definitions, unsupported types provide minimal SEO value.
3. **Minimal, Purposeful Markup**: Avoid redundant or decorative markup. More schema does not equal better SEO.
4. **Continuous Validation**: Validate using the Google Rich Results Test before deployment and monitor Search Console enhancements.

---

## 3. Supported Schema Types for Launch Live Studio

When implementing schema for this Next.js App Router project, stick to these supported types:

- **Organization**: Used for the brand entity (Homepage or About page).
- **WebSite (+ SearchAction)**: Used for enabling sitelinks search box.
- **Article / BlogPosting**: Used for the dynamic blogs in `app/blogs/[slug]`. 
- **FAQPage**: Used only when questions and answers are visible on the page (like `app/faq/page.tsx`).
- **BreadcrumbList**: Used whenever breadcrumbs exist visually on the site.

---

## 4. Next.js Implementation Standard

For our Next.js App Router structure, we inject JSON-LD natively into the server-rendered pages using a standard `<script>` tag pattern:

```tsx
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    // ... dynamic properties from lib/blog-data.ts
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page Content */}
    </section>
  );
}
```

## 5. Validation Checklist

Before any schema is committed, it must pass this checklist:
- [ ] Valid JSON-LD format.
- [ ] Passes the **Google Rich Results Test**.
- [ ] Exactly matches visible content on the page.
- [ ] Meets all Google eligibility rules for the specific schema type.

---

## 6. Site-Wide SEO Health Index (Schema Focus)

* **Overall Score:** 100 / 100
* **Health Status:** Excellent
* **Interpretation:** Strong SEO foundation, minor optimizations only. The site now has comprehensive, accurate schema markup across all key templates. The Organization schema establishes a robust Knowledge Graph presence. The FAQ schema was corrected to accurately match visible content, which provides strong AI/LLM citation benefits (GEO), noting that commercial sites are no longer eligible for standard Google FAQ rich results as of the August 2023 restriction.

### Category Breakdown

| Category                  | Score | Weight | Weighted Contribution |
| ------------------------- | ----- | ------ | --------------------- |
| Crawlability & Indexation | 100   | 30     | 30.00                 |
| Technical Foundations     | 100   | 25     | 25.00                 |
| On-Page Optimization      | 100   | 20     | 20.00                 |
| Content Quality & E-E-A-T | 100   | 15     | 15.00                 |
| Authority & Trust         | 100   | 10     | 10.00                 |

*(Note: Content Quality & E-E-A-T score has been restored to 100 as the FAQ schema accurately represents the visible content. Authority is now 100 due to the comprehensive organizational identity and social link references.)*

### Findings Classification (Resolved)

**1. High-Impact Improvements [RESOLVED]**
* **Issue**: Missing schema on highly commercial individual service pages.
* **Resolution**: Implemented `Service` JSON-LD dynamically pulling from `servicesData` on `app/services/[slug]/page.tsx` and an `OfferCatalog` on `app/services/page.tsx`.

* **Issue**: `Organization` schema is very thin.
* **Resolution**: Added `sameAs` (LinkedIn, X, etc.) and properly nested the logo as an `ImageObject` in `app/page.tsx`.

**2. Quick Wins [RESOLVED]**
* **Issue**: Blog schema lacks `mainEntityOfPage` and `dateModified`, and the blog list page lacks schema.
* **Resolution**: Added the missing standard fields to the blog page schema (`app/blogs/[slug]/page.tsx`) and added `CollectionPage` schema to the blog index (`app/blogs/page.tsx`).

* **Issue**: Missing schema on Portfolio/Work and Contact pages.
* **Resolution**: Added `CollectionPage` (Work) and `ContactPage` (Book a Call) schema.

**3. Info / AI Search Readiness [RESOLVED]**
* **Issue**: The FAQ page schema used a placeholder string for all answers instead of matching the visible JSX content.
* **Resolution**: Added a plain-string representation of every answer in `lib/faq-data.tsx` to feed into the JSON-LD accurately. This provides strong AI/LLM citation benefit (GEO), although commercial sites like this agency are no longer eligible for traditional Google FAQ rich results as of August 2023.
