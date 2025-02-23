// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const PROTECTED_ROUTES = {
  '/patient': ['patient'],
  '/patient/settings': ['patient'],
  '/therapist': ['therapist'],
  '/therapist/settings': ['therapist']
};

// Initialize Firebase Admin only once
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
  initializeFirebaseAdmin();

  const path = req.nextUrl.pathname;
  
  // Check if the path is protected
  const protectedRoute = Object.keys(PROTECTED_ROUTES).find(route => 
    path.startsWith(route)
  );

  // If not a protected route, continue
  if (!protectedRoute) {
    return NextResponse.next();
  }

  // Get the session cookie
  const session = req.cookies.get('__session')?.value;

  // If no session, redirect to signin
  if (!session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    // Verify the session cookie
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
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/patient/:path*',
    '/therapist/:path*'
  ]
};