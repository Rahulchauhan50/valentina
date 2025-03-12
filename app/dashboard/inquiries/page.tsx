"use client"

import { useState } from "react"
import { Archive, Check, Eye, MoreHorizontal, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function InquiriesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Sample inquiries data - in a real app, this would come from the database
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      subject: "Partnership Opportunity",
      message:
        "I would like to discuss a potential partnership with Valentina Industries in the pharmaceutical sector...",
      date: "2023-12-15 14:30",
      status: "New",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      subject: "Job Application",
      message: "I am interested in applying for the Marketing Manager position at Valentina Pharma...",
      date: "2023-12-14 10:15",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      subject: "Product Inquiry",
      message: "I would like to know more about the security services offered by Phoenix Security...",
      date: "2023-12-13 16:45",
      status: "Resolved",
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha.singh@example.com",
      subject: "Investment Opportunities",
      message: "I am interested in learning more about investment opportunities with Valentina Securities...",
      date: "2023-12-12 09:30",
      status: "New",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      subject: "Construction Project",
      message: "I would like to discuss a potential residential project with Santosh Bandai Construction...",
      date: "2023-12-10 11:20",
      status: "In Progress",
    },
    {
      id: 6,
      name: "Ananya Reddy",
      email: "ananya.reddy@example.com",
      subject: "Feedback",
      message: "I wanted to share my positive experience with your Magic Of Scissors salon services...",
      date: "2023-12-08 15:10",
      status: "Resolved",
    },
  ])

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the inquiry
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))

    toast({
      title: "Inquiry Deleted",
      description: "The inquiry has been successfully deleted.",
    })
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    // In a real app, this would make an API call to update the inquiry status
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry)))

    toast({
      title: "Status Updated",
      description: `The inquiry status has been updated to ${newStatus}.`,
    })
  }

  // Filter inquiries based on search term and selected status
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || inquiry.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Client Inquiries</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inquiries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No inquiries found
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <div className="font-medium">{inquiry.name}</div>
                    <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-1">{inquiry.subject}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{inquiry.message}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{inquiry.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        inquiry.status === "New"
                          ? "bg-blue-100 text-blue-800"
                          : inquiry.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {inquiry.status !== "In Progress" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "In Progress")}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as In Progress
                          </DropdownMenuItem>
                        )}
                        {inquiry.status !== "Resolved" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "Resolved")}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(inquiry.id)}>
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

