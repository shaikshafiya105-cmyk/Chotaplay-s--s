'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeacherLoginSchema, TeacherLoginFormValues } from '@/lib/schemas';
import { teacherLoginAction } from '@/app/actions/auth';
import { PillButton } from '@/components/ui/PillButton';
import { SolidButton } from '@/components/ui/SolidButton';
import { FormInput } from '@/components/ui/FormInput';
import { Eye, EyeOff } from 'lucide-react';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeacherLoginFormValues>({
    resolver: zodResolver(TeacherLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: TeacherLoginFormValues) => {
    setServerError(null);
    const res = await teacherLoginAction(values);
    if (res.success) {
      router.push('/teacher/classes');
    } else {
      setServerError(res.error || 'Invalid credentials.');
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center justify-between">
      {/* Top Bar: Back to Home */}
      <div className="w-full max-w-xl flex justify-start">
        <PillButton href="/home">
          Back to Home
        </PillButton>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border-3 border-brand-blue/30 shadow-card my-auto">
        <h1 className="text-3xl md:text-4xl font-black text-brand-blue text-center mb-2">
          Teacher Login
        </h1>
        <p className="text-center font-semibold text-brand-blue/70 mb-8 text-base">
          Sign in to access classroom curriculum
        </p>

        {serverError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-brand-yellow/80 border border-brand-orange text-brand-orange font-bold text-sm text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormInput
            label="Teacher Email"
            type="email"
            placeholder="teacher@school.edu"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="relative">
            <FormInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-11 text-brand-blue/70 hover:text-brand-blue"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="mt-4">
            <SolidButton
              type="submit"
              variant="blue"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Submit'}
            </SolidButton>
          </div>
        </form>
      </div>

      <div className="py-4 text-xs font-semibold text-brand-blue/50">
        ChotaPlay • Early Childhood Learning Portal
      </div>
    </main>
  );
}
