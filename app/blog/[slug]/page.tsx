import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getBlogPostBySlug, slugifyBlogTaxonomy } from "@/lib/content/blog-posts"
import { BLOG_TITLE_BASE, SITE_URL, pageKeywords } from "@/lib/seo"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: pageKeywords([post.category, ...post.tags, "chess blog post"]),
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${BLOG_TITLE_BASE}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}${post.coverImage}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${BLOG_TITLE_BASE}`,
      description: post.excerpt,
      images: [`${SITE_URL}${post.coverImage}`],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="border-b border-border py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 md:px-12">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/blog/category/${slugifyBlogTaxonomy(post.category)}`}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary/70"
              >
                {post.category}
              </Link>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugifyBlogTaxonomy(tag)}`}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <h1 className="mt-6 text-4xl tracking-tight md:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>By {post.author}</span>
              <span aria-hidden="true">•</span>
              <span>{post.publishedAt}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-14">
          <div className="mx-auto max-w-[1000px] px-6 md:px-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-secondary">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>

            <article className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-10">
              <div className="space-y-10">
                {post.content.map((section) => (
                  <section key={section.heading} className="space-y-4">
                    <h2 className="text-2xl tracking-tight md:text-3xl">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.heading}-${index}`} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
