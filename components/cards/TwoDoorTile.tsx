'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TwoDoorTileProps {
  title: string;
  imageSrc: string;
  href: string;
  subtitle?: string;
}

export function TwoDoorTile({ title, imageSrc, href, subtitle }: TwoDoorTileProps) {
  return (
    <Link
      href={href}
      className="group block w-full max-w-md bg-white rounded-3xl p-6 md:p-8 border-3 border-brand-blue/30 hover:border-brand-blue transition-all shadow-card hover:shadow-active active:scale-95 text-center flex flex-col items-center justify-between"
    >
      {/* Visual illustration frame */}
      <div className="w-full aspect-square relative rounded-2xl bg-brand-yellow/30 flex items-center justify-center p-6 mb-6">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
          unoptimized
        />
      </div>

      {/* Button Action */}
      <div className="w-full">
        <div className="w-full py-4 px-6 rounded-2xl bg-brand-blue group-hover:bg-brand-orange text-white font-extrabold text-xl md:text-2xl transition-colors shadow-sm">
          {title}
        </div>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base font-semibold text-brand-blue/70">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
