// app/layout.tsx - Updated root layout
import { Inter } from 'next/font/google';
import { Providers } from './providers';

import Footer from '@/components/layout/Footer';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'College Marketplace - Buy & Sell with Fellow Students',
  description: 'The trusted marketplace for college students. Buy and sell textbooks, electronics, clothing and more within your college community.',
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
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
