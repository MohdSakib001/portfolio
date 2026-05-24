import BlogSection from "@/components/blogs/BlogSection";
import { BookOpen, Search } from "lucide-react";

const Blogs = ({
  blogs,
  categories,
}: {
  blogs: any[];
  categories: string[];
}) => {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-4 pb-8 pt-40 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        <div className="relative overflow-hidden rounded-4xl bg-[#DCE8F6] p-8 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
            style={{
              backgroundImage: `url("/assets/paper-texture.avif")`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-4 text-label font-medium uppercase tracking-[0.25em] text-black/40">
                Blog Archive
              </p>
              <h1 className="max-w-3xl text-display font-semibold leading-none tracking-tight">
                Essays for builders.
              </h1>
              <p className="mt-5 max-w-2xl text-body leading-relaxed text-black/55">
                A focused archive of technical strategy, AI implementation,
                product architecture, mobile development, and automation notes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/60 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur">
                <BookOpen size={18} className="mb-4 text-black/45" />
                <p className="text-3xl font-semibold tracking-tight">
                  {blogs.length}
                </p>
                <p className="mt-1 text-label uppercase tracking-[0.16em] text-black/40">
                  Posts
                </p>
              </div>
              <div className="rounded-2xl bg-white/60 p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.06),0_4px_24px_rgba(3,3,2,0.06)] backdrop-blur">
                <Search size={18} className="mb-4 text-black/45" />
                <p className="text-3xl font-semibold tracking-tight">
                  {categories.length}
                </p>
                <p className="mt-1 text-label uppercase tracking-[0.16em] text-black/40">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogSection
        blogs={blogs}
        label="All Articles"
        title="Latest thinking."
        description="Browse every generated note, sorted from newest to oldest."
        showViewAll={false}
        className="pt-10"
      />
    </main>
  );
};

export default Blogs;
