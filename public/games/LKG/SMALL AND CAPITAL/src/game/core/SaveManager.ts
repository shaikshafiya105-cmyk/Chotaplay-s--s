const SAVE_KEY = 'chotaplay_letter_magic_save_v1';

export interface SaveData {
  unlockedLetters: string[];
  currentLetterId: string;
  totalStars: number;
  lastPlayedTimestamp: number;
}

export class SaveManager {
  private data: SaveData;

  constructor() {
    this.data = this.load();
  }

  public load(): SaveData {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.unlockedLetters)) {
          return {
            unlockedLetters: parsed.unlockedLetters,
            currentLetterId: parsed.currentLetterId || 'A',
            totalStars: parsed.totalStars || parsed.unlockedLetters.length * 3,
            lastPlayedTimestamp: Date.now()
          };
        }
      }
    } catch (e) {
      console.warn('[SaveManager] Failed to read localStorage:', e);
    }

    return {
      unlockedLetters: ['A'], // Default starts with A available
      currentLetterId: 'A',
      totalStars: 0,
      lastPlayedTimestamp: Date.now()
    };
  }

  public save(): void {
    try {
      this.data.lastPlayedTimestamp = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('[SaveManager] Failed to write localStorage:', e);
    }
  }

  public isLetterUnlocked(letterId: string): boolean {
    return this.data.unlockedLetters.includes(letterId);
  }

  public unlockLetter(letterId: string): boolean {
    if (!this.data.unlockedLetters.includes(letterId)) {
      this.data.unlockedLetters.push(letterId);
      this.data.totalStars += 3;
      this.save();
      return true;
    }
    return false;
  }

  public getUnlockedLetters(): string[] {
    return [...this.data.unlockedLetters];
  }

  public getCurrentLetterId(): string {
    return this.data.currentLetterId;
  }

  public setCurrentLetterId(id: string): void {
    this.data.currentLetterId = id;
    this.save();
  }

  public resetProgress(): void {
    this.data = {
      unlockedLetters: ['A'],
      currentLetterId: 'A',
      totalStars: 0,
      lastPlayedTimestamp: Date.now()
    };
    this.save();
  }

  public unlockAllLetters(allLetterIds: string[]): void {
    this.data.unlockedLetters = [...allLetterIds];
    this.data.totalStars = allLetterIds.length * 3;
    this.save();
  }
}
