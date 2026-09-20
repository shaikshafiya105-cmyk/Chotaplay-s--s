import { LETTERS_DATA } from '../../data/letters.ts';
import { GameStateEnum } from '../GameState.ts';
import { SaveManager } from '../core/SaveManager.ts';

export interface DebugPanelCallbacks {
  onJumpLetter: (letterId: string) => void;
  onInstantComplete: () => void;
  onResetSave: () => void;
  onUnlockAll: () => void;
}

export class DebugPanel {
  private container: HTMLElement;
  private stateText: HTMLElement;
  private letterText: HTMLElement;
  private fpsText: HTMLElement;
  private letterSelect: HTMLSelectElement;
  private btnClose: HTMLButtonElement;
  private btnComplete: HTMLButtonElement;
  private btnReset: HTMLButtonElement;
  private btnUnlockAll: HTMLButtonElement;

  private frameCount: number = 0;
  private lastFpsTime: number = performance.now();

  constructor(saveManager: SaveManager, callbacks: DebugPanelCallbacks) {
    this.container = document.getElementById('debug-panel') as HTMLElement;
    this.stateText = document.getElementById('debug-state') as HTMLElement;
    this.letterText = document.getElementById('debug-letter') as HTMLElement;
    this.fpsText = document.getElementById('debug-fps') as HTMLElement;
    this.letterSelect = document.getElementById('debug-letter-select') as HTMLSelectElement;
    this.btnClose = document.getElementById('btn-close-debug') as HTMLButtonElement;
    this.btnComplete = document.getElementById('btn-debug-complete') as HTMLButtonElement;
    this.btnReset = document.getElementById('btn-debug-reset') as HTMLButtonElement;
    this.btnUnlockAll = document.getElementById('btn-debug-unlock-all') as HTMLButtonElement;

    // Populate letter selector
    if (this.letterSelect) {
      this.letterSelect.innerHTML = '';
      LETTERS_DATA.forEach(cfg => {
        const opt = document.createElement('option');
        opt.value = cfg.id;
        opt.textContent = `${cfg.uppercase} ${cfg.lowercase} (${cfg.word})`;
        this.letterSelect.appendChild(opt);
      });

      this.letterSelect.addEventListener('change', () => {
        callbacks.onJumpLetter(this.letterSelect.value);
      });
    }

    if (this.btnClose) this.btnClose.addEventListener('click', () => this.toggle());
    if (this.btnComplete) this.btnComplete.addEventListener('click', callbacks.onInstantComplete);
    if (this.btnReset) this.btnReset.addEventListener('click', () => {
      saveManager.resetProgress();
      callbacks.onResetSave();
    });
    if (this.btnUnlockAll) this.btnUnlockAll.addEventListener('click', () => {
      saveManager.unlockAllLetters(LETTERS_DATA.map(l => l.id));
      callbacks.onUnlockAll();
    });

    this.startFpsTracker();
  }

  public toggle(): void {
    this.container.classList.toggle('hidden');
  }

  public updateState(state: GameStateEnum): void {
    if (this.stateText) this.stateText.textContent = state;
  }

  public updateCurrentLetter(letterId: string): void {
    if (this.letterText) this.letterText.textContent = letterId;
    if (this.letterSelect) this.letterSelect.value = letterId;
  }

  private startFpsTracker(): void {
    const calcFps = () => {
      this.frameCount++;
      const now = performance.now();
      if (now - this.lastFpsTime >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
        if (this.fpsText) this.fpsText.textContent = `${fps}`;
        this.frameCount = 0;
        this.lastFpsTime = now;
      }
      requestAnimationFrame(calcFps);
    };
    requestAnimationFrame(calcFps);
  }
}
