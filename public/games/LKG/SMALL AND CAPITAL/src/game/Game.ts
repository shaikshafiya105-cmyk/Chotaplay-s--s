import { LETTERS_DATA, LetterConfig } from '../data/letters.ts';
import { GameStateManager } from './GameState.ts';
import { AudioManager } from './core/AudioManager.ts';
import { ParticleManager } from './core/ParticleManager.ts';
import { SaveManager } from './core/SaveManager.ts';
import { InputManager } from './core/InputManager.ts';
import { RiyaCharacter } from './characters/Riya.ts';
import { LittleStar } from './characters/LittleStar.ts';
import { HUD } from './ui/HUD.ts';
import { VoiceBubble } from './ui/VoiceBubble.ts';
import { LetterCollection } from './ui/LetterCollection.ts';
import { CelebrationOverlay } from './ui/CelebrationOverlay.ts';
import { DebugPanel } from './ui/DebugPanel.ts';
import { LetterChallenge } from './letters/LetterChallenge.ts';

export class Game {
  private stateManager: GameStateManager;
  private audioManager: AudioManager;
  private particleManager: ParticleManager;
  private saveManager: SaveManager;
  private inputManager: InputManager;

  private riya: RiyaCharacter;
  private star: LittleStar;

  private hud: HUD;
  private voiceBubble: VoiceBubble;
  private collectionDrawer: LetterCollection;
  private celebrationOverlay: CelebrationOverlay;
  private debugPanel: DebugPanel;

  private currentLetterConfig: LetterConfig;
  private currentChallenge: LetterChallenge | null = null;

  constructor() {
    // 1. Core Systems
    this.stateManager = new GameStateManager();
    this.audioManager = new AudioManager();
    this.saveManager = new SaveManager();
    this.inputManager = new InputManager();

    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    this.particleManager = new ParticleManager(canvas);

    // 2. Characters
    this.riya = new RiyaCharacter('riya-character');
    this.riya.onClick(() => {
      this.audioManager.playTwinkle();
      const riyaQuotes = [
        "Hi! I'm Riya! Let's find magic letter partners!",
        "You are doing so wonderfully!",
        "Letters are full of magical surprises!",
        "Look around the laboratory for more clues!"
      ];
      const quote = riyaQuotes[Math.floor(Math.random() * riyaQuotes.length)];
      this.voiceBubble.setText(quote);
      this.audioManager.speak(quote);
    });

    this.star = new LittleStar('little-star');

    // 3. UI
    this.voiceBubble = new VoiceBubble();
    this.voiceBubble.onReplay(() => {
      this.audioManager.replayLastVoice();
    });

    this.hud = new HUD({
      onHome: () => this.showStartScreen(),
      onOpenCollection: () => this.collectionDrawer.open(),
      onToggleSound: () => {
        const isMuted = this.audioManager.toggleMute();
        this.hud.updateSoundIcon(isMuted);
      },
      onToggleDebug: () => this.debugPanel.toggle()
    });

    this.collectionDrawer = new LetterCollection(this.saveManager);
    this.collectionDrawer.onSelectLetter((letterId) => {
      this.loadLetter(letterId);
    });

    this.celebrationOverlay = new CelebrationOverlay({
      onReplay: () => this.replayCurrentLetter(),
      onNextLetter: () => this.goToNextLetter()
    });

    this.debugPanel = new DebugPanel(this.saveManager, {
      onJumpLetter: (id) => this.loadLetter(id),
      onInstantComplete: () => {
        if (this.currentChallenge) this.currentChallenge.instantComplete();
      },
      onResetSave: () => {
        this.updateHUDProgress();
        this.loadLetter('A');
      },
      onUnlockAll: () => {
        this.updateHUDProgress();
        this.collectionDrawer.renderGrid();
      }
    });

    // 4. Initial Letter
    const currentId = this.saveManager.getCurrentLetterId();
    this.currentLetterConfig = LETTERS_DATA.find(l => l.id === currentId) || LETTERS_DATA[0];

    this.setupStateTracking();
    this.setupDeveloperHotkeys();
    this.setupStartScreen();
    this.updateHUDProgress();
  }

  private setupStateTracking(): void {
    this.stateManager.onStateChange((newState) => {
      this.debugPanel.updateState(newState);
    });
  }

  private setupDeveloperHotkeys(): void {
    this.inputManager.onKeyPress((key) => {
      if (key === 'D') {
        this.debugPanel.toggle();
      } else if (key === 'A') {
        this.loadLetter('A');
      } else if (key === 'N') {
        this.goToNextLetter();
      } else if (key === 'R') {
        this.saveManager.resetProgress();
        this.updateHUDProgress();
        this.loadLetter('A');
      }
    });
  }

  private setupStartScreen(): void {
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('btn-start-game');

    if (startBtn && startScreen) {
      startBtn.addEventListener('click', () => {
        this.audioManager.initAudioContext();
        this.audioManager.playCelebrationFanfare();
        startScreen.classList.add('hidden');
        this.startGameSession();
      });
    }
  }

  public showStartScreen(): void {
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
      startScreen.classList.remove('hidden');
    }
  }

  private startGameSession(): void {
    this.loadLetter(this.currentLetterConfig.id);
  }

  public loadLetter(letterId: string): void {
    const cfg = LETTERS_DATA.find(l => l.id === letterId);
    if (!cfg) return;

    this.currentLetterConfig = cfg;
    this.saveManager.setCurrentLetterId(cfg.id);

    this.hud.setRoomLetter(cfg.uppercase, cfg.lowercase);
    this.debugPanel.updateCurrentLetter(cfg.id);

    // Setup Challenge Instance
    this.currentChallenge = new LetterChallenge(
      cfg,
      this.stateManager,
      this.audioManager,
      this.particleManager,
      this.riya,
      this.star,
      this.voiceBubble
    );

    this.currentChallenge.onComplete(() => {
      this.handleChallengeComplete(cfg);
    });
  }

  private handleChallengeComplete(letter: LetterConfig): void {
    // Unlock letter and unlock next letter
    this.saveManager.unlockLetter(letter.id);

    const currentIndex = LETTERS_DATA.findIndex(l => l.id === letter.id);
    const nextConfig = LETTERS_DATA[currentIndex + 1];
    if (nextConfig) {
      this.saveManager.unlockLetter(nextConfig.id);
    }

    this.updateHUDProgress();

    // If all letters unlocked or reached final letter Z
    const unlocked = this.saveManager.getUnlockedLetters();
    if (unlocked.length >= LETTERS_DATA.length || letter.id === 'Z') {
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}
    }

    // Show Celebration Overlay Modal
    this.celebrationOverlay.show(letter, nextConfig);
  }

  public replayCurrentLetter(): void {
    this.loadLetter(this.currentLetterConfig.id);
  }

  public goToNextLetter(): void {
    const currentIndex = LETTERS_DATA.findIndex(l => l.id === this.currentLetterConfig.id);
    const nextConfig = LETTERS_DATA[currentIndex + 1] || LETTERS_DATA[0];
    this.loadLetter(nextConfig.id);
  }

  private updateHUDProgress(): void {
    const unlocked = this.saveManager.getUnlockedLetters();
    this.hud.setCollectionProgress(unlocked.length, LETTERS_DATA.length);
  }
}
