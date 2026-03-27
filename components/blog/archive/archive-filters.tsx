import Link from "next/link"

import { blogCategories, blogTags, slugifyBlogTaxonomy } from "@/lib/content/blog-posts"

type ArchiveFiltersProps = {
  activeCategory?: string
  activeTag?: string
}

export function ArchiveFilters({ activeCategory, activeTag }: ArchiveFiltersProps) {
  return (
    <section className="border-b border-border py-10 md:py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12">
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Categories</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                !activeCategory ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-secondary"
              }`}
            >
              All categories
            </Link>
            {blogCategories.map((category) => {
              const href = `/blog/category/${slugifyBlogTaxonomy(category)}`
              const isActive = activeCategory === category

              return (
                <Link
                  key={category}
                  href={href}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {category}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-2">
            {blogTags.map((tag) => {
              const href = `/blog/tag/${slugifyBlogTaxonomy(tag)}`
              const isActive = activeTag === tag

              return (
                <Link
                  key={tag}
                  href={href}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  #{tag}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
