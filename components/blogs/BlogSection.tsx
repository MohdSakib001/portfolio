import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";

import Container from "@/components/Container";
import type { BlogPost } from "@/types/blogs";
import { formatBlogDate, getReadingTime } from "@/data/blogs";

const PANEL_COLORS = [
  "bg-violet-300/70",
  "bg-green-200/70",
  "bg-sky-300/70",
  "bg-amber-300/70",
  "bg-rose-300/70",
  "bg-orange-300/70",
];

type BlogSectionProps = {
  blogs: BlogPost[];
  label?: string;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  className?: string;
  compact?: boolean;
};

function BlogCard({
  blog,
  index,
  compact = false,
}: {
  blog: BlogPost;
  index: number;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`group relative overflow-hidden rounded-2xl ${PANEL_COLORS[index % PANEL_COLORS.length]} transition duration-300`}
      title={blog.title}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
        style={{
          backgroundImage: `url("/assets/paper-texture.avif")`,
          backgroundSize: "cover",
        }}
      />

      <article className="relative flex h-full flex-col">
        <div
          className={`relative overflow-hidden bg-white/35 ${compact ? "aspect-video" : "aspect-4/3"}`}
        >
          <Image
            src={blog.cover_image_url}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
            className="object-cover"
            loading={index === 0 && !compact ? "eager" : "lazy"}
            priority={index === 0 && !compact}
          />

          <span className="rounded-full bg-white/55 px-3 py-1 font-semibold text-black/70 absolute bottom-3 right-3 text-label z-10">
            {blog.category}
          </span>
        </div>

        <div
          className={`${compact ? "p-5" : "p-6"} flex flex-1 flex-col justify-between`}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2  ">
            <span className="inline-flex items-center gap-1.5 text-label uppercase tracking-[0.16em] text-black/50">
              <CalendarDays size={12} />
              {formatBlogDate(blog.createdAt)}
            </span>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold leading-tight tracking-tight text-black`}
            >
              {blog.title}
            </h3>

            <p
              className={`${compact ? "line-clamp-2" : "line-clamp-3"} mt-3 text-caption leading-relaxed text-black/60`}
            >
              {blog.excerpt}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 pt-4 text-caption text-black/60">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen size={14} />
              {getReadingTime(blog.content)} min read
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition duration-200 group-hover:bg-neutral-800">
              <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogSection({
  blogs,
  label = "Field Notes",
  title = "Featured Blogs.",
  description = "Practical notes on AI systems, product engineering, mobile apps, hiring, and automation.",
  showViewAll = true,
  className,
  compact = false,
}: BlogSectionProps) {
  if (!blogs.length) return null;

  return (
    <Container className={className}>
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
            {label}
          </p>
          <h2 className="text-heading font-semibold leading-none tracking-tight text-black">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-caption leading-relaxed text-black/40">
            {description}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/blogs"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-neutral-800"
          >
            All Blogs
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.slug}
            blog={blog}
            index={index}
            compact={compact}
          />
        ))}
      </div>
    </Container>
  );
}
