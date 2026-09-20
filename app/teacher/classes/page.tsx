'use client';

import React from 'react';
import { PillButton } from '@/components/ui/PillButton';
import { ClassTile } from '@/components/cards/ClassTile';

export default function ClassSelectorPage() {
  const classes = [
    {
      title: 'LKG',
      imageSrc: '/assets/LKG ICON.jpeg',
      href: '/teacher/classes/lkg',
    },
    {
      title: 'UKG',
      imageSrc: '/assets/UKG ICON.jpeg',
      href: '/teacher/classes/ukg',
    },
    {
      title: '1st Class',
      imageSrc: '/assets/1ST Class ICON.jpeg',
      href: '/teacher/classes/first',
    },
    {
      title: 'Explore',
      imageSrc: '/assets/EXPLORE ICON.png',
      href: '/explore',
    },
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-start mb-6">
        <PillButton href="/home">
          Back to Home
        </PillButton>
      </div>

      <div className="w-full max-w-6xl flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-black text-brand-blue text-center mb-10">
          Select Classroom Grade
        </h1>

        {/* 4 Equal Tiles Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 place-items-center">
          {classes.map((cls) => (
            <ClassTile
              key={cls.title}
              title={cls.title}
              imageSrc={cls.imageSrc}
              href={cls.href}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
