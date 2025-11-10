"use client"

import { Users, Briefcase, Trophy, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"

const Page = () => {
  return (
    <>
      <main>
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19264733_690328184505668_6606660888089315828_o-jXW6KmqVvSi0SeAwJzQK06ln4qka5x.webp"
              alt="Boardroom conference"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 max-w-2xl">
            <div className="space-y-6">
              {/* Accent line */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#C8102E]" />
                <span className="text-[#C8102E] font-semibold text-sm tracking-widest uppercase">
                  Boardroom Summit 2nd January, 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-pretty">
                Transform Your Business Mindset
              </h1>

              <p className="text-lg md:text-xl text-gray-100 max-w-xl">
                Join industry leaders and entrepreneurs for an exclusive summit focused on mindset transformation and
                economic empowerment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#C8102E] hover:bg-[#C8102E]/90 text-white" asChild>
                  <Link href="/registration">Register Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance text-black">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Expert Speakers",
                  description: "Learn from industry leaders and successful entrepreneurs",
                },
                {
                  icon: Briefcase,
                  title: "Networking",
                  description: "Connect with like-minded professionals and potential partners",
                },
                {
                  icon: Trophy,
                  title: "Awards & Recognition",
                  description: "Celebrate outstanding achievements in entrepreneurship",
                },
                {
                  icon: Calendar,
                  title: "Full Day Program",
                  description: "Packed schedule with sessions, workshops, and activities",
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-[#C8102E]/50"
                  >
                    <Icon className="w-12 h-12 text-[#C8102E] mb-4" />
                    <h3 className="font-bold text-lg text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#C8102E]/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance text-black">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of entrepreneurs and business leaders at the Boardroom Summit 2026. Secure your spot today.
            </p>
            <Button size="lg" className="bg-[#C8102E] hover:bg-[#C8102E]/90 text-white" asChild>
              <Link href="/registration">Get Your Ticket</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Page
