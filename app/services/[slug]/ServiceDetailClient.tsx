"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/redesign/Navbar";
import { CTABanner } from "@/components/redesign/CTABanner";
import { Footer } from "@/components/redesign/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ServiceData, servicesData } from "@/lib/services-data";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SmoothScroll } from "@/components/redesign/SmoothScroll";

export function ServiceDetailClient({ service }: { service: ServiceData }) {
  // Parse content to extract FAQ section for Accordion rendering
  const contentStr = service.content || "";
  let mainContent = contentStr;
  let faqContent = "";
  let conclusionContent = "";

  const faqSplit = contentStr.split(
    /## Frequently Asked Questions(?:\s*\(FAQ\))?/,
  );
  if (faqSplit.length > 1) {
    mainContent = faqSplit[0];
    const restAfterFaq = faqSplit[1];

    const conclusionSplit = restAfterFaq.split(/## Conclusion/);
    faqContent = conclusionSplit[0];
    if (conclusionSplit.length > 1) {
      conclusionContent = "## Conclusion" + conclusionSplit[1];
    }
  }

  const faqs: { question: string; answer: string }[] = [];
  if (faqContent) {
    const regex = /\*\*Q:\s*(.*?)\*\*\s*A:\s*([\s\S]*?)(?=\*\*Q:|$)/g;
    let match;
    while ((match = regex.exec(faqContent)) !== null) {
      let answer = match[2].trim();
      answer = answer.replace(/\s*---\s*$/, "").trim();
      faqs.push({ question: match[1].trim(), answer: answer });
    }
  }

  const complementaryServices = servicesData
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="pt-36 pb-24 px-6">
          <div className="max-w-[860px] mx-auto">
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex flex-col  items-start justify-between gap-4 mb-10 pb-4 border-b border-foreground/10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft size={14} /> Back to Services
              </Link>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
                <span>/</span>
                <span className="text-accent font-bold">{service.title}</span>
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 block">
                {service.slug.replace("-", " ")}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
                {service.title}
              </h1>

              <div className="h-px w-full bg-foreground/10 my-10" />

              <div className="prose prose-blockquote:text-black/70 prose-lg text-black prose-strong:text-black prose-h2:text-black prose-h3:text-black prose-invert max-w-none prose-headings:font-serif prose-a:text-accent hover:prose-a:text-accent/80 prose-a:transition-colors prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:px-4 prose-blockquote:py-2">
                {service.content ? (
                  <>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, href, children, ...props }) => {
                          if (href?.startsWith("/")) {
                            return <Link href={href} {...props}>{children}</Link>;
                          }
                          return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                        }
                      }}
                    >
                      {mainContent}
                    </ReactMarkdown>

                    {faqs.length > 0 && (
                      <div className="my-16 not-prose">
                        <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black">
                          Frequently Asked Questions
                        </h2>
                        <Accordion
                          type="single"
                          collapsible
                          className="flex flex-col gap-2 w-full "
                        >
                          {faqs.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className="border-b border-black/20 py-2"
                            >
                              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-black hover:text-accent hover:no-underline cursor-pointer">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-base md:text-lg text-black/80 leading-relaxed pt-2 pb-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}

                    {conclusionContent && (
                      <>
                        <div className="h-px w-full bg-black/10 my-10" />
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, href, children, ...props }) => {
                              if (href?.startsWith("/")) {
                                return <Link href={href} {...props}>{children}</Link>;
                              }
                              return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                            }
                          }}
                        >
                          {conclusionContent}
                        </ReactMarkdown>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xl md:text-2xl text-black leading-relaxed font-serif italic mb-8">
                      {service.shortDescription}
                    </p>
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
                      {service.fullDescription}
                    </p>

                    <h3 className="text-2xl font-serif mt-12 mb-6">
                      Why Choose Launch Live Studio?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-accent shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-foreground/80">
                          Tailored strategies aligned with your specific revenue
                          goals.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-accent shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-foreground/80">
                          Premium quality execution with an obsession for
                          detail.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-accent shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-foreground/80">
                          Direct communication and full transparency throughout
                          the project.
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </div>

              {/* Complementary Services Section (Cross-Linking) */}
              <div className="mt-20 pt-16 border-t border-foreground/10 not-prose">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-2">
                      ECOSYSTEM CAPABILITIES
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
                      Complementary Services
                    </h3>
                  </div>
                  <Link
                    href="/services"
                    className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors pb-1 border-b border-foreground/10 hover:border-accent w-fit"
                  >
                    View All Services &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {complementaryServices.map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/services/${comp.slug}`}
                      className="group p-6 rounded-2xl bg-surface border border-foreground/5 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-serif mb-2 text-foreground group-hover:text-accent transition-colors">
                          {comp.title}
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-4">
                          {comp.shortDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider mt-auto">
                        Explore Capability &rarr;
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <CTABanner />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
