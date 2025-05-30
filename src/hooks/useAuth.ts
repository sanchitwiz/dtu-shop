// hooks/useAuth.ts
'use client';

import { useSession } from 'next-auth/react';

/**
 * Client-side authentication hook
 */
export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    isAdmin: session?.user?.role === 'admin',
    isStudent: session?.user?.role === 'student',
    session,
    status,
  };
}
