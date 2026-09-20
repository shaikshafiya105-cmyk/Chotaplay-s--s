'use client';

import React from 'react';
import Image from 'next/image';
import { PillButton } from '@/components/ui/PillButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: 'Mohammad Zunaid Siddiq',
      role: 'Game Designer',
      imageSrc: '/assets/TEAM MEMBER 1.jpeg',
      field: 'Game Design',
      delivers: 'Idea',
      imagePosition: 'center 14%',
    },
    {
      name: 'Shaik Shafiya',
      role: 'UI/UX Designer',
      imageSrc: '/assets/TEAM MEMBER 2.jpeg',
      field: 'UI/UX Design',
      delivers: 'Experience',
      imagePosition: 'center center',
    },
    {
      name: 'Syed Hafsa Shireen',
      role: 'Animator',
      imageSrc: '/assets/TEAM MEMBER 3.jpeg',
      field: 'Animation',
      delivers: 'Life',
      imagePosition: 'center 20%',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-brand-blue flex flex-col">
      {/* Top Header */}
      <header className="w-full px-4 md:px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <PillButton href="/home">
          Back to Home
        </PillButton>
        <span className="font-extrabold text-xl text-brand-blue">
          About ChotaPlay
        </span>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 md:py-16 flex flex-col gap-16 md:gap-24">
        {/* 1. Question Moment */}
        <section className="text-center flex flex-col items-center gap-4">
          <span className="px-5 py-2 rounded-full bg-brand-yellow/60 border border-brand-orange text-brand-orange font-bold text-sm tracking-wider uppercase">
            Our Origin
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-brand-blue max-w-3xl leading-tight">
            We started with a simple question.
          </h1>
          <p className="text-2xl md:text-4xl font-extrabold text-brand-orange max-w-2xl">
            “What if learning could feel as engaging as play?”
          </p>
        </section>

        {/* 2. Passive -> Active Transformation */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-blue/20 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-brand-blue/60 uppercase tracking-wider">
                Traditional Learning
              </span>
              <h3 className="text-2xl font-black text-brand-blue/70 mt-1 mb-6">
                Passive Absorption
              </h3>
            </div>
            <div className="flex flex-col gap-3 font-bold text-lg text-brand-blue/60">
              <div className="py-2.5 px-4 rounded-xl bg-brand-blue/5">Watch</div>
              <div className="py-2.5 px-4 rounded-xl bg-brand-blue/5">Listen</div>
              <div className="py-2.5 px-4 rounded-xl bg-brand-blue/5">Memorize</div>
              <div className="py-2.5 px-4 rounded-xl bg-brand-blue/5">Repeat</div>
            </div>
          </div>

          <div className="bg-brand-yellow/30 rounded-3xl p-8 border-3 border-brand-orange shadow-active flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-brand-orange uppercase tracking-wider">
                The ChotaPlay Way
              </span>
              <h3 className="text-2xl font-black text-brand-blue mt-1 mb-6">
                Active Discovery
              </h3>
            </div>
            <div className="flex flex-col gap-3 font-extrabold text-lg text-brand-blue">
              <div className="py-2.5 px-4 rounded-xl bg-white border border-brand-orange text-brand-orange">See</div>
              <div className="py-2.5 px-4 rounded-xl bg-white border border-brand-orange text-brand-orange">Think</div>
              <div className="py-2.5 px-4 rounded-xl bg-white border border-brand-orange text-brand-orange">Respond</div>
              <div className="py-2.5 px-4 rounded-xl bg-white border border-brand-orange text-brand-orange">Interact</div>
              <div className="py-2.5 px-4 rounded-xl bg-brand-orange text-white">Discover</div>
            </div>
          </div>
        </section>

        {/* 3. Connected Journey: Select -> Watch -> Play -> Learn */}
        <section className="w-full bg-white rounded-3xl p-8 md:p-12 border-3 border-brand-blue/20 shadow-card text-center">
          <h2 className="text-2xl md:text-4xl font-black text-brand-blue mb-8">
            The Active Discovery Loop
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center">
            {['Select', 'Watch', 'Play', 'Learn'].map((step, idx) => (
              <div
                key={step}
                className="py-6 px-4 rounded-2xl bg-brand-yellow/50 border-2 border-brand-blue flex flex-col items-center justify-center gap-2 relative"
              >
                <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-extrabold text-sm flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="text-xl md:text-2xl font-black text-brand-blue">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Strongest Brand Statement & Vision */}
        <section className="text-center py-8 flex flex-col items-center gap-6">
          <blockquote className="text-3xl md:text-5xl font-black text-brand-blue leading-snug max-w-4xl">
            “The teacher guides. Technology facilitates. Children participate.”
          </blockquote>
          <p className="text-xl md:text-2xl font-bold text-brand-blue/80 max-w-2xl">
            From passive learning to active discovery. We don’t just want children to learn. We want them to want to learn.
          </p>
        </section>

        {/* 5. Three Minds, One Vision (Team Members) */}
        <section className="w-full">
          <div className="text-center mb-10">
            <span className="px-5 py-2 rounded-full bg-brand-yellow/60 border border-brand-orange text-brand-orange font-bold text-sm tracking-wider uppercase">
              The Creators
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mt-3">
              Three Minds, One Vision
            </h2>
            <p className="text-lg md:text-xl font-extrabold text-brand-orange mt-2">
              Game Design × UI/UX Design × Animation → Idea × Experience × Life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-6 border-3 border-brand-blue/20 shadow-card flex flex-col items-center text-center group hover:border-brand-blue hover:shadow-active transition-all"
              >
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-brand-blue shadow-sm">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    style={{ objectPosition: member.imagePosition || 'center' }}
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-black text-brand-blue mb-1">
                  {member.name}
                </h3>
                <span className="py-1.5 px-4 rounded-full bg-brand-orange text-white font-bold text-sm mb-4">
                  {member.role}
                </span>
                <p className="text-sm font-semibold text-brand-blue/70">
                  {member.field} → <strong className="text-brand-blue">{member.delivers}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final Payoff & Signature */}
        <section className="text-center py-12 border-t-2 border-brand-blue/10 flex flex-col items-center gap-6">
          <p className="text-2xl md:text-3xl font-extrabold text-brand-blue">
            “What if learning could feel as engaging as play?”
          </p>
          <p className="text-3xl md:text-5xl font-black text-brand-orange">
            ChotaPlay is our answer.
          </p>
          <div className="w-24 h-1.5 bg-brand-yellow rounded-full my-2" />
          <p className="text-2xl md:text-4xl font-black text-brand-blue tracking-wide">
            ChotaPlay. Watch. Play. Learn.
          </p>
        </section>
      </main>
    </div>
  );
}
