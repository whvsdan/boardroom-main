import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { getSponsors, getSponsorImageUrl } from "@/lib/api"
import Image from "next/image"

export default async function Sponsors() {
  const sponsorshipTiers = [
    {
      name: "Platinum",
      price: "₦5,000,000",
      benefits: [
        "Logo on all marketing materials",
        "Speaking slot at summit",
        "Booth at event",
        "10 VIP tickets",
        "Social media promotion",
        "Exclusive networking dinner",
      ],
    },
    {
      name: "Gold",
      price: "₦2,500,000",
      benefits: [
        "Logo on marketing materials",
        "Booth at event",
        "6 VIP tickets",
        "Social media mentions",
        "Networking opportunities",
      ],
    },
    {
      name: "Silver",
      price: "₦1,000,000",
      benefits: ["Logo on website", "Booth at event", "4 standard tickets", "Event program mention"],
    },
    {
      name: "Bronze",
      price: "₦500,000",
      benefits: ["Logo on website", "2 standard tickets", "Event program mention"],
    },
  ]

  const currentSponsors = await getSponsors()

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sponsorship Opportunities</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
              Partner with us to shape the future of entrepreneurship
            </p>
          </div>
        </section>

        {/* Current Sponsors */}
        <section className="py-20 md:py-32 bg-background border-b border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center">Our Sponsors</h2>
            <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              We are grateful to our partners who support the Boardroom initiative
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentSponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="group flex flex-col items-center text-center p-8 rounded-xl border border-border/50 hover:border-accent/50 bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-full h-44 mb-6 flex items-center justify-center bg-background rounded-lg border border-border/30 group-hover:border-accent/30 transition-colors">
                    <Image
                      src={getSponsorImageUrl(sponsor.logo_url) || "/placeholder.svg"}
                      alt={sponsor.name}
                      width={200}
                      height={200}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      quality={85}
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">{sponsor.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{sponsor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Sponsor Boardroom?</h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                The Boardroom Summit brings together hundreds of entrepreneurs, business leaders, and innovators. As a
                sponsor, you'll gain visibility, build relationships, and demonstrate your commitment to supporting
                entrepreneurship in the Idoma region.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-lg leading-relaxed">Reach hundreds of entrepreneurs and business leaders</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-lg leading-relaxed">Build brand awareness and credibility</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-lg leading-relaxed">Network with potential clients and partners</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-lg leading-relaxed">Demonstrate corporate social responsibility</span>
                </li>
              </ul>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
              <div className="max-w-2xl mx-auto bg-accent/5 rounded-xl p-10 border border-border/50 hover:border-accent/30 transition-colors">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-bold mb-2 text-lg">Email</h3>
                      <a href="mailto:info@boardroom.ng" className="text-accent hover:underline">
                        info@boardroom.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-bold mb-2 text-lg">Phone</h3>
                      <div className="space-y-1">
                        <a href="tel:+2347061923254" className="block text-accent hover:underline">
                          +234 706 192 3254
                        </a>
                        <a href="tel:+2348037177066" className="block text-accent hover:underline">
                          +234 803 717 7066
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-bold mb-2 text-lg">Address</h3>
                      <p className="text-muted-foreground">
                        Flat 1, Block 6, Mani Close,
                        <br />
                        Area 1, Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent/10 rounded-xl p-10 text-center border border-accent/20">
              <h2 className="text-3xl font-bold mb-4">Ready to Become a Sponsor?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Contact us to discuss custom sponsorship packages tailored to your needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
