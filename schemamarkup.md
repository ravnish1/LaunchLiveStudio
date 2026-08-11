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

* **Overall Score:** 72 / 100
* **Health Status:** Fair
* **Interpretation:** Meaningful issues limiting growth. The site has basic schema in place, but lacks comprehensive implementation, and contains one critical violation on the FAQ page that jeopardizes eligibility for rich results.

### Category Breakdown

| Category                  | Score | Weight | Weighted Contribution |
| ------------------------- | ----- | ------ | --------------------- |
| Crawlability & Indexation | 100   | 30     | 30.00                 |
| Technical Foundations     | 100   | 25     | 25.00                 |
| On-Page Optimization      | 80    | 20     | 16.00                 |
| Content Quality & E-E-A-T | 10    | 15     | 1.50                  |
| Authority & Trust         | 0     | 10     | 0.00                  |

*(Note: Content Quality & E-E-A-T is scored low purely from a structural data perspective because the FAQ schema misrepresents the content, and Authority is 0 because of the missing organizational identity/sameAs schema.)*

### Findings Classification (Action Plan)

**1. Critical Blockers**
* **Issue**: The FAQ page schema uses a placeholder string for all answers instead of matching the visible JSX content.
* **Category**: Content Quality & E-E-A-T
* **Evidence**: `app/faq/page.tsx` line 24.
* **Severity**: Critical (blocks rich result eligibility for FAQs).
* **Why It Matters**: Google penalizes schema that doesn't match visible content.
* **Recommendation**: Add a plain-string representation of every answer in `lib/faq-data.tsx` to feed into the JSON-LD.

**2. High-Impact Improvements**
* **Issue**: Missing schema on highly commercial individual service pages.
* **Category**: On-Page Optimization
* **Evidence**: `app/services/[slug]/page.tsx` lacks `Service` JSON-LD.
* **Severity**: High.
* **Why It Matters**: Search engines lack semantic understanding of your offerings, limiting matching for transactional queries.
* **Recommendation**: Implement `Service` JSON-LD dynamically pulling from `servicesData`.

* **Issue**: `Organization` schema is very thin.
* **Category**: Authority & Trust
* **Evidence**: `app/page.tsx` lacks social links (`sameAs`) and contact info.
* **Severity**: High.
* **Why It Matters**: It prevents Google from constructing a strong Knowledge Graph entity for Launch Live Studio.
* **Recommendation**: Add `sameAs` (LinkedIn, X, etc.) and properly nest the logo as an `ImageObject`.

**3. Quick Wins**
* **Issue**: Blog schema lacks `mainEntityOfPage` and `dateModified`.
* **Category**: On-Page Optimization
* **Evidence**: `app/blogs/[slug]/page.tsx` JSON-LD.
* **Severity**: Medium.
* **Why It Matters**: Google prefers these fields for standard `BlogPosting` processing.
* **Recommendation**: Add the missing standard fields to the blog page schema.

* **Issue**: Missing schema on Portfolio/Work and Contact pages.
* **Category**: On-Page Optimization
* **Evidence**: `app/work/page.tsx` and `app/book-a-call/page.tsx`.
* **Severity**: Low/Medium.
* **Why It Matters**: Limits full semantic coverage of the site.
* **Recommendation**: Add `CollectionPage` (Work) and `ContactPage` (Book a Call) schema.
