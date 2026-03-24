import type { Metadata } from "next"

import { BlogArchive } from "@/components/blog/blog-archive"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { blogPosts } from "@/lib/content/blog-posts"
import { pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Metropolis Retro blog posts on chess training, tournament preparation, openings, and practical improvement for club players.",
  keywords: pageKeywords(["chess blog", "Brisbane chess articles", "club training posts"]),
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogArchive
        eyebrow="Metropolis Retro Blog"
        title="Strategy, training, and practical lessons from Brisbane club chess."
        description="Explore every article, then jump into dedicated category and tag archives for more focused reading paths."
        posts={blogPosts}
      />
      <Footer />
    </>
  )
}
