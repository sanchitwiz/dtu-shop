// lib/auth/apiAuth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error('Authentication required');
  }
  
  if (session.user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  
  return session.user;
}
