"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  User,
  MessageSquare,
  Lightbulb,
  Heart,
  Target,
  AlertCircle,
} from "lucide-react"
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { auth } from "@/app/utils/firebase/config"

// Define interfaces
interface Session {
  id: string;
  sessionDate: Date;
  therapistId: string;
  summary: string;
  detailedNotes?: string;
  keyPoints: string[];
  insights: string[];
  mood: string;
  progress: string;
  goals: string[];
  warnings: string[];
  transcript: string;
  journalingPrompt: string;
  journalingResponse: string;
  patientId: string;
  status: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
}

export default function TherapistPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch patients and sessions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser
        if (!currentUser) {
          setLoading(false)
          return
        }
        const db = getFirestore()
        const therapistId = currentUser.uid

        // Fetch all sessions where the therapistId matches
        const sessionsRef = collection(db, "sessions")
        const q = query(sessionsRef, where("therapistId", "==", therapistId))
        const querySnapshot = await getDocs(q)

        // Collect unique patient IDs
        const patientIds = new Set<string>()
        const allSessions: Session[] = querySnapshot.docs.map(doc => {
          const data = doc.data()
          patientIds.add(data.patientId)
          return {
            id: doc.id,
            sessionDate: data.sessionDate.toDate(),
            therapistId: data.therapistId,
            summary: data.summary || "No summary available",
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

        // Fetch patient details
        const fetchedPatients: Patient[] = await Promise.all(
          Array.from(patientIds).map(async (patientId) => {
            const patientRef = doc(db, "users", patientId)
            const patientSnap = await getDoc(patientRef)
            if (patientSnap.exists()) {
              const data = patientSnap.data()
              return {
                id: patientId,
                first_name: data.first_name || "Unknown",
                last_name: data.last_name || "Patient",
              }
            }
            return { id: patientId, first_name: "Unknown", last_name: "Patient" }
          })
        )

        setPatients(fetchedPatients)
        setSessions(allSessions)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter sessions for the selected patient
  const patientSessions = sessions.filter(session => session.patientId === selectedPatientId)

  if (loading) {
    return <div className="p-6 max-w-6xl mx-auto">Loading patients...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#146C94]">
          {selectedPatientId ? "Patient Sessions" : "My Patients"}
        </h1>
        <p className="text-gray-600 mt-1">
          {selectedPatientId ? "View session history with this patient" : "Manage your patient list and session history"}
        </p>
      </div>

      {selectedPatientId ? (
        // Patient Sessions View
        <>
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => setSelectedPatientId(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Sessions with {patients.find(p => p.id === selectedPatientId)?.first_name} {patients.find(p => p.id === selectedPatientId)?.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patientSessions.length === 0 ? (
                <p className="text-gray-600">No sessions found for this patient.</p>
              ) : (
                <div className="space-y-4">
                  {patientSessions.map((session) => (
                    <Link key={session.id} href={`/therapist/patients/${session.id}`} className="block">
                      <div className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{session.sessionDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[#146C94]">
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{session.summary}</p>
                        <div className="flex items-center justify-end mt-4 text-[#146C94] font-medium">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        // Patients List View
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Patients</CardTitle>
          </CardHeader>
          <CardContent>
            {patients.length === 0 ? (
              <p className="text-gray-600">No patients found.</p>
            ) : (
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedPatientId(patient.id)}
                  >
                    <div className="h-12 w-12 rounded-full bg-[#146C94]/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-[#146C94]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">
                        {patient.first_name} {patient.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {sessions.filter(s => s.patientId === patient.id).length} sessions
                      </p>
                    </div>
                    <div className="flex items-center text-[#146C94] font-medium">
                      View Sessions
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Session Detail Component (Nested Route)
export function TherapistSessionDetailPage() {
  const router = useRouter()
  const { sessionId } = useParams() as { sessionId: string }
  const [sessionData, setSessionData] = useState<Session | null>(null)
  const [patientName, setPatientName] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }
      try {
        const db = getFirestore()
        const sessionRef = doc(db, "sessions", sessionId)
        const sessionSnap = await getDoc(sessionRef)
        if (sessionSnap.exists()) {
          const data = sessionSnap.data()
          let fetchedSession: Session = {
            id: sessionSnap.id,
            sessionDate: data.sessionDate.toDate(),
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

          // Fetch patient name
          const patientRef = doc(db, "users", fetchedSession.patientId)
          const patientSnap = await getDoc(patientRef)
          if (patientSnap.exists()) {
            const patientData = patientSnap.data()
            setPatientName(`${patientData.first_name} ${patientData.last_name}`)
          }

          setSessionData(fetchedSession)
        } else {
          console.error("Session not found.")
        }
      } catch (error) {
        console.error("Error fetching session details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessionDetails()
  }, [sessionId])

  if (loading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading session details...</div>
  }

  if (!sessionData) {
    return <div className="p-6 max-w-4xl mx-auto">Session not found or you are not authorized to view it.</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Navigation Header */}
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient Sessions
        </Button>
        <h1 className="text-3xl font-bold text-[#146C94]">Session Details</h1>
        <p className="text-gray-600 mt-1">Complete summary and insights from the session with {patientName}</p>
      </div>

      {/* Session Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{sessionData.sessionDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{sessionData.sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <span>with {patientName}</span>
            </div>
            <Badge variant="outline" className="text-[#146C94]">
              {sessionData.progress}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Summary and Notes */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#146C94]" />
                Session Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-line">{sessionData.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#146C94]" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionData.insights.map((insight, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <ChevronRight className="h-4 w-4 text-[#146C94]" />
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Progress and Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#146C94]" />
                Emotional State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{sessionData.mood}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-[#146C94]" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionData.goals.map((goal, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="text-[#146C94]">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#146C94]" />
                Points to Watch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionData.warnings.map((warning, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="text-[#146C94]">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}