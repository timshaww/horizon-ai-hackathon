// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Define protected routes and their allowed roles
const PROTECTED_ROUTES = {
  '/patient': ['patient'],
  '/patient/settings': ['patient'],
  '/patient/chat': ['patient'],
  '/patient/appointments': ['patient'],
  '/patient/profile': ['patient'],
  '/therapist': ['therapist'],
  '/therapist/settings': ['therapist'],
  '/therapist/patients': ['therapist'],
  '/therapist/appointments': ['therapist'],
  '/therapist/profile': ['therapist']
} as const;

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });
  }
};

// Get user role from Firestore
async function getUserRole(uid: string): Promise<string> {
  const db = getFirestore();
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      throw new Error('User document not found');
    }
    const userData = userDoc.data();
    return userData?.role || 'unknown';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'unknown';
  }
}

export async function middleware(req: NextRequest) {
  // Initialize Firebase Admin
  initializeFirebaseAdmin();

  const path = req.nextUrl.pathname;
  
  // Check if the path is protected
  const protectedRoute = Object.keys(PROTECTED_ROUTES).find(route => 
    path.startsWith(route)
  );

  // Allow access to public routes
  if (!protectedRoute) {
    return NextResponse.next();
  }

  // Get session cookie
  const session = req.cookies.get('__session')?.value;

  // Redirect to signin if no session exists
  if (!session) {
    const signinUrl = new URL('/signin', req.url);
    signinUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(signinUrl);
  }

  try {
    // Verify session cookie
    const decodedToken = await getAuth().verifySessionCookie(session, true);
    
    // Get user role
    const userRole = await getUserRole(decodedToken.uid);

    if (userRole === 'unknown') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Check if user's role is allowed for this route
    const allowedRoles = PROTECTED_ROUTES[protectedRoute as keyof typeof PROTECTED_ROUTES];
    
    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = userRole === 'patient' ? '/patient' : '/therapist';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    const signinUrl = new URL('/signin', req.url);
    signinUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(signinUrl);
  }
}

// Configure middleware matchers
export const config = {
  matcher: [
    '/patient/:path*',
    '/therapist/:path*'
  ]
};
