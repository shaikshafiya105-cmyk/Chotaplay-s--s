export enum GameStateEnum {
  BOOT = 'BOOT',
  INTRO = 'INTRO',
  EXPLORE = 'EXPLORE',
  LETTER_DISCOVERED = 'LETTER_DISCOVERED',
  SEARCH_PARTNER = 'SEARCH_PARTNER',
  PARTNER_FOUND = 'PARTNER_FOUND',
  MATCHING = 'MATCHING',
  TRANSFORMATION = 'TRANSFORMATION',
  CELEBRATION = 'CELEBRATION',
  UNLOCK = 'UNLOCK',
  LETTER_GALLERY = 'LETTER_GALLERY'
}

export type StateChangeCallback = (newState: GameStateEnum, oldState: GameStateEnum) => void;

export class GameStateManager {
  private currentState: GameStateEnum = GameStateEnum.BOOT;
  private listeners: StateChangeCallback[] = [];

  public getState(): GameStateEnum {
    return this.currentState;
  }

  public setState(nextState: GameStateEnum): void {
    if (this.currentState === nextState) return;
    const previous = this.currentState;
    this.currentState = nextState;
    console.log(`[GameState] ${previous} ➔ ${nextState}`);
    this.notify(nextState, previous);
  }

  public onStateChange(cb: StateChangeCallback): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(newState: GameStateEnum, oldState: GameStateEnum): void {
    for (const listener of this.listeners) {
      try {
        listener(newState, oldState);
      } catch (err) {
        console.error('[GameState] Error in state listener:', err);
      }
    }
  }
}
