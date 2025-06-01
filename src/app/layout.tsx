// app/layout.tsx - Use the client wrapper
import { Inter } from 'next/font/google';
import { Providers } from './providers';

import ParallaxWrapper from '@/components/providers/ParallaxWrapper';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DTU Shop - Student Marketplace',
  description: 'The official marketplace for Delhi Technological University students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ParallaxWrapper>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ParallaxWrapper>
        </Providers>
      </body>
    </html>
  );
}
