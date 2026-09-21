import { CurriculumTopic, GradeSlug } from './types';

export const LKG_TOPICS: CurriculumTopic[] = [
  { id: 'lkg-01', index: 1, slug: 'alphabets', title: 'Alphabets', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/ALPHABETS.mp4', gamePath: '/games/LKG/alphabets%20-%20Copy/index.html', isUnlockedDefault: true },
  { id: 'lkg-02', index: 2, slug: 'rhyme', title: 'Rhyme', grade: 'lkg', hasGame: false, videoSrc: '/videos/LKG/Rhyme.mp4' },
  { id: 'lkg-03', index: 3, slug: 'story', title: 'Story', grade: 'lkg', hasGame: false, videoSrc: '/videos/LKG/lazy%20lion%20story.mp4' },
  { id: 'lkg-04', index: 4, slug: 'lines', title: 'Lines', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Line%20Concepts.mp4', gamePath: '/games/LKG/LINES%20CONCEPTS/index.html' },
  { id: 'lkg-05', index: 5, slug: 'curves', title: 'Curves', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Curves%20.mp4', gamePath: '/games/LKG/CURVES/index.html' },
  { id: 'lkg-06', index: 6, slug: 'comparison', title: 'Comparison', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/BIG%20AND%20SMALL.mp4', gamePath: '/games/LKG/COMPARISON/index.html' },
  { id: 'lkg-07', index: 7, slug: 'senses', title: 'Senses', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Senses.mp4', gamePath: '/games/LKG/Seneses/index.html' },
  { id: 'lkg-08', index: 8, slug: 'special-person', title: 'Special Person Called Me', grade: 'lkg', hasGame: false, videoSrc: '/videos/LKG/Special%20Person%20Called%20Me.mp4' },
  { id: 'lkg-09', index: 9, slug: 'school-is-fun', title: 'School Is Fun', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/School%20is%20fun.mp4', gamePath: '/games/LKG/school/index.html' },
  { id: 'lkg-10', index: 10, slug: 'colours', title: 'Colours', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Fun%20With%20Colours.mp4', gamePath: '/games/LKG/COLOURS/index.html' },
  { id: 'lkg-12', index: 11, slug: 'good-habits', title: 'Good Habits', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Good%20Habits.mp4', gamePath: '/games/LKG/habits/index.html' },
  { id: 'lkg-13', index: 12, slug: 'transport', title: 'Transport', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Transport%20Around%20Us.mp4', gamePath: '/games/LKG/Transport/index.html' },
  { id: 'lkg-14', index: 13, slug: 'difference', title: 'Difference', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/TALL%20AND%20SHORT.mp4', gamePath: '/games/LKG/COMPARISON/index.html' },
  { id: 'lkg-15', index: 14, slug: 'zero', title: 'Zero', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/understanding%20zero.mp4', gamePath: '/games/LKG/ZERO/index.html' },
  { id: 'lkg-16', index: 15, slug: 'letters-words', title: 'Letters & Words', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Letters%20And%20Words.mp4', gamePath: '/games/LKG/SMALL%20AND%20CAPITAL/dist/index.html' },
  { id: 'lkg-17', index: 16, slug: 'clothes', title: 'Clothes', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Clothes%20We%20Wear.mp4', gamePath: '/games/LKG/clothes/index.html' },
  { id: 'lkg-18', index: 17, slug: 'counting-numbers', title: 'Counting Numbers', grade: 'lkg', hasGame: true, videoSrc: '/videos/LKG/Counting%20Numbers.mp4', gamePath: '/games/LKG/NUMBERS/index.html' },
];

export const UKG_TOPICS: CurriculumTopic[] = [
  { id: 'ukg-01', index: 1, slug: 'vowels', title: 'Vowels', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/VOWELS.mp4', gamePath: '/games/ukg/vowels/index.html', isUnlockedDefault: true },
  { id: 'ukg-02', index: 2, slug: 'alphabets', title: 'Alphabets', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/ALPHABETS.mp4', gamePath: '/games/ukg/alphabets%20-%20Copy/index.html' },
  { id: 'ukg-03', index: 3, slug: 'add-with-fingers', title: 'Add With Fingers', grade: 'ukg', hasGame: false, videoSrc: '/videos/UKG/ADD%20WITH%20FINGERS.mp4' },
  { id: 'ukg-04', index: 4, slug: 'pronouns', title: 'Pronouns', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/i%20and%20u.mp4', gamePath: '/games/ukg/PRONOUNS/index.html' },
  { id: 'ukg-06', index: 5, slug: 'clothes', title: 'Clothes', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/Clothes%20We%20Wear.mp4', gamePath: '/games/ukg/clothes/index.html' },
  { id: 'ukg-07', index: 6, slug: 'comparison', title: 'Comparison', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/TALL%20AND%20SHORT.mp4', gamePath: '/games/ukg/COMPARISON/index.html' },
  { id: 'ukg-08', index: 7, slug: 'letters-words', title: 'Letters & Words', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/Letters%20And%20Words.mp4', gamePath: '/games/ukg/alphabets%20-%20Copy/index.html' },
  { id: 'ukg-09', index: 8, slug: 'numbers', title: 'Numbers', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/NUMBER%20NAMES.mp4', gamePath: '/games/ukg/NUMBERS/index.html' },
  { id: 'ukg-10', index: 9, slug: 'right-wrong', title: 'Right & Wrong', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/Right%20And%20Wrong.mp4', gamePath: '/games/ukg/Right%20and%20wrong/index.html' },
  { id: 'ukg-11', index: 10, slug: 'school', title: 'School', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/School%20is%20fun.mp4', gamePath: '/games/ukg/school/index.html' },
  { id: 'ukg-12', index: 11, slug: 'senses', title: 'Senses', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/Senses.mp4', gamePath: '/games/ukg/Seneses/index.html' },
  { id: 'ukg-13', index: 12, slug: 'shapes', title: 'Shapes', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/Shapes%20.mp4', gamePath: '/games/ukg/SHAPES/index.html' },
  { id: 'ukg-14', index: 13, slug: 'smart-parrot', title: 'Smart Parrot', grade: 'ukg', hasGame: false, videoSrc: '/videos/UKG/Smart%20parrot.mp4' },
  { id: 'ukg-15', index: 14, slug: 'thirsty-crow', title: 'Thirsty Crow', grade: 'ukg', hasGame: false, videoSrc: '/videos/UKG/Thirsty%20crow.mp4' },
  { id: 'ukg-16', index: 15, slug: 'special-person', title: 'Special Person Called Me', grade: 'ukg', hasGame: false, videoSrc: '/videos/UKG/Special%20person%20called%20me.mp4' },
  { id: 'ukg-17', index: 16, slug: 'understanding-zero', title: 'Understanding Zero', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/understanding%20zero.mp4', gamePath: '/games/ukg/ZERO/index.html' },
  { id: 'ukg-18', index: 17, slug: 'between-after-numbers', title: 'Between & After Numbers', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/BETWEEN%20AND%20AFTER%20NUMBERS.mp4', gamePath: '/games/ukg/BEFORE%20AND%20AFTER/index.html' },
  { id: 'ukg-19', index: 18, slug: 'these-those', title: 'These & Those', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/this%20and%20that.mp4', gamePath: '/games/ukg/MANY%20GAME/index.html' },
  { id: 'ukg-20', index: 19, slug: 'big-small', title: 'Big & Small', grade: 'ukg', hasGame: true, videoSrc: '/videos/UKG/BIG%20AND%20SMALL.mp4', gamePath: '/games/ukg/small%20%20to%20big/index.html' },
];

export const FIRST_CLASS_TOPICS: CurriculumTopic[] = [
  { id: 'first-02', index: 1, slug: 'counting', title: 'Counting', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Counting.mp4', gamePath: '/games/1st%20Class/counting/index.html', isUnlockedDefault: true },
  { id: 'first-03', index: 2, slug: 'colours', title: 'Colours', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Colours.mp4', gamePath: '/games/1st%20Class/COLOURS/COLOURS/final%20-%20colour%20game.html' },
  { id: 'first-04', index: 3, slug: 'safety-rules', title: 'Safety Rules', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Safety%20rules.mp4', gamePath: '/games/1st%20Class/safety%20rules/index.html' },
  { id: 'first-05', index: 4, slug: 'animals-birds', title: 'Animals & Birds', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Animals%20and%20Birds.mp4', gamePath: '/games/1st%20Class/animals/index.html' },
  { id: 'first-06', index: 5, slug: 'fruits-vegetables', title: 'Fruits & Vegetables', grade: 'first', hasGame: false, videoSrc: '/videos/1st%20class/Vegetables%20and%20Fruits.mp4' },
  { id: 'first-07', index: 6, slug: 'jumbled-words', title: 'Jumbled Words', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Jumbled%20Words.mp4', gamePath: '/games/1st%20Class/jumbled%20words/index.html' },
  { id: 'first-08', index: 7, slug: 'punctuation', title: 'Punctuation', grade: 'first', hasGame: false, videoSrc: '/videos/1st%20class/Punctation.mp4' },
  { id: 'first-09', index: 8, slug: 'computer-parts', title: 'Computer & Parts', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Computer%20and%20Parts.mp4', gamePath: '/games/1st%20Class/computer%20and%20parts/index.html' },
  { id: 'first-10', index: 9, slug: 'helpers-around-us', title: 'Helpers Around Us', grade: 'first', hasGame: true, videoSrc: '/videos/1st%20class/Helpers%20Around%20Us.mp4', gamePath: '/games/1st%20Class/helpers%20around%20me/index.html' },
];

export const ACTIVITIES_TOPICS: CurriculumTopic[] = [
  { id: 'act-01', index: 1, slug: 'alphabets', title: 'Alphabets', grade: 'activities', hasGame: true, videoSrc: '/videos/LKG/ALPHABETS.mp4', gamePath: '/games/LKG/alphabets%20-%20Copy/index.html', isUnlockedDefault: true },
  { id: 'act-02', index: 2, slug: 'lines', title: 'Lines', grade: 'activities', hasGame: true, videoSrc: '/videos/LKG/Line%20Concepts.mp4', gamePath: '/games/LKG/LINES%20CONCEPTS/index.html' },
  { id: 'act-03', index: 3, slug: 'curves', title: 'Curves', grade: 'activities', hasGame: true, videoSrc: '/videos/LKG/Curves%20.mp4', gamePath: '/games/LKG/CURVES/index.html' },
  { id: 'act-04', index: 4, slug: 'colours', title: 'Colours', grade: 'activities', hasGame: true, videoSrc: '/videos/LKG/Fun%20With%20Colours.mp4', gamePath: '/games/LKG/COLOURS/index.html' },
  { id: 'act-05', index: 5, slug: 'senses', title: 'Senses', grade: 'activities', hasGame: true, videoSrc: '/videos/LKG/Senses.mp4', gamePath: '/games/LKG/Seneses/index.html' },
  { id: 'act-06', index: 6, slug: 'shapes', title: 'Shapes', grade: 'activities', hasGame: true, videoSrc: '/videos/UKG/Shapes%20.mp4', gamePath: '/games/ukg/SHAPES/index.html' },
  { id: 'act-08', index: 7, slug: 'fruits-vegetables', title: 'Fruits & Vegetables', grade: 'activities', hasGame: false, videoSrc: '/videos/1st%20class/Vegetables%20and%20Fruits.mp4' },
  { id: 'act-09', index: 8, slug: 'thirsty-crow', title: 'Thirsty Crow', grade: 'activities', hasGame: false, videoSrc: '/videos/UKG/Thirsty%20crow.mp4' },
  { id: 'act-10', index: 9, slug: 'animals-birds', title: 'Animals & Birds', grade: 'activities', hasGame: false, videoSrc: '/videos/1st%20class/Animals%20and%20Birds.mp4' },
];

export const EXPLORE_TOPICS: CurriculumTopic[] = [
  { id: 'exp-01', index: 1, slug: 'good-manners', title: 'Good Manners', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/GOOD%20MANNERS.mp4', isUnlockedDefault: true },
  { id: 'exp-02', index: 2, slug: 'physical', title: 'Physical', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/Physical.mp4' },
  { id: 'exp-03', index: 3, slug: 'politics', title: 'Politics', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/poltics.mp4' },
  { id: 'exp-04', index: 4, slug: 'dance', title: 'Dance', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/Dance.mp4' },
  { id: 'exp-05', index: 5, slug: 'sports', title: 'Sports', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/sports.mp4' },
  { id: 'exp-06', index: 6, slug: 'space', title: 'Space', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/Space.mp4' },
  { id: 'exp-07', index: 7, slug: 'internet', title: 'Internet', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/INTERNET.mp4' },
  { id: 'exp-08', index: 8, slug: 'robot', title: 'Robot', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/ROBOT.mp4' },
  { id: 'exp-09', index: 9, slug: 'magic-ball', title: 'Magic Ball', grade: 'explore', hasGame: false, videoSrc: '/videos/Explore/LOGICAL%20THINK.mp4' },
];

export const ALL_CURRICULUM: Record<GradeSlug, CurriculumTopic[]> = {
  lkg: LKG_TOPICS,
  ukg: UKG_TOPICS,
  first: FIRST_CLASS_TOPICS,
  activities: ACTIVITIES_TOPICS,
  explore: EXPLORE_TOPICS,
};

export function getTopicsForGrade(grade: GradeSlug): CurriculumTopic[] {
  return ALL_CURRICULUM[grade] || [];
}

export function getTopicById(grade: GradeSlug, topicId: string): CurriculumTopic | undefined {
  const topics = getTopicsForGrade(grade);
  let found = topics.find(t => t.id === topicId || t.slug === topicId);
  if (!found) {
    // Cross-search in all curriculum categories
    for (const cat of Object.values(ALL_CURRICULUM)) {
      found = cat.find(t => t.id === topicId || t.slug === topicId);
      if (found) break;
    }
  }
  return found;
}

