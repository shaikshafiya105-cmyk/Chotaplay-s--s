'use server';

import { GradeSlug, TopicLockState } from '@/lib/types';
import {
  getGradeLockStates,
  isTopicUnlocked,
  recordVideoCompletion,
  createGameSessionToken,
  recordGameCompletion,
} from '@/lib/progression-store';
import { cookies } from 'next/headers';

async function getEffectiveUserId(): Promise<string> {
  const cookieStore = cookies();
  
  // 1. Check parent kid profile
  const profileCookie = cookieStore.get('chotaplay_child_profile');
  if (profileCookie?.value) {
    try {
      const parsed = JSON.parse(profileCookie.value);
      const id = parsed.kidId || parsed.kidName;
      if (id) return `child_${id}`;
    } catch {
      // ignore
    }
  }

  // 2. Check teacher session
  const teacherCookie = cookieStore.get('chotaplay_teacher_session');
  if (teacherCookie?.value) {
    return `teacher_${teacherCookie.value}`;
  }

  // 3. Fallback to isolated anonymous guest session per browser
  const anonCookie = cookieStore.get('chotaplay_anon_session');
  if (anonCookie?.value) {
    return anonCookie.value;
  }
  const newAnonId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  cookieStore.set('chotaplay_anon_session', newAnonId, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });
  return newAnonId;
}

export async function fetchGradeLockStates(grade: GradeSlug): Promise<TopicLockState[]> {
  const userId = await getEffectiveUserId();
  return getGradeLockStates(grade, userId);
}

export async function checkTopicAccess(grade: GradeSlug, topicId: string): Promise<boolean> {
  const userId = await getEffectiveUserId();
  return isTopicUnlocked(grade, topicId, userId);
}

export async function submitVideoCompletion(
  grade: GradeSlug,
  topicId: string,
  reportedDuration: number
) {
  const userId = await getEffectiveUserId();
  return recordVideoCompletion(grade, topicId, reportedDuration, userId);
}

export async function requestGameSession(grade: GradeSlug, topicId: string): Promise<string> {
  const userId = await getEffectiveUserId();
  return createGameSessionToken(grade, topicId, userId);
}

export async function submitGameCompletion(
  sessionToken: string,
  topicId: string,
  grade: GradeSlug
) {
  const userId = await getEffectiveUserId();
  return recordGameCompletion(sessionToken, topicId, grade, userId);
}
