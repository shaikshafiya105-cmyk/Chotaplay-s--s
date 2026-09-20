/**
 * =========================================================
 * CHOTAPLAY: VOWEL MAGIC GARDEN
 * Vanilla JavaScript ES6+ Game Engine
 * =========================================================
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    playTone(freq, type, duration, startVol = 0.3, endVol = 0.01) {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(startVol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(endVol, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Fallback gracefully
      }
    }

    // Tap / Pop sound
    playPop() {
      if (this.isMuted || !this.ctx) return;
      this.playTone(520, 'sine', 0.12, 0.4, 0.01);
      setTimeout(() => this.playTone(840, 'sine', 0.08, 0.3, 0.01), 40);
    }

    // Magic Wakeup Chime
    playMagicChime() {
      if (this.isMuted || !this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.4, 0.35, 0.01);
        }, idx * 90);
      });
    }

    // Correct Answer Fanfare
    playFanfare() {
      if (this.isMuted || !this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.3, 0.35, 0.01);
        }, idx * 110);
      });
      setTimeout(() => {
        this.playTone(1108.73, 'triangle', 0.6, 0.45, 0.01);
      }, 480);
    }

    // Gentle Wrong / Try Again boing
    playTryAgain() {
      if (this.isMuted || !this.ctx) return;
      this.playTone(320, 'sine', 0.2, 0.3, 0.05);
      setTimeout(() => this.playTone(280, 'sine', 0.25, 0.25, 0.01), 100);
    }

    // Elephant Trumpet Effect
    playTrumpet() {
      if (this.isMuted || !this.ctx) return;
      const notes = [330, 392, 493, 587];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sawtooth', 0.25, 0.2, 0.02);
        }, idx * 70);
      });
    }

    // Water Splash / Rain Twinkle
    playTwinkle() {
      if (this.isMuted || !this.ctx) return;
      const notes = [1200, 1500, 1800, 1400, 2000];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.15, 0.2, 0.01);
        }, idx * 60);
      });
    }
  }

  // --- PARTICLE & VISUAL EFFECTS ENGINE ---
  class ParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.loop = this.loop.bind(this);
      this.loop();
    }

    resize() {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    addSparkles(x, y, count = 25, color = '#FDE047') {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.particles.push({
          x: x || this.width / 2,
          y: y || this.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 4,
          color: color,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          type: 'sparkle',
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2
        });
      }
    }

    addConfetti(count = 60) {
      const colors = ['#EF4444', '#10B981', '#0284C7', '#F97316', '#8B5CF6', '#FACC15'];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: -20,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 4 + 3,
          size: Math.random() * 10 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.005,
          type: 'confetti',
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1
        });
      }
    }

    addSnowflakes(count = 30) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * (this.height / 2),
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 5 + 3,
          color: '#E0F2FE',
          alpha: 0.9,
          decay: 0.006,
          type: 'snow',
          rotation: 0,
          vRot: 0
        });
      }
    }

    addWaterDrops(x, y, count = 20) {
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
        const speed = Math.random() * 7 + 4;
        this.particles.push({
          x: x || this.width / 2,
          y: y || this.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.25,
          size: Math.random() * 6 + 3,
          color: '#38BDF8',
          alpha: 1,
          decay: 0.02,
          type: 'water'
        });
      }
    }

    loop() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.gravity) {
          p.vy += p.gravity;
        }

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.fillStyle = p.color;

        if (p.type === 'sparkle') {
          p.rotation += p.vRot;
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.beginPath();
          // Draw 4-point star
          for (let s = 0; s < 4; s++) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.lineTo(p.size, 0);
            this.ctx.lineTo(p.size * 0.3, p.size * 0.3);
          }
          this.ctx.closePath();
          this.ctx.fill();
        } else if (p.type === 'confetti') {
          p.rotation += p.vRot;
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.type === 'snow') {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (p.type === 'water') {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      this.animId = requestAnimationFrame(this.loop);
    }
  }

  // --- VOWEL WORLDS DATABASE ---
  const VOWEL_DATA = [
    {
      vowel: 'A',
      name: 'APPLE',
      emoji: '🍎',
      themeClass: 'theme-A',
      color: '#EF4444',
      worldTitle: '🍎 Apple Garden',
      introSpeaker: '⭐ Little Star',
      introSpeech: 'Listen! What vowel wakes this garden? It is "A"!',
      vowelSpoken: 'A',
      wordSpoken: 'Apple! A is for Apple!',
      johnSpoken: 'A is for Apple!',
      challengePrompt: 'Find the A word!',
      challengeSubtitle: 'Listen: "A is for..."',
      choices: [
        { word: 'Apple', emoji: '🍎', isCorrect: true },
        { word: 'Ball', emoji: '⚽', isCorrect: false },
        { word: 'Cat', emoji: '🐱', isCorrect: false }
      ],
      renderCenterpiece: function (isAwake) {
        return `
          <div class="apple-tree-wrap">
            <svg viewBox="0 0 280 280" class="tree-svg">
              <!-- Trunk -->
              <path d="M120 180 Q140 190 160 180 L170 270 L110 270 Z" fill="#78350F" />
              <!-- Foliage / Green Canopy -->
              <circle cx="140" cy="120" r="90" fill="#22C55E" />
              <circle cx="90" cy="110" r="65" fill="#16A34A" />
              <circle cx="190" cy="110" r="65" fill="#16A34A" />
              <circle cx="140" cy="75" r="60" fill="#4ADE80" />
              
              <!-- Tree Face -->
              <g class="tree-face">
                ${isAwake ? `
                  <!-- Happy Open Eyes -->
                  <circle cx="115" cy="115" r="8" fill="#1E293B" />
                  <circle cx="113" cy="112" r="3" fill="#FFFFFF" />
                  <circle cx="165" cy="115" r="8" fill="#1E293B" />
                  <circle cx="163" cy="112" r="3" fill="#FFFFFF" />
                  <path d="M120 135 Q140 155 160 135" stroke="#15803D" stroke-width="4" stroke-linecap="round" fill="#DC2626" />
                  <!-- Cheeks -->
                  <circle cx="102" cy="125" r="8" fill="#F87171" opacity="0.6" />
                  <circle cx="178" cy="125" r="8" fill="#F87171" opacity="0.6" />
                ` : `
                  <!-- Sleeping Eyes -->
                  <path d="M105 118 Q115 128 125 118" stroke="#15803D" stroke-width="4" stroke-linecap="round" fill="none" />
                  <path d="M155 118 Q165 128 175 118" stroke="#15803D" stroke-width="4" stroke-linecap="round" fill="none" />
                  <ellipse cx="140" cy="135" rx="6" ry="4" fill="#15803D" />
                  <text x="175" y="80" font-size="24" font-weight="bold" fill="#3B82F6">Zzz...</text>
                `}
              </g>

              <!-- Apples on Tree -->
              ${isAwake ? `
                <g class="tree-apples">
                  <!-- Apple 1 -->
                  <circle cx="90" cy="80" r="16" fill="#EF4444" />
                  <path d="M90 64 Q94 60 98 64" stroke="#78350F" stroke-width="3" fill="none" />
                  <circle cx="86" cy="76" r="3" fill="#FFFFFF" opacity="0.6" />

                  <!-- Apple 2 -->
                  <circle cx="190" cy="80" r="16" fill="#EF4444" />
                  <path d="M190 64 Q194 60 198 64" stroke="#78350F" stroke-width="3" fill="none" />
                  <circle cx="186" cy="76" r="3" fill="#FFFFFF" opacity="0.6" />

                  <!-- Apple 3 -->
                  <circle cx="140" cy="45" r="16" fill="#EF4444" />
                  <path d="M140 29 Q144 25 148 29" stroke="#78350F" stroke-width="3" fill="none" />
                  <circle cx="136" cy="41" r="3" fill="#FFFFFF" opacity="0.6" />

                  <!-- Bouncing Fallen Apples -->
                  <circle cx="70" cy="230" r="18" fill="#EF4444" />
                  <circle cx="210" cy="230" r="18" fill="#EF4444" />
                </g>
              ` : ''}
            </svg>
          </div>
        `;
      }
    },
    {
      vowel: 'E',
      name: 'ELEPHANT',
      emoji: '🐘',
      themeClass: 'theme-E',
      color: '#10B981',
      worldTitle: '🐘 Elephant Jungle',
      introSpeaker: '⭐ Little Star',
      introSpeech: 'Which vowel wakes our elephant friend? Listen... "E"!',
      vowelSpoken: 'E',
      wordSpoken: 'Elephant! E is for Elephant!',
      johnSpoken: 'E is for Elephant!',
      challengePrompt: 'Find the E word!',
      challengeSubtitle: 'Listen: "E is for..."',
      choices: [
        { word: 'Elephant', emoji: '🐘', isCorrect: true },
        { word: 'Apple', emoji: '🍎', isCorrect: false },
        { word: 'Orange', emoji: '🍊', isCorrect: false }
      ],
      renderCenterpiece: function (isAwake) {
        return `
          <div class="elephant-wrap">
            <svg viewBox="0 0 300 260" class="tree-svg">
              <!-- Body -->
              <ellipse cx="160" cy="150" rx="90" ry="75" fill="#94A3B8" />
              <!-- Legs -->
              <rect x="100" y="190" width="30" height="60" rx="12" fill="#64748B" />
              <rect x="140" y="190" width="30" height="60" rx="12" fill="#64748B" />
              <rect x="180" y="190" width="30" height="60" rx="12" fill="#64748B" />
              <rect x="220" y="190" width="30" height="60" rx="12" fill="#64748B" />
              
              <!-- Giant Cute Ear -->
              <ellipse cx="90" cy="125" rx="42" ry="54" fill="#CBD5E1" stroke="#64748B" stroke-width="4" />
              <ellipse cx="90" cy="125" rx="26" ry="34" fill="#F472B6" opacity="0.6" />

              <!-- Head -->
              <circle cx="120" cy="120" r="50" fill="#94A3B8" />

              <!-- Eyes & Trunk -->
              ${isAwake ? `
                <!-- Big Happy Open Eyes -->
                <circle cx="125" cy="105" r="9" fill="#1E293B" />
                <circle cx="122" cy="102" r="3" fill="#FFFFFF" />
                <circle cx="125" cy="107" r="1.5" fill="#FFFFFF" />
                <ellipse cx="138" cy="120" rx="8" ry="5" fill="#F87171" opacity="0.6" />

                <!-- Raised Trunk Spraying Water -->
                <path d="M145 130 Q180 135 190 95 Q195 70 175 60" stroke="#94A3B8" stroke-width="26" stroke-linecap="round" fill="none" />
                <!-- Water Droplets from Trunk -->
                <g class="water-spray">
                  <circle cx="165" cy="45" r="6" fill="#38BDF8" />
                  <circle cx="180" cy="35" r="8" fill="#38BDF8" />
                  <circle cx="195" cy="48" r="7" fill="#38BDF8" />
                  <circle cx="210" cy="30" r="5" fill="#38BDF8" />
                </g>
              ` : `
                <!-- Sleeping Eyes -->
                <path d="M115 110 Q125 120 135 110" stroke="#475569" stroke-width="4" stroke-linecap="round" fill="none" />
                <!-- Resting Trunk -->
                <path d="M145 135 Q170 160 170 195" stroke="#94A3B8" stroke-width="24" stroke-linecap="round" fill="none" />
                <text x="180" y="90" font-size="24" font-weight="bold" fill="#3B82F6">Zzz...</text>
              `}
            </svg>
          </div>
        `;
      }
    },
    {
      vowel: 'I',
      name: 'IGLOO',
      emoji: '🏠',
      themeClass: 'theme-I',
      color: '#0284C7',
      worldTitle: '🧊 Ice & Igloo Land',
      introSpeaker: '⭐ Little Star',
      introSpeech: 'Which vowel wakes the igloo? Listen... "I"!',
      vowelSpoken: 'I',
      wordSpoken: 'Igloo! I is for Igloo!',
      johnSpoken: 'I is for Igloo!',
      challengePrompt: 'Find the I word!',
      challengeSubtitle: 'Listen: "I is for..."',
      choices: [
        { word: 'Igloo', emoji: '🏠', isCorrect: true },
        { word: 'Orange', emoji: '🍊', isCorrect: false },
        { word: 'Elephant', emoji: '🐘', isCorrect: false }
      ],
      renderCenterpiece: function (isAwake) {
        return `
          <div class="igloo-wrap">
            <svg viewBox="0 0 300 260" class="tree-svg">
              <!-- Snow Mound Base -->
              <ellipse cx="150" cy="220" rx="140" ry="35" fill="#BAE6FD" />

              <!-- Igloo Dome -->
              <path d="M60 210 A90 90 0 0 1 240 210 Z" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="5" />
              
              <!-- Ice Block Brick Lines -->
              <path d="M75 175 Q150 165 225 175" stroke="#7DD3FC" stroke-width="3" fill="none" />
              <path d="M95 135 Q150 125 205 135" stroke="#7DD3FC" stroke-width="3" fill="none" />
              <path d="M125 95 Q150 90 175 95" stroke="#7DD3FC" stroke-width="3" fill="none" />
              
              <!-- Igloo Tunnel Entrance -->
              <path d="M115 210 A35 35 0 0 1 185 210 Z" fill="${isAwake ? '#FACC15' : '#0F172A'}" stroke="#7DD3FC" stroke-width="4" />

              <!-- Glowing Chimney & Smoke -->
              ${isAwake ? `
                <!-- Warm Glow from Door -->
                <circle cx="150" cy="195" r="18" fill="#FEF08A" opacity="0.9" />
                <!-- Glowing Lantern -->
                <circle cx="80" cy="190" r="12" fill="#FDE047" />
                <path d="M70 190 L90 190" stroke="#78350F" stroke-width="3" />
                
                <!-- Swirling Smoke Puffs -->
                <circle cx="210" cy="100" r="10" fill="#FFFFFF" opacity="0.8" />
                <circle cx="225" cy="75" r="14" fill="#FFFFFF" opacity="0.6" />
                <circle cx="245" cy="50" r="18" fill="#FFFFFF" opacity="0.4" />
                
                <!-- Snowflakes Sparkle -->
                <text x="50" y="80" font-size="28" fill="#38BDF8">❄️</text>
                <text x="230" y="140" font-size="28" fill="#38BDF8">❄️</text>
              ` : `
                <!-- Dark Entrance / Sleepy -->
                <text x="180" y="80" font-size="24" font-weight="bold" fill="#0284C7">Zzz...</text>
              `}
            </svg>
          </div>
        `;
      }
    },
    {
      vowel: 'O',
      name: 'ORANGE',
      emoji: '🍊',
      themeClass: 'theme-O',
      color: '#F97316',
      worldTitle: '🍊 Orange Grove',
      introSpeaker: '👦 John',
      introSpeech: 'Which vowel wakes the orange grove? Listen... "O"!',
      vowelSpoken: 'O',
      wordSpoken: 'Orange! O is for Orange!',
      johnSpoken: 'O is for Orange!',
      challengePrompt: 'Find the O word!',
      challengeSubtitle: 'Listen: "O is for..."',
      choices: [
        { word: 'Orange', emoji: '🍊', isCorrect: true },
        { word: 'Apple', emoji: '🍎', isCorrect: false },
        { word: 'Umbrella', emoji: '☂️', isCorrect: false }
      ],
      renderCenterpiece: function (isAwake) {
        return `
          <div class="orange-grove-wrap">
            <svg viewBox="0 0 280 280" class="tree-svg">
              <!-- Golden Sun -->
              <g class="orange-sun">
                <circle cx="220" cy="60" r="30" fill="#FBBF24" />
                ${isAwake ? `
                  <line x1="220" y1="15" x2="220" y2="25" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
                  <line x1="220" y1="95" x2="220" y2="105" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
                  <line x1="175" y1="60" x2="185" y2="60" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
                  <line x1="255" y1="60" x2="265" y2="60" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
                ` : ''}
              </g>

              <!-- Tree Trunk -->
              <path d="M125 180 Q140 190 155 180 L165 270 L115 270 Z" fill="#9A3412" />
              
              <!-- Lush Citrus Canopy -->
              <circle cx="140" cy="130" r="85" fill="#15803D" />
              <circle cx="95" cy="125" r="60" fill="#16A34A" />
              <circle cx="185" cy="125" r="60" fill="#16A34A" />
              <circle cx="140" cy="85" r="55" fill="#22C55E" />

              <!-- Oranges -->
              ${isAwake ? `
                <g class="citrus-oranges">
                  <!-- Orange 1 -->
                  <circle cx="100" cy="100" r="16" fill="#EA580C" />
                  <circle cx="96" cy="96" r="3" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="100" cy="84" r="3" fill="#16A34A" />

                  <!-- Orange 2 -->
                  <circle cx="180" cy="95" r="16" fill="#EA580C" />
                  <circle cx="176" cy="91" r="3" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="180" cy="79" r="3" fill="#16A34A" />

                  <!-- Orange 3 -->
                  <circle cx="140" cy="65" r="16" fill="#EA580C" />
                  <circle cx="136" cy="61" r="3" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="140" cy="49" r="3" fill="#16A34A" />

                  <!-- Bouncing Ripe Oranges -->
                  <circle cx="70" cy="235" r="17" fill="#F97316" />
                  <circle cx="210" cy="235" r="17" fill="#F97316" />
                </g>
              ` : `
                <text x="165" y="90" font-size="24" font-weight="bold" fill="#EA580C">Zzz...</text>
              `}
            </svg>
          </div>
        `;
      }
    },
    {
      vowel: 'U',
      name: 'UMBRELLA',
      emoji: '☂️',
      themeClass: 'theme-U',
      color: '#8B5CF6',
      worldTitle: '☂️ Umbrella Rain Garden',
      introSpeaker: '👦 John',
      introSpeech: 'Which vowel can stop the rain? Listen... "U"!',
      vowelSpoken: 'U',
      wordSpoken: 'Umbrella! U is for Umbrella!',
      johnSpoken: 'U is for Umbrella!',
      challengePrompt: 'Find the U word!',
      challengeSubtitle: 'Listen: "U is for..."',
      choices: [
        { word: 'Umbrella', emoji: '☂️', isCorrect: true },
        { word: 'Apple', emoji: '🍎', isCorrect: false },
        { word: 'Igloo', emoji: '🏠', isCorrect: false }
      ],
      renderCenterpiece: function (isAwake) {
        return `
          <div class="umbrella-rain-wrap">
            <svg viewBox="0 0 320 280" class="tree-svg">
              ${isAwake ? `
                <!-- Magnificent Vibrant Rainbow Arch -->
                <path d="M30 250 A130 130 0 0 1 290 250" stroke="#EF4444" stroke-width="8" fill="none" opacity="0.9" />
                <path d="M40 250 A120 120 0 0 1 280 250" stroke="#F97316" stroke-width="8" fill="none" opacity="0.9" />
                <path d="M50 250 A110 110 0 0 1 270 250" stroke="#FACC15" stroke-width="8" fill="none" opacity="0.9" />
                <path d="M60 250 A100 100 0 0 1 260 250" stroke="#22C55E" stroke-width="8" fill="none" opacity="0.9" />
                <path d="M70 250 A90 90 0 0 1 250 250" stroke="#0284C7" stroke-width="8" fill="none" opacity="0.9" />
                <path d="M80 250 A80 80 0 0 1 240 250" stroke="#8B5CF6" stroke-width="8" fill="none" opacity="0.9" />

                <!-- Wide Open Glowing Umbrella -->
                <!-- Canopy -->
                <path d="M80 150 Q160 50 240 150 Q200 140 160 140 Q120 140 80 150 Z" fill="#8B5CF6" stroke="#7C3AED" stroke-width="4" />
                <path d="M120 142 Q160 70 200 142" stroke="#A78BFA" stroke-width="3" fill="none" />
                <!-- Stick & J-Handle -->
                <line x1="160" y1="140" x2="160" y2="230" stroke="#78350F" stroke-width="6" stroke-linecap="round" />
                <path d="M160 230 Q160 250 140 250 Q125 250 125 235" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none" />
                <!-- Tip -->
                <line x1="160" y1="75" x2="160" y2="60" stroke="#78350F" stroke-width="4" stroke-linecap="round" />
              ` : `
                <!-- Rain Clouds & Rain Drops -->
                <path d="M90 70 A25 25 0 0 1 140 60 A35 35 0 0 1 200 70 A25 25 0 0 1 225 95 A20 20 0 0 1 210 120 L100 120 A25 25 0 0 1 90 70 Z" fill="#94A3B8" />
                
                <!-- Falling Raindrops -->
                <line x1="110" y1="135" x2="105" y2="155" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
                <line x1="140" y1="145" x2="135" y2="165" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
                <line x1="170" y1="135" x2="165" y2="155" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
                <line x1="200" y1="145" x2="195" y2="165" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />

                <!-- Folded / Sleeping Umbrella -->
                <path d="M150 140 L170 140 L162 230 L158 230 Z" fill="#8B5CF6" />
                <line x1="160" y1="230" x2="160" y2="250" stroke="#78350F" stroke-width="5" stroke-linecap="round" />
                <text x="185" y="100" font-size="24" font-weight="bold" fill="#8B5CF6">Zzz...</text>
              `}
            </svg>
          </div>
        `;
      }
    }
  ];

  // --- MAIN GAME CONTROLLER ---
  class VowelMagicGame {
    constructor() {
      this.sound = new SoundFX();
      this.particles = new ParticleEngine('magic-canvas');

      this.currentVowelIndex = 0;
      this.currentViewMode = 'wakeup'; // 'wakeup' | 'challenge'
      this.unlockedVowels = new Set();
      this.lastSpokenText = '';

      this.cacheDOMElements();
      this.bindEvents();
    }

    cacheDOMElements() {
      // Containers & Scenes
      this.sceneIntro = document.getElementById('scene-intro');
      this.sceneWorld = document.getElementById('scene-world');
      this.sceneFinale = document.getElementById('scene-finale');
      this.sceneFreeplay = document.getElementById('scene-freeplay');

      // Top Nav
      this.btnRepeatSpeech = document.getElementById('btn-repeat-speech');
      this.btnSoundToggle = document.getElementById('btn-sound-toggle');
      this.soundIcon = document.getElementById('sound-icon');
      this.btnFullscreen = document.getElementById('btn-fullscreen');

      // Intro Elements
      this.btnStartGame = document.getElementById('btn-start-game');

      // World View Elements
      this.worldBackdrop = document.getElementById('world-backdrop');
      this.worldTag = document.getElementById('world-tag');
      this.instructionText = document.getElementById('instruction-text');
      this.livingCenterpiece = document.getElementById('living-centerpiece');
      this.btnMagicVowel = document.getElementById('btn-magic-vowel');
      this.vowelLetterDisplay = document.getElementById('vowel-letter-display');

      // Views
      this.viewWakeup = document.getElementById('view-wakeup');
      this.viewChallenge = document.getElementById('view-challenge');
      this.challengeTitle = document.getElementById('challenge-title');
      this.challengeSubtitle = document.getElementById('challenge-subtitle');
      this.challengeSoundName = document.getElementById('challenge-sound-name');
      this.choiceCardsContainer = document.getElementById('choice-cards-container');

      // Celebration Overlay
      this.stepCelebration = document.getElementById('step-celebration');
      this.celebText = document.getElementById('celeb-text');
      this.btnNextStep = document.getElementById('btn-next-step');

      // Characters & Subtitles
      this.bubbleSpeakerTag = document.getElementById('bubble-speaker-tag');
      this.bubbleSpeechText = document.getElementById('bubble-speech-text');
      this.actorJohn = document.getElementById('actor-john');
      this.actorStar = document.getElementById('actor-star');
      this.starWinterHat = document.getElementById('star-winter-hat');

      // Finale & Freeplay Controls
      this.btnRecapMagic = document.getElementById('btn-recap-magic');
      this.btnEnterFreeplay = document.getElementById('btn-enter-freeplay');
      this.btnReplayAdventure = document.getElementById('btn-replay-adventure');

      // Free-play Elements
      this.flowerPadButtons = document.querySelectorAll('.flower-pad-btn');
      this.spotlightBadge = document.getElementById('spotlight-badge');
      this.spotlightVisual = document.getElementById('spotlight-visual');
      this.spotlightText = document.getElementById('spotlight-text');
    }

    bindEvents() {
      // Audio unlock & Start Game
      this.btnStartGame.addEventListener('click', () => {
        this.sound.init();
        this.sound.playMagicChime();
        this.particles.addSparkles(window.innerWidth / 2, window.innerHeight / 2, 40);
        this.startGame();
      });

      // Repeat speech button
      this.btnRepeatSpeech.addEventListener('click', () => {
        this.sound.playPop();
        if (this.lastSpokenText) {
          this.speak(this.lastSpokenText);
        }
      });

      // Sound Toggle
      this.btnSoundToggle.addEventListener('click', () => {
        const muted = this.sound.toggleMute();
        this.soundIcon.textContent = muted ? '🔇' : '🔊';
      });

      // Fullscreen Toggle
      this.btnFullscreen.addEventListener('click', () => {
        this.sound.playPop();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });

      // Magic Vowel Tap / Wakeup
      this.btnMagicVowel.addEventListener('click', (e) => {
        this.sound.init();
        this.onMagicVowelTap(e);
      });

      // Next Vowel Step
      this.btnNextStep.addEventListener('click', () => {
        this.sound.playPop();
        this.stepCelebration.classList.add('hidden');
        this.advanceToNextVowel();
      });

      // Finale Buttons
      this.btnRecapMagic.addEventListener('click', () => {
        this.sound.playPop();
        this.runFinaleRecap();
      });

      this.btnEnterFreeplay.addEventListener('click', () => {
        this.sound.playPop();
        this.sound.playMagicChime();
        this.showScene('freeplay');
        this.speak('Welcome to the Free-Play Garden! Tap any flower to explore!');
      });

      // Replay Adventure
      this.btnReplayAdventure.addEventListener('click', () => {
        this.sound.playPop();
        this.currentVowelIndex = 0;
        this.unlockedVowels.clear();
        this.updateTracker();
        this.startGame();
      });

      // Free-play Flower Pads
      this.flowerPadButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.sound.init();
          const vowelKey = btn.getAttribute('data-vowel');
          this.onFlowerPadTap(vowelKey, btn);
        });
      });

      // Character tap easter-egg
      this.actorJohn.addEventListener('click', () => {
        this.sound.init();
        this.sound.playPop();
        this.animateJohn('jump');
        this.speak('Hi! I am John! Let us find magic vowels!');
      });

      this.actorStar.addEventListener('click', () => {
        this.sound.init();
        this.sound.playMagicChime();
        this.animateStar('spin');
        this.speak('Twinkle twinkle! I am Little Star!');
      });
    }

    // --- SCENE NAVIGATION ---
    showScene(sceneName) {
      const scenes = [this.sceneIntro, this.sceneWorld, this.sceneFinale, this.sceneFreeplay];
      scenes.forEach((sc) => {
        if (sc) {
          sc.classList.remove('active-scene');
          sc.classList.add('hidden-scene');
        }
      });

      let target = this.sceneIntro;
      if (sceneName === 'world') target = this.sceneWorld;
      else if (sceneName === 'finale') target = this.sceneFinale;
      else if (sceneName === 'freeplay') target = this.sceneFreeplay;

      if (target) {
        target.classList.remove('hidden-scene');
        setTimeout(() => target.classList.add('active-scene'), 20);
      }
    }

    // --- SPEECH SYNTHESIS & SUBTITLES ---
    speak(text, speaker = '⭐ Little Star') {
      this.lastSpokenText = text;
      this.bubbleSpeakerTag.textContent = speaker;
      this.bubbleSpeechText.textContent = `"${text}"`;

      // Animate speech bubble
      this.bubbleSpeechText.style.transform = 'scale(1.03)';
      setTimeout(() => (this.bubbleSpeechText.style.transform = 'scale(1)'), 200);

      if (!('speechSynthesis' in window)) return;

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.88; // Gentle pacing for UKG children
        utterance.pitch = 1.15; // Friendly warm tone

        // Select cheerful English voice if available
        const voices = window.speechSynthesis.getVoices();
        const childVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira'))
        );
        if (childVoice) {
          utterance.voice = childVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // Continue normally
      }
    }

    // --- CHARACTER ANIMATION TRIGGERS ---
    animateJohn(animType = 'jump') {
      this.actorJohn.classList.remove('jump', 'wave');
      void this.actorJohn.offsetWidth; // Reflow
      this.actorJohn.classList.add(animType);
      setTimeout(() => this.actorJohn.classList.remove(animType), 1200);
    }

    animateStar(animType = 'spin') {
      this.actorStar.classList.remove('spin');
      void this.actorStar.offsetWidth; // Reflow
      this.actorStar.classList.add(animType);
      setTimeout(() => this.actorStar.classList.remove(animType), 1200);
    }

    // --- TRACKER UPDATE ---
    updateTracker() {
      const orbs = document.querySelectorAll('.vowel-orb');
      orbs.forEach((orb) => {
        const v = orb.getAttribute('data-vowel');
        if (this.unlockedVowels.has(v)) {
          orb.classList.add('unlocked');
        } else {
          orb.classList.remove('unlocked');
        }
      });
    }

    // --- GAMEPLAY FLOW ---
    startGame() {
      this.showScene('world');
      this.loadVowelWorld(this.currentVowelIndex);
    }

    loadVowelWorld(index) {
      const data = VOWEL_DATA[index];
      if (!data) return;

      this.currentViewMode = 'wakeup';
      this.stepCelebration.classList.add('hidden');

      // Update Backdrop & Theme
      this.worldBackdrop.className = `world-backdrop ${data.themeClass}`;
      this.worldTag.textContent = data.worldTitle;
      this.instructionText.textContent = `Listen and tap the magic vowel "${data.vowel}"!`;

      // Winter hat for Little Star in Igloo world
      if (data.vowel === 'I') {
        this.starWinterHat.classList.remove('hidden');
      } else {
        this.starWinterHat.classList.add('hidden');
      }

      // Render sleeping centerpiece
      this.livingCenterpiece.innerHTML = data.renderCenterpiece(false);

      // Setup giant magic vowel button
      this.vowelLetterDisplay.textContent = data.vowel;
      this.btnMagicVowel.style.background = `linear-gradient(145deg, ${data.color} 0%, ${data.color} 60%, #450A0A 100%)`;
      this.btnMagicVowel.disabled = false;

      // Switch to Wakeup View
      this.viewWakeup.classList.remove('hidden-view');
      this.viewWakeup.classList.add('active-view');
      this.viewChallenge.classList.remove('active-view');
      this.viewChallenge.classList.add('hidden-view');

      // Play intro audio
      setTimeout(() => {
        this.speak(data.introSpeech, data.introSpeaker);
        this.animateStar('spin');
      }, 300);
    }

    // When child taps the giant glowing vowel button
    onMagicVowelTap(e) {
      const data = VOWEL_DATA[this.currentVowelIndex];
      this.btnMagicVowel.disabled = true;

      // SFX and particles
      this.sound.playMagicChime();
      if (data.vowel === 'E') this.sound.playTrumpet();
      else if (data.vowel === 'I') this.sound.playTwinkle();
      else if (data.vowel === 'U') this.sound.playTwinkle();

      const rect = this.btnMagicVowel.getBoundingClientRect();
      this.particles.addSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, data.color);

      // Awaken the centerpiece
      this.livingCenterpiece.innerHTML = data.renderCenterpiece(true);

      // Character celebration
      this.animateJohn('jump');
      this.animateStar('spin');

      // Speech pronunciation: Letter sound then word association
      this.speak(`${data.vowelSpoken}... ${data.wordSpoken}`, '👦 John');

      // Unlock vowel orb in tracker
      this.unlockedVowels.add(data.vowel);
      this.updateTracker();

      // Transition to Word Challenge after 2.4s
      setTimeout(() => {
        this.showWordChallenge(data);
      }, 2400);
    }

    // Step 2: Show Word Challenge Cards
    showWordChallenge(data) {
      this.currentViewMode = 'challenge';
      this.viewWakeup.classList.remove('active-view');
      this.viewWakeup.classList.add('hidden-view');

      this.viewChallenge.classList.remove('hidden-view');
      this.viewChallenge.classList.add('active-view');

      this.challengeTitle.textContent = data.challengePrompt;
      this.challengeSubtitle.textContent = `Listen: "${data.vowel} is for..."`;

      // Render 3 Choice Cards (Shuffle order)
      const shuffledChoices = [...data.choices].sort(() => Math.random() - 0.5);
      this.choiceCardsContainer.innerHTML = '';

      shuffledChoices.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.innerHTML = `
          <div class="choice-emoji">${item.emoji}</div>
          <div class="choice-word">${item.word}</div>
        `;

        card.addEventListener('click', () => {
          this.handleChoiceClick(card, item, data);
        });

        this.choiceCardsContainer.appendChild(card);
      });

      // Spoken prompt
      this.speak(data.challengePrompt, '⭐ Little Star');
    }

    // Handle Word Choice Selection
    handleChoiceClick(cardElem, item, data) {
      if (item.isCorrect) {
        // Correct Choice!
        cardElem.classList.add('correct');
        this.sound.playFanfare();
        this.particles.addConfetti(45);

        const rect = cardElem.getBoundingClientRect();
        this.particles.addSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, '#22C55E');

        this.animateJohn('jump');
        this.animateStar('spin');

        const successText = `${data.vowel}! ${data.name}! Wonderful!`;
        this.speak(successText, '⭐ Little Star');

        // Show celebration popover
        setTimeout(() => {
          this.celebText.textContent = `${data.vowel} is for ${data.name}!`;
          this.stepCelebration.classList.remove('hidden');
          this.sound.playMagicChime();
        }, 1200);
      } else {
        // Friendly retry with gentle audio reinforcement
        cardElem.classList.add('shake');
        this.sound.playTryAgain();
        setTimeout(() => cardElem.classList.remove('shake'), 700);

        this.speak(`Let us listen again... ${data.vowel}... ${data.name}!`, '⭐ Little Star');
      }
    }

    // Advance to next Vowel World or Grand Finale
    advanceToNextVowel() {
      this.currentVowelIndex++;
      if (this.currentVowelIndex < VOWEL_DATA.length) {
        this.loadVowelWorld(this.currentVowelIndex);
      } else {
        // All 5 vowels completed! Enter Grand Finale!
        this.showGrandFinale();
      }
    }

    // --- GRAND FINALE & CELEBRATION ---
    showGrandFinale() {
      this.showScene('finale');
      this.sound.playFanfare();
      this.particles.addConfetti(80);

      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}

      this.animateJohn('jump');
      this.animateStar('spin');

      this.speak('We found all the magic vowels! A, E, I, O, U! You are a Vowel Magic Master!', '👦 John & ⭐ Little Star');
    }

    runFinaleRecap() {
      let delay = 0;
      VOWEL_DATA.forEach((item, idx) => {
        setTimeout(() => {
          this.sound.playPop();
          const card = document.querySelector(`.vowel-triumph-card[data-v="${item.vowel}"]`);
          if (card) {
            card.style.transform = 'scale(1.2) translateY(-12px)';
            setTimeout(() => (card.style.transform = 'scale(1)'), 900);
          }
          this.speak(`${item.vowel} is for ${item.name}!`, '⭐ Little Star');
          this.particles.addSparkles(window.innerWidth / 2, window.innerHeight / 2, 25, item.color);
        }, delay);
        delay += 2200;
      });
    }

    // --- FREE PLAY MEMORY GARDEN ---
    onFlowerPadTap(vowelKey, btnElem) {
      const data = VOWEL_DATA.find((d) => d.vowel === vowelKey);
      if (!data) return;

      this.sound.playMagicChime();
      if (vowelKey === 'E') this.sound.playTrumpet();

      // Button pulse animation
      btnElem.style.transform = 'scale(1.15) translateY(-8px)';
      setTimeout(() => (btnElem.style.transform = 'scale(1)'), 500);

      const rect = btnElem.getBoundingClientRect();
      this.particles.addSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35, data.color);

      // Update Spotlight
      this.spotlightBadge.textContent = `Vowel ${data.vowel}`;
      this.spotlightBadge.style.color = data.color;
      this.spotlightVisual.textContent = data.emoji;
      this.spotlightText.textContent = `${data.vowel} is for ${data.name}!`;

      this.animateStar('spin');
      this.speak(`${data.vowel}... ${data.name}!`, '⭐ Little Star');
    }
  }

  // --- INITIALIZE GAME ON DOM LOAD ---
  window.addEventListener('DOMContentLoaded', () => {
    window.vowelMagicGame = new VowelMagicGame();
  });
})();
