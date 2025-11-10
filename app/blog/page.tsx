"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const estimateReadTime = (excerpt: string) => {
    const wordsPerMinute = 200
    const words = excerpt.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <>
      <Header />
      <main>
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">News & Insights</h1>
              <p className="text-xl text-muted-foreground">
                Discover the latest updates, industry insights, and thought leadership from the Boardroom community
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full h-56 rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                {/* Featured Post */}
                {posts.length > 0 && (
                  <div className="mb-16 max-w-5xl mx-auto">
                    <article className="group">
                      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-6 bg-muted">
                        {posts[0].featured_image_url && (
                          <Image
                            src={posts[0].featured_image_url || "/placeholder.svg"}
                            alt={posts[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <time>{formatDate(posts[0].created_at)}</time>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-full">
                            Featured
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold group-hover:text-accent transition-colors">
                          <Link href={`/blog/${posts[0].slug}`}>{posts[0].title}</Link>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">{posts[0].excerpt}</p>
                        <Link
                          href={`/blog/${posts[0].slug}`}
                          className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
                        >
                          Read Article <ArrowRight size={20} />
                        </Link>
                      </div>
                    </article>
                  </div>
                )}

                {/* Other Posts Grid */}
                {posts.length > 1 && (
                  <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold mb-12">Latest Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {posts.slice(1).map((post) => (
                        <article
                          key={post.id}
                          className="group h-full border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/50 transition-all duration-300"
                        >
                          <div className="relative h-48 bg-muted overflow-hidden">
                            {post.featured_image_url && (
                              <Image
                                src={post.featured_image_url || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <div className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Calendar size={14} />
                              <time>{formatDate(post.created_at)}</time>
                              <span className="ml-auto text-muted-foreground">
                                {estimateReadTime(post.excerpt)} min read
                              </span>
                            </div>
                            <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h2>
                            <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-accent font-semibold hover:gap-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                            >
                              Read More <ArrowRight size={16} />
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">Blog posts coming soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
