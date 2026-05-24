import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import BlogSection from "@/components/blogs/BlogSection";
import { formatBlogDate, getReadingTime } from "@/data/blogs";
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
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-caption font-medium text-black/50 transition hover:text-black"
          >
            <ArrowLeft size={15} />
            Blogs
          </Link>

          <div className="relative overflow-hidden rounded-4xl bg-[#F4EDDA]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <div>
                <p className="mb-4 w-fit rounded-full bg-white/65 px-4 py-2 text-label font-semibold uppercase tracking-[0.16em] text-black/55">
                  {blog.category}
                </p>
                <h1 className="max-w-4xl text-heading font-semibold leading-none tracking-tight md:text-[4.5rem]">
                  {blog.title}
                </h1>
                <p className="mt-5 max-w-2xl text-body leading-relaxed text-black/55">
                  {blog.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-caption text-black/55">
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

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/45 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)]">
                <Image
                  src={blog.cover_image_url}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
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

          <aside className="mt-14 rounded-4xl bg-[#E6E0F8] p-6 md:p-8">
            <p className="mb-3 text-label font-medium uppercase tracking-[0.2em] text-black/35">
              Hiring Next.js help?
            </p>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-title font-semibold leading-tight tracking-tight">
                  Work with a senior Next.js developer from India.
                </h2>
                <p className="mt-3 max-w-xl text-caption leading-relaxed text-black/55">
                  I help US and UK startups build fast SaaS products,
                  dashboards, AI interfaces, and full-stack web apps.
                </p>
              </div>
              <Link
                href="/hire-nextjs-developer-india"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
              >
                Hire Me
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </aside>

          {blog.author_bio && (
            <aside className="mt-14 rounded-2xl border border-black/6 bg-[#DAF0DE] p-6">
              <p className="mb-2 text-label font-medium uppercase tracking-[0.2em] text-black/35">
                Written by {blog.author_name}
              </p>
              <p className="text-caption leading-relaxed text-black/55">
                {blog.author_bio}
              </p>
            </aside>
          )}
        </section>
      </article>

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
