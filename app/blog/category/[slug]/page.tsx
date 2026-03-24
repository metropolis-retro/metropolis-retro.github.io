import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArchive } from "@/components/blog/blog-archive"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import {
  blogCategories,
  getBlogCategoryBySlug,
  getBlogPostsByCategory,
  slugifyBlogTaxonomy,
} from "@/lib/content/blog-posts"
import { SITE_URL, pageKeywords } from "@/lib/seo"

type BlogCategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    slug: slugifyBlogTaxonomy(category),
  }))
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getBlogCategoryBySlug(slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested blog category could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${category} Category | Blog`,
    description: `Explore Metropolis Retro blog posts in the ${category} category for Brisbane club players and improving chess competitors.`,
    keywords: pageKeywords([`${category} chess articles`, `${category} category`, category]),
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category} Articles | Metropolis Retro Blog`,
      description: `Explore Metropolis Retro blog posts in the ${category} category for Brisbane club players and improving chess competitors.`,
      url: `${SITE_URL}/blog/category/${slug}`,
      type: "website",
    },
  }
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params
  const category = getBlogCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = getBlogPostsByCategory(category)

  return (
    <>
      <Header />
      <BlogArchive
        eyebrow="Blog Category"
        title={`${category} articles for club players`}
        description={`Browse every Metropolis Retro article filed under ${category}. These posts focus on practical lessons, sharper preparation, and stronger decision-making for Brisbane chess players.`}
        posts={posts}
        activeCategory={category}
      />
      <Footer />
    </>
  )
}
