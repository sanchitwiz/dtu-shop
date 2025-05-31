import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import User from '@/models/User';
import { comparePassword } from '@/lib/auth/password';
import { signInSchema } from '@/schemas/auth';
import dbConnect from '@/lib/dbConnect';
// import { authOp}

// MongoDB client for NextAuth adapter
const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

/**
 * NextAuth configuration with Google OAuth and Credentials providers
 * Supports both social login and traditional email/password authentication
 */
export const authOptions: AuthOptions = {
  // Use MongoDB adapter for session storage
  adapter: MongoDBAdapter(clientPromise) as unknown as import('next-auth/adapters').Adapter,
  
  // Authentication providers configuration
  providers: [
    /**
     * Google OAuth Provider
     * Allows users to sign in with their Google account
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'student', // Default role for Google OAuth users
        };
      },
    }),

    /**
     * Credentials Provider
     * Allows users to sign in with email and password
     */
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your.email@college.edu',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your password',
        },
      },
      /**
       * Authorize function for credentials login
       * Validates user credentials against database
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Validate input using Zod schema
          const validatedCredentials = signInSchema.parse(credentials);
          
          // Connect to database
          await dbConnect();
          
          // Find user by email
          const user = await User.findOne({ 
            email: validatedCredentials.email.toLowerCase() 
          }).select('+password');

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Check if user account is active
          if (!user.isActive) {
            throw new Error('Account is deactivated. Please contact support.');
          }

          // Verify password for credential-based accounts
          if (user.password) {
            const isValidPassword = await comparePassword(
              validatedCredentials.password,
              user.password
            );

            if (!isValidPassword) {
              throw new Error('Invalid password');
            }
          } else {
            throw new Error('This account uses social login. Please sign in with Google.');
          }

          // Return user object for session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            collegeId: user.collegeId,
            department: user.department,
            year: user.year,
          };
        } catch (error: any) {
          console.error('Authentication error:', error.message);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],

  /**
   * Session configuration
   * Use JWT for session management
   */
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  /**
   * JWT configuration
   * Customize JWT token content
   */
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  /**
   * Callback functions to customize authentication flow
   */
  callbacks: {
    /**
     * JWT callback - runs whenever a JWT is accessed
     * Add custom fields to the token
     */
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.role = user.role;
        token.collegeId = user.collegeId;
        token.department = user.department;
        token.year = user.year;
        
        // Handle Google OAuth user creation/update
        if (account?.provider === 'google') {
          await dbConnect();
          
          // Check if user exists in our database
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user for Google OAuth
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: 'student',
              isActive: true,
            });
            
            token.role = newUser.role;
            token.id = newUser._id.toString();
          } else {
            // Update existing user's image if needed
            if (existingUser.image !== user.image) {
              await User.findByIdAndUpdate(existingUser._id, {
                image: user.image,
              });
            }
            
            token.role = existingUser.role;
            token.collegeId = existingUser.collegeId;
            token.department = existingUser.department;
            token.year = existingUser.year;
          }
        }
      }
      
      return token;
    },

    /**
     * Session callback - runs whenever a session is accessed
     * Add custom fields to the session object
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as "student" | "admin";
        session.user.collegeId = token.collegeId as string;
        session.user.department = token.department as string;
        session.user.year = token.year as number;
      }
      
      return session;
    },

    /**
     * Sign in callback - controls whether user is allowed to sign in
     */
    async signIn({ user, account, profile }) {
      // Allow all sign ins for now
      // You can add additional validation here if needed
      return true;
    },
  },

  /**
   * Custom pages for authentication flow
   */
  pages: {
    signIn: '/auth/signin',
    // signUp: '/auth/signup',
    error: '/auth/error',
  },

  /**
   * Events - useful for logging and analytics
   */
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
    async signOut({ session, token }) {
      console.log(`User signed out: ${session?.user?.email}`);
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
    },
  },

  /**
   * Enable debug messages in development
   */
  debug: process.env.NODE_ENV === 'development',
};

// Export handlers for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
