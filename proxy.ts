import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { removedBlogSlugs } from "@/data/removedBlogSlugs";

/**
 * Serves 410 Gone for the bulk-generated blog posts removed on 2026-08-05.
 *
 * These URLs were live and listed in the sitemap, so search engines may hold
 * them in the index. A 410 signals permanent removal and is dropped faster than
 * the 404 that `notFound()` would otherwise produce.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];

  if (slug && removedBlogSlugs.has(slug)) {
    return new NextResponse(
      "<!doctype html><title>410 Gone</title><h1>410 Gone</h1>" +
        "<p>This post has been permanently removed. " +
        '<a href="/blogs">Browse current posts</a>.</p>',
      {
        status: 410,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-robots-tag": "noindex",
        },
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/blogs/:slug*",
};
