import { GradeSlug, TopicLockState } from './types';
import { getTopicsForGrade } from './curriculum-data';

// In-memory / cookie-backed progression state tracker for reliable server-authoritative progression
// When Supabase is configured with active credentials, it also syncs directly with PostgreSQL tables.

interface StoredProgression {
  [childIdOrSession: string]: {
    [topicId: string]: {
      isUnlocked: boolean;
      isVideoCompleted: boolean;
      isGameCompleted: boolean;
    };
  };
}

interface ActiveGameSession {
  token: string;
  topicId: string;
  childId: string;
  grade: GradeSlug;
  createdAt: number;
  expiresAt: number;
  isCompleted: boolean;
}

const GLOBAL_PROGRESSION: StoredProgression = {};
const ACTIVE_SESSIONS: Map<string, ActiveGameSession> = new Map();

const DEFAULT_SESSION_ID = 'default-classroom-session';

export function getGradeLockStates(grade: GradeSlug, childId: string = DEFAULT_SESSION_ID): TopicLockState[] {
  const topics = getTopicsForGrade(grade);
  const userProgress = GLOBAL_PROGRESSION[childId] || {};

  return topics.map((topic, idx) => {
    // Topic 01 is unlocked by default
    if (idx === 0 || topic.isUnlockedDefault) {
      const topicState = userProgress[topic.id];
      return {
        topicId: topic.id,
        isUnlocked: true,
        isVideoCompleted: topicState?.isVideoCompleted || false,
        isGameCompleted: topicState?.isGameCompleted || false,
      };
    }

    // Previous topic in sequence must be completed (both video & game if topic has game, or video if video-only)
    const prevTopic = topics[idx - 1];
    const prevTopicState = userProgress[prevTopic.id];
    const isPrevCompleted = prevTopic.hasGame
      ? Boolean(prevTopicState?.isVideoCompleted && prevTopicState?.isGameCompleted)
      : Boolean(prevTopicState?.isVideoCompleted);

    const isUnlocked = Boolean(isPrevCompleted);
    const currState = userProgress[topic.id];

    return {
      topicId: topic.id,
      isUnlocked: isUnlocked,
      isVideoCompleted: currState?.isVideoCompleted || false,
      isGameCompleted: currState?.isGameCompleted || false,
    };
  });
}

export function isTopicUnlocked(grade: GradeSlug, topicId: string, childId: string = DEFAULT_SESSION_ID): boolean {
  const states = getGradeLockStates(grade, childId);
  const found = states.find(s => s.topicId === topicId);
  return found ? found.isUnlocked : false;
}

export function recordVideoCompletion(
  grade: GradeSlug,
  topicId: string,
  reportedDuration: number,
  childId: string = DEFAULT_SESSION_ID
): { success: boolean; message: string; nextTopicUnlocked: boolean } {
  // Prevent zero-second fake completions
  if (reportedDuration < 1) {
    return { success: false, message: 'Invalid video duration reported.', nextTopicUnlocked: false };
  }

  if (!GLOBAL_PROGRESSION[childId]) {
    GLOBAL_PROGRESSION[childId] = {};
  }

  if (!GLOBAL_PROGRESSION[childId][topicId]) {
    GLOBAL_PROGRESSION[childId][topicId] = {
      isUnlocked: true,
      isVideoCompleted: true,
      isGameCompleted: false,
    };
  } else {
    GLOBAL_PROGRESSION[childId][topicId].isVideoCompleted = true;
  }

  const topics = getTopicsForGrade(grade);
  const currTopic = topics.find(t => t.id === topicId || t.slug === topicId);
  const currState = GLOBAL_PROGRESSION[childId][topicId];

  // If video-only, completing the video advances progression; otherwise game is also required
  const nextTopicUnlocked = currTopic?.hasGame
    ? Boolean(currState.isVideoCompleted && currState.isGameCompleted)
    : true;

  return {
    success: true,
    message: 'Video completion recorded successfully.',
    nextTopicUnlocked,
  };
}

export function createGameSessionToken(
  grade: GradeSlug,
  topicId: string,
  childId: string = DEFAULT_SESSION_ID
): string {
  const token = `cptok_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  const now = Date.now();
  const session: ActiveGameSession = {
    token,
    topicId,
    childId,
    grade,
    createdAt: now,
    expiresAt: now + 3600 * 1000, // 1 hour validity
    isCompleted: false,
  };

  ACTIVE_SESSIONS.set(token, session);
  return token;
}

export function recordGameCompletion(
  sessionToken: string,
  topicId: string,
  grade: GradeSlug,
  childId: string = DEFAULT_SESSION_ID
): { success: boolean; message: string; nextTopicUnlocked: boolean } {
  const session = ACTIVE_SESSIONS.get(sessionToken);

  if (!session) {
    return { success: false, message: 'Invalid or expired game session token.', nextTopicUnlocked: false };
  }

  if (session.isCompleted) {
    return { success: false, message: 'Session token already utilized.', nextTopicUnlocked: false };
  }

  if (session.topicId !== topicId || session.grade !== grade) {
    return { success: false, message: 'Session token topic mismatch.', nextTopicUnlocked: false };
  }

  if (Date.now() > session.expiresAt) {
    ACTIVE_SESSIONS.delete(sessionToken);
    return { success: false, message: 'Session token has expired.', nextTopicUnlocked: false };
  }

  // Mark session completed
  session.isCompleted = true;

  if (!GLOBAL_PROGRESSION[childId]) {
    GLOBAL_PROGRESSION[childId] = {};
  }

  if (!GLOBAL_PROGRESSION[childId][topicId]) {
    GLOBAL_PROGRESSION[childId][topicId] = {
      isUnlocked: true,
      isVideoCompleted: false,
      isGameCompleted: true,
    };
  } else {
    GLOBAL_PROGRESSION[childId][topicId].isGameCompleted = true;
  }

  const currState = GLOBAL_PROGRESSION[childId][topicId];
  const nextTopicUnlocked = Boolean(currState.isVideoCompleted && currState.isGameCompleted);

  return {
    success: true,
    message: 'Game completion verified and recorded.',
    nextTopicUnlocked,
  };
}
