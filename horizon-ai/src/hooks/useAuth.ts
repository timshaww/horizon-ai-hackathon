// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/app/utils/firebase/config'

export function useAuth(requiredRole?: 'patient' | 'therapist') {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<unknown>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)
        
        // Subscribe to user document to get role
        const unsubscribeDoc = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          const userData = doc.data()
          setRole(userData?.role || null)
          setIsLoading(false)

          // Redirect if role doesn't match required role
          if (requiredRole && userData?.role !== requiredRole) {
            router.push(`/signin`)
          }
        })

        return () => unsubscribeDoc()
      } else {
        // User is signed out
        setUser(null)
        setRole(null)
        setIsLoading(false)
        if (requiredRole) {
          router.push(`/signin`)
        }
      }
    })

    return () => unsubscribeAuth()
  }, [router, requiredRole])

  return { user, role, isLoading }
}