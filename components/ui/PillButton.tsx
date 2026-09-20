'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PillButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export function PillButton({ href, onClick, children, icon = true, className = '' }: PillButtonProps) {
  const baseClasses = `inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-brand-blue text-brand-blue font-bold text-base md:text-lg bg-white hover:bg-brand-yellow/30 active:scale-95 transition-all shadow-sm cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon && <ArrowLeft className="w-5 h-5 text-brand-blue" />}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {icon && <ArrowLeft className="w-5 h-5 text-brand-blue" />}
      <span>{children}</span>
    </button>
  );
}
