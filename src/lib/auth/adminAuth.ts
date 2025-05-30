// lib/auth/adminAuth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

/**
 * Require admin authentication for server components
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/admin');
  }
  
  if (session.user.role !== 'admin') {
    redirect('/unauthorized');
  }
  
  return session.user;
}

/**
 * Check if user has specific admin permission
 */
export async function hasAdminPermission(permission: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'admin') {
    return false;
  }
  
  // For now, all admins have all permissions
  // You can extend this to check specific permissions
  return true;
}
