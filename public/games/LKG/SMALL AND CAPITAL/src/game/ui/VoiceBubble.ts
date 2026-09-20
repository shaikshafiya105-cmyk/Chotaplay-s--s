export class VoiceBubble {
  private container: HTMLElement;
  private textElement: HTMLElement;
  private replayBtn: HTMLButtonElement;
  private onReplayCallback?: () => void;

  constructor() {
    this.container = document.getElementById('voice-bubble') as HTMLElement;
    this.textElement = document.getElementById('voice-text') as HTMLElement;
    this.replayBtn = document.getElementById('btn-replay-voice') as HTMLButtonElement;

    if (this.replayBtn) {
      this.replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onReplayCallback) {
          this.onReplayCallback();
        }
      });
    }
  }

  public setText(text: string): void {
    if (this.textElement) {
      this.textElement.textContent = text;
    }
    // Subtle visual bounce
    this.container.classList.remove('pulse-action');
    void this.container.offsetWidth; // trigger reflow
    this.container.classList.add('pulse-action');
  }

  public onReplay(cb: () => void): void {
    this.onReplayCallback = cb;
  }
}
