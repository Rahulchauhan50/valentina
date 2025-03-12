import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NewsCardProps {
  news: {
    id: number
    title: string
    excerpt: string
    date: string
    image: string
    slug: string
  }
}

export default function NewsCard({ news }: NewsCardProps) {
  // Format date
  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover-slide-up">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{news.title}</h3>
        <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/news/${news.slug}`} className="w-full">
          <Button variant="outline" className="w-full group">
            Read More <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

