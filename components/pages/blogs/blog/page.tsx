import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

import BlogSection from "@/components/blogs/BlogSection";
import CtaSection from "@/components/CtaSection";
import { formatBlogDate, getReadingTime } from "@/data/blogs";
import { AVAILABILITY_PILLS } from "@/data/cta";
import { AUTHOR_BIO, NAME } from "@/data/profile";
import type { BlogPost } from "@/types/blogs";

type BlogDetailProps = {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
};

export default function BlogDetail({ blog, relatedBlogs }: BlogDetailProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <article>
        <section className="px-4 pb-10 pt-36 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
          <div className="relative overflow-hidden rounded-4xl bg-[#F4EDDA]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <div className="relative p-6 md:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-heading font-semibold leading-none tracking-tight md:text-[4.5rem]">
                  {blog.title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-body leading-relaxed text-black/55">
                  {blog.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-caption text-black/55">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2">
                    <CalendarDays size={15} />
                    {formatBlogDate(blog.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2">
                    <Clock size={15} />
                    {getReadingTime(blog.content)} min read
                  </span>
                </div>
              </div>

              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-white/45 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] md:mt-10">
                <Image
                  src={blog.cover_image_url}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:px-10 lg:mx-auto lg:max-w-4xl lg:px-16">
          <div className="mb-8 flex flex-wrap gap-2">
            {blog.tags.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-label uppercase tracking-[0.14em] text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <aside className="mt-14 rounded-2xl border border-black/6 bg-[#DAF0DE] p-6">
            <p className="mb-2 text-label font-medium uppercase tracking-[0.2em] text-black/35">
              Written by {NAME}
            </p>
            <p className="text-caption leading-relaxed text-black/55">
              {AUTHOR_BIO}
            </p>
          </aside>
        </section>
      </article>

      <CtaSection
        title="Work with a senior Next.js developer from India."
        description="I help US and UK startups build fast SaaS products, dashboards, AI interfaces, and full-stack web apps."
        pills={AVAILABILITY_PILLS}
        href="/hire-nextjs-developer-india"
        cta="Hire Me"
      />

      <BlogSection
        blogs={relatedBlogs}
        label="Keep Reading"
        title="Related blogs."
        description="More notes connected by category, topic, and technical context."
        showViewAll
        compact
        className="pt-8"
      />
    </main>
  );
}
