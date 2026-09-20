import { LetterConfig } from '../../data/letters.ts';

export interface CelebrationCallbacks {
  onReplay: () => void;
  onNextLetter: () => void;
}

export class CelebrationOverlay {
  private container: HTMLElement;
  private pairBigChar: HTMLElement;
  private pairSmallChar: HTMLElement;
  private wordText: HTMLElement;
  private quoteText: HTMLElement;
  private btnReplay: HTMLButtonElement;
  private btnNext: HTMLButtonElement;

  constructor(callbacks: CelebrationCallbacks) {
    this.container = document.getElementById('celebration-overlay') as HTMLElement;
    this.pairBigChar = document.querySelector('.pair-big') as HTMLElement;
    this.pairSmallChar = document.querySelector('.pair-small') as HTMLElement;
    this.wordText = document.getElementById('showcase-word') as HTMLElement;
    this.quoteText = document.getElementById('celebration-voice-quote') as HTMLElement;
    this.btnReplay = document.getElementById('btn-replay-level') as HTMLButtonElement;
    this.btnNext = document.getElementById('btn-next-letter') as HTMLButtonElement;

    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => {
        this.hide();
        callbacks.onReplay();
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        this.hide();
        callbacks.onNextLetter();
      });
    }
  }

  public show(letter: LetterConfig, nextLetter?: LetterConfig): void {
    if (this.pairBigChar) this.pairBigChar.textContent = letter.uppercase;
    if (this.pairSmallChar) this.pairSmallChar.textContent = letter.lowercase;
    if (this.wordText) this.wordText.textContent = `"${letter.uppercase}" as in "${letter.word}"! ${letter.wordEmoji}`;
    if (this.quoteText) this.quoteText.textContent = letter.successQuote;

    if (this.btnReplay) {
      this.btnReplay.querySelector('span')!.textContent = `🔄 Replay ${letter.uppercase}`;
    }

    if (this.btnNext) {
      if (nextLetter) {
        this.btnNext.querySelector('span')!.textContent = `Discover ${nextLetter.uppercase} Room ➔`;
        this.btnNext.style.display = 'flex';
      } else {
        this.btnNext.querySelector('span')!.textContent = `🌟 Collection Complete!`;
        this.btnNext.style.display = 'flex';
      }
    }

    this.container.classList.remove('hidden');
  }

  public hide(): void {
    this.container.classList.add('hidden');
  }
}
