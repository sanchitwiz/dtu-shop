// app/auth/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.';
      case 'OAuthSignin':
        return 'Error occurred during OAuth sign-in.';
      case 'OAuthCallback':
        return 'Error in OAuth callback.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account.';
      case 'EmailCreateAccount':
        return 'Could not create email account.';
      case 'Callback':
        return 'Error in callback handler.';
      case 'OAuthAccountNotLinked':
        return 'OAuth account is not linked to any user.';
      case 'EmailSignin':
        return 'Check your email for the sign-in link.';
      case 'CredentialsSignup':
        return 'Error during account creation.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unexpected error occurred.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">
            Authentication Error
          </h2>
          <p className="mt-4 text-gray-600">
            {getErrorMessage(error)}
          </p>
          <div className="mt-6">
            <Link 
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500"
            >
              Try signing in again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
