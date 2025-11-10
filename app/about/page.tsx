import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  const leaders = [
    {
      position: 1,
      title: "Office of the Convener / Founder",
      name: "Engr. Adokwu Oche David",
      description:
        "Provides visionary leadership, sets strategic direction, and ensures the organization stays true to its mission of mindset and economic transformation.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oche%20David%20Adokwu%20%28Engr%29%20Founder%20%26%20Converner%20Boardroom-bYOEaAvlZJ2genInif5qCPKD23kDQ5.jpg",
    },
    {
      position: 2,
      title: "Executive Director, Strategy & Partnerships",
      name: "Innocent Itodo",
      description:
        "Oversees strategic growth, institutional partnerships, and donor relations to accelerate organizational impact.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Innocent%20Itodo%20Head%20Partnerships%20%26%20Sponsorships-FjqY3DxUODnePnduj5nOhSdl6UWvoD.jpg",
    },
    {
      position: 3,
      title: "Head, Programs & Local Strategy",
      name: "Emmanuel Isah",
      description:
        "Designs and implements impactful initiatives, ensuring locally-relevant programs that drive meaningful change.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emmanuel%20Isah%20Head%2C%20Programs%20%26%20Local%20Strategy-HSmT1UDOqcDkvnqvWy8iQs97RPyNDs.jpg",
    },
    {
      position: 4,
      title: "Head, Media & Communications",
      name: "Happiness Michael",
      description: "Manages The Boardroom's brand identity, storytelling, and digital engagement across all platforms.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Happiness%20Michael.%20Head%20Media%20%26%20Communications-d1Pge0PyPovxe2mzLDYAJRnsjplSYB.jpg",
    },
    {
      position: 5,
      title: "Head, Logistics & Protocol",
      name: "Tony Ekpo",
      description: "Ensures smooth operations and coordinated event logistics for seamless Boardroom experiences.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tony%20Ekpo%20Head%2C%20Logistics%20%26%20Protocol-Nu1EA2n3S6VXO0sR2HfG7eyaUy0ftj.jpg",
    },
    {
      position: 6,
      title: "Head, Finance & Resource Management",
      name: "Emmanuel Otene",
      description:
        "Handles budgeting, funding, sponsorships, and transparent financial reporting for organizational sustainability.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emmanuel%20Otene%20Head%2C%20Finance%20%26%20Resource%20Management-WZKMWGAypvbjOYT14SIMBPQdyNKpk0.jpg",
    },
    {
      position: 7,
      title: "Project Director & Strategy Management",
      name: "Owoicho Godwin",
      description:
        "Leads strategic initiatives and ensures successful execution of organizational projects and milestones.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Owoicho%20Godwin%20Project%20Director%20%26%20Strategy%20Mnagement-N9laEg7JfgTODcMydtpro4IgOuwZwU.jpg",
    },
    {
      position: 8,
      title: "Advisory Board",
      name: "Experienced Professionals & Entrepreneurs",
      description:
        "A circle of experienced professionals and entrepreneurs offering strategic guidance and mentorship.",
    },
    {
      position: 9,
      title: "Secretariat",
      name: "Administrative Team",
      description: "The administrative engine — managing daily communication, event logistics, and documentation.",
    },
  ]

  const thematicDivisions = [
    {
      name: "Enterprise & Investment Division",
      description: "Driving entrepreneurship and financial literacy.",
    },
    {
      name: "Youth & Innovation Division",
      description: "Empowering young innovators and digital entrepreneurs.",
    },
    {
      name: "Women in Enterprise Division",
      description: "Advancing women-led enterprises and leadership roles.",
    },
    {
      name: "Community & Economic Reorientation Division",
      description: "Promoting grassroots awareness and collective growth.",
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Headshots14-6MnJgjCHP9oSh80mfLUIpDPO2ZMVIh.jpg"
            alt="Boardroom Leadership Team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">About Boardroom</h1>
              <p className="text-2xl md:text-3xl opacity-90">Shaping Leaders, Transforming Economies</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Boardroom Summit is dedicated to fostering entrepreneurship and business excellence in the Idoma
                  region and beyond. We bring together visionary leaders, innovative entrepreneurs, and business
                  professionals to share knowledge, build networks, and drive economic transformation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Host annual summits bringing together industry leaders and entrepreneurs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Provide mentorship programs connecting experienced leaders with emerging entrepreneurs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Recognize and celebrate outstanding achievements through awards</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Facilitate networking opportunities and business partnerships</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Share insights and best practices through expert-led sessions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Attend?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Whether you're an established entrepreneur, a business professional, or someone looking to start your
                  journey, the Boardroom Summit offers invaluable opportunities to:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Learn from successful entrepreneurs and industry experts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Expand your professional network</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Discover new business opportunities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Gain practical insights and strategies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Get recognized for your achievements</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button size="lg" asChild>
                  <Link href="/registration">Join Us Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Structure */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance">Leadership Structure</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {leaders.map((leader, index) => (
                <div key={index} className="group">
                  <div className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                    {/* Photo with actual images for team members */}
                    <div className="aspect-square bg-gradient-to-br from-secondary to-primary flex items-center justify-center relative overflow-hidden">
                      {leader.image ? (
                        <Image
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={85}
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center text-primary-foreground">
                          <div className="text-6xl font-bold opacity-20">{leader.position}</div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">{leader.title}</p>
                      <h3 className="text-lg font-bold mb-3 text-foreground">{leader.name}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm flex-1">{leader.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership values callout */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-accent/10 to-transparent rounded-lg p-8 border border-accent/20">
              <p className="text-center text-muted-foreground leading-relaxed">
                Our leadership team brings together decades of experience in entrepreneurship, business strategy, and
                economic development. We are committed to creating an environment where leaders can thrive, networks can
                flourish, and transformational ideas can take root.
              </p>
            </div>
          </div>
        </section>

        {/* Thematic Divisions */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance">Thematic Divisions</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {thematicDivisions.map((division, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-8 border border-border hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{division.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{division.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
