'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ParentRegisterSchema, ParentRegisterFormValues } from '@/lib/schemas';
import { parentRegisterAction } from '@/app/actions/auth';
import { PillButton } from '@/components/ui/PillButton';
import { SolidButton } from '@/components/ui/SolidButton';
import { FormInput } from '@/components/ui/FormInput';

export default function ParentRegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ParentRegisterFormValues>({
    resolver: zodResolver(ParentRegisterSchema),
    defaultValues: {
      kidName: '',
      kidId: '',
      kidAge: 4,
      kidGender: 'boy',
    },
  });

  const selectedGender = watch('kidGender');

  const onSubmit = async (values: ParentRegisterFormValues) => {
    setServerError(null);
    const res = await parentRegisterAction(values);
    if (res.success) {
      router.push('/parent/menu');
    } else {
      setServerError(res.error || 'Failed to register child.');
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center justify-between">
      {/* Top Bar: Back to Home (mirrored to top-right) */}
      <div className="w-full max-w-xl flex justify-end">
        <PillButton href="/home">
          Back to Home
        </PillButton>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border-3 border-brand-blue/30 shadow-card my-auto">
        <h1 className="text-3xl md:text-4xl font-black text-brand-blue text-center mb-2">
          Kid Registration
        </h1>
        <p className="text-center font-semibold text-brand-blue/70 mb-8 text-base">
          Enter child profile details to begin
        </p>

        {serverError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-brand-yellow/80 border border-brand-orange text-brand-orange font-bold text-sm text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormInput
            label="Kid Name"
            placeholder="e.g. Aarav"
            error={errors.kidName?.message}
            {...register('kidName')}
          />

          <FormInput
            label="Kid ID"
            placeholder="e.g. KID-104"
            error={errors.kidId?.message}
            {...register('kidId')}
          />

          <FormInput
            label="Kid Age"
            type="number"
            min={2}
            max={8}
            placeholder="4"
            error={errors.kidAge?.message}
            {...register('kidAge')}
          />

          {/* Gender Selector */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-brand-blue font-bold text-base md:text-lg">
              Kid Gender
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue('kidGender', 'boy')}
                className={`py-3 rounded-2xl border-2 font-bold text-lg transition-all ${
                  selectedGender === 'boy'
                    ? 'border-brand-blue bg-brand-blue text-white shadow-sm'
                    : 'border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-yellow/20'
                }`}
              >
                Boy 👦
              </button>
              <button
                type="button"
                onClick={() => setValue('kidGender', 'girl')}
                className={`py-3 rounded-2xl border-2 font-bold text-lg transition-all ${
                  selectedGender === 'girl'
                    ? 'border-brand-blue bg-brand-blue text-white shadow-sm'
                    : 'border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-yellow/20'
                }`}
              >
                Girl 👧
              </button>
            </div>
            {errors.kidGender && (
              <span className="text-brand-orange font-semibold text-sm">
                {errors.kidGender.message}
              </span>
            )}
          </div>

          <div className="mt-4">
            <SolidButton
              type="submit"
              variant="blue"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Submit'}
            </SolidButton>
          </div>
        </form>
      </div>

      <div className="py-4 text-xs font-semibold text-brand-blue/50">
        ChotaPlay • Parent Experience Portal
      </div>
    </main>
  );
}
