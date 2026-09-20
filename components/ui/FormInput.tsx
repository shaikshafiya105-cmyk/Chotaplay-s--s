'use client';

import React, { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <label htmlFor={inputId} className="text-brand-blue font-bold text-base md:text-lg">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue text-lg placeholder:text-brand-blue/40 focus:outline-none focus:ring-4 focus:ring-brand-yellow/50 transition-all ${
            error ? 'border-brand-orange ring-2 ring-brand-orange/30' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-brand-orange font-semibold text-sm mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
