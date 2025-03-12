"use client"

import { useState } from "react"
import { Download, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FinancesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Sample financial data - in a real app, this would come from the database
  const financialData = [
    {
      id: 1,
      company: "Phoenix Security",
      year: "2023",
      quarter: "Q4",
      revenue: "₹2,500,000",
      expenses: "₹1,800,000",
      profit: "₹700,000",
      date: "2023-12-31",
    },
    {
      id: 2,
      company: "Santosh Bandai Construction",
      year: "2023",
      quarter: "Q4",
      revenue: "₹4,200,000",
      expenses: "₹3,100,000",
      profit: "₹1,100,000",
      date: "2023-12-31",
    },
    {
      id: 3,
      company: "Valentina Pharma",
      year: "2023",
      quarter: "Q4",
      revenue: "₹3,800,000",
      expenses: "₹2,500,000",
      profit: "₹1,300,000",
      date: "2023-12-31",
    },
    {
      id: 4,
      company: "Phoenix Security",
      year: "2023",
      quarter: "Q3",
      revenue: "₹2,300,000",
      expenses: "₹1,700,000",
      profit: "₹600,000",
      date: "2023-09-30",
    },
    {
      id: 5,
      company: "Santosh Bandai Construction",
      year: "2023",
      quarter: "Q3",
      revenue: "₹3,900,000",
      expenses: "₹2,800,000",
      profit: "₹1,100,000",
      date: "2023-09-30",
    },
    {
      id: 6,
      company: "Valentina Pharma",
      year: "2023",
      quarter: "Q3",
      revenue: "₹3,500,000",
      expenses: "₹2,300,000",
      profit: "₹1,200,000",
      date: "2023-09-30",
    },
    {
      id: 7,
      company: "Phoenix Security",
      year: "2022",
      quarter: "Q4",
      revenue: "₹2,100,000",
      expenses: "₹1,600,000",
      profit: "₹500,000",
      date: "2022-12-31",
    },
    {
      id: 8,
      company: "Santosh Bandai Construction",
      year: "2022",
      quarter: "Q4",
      revenue: "₹3,700,000",
      expenses: "₹2,700,000",
      profit: "₹1,000,000",
      date: "2022-12-31",
    },
  ]

  // Filter data based on search term, selected company, and selected year
  const filteredData = financialData.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.quarter.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCompany = selectedCompany === "all" || item.company === selectedCompany
    const matchesYear = selectedYear === "all" || item.year === selectedYear

    return matchesSearch && matchesCompany && matchesYear
  })

  // Calculate totals for the filtered data
  const totalRevenue = filteredData.reduce((sum, item) => {
    const revenue = Number.parseFloat(item.revenue.replace(/[₹,]/g, ""))
    return sum + revenue
  }, 0)

  const totalExpenses = filteredData.reduce((sum, item) => {
    const expenses = Number.parseFloat(item.expenses.replace(/[₹,]/g, ""))
    return sum + expenses
  }, 0)

  const totalProfit = filteredData.reduce((sum, item) => {
    const profit = Number.parseFloat(item.profit.replace(/[₹,]/g, ""))
    return sum + profit
  }, 0)

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Financial Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">For selected filters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">For selected filters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
            <p className="text-xs text-muted-foreground">For selected filters</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="Phoenix Security">Phoenix Security</SelectItem>
              <SelectItem value="Santosh Bandai Construction">Santosh Bandai Construction</SelectItem>
              <SelectItem value="Valentina Pharma">Valentina Pharma</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Quarter</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Expenses</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No financial records found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.company}</TableCell>
                  <TableCell>{record.year}</TableCell>
                  <TableCell>{record.quarter}</TableCell>
                  <TableCell className="text-right">{record.revenue}</TableCell>
                  <TableCell className="text-right">{record.expenses}</TableCell>
                  <TableCell className="text-right">{record.profit}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

