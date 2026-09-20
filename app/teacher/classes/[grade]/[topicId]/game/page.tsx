'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { GradeSlug } from '@/lib/types';
import { getTopicById, getTopicsForGrade } from '@/lib/curriculum-data';
import { GamePlayer } from '@/components/game/GamePlayer';
import { fetchGradeLockStates } from '@/app/actions/progression';

export default function GradeGamePage() {
  const params = useParams();
  const router = useRouter();
  const grade = params.grade as GradeSlug;
  const topicId = params.topicId as string;

  const topic = getTopicById(grade, topicId);
  if (!topic || !topic.hasGame) {
    notFound();
  }

  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function verifyAccess() {
      try {
        const states = await fetchGradeLockStates(grade);
        const curState = states.find((s) => s.topicId === topic!.id);
        const isAllowed = curState ? (curState.isUnlocked && curState.isVideoCompleted) : false;
        if (mounted) {
          if (!isAllowed) {
            router.replace(`/teacher/classes/${grade}/${topic!.slug}`);
          } else {
            setHasAccess(true);
          }
        }
      } catch (err) {
        if (mounted) {
          router.replace(`/teacher/classes/${grade}`);
        }
      }
    }
    verifyAccess();
    return () => {
      mounted = false;
    };
  }, [grade, topic, router]);

  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  const allTopics = getTopicsForGrade(grade);
  const currentIndex = allTopics.findIndex((t) => t.id === topic.id);
  const nextTopic = currentIndex !== -1 && currentIndex < allTopics.length - 1
    ? allTopics[currentIndex + 1]
    : null;

  const nextTopicHref = nextTopic
    ? `/teacher/classes/${grade}/${nextTopic.slug}`
    : `/teacher/classes/${grade}`;

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center">
      <GamePlayer
        topic={topic}
        backToVideoHref={`/teacher/classes/${grade}/${topic.slug}`}
        nextTopicHref={nextTopicHref}
      />
    </main>
  );
}
