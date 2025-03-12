import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-subtle-gradient-primary border-t border-primary/20">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Valentina Industries Logo" width={32} height={32} />
              <span className="text-lg font-bold">Valentina Industries</span>
            </div>
            <p className="text-white/80">
              A dynamic and diverse conglomerate known for its extensive portfolio of businesses across various sectors.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-white/70 hover:text-white transition-colors">
                  Our Companies
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/70 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/70 hover:text-white transition-colors">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Companies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Companies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/companies/phoenix-security" className="text-white/70 hover:text-white transition-colors">
                  Phoenix Security
                </Link>
              </li>
              <li>
                <Link
                  href="/companies/santosh-bandai-construction"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Santosh Bandai Construction
                </Link>
              </li>
              <li>
                <Link href="/companies/valentina-pharma" className="text-white/70 hover:text-white transition-colors">
                  Valentina Pharma
                </Link>
              </li>
              <li>
                <Link
                  href="/companies/valentina-securities"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Valentina Securities
                </Link>
              </li>
              <li>
                <Link href="/companies/magic-of-scissors" className="text-white/70 hover:text-white transition-colors">
                  Magic Of Scissors
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-white/70 hover:text-white transition-colors">
                  View All Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-white/70 space-y-2">
              <p>Success Square, Office No 301, 3rd Floor</p>
              <p>Karve Statue Chowk, Karve Road</p>
              <p>Pune, Maharashtra, 411038</p>
              <p className="pt-2">
                <strong>Phone:</strong> 020-29991950
              </p>
              <p>
                <strong>Mobile:</strong> 9970875720 / 9970875724
              </p>
              <p>
                <strong>Email:</strong> info@valentinaindustries.in
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Valentina Industries. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

