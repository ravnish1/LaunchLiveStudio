import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const HomeBlogs = () => {
  const latestPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
                INSIGHTS & GUIDES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif">
              Latest from the Studio.
            </h2>
          </div>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors pb-1 border-b border-border-subtle hover:border-accent w-fit"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col h-full bg-surface border border-foreground/5 rounded-2xl overflow-hidden hover:border-accent transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-sm"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-foreground/5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <p className="text-accent tracking-widest uppercase text-[10px] font-black">
                    {post.category}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors mb-3 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-muted leading-relaxed flex-grow text-[14px] line-clamp-2 mb-6">
                  {post.description}
                </p>

                <div className="mt-auto pt-4 border-t border-foreground/5 flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                  <span>{post.date}</span>
                  <span className="text-foreground transition-colors flex items-center gap-1.5 group-hover:text-accent">
                    Read Post{" "}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
