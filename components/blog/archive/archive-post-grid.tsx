import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { slugifyBlogTaxonomy, type BlogPost } from "@/lib/content/blog-posts"

type ArchivePostGridProps = {
  posts: BlogPost[]
}

export function ArchivePostGrid({ posts }: ArchivePostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-secondary/25 px-6 py-12 text-center">
        <p className="text-lg font-medium">No posts found in this archive.</p>
        <p className="mt-2 text-sm text-muted-foreground">Try another category or tag to discover more articles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg md:p-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/blog/category/${slugifyBlogTaxonomy(post.category)}`}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary/70"
            >
              {post.category}
            </Link>
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${slugifyBlogTaxonomy(tag)}`}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <h2 className="mt-5 text-2xl tracking-tight md:text-3xl">{post.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.publishedAt}</span>
            <span>{post.readTime}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--brand)" }}
          >
            Read article
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </article>
      ))}
    </div>
  )
}
