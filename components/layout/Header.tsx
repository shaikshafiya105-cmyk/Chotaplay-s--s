'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const isAboutActive = pathname === '/about';
  const isHomeActive = pathname === '/home';

  return (
    <header className="w-full bg-white border-b-2 border-brand-blue/10 px-4 md:px-8 py-3 md:py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <Link href="/home" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/assets/logo.png"
              alt="ChotaPlay Logo"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
          <div className="relative w-28 h-8 md:w-36 md:h-10">
            <Image
              src="/assets/word.png"
              alt="ChotaPlay Wordmark"
              fill
              className="object-contain object-left"
              unoptimized
              priority
            />
          </div>
        </Link>

        {/* Right: Home Icon + About Us Link */}
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/home"
            aria-label="Home"
            className={`p-2 rounded-full border-2 transition-all ${
              isHomeActive
                ? 'border-brand-orange text-brand-orange bg-brand-yellow/30'
                : 'border-brand-blue text-brand-blue hover:bg-brand-yellow/20'
            }`}
          >
            <Home className="w-5 h-5" />
          </Link>

          <Link
            href="/about"
            className={`font-extrabold text-base md:text-lg transition-colors py-1 ${
              isAboutActive
                ? 'text-brand-orange border-b-2 border-brand-orange'
                : 'text-brand-blue hover:text-brand-orange'
            }`}
          >
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
