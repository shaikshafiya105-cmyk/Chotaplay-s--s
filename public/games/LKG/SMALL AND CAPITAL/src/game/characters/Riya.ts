export type RiyaState = 'idle' | 'pointing' | 'waving' | 'celebrating' | 'curious' | 'thinking' | 'walking';

export class RiyaCharacter {
  private container: HTMLElement;
  private visualContainer: HTMLElement;
  private currentState: RiyaState = 'idle';
  private clickCallback?: () => void;

  constructor(containerId: string = 'riya-character') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Riya container #${containerId} not found`);
    }
    this.container = el;
    const visual = el.querySelector('.riya-visual') as HTMLElement;
    if (!visual) {
      throw new Error(`Riya visual container not found`);
    }
    this.visualContainer = visual;

    this.renderSVG();
    this.setupInteractivity();
    this.setState('idle');
  }

  public setState(state: RiyaState): void {
    this.currentState = state;
    this.container.className = `character-riya riya-${state}`;
    this.updateAnimationPose(state);
  }

  public getState(): RiyaState {
    return this.currentState;
  }

  public onClick(cb: () => void): void {
    this.clickCallback = cb;
  }

  public moveTo(xPercent: number): void {
    this.container.style.left = `${xPercent}%`;
  }

  private setupInteractivity(): void {
    this.container.addEventListener('pointerdown', () => {
      this.playTapReaction();
      if (this.clickCallback) {
        this.clickCallback();
      }
    });
  }

  public playTapReaction(): void {
    const prevState = this.currentState;
    this.setState('waving');
    setTimeout(() => {
      if (this.currentState === 'waving') {
        this.setState(prevState === 'waving' ? 'idle' : prevState);
      }
    }, 1500);
  }

  private updateAnimationPose(state: RiyaState): void {
    const wavingArm = this.visualContainer.querySelector('#riya-waving-arm') as SVGElement;
    const pointingArm = this.visualContainer.querySelector('#riya-pointing-arm') as SVGElement;
    const mouth = this.visualContainer.querySelector('#riya-mouth') as SVGElement;
    const sparkles = this.visualContainer.querySelector('#riya-celebration-sparkles') as SVGElement;

    if (wavingArm) {
      wavingArm.style.display = (state === 'waving' || state === 'celebrating' || state === 'idle') ? 'block' : 'none';
    }
    if (pointingArm) {
      pointingArm.style.display = (state === 'pointing' || state === 'curious') ? 'block' : 'none';
    }
    if (sparkles) {
      sparkles.style.display = (state === 'celebrating') ? 'block' : 'none';
    }
    if (mouth) {
      if (state === 'celebrating') {
        mouth.setAttribute('d', 'M 95 142 Q 105 160 115 142 Z'); // Big happy open mouth
      } else {
        mouth.setAttribute('d', 'M 97 142 Q 105 152 113 142'); // Sweet smile
      }
    }
  }

  private renderSVG(): void {
    // High fidelity vector illustration of Riya matching the prompt character reference
    this.visualContainer.innerHTML = `
      <svg viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" class="riya-svg">
        <defs>
          <!-- Hair Gradient -->
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5a2f1c"/>
            <stop offset="60%" stop-color="#3d1d0e"/>
            <stop offset="100%" stop-color="#240f06"/>
          </linearGradient>
          
          <!-- Skin Gradient -->
          <radialGradient id="skinGrad" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#ffe8dc"/>
            <stop offset="85%" stop-color="#ffd5c0"/>
            <stop offset="100%" stop-color="#f5be9f"/>
          </radialGradient>

          <!-- Dress Gradient -->
          <linearGradient id="dressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffb6cf"/>
            <stop offset="40%" stop-color="#ffa3c2"/>
            <stop offset="100%" stop-color="#f882a8"/>
          </linearGradient>

          <!-- Shadow Filter -->
          <filter id="charShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
          </filter>
        </defs>

        <g filter="url(#charShadow)">
          <!-- Ground Shadow -->
          <ellipse cx="108" cy="308" rx="55" ry="9" fill="rgba(0,0,0,0.3)"/>

          <!-- Legs & Shoes -->
          <!-- Left Leg -->
          <g id="riya-left-leg">
            <path d="M 88 235 L 82 280" stroke="url(#skinGrad)" stroke-width="14" stroke-linecap="round"/>
            <!-- White Sock -->
            <path d="M 80 270 L 81 285" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
            <!-- Cute Mary Jane Shoe -->
            <ellipse cx="80" cy="289" rx="14" ry="8" fill="#ffffff" stroke="#e0c7ba" stroke-width="2"/>
            <path d="M 72 287 Q 80 292 88 287" stroke="#e57373" stroke-width="2" fill="none"/>
          </g>

          <!-- Right Leg (Bent cutely) -->
          <g id="riya-right-leg">
            <path d="M 125 235 Q 140 255 130 275" stroke="url(#skinGrad)" stroke-width="14" stroke-linecap="round" fill="none"/>
            <!-- White Sock -->
            <path d="M 128 265 L 132 278" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
            <!-- Right Shoe -->
            <ellipse cx="135" cy="282" rx="14" ry="8" fill="#ffffff" stroke="#e0c7ba" stroke-width="2" transform="rotate(-15 135 282)"/>
            <path d="M 127 280 Q 135 285 143 280" stroke="#e57373" stroke-width="2" fill="none"/>
          </g>

          <!-- Pink Frilly Floral Dress -->
          <g id="riya-dress">
            <!-- Skirt Main Body -->
            <path d="M 82 170 Q 105 166 128 170 L 155 240 Q 105 254 55 240 Z" fill="url(#dressGrad)"/>
            
            <!-- Dress Small White Flower Patterns -->
            <circle cx="80" cy="200" r="3" fill="#ffffff" opacity="0.85"/>
            <circle cx="125" cy="195" r="3" fill="#ffffff" opacity="0.85"/>
            <circle cx="102" cy="225" r="3.5" fill="#ffffff" opacity="0.85"/>
            <circle cx="70" cy="228" r="2.5" fill="#ffffff" opacity="0.85"/>
            <circle cx="140" cy="226" r="3" fill="#ffffff" opacity="0.85"/>
            <circle cx="105" cy="185" r="2.5" fill="#ffffff" opacity="0.85"/>

            <!-- Ruffle Hem -->
            <path d="M 55 240 Q 70 248 85 242 Q 105 249 125 242 Q 145 248 155 240" fill="none" stroke="#ffffff" stroke-width="3"/>

            <!-- Bodice & Puffy Sleeves -->
            <path d="M 85 145 L 125 145 L 128 172 L 82 172 Z" fill="url(#dressGrad)"/>
            
            <!-- Left Puffy Sleeve -->
            <ellipse cx="78" cy="155" rx="12" ry="10" fill="url(#dressGrad)"/>
            <!-- Right Puffy Sleeve -->
            <ellipse cx="132" cy="155" rx="12" ry="10" fill="url(#dressGrad)"/>

            <!-- White Peter Pan Collar -->
            <path d="M 90 144 Q 98 156 105 147 Q 112 156 120 144 Z" fill="#ffffff" stroke="#f0c2d2" stroke-width="1.5"/>
          </g>

          <!-- Arms & Hands -->
          <!-- Left Arm holding Sketchbook/Crayon -->
          <g id="riya-left-arm">
            <path d="M 75 158 Q 62 185 70 205" stroke="url(#skinGrad)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <!-- Colorful Bead Bracelets -->
            <circle cx="68" cy="198" r="2" fill="#ffd21e"/>
            <circle cx="71" cy="200" r="2" fill="#00e5ff"/>
            <circle cx="73" cy="197" r="2" fill="#ff4081"/>
            <!-- Sketchpad in Hand -->
            <rect x="52" y="195" width="22" height="28" rx="3" fill="#faf5eb" stroke="#a0855b" stroke-width="1.5" transform="rotate(-15 63 209)"/>
            <line x1="58" y1="202" x2="70" y2="202" stroke="#ff4081" stroke-width="1.5" transform="rotate(-15 63 209)"/>
            <circle cx="64" cy="212" r="4" fill="#ffb6cf" transform="rotate(-15 63 209)"/>
            <!-- Hand holding pad -->
            <circle cx="70" cy="205" r="6" fill="url(#skinGrad)"/>
          </g>

          <!-- Right Arm: Waving / Celebrating Pose -->
          <g id="riya-waving-arm">
            <path d="M 133 158 Q 155 135 152 105" stroke="url(#skinGrad)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <!-- Colorful Bracelets -->
            <circle cx="151" cy="115" r="2.5" fill="#00e5ff"/>
            <circle cx="152" cy="119" r="2.5" fill="#ffd21e"/>
            <circle cx="153" cy="123" r="2.5" fill="#ff4081"/>
            <!-- Waving Open Hand -->
            <circle cx="152" cy="103" r="7" fill="url(#skinGrad)"/>
            <path d="M 148 98 L 150 90 M 152 97 L 155 89 M 156 99 L 160 92 M 145 101 L 140 96" stroke="url(#skinGrad)" stroke-width="3" stroke-linecap="round"/>
          </g>

          <!-- Right Arm: Pointing Pose (Alternate) -->
          <g id="riya-pointing-arm" style="display: none;">
            <path d="M 133 158 Q 165 160 190 152" stroke="url(#skinGrad)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <!-- Pointing Hand with Index Finger -->
            <circle cx="190" cy="152" r="6" fill="url(#skinGrad)"/>
            <path d="M 190 152 L 204 148" stroke="url(#skinGrad)" stroke-width="4.5" stroke-linecap="round"/>
          </g>

          <!-- Back Pigtails -->
          <!-- Left Pigtail -->
          <path d="M 68 85 C 35 75 25 125 50 145 C 40 120 55 100 70 95 Z" fill="url(#hairGrad)"/>
          <!-- Right Pigtail -->
          <path d="M 142 85 C 175 75 185 125 160 145 C 170 120 155 100 140 95 Z" fill="url(#hairGrad)"/>

          <!-- Head & Face -->
          <ellipse cx="105" cy="120" rx="35" ry="32" fill="url(#skinGrad)"/>

          <!-- Cute Ears -->
          <ellipse cx="70" cy="122" rx="6" ry="8" fill="url(#skinGrad)"/>
          <ellipse cx="140" cy="122" rx="6" ry="8" fill="url(#skinGrad)"/>

          <!-- Sparkling Big Eyes -->
          <!-- Left Eye -->
          <ellipse cx="92" cy="120" rx="6.5" ry="8" fill="#301509"/>
          <circle cx="90" cy="117" r="2.8" fill="#ffffff"/>
          <circle cx="94" cy="123" r="1.4" fill="#ffffff"/>
          <!-- Right Eye -->
          <ellipse cx="118" cy="120" rx="6.5" ry="8" fill="#301509"/>
          <circle cx="116" cy="117" r="2.8" fill="#ffffff"/>
          <circle cx="120" cy="123" r="1.4" fill="#ffffff"/>

          <!-- Cute Eyebrows -->
          <path d="M 86 109 Q 92 106 98 108" stroke="#3d1d0e" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M 112 108 Q 118 106 124 109" stroke="#3d1d0e" stroke-width="2" stroke-linecap="round" fill="none"/>

          <!-- Tiny Cute Button Nose -->
          <ellipse cx="105" cy="128" rx="2.5" ry="1.8" fill="#e5987d"/>

          <!-- Rosy Glowing Cheeks -->
          <ellipse cx="84" cy="128" rx="7" ry="4.5" fill="#ff708a" opacity="0.65"/>
          <ellipse cx="126" cy="128" rx="7" ry="4.5" fill="#ff708a" opacity="0.65"/>

          <!-- Joyful Smile Mouth -->
          <path id="riya-mouth" d="M 97 138 Q 105 149 113 138" stroke="#b22b4e" stroke-width="2.5" stroke-linecap="round" fill="#e84a6f"/>

          <!-- Front Hair & Bangs -->
          <path d="M 70 100 C 70 65 140 65 140 100 C 135 90 120 96 105 92 C 90 96 75 90 70 100 Z" fill="url(#hairGrad)"/>
          <path d="M 78 95 Q 92 108 102 96 Q 115 108 132 94" stroke="url(#hairGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

          <!-- Cute Hair Clips & Flowers -->
          <!-- Left Flower Hairclip -->
          <circle cx="68" cy="84" r="5" fill="#ff5e97"/>
          <circle cx="63" cy="80" r="4" fill="#00e5ff"/>
          <circle cx="73" cy="80" r="4" fill="#ffd21e"/>
          <circle cx="68" cy="82" r="3" fill="#ffffff"/>
          <!-- Yellow Hair Barrette -->
          <rect x="75" y="94" width="11" height="5" rx="2.5" fill="#ffd21e" transform="rotate(30 75 94)"/>

          <!-- Right Star Hairclip -->
          <circle cx="140" cy="84" r="5" fill="#ffd21e"/>
          <polygon points="144,76 147,82 153,83 148,87 150,93 144,89 138,93 140,87 135,83 141,82" fill="#00e5ff"/>
          <!-- Pink Barrette -->
          <rect x="124" y="94" width="11" height="5" rx="2.5" fill="#ff5e97" transform="rotate(-30 124 94)"/>

          <!-- Celebration Floating Sparkles around Riya -->
          <g id="riya-celebration-sparkles" style="display: none;">
            <text x="35" y="60" font-size="20">✨</text>
            <text x="165" y="60" font-size="20">⭐</text>
            <text x="180" y="130" font-size="18">💖</text>
            <text x="25" y="140" font-size="18">🎉</text>
          </g>
        </g>
      </svg>
    `;
  }
}
