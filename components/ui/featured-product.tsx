"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredWork } from "@/components/redesign/OurWork";

function FeaturedProduct() {
  const project = featuredWork[0]; // LL RAG Platform

  return (
    <section className="py-14 px-4 md:px-6 bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <span className="text-sm font-bold tracking-[0.2em] text-accent uppercase bg-accent/10 px-4 py-1.5 rounded-full">
            Featured Product
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight text-foreground">
            Next-Gen <span className="italic text-accent">Solutions.</span>
          </h2>
        </div>

        {/* Product Showcase */}
        <div className="group relative rounded-3xl overflow-hidden  flex flex-col lg:flex-row shadow-2xl transition-all duration-500 ">
          {/* Content Half */}
          <div className="w-full bg-white/20 backdrop-blur-md lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent tracking-widest uppercase text-xs font-black">
                {project.category}
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
              {project.name}
            </h3>

            <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6">
              {project.tagline}
            </p>

            <p className="text-base text-text-muted leading-relaxed mb-8 line-clamp-4">
              {project.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-auto pt-8">
              <div className="inline-flex items-center bg-accent/10 text-foreground text-sm font-bold px-5 py-2.5 rounded-full">
                <span className="text-accent mr-2">✦</span> {project.result}
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-sm transition-all hover:bg-accent hover:text-white"
                >
                  View Live Site
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Image Half */}
          <div className="w-full absolute   lg:min-h-full order-1 lg:order-2 overflow-hidden bg-foreground/5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </a>
            ) : (
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}

            {/* Soft gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent opacity-0 lg:opacity-100 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeaturedProduct };
