import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';

export const metadata: Metadata = {
  title: 'ChotaPlay — Watch. Play. Learn.',
  description: 'Early-childhood learning product for LKG, UKG, and 1st Class.',
  icons: {
    icon: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-brand-blue antialiased flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
