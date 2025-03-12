"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Key, MoreHorizontal, Trash, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  // Sample users data - in a real app, this would come from the database
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@valentinaindustries.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-12-15 09:30 AM",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@valentinaindustries.com",
      role: "Finance Manager",
      status: "Active",
      lastLogin: "2023-12-14 02:15 PM",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@valentinaindustries.com",
      role: "Content Manager",
      status: "Active",
      lastLogin: "2023-12-13 11:45 AM",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@valentinaindustries.com",
      role: "Support Staff",
      status: "Active",
      lastLogin: "2023-12-12 10:20 AM",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@valentinaindustries.com",
      role: "Finance Manager",
      status: "Inactive",
      lastLogin: "2023-11-30 03:45 PM",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "jennifer.lee@valentinaindustries.com",
      role: "Content Manager",
      status: "Active",
      lastLogin: "2023-12-10 09:15 AM",
    },
  ])

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the user
    setUsers(users.filter((user) => user.id !== id))

    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    })
  }

  // Filter users based on search term and selected role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole

    return matchesSearch && matchesRole
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Link href="/dashboard/users/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Finance Manager">Finance Manager</SelectItem>
            <SelectItem value="Content Manager">Content Manager</SelectItem>
            <SelectItem value="Support Staff">Support Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
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
                          <Link href={`/dashboard/users/${user.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user.id)}>
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

