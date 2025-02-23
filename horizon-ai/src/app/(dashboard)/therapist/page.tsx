"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Clock,
  Users,
  ClipboardList,
  Plus,
  ArrowRight,
  UserCircle,
  BellRing,
  MessageSquare
} from "lucide-react"

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

// Sample data for today's schedule
const todaysSchedule = [
  {
    time: "10:00 AM",
    patient: "Sarah Johnson",
    type: "Video Session",
    status: "Completed"
  },
  {
    time: "2:00 PM",
    patient: "Michael Chen",
    type: "In-Person",
    status: "Upcoming"
  },
  {
    time: "4:30 PM",
    patient: "Emily Brown",
    type: "Video Session",
    status: "Upcoming"
  }
]

export default function TherapistDashboard() {
  const [greeting, setGreeting] = useState("")

  // Update greeting
  useEffect(() => {
    setGreeting(getGreeting())
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
          {greeting}, Dr. Wilson
        </h1>
        <p className="text-gray-600 mt-2">
          You have 3 sessions scheduled for today
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#146C94]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-[#146C94] mb-2" />
              <p className="text-2xl font-bold text-[#146C94]">12</p>
              <p className="text-sm text-[#146C94]/70">Total Patients</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#146C94]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 text-[#146C94] mb-2" />
              <p className="text-2xl font-bold text-[#146C94]">5</p>
              <p className="text-sm text-[#146C94]/70">Today&apos;s Sessions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#146C94]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <MessageSquare className="h-8 w-8 text-[#146C94] mb-2" />
              <p className="text-2xl font-bold text-[#146C94]">3</p>
              <p className="text-sm text-[#146C94]/70">Unread Messages</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#146C94]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <ClipboardList className="h-8 w-8 text-[#146C94] mb-2" />
              <p className="text-2xl font-bold text-[#146C94]">8</p>
              <p className="text-sm text-[#146C94]/70">Pending Notes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Add new patient")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Create session notes")}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Create Session Notes
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Button 
              className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
              onClick={() => console.log("Schedule session")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule and Patient Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#146C94]" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysSchedule.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-8 w-8 text-[#146C94]" />
                    <div>
                      <p className="font-medium">{session.patient}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                        <span>•</span>
                        <span>{session.type}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    session.status === "Completed" 
                      ? "text-green-600" 
                      : "text-blue-600"
                  }`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patient Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#146C94]" />
              Recent Patient Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Sarah Johnson</p>
                  <span className="text-sm text-gray-500">Today, 10:00 AM</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Made significant progress in anxiety management. Discussed new coping strategies and set goals for next week.
                </p>
                <Button 
                  variant="outline" 
                  className="text-[#146C94] hover:bg-[#146C94]/10 w-full"
                  onClick={() => console.log("View full notes")}
                >
                  View Full Notes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="w-full bg-[#146C94] hover:bg-[#146C94]/90"
                onClick={() => console.log("View all notes")}
              >
                View All Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="bg-[#146C94]/5 border-none">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <BellRing className="h-5 w-5 text-[#146C94]" />
            <h3 className="font-semibold text-[#146C94]">Important Reminders</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#146C94]/70">
            <li>• Patient assessment reports due for Michael Chen and Emily Brown</li>
            <li>• Weekly team meeting tomorrow at 9:00 AM</li>
            <li>• Update treatment plans for 3 patients</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}