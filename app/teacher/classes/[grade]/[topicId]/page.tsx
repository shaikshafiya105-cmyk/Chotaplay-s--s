'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { GradeSlug } from '@/lib/types';
import { getTopicById } from '@/lib/curriculum-data';
import { StandardVideoPlayer } from '@/components/video/StandardVideoPlayer';
import { checkTopicAccess } from '@/app/actions/progression';

export default function GradeTopicVideoPage() {
  const params = useParams();
  const router = useRouter();
  const grade = params.grade as GradeSlug;
  const topicId = params.topicId as string;

  const topic = getTopicById(grade, topicId);
  if (!topic) {
    notFound();
  }

  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function verifyAccess() {
      // First topic is always accessible
      if (topic && (topic.index === 1 || topic.isUnlockedDefault)) {
        if (mounted) setHasAccess(true);
        return;
      }
      const allowed = await checkTopicAccess(grade, topic!.id);
      if (mounted) {
        if (!allowed) {
          router.replace(`/teacher/classes/${grade}`);
        } else {
          setHasAccess(true);
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

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center">
      <StandardVideoPlayer
        topic={topic}
        backToTopicsHref={`/teacher/classes/${grade}`}
        gameHref={`/teacher/classes/${grade}/${topic.slug}/game`}
      />
    </main>
  );
}
