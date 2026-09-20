'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { PillButton } from '@/components/ui/PillButton';
import { TopicCard } from '@/components/cards/TopicCard';
import { GradeSlug, TopicLockState } from '@/lib/types';
import { getTopicsForGrade } from '@/lib/curriculum-data';
import { fetchGradeLockStates } from '@/app/actions/progression';

export default function GradeTopicGridPage() {
  const params = useParams();
  const grade = params.grade as GradeSlug;

  if (!['lkg', 'ukg', 'first'].includes(grade)) {
    notFound();
  }

  const topics = getTopicsForGrade(grade);
  const [lockStates, setLockStates] = useState<TopicLockState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadStates() {
      try {
        const states = await fetchGradeLockStates(grade);
        if (mounted) {
          setLockStates(states);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load topic lock states', e);
        if (mounted) setLoading(false);
      }
    }
    loadStates();
    return () => {
      mounted = false;
    };
  }, [grade]);

  const gradeNames: Record<string, string> = {
    lkg: 'LKG Curriculum',
    ukg: 'UKG Curriculum',
    first: '1st Class Curriculum',
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <PillButton href="/teacher/classes">
          Back to Classes
        </PillButton>

        <h1 className="text-2xl md:text-4xl font-black text-brand-blue">
          {gradeNames[grade] || 'Curriculum'}
        </h1>

        <PillButton href="/home" icon={false}>
          Home
        </PillButton>
      </div>

      {/* Topics Grid */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {topics.map((topic, idx) => {
            const topicState = lockStates.find((s) => s.topicId === topic.id);
            const isUnlocked = topicState ? topicState.isUnlocked : (idx === 0 || topic.isUnlockedDefault);

            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                isUnlocked={Boolean(isUnlocked)}
                baseHref={`/teacher/classes/${grade}`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
