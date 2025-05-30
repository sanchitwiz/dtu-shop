// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/**
 * Extend NextAuth types to include custom user fields
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'student' | 'admin';
      collegeId?: string;
      department?: string;
      year?: number;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'student' | 'admin';
    collegeId?: string;
    department?: string;
    year?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    collegeId?: string;
    department?: string;
    year?: number;
  }
}
