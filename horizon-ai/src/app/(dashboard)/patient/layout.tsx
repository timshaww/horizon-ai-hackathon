import { Inter } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/dashboard/app-sidebar-user"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Minimal Docs Site",
  description: "A gorgeous minimal documentation site using Next.js App Router",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <div className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <PatientSidebar />
          <SidebarTrigger className="ml-3 mt-3" />
          <div className="flex-1 overflow-auto p-8 pt-16">{children}</div>
        </SidebarProvider>
      </div>
    
  )
}

