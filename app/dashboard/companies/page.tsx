"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function CompaniesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample companies data - in a real app, this would come from the database
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Phoenix Security",
      description: "Cautious Security and Excellent Service",
      image: "/placeholder.svg?height=40&width=40",
      slug: "phoenix-security",
      status: "Active",
    },
    {
      id: 2,
      name: "Santosh Bandai Construction",
      description: "Leading real estate company specializing in high-quality residential communities",
      image: "/placeholder.svg?height=40&width=40",
      slug: "santosh-bandai-construction",
      status: "Active",
    },
    {
      id: 3,
      name: "Valentina Pharma",
      description: "Leading pharmaceutical marketing company dedicated to helping clients thrive",
      image: "/placeholder.svg?height=40&width=40",
      slug: "valentina-pharma",
      status: "Active",
    },
    {
      id: 4,
      name: "Valentina Securities",
      description: "Financial Services Corporate engaged in Stock Broking and Trading",
      image: "/placeholder.svg?height=40&width=40",
      slug: "valentina-securities",
      status: "Active",
    },
    {
      id: 5,
      name: "Valyou Retail",
      description: "Distinguished eCommerce vertical of Valentina Industries",
      image: "/placeholder.svg?height=40&width=40",
      slug: "valyou-retail",
      status: "Active",
    },
    {
      id: 6,
      name: "Valentina FMCG",
      description: "Leading and dynamic FMCG company specializing in consumer products",
      image: "/placeholder.svg?height=40&width=40",
      slug: "valentina-fmcg",
      status: "Active",
    },
    {
      id: 7,
      name: "Magic Of Scissors",
      description: "Premier salon chain and academy for beauty and styling",
      image: "/placeholder.svg?height=40&width=40",
      slug: "magic-of-scissors",
      status: "Active",
    },
    {
      id: 8,
      name: "Valentina Healthcare",
      description: "Comprehensive healthcare services for individuals and communities",
      image: "/placeholder.svg?height=40&width=40",
      slug: "valentina-healthcare",
      status: "Active",
    },
  ])

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the company
    setCompanies(companies.filter((company) => company.id !== id))

    toast({
      title: "Company Deleted",
      description: "The company has been successfully deleted.",
    })
  }

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        <Link href="/dashboard/companies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search companies..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Image
                      src={company.image || "/placeholder.svg"}
                      alt={company.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="line-clamp-1">{company.description}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {company.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/companies/${company.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(company.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

