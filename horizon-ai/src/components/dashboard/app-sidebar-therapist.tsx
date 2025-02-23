"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...")
  }

  return (
    <Sidebar className="flex flex-col h-screen">
      {/* Logo Section */}
      <SidebarHeader className="px-4 py-6 border-b">
        <Link href="/therapist" className="flex items-center gap-3">
          <img 
            src="/logo/therapyAI-black.png"
            alt="TherapyAI"
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
                <span className="text-sm font-medium text-[#146C94]">Dr. Emily Wilson</span>
                <span className="text-xs text-[#146C94]/70">Clinical Psychologist</span>
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