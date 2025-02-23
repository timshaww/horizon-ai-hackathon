// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { initializeFirebaseAdmin } from './utils/firebase/admin'

export async function middleware(request: NextRequest) {
  try {
    const session = request.cookies.get('session')?.value

    // If no session exists, redirect immediately
    if (!session) {
      const response = NextResponse.redirect(new URL('/signin', request.url))
      response.cookies.delete('session') // Clean up any invalid cookies
      return response
    }

    // Initialize Firebase Admin
    const { auth, db } = initializeFirebaseAdmin()
    
    try {
      // Verify session cookie and get user
      const decodedClaim = await auth.verifySessionCookie(session, true)
      
      // Get user's role from Firestore
      const userDoc = await db.collection('users').doc(decodedClaim.uid).get()
      const userData = userDoc.data()
      const userRole = userData?.role

      // Check path and role match
      const isPatientPath = request.nextUrl.pathname.startsWith('/patient')
      const isTherapistPath = request.nextUrl.pathname.startsWith('/therapist')

      if (isPatientPath && userRole !== 'patient') {
        throw new Error('Unauthorized: Patient access only')
      }

      if (isTherapistPath && userRole !== 'therapist') {
        throw new Error('Unauthorized: Therapist access only')
      }

      return NextResponse.next()
    } catch {
      // If session verification fails or role check fails, redirect to sign in
      const response = NextResponse.redirect(new URL('/signin', request.url))
      response.cookies.delete('session')
      return response
    }
  } catch (error) {
    // For any other errors, redirect to sign in
    console.error('Middleware error:', error)
    const response = NextResponse.redirect(new URL('/signin', request.url))
    response.cookies.delete('session')
    return response
  }
}

// Specify which routes to protect
export const config = {
  matcher: ['/patient/:path*', '/therapist/:path*']
}