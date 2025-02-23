"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Clock,
  BookOpen,
  MessageSquare,
  Plus,
  ArrowRight,
  CalendarDays
} from "lucide-react"
import { useRouter } from "next/router"

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

// Sample quotes for motivation
const quotes = [
  {
    text: "Every day is a new beginning. Take a deep breath and start again.",
    author: "Unknown"
  },
  {
    text: "You are stronger than you know, braver than you believe, and more capable than you can imagine.",
    author: "Unknown"
  },
  {
    text: "Progress is progress, no matter how small.",
    author: "Unknown"
  }
]

export default function PatientDashboard() {
  const [greeting, setGreeting] = useState("")
  const [quote, setQuote] = useState(quotes[0])

  // Update greeting and quote
  useEffect(() => {
    setGreeting(getGreeting())
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)

    // Update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#146C94]">
          {greeting}, John
        </h1>
        <p className="text-gray-600 mt-2">
          We&apos;re here to support your journey to better mental health
        </p>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Schedule appointment")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Start journal entry")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              New Journal Entry
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Message therapist")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Therapist
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Next Session Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#146C94]" />
              Next Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span>Thursday, Feb 24, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>3:00 PM</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                With Dr. Sarah Smith - Video Session
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Last Session Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#146C94]" />
              Last Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                We discussed strategies for managing work-related stress and set goals for the upcoming week.
              </p>
              <Button 
                variant="outline" 
                className="text-[#146C94] hover:bg-[#146C94]/10"
                onClick={() => console.log("View full summary")}
              >
                View Full Summary
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote */}
      <Card className="bg-[#146C94]/5 border-none">
        <CardContent className="pt-6">
          <blockquote className="space-y-2">
            <p className="text-lg text-[#146C94]">&quot;{quote.text}&quot;</p>
            <footer className="text-sm text-[#146C94]/70">
              - {quote.author}
            </footer>
          </blockquote>
        </CardContent>
      </Card>
    </div>
  )
}