// "use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { CaseStudy } from "../common/case-study";

export const featuredWork = [
  {
    name: "LL RAG Platform: Built for Every Industry",
    category: "AI / ML",
    tagline: "Enterprise-Grade capabilities",
    desc: "Built from the ground up for security, accuracy, and unprecedented speed. A completely managed RAG pipeline.The application likely serves organizations by digitizing manual due diligence workflows, allowing users to securely collect, track, and evaluate third-party risk data. Key features typically include automated questionnaire distribution, real-time progress dashboards, and centralized document storage for audit trails. By leveraging Vercel's edge network, the tool ensures fast, reliable access for global teams while maintaining high security standards through serverless architectures and role-based access controls.This platform helps businesses reduce compliance risks, accelerate procurement cycles, and maintain consistent security standards across their supply chain without the overhead of traditional on-premise solutions.",
    image: "/blog/ll-rag-platform.png",
    result: "Easing your finance",
    slug: "launch-live-rag-platform",
    liveUrl: "https://due-diligence-frontend.vercel.app/",
    hideCaseStudy: true,
  },
  {
    name: "Deepshield",
    category: "B2B / Trust & Safety",
    tagline: "Rental Fraud Control Center",
    desc: "DeepShield is a robust B2B Trust and Safety frontend dashboard designed to monitor owner onboarding, property listings, and payout streams.",
    image: "/projects/deepshield-risk-operation.png",
    result: "70% less fraud",
    slug: "deepshield-risk-control-center",
    liveUrl: "https://deep-shield-zeta.vercel.app/risk",
    hideCaseStudy: false,
  },
  {
    name: "Montbold",
    category: "DTC / E-commerce",
    tagline: "Seamless design for the modern journey",
    desc: "A premium, minimalist e-commerce and portfolio application built for high-end product showcasing and brand management.",
    image: "/projects/montbold-premium-bag.png",
    result: "$0 → $120k Revenue in 90 Days",
    slug: "montbold-premium-bag",
    liveUrl: "https://montbold-dev.vercel.app/",
    hideCaseStudy: false,
  },
  {
    name: "Raptile Studio",
    category: "Shopify / Streetwear",
    tagline: "Redefining the edge of urban fashion.",
    desc: "A high-performance, custom Shopify e-commerce experience for a premium streetwear brand, featuring liquid animations and lightning-fast checkout.",
    image: "/projects/raptile-studio.png",
    result: "Delivered 1 Week Early",
    slug: "raptile-studio",
    liveUrl: "https://raptilestudio.in/",
    hideCaseStudy: false,
  },
];

/* ─── Project Card ─── */
const ProjectCard = ({ project }: { project: (typeof featuredWork)[0] }) => {
  return (
    <div className="flex flex-col h-full bg-surface border border-foreground/5 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative  aspect-[16/9] overflow-hidden bg-foreground/5">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </a>
        ) : (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 868px) 100vw, 50vw"
          />
        )}
        {/* Result Badge — always visible */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-foreground/5 tracking-wide">
          ✦ {project.result}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent tracking-widest uppercase text-[10px] font-black">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2 leading-tight">
          {project.name}
        </h3>

        {/* Tagline */}
        <p className="text-base md:text-lg font-semibold text-foreground/80 mb-3 leading-snug">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed mb-5 flex-grow">
          {project.desc}
        </p>

        {/* Actions — always visible */}
        <div className="flex items-center gap-4 pt-4 border-t border-foreground/5">
          {project.hideCaseStudy && <CaseStudy project={project} />}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5"
            >
              Visit Site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Featured Project (first item, larger) ─── */
const FeaturedProject = ({
  project,
}: {
  project: (typeof featuredWork)[0];
}) => {
  return (
    <div className="flex flex-col bg-surface border border-foreground/5 rounded-2xl overflow-hidden">
      {/* Image — larger for featured */}
      <div className="relative w-full aspect-[16/8]  overflow-hidden bg-foreground/5">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </a>
        ) : (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="w-full h-full"
          />
        )}
      </div>

      {/* Content */}
      <div className="w-full p-6 md:p-8 lg:p-10 flex flex-col justify-center">
        {/* Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent tracking-widest uppercase text-[10px] font-black">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 leading-tight">
          {project.name}
        </h3>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-semibold text-foreground/80 mb-3 leading-snug">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
          {project.desc}
        </p>

        {/* Result Badge */}
        <div className=" flex w-1/3 justify-between items-center">
          <div className="inline-flex items-center bg-accent/8 border border-accent/15 text-foreground text-sm font-bold px-4 py-2 rounded-full  self-start">
            <span className="text-accent mr-2">✦</span> {project.result}
          </div>
          <div className="flex items-center gap-5 rounded-full border-1 border-foreground/40 p-2">
            {!project.hideCaseStudy && <CaseStudy project={project} />}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5"
              >
                Visit Site <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
        {/* Actions */}
      </div>
    </div>
  );
};

export const OurWork = ({
  titleContainerClassName = "",
  standalone = true,
}: {
  titleContainerClassName?: string;
  standalone?: boolean;
}) => {
  const [featured, ...rest] = featuredWork;

  return (
    <section
      className={`${standalone ? "pt-28 md:pt-32" : "pt-16 md:pt-20"} pb-16 md:pb-20 px-4 md:px-6`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── Header ── */}
        <div
          className={`mb-10 md:mb-14 flex flex-col justify-between items-start gap-5 ${titleContainerClassName}`}
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase">
            SELECTED PROJECTS
          </span>
          <h1 className="flex flex-col mt-3">
            <span className="text-3xl sm:text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight">
              Work that speaks
            </span>
            <span className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-accent leading-[1.1] tracking-tight">
              for itself.
            </span>
          </h1>
          <p className="mt-4 text-text-muted text-base md:text-lg max-w-lg leading-relaxed">
            Real results for real businesses. We specialize in building custom
            software, high-performance web applications, and digital systems
            tailored to your unique workflows. Every project is engineered from
            the ground up to convert, perform, and scale, ensuring that your
            digital presence drives measurable revenue and long-term growth for
            your brand.
          </p>
        </div>
        {/* ── Featured Project ── */}
        <div className="mb-6 md:mb-8">
          <FeaturedProject project={featured} />
        </div>
        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
