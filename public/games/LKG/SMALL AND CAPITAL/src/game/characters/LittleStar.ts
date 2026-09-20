export type StarState = 'floating' | 'hinting' | 'celebrating' | 'curious';

export class LittleStar {
  private container: HTMLElement;
  private currentState: StarState = 'floating';

  constructor(containerId: string = 'little-star') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`LittleStar container #${containerId} not found`);
    }
    this.container = el;
    this.setupInteractivity();
    this.setState('floating');
  }

  public setState(state: StarState): void {
    this.currentState = state;
    this.container.className = `character-star star-${state}`;
  }

  public getState(): StarState {
    return this.currentState;
  }

  public moveTo(xPercent: number, yPx: number): void {
    this.container.style.left = `${xPercent}%`;
    this.container.style.bottom = `${yPx}px`;
  }

  public guideTowards(targetXPercent: number, targetYPx: number): void {
    this.setState('hinting');
    this.moveTo(targetXPercent, targetYPx + 80);
    setTimeout(() => {
      if (this.currentState === 'hinting') {
        this.setState('floating');
      }
    }, 2000);
  }

  public celebrate(): void {
    this.setState('celebrating');
  }

  private setupInteractivity(): void {
    this.container.addEventListener('pointerdown', () => {
      this.playTapReaction();
    });
  }

  public playTapReaction(): void {
    const prev = this.currentState;
    this.setState('celebrating');
    setTimeout(() => {
      this.setState(prev === 'celebrating' ? 'floating' : prev);
    }, 1200);
  }
}
