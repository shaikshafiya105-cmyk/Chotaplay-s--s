'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { getTopicById } from '@/lib/curriculum-data';
import { StandardVideoPlayer } from '@/components/video/StandardVideoPlayer';
import { checkTopicAccess } from '@/app/actions/progression';

export default function ExploreTopicVideoPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const topic = getTopicById('explore', topicId);
  if (!topic) {
    notFound();
  }

  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function verifyAccess() {
      if (topic && (topic.index === 1 || topic.isUnlockedDefault)) {
        if (mounted) setHasAccess(true);
        return;
      }
      const allowed = await checkTopicAccess('explore', topic!.id);
      if (mounted) {
        if (!allowed) {
          router.replace('/explore');
        } else {
          setHasAccess(true);
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

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center">
      <StandardVideoPlayer
        topic={topic}
        backToTopicsHref="/explore"
        isExploreVariant={true}
      />
    </main>
  );
}
