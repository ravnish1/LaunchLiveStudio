"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Linkedin,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Quote,
} from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: "E-Commerce" | "AI & Automation" | "Web & Systems";
  metricHighlight: string;
  metricLabel: string;
  linkedinUrl: string;
  avatarUrl: string;
  projectSlug: string;
  featured?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "The Launch Live Studio team is elite. They delivered our entire custom Shopify storefront for Raptile Studio a full week before our hard marketing launch deadline. Design quality and execution velocity are unparalleled.",
    author: "Divyansh Prajapati",
    role: "Founder",
    company: "Raptile Studio",
    category: "E-Commerce",
    metricHighlight: "1 Week Early",
    metricLabel: "Ahead of Schedule",
    linkedinUrl: "https://www.linkedin.com/",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    projectSlug: "raptile-studio",
    featured: true,
  },
  {
    id: "2",
    quote:
      "They transformed our brand identity and DTC storefront for Montbold into a luxury digital experience. Our visitor conversion rate exploded post-launch, taking us from $0 to $120k in revenue within 90 days.",
    author: "Aarav Sharma",
    role: "Founder & Brand Lead",
    company: "Montbold",
    category: "E-Commerce",
    metricHighlight: "$0 → $120k",
    metricLabel: "Revenue in 90 Days",
    linkedinUrl: "https://www.linkedin.com/",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    projectSlug: "montbold-premium-bag",
    featured: true,
  },
  {
    id: "3",
    quote:
      "Launch Live engineered our B2B rental fraud control center in 5 weeks flat. The real-time risk dashboard monitors listings and payout streams seamlessly, cutting fraud incidents by 70%.",
    author: "Vikramaditya Roy",
    role: "Head of Trust & Safety",
    company: "Deepshield",
    category: "Web & Systems",
    metricHighlight: "70% Less Fraud",
    metricLabel: "Risk Prevention Rate",
    linkedinUrl: "https://www.linkedin.com/",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    projectSlug: "deepshield-risk-control-center",
  },
  {
    id: "4",
    quote:
      "The enterprise RAG pipeline engineered by Launch Live digitized our entire manual due diligence workflow. It allows our compliance teams to audit third-party risk data securely, saving 20+ hours every single week.",
    author: "Dr. Ananya Iyer",
    role: "VP of Enterprise AI",
    company: "LL RAG Platform",
    category: "AI & Automation",
    metricHighlight: "20+ Hrs/Wk",
    metricLabel: "Automated Time Savings",
    linkedinUrl: "https://www.linkedin.com/",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    projectSlug: "launch-live-rag-platform",
  },
];

const CATEGORIES = [
  "All Work",
  "E-Commerce",
  "AI & Automation",
  "Web & Systems",
] as const;

export const Testimonials = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All Work");

  const filteredTestimonials = TESTIMONIALS.filter((t) =>
    activeCategory === "All Work" ? true : t.category === activeCategory,
  );

  return (
    <section className="py-24 md:py-36 px-6 bg-background text-foreground relative overflow-hidden">
      {/* Background Vibrant Orange Glow Blob in Hero Section */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] md:w-[800px] md:h-[450px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} /> Verified Founder Feedback
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight">
            Engineered for Impact. <br />
            <span className="text-text-muted italic font-sans font-light">
              Trusted by Founders.
            </span>
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Discover how modern enterprises partner with Launch Live Studio to
            ship mission-critical software, custom e-commerce, and automated AI
            pipelines.
          </p>
        </div>

        {/* Aggregate Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface/10 border border-border-subtle shadow-sm backdrop-blur-md">
          <div className="text-center space-y-1 border-r border-border-subtle last:border-0 pr-2">
            <div className="flex justify-center text-accent gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              4.9 / 5.0
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Client Satisfaction
            </p>
          </div>
          <div className="text-center space-y-1 border-r border-border-subtle last:border-0 pr-2">
            <p className="text-2xl font-bold font-mono text-accent">100%</p>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              On-Time Delivery
            </p>
          </div>
          <div className="text-center space-y-1 border-r border-border-subtle last:border-0 pr-2">
            <p className="text-2xl font-bold font-mono text-foreground">
              20+ Hrs
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Avg. Weekly Time Saved
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold font-mono text-accent">24/7</p>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Dedicated SLA Support
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-accent text-background shadow-lg shadow-accent/20 font-bold"
                  : "bg-surface text-text-muted hover:bg-surface-accent hover:text-foreground border border-border-subtle"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* High-Craft Asymmetric Bento Grid Testimonials */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className={`group relative p-8 md:p-10 rounded-3xl bg-surface border border-border-subtle hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between space-y-8 ${
                  testimonial.featured
                    ? "bg-gradient-to-br from-surface via-surface to-surface-accent/70 border-accent/30"
                    : ""
                }`}
              >
                {/* Top Header: Metric Badge & Category Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold">
                    <Zap size={14} className="animate-pulse" />
                    <span>{testimonial.metricHighlight}</span>
                    <span className="text-text-muted/70 font-normal uppercase text-[10px] hidden sm:inline">
                      • {testimonial.metricLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-text-muted px-3 py-1 rounded-full bg-background border border-border-subtle">
                    {testimonial.category}
                  </span>
                </div>

                {/* Main Quote Content with Editorial Quote Watermark */}
                <div className="relative space-y-3">
                  <Quote
                    size={40}
                    className="text-accent/20 group-hover:text-accent/40 transition-colors duration-500"
                  />
                  <blockquote className="text-foreground/95 font-serif text-lg md:text-xl leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {/* Author Info & Internal Work Link / Verification */}
                <div className="pt-6 border-t border-border-subtle/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-md group-hover:border-accent transition-colors duration-500"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-accent text-background flex items-center justify-center ring-2 ring-background">
                        <CheckCircle2 size={11} strokeWidth={3} />
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-base text-foreground group-hover:text-accent transition-colors">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-text-muted">
                        {testimonial.role},{" "}
                        <span className="text-accent font-semibold">
                          {testimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Action Links: Internal Work Link + LinkedIn Verification */}
                  <div className="flex items-center gap-2 shrink-0">
                    {testimonial.projectSlug && (
                      <Link
                        href={`/work/`}
                        // href={`/work/${testimonial.projectSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors py-1.5 px-3 rounded-full bg-accent/10 border border-accent/20 hover:border-accent"
                      >
                        <span>View Work</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    )}

                    <a
                      href={testimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${testimonial.author} on LinkedIn`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-background border border-border-subtle text-text-muted hover:text-background hover:bg-accent hover:border-accent transition-all duration-300 shadow-sm"
                    >
                      <Linkedin size={14} />
                      <span className="hidden sm:inline">Verify</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Hook */}
        <div className="pt-8 text-center space-y-4">
          <p className="text-sm text-text-muted">
            Want to see live build walkthroughs and code architectures?
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors pb-1 border-b border-accent/20 hover:border-accent"
          >
            Explore Case Studies & Selected Work <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
