import { Game } from './game/Game.ts';

// Bootstrap game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  try {
    const game = new Game();
    // Expose game instance globally for debugging or external triggers
    (window as unknown as { __MAGIC_GAME__: Game }).__MAGIC_GAME__ = game;
    console.log("✨ [ChotaPlay] Riya's Letter Magic Lab initialized successfully!");
  } catch (err) {
    console.error("❌ Failed to initialize game:", err);
  }
});
