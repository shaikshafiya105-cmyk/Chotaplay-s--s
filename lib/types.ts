export type GradeSlug = 'lkg' | 'ukg' | 'first' | 'activities' | 'explore';

export interface CurriculumTopic {
  id: string;
  index: number;
  slug: string;
  title: string;
  grade: GradeSlug;
  hasGame: boolean;
  videoSrc: string;
  gamePath?: string;
  isUnlockedDefault?: boolean;
}

export interface TopicLockState {
  topicId: string;
  isUnlocked: boolean;
  isVideoCompleted: boolean;
  isGameCompleted: boolean;
}

export interface ParentChildProfile {
  kidName: string;
  kidId: string;
  kidAge: number;
  kidGender: 'boy' | 'girl';
}

export interface GameSessionToken {
  token: string;
  topicId: string;
  childId: string;
  expiresAt: number;
}
