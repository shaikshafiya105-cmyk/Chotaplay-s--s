'use client';

import React, { useEffect, useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';
import { TopicCard } from '@/components/cards/TopicCard';
import { ACTIVITIES_TOPICS } from '@/lib/curriculum-data';
import { TopicLockState } from '@/lib/types';
import { fetchGradeLockStates } from '@/app/actions/progression';

export default function ParentActivitiesTopicGridPage() {
  const [lockStates, setLockStates] = useState<TopicLockState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadStates() {
      try {
        const states = await fetchGradeLockStates('activities');
        if (mounted) {
          setLockStates(states);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load activities lock states', e);
        if (mounted) setLoading(false);
      }
    }
    loadStates();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <PillButton href="/parent/menu">
          Back to Menu
        </PillButton>

        <h1 className="text-2xl md:text-4xl font-black text-brand-blue">
          Parent Activities
        </h1>

        <PillButton href="/home" icon={false}>
          Home
        </PillButton>
      </div>

      {/* Direct Square Topic Grid (No repeated LKG/UKG/1st Class icons) */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {ACTIVITIES_TOPICS.map((topic, idx) => {
            const topicState = lockStates.find((s) => s.topicId === topic.id);
            const isUnlocked = topicState ? topicState.isUnlocked : (idx === 0 || topic.isUnlockedDefault);

            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                isUnlocked={Boolean(isUnlocked)}
                baseHref="/parent/activities"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
