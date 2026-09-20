'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { TwoDoorTile } from '@/components/cards/TwoDoorTile';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-black text-brand-blue text-center mb-8 md:mb-12">
          Welcome to ChotaPlay
        </h1>

        {/* Two-Door Portal: Equal Weight Teacher & Parents Cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 place-items-center">
          <TwoDoorTile
            title="Teacher"
            subtitle="Classroom Curriculum"
            imageSrc="/assets/teacher.png"
            href="/teacher/login"
          />

          <TwoDoorTile
            title="Parents"
            subtitle="Home Discovery & Activities"
            imageSrc="/assets/parents.png"
            href="/parent/register"
          />
        </div>
      </main>
    </div>
  );
}
