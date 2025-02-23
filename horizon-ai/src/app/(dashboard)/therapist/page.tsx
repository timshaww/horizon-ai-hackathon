"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc 
} from "firebase/firestore"
import { auth } from "@/app/utils/firebase/config"

// Define an interface for a user profile
interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  role: "therapist" | "patient";
}

// Define a proper interface for a session document
export interface Session {
  id: string;
  sessionDate: Date;       // Full date and time of the session
  therapist: string;       // Therapist's name (e.g., "Dr. Mom")
  therapistId: string;
  summary: string;
  detailedNotes?: string;  // Optional detailed notes
  keyPoints: string[];
  insights: string[];
  mood: string;
  progress: string;        // E.g., "Upcoming", "Completed", etc.
  goals: string[];
  warnings: string[];
  transcript: string;
  journalingPrompt: string;
  journalingResponse: string;
  patientId: string;
  status: string;
  patientName?: string;    // The patient's first and last name
}

export default function TherapistDashboard() {
  const [todaySchedule, setTodaySchedule] = useState<Session[]>([])
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [greeting, setGreeting] = useState<string>("")
  const [therapistProfile, setTherapistProfile] = useState<UserProfile | null>(null)

  // Helper function to compute greeting based on time of day
  const getGreeting = (): string => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  // Update greeting every minute
  useEffect(() => {
    setGreeting(getGreeting())
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch therapist profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        const db = getFirestore()
        const userDocRef = doc(db, "users", currentUser.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          setTherapistProfile(userDocSnap.data() as UserProfile)
        }
      }
    }
    fetchProfile()
  }, [])

  // Fetch today's schedule from Firestore for the logged-in therapist
  useEffect(() => {
    const fetchTodaySchedule = async () => {
      try {
        const currentUser = auth.currentUser
        if (!currentUser) {
          setLoadingSchedule(false)
          return
        }
        const db = getFirestore()
        const sessionsRef = collection(db, "sessions")
        // Compute the start and end of today
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
        // Query sessions where therapistId equals currentUser.uid and sessionDate is between start and end of today
        const q = query(
          sessionsRef,
          where("therapistId", "==", currentUser.uid),
          where("sessionDate", ">=", startOfToday),
          where("sessionDate", "<", endOfToday)
        )
        const querySnapshot = await getDocs(q)
        let schedule: Session[] = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            sessionDate: data.sessionDate.toDate(),
            therapist: data.therapist,
            therapistId: data.therapistId,
            summary: data.summary,
            detailedNotes: data.detailedNotes || "",
            keyPoints: data.keyPoints || [],
            insights: data.insights || [],
            mood: data.mood || "",
            progress: data.progress || "",
            goals: data.goals || [],
            warnings: data.warnings || [],
            transcript: data.transcript || "",
            journalingPrompt: data.journalingPrompt || "",
            journalingResponse: data.journalingResponse || "",
            patientId: data.patientId,
            status: data.status || "",
          }
        })
        
        // For each session, fetch the patient's user document and update patientName
        const scheduleWithPatientNames = await Promise.all(
          schedule.map(async (session) => {
            try {
              const patientRef = doc(db, "users", session.patientId)
              const patientSnap = await getDoc(patientRef)
              if (patientSnap.exists()) {
                const patientData = patientSnap.data()
                return {
                  ...session,
                  patientName: `${patientData.first_name} ${patientData.last_name}`
                }
              }
            } catch (error) {
              console.error("Error fetching patient data:", error)
            }
            return { ...session, patientName: session.patientId }
          })
        )

        // Sort schedule items by time ascending
        scheduleWithPatientNames.sort((a, b) => a.sessionDate.getTime() - b.sessionDate.getTime())
        setTodaySchedule(scheduleWithPatientNames)
      } catch (error) {
        console.error("Error fetching today's schedule:", error)
      } finally {
        setLoadingSchedule(false)
      }
    }

    fetchTodaySchedule()
  }, [])

  if (loadingSchedule) {
    return <div className="p-6 max-w-6xl mx-auto">Loading today's schedule...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#146C94]">
          {greeting}, Dr. {therapistProfile ? therapistProfile.last_name : "Loading..."} Welcome!
        </h1>
        <p className="text-gray-600 mt-2">
          You have {todaySchedule.length} session{todaySchedule.length !== 1 && "s"} scheduled for today
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
              <p className="text-2xl font-bold text-[#146C94]">{todaySchedule.length}</p>
              <p className="text-sm text-[#146C94]/70">Today's Sessions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#146C94]" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaySchedule.length === 0 ? (
            <p className="text-gray-600">No sessions scheduled for today.</p>
          ) : (
            <div className="space-y-4">
              {todaySchedule.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-8 w-8 text-[#146C94]" />
                    <div>
                      <p className="font-medium">{session.patientName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>
                          {session.sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span>{session.status}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    session.progress === "Completed" 
                      ? "text-green-600" 
                      : "text-blue-600"
                  }`}>
                    {session.progress}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional sections (e.g., Recent Patient Notes, Notifications) remain unchanged */}
    </div>
  )
}
