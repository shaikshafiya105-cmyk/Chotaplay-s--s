'use client';

import React from 'react';
import { TwoDoorTile } from '@/components/cards/TwoDoorTile';
import { PillButton } from '@/components/ui/PillButton';

export default function ParentMenuPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center justify-between">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex justify-start">
        <PillButton href="/home">
          Back to Home
        </PillButton>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center justify-center my-auto">
        <h1 className="text-3xl md:text-5xl font-black text-brand-blue text-center mb-10">
          Parent Learning Menu
        </h1>

        {/* Two Equal Tiles: Activities and Explore */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 place-items-center">
          <TwoDoorTile
            title="Activities"
            subtitle="Curated foundational topics"
            imageSrc="/assets/Activities icon.png"
            href="/parent/activities"
          />

          <TwoDoorTile
            title="Explore"
            subtitle="Open-ended discovery preview"
            imageSrc="/assets/EXPLORE ICON.png"
            href="/explore"
          />
        </div>
      </div>

      <div className="py-4 text-xs font-semibold text-brand-blue/50">
        ChotaPlay • Watch. Play. Learn.
      </div>
    </main>
  );
}
