"use client";

import React from "react";
import { Navbar } from "@/components/redesign/Navbar";
import { Footer } from "@/components/redesign/Footer";
import { BlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Calendar, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SmoothScroll } from "@/components/redesign/SmoothScroll";

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {

  // Topic Cluster & Internal Link Mesh Algorithm
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const categoryMatches = otherPosts.filter((p) => p.category === post.category);
  const tagMatches = otherPosts.filter(
    (p) => p.category !== post.category && p.tags?.some((t) => post.tags?.includes(t))
  );
  const remainingPosts = otherPosts.filter(
    (p) => p.category !== post.category && !p.tags?.some((t) => post.tags?.includes(t))
  );
  const relatedPosts = [...categoryMatches, ...tagMatches, ...remainingPosts].slice(0, 3);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="pt-36 pb-32">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Top Navigation & Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-wrap items-start justify-between gap-4 mb-6 pb-2 border-b border-border-subtle"
            >
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors font-bold uppercase tracking-widest text-xs"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Back to All Insights
              </Link>
              <div className="flex flex-wrap w-full justify-between items-center gap-3 sm:gap-4 text-xs font-semibold tracking-wider text-text-muted">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                  <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/blogs" className="hover:text-accent transition-colors">Blogs</Link>
                  <span>/</span>
                  <span className="text-accent font-bold">{post.category}</span>
                </nav>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors font-bold uppercase tracking-wider text-[11px]"
                >
                  <HelpCircle size={13} />
                  <span>Frequently Asked Questions</span>
                </Link>
              </div>
            </motion.div>
              

            <article className="max-w-4xl mx-auto">
             
              {/* Header Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 mb-12"
              >
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="bg-accent/10 py-1 px-3 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock size={14} /> {post.readTime}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight text-foreground">
                  {post.title}
                </h1>

                <p className="text-lg sm:text-xl font-serif italic text-text-muted leading-relaxed">
                  {post.description}
                </p>
              </motion.div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full aspect-video bg-surface rounded-3xl md:rounded-[2.5rem] overflow-hidden mb-16 border border-border-subtle group relative shadow-sm"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent p-12 flex items-end"></div>
              </motion.div>

              {/* Body Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:leading-relaxed prose-a:text-accent hover:prose-a:underline prose-strong:text-foreground max-w-none opacity-95 text-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, href, children, ...props }) => {
                        if (href?.startsWith("/")) {
                          return (
                            <Link href={href} {...props}>
                              {children}
                            </Link>
                          );
                        }
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                <div className="pt-10 flex flex-wrap gap-2.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-xs font-bold text-text-muted border border-border-subtle px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all cursor-default"
                    >
                      <Tag size={11} /> {tag}
                    </span>
                  ))}
                </div>

              
              </motion.div>

              {/* Conversion Path Divider */}
              <div className="my-20 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

              {/* THE ACTION SECTION (Conversion Path) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface border border-accent/20 rounded-3xl md:rounded-[2.5rem] p-8 md:p-14 text-center shadow-xl shadow-accent/5"
              >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  Enjoyed this insight <br /> on {post.category}?
                </h2>
                <p className="text-text-muted text-base md:text-xl max-w-xl mx-auto mb-10 italic font-serif">
                  "At Launch Live Studio, we help ambitious brands implement these exact
                  systems to drive scalable revenue."
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/book-a-call"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white text-base md:text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/25 w-full sm:w-auto"
                  >
                    Let's Build Your System &rarr;
                  </Link>
                  <Link
                    href="/faq"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface hover:bg-foreground/5 text-foreground border border-foreground/15 text-base md:text-lg font-bold rounded-full hover:border-accent hover:text-accent transition-all w-full sm:w-auto"
                  >
                    <HelpCircle size={18} />
                    <span>Have Questions? Read FAQ</span>
                  </Link>
                </div>
                <p className="mt-6 text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase">
                  FREE 30-MINUTE STRATEGY CONSULTATION • CLEAR ANSWERS ON OUR FAQ
                </p>
              </motion.div>

              {/* DYNAMIC RELATED ARTICLES SECTION (Topic Cluster Mesh) */}
              <div className="mt-28">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 pb-4 border-b border-border-subtle">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-2">
                      TOPIC CLUSTER INSIGHTS
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif">Related Growth Guides.</h3>
                  </div>
                  <Link
                    href="/blogs"
                    className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors pb-1 border-b border-border-subtle hover:border-accent w-fit"
                  >
                    View all 17 articles &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((otherPost) => (
                    <Link
                      key={otherPost.slug}
                      href={`/blogs/${otherPost.slug}`}
                      className="group flex flex-col bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                    >
                      <div className="relative w-full aspect-video overflow-hidden bg-foreground/5">
                        <Image
                          src={otherPost.image}
                          alt={otherPost.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 flex flex-col grow">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <p className="text-accent tracking-widest uppercase text-[10px] font-black">
                            {otherPost.category}
                          </p>
                        </div>
                        <h4 className="text-lg font-serif group-hover:text-accent transition-colors mb-2 leading-snug line-clamp-2">
                          {otherPost.title}
                        </h4>
                        <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-4 grow">
                          {otherPost.description}
                        </p>
                        <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-wider mt-auto">
                          <span>{otherPost.date}</span>
                          <span className="group-hover:text-accent transition-colors">
                            Read Guide &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
