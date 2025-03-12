import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface CompanyPageProps {
  params: {
    slug: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  // In a real application, this data would come from a database
  const companies = {
    "phoenix-security": {
      name: "Phoenix Security",
      fullName: "Phoenix Security and Facility Services",
      description: "Cautious Security and Excellent Service",
      content: `
        <p>We have the pleasure in introducing ourselves as "Phoenix Security and Facility Services" an ISO 9001:2015 certified company which is a part of Malai Industries, to you. We intend to provide high standard services to our impending customers. We owe to maintain a good record of professional services with our customers.</p>
        
        <p>We aim ourselves to have many prestigious organizations from Governmental, Commercial, Industrial, Residential and Banking Sectors with due dedication, hard work and practical strategic approach. Depending upon the threat perception, we endeavor to visualize the likely security related problems that may arise in course of our operation whether under present day surrounding or in near future.</p>
        
        <h3>Security Force</h3>
        
        <p>Phoenix Security and Facility Services takes care of entire security requirements and growing expectations of our customers, keeping in view a security premises and assets. We provide smartly uniformed, trained and well supervised security staff right from Security officer, Security Supervisor, Head Guard, Security Guard and Gunman, who are responsible for Security and Safety of assets.</p>
        
        <p>We conduct "IN-HOUSE" as well as "ON JOB" training for our Security Personnel by our Training Team Members and Field Management. The training subjects normally covered are as given below:</p>
        
        <ul>
          <li>Awareness on Electronic System, Machines and Equipments</li>
          <li>Motivation and Man - Management</li>
          <li>Telephone Manners</li>
          <li>Communication Skill</li>
          <li>Security Vigilance</li>
          <li>Investigation</li>
          <li>First Aid</li>
        </ul>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "santosh-bandai-construction": {
      name: "Santosh Bandai Construction",
      fullName: "Santosh Bandai Construction LLP",
      description: "Leading real estate company specializing in high-quality residential communities",
      content: `
        <p>Santosh Bandai Construction LLP is a leading real estate company specializing in the development of high-quality residential communities. With a strong commitment to excellence and a passion for creating vibrant neighbourhoods, we have established ourselves as a trusted name in the housing industry.</p>
        
        <p>At Santosh Bandai Construction, we believe that a home is more than just a building; it is a place where dreams are nurtured and memories are made. With this philosophy in mind, we strive to create exceptional living spaces that cater to the diverse needs and preferences of our valued customers.</p>
        
        <p>Our team of experienced architects, engineers and designers work tirelessly to craft innovative and sustainable housing solutions. From concept to completion, every project undergoes meticulous planning and attention to detail, ensuring that our developments are aesthetically pleasing, functional, and built to withstand the test of time.</p>
        
        <p>We take pride in our commitment to quality craftsmanship and our use of premium materials, resulting in homes that are not only visually appealing but also durable and energy-efficient. Our housing developments are designed to promote a harmonious blend of comfort, convenience and contemporary design, providing residents with a truly enriching living experience.</p>
        
        <p>As a socially responsible company, we also prioritize sustainability and environmental stewardship in all our projects. Our goal is to minimize the ecological footprint of our developments by implementing eco-friendly practices, utilizing renewable energy sources and integrating green technologies wherever possible.</p>
        
        <p>With a proven track record of delivering exceptional housing projects, Santosh Bandai Construction has earned the trust and satisfaction of numerous homeowners. Our commitment to customer satisfaction extends beyond the completion of a project; we strive to provide exemplary after-sales service and support to ensure that every homeowner is happy and content in their new surroundings.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "valentina-pharma": {
      name: "Valentina Pharma",
      fullName: "Valentina Pharmaceutical Marketing",
      description: "Leading pharmaceutical marketing company dedicated to helping clients thrive",
      content: `
        <p>At Valentina Pharma, we are a leading pharmaceutical marketing company dedicated to helping our clients thrive in the ever-evolving healthcare industry. With a deep understanding of the pharmaceutical landscape and a passion for innovation, we provide comprehensive marketing solutions tailored to meet the unique needs of each client.</p>
        
        <p>Our team at Valentina Pharma consists of highly skilled professionals with extensive experience in pharmaceutical marketing. From market research and analysis to strategic planning and execution, we are committed to delivering exceptional results and driving growth for our clients.</p>
        
        <p>We believe that effective marketing is about more than just promoting products; it's about fostering meaningful connections and building trust with healthcare providers and patients alike. Our approach revolves around leveraging cutting-edge technology, consumer insights and regulatory expertise to create impactful campaigns that resonate with target audiences.</p>
        
        <p>At Valentina Pharma, we understand the importance of compliance in the pharmaceutical industry. Therefore, we work closely with our clients to ensure that all marketing activities adhere to the stringent regulations and guidelines set forth by regulatory bodies. Our commitment to ethical marketing practices is unwavering, as we prioritize patient safety, transparency and integrity in everything we do.</p>
        
        <p>With a comprehensive suite of services, we offer end-to-end solutions that encompass brand strategy, digital marketing, product launches, market access and more. Our team stays ahead of industry trends and employs innovative tactics to effectively navigate the complex healthcare landscape, helping our clients stay competitive and achieve their business objectives.</p>
        
        <p>Above all, what sets us apart is our unwavering dedication to client satisfaction. We pride ourselves on building long-term partnerships based on trust, open communication, and mutual success. Our clients can rely on us to deliver results, exceed expectations, and provide the strategic guidance needed to navigate the ever-changing pharmaceutical industry.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "valentina-securities": {
      name: "Valentina Securities",
      fullName: "Valentina Securities",
      description: "Financial Services Corporate engaged in Stock Broking and Trading",
      content: `
        <p>Valentina Securities is a Financial Services Corporate engaged into Stock Broking, Currency Derivatives and Commodity Trading. Valentina Securities has focused for retail stock trading business model, Valentina Securities is committed to provide Real Value for Money to all its clients.</p>
        
        <p>Valentina Securities is venture of valentina industries Ltd and its backed by team who has experience the Bullion Market and Capital Markets as Trader. Valentina Securities is a Financial Services Corporate engaged into Stock Broking, Currency Derivatives and Commodity Trading.</p>
        
        <p>Valentina Securities has focused for retail stock trading business model, Valentina Securities is committed to provide Real Value for Money to all its clients. Valentina Securities Group is a member of Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) and Commodity Segment will be functional very soon.</p>
        
        <p>Valentina Securities is the wealth creation and management vertical of Valentina Industries Ltd. As India is eyeing 6 trillion economy by 2030. We are expecting the investment market to have potential of multi folding growth.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "valyou-retail": {
      name: "Valyou Retail",
      fullName: "Valyou Retail",
      description: "Distinguished eCommerce vertical of Valentina Industries",
      content: `
        <p>Valyou Retail is the distinguished eCommerce vertical of Valentina Industries, catering to a discerning clientele by focusing on niche market segments. With an extensive catalog of over 7,000 premium products, we aim to provide a unique and comprehensive shopping experience that meets the specialized needs and preferences of our customers.</p>
        
        <p>Our product range spans various categories, each carefully curated to ensure the highest standards of quality and innovation. From exclusive fashion items and cutting-edge electronics to bespoke home decor and health and wellness products, Valyou Retail offers an unparalleled selection designed to enhance and enrich your lifestyle.</p>
        
        <p>Valyou Retail stands out in the competitive eCommerce landscape through our commitment to customer satisfaction and our dedication to sourcing products that are not only unique but also sustainable and ethically produced. We partner with trusted brands and artisans, ensuring that every item in our store meets our rigorous standards for excellence.</p>
        
        <p>Our platform is designed with user convenience in mind, featuring a seamless shopping experience from browsing to checkout. We leverage advanced technology to provide personalized recommendations, secure transactions, and efficient delivery services, ensuring that our customers enjoy a hassle-free and enjoyable shopping journey.</p>
        
        <p>At Valyou Retail, we believe in the power of choice and the importance of catering to the distinct tastes of our customers. Our focus on niche markets allows us to offer specialized products that are often hard to find, making us a preferred destination for those seeking something truly special.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "valentina-fmcg": {
      name: "Valentina FMCG",
      fullName: "VALENTINA FMCG Company",
      description: "Leading and dynamic FMCG company specializing in consumer products",
      content: `
        <p>VALENTINA FMCG Company is a leading and dynamic FMCG (Fast-Moving Consumer Goods) company that specializes in the production, distribution, and marketing of a wide range of high-quality consumer products. With a commitment to excellence, innovation, and customer satisfaction, we have established ourselves as a trusted and preferred choice for consumers around the globe.</p>
        
        <h3>Quality Assurance</h3>
        
        <p>Quality is the cornerstone of our operations. We adhere to the highest industry standards and maintain strict quality control processes at every stage of production, from sourcing raw materials to packaging and distribution. Our state-of-the-art manufacturing facilities are equipped with advanced machinery and operated by a team of skilled professionals who are dedicated to delivering products of unmatched quality and consistency.</p>
        
        <h3>Innovation and Sustainability</h3>
        
        <p>We believe in continuous improvement and innovation. Our R&D team is constantly engaged in research, exploring new technologies, and developing innovative formulations to create products that address the evolving needs of our consumers. We are also committed to sustainability and strive to minimize our environmental impact through responsible sourcing, eco-friendly packaging and energy-efficient manufacturing processes.</p>
        
        <h3>Global Presence</h3>
        
        <p>VALENTINA FMCG Company operates on a global scale, reaching customers across diverse markets. Our distribution network spans continents, ensuring that our products are readily available to consumers worldwide. We have built strong partnerships with distributors, retailers and e-commerce platforms, enabling us to efficiently deliver our products and provide outstanding customer service.</p>
        
        <h3>Corporate Social Responsibility</h3>
        
        <p>As a socially responsible company, we actively contribute to the communities in which we operate. We support various philanthropic initiatives, focusing on education, healthcare and environmental conservation. We are committed to making a positive difference in society and promoting sustainable development.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "magic-of-scissors": {
      name: "Magic Of Scissors",
      fullName: "Valentina Magic of Scissors",
      description: "Premier salon chain and academy for beauty and styling",
      content: `
        <p>Valentina Magic of Scissors is a premier salon chain and academy, proudly operated under the esteemed Valentina Industries. We are dedicated to delivering cutting-edge hair care, modern skin care, and styling solutions to our clients. Our mission is to blend innovation with luxury, ensuring each client experiences unparalleled service and exceptional results.</p>
        
        <p>At the heart of Valentina Magic of Scissors is our visionary leader, Mr. Majhar Shaik, an internationally renowned hair stylist. With years of global experience and a keen eye for detail, Mr. Shaik brings a wealth of knowledge and a touch of elegance to every aspect of our operations. His commitment to excellence and passion for the beauty industry inspire our entire team to strive for perfection in everything we do.</p>
        
        <p>Our salons are designed to provide a sanctuary where clients can relax and indulge in a transformative beauty experience. We utilize the latest techniques and state-of-the-art equipment to offer services that range from sophisticated haircuts and styling to advanced skin care treatments. Our skilled professionals are trained to cater to the unique needs of each individual, ensuring personalized and high-quality care.</p>
        
        <p>Beyond our exceptional salon services, Valentina Magic of Scissors is also home to a prestigious academy that focuses on nurturing the next generation of beauty professionals. Our academy offers comprehensive training programs that emphasize both theoretical knowledge and practical skills. Under the expert guidance of Mr. Majhar Shaik and our experienced instructors, students receive a holistic education that prepares them for successful careers in the beauty industry.</p>
        
        <p>At Valentina Magic of Scissors, we believe in the power of beauty to transform lives. We are committed to maintaining the highest standards of quality, innovation, and customer satisfaction. Join us and experience the magic that Valentina Magic of Scissors brings to the world of beauty and style.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
    "valentina-healthcare": {
      name: "Valentina Healthcare",
      fullName: "Valentina HealthCare Solutions",
      description: "Comprehensive healthcare services for individuals and communities",
      content: `
        <p>Valentina HealthCare Solutions is a leading provider of comprehensive healthcare services dedicated to improving the overall well-being and quality of life for individuals and communities. With a team of highly skilled professionals and state-of-the-art facilities, we strive to deliver exceptional healthcare solutions that cater to diverse medical needs.</p>
        
        <p>At Valentina HealthCare Solutions, our mission is to provide accessible, compassionate, and high-quality healthcare services to all individuals, irrespective of their background or socioeconomic status. We are committed to improving health outcomes through innovation, collaboration, and a patient-centric approach.</p>
        
        <p>Our vision is to be a trusted leader in the healthcare industry, known for our unwavering commitment to excellence in patient care and innovation. We aim to continuously adapt and evolve to meet the changing needs of our patients, ensuring they receive the best possible healthcare experience.</p>
        
        <h3>Valentina Diagnostic Centre</h3>
        
        <p>Welcome to Valentina Diagnostic Centre, where your health is our top priority. We are a leading healthcare Facility committed to providing accurate, reliable, and timely diagnostic services. Our state-of-the-art technology and highly skilled team of medical professionals ensure that every patient receives the highest standard of care.</p>
        
        <p>At Valentina Diagnostic Centre, we understand the importance of early detection in managing health conditions. That's why we offer a comprehensive range of diagnostic tests and services, including imaging, lab tests, and specialized screenings. Whether you're seeking routine check-ups or more complex diagnostic evaluations, we are here to support you with compassion and expertise.</p>
        
        <p>Our mission is to make healthcare accessible, efficient, and patient-centered. We strive to create a welcoming environment where you feel comfortable and confident in the care you receive. With a focus on accuracy and patient well-being, we are dedicated to helping you stay healthy and informed.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      logo: "/placeholder.svg?height=200&width=200",
    },
  }

  const company = companies[params.slug]

  if (!company) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image src={company.image || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">{company.fullName}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">{company.description}</p>
        </div>
      </section>

      {/* Company Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex justify-start mb-8">
            <Link href="/companies">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Companies
              </Button>
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16 items-start">
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-center mb-6">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Address:</strong>
                      <br />
                      Success Square, Office No 301, 3rd Floor
                      <br />
                      Karve Statue Chowk, Karve Road
                      <br />
                      Pune, Maharashtra, 411038
                    </p>
                    <p>
                      <strong>Phone:</strong>
                      <br />
                      020-29991950
                    </p>
                    <p>
                      <strong>Email:</strong>
                      <br />
                      info@valentinaindustries.in
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button className="w-full">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: company.content }} />
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

