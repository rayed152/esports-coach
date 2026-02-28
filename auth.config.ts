import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Define paths that do not require authentication
      const isPublicPath = 
        nextUrl.pathname === '/' || 
        nextUrl.pathname === '/login' || 
        nextUrl.pathname === '/register';

      // If the user is on a public path...
      if (isPublicPath) {
        // ...and they are already logged in, redirect them to the dashboard
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        // ...otherwise, let them see the public page
        return true;
      }

      // For ANY other path, require the user to be logged in
      if (!isLoggedIn) {
        return false; // Redirects them to the signIn page (/login)
      }

      return true; // Used is logged in, allow access to the protected path
    },
  },
  providers: [],
} satisfies NextAuthConfig;
