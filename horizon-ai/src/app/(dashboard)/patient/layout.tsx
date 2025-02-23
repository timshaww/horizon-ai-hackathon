
// app/patient/layout.tsx
import { Inter } from "next/font/google";
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/dashboard/app-sidebar-user";
import { auth, db } from '@/app/utils/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

// Check user authentication and role
async function checkAuth() {
  const sessionCookie = cookies().get('__session');
  
  if (!sessionCookie?.value) {
    redirect('/signin');
  }

  try {
    const userDocRef = doc(db, 'users', auth.currentUser?.uid || '');
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      redirect('/signin');
    }

    const userData = userDoc.data();
    
    if (userData?.role !== 'patient') {
      redirect('/therapist');
    }

    return userData;
  } catch (error) {
    console.error('Auth check failed:', error);
    redirect('/signin');
  }
}

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth();

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
