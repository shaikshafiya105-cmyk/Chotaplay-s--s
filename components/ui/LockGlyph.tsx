'use client';

import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface LockGlyphProps {
  isUnlocked: boolean;
  className?: string;
}

export function LockGlyph({ isUnlocked, className = '' }: LockGlyphProps) {
  if (isUnlocked) {
    return (
      <div className={`w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-orange shadow-sm ${className}`}>
        <Unlock className="w-4 h-4 stroke-[2.5]" />
      </div>
    );
  }

  return (
    <div className={`w-8 h-8 rounded-full bg-white border border-brand-blue/30 flex items-center justify-center text-brand-blue/60 ${className}`}>
      <Lock className="w-4 h-4 stroke-[2.5]" />
    </div>
  );
}
