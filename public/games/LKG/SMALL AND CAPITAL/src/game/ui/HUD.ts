export interface HUDCallbacks {
  onHome: () => void;
  onOpenCollection: () => void;
  onToggleSound: () => void;
  onToggleDebug: () => void;
}

export class HUD {
  private roomLetterText: HTMLElement;
  private collectionBadge: HTMLElement;
  private soundIcon: HTMLElement;
  private btnHome: HTMLButtonElement;
  private btnCollection: HTMLButtonElement;
  private btnSound: HTMLButtonElement;
  private btnDebug: HTMLButtonElement;

  constructor(callbacks: HUDCallbacks) {
    this.roomLetterText = document.getElementById('hud-letter-name') as HTMLElement;
    this.collectionBadge = document.getElementById('collection-count-badge') as HTMLElement;
    this.soundIcon = document.getElementById('sound-icon') as HTMLElement;

    this.btnHome = document.getElementById('btn-home') as HTMLButtonElement;
    this.btnCollection = document.getElementById('btn-collection') as HTMLButtonElement;
    this.btnSound = document.getElementById('btn-sound-toggle') as HTMLButtonElement;
    this.btnDebug = document.getElementById('btn-debug-toggle') as HTMLButtonElement;

    if (this.btnHome) this.btnHome.addEventListener('click', callbacks.onHome);
    if (this.btnCollection) this.btnCollection.addEventListener('click', callbacks.onOpenCollection);
    if (this.btnSound) this.btnSound.addEventListener('click', callbacks.onToggleSound);
    if (this.btnDebug) this.btnDebug.addEventListener('click', callbacks.onToggleDebug);
  }

  public setRoomLetter(uppercase: string, lowercase: string): void {
    if (this.roomLetterText) {
      this.roomLetterText.textContent = `${uppercase} ${lowercase}`;
    }
  }

  public setCollectionProgress(unlockedCount: number, totalLetters: number = 26): void {
    if (this.collectionBadge) {
      this.collectionBadge.textContent = `${unlockedCount}/${totalLetters}`;
    }
  }

  public updateSoundIcon(isMuted: boolean): void {
    if (this.soundIcon) {
      this.soundIcon.textContent = isMuted ? '🔇' : '🎵';
    }
  }
}
