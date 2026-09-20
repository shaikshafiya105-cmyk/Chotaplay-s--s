'use client';

import React from 'react';
import Link from 'next/link';

interface SolidButtonProps {
  variant?: 'blue' | 'orange';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function SolidButton({
  variant = 'blue',
  href,
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
  fullWidth = false,
}: SolidButtonProps) {
  const bgClasses = variant === 'orange'
    ? 'bg-brand-orange text-white hover:opacity-95 shadow-active'
    : 'bg-brand-blue text-white hover:opacity-95 shadow-card';

  const baseClasses = `inline-flex items-center justify-center font-bold text-lg md:text-xl py-3.5 px-8 rounded-2xl transition-all select-none ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 cursor-pointer'
  } ${fullWidth ? 'w-full' : ''} ${bgClasses} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
