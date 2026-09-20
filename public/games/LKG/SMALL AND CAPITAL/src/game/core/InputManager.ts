export type KeyHandler = (key: string) => void;

export class InputManager {
  private isInteractionLocked: boolean = false;
  private keyListeners: KeyHandler[] = [];

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public setInteractionLocked(locked: boolean): void {
    this.isInteractionLocked = locked;
  }

  public getIsInteractionLocked(): boolean {
    return this.isInteractionLocked;
  }

  public onKeyPress(handler: KeyHandler): () => void {
    this.keyListeners.push(handler);
    return () => {
      this.keyListeners = this.keyListeners.filter(h => h !== handler);
    };
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    // Ignore input if focused in text fields
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
      return;
    }

    const key = e.key.toUpperCase();
    for (const handler of this.keyListeners) {
      try {
        handler(key);
      } catch (err) {
        console.error('[InputManager] Key listener error:', err);
      }
    }
  };

  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.keyListeners = [];
  }
}
