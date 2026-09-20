import { LETTERS_DATA } from '../../data/letters.ts';
import { SaveManager } from '../core/SaveManager.ts';

export class LetterCollection {
  private drawerContainer: HTMLElement;
  private gridContainer: HTMLElement;
  private closeBtn: HTMLButtonElement;
  private backdrop: HTMLElement;
  private progressFill: HTMLElement;
  private unlockedText: HTMLElement;
  private saveManager: SaveManager;
  private onSelectLetterCallback?: (letterId: string) => void;

  constructor(saveManager: SaveManager) {
    this.saveManager = saveManager;
    this.drawerContainer = document.getElementById('collection-drawer') as HTMLElement;
    this.gridContainer = document.getElementById('letter-grid') as HTMLElement;
    this.closeBtn = document.getElementById('btn-close-drawer') as HTMLButtonElement;
    this.backdrop = document.getElementById('drawer-backdrop') as HTMLElement;
    this.progressFill = document.getElementById('collection-progress-fill') as HTMLElement;
    this.unlockedText = document.getElementById('unlocked-count-text') as HTMLElement;

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());
  }

  public onSelectLetter(cb: (letterId: string) => void): void {
    this.onSelectLetterCallback = cb;
  }

  public open(): void {
    this.renderGrid();
    this.drawerContainer.classList.remove('hidden');
  }

  public close(): void {
    this.drawerContainer.classList.add('hidden');
  }

  public isOpen(): boolean {
    return !this.drawerContainer.classList.contains('hidden');
  }

  public renderGrid(): void {
    const unlocked = this.saveManager.getUnlockedLetters();
    const count = unlocked.length;
    const total = LETTERS_DATA.length;

    if (this.progressFill) {
      this.progressFill.style.width = `${Math.round((count / total) * 100)}%`;
    }
    if (this.unlockedText) {
      this.unlockedText.textContent = `${count} of ${total} Letter Pairs Unlocked`;
    }

    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';

    LETTERS_DATA.forEach(config => {
      const isUnlocked = this.saveManager.isLetterUnlocked(config.id);
      const card = document.createElement('div');
      card.className = `letter-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Letter ${config.uppercase} ${config.lowercase}`);

      card.innerHTML = `
        <div class="card-chars">${config.uppercase} ${config.lowercase}</div>
        ${isUnlocked ? '<div class="card-badge-star">⭐</div>' : '<div class="card-badge-star">🔒</div>'}
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.close();
          if (this.onSelectLetterCallback) {
            this.onSelectLetterCallback(config.id);
          }
        });
      }

      this.gridContainer.appendChild(card);
    });
  }
}
