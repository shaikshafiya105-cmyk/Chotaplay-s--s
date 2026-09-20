'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { getTopicById, ACTIVITIES_TOPICS } from '@/lib/curriculum-data';
import { GamePlayer } from '@/components/game/GamePlayer';
import { fetchGradeLockStates } from '@/app/actions/progression';

export default function ParentActivityGamePage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const topic = getTopicById('activities', topicId);
  if (!topic || !topic.hasGame) {
    notFound();
  }

  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function verifyAccess() {
      try {
        const states = await fetchGradeLockStates('activities');
        const curState = states.find((s) => s.topicId === topic!.id);
        const isAllowed = curState ? (curState.isUnlocked && curState.isVideoCompleted) : false;
        if (mounted) {
          if (!isAllowed) {
            router.replace(`/parent/activities/${topic!.slug}`);
          } else {
            setHasAccess(true);
          }
        }
      } catch (err) {
        if (mounted) {
          router.replace('/parent/activities');
        }
      }
    }
    verifyAccess();
    return () => {
      mounted = false;
    };
  }, [topic, router]);

  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  const currentIndex = ACTIVITIES_TOPICS.findIndex((t) => t.id === topic.id);
  const nextTopic = currentIndex !== -1 && currentIndex < ACTIVITIES_TOPICS.length - 1
    ? ACTIVITIES_TOPICS[currentIndex + 1]
    : null;

  const nextTopicHref = nextTopic
    ? `/parent/activities/${nextTopic.slug}`
    : '/parent/activities';

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center">
      <GamePlayer
        topic={topic}
        backToVideoHref={`/parent/activities/${topic.slug}`}
        nextTopicHref={nextTopicHref}
      />
    </main>
  );
}
