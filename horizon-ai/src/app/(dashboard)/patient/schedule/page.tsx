"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  Users,
  Calendar as CalendarIcon,
  Clock,
  Filter,
  Plus
} from "lucide-react"

// Sample appointments data
const appointments = [
  {
    id: 1,
    date: "2025-02-24",
    time: "3:00 PM",
    doctor: "Dr. Sarah Smith",
    type: "Video Session",
    status: "upcoming",
    icon: Video
  },
  {
    id: 2,
    date: "2025-02-27",
    time: "2:30 PM",
    doctor: "Group Therapy",
    type: "Group Session",
    status: "upcoming",
    icon: Users
  },
  {
    id: 3,
    date: "2025-03-03",
    time: "4:00 PM",
    doctor: "Dr. Sarah Smith",
    type: "Video Session",
    status: "upcoming",
    icon: Video
  },
  {
    id: 4,
    date: "2025-02-20",
    time: "3:30 PM",
    doctor: "Dr. Sarah Smith",
    type: "Video Session",
    status: "completed",
    icon: Video
  }
]

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filter, setFilter] = useState("all")

  // Filter appointments based on selected status
  const filteredAppointments = appointments.filter(apt => {
    if (filter === "all") return true
    return apt.status === filter
  })

  // Get the badge color based on appointment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#146C94]">Schedule</h1>
          <p className="text-gray-600 mt-1">Manage your therapy sessions</p>
        </div>
        <Button 
          size="lg"
          className="bg-[#146C94] hover:bg-[#146C94]/90"
          onClick={() => console.log("Book new appointment")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Book Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Appointments List Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Appointments</CardTitle>
              <Select 
                value={filter} 
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-[#146C94]/10 flex items-center justify-center flex-shrink-0">
                    <appointment.icon className="h-6 w-6 text-[#146C94]" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                      <Badge 
                        variant="secondary"
                        className={getStatusBadge(appointment.status)}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <span className="text-[#146C94]">{appointment.type}</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => console.log(`View details for appointment ${appointment.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}