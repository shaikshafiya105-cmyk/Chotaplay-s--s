import { LetterConfig, DiscoveryPropConfig } from '../../data/letters.ts';
import { GameStateEnum, GameStateManager } from '../GameState.ts';
import { AudioManager } from '../core/AudioManager.ts';
import { ParticleManager } from '../core/ParticleManager.ts';
import { RiyaCharacter } from '../characters/Riya.ts';
import { LittleStar } from '../characters/LittleStar.ts';
import { VoiceBubble } from '../ui/VoiceBubble.ts';

export class LetterChallenge {
  private config: LetterConfig;
  private stateManager: GameStateManager;
  private audioManager: AudioManager;
  private particleManager: ParticleManager;
  private riya: RiyaCharacter;
  private star: LittleStar;
  private voiceBubble: VoiceBubble;

  private bigCharEl: HTMLElement;
  private smallSlotEl: HTMLElement;
  private discoveryAreaEl: HTMLElement;
  private runeEl: HTMLElement;

  private partnerPropEl: HTMLElement | null = null;
  private smallLetterPartnerNode: HTMLElement | null = null;
  private onCompleteCallback?: () => void;

  constructor(
    config: LetterConfig,
    stateManager: GameStateManager,
    audioManager: AudioManager,
    particleManager: ParticleManager,
    riya: RiyaCharacter,
    star: LittleStar,
    voiceBubble: VoiceBubble
  ) {
    this.config = config;
    this.stateManager = stateManager;
    this.audioManager = audioManager;
    this.particleManager = particleManager;
    this.riya = riya;
    this.star = star;
    this.voiceBubble = voiceBubble;

    this.bigCharEl = document.getElementById('big-letter-char') as HTMLElement;
    this.smallSlotEl = document.getElementById('small-letter-target-slot') as HTMLElement;
    this.discoveryAreaEl = document.getElementById('discovery-area') as HTMLElement;
    this.runeEl = document.getElementById('portal-rune') as HTMLElement;

    this.setupRoom();
  }

  public onComplete(cb: () => void): void {
    this.onCompleteCallback = cb;
  }

  public setupRoom(): void {
    // Reset positions and elements
    this.bigCharEl.textContent = this.config.uppercase;
    this.bigCharEl.style.color = '#ffffff';

    const bigNode = document.getElementById('big-letter-node') as HTMLElement;
    if (bigNode) {
      bigNode.style.background = `radial-gradient(circle at 35% 30%, ${this.config.themeColor} 0%, #17072b 100%)`;
      bigNode.style.transform = '';
      bigNode.classList.add('pulse-glow');
    }

    if (this.runeEl) {
      this.runeEl.style.setProperty('--rune-color', this.config.bgRuneColor);
    }

    if (this.smallSlotEl) {
      this.smallSlotEl.innerHTML = '<span class="slot-hint">?</span>';
      this.smallSlotEl.style.borderColor = 'rgba(0, 229, 255, 0.6)';
    }

    this.renderDiscoveryProps();
    this.setupBigLetterInteraction();

    // Riya & Star initial state
    this.riya.setState('idle');
    this.star.moveTo(28, 240);

    // Intro Voice
    this.voiceBubble.setText(this.config.introPrompt);
    this.audioManager.speak(this.config.introPrompt);
    this.stateManager.setState(GameStateEnum.EXPLORE);
  }

  private setupBigLetterInteraction(): void {
    const bigNode = document.getElementById('big-letter-node') as HTMLElement;
    if (!bigNode) return;

    const handleBigClick = () => {
      const state = this.stateManager.getState();
      if (state !== GameStateEnum.EXPLORE && state !== GameStateEnum.INTRO) {
        // Tapping again repeats pronunciation
        this.audioManager.playTwinkle();
        this.audioManager.speak(`Big ${this.config.uppercase}!`);
        return;
      }

      this.audioManager.playTwinkle();
      const rect = bigNode.getBoundingClientRect();
      this.particleManager.emitSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, this.config.accentColor, 30);

      this.riya.setState('pointing');
      this.star.guideTowards(rect.left / window.innerWidth * 100, 200);

      this.stateManager.setState(GameStateEnum.LETTER_DISCOVERED);
      this.voiceBubble.setText(this.config.bigDiscoveredPrompt);
      this.audioManager.speak(this.config.bigDiscoveredPrompt, () => {
        this.stateManager.setState(GameStateEnum.SEARCH_PARTNER);
        this.voiceBubble.setText(this.config.searchPrompt);
        this.riya.setState('curious');
      });
    };

    bigNode.onclick = handleBigClick;
  }

  private renderDiscoveryProps(): void {
    this.discoveryAreaEl.innerHTML = '';
    const props = this.config.props;

    // Distribute props nicely across stage
    const count = props.length;
    props.forEach((prop, idx) => {
      const propDiv = document.createElement('div');
      propDiv.className = 'discovery-prop';
      propDiv.id = prop.id;

      // Position evenly across the discovery area
      const leftPercent = count === 1 ? 50 : 20 + (idx * (60 / (count - 1)));
      const topPercent = 25 + (idx % 2 === 0 ? -10 : 15);
      propDiv.style.left = `${leftPercent}%`;
      propDiv.style.top = `${topPercent}%`;

      propDiv.innerHTML = `
        <div class="prop-body" style="background: ${prop.bgGradient};">
          <span class="prop-emoji">${prop.emoji}</span>
          <div class="prop-sparkle-halo"></div>
        </div>
        <div class="prop-label" style="font-size:12px; margin-top:6px; font-weight:700; color:#ffd21e;">${prop.name}</div>
      `;

      if (prop.isPartnerHolder) {
        this.partnerPropEl = propDiv;
      }

      propDiv.addEventListener('pointerdown', () => this.handlePropClick(prop, propDiv));
      this.discoveryAreaEl.appendChild(propDiv);
    });
  }

  private handlePropClick(prop: DiscoveryPropConfig, el: HTMLElement): void {
    const currentState = this.stateManager.getState();
    if (currentState === GameStateEnum.MATCHING || currentState === GameStateEnum.TRANSFORMATION || currentState === GameStateEnum.CELEBRATION) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    if (prop.isPartnerHolder) {
      // Discovered Small Letter Partner!
      this.audioManager.playPop();
      this.particleManager.emitSparkleBurst(cx, cy, '#00e5ff', 35);
      this.star.moveTo((cx / window.innerWidth) * 100, window.innerHeight - cy + 40);
      this.star.celebrate();

      // Replace prop with revealed Glowing Lowercase Partner
      el.innerHTML = `
        <div class="hidden-letter-partner pulse-glow" role="button" aria-label="Little ${this.config.lowercase}">
          <span>${this.config.lowercase}</span>
        </div>
        <div class="prop-label" style="font-size:14px; margin-top:6px; font-weight:800; color:#00e5ff;">LITTLE ${this.config.uppercase}</div>
      `;

      this.smallLetterPartnerNode = el.querySelector('.hidden-letter-partner') as HTMLElement;
      this.smallLetterPartnerNode.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.triggerMatchingSequence(this.smallLetterPartnerNode!);
      });

      this.stateManager.setState(GameStateEnum.PARTNER_FOUND);
      this.voiceBubble.setText(this.config.foundSmallPrompt);
      this.audioManager.speak(this.config.foundSmallPrompt);
      this.riya.setState('waving');

    } else {
      // Gentle encouragement for non-partner prop
      this.audioManager.playGentleEncouragement();
      this.particleManager.emitSparkleBurst(cx, cy, '#ffd21e', 12);
      el.style.transform = 'scale(1.15) rotate(8deg)';
      setTimeout(() => { el.style.transform = ''; }, 300);

      const encouragingLines = [
        "Let's look around the magical lab!",
        "Almost! Try checking another magic container!",
        "Keep searching! Little partner is hiding nearby!"
      ];
      const hint = encouragingLines[Math.floor(Math.random() * encouragingLines.length)];
      this.voiceBubble.setText(hint);
      this.audioManager.speak(hint);

      // Star subtly hints towards partner if child clicks elsewhere
      if (this.partnerPropEl) {
        const partnerRect = this.partnerPropEl.getBoundingClientRect();
        this.star.guideTowards((partnerRect.left / window.innerWidth) * 100, window.innerHeight - partnerRect.top);
      }
    }
  }

  public triggerMatchingSequence(smallNode: HTMLElement): void {
    const currentState = this.stateManager.getState();
    if (currentState === GameStateEnum.MATCHING || currentState === GameStateEnum.TRANSFORMATION || currentState === GameStateEnum.CELEBRATION) {
      return;
    }

    this.stateManager.setState(GameStateEnum.MATCHING);
    this.voiceBubble.setText(`Connecting Big ${this.config.uppercase} and Little ${this.config.lowercase}...`);
    this.audioManager.playPortalAttraction();

    const bigNode = document.getElementById('big-letter-node') as HTMLElement;
    const bigRect = bigNode.getBoundingClientRect();
    const smallRect = smallNode.getBoundingClientRect();

    const centerStageX = window.innerWidth * 0.5;
    const centerStageY = window.innerHeight * 0.45;

    // Attraction Particle Stream
    const streamInterval = setInterval(() => {
      this.particleManager.emitAttractionStream(
        bigRect.left + bigRect.width / 2,
        bigRect.top + bigRect.height / 2,
        centerStageX,
        centerStageY,
        this.config.themeColor
      );
      this.particleManager.emitAttractionStream(
        smallRect.left + smallRect.width / 2,
        smallRect.top + smallRect.height / 2,
        centerStageX,
        centerStageY,
        '#00e5ff'
      );
    }, 100);

    // Animate nodes towards center
    bigNode.classList.add('attract-moving');
    smallNode.classList.add('attract-moving');

    const bigDeltaX = centerStageX - (bigRect.left + bigRect.width / 2) - 45;
    const bigDeltaY = centerStageY - (bigRect.top + bigRect.height / 2);
    const smallDeltaX = centerStageX - (smallRect.left + smallRect.width / 2) + 45;
    const smallDeltaY = centerStageY - (smallRect.top + smallRect.height / 2);

    bigNode.style.transform = `translate(${bigDeltaX}px, ${bigDeltaY}px) scale(1.2)`;
    smallNode.style.transform = `translate(${smallDeltaX}px, ${smallDeltaY}px) scale(1.3)`;

    this.riya.setState('pointing');

    setTimeout(() => {
      clearInterval(streamInterval);
      this.triggerTransformationSequence(bigNode, smallNode, centerStageX, centerStageY);
    }, 1100);
  }

  private triggerTransformationSequence(
    bigNode: HTMLElement,
    smallNode: HTMLElement,
    centerX: number,
    centerY: number
  ): void {
    this.stateManager.setState(GameStateEnum.TRANSFORMATION);
    this.audioManager.playTransformationBurst();
    this.particleManager.emitVortexSwirl(centerX, centerY, 50);

    // Merge visual
    bigNode.classList.add('vortex-transform');
    smallNode.classList.add('vortex-transform');

    setTimeout(() => {
      // Swirl into unified Aa
      this.bigCharEl.textContent = `${this.config.uppercase} ${this.config.lowercase}`;
      this.particleManager.emitSparkleBurst(centerX, centerY, '#ffd21e', 60);

      this.stateManager.setState(GameStateEnum.CELEBRATION);
      this.voiceBubble.setText(this.config.successQuote);
      this.audioManager.speak(this.config.successQuote);

      this.riya.setState('celebrating');
      this.star.celebrate();
      this.audioManager.playCelebrationFanfare();
      this.particleManager.triggerCelebrationConfetti();

      // Update small slot with partner
      if (this.smallSlotEl) {
        this.smallSlotEl.innerHTML = `<span class="letter-char" style="font-size:62px; color:#00e5ff;">${this.config.lowercase}</span>`;
        this.smallSlotEl.style.borderColor = '#ffd21e';
        this.smallSlotEl.style.boxShadow = '0 0 30px rgba(255, 210, 30, 0.8)';
      }

      setTimeout(() => {
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      }, 2200);
    }, 900);
  }

  public instantComplete(): void {
    const bigNode = document.getElementById('big-letter-node') as HTMLElement;
    const centerStageX = window.innerWidth * 0.5;
    const centerStageY = window.innerHeight * 0.45;
    this.triggerTransformationSequence(bigNode, bigNode, centerStageX, centerStageY);
  }
}
