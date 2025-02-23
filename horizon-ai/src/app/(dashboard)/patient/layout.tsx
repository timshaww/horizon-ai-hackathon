// app/patient/layout.tsx
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/dashboard/app-sidebar-user";
import { redirect } from 'next/navigation';
import { auth, db } from '@/app/utils/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const inter = Inter({ subsets: ["latin"] });

// Check if user has patient role
async function checkUserRole(userId: string) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    
    if (userData?.role !== 'patient') {
      redirect('/therapist'); // Redirect to therapist dashboard if user is a therapist
    }

    return userData;
  } catch (error) {
    console.error('Role check failed:', error);
    redirect('/signin');
  }
}

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    // Set up auth state observer
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (!user) {
          redirect('/signin');
        }
        resolve(user);
      });
    });
  }

  // Check user role before rendering
  await checkUserRole(currentUser?.uid || '');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <PatientSidebar />
          <SidebarTrigger className="ml-3 mt-3" />
          <main className="flex-1 overflow-auto p-8 pt-16">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}