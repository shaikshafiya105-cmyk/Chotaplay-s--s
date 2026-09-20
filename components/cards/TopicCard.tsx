'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LockGlyph } from '@/components/ui/LockGlyph';
import { CurriculumTopic } from '@/lib/types';
import { Play } from 'lucide-react';

interface TopicCardProps {
  topic: CurriculumTopic;
  isUnlocked: boolean;
  baseHref: string;
}

export function TopicCard({ topic, isUnlocked, baseHref }: TopicCardProps) {
  const [shake, setShake] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const formattedIndex = String(topic.index).padStart(2, '0');
  const targetHref = `${baseHref}/${topic.slug}`;

  const handleLockedClick = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault();
      setShake(true);
      setShowToast(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const cardContent = (
    <div
      onClick={handleLockedClick}
      className={`relative w-full aspect-square bg-white rounded-3xl p-3 md:p-4 border-2 flex flex-col justify-between transition-all select-none shadow-card ${
        isUnlocked
          ? 'border-brand-blue/30 hover:border-brand-blue hover:shadow-active cursor-pointer active:scale-95'
          : 'border-brand-blue/15 opacity-75 cursor-not-allowed'
      } ${shake ? 'animate-bounce' : ''}`}
    >
      {/* Top row: Index & Lock Glyph */}
      <div className="flex items-center justify-between w-full">
        <span className="font-extrabold text-lg md:text-xl text-brand-blue">
          {formattedIndex}
        </span>
        <LockGlyph isUnlocked={isUnlocked} />
      </div>

      {/* Center inner thumbnail panel: Light Yellow */}
      <div className="w-full flex-1 my-2.5 rounded-2xl bg-brand-yellow/80 border border-brand-yellow flex flex-col items-center justify-center p-3 text-center">
        <h3 className="text-brand-blue font-black text-lg md:text-xl leading-tight line-clamp-3">
          {topic.title}
        </h3>
        {topic.hasGame && (
          <span className="mt-1 text-xs font-bold text-brand-orange uppercase tracking-wider">
            Game Available
          </span>
        )}
      </div>

      {/* Bottom row: VIDEO Pill */}
      <div className="w-full flex justify-center">
        <div
          className={`w-full py-2 rounded-full font-bold text-sm md:text-base flex items-center justify-center gap-1.5 transition-all ${
            isUnlocked
              ? 'bg-brand-orange text-white shadow-sm'
              : 'bg-brand-blue/10 text-brand-blue/50'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>VIDEO</span>
        </div>
      </div>

      {/* Locked Toast Notification */}
      {showToast && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold py-1.5 px-3 rounded-full whitespace-nowrap z-30 shadow-md">
          Complete previous topic to unlock!
        </div>
      )}
    </div>
  );

  if (isUnlocked) {
    return <Link href={targetHref} className="block w-full">{cardContent}</Link>;
  }

  return <div className="block w-full">{cardContent}</div>;
}
