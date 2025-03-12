import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CompanyCardProps {
  company: {
    id: number
    name: string
    description: string
    image: string
    slug: string
  }
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover-slide-up">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={company.image || "/placeholder.svg"}
          alt={company.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{company.name}</h3>
        <p className="text-muted-foreground line-clamp-3">{company.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/companies/${company.slug}`} className="w-full">
          <Button variant="outline" className="w-full gap-2 group">
            Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

