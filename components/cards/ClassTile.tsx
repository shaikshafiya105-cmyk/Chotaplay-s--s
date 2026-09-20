'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ClassTileProps {
  title: string;
  imageSrc: string;
  href: string;
}

export function ClassTile({ title, imageSrc, href }: ClassTileProps) {
  return (
    <Link
      href={href}
      className="group block w-full bg-white rounded-3xl p-5 border-2 border-brand-blue/20 hover:border-brand-blue transition-all shadow-card hover:shadow-active active:scale-95 text-center flex flex-col items-center justify-between aspect-[4/5]"
    >
      {/* Image frame */}
      <div className="w-full flex-1 relative rounded-2xl overflow-hidden bg-brand-yellow/30 flex items-center justify-center p-3 mb-4">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform"
          unoptimized
        />
      </div>

      {/* Label in a bordered Blue pill */}
      <div className="w-full py-2.5 px-4 rounded-full border-2 border-brand-blue bg-white group-hover:bg-brand-blue group-hover:text-white text-brand-blue font-extrabold text-lg md:text-xl transition-all">
        {title}
      </div>
    </Link>
  );
}
