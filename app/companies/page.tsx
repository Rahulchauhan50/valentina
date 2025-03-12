import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export default function CompaniesPage() {
  // Sample companies data - in a real app, this would come from the database
  const companies = [
    {
      id: 1,
      name: "Phoenix Security",
      description:
        "Cautious Security and Excellent Service. Phoenix Security and Facility Services is an ISO 9001:2015 certified company which is a part of Malai Industries. We provide high standard security services with smartly uniformed, trained and well supervised security staff.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "phoenix-security",
    },
    {
      id: 2,
      name: "Santosh Bandai Construction",
      description:
        "A leading real estate company specializing in the development of high-quality residential communities. With a strong commitment to excellence and a passion for creating vibrant neighbourhoods, we have established ourselves as a trusted name in the housing industry.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "santosh-bandai-construction",
    },
    {
      id: 3,
      name: "Valentina Pharma",
      description:
        "A leading pharmaceutical marketing company dedicated to helping our clients thrive in the ever-evolving healthcare industry. With a deep understanding of the pharmaceutical landscape and a passion for innovation, we provide comprehensive marketing solutions.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-pharma",
    },
    {
      id: 4,
      name: "Valentina Securities",
      description:
        "A Financial Services Corporate engaged into Stock Broking, Currency Derivatives and Commodity Trading. Valentina Securities is committed to provide Real Value for Money to all its clients and is a member of Bombay Stock Exchange (BSE) and National Stock Exchange (NSE).",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-securities",
    },
    {
      id: 5,
      name: "Valyou Retail",
      description:
        "The distinguished eCommerce vertical of Valentina Industries, catering to a discerning clientele by focusing on niche market segments. With an extensive catalog of over 7,000 premium products, we aim to provide a unique and comprehensive shopping experience.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valyou-retail",
    },
    {
      id: 6,
      name: "Valentina FMCG",
      description:
        "A leading and dynamic FMCG company that specializes in the production, distribution, and marketing of a wide range of high-quality consumer products. With a commitment to excellence, innovation, and customer satisfaction.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-fmcg",
    },
    {
      id: 7,
      name: "Magic Of Scissors",
      description:
        "A premier salon chain and academy, proudly operated under Valentina Industries. We are dedicated to delivering cutting-edge hair care, modern skin care, and styling solutions to our clients, blending innovation with luxury.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "magic-of-scissors",
    },
    {
      id: 8,
      name: "Valentina Healthcare",
      description:
        "A leading provider of comprehensive healthcare services dedicated to improving the overall well-being and quality of life for individuals and communities. With a team of highly skilled professionals and state-of-the-art facilities.",
      image: "/placeholder.svg?height=300&width=400",
      slug: "valentina-healthcare",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image src="/placeholder.svg?height=600&width=1200" alt="Our Companies" fill className="object-cover" />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">Our Companies</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Discover our diverse portfolio of businesses spanning multiple industries
          </p>
        </div>
      </section>

      {/* Companies Grid Section */}
      <section className="py-16 md:py-24 bg-gradient-blue">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <ScrollReveal key={company.id} animation="fade-bottom" delay={index * 100}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover-slide-up">
                  <div className="relative h-48 w-full">
                    <Image src={company.image || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                    <p className="text-muted-foreground line-clamp-4">{company.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href={`/companies/${company.slug}`} className="w-full">
                      <Button variant="outline" className="w-full gap-2 gradient-border group">
                        Learn More{" "}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

