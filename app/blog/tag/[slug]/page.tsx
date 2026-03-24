import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArchive } from "@/components/blog/blog-archive"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import {
  blogTags,
  getBlogPostsByTag,
  getBlogTagBySlug,
  slugifyBlogTaxonomy,
} from "@/lib/content/blog-posts"
import { SITE_URL, pageKeywords } from "@/lib/seo"

type BlogTagPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogTags.map((tag) => ({
    slug: slugifyBlogTaxonomy(tag),
  }))
}

export async function generateMetadata({ params }: BlogTagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = getBlogTagBySlug(slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested blog tag could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `#${tag} Tag | Blog`,
    description: `Read Metropolis Retro articles tagged ${tag}, covering practical chess improvement, preparation, and club event insights.`,
    keywords: pageKeywords([`${tag} chess tag`, `${tag} blog posts`, tag]),
    alternates: {
      canonical: `/blog/tag/${slug}`,
    },
    openGraph: {
      title: `#${tag} Articles | Metropolis Retro Blog`,
      description: `Read Metropolis Retro articles tagged ${tag}, covering practical chess improvement, preparation, and club event insights.`,
      url: `${SITE_URL}/blog/tag/${slug}`,
      type: "website",
    },
  }
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { slug } = await params
  const tag = getBlogTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const posts = getBlogPostsByTag(tag)

  return (
    <>
      <Header />
      <BlogArchive
        eyebrow="Blog Tag"
        title={`Posts tagged #${tag}`}
        description={`Browse every Metropolis Retro post tagged #${tag}. This archive groups focused ideas, lessons, and practical references around one recurring chess theme.`}
        posts={posts}
        activeTag={tag}
      />
      <Footer />
    </>
  )
}
