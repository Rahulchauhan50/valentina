import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"

export default function AboutPage() {
  // Sample leadership team data - in a real app, this would come from the database
  const leadershipTeam = [
    {
      id: 1,
      name: "John Smith",
      position: "Chief Executive Officer",
      bio: "With over 20 years of experience in business management and strategy, John has led Valentina Industries to new heights since joining in 2010.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Chief Financial Officer",
      bio: "Sarah brings 15 years of financial expertise to Valentina Industries, previously working with Fortune 500 companies and leading financial institutions.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Chief Operations Officer",
      bio: "Michael oversees the day-to-day operations of all Valentina companies, ensuring efficiency and excellence across the entire group.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Priya Patel",
      position: "Chief Marketing Officer",
      bio: "With a background in global marketing and brand development, Priya leads all marketing initiatives across the Valentina Group of Companies.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="About Valentina Industries"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            About Valentina Industries
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Learn about our history, mission, and the leadership team driving our success
          </p>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-16 md:py-24 bg-gradient-blue">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <ParallaxSection
              speed={0.05}
              direction="up"
              className="relative h-[400px] overflow-hidden rounded-xl order-2 lg:order-1"
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Valentina Group History"
                fill
                className="object-cover"
              />
            </ParallaxSection>
            <ScrollReveal animation="fade-left" className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6 gradient-text">Our History</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Valentina Group of Companies was founded in 2000 with a vision to create a diverse business
                  conglomerate that would excel across multiple industries. What began as a small enterprise has grown
                  into a dynamic group with interests in security, construction, pharmaceuticals, financial services,
                  and more.
                </p>
                <p>
                  Over the past two decades, Valentina Industries has expanded both organically and through strategic
                  acquisitions, establishing a strong presence in the Indian market and beginning to explore
                  international opportunities.
                </p>
                <p>
                  Throughout our journey, we have remained committed to our founding principles of excellence,
                  innovation, integrity, and social responsibility. These values continue to guide our growth and
                  development as we look toward the future.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 md:py-24 bg-light-teal bg-pattern-lines">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-bottom" delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 gradient-text">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Guided by strong principles and a clear vision for the future
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-left" delay={200}>
              <Card className="bg-white hover-slide-up">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To deliver exceptional products and services across diverse sectors, driving economic growth and
                    making a positive impact in the communities we serve. We are committed to operational excellence,
                    customer satisfaction, and sustainable business practices.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal animation="fade-right" delay={300}>
              <Card className="bg-white hover-slide-up">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be a globally recognized conglomerate known for innovation, quality, and integrity across all our
                    business ventures. We aim to create sustainable value for our stakeholders while contributing to the
                    economic and social development of the regions where we operate.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-gradient-primary text-white">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-bottom" delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Our Core Values</h2>
              <p className="text-lg max-w-3xl mx-auto opacity-90">The principles that guide everything we do</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from the products and services we offer to the way we interact with our stakeholders.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                    <path d="m15 9-6 6"></path>
                    <path d="m9 9 6 6"></path>
                  </svg>
                ),
              },
              {
                title: "Innovation",
                description:
                  "We embrace innovation and continuously seek new ways to improve our offerings and operations to stay ahead in a competitive market.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                    <path d="M8 9h8"></path>
                    <path d="M8 15h8"></path>
                    <path d="M12 9v6"></path>
                  </svg>
                ),
              },
              {
                title: "Integrity",
                description:
                  "We conduct our business with the highest standards of ethics, transparency, and accountability in all our dealings.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                    <path d="M12 8v8"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                ),
              },
              {
                title: "Social Responsibility",
                description:
                  "We are committed to making a positive impact in the communities where we operate and contributing to sustainable development.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                ),
              },
            ].map((value, index) => (
              <ScrollReveal key={index} animation="zoom-in" delay={200 + index * 100}>
                <Card className="bg-white/10 backdrop-blur-sm hover-slide-up border-0">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-white/80">{value.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 md:py-24 bg-light-blue bg-pattern-dots">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 gradient-text">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals guiding Valentina Industries
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <ScrollReveal key={leader.id} animation="fade-bottom" delay={index * 100}>
                <div className="text-center bg-white p-6 rounded-lg shadow-sm hover-slide-up">
                  <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{leader.name}</h3>
                  <p className="text-primary font-medium mb-2">{leader.position}</p>
                  <p className="text-muted-foreground">{leader.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

