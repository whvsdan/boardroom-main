"use client"

import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  image_url: string
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpeakers = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("speakers").select("*").order("name")

      if (!error && data) {
        setSpeakers(data)
      }
      setLoading(false)
    }

    fetchSpeakers()
  }, [])

  return (
    <>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Speakers</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
              Learn from industry leaders and visionary entrepreneurs transforming the business landscape
            </p>
          </div>
        </section>

        {/* Speakers Grid */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full h-72 rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : speakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {speakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full h-72 bg-muted overflow-hidden">
                      {speaker.image_url ? (
                        <Image
                          src={speaker.image_url || "/placeholder.svg"}
                          alt={speaker.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">
                        {speaker.name}
                      </h3>
                      <p className="text-accent font-semibold text-sm mb-1">{speaker.title}</p>
                      <p className="text-muted-foreground text-sm mb-4 font-medium">{speaker.company}</p>
                      <p className="text-sm text-foreground/90 line-clamp-3 leading-relaxed">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Speakers will be announced soon. Check back later!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
