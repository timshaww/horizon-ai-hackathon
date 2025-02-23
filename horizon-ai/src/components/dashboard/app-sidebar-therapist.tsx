"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'
import { 
  Home,
  Calendar,
  Users,
  ClipboardList,
  Settings,
  UserCircle,
  BellRing,
  LogOut,
  MessageSquare
} from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/app/utils/firebase/config"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const mainNavItems = [
  { 
    title: "Dashboard",
    url: "/therapist",
    icon: Home
  },
  { 
    title: "Schedule",
    url: "/therapist/schedule",
    icon: Calendar,
    badge: "5"
  },
  { 
    title: "Patients",
    url: "/therapist/patients",
    icon: Users,
    badge: "12"
  },
  { 
    title: "Notes",
    url: "/therapist/notes",
    icon: ClipboardList
  },
  { 
    title: "Messages",
    url: "/therapist/messages",
    icon: MessageSquare,
    badge: "3"
  }
]

const settingsNavItems = [
  { 
    title: "Settings",
    url: "/therapist/settings",
    icon: Settings
  },
  { 
    title: "Logout",
    url: "/logout",
    icon: LogOut,
    className: "text-red-600 hover:bg-red-50"
  }
]

export function TherapistSidebar() {
  const pathname = usePathname()
  interface UserProfile {
    first_name: string;
    last_name: string;
    role: string;
  }
  
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, "users", user.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile)
        } else {
          setUserProfile(null)
        }
      } else {
        setUserProfile(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      // First clear the session cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      // Then sign out from Firebase
      await signOut(auth)
      
      // Finally redirect
      window.location.href = '/signin'
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  // Compose full name if userProfile is available
  const fullName = userProfile
    ? `${userProfile.first_name} ${userProfile.last_name}`
    : "Loading..."

  // Capitalize the role if available
  const userRole = userProfile && userProfile.role
    ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)
    : "Therapist"

  return (
    <Sidebar className="flex flex-col h-screen">
      {/* Logo Section */}
      <SidebarHeader className="px-4 py-6 border-b">
        <Link href="/therapist" className="flex items-center gap-3">
          <Image 
            src="/logo/therapyAI-black.png"
            alt="TherapyAI"
            width={1980}
            height={1080}
            className="h-8 w-auto"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col">
        {/* Notification Section */}
        <div className="px-4 py-4 border-b">
          <div className="rounded-lg bg-[#146C94]/5 p-4">
            <div className="flex items-center gap-3 text-[#146C94]">
              <BellRing className="h-5 w-5" />
              <span className="text-sm font-medium">Next Session</span>
            </div>
            <p className="mt-2 text-sm text-[#146C94]/70">
              In 15 minutes with Sarah Johnson
            </p>
          </div>
        </div>

        {/* Main Navigation Section */}
        <SidebarGroup className="flex-1 px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`
                      w-full p-3 rounded-lg transition-colors duration-200
                      ${pathname === item.url 
                        ? 'bg-[#146C94] text-white' 
                        : 'text-[#146C94] hover:bg-[#146C94]/10'}
                    `}
                  >
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="outline"
                          className={`ml-2 ${pathname === item.url 
                            ? 'border-white text-white' 
                            : 'border-[#146C94] text-[#146C94]'}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile and Settings Section */}
        <div className="mt-auto border-t">
          {/* Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 rounded-lg hover:bg-[#146C94]/5 p-3 cursor-pointer transition-colors duration-200">
              <div className="h-10 w-10 rounded-full bg-[#146C94]/10 flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-[#146C94]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#146C94]">
                  {fullName}
                </span>
                <span className="text-xs text-[#146C94]/70">
                  {userRole}
                </span>
              </div>
            </div>
          </div>

          {/* Settings and Logout Section */}
          <div className="p-2">
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`
                      w-full p-3 rounded-lg transition-colors duration-200
                      ${item.className || (pathname === item.url 
                        ? 'bg-[#146C94] text-white' 
                        : 'text-[#146C94] hover:bg-[#146C94]/10')}
                    `}
                  >
                    {item.url === '/logout' ? (
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
