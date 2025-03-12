import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CompanyCard from "@/components/company-card"
import HeroSection from "@/components/hero-section"
import NewsCard from "@/components/news-card"
import StatsSection from "@/components/stats-section"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"
import PageScript from "./page-script"

export default function Home() {
  // Sample company data - in a real app, this would come from the database
  const companies = [
    {
      id: 1,
      name: "Phoenix Security",
      description: "Cautious Security and Excellent Service",
      image: "/placeholder.svg?height=300&width=400",
      slug: "phoenix-security",
    },
    {
      id: 2,
      name: "Santosh Bandai Construction",
      description: "Leading real estate company specializing in high-quality residential communities",
      image: "/placeholder.svg?height=300&width=400",
      slug: "santosh-bandai-construction",
    },
    {
      id: 3,
      name: "Valentina Pharma",
      description: "Leading pharmaceutical marketing company dedicated to helping clients thrive",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-pharma",
    },
    {
      id: 4,
      name: "Valentina Securities",
      description: "Financial Services Corporate engaged in Stock Broking and Trading",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-securities",
    },
  ]

  // Sample news data - in a real app, this would come from the database
  const news = [
    {
      id: 1,
      title: "Valentina Group Expands Into New Markets",
      excerpt: "Valentina Industries announces expansion into three new international markets...",
      date: "2023-12-15",
      image: "/placeholder.svg?height=200&width=300",
      slug: "expansion-new-markets",
    },
    {
      id: 2,
      title: "Sustainability Initiative Launched",
      excerpt: "Our new eco-friendly initiative aims to reduce carbon footprint across all ventures...",
      date: "2023-11-28",
      image: "/placeholder.svg?height=200&width=300",
      slug: "sustainability-initiative",
    },
    {
      id: 3,
      title: "Annual Investor Conference Highlights",
      excerpt: "Key takeaways from this year's investor conference and future growth plans...",
      date: "2023-10-10",
      image: "/placeholder.svg?height=200&width=300",
      slug: "investor-conference",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <PageScript />

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-light-blue">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <ScrollReveal animation="fade-left" delay={100}>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  About Valentina Group of Companies
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Valentina Group of Companies is a dynamic and diverse conglomerate known for its extensive portfolio
                  of businesses across various sectors. With a strong commitment to excellence and innovation, the group
                  has established itself as a prominent player in and innovation, the group has established itself as a
                  prominent player in the industry.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  Each entity within the group operates with a shared vision of delivering high-quality products and
                  services, driving economic growth, and making a positive impact in the communities they serve.
                </p>
                <div className="mt-8">
                  <Link href="/about">
                    <Button variant="default" size="lg" className="gap-2 hover-scale">
                      Learn More About Us <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-right" delay={300}>
              <ParallaxSection speed={0.05} direction="up">
                <div className="relative h-[400px] overflow-hidden rounded-lg card-bordered-hover card-3d">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Valentina Group Headquarters"
                    fill
                    className="object-cover"
                  />
                </div>
              </ParallaxSection>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Our Companies Section */}
      <section className="py-16 md:py-24 bg-light-teal border-y border-teal-100 dark:border-teal-900/30">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-bottom" delay={100}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  Our Companies
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our diverse portfolio of businesses spanning multiple industries
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation" id="companies-grid">
            {companies.map((company, index) => (
              <div key={company.id}>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
          <ScrollReveal animation="fade" delay={600}>
            <div className="flex justify-center mt-12">
              <Link href="/companies">
                <Button variant="outline" size="lg" className="gap-2 hover-scale gradient-border">
                  View All Companies <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 md:py-24 bg-subtle-gradient-blue">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-bottom" delay={100}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  Latest News
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with the latest developments from Valentina Industries
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation" id="news-grid">
            {news.map((item) => (
              <div key={item.id}>
                <NewsCard news={item} />
              </div>
            ))}
          </div>
          <ScrollReveal animation="fade" delay={500}>
            <div className="flex justify-center mt-12">
              <Link href="/news">
                <Button variant="outline" size="lg" className="gap-2 hover-scale gradient-border">
                  View All News <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 bg-subtle-gradient-primary border-t border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <ScrollReveal animation="fade-left" delay={100}>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Partner with Valentina Industries?
                </h2>
                <p className="mt-4 text-lg opacity-90">
                  Contact us today to explore business opportunities and learn more about our ventures.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-right" delay={300}>
              <div className="flex justify-center lg:justify-end">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="gap-2 hover-scale">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}

