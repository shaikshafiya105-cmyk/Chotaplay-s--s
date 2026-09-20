/**
 * RIYA'S MAGIC DAY ✨ | CHOTAPLAY GOOD HABITS GAME
 * Full Vanilla JavaScript ES6+ Game Engine (Ages 3-6)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. AUDIO MANAGER (Web Audio API Synthesizer - 100% Standalone & Reliable)
  // =========================================================================
  class AudioManager {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
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

    playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.25) {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio tone error:', e);
      }
    }

    playClick() {
      this.playTone(600, 'sine', 0.08, 0.2);
    }

    playPop() {
      this.playTone(850, 'triangle', 0.12, 0.3);
    }

    playChime() {
      if (!this.soundEnabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.2), idx * 80);
      });
    }

    playSuccess() {
      if (!this.soundEnabled) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.35, 0.25), idx * 90);
      });
    }

    playBubble() {
      if (!this.soundEnabled) return;
      const freq = 400 + Math.random() * 400;
      this.playTone(freq, 'sine', 0.15, 0.2);
    }

    playScrub() {
      if (!this.soundEnabled) return;
      this.playTone(300 + Math.random() * 200, 'triangle', 0.08, 0.15);
    }

    playWater() {
      if (!this.soundEnabled) return;
      this.playTone(450, 'sine', 0.4, 0.15);
    }

    playMagicBurst() {
      if (!this.soundEnabled) return;
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.2), idx * 70);
      });
    }

    playFanfare() {
      if (!this.soundEnabled) return;
      const fanfare = [
        { f: 523.25, d: 0.2, t: 0 },
        { f: 523.25, d: 0.2, t: 200 },
        { f: 523.25, d: 0.2, t: 400 },
        { f: 659.25, d: 0.4, t: 600 },
        { f: 783.99, d: 0.3, t: 900 },
        { f: 1046.50, d: 0.8, t: 1200 },
      ];
      fanfare.forEach(item => {
        setTimeout(() => this.playTone(item.f, 'triangle', item.d, 0.3), item.t);
      });
    }

    playNotePentatonic(index = 0) {
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      const freq = scale[index % scale.length];
      this.playTone(freq, 'sine', 0.4, 0.25);
    }
  }

  // =========================================================================
  // 2. SPEECH MANAGER (Web SpeechSynthesis with Friendly Preschool Voice)
  // =========================================================================
  class SpeechManager {
    constructor() {
      this.synth = window.speechSynthesis;
      this.voice = null;
      this.currentText = '';
      this.initVoice();
    }

    initVoice() {
      if (!this.synth) return;
      const setVoice = () => {
        const voices = this.synth.getVoices();
        // Look for friendly English voices
        this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Natural'))) || voices[0];
      };

      setVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = setVoice;
      }
    }

    speak(text, onEnd = null) {
      this.currentText = text;

      // Update Little Star companion bubble & footer
      const bubbleText = document.getElementById('companion-text');
      if (bubbleText) bubbleText.textContent = text;

      const promptText = document.getElementById('prompt-text');
      if (promptText) promptText.textContent = text;

      if (!this.synth) {
        if (onEnd) onEnd();
        return;
      }

      try {
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) utterance.voice = this.voice;
        utterance.rate = 0.92;  // Gentle, clear pace for young kids
        utterance.pitch = 1.25; // Warm, friendly higher pitch
        utterance.volume = 1;

        if (onEnd) {
          utterance.onend = onEnd;
        }

        this.synth.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        if (onEnd) onEnd();
      }
    }

    replay() {
      if (this.currentText) {
        this.speak(this.currentText);
      }
    }
  }

  // =========================================================================
  // 3. PARTICLE ENGINE (Sparkles, Stars, Confetti, Bubbles, Flower Petals)
  // =========================================================================
  class ParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animationFrame = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.loop();
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
      this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    }

    spawnSparkles(x, y, count = 20, colors = ['#FFD54F', '#FF4081', '#00E5FF', '#76FF03', '#FFF']) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        this.particles.push({
          type: 'sparkle',
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 4 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 10
        });
      }
    }

    spawnConfetti(count = 70) {
      const w = this.canvas.width;
      const colors = ['#FF1744', '#FF9100', '#FFEA00', '#00E676', '#00B0FF', '#D500F9', '#FF4081'];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          type: 'confetti',
          x: Math.random() * w,
          y: -20 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 4,
          vy: 3 + Math.random() * 4,
          size: 8 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          decay: 0.005 + Math.random() * 0.005,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 12
        });
      }
    }

    spawnBubbles(x, y, count = 10) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          type: 'bubble',
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -1.5 - Math.random() * 2.5,
          size: 8 + Math.random() * 14,
          color: 'rgba(255, 255, 255, 0.75)',
          life: 1,
          decay: 0.015 + Math.random() * 0.01
        });
      }
    }

    spawnEnergyTrail(startX, startY, targetX, targetY) {
      const count = 12;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          this.particles.push({
            type: 'energy_star',
            x: startX,
            y: startY,
            targetX,
            targetY,
            progress: 0,
            speed: 0.03 + Math.random() * 0.02,
            size: 6 + Math.random() * 6,
            color: '#FFD700',
            life: 1,
            decay: 0.008
          });
        }, i * 40);
      }
    }

    loop() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];

          if (p.type === 'sparkle') {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // slight gravity
            p.rotation += p.rotSpeed;
            p.life -= p.decay;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);

            // Draw 4-point star
            this.ctx.beginPath();
            this.ctx.moveTo(0, -p.size);
            this.ctx.quadraticCurveTo(0, 0, p.size, 0);
            this.ctx.quadraticCurveTo(0, 0, 0, p.size);
            this.ctx.quadraticCurveTo(0, 0, -p.size, 0);
            this.ctx.quadraticCurveTo(0, 0, 0, -p.size);
            this.ctx.fill();
            this.ctx.restore();
          } 
          else if (p.type === 'confetti') {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.life -= p.decay;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            this.ctx.restore();
          }
          else if (p.type === 'bubble') {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life * 0.8);
            this.ctx.strokeStyle = '#81D4FA';
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = 'rgba(225, 245, 254, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            // Bubble highlight
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.beginPath();
            this.ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
          }
          else if (p.type === 'energy_star') {
            p.progress += p.speed;
            p.x = p.x + (p.targetX - p.x) * 0.12;
            p.y = p.y + (p.targetY - p.y) * 0.12;
            p.life -= p.decay;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = '#FFEA00';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
          }

          if (p.life <= 0) {
            this.particles.splice(i, 1);
          }
        }
      }
      this.animationFrame = requestAnimationFrame(() => this.loop());
    }
  }

  // =========================================================================
  // 4. RIYA SVG CHARACTER GENERATOR (Expressive Vector Stages)
  // =========================================================================
  function renderRiyaSVG(expression = 'smiling', action = 'idle') {
    let mouthSvg = '<path d="M 44 65 Q 50 72 56 65" fill="#C2185B" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round"/>';
    let eyeLeft = '<ellipse cx="43" cy="53" rx="4" ry="5.5" fill="#3E2723"/><circle cx="44.5" cy="51" r="2" fill="#FFFFFF"/>';
    let eyeRight = '<ellipse cx="57" cy="53" rx="4" ry="5.5" fill="#3E2723"/><circle cx="58.5" cy="51" r="2" fill="#FFFFFF"/>';
    let armLeft = '<path d="M 33 80 Q 25 90 28 100" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
    let armRight = '<path d="M 67 80 Q 75 90 72 100" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';

    if (expression === 'sleeping') {
      eyeLeft = '<path d="M 39 54 Q 43 58 47 54" stroke="#3E2723" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
      eyeRight = '<path d="M 53 54 Q 57 58 61 54" stroke="#3E2723" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
      mouthSvg = '<path d="M 46 64 Q 50 67 54 64" fill="none" stroke="#880E4F" stroke-width="1.8" stroke-linecap="round"/>';
    } else if (expression === 'brushing') {
      mouthSvg = '<ellipse cx="50" cy="65" rx="7" ry="4" fill="#FFFFFF" stroke="#FF80AB" stroke-width="2"/>';
      armRight = '<path d="M 67 80 Q 60 70 54 66" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
    } else if (expression === 'eating') {
      mouthSvg = '<ellipse cx="50" cy="66" rx="6" ry="6" fill="#C2185B"/>';
      armRight = '<path d="M 67 80 Q 64 68 55 67" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
    } else if (expression === 'waving' || expression === 'celebrating') {
      armRight = '<path d="M 67 80 Q 82 60 85 45" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
      mouthSvg = '<path d="M 43 63 Q 50 75 57 63 Z" fill="#D81B60" stroke="#880E4F" stroke-width="1.5"/>';
    } else if (expression === 'washing') {
      armLeft = '<path d="M 35 80 Q 45 92 48 94" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
      armRight = '<path d="M 65 80 Q 55 92 52 94" stroke="#FFD8B5" stroke-width="7" stroke-linecap="round" fill="none"/>';
    }

    return `
      <svg class="riya-svg riya-${expression} riya-${action}" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="riyaDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF80AB" />
            <stop offset="100%" stop-color="#FF4081" />
          </linearGradient>
          <linearGradient id="riyaHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5D4037" />
            <stop offset="100%" stop-color="#3E2723" />
          </linearGradient>
        </defs>

        <!-- Pigtails / Hair Back -->
        <circle cx="26" cy="42" r="16" fill="url(#riyaHairGrad)" />
        <circle cx="74" cy="42" r="16" fill="url(#riyaHairGrad)" />

        <!-- Hair Clips (Flowers & Stars) -->
        <circle cx="29" cy="32" r="5" fill="#FFEB3B" />
        <circle cx="29" cy="32" r="2" fill="#E91E63" />
        <polygon points="71,28 73,34 78,34 74,37 75,43 71,39 67,43 68,37 64,34 69,34" fill="#00E5FF" />

        <!-- Arms Back / Shadow -->
        ${armLeft}
        ${armRight}

        <!-- Legs & Shoes -->
        <rect x="41" y="105" width="6" height="15" rx="3" fill="#FFD8B5" />
        <rect x="53" y="105" width="6" height="15" rx="3" fill="#FFD8B5" />
        <ellipse cx="43" cy="122" rx="7" ry="4" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1.5"/>
        <ellipse cx="57" cy="122" rx="7" ry="4" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1.5"/>

        <!-- Dress Body -->
        <path d="M 38 75 Q 32 105 30 110 L 70 110 Q 68 105 62 75 Z" fill="url(#riyaDressGrad)" stroke="#F50057" stroke-width="1.5" />
        <!-- Floral Patterns on Dress -->
        <circle cx="45" cy="90" r="2" fill="#FFF" opacity="0.8"/>
        <circle cx="55" cy="85" r="2.5" fill="#FFF" opacity="0.8"/>
        <circle cx="48" cy="100" r="2" fill="#FFF" opacity="0.8"/>
        <circle cx="60" cy="98" r="2.5" fill="#FFF" opacity="0.8"/>
        <circle cx="38" cy="98" r="2" fill="#FFF" opacity="0.8"/>

        <!-- Ruffle Collar -->
        <path d="M 37 74 Q 50 82 63 74" fill="#FFFFFF" stroke="#FF80AB" stroke-width="2" />

        <!-- Head / Face -->
        <ellipse cx="50" cy="54" rx="18" ry="17" fill="#FFE0B2" />
        <ellipse cx="50" cy="54" rx="17" ry="16" fill="#FFD8B5" />

        <!-- Rosy Cheeks -->
        <ellipse cx="37" cy="59" rx="3.5" ry="2" fill="#FF80AB" opacity="0.6"/>
        <ellipse cx="63" cy="59" rx="3.5" ry="2" fill="#FF80AB" opacity="0.6"/>

        <!-- Eyes -->
        ${eyeLeft}
        ${eyeRight}

        <!-- Cute Eyebrows -->
        <path d="M 40 46 Q 44 44 47 46" stroke="#4E342E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M 53 46 Q 56 44 60 46" stroke="#4E342E" stroke-width="1.5" fill="none" stroke-linecap="round"/>

        <!-- Little Nose -->
        <circle cx="50" cy="58" r="1.2" fill="#D7CCC8" />

        <!-- Mouth -->
        ${mouthSvg}

        <!-- Front Hair Bangs -->
        <path d="M 32 46 Q 40 34 50 36 Q 60 34 68 46 Q 60 41 50 43 Q 40 41 32 46 Z" fill="url(#riyaHairGrad)" />
      </svg>
    `;
  }

  // =========================================================================
  // 5. GAME STATE & BADGE DEFINITIONS
  // =========================================================================
  const BADGES = [
    { id: 'brush', icon: '🪥', title: 'Clean Teeth', desc: 'Bright Sparkling Smile' },
    { id: 'wash', icon: '🧼', title: 'Clean Hands', desc: 'Bubble Soap Champion' },
    { id: 'food', icon: '🍎', title: 'Healthy Food', desc: 'Energy Power Star' },
    { id: 'cleanup', icon: '🧸', title: 'Clean Room', desc: 'Magic Tidy Helper' },
    { id: 'kindness', icon: '❤️', title: 'Helping Others', desc: 'Kind & Caring Heart' },
    { id: 'environment', icon: '🌱', title: 'Clean World', desc: 'Planet Eco Hero' },
    { id: 'bedtime', icon: '🌙', title: 'Good Sleep', desc: 'Sweet Dreamer' }
  ];

  const state = {
    currentScene: 'intro', // 'intro', 'wake', 'brush', 'wash', 'food', 'cleanup', 'kindness', 'environment', 'bedtime', 'celebration', 'freeplay'
    magicEnergy: 0, // 0 to 100
    completedHabits: new Set(),
    unlockedBadges: new Set()
  };

  const audio = new AudioManager();
  const speech = new SpeechManager();
  const fx = new ParticleEngine('fx-canvas');

  // =========================================================================
  // 6. UI & HUD UPDATERS
  // =========================================================================
  function updateMagicEnergy(amountToAdd = 13) {
    state.magicEnergy = Math.min(100, state.magicEnergy + amountToAdd);
    
    const fillEl = document.getElementById('meter-fill');
    const percentEl = document.getElementById('meter-percent');
    if (fillEl) fillEl.style.width = `${state.magicEnergy}%`;
    if (percentEl) percentEl.textContent = `${state.magicEnergy}%`;

    // Ambient Tier Transformation
    const backdrop = document.getElementById('world-backdrop');
    if (backdrop) {
      if (state.magicEnergy >= 100) {
        backdrop.className = 'world-backdrop tier-magic';
      } else if (state.magicEnergy >= 75) {
        backdrop.className = 'world-backdrop tier-3';
      } else if (state.magicEnergy >= 40) {
        backdrop.className = 'world-backdrop tier-2';
      } else if (state.magicEnergy >= 15) {
        backdrop.className = 'world-backdrop tier-1';
      }
    }

    // Sparkle Burst on meter
    const meterEl = document.getElementById('magic-meter-container');
    if (meterEl) {
      const rect = meterEl.getBoundingClientRect();
      fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
    }
  }

  function unlockBadge(badgeId) {
    state.unlockedBadges.add(badgeId);
    renderBadgesModal();
    const countPill = document.getElementById('badge-count-pill');
    if (countPill) countPill.textContent = `${state.unlockedBadges.size}/7`;

    // Mark footer step dot completed
    const stepDot = document.querySelector(`.step-dot[data-habit="${badgeId}"]`);
    if (stepDot) {
      stepDot.classList.remove('active');
      stepDot.classList.add('completed');
    }
  }

  function updateFooterTracker(activeHabitId) {
    document.querySelectorAll('.step-dot').forEach(dot => {
      if (dot.dataset.habit === activeHabitId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function renderBadgesModal() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = BADGES.map(b => {
      const isUnlocked = state.unlockedBadges.has(b.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : ''}">
          <div class="badge-icon">${isUnlocked ? b.icon : '🔒'}</div>
          <div class="badge-title">${b.title}</div>
          <div style="font-size:0.75rem; color:#607D8B;">${isUnlocked ? b.desc : 'Practice habit to unlock'}</div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 7. SCENE MANAGERS & MINI-GAME MECHANICS
  // =========================================================================
  const sceneViewport = document.getElementById('scene-viewport');

  // SCENE 0: INTRO SCREEN
  function mountIntroScene() {
    state.currentScene = 'intro';
    updateFooterTracker('intro');

    sceneViewport.innerHTML = `
      <div class="scene-card intro-bedroom">
        <div class="scene-header">
          <h1 class="scene-title">✨ Riya's Magic Day ✨</h1>
          <p class="scene-desc">Help Riya practice good habits and make her world magical!</p>
        </div>

        <div class="intro-room-visual">
          <div class="intro-bed">
            <div class="intro-pillow"></div>
            <div class="intro-sleeping-riya">👧</div>
            <div class="sleep-zzz">Zzz...</div>
            <div class="intro-blanket"></div>
          </div>
        </div>

        <button id="btn-start-game" class="btn-primary-action btn-pulse">
          ✨ START MY MAGIC DAY
        </button>
      </div>
    `;

    speech.speak("Good morning, Riya! Let's make today magical! Tap start to begin!");

    document.getElementById('btn-start-game').addEventListener('click', () => {
      audio.playSuccess();
      fx.spawnSparkles(window.innerWidth / 2, window.innerHeight / 2, 25);
      mountWakeUpScene();
    });
  }

  // SCENE 1: WAKE UP (CHOICE MECHANIC)
  function mountWakeUpScene() {
    state.currentScene = 'wake';
    updateFooterTracker('wake');

    sceneViewport.innerHTML = `
      <div class="scene-card">
        <div class="scene-header">
          <h2 class="scene-title">🌞 Good Morning, Riya!</h2>
          <p class="scene-desc">The sun is shining! What should Riya do?</p>
        </div>

        <div class="scene-content-area">
          <div class="riya-stage" id="riya-wake-stage">
            ${renderRiyaSVG('sleeping', 'idle')}
          </div>

          <div class="choice-grid">
            <button class="choice-card" id="btn-choice-sleep">
              <span class="choice-icon">😴</span>
              <span class="choice-label">Stay in Bed</span>
            </button>
            <button class="choice-card highlight" id="btn-choice-wake">
              <span class="choice-icon">☀️</span>
              <span class="choice-label">Get Up & Smile!</span>
            </button>
          </div>
        </div>
      </div>
    `;

    speech.speak("Good morning! Should Riya get up or stay in bed?");

    // Stay in bed - gentle non-punishing feedback
    document.getElementById('btn-choice-sleep').addEventListener('click', () => {
      audio.playPop();
      speech.speak("Let's get ready for our day! Tap Get Up!");
    });

    // Get up - success transition
    document.getElementById('btn-choice-wake').addEventListener('click', (e) => {
      audio.playSuccess();
      const stage = document.getElementById('riya-wake-stage');
      if (stage) stage.innerHTML = renderRiyaSVG('waking', 'celebrating');
      
      const rect = e.currentTarget.getBoundingClientRect();
      fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
      updateMagicEnergy(12);

      speech.speak("Good morning! Let's start our magical day!", () => {
        setTimeout(mountBrushTeethScene, 1200);
      });
    });
  }

  // SCENE 2: BRUSH TEETH (DRAG & INTERACTIVE SCRUBBING)
  function mountBrushTeethScene() {
    state.currentScene = 'brush';
    updateFooterTracker('brush');

    let scrubCount = 0;
    const requiredScrubs = 6;

    sceneViewport.innerHTML = `
      <div class="scene-card">
        <div class="scene-header">
          <h2 class="scene-title">🪥 Magic Sparkling Smile!</h2>
          <p class="scene-desc">Drag or tap the toothbrush on Riya's teeth to brush left and right!</p>
        </div>

        <div class="scene-content-area brush-area">
          <div class="bathroom-mirror">
            <div class="teeth-target-zone" id="teeth-target-zone">
              <div class="mouth-teeth-row">
                <div class="tooth-item"></div>
                <div class="tooth-item"></div>
                <div class="tooth-item"></div>
                <div class="tooth-item"></div>
                <div class="tooth-item"></div>
              </div>
              <div class="tooth-foam"></div>
            </div>
            <div class="scrub-progress-bar">
              <div class="scrub-fill" id="scrub-fill"></div>
            </div>
          </div>

          <div class="riya-stage" id="riya-brush-stage">
            ${renderRiyaSVG('brushing', 'idle')}
          </div>

          <div class="toothbrush-tool" id="toothbrush-tool" draggable="true" title="Drag me to brush!">
            <span class="toothbrush-icon">🪥</span>
            <span style="font-family:var(--font-display); font-weight:700; font-size:0.85rem; color:#E65100;">Brush!</span>
          </div>
        </div>
      </div>
    `;

    speech.speak("Let's brush our teeth! Move the toothbrush back and forth!");

    const teethZone = document.getElementById('teeth-target-zone');
    const brushTool = document.getElementById('toothbrush-tool');
    const scrubFill = document.getElementById('scrub-fill');
    const riyaStage = document.getElementById('riya-brush-stage');

    function performScrub() {
      if (scrubCount >= requiredScrubs) return;
      scrubCount++;
      audio.playScrub();
      teethZone.classList.add('foaming');
      
      const percent = Math.min(100, (scrubCount / requiredScrubs) * 100);
      if (scrubFill) scrubFill.style.width = `${percent}%`;

      const rect = teethZone.getBoundingClientRect();
      fx.spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2, 4);

      if (scrubCount >= requiredScrubs) {
        // Complete brushing
        audio.playChime();
        fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('smiling', 'celebrating');
        unlockBadge('brush');
        updateMagicEnergy(13);

        speech.speak("My teeth are clean and sparkling! Beautiful smile!", () => {
          setTimeout(mountWashHandsScene, 1400);
        });
      }
    }

    // Support both click/tap and drag events for maximum accessibility
    teethZone.addEventListener('click', performScrub);
    brushTool.addEventListener('click', performScrub);

    // Touch and Drag handlers
    brushTool.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', 'toothbrush');
    });

    teethZone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    teethZone.addEventListener('drop', (e) => {
      e.preventDefault();
      performScrub();
    });
  }

  // SCENE 3: WASH HANDS (5-STEP INTERACTIVE FLOW)
  function mountWashHandsScene() {
    state.currentScene = 'wash';
    updateFooterTracker('wash');

    let currentStep = 1;
    const steps = [
      { num: 1, icon: '🚰', label: '1. Turn Water', prompt: 'Turn on the water tap!' },
      { num: 2, icon: '🧴', label: '2. Use Soap', prompt: 'Pump the magical soap!' },
      { num: 3, icon: '🧼', label: '3. Rub & Scrub', prompt: 'Rub hands together into bubbly foam!' },
      { num: 4, icon: '🌊', label: '4. Rinse Clean', prompt: 'Rinse off all the bubbles under water!' },
      { num: 5, icon: '🧻', label: '5. Dry Towel', prompt: 'Dry your hands with a soft towel!' }
    ];

    sceneViewport.innerHTML = `
      <div class="scene-card">
        <div class="scene-header">
          <h2 class="scene-title">🧼 Clean Hands Magic!</h2>
          <p class="scene-desc">Follow the steps: Water, Soap, Rub, Rinse, and Dry!</p>
        </div>

        <div class="scene-content-area wash-hands-flow">
          <div class="sink-interactive-stage" id="sink-stage">
            <div class="sink-faucet-stream" id="faucet-stream"></div>
            <div class="hands-visual-bubble" id="hands-visual">
              👐
            </div>
          </div>

          <div class="wash-step-cards" id="wash-step-cards">
            ${steps.map(s => `
              <button class="wash-step-btn ${s.num === 1 ? 'current' : 'disabled'}" data-step="${s.num}">
                <span class="step-btn-num">Step ${s.num}</span>
                <span class="step-btn-icon">${s.icon}</span>
                <span class="step-btn-label">${s.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    speech.speak("Wait! Let's wash our hands! Tap step 1 to turn on the water!");

    function advanceStep(stepNum) {
      if (stepNum !== currentStep) return;

      const faucet = document.getElementById('faucet-stream');
      const hands = document.getElementById('hands-visual');
      const rect = hands.getBoundingClientRect();

      if (stepNum === 1) {
        audio.playWater();
        if (faucet) faucet.classList.add('flowing');
        fx.spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
      } else if (stepNum === 2) {
        audio.playBubble();
        hands.innerHTML = '🫧👐🫧';
        fx.spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
      } else if (stepNum === 3) {
        audio.playScrub();
        hands.innerHTML = '🧼🫧🤲🫧';
        fx.spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      } else if (stepNum === 4) {
        audio.playWater();
        hands.innerHTML = '💧👐💧';
        fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
      } else if (stepNum === 5) {
        audio.playSuccess();
        hands.innerHTML = '✨🙌✨';
        if (faucet) faucet.classList.remove('flowing');
        fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        unlockBadge('wash');
        updateMagicEnergy(13);

        speech.speak("Clean hands! Ready for breakfast!", () => {
          setTimeout(mountHealthyFoodScene, 1400);
        });
        return;
      }

      currentStep++;
      updateStepButtons();
      speech.speak(steps[currentStep - 1].prompt);
    }

    function updateStepButtons() {
      document.querySelectorAll('.wash-step-btn').forEach(btn => {
        const step = parseInt(btn.dataset.step, 10);
        btn.classList.remove('current', 'done', 'disabled');
        if (step < currentStep) {
          btn.classList.add('done');
        } else if (step === currentStep) {
          btn.classList.add('current');
        } else {
          btn.classList.add('disabled');
        }
      });
    }

    document.querySelectorAll('.wash-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.step, 10);
        advanceStep(step);
      });
    });
  }

  // SCENE 4: HEALTHY FOOD (CHOICE + ENERGY PARTICLES)
  function mountHealthyFoodScene() {
    state.currentScene = 'food';
    updateFooterTracker('food');

    const foods = [
      { id: 'apple', icon: '🍎', name: 'Crunchy Apple', healthy: true },
      { id: 'banana', icon: '🍌', name: 'Sweet Banana', healthy: true },
      { id: 'carrot', icon: '🥕', name: 'Fresh Carrot', healthy: true },
      { id: 'donut', icon: '🍩', name: 'Frosted Donut', healthy: false }
    ];

    sceneViewport.innerHTML = `
      <div class="scene-card">
        <div class="scene-header">
          <h2 class="scene-title">🍎 Energy Breakfast!</h2>
          <p class="scene-desc">Which yummy food gives Riya lots of healthy energy?</p>
        </div>

        <div class="scene-content-area">
          <div class="riya-stage" id="riya-food-stage">
            ${renderRiyaSVG('smiling', 'idle')}
          </div>

          <div class="food-platter" id="food-platter">
            ${foods.map(f => `
              <button class="food-item-card" data-id="${f.id}" data-healthy="${f.healthy}">
                <span class="food-item-icon">${f.icon}</span>
                <span class="food-item-name">${f.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    speech.speak("What gives Riya healthy energy? Choose a healthy food!");

    document.querySelectorAll('.food-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const isHealthy = card.dataset.healthy === 'true';
        const rect = card.getBoundingClientRect();
        const riyaStage = document.getElementById('riya-food-stage');

        if (isHealthy) {
          audio.playSuccess();
          if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('eating', 'celebrating');

          const meterEl = document.getElementById('magic-meter-container');
          const meterRect = meterEl ? meterEl.getBoundingClientRect() : { left: 500, top: 20 };
          fx.spawnEnergyTrail(rect.left + rect.width / 2, rect.top + rect.height / 2, meterRect.left, meterRect.top);
          fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

          unlockBadge('food');
          updateMagicEnergy(13);

          speech.speak("Yummy! Healthy food gives me super energy!", () => {
            setTimeout(mountCleanRoomScene, 1400);
          });
        } else {
          audio.playPop();
          speech.speak("Let's choose something that gives us lots of healthy energy!");
        }
      });
    });
  }

  // SCENE 5: CLEAN ROOM (DRAG & SORT TOYS INTO MAGIC CHEST)
  function mountCleanRoomScene() {
    state.currentScene = 'cleanup';
    updateFooterTracker('cleanup');

    const toys = [
      { id: 'teddy', icon: '🧸', name: 'Teddy Bear', x: 20, y: 30 },
      { id: 'puzzle', icon: '🧩', name: 'Puzzle Piece', x: 120, y: 120 },
      { id: 'car', icon: '🚗', name: 'Toy Car', x: 220, y: 40 },
      { id: 'crayons', icon: '🎨', name: 'Crayons', x: 160, y: 150 }
    ];

    let collectedCount = 0;

    sceneViewport.innerHTML = `
      <div class="scene-card" id="clean-room-card">
        <div class="scene-header">
          <h2 class="scene-title">🧸 Magic Clean-Up!</h2>
          <p class="scene-desc">Drag or tap toys to put them into the Magic Toy Box!</p>
        </div>

        <div class="scene-content-area clean-room-stage">
          <div class="toys-scatter-area" id="toys-area">
            ${toys.map(t => `
              <div class="toy-draggable" id="toy-${t.id}" data-id="${t.id}" style="left:${t.x}px; top:${t.y}px;" draggable="true">
                ${t.icon}
              </div>
            `).join('')}
          </div>

          <div class="toy-box-target" id="toy-box-target">
            <span class="toy-box-icon">📦</span>
            <span>Magic Toy Box</span>
          </div>

          <div class="riya-stage" id="riya-clean-stage">
            ${renderRiyaSVG('smiling', 'idle')}
          </div>
        </div>
      </div>
    `;

    speech.speak("Let's clean up our toys! Drag the toys into the box!");

    const box = document.getElementById('toy-box-target');
    const riyaStage = document.getElementById('riya-clean-stage');

    function collectToy(toyEl) {
      if (!toyEl || toyEl.dataset.collected) return;
      toyEl.dataset.collected = 'true';
      collectedCount++;
      audio.playPop();

      const boxRect = box.getBoundingClientRect();
      const toyRect = toyEl.getBoundingClientRect();

      toyEl.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      toyEl.style.left = `${box.offsetLeft + 40}px`;
      toyEl.style.top = `${box.offsetTop + 40}px`;
      toyEl.style.transform = 'scale(0.2) rotate(360deg)';
      toyEl.style.opacity = '0';

      fx.spawnSparkles(boxRect.left + boxRect.width / 2, boxRect.top + boxRect.height / 2, 15);

      if (collectedCount >= toys.length) {
        // Grand Room Transformation
        setTimeout(() => {
          audio.playMagicBurst();
          const card = document.getElementById('clean-room-card');
          if (card) {
            card.style.background = 'linear-gradient(135deg, #FFF9C4 0%, #E1F5FE 100%)';
            card.style.borderColor = '#FFD54F';
          }
          if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('celebrating', 'celebrating');
          fx.spawnSparkles(window.innerWidth / 2, window.innerHeight / 2, 40);
          unlockBadge('cleanup');
          updateMagicEnergy(13);

          speech.speak("Wow! My room is neat, clean, and magical! Great teamwork!", () => {
            setTimeout(mountHelpingScene, 1500);
          });
        }, 500);
      }
    }

    toys.forEach(t => {
      const toyEl = document.getElementById(`toy-${t.id}`);
      if (toyEl) {
        toyEl.addEventListener('click', () => collectToy(toyEl));
        toyEl.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', t.id);
        });
      }
    });

    box.addEventListener('dragover', (e) => {
      e.preventDefault();
      box.classList.add('drag-over');
    });
    box.addEventListener('dragleave', () => {
      box.classList.remove('drag-over');
    });
    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('drag-over');
      const toyId = e.dataTransfer.getData('text/plain');
      const toyEl = document.getElementById(`toy-${toyId}`);
      if (toyEl) collectToy(toyEl);
    });
  }

  // SCENE 6: HELPING OTHERS (STORY INTERACTION)
  function mountHelpingScene() {
    state.currentScene = 'kindness';
    updateFooterTracker('kindness');

    sceneViewport.innerHTML = `
      <div class="scene-card">
        <div class="scene-header">
          <h2 class="scene-title">❤️ Kindness Magic!</h2>
          <p class="scene-desc">Little Star is carrying a heavy star box. Can you help?</p>
        </div>

        <div class="scene-content-area help-scene-content">
          <div class="struggling-companion" id="struggling-companion">
            <span class="sweat-drop">💦</span>
            <div class="heavy-load">⭐📦⭐</div>
            <p style="font-family:var(--font-display); font-weight:700; color:#E65100;">"It's heavy!"</p>
          </div>

          <div class="riya-stage" id="riya-help-stage">
            ${renderRiyaSVG('smiling', 'idle')}
          </div>

          <button id="btn-help-star" class="btn-help-pulse">
            ❤️ HELP LITTLE STAR!
          </button>
        </div>
      </div>
    `;

    speech.speak("Little Star is struggling! Let's help our friend!");

    document.getElementById('btn-help-star').addEventListener('click', (e) => {
      audio.playSuccess();
      const riyaStage = document.getElementById('riya-help-stage');
      if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('helping', 'celebrating');

      const comp = document.getElementById('struggling-companion');
      if (comp) {
        comp.innerHTML = `
          <div style="font-size:3.5rem; animation:starFloat 2s infinite alternate;">🌸⭐🌸</div>
          <p style="font-family:var(--font-display); font-weight:700; color:#2E7D32;">"Thank you!"</p>
        `;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
      unlockBadge('kindness');
      updateMagicEnergy(12);

      speech.speak("Helping feels so good! Thank you, Riya!", () => {
        setTimeout(mountCleanEnvironmentScene, 1500);
      });
    });
  }

  // SCENE 7: CLEAN ENVIRONMENT (PARK LITTER DRAG & COLLECT)
  function mountCleanEnvironmentScene() {
    state.currentScene = 'environment';
    updateFooterTracker('environment');

    const litter = [
      { id: 'banana-peel', icon: '🍌', x: 40, y: 80 },
      { id: 'juice-box', icon: '🧃', x: 140, y: 140 },
      { id: 'paper', icon: '📄', x: 220, y: 60 }
    ];

    let cleanedCount = 0;

    sceneViewport.innerHTML = `
      <div class="scene-card" id="park-card">
        <div class="scene-header">
          <h2 class="scene-title">🌱 Magic Clean World!</h2>
          <p class="scene-desc">Help keep our park clean! Put the litter in the green bin!</p>
        </div>

        <div class="scene-content-area park-clean-stage">
          <div class="litter-scatter-area" id="litter-area">
            ${litter.map(item => `
              <div class="litter-item" id="litter-${item.id}" data-id="${item.id}" style="left:${item.x}px; top:${item.y}px;" draggable="true">
                ${item.icon}
              </div>
            `).join('')}
          </div>

          <div class="trash-bin-target" id="trash-bin-target">
            <span class="trash-bin-icon">🗑️</span>
            <span>Recycle Bin</span>
          </div>

          <div class="riya-stage" id="riya-park-stage">
            ${renderRiyaSVG('smiling', 'idle')}
          </div>
        </div>
      </div>
    `;

    speech.speak("Let's keep our world clean! Put the litter in the bin!");

    const bin = document.getElementById('trash-bin-target');
    const riyaStage = document.getElementById('riya-park-stage');

    function collectLitter(litterEl) {
      if (!litterEl || litterEl.dataset.cleaned) return;
      litterEl.dataset.cleaned = 'true';
      cleanedCount++;
      audio.playPop();

      const binRect = bin.getBoundingClientRect();
      litterEl.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      litterEl.style.left = `${bin.offsetLeft + 30}px`;
      litterEl.style.top = `${bin.offsetTop + 30}px`;
      litterEl.style.transform = 'scale(0.1) rotate(360deg)';
      litterEl.style.opacity = '0';

      fx.spawnSparkles(binRect.left + binRect.width / 2, binRect.top + binRect.height / 2, 15);

      if (cleanedCount >= litter.length) {
        // Park blooms with butterflies and flowers
        setTimeout(() => {
          audio.playMagicBurst();
          const card = document.getElementById('park-card');
          if (card) {
            card.style.background = 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)';
            card.style.borderColor = '#66BB6A';
          }
          if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('celebrating', 'celebrating');
          fx.spawnSparkles(window.innerWidth / 2, window.innerHeight / 2, 45);
          unlockBadge('environment');
          updateMagicEnergy(12);

          speech.speak("Our planet looks so beautiful and happy! Let's keep it clean!", () => {
            setTimeout(mountBedtimeScene, 1500);
          });
        }, 500);
      }
    }

    litter.forEach(item => {
      const itemEl = document.getElementById(`litter-${item.id}`);
      if (itemEl) {
        itemEl.addEventListener('click', () => collectLitter(itemEl));
        itemEl.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', item.id);
        });
      }
    });

    bin.addEventListener('dragover', (e) => {
      e.preventDefault();
      bin.classList.add('drag-over');
    });
    bin.addEventListener('dragleave', () => {
      bin.classList.remove('drag-over');
    });
    bin.addEventListener('drop', (e) => {
      e.preventDefault();
      bin.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      const itemEl = document.getElementById(`litter-${id}`);
      if (itemEl) collectLitter(itemEl);
    });
  }

  // SCENE 8: BEDTIME (SEQUENTIAL EVENING ROUTINE)
  function mountBedtimeScene() {
    state.currentScene = 'bedtime';
    updateFooterTracker('bedtime');

    // Switch backdrop to night
    const backdrop = document.getElementById('world-backdrop');
    if (backdrop) backdrop.className = 'world-backdrop tier-night';

    let currentBedStep = 1;
    const bedtimeSteps = [
      { num: 1, icon: '🧸', label: '1. Put Toys Away', prompt: 'Put toys in their place!' },
      { num: 2, icon: '📱', label: '2. Put Phone Away', prompt: 'Put screens away for sweet dreams!' },
      { num: 3, icon: '🛏️', label: '3. Snuggle in Bed', prompt: 'Get into bed and snuggle up!' },
      { num: 4, icon: '💡', label: '4. Turn Off Light', prompt: 'Turn off the night light!' }
    ];

    sceneViewport.innerHTML = `
      <div class="scene-card" style="background:rgba(38, 50, 56, 0.85); color:#FFF; border-color:#7E57C2;">
        <div class="scene-header">
          <h2 class="scene-title" style="color:#FFD54F;">🌙 Good Night Magic!</h2>
          <p class="scene-desc" style="color:#B0BEC5;">Help Riya get ready for sweet magical dreams!</p>
        </div>

        <div class="scene-content-area bedtime-routine-flow">
          <div class="riya-stage" id="riya-bed-stage">
            ${renderRiyaSVG('smiling', 'idle')}
          </div>

          <div class="bedtime-steps-grid" id="bedtime-steps-grid">
            ${bedtimeSteps.map(s => `
              <button class="bedtime-step-card ${s.num === 1 ? 'current' : ''}" data-step="${s.num}">
                <span style="font-size:2.2rem;">${s.icon}</span>
                <span style="font-family:var(--font-display); font-weight:700; font-size:0.9rem;">${s.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    speech.speak("Night time is here! Let's get ready for bed! Tap step 1!");

    function advanceBedStep(stepNum) {
      if (stepNum !== currentBedStep) return;

      const riyaStage = document.getElementById('riya-bed-stage');
      const rect = riyaStage ? riyaStage.getBoundingClientRect() : { left: 400, top: 300 };

      if (stepNum === 1) {
        audio.playPop();
        fx.spawnSparkles(rect.left + 50, rect.top + 50, 10);
      } else if (stepNum === 2) {
        audio.playPop();
        fx.spawnSparkles(rect.left + 50, rect.top + 50, 10);
      } else if (stepNum === 3) {
        audio.playChime();
        if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('sleeping', 'idle');
        fx.spawnSparkles(rect.left + 50, rect.top + 50, 20);
      } else if (stepNum === 4) {
        audio.playSuccess();
        if (riyaStage) riyaStage.innerHTML = renderRiyaSVG('sleeping', 'idle');
        fx.spawnSparkles(rect.left + 50, rect.top + 50, 40);
        unlockBadge('bedtime');
        updateMagicEnergy(15);

        speech.speak("Good night, Riya! Sweet dreams!", () => {
          setTimeout(triggerGrandCelebration, 1500);
        });
        return;
      }

      currentBedStep++;
      document.querySelectorAll('.bedtime-step-card').forEach(card => {
        const step = parseInt(card.dataset.step, 10);
        card.classList.remove('current', 'done');
        if (step < currentBedStep) {
          card.classList.add('done');
        } else if (step === currentBedStep) {
          card.classList.add('current');
        }
      });

      speech.speak(bedtimeSteps[currentBedStep - 1].prompt);
    }

    document.querySelectorAll('.bedtime-step-card').forEach(card => {
      card.addEventListener('click', () => {
        const step = parseInt(card.dataset.step, 10);
        advanceBedStep(step);
      });
    });
  }

  // =========================================================================
  // 8. BIG WOW CELEBRATION & MAGIC TRANSFORMATION
  // =========================================================================
  function triggerGrandCelebration() {
    state.currentScene = 'celebration';
    audio.playFanfare();
    fx.spawnConfetti(120);

    const backdrop = document.getElementById('world-backdrop');
    if (backdrop) backdrop.className = 'world-backdrop tier-magic';

    const overlay = document.getElementById('celebration-overlay');
    if (overlay) overlay.classList.remove('hidden');

    speech.speak("Magic Day Complete! Good habits make every single day magical! You made today amazing!");

    // Continuous sparkles while celebrating
    const celebrationInterval = setInterval(() => {
      if (state.currentScene !== 'celebration' && state.currentScene !== 'freeplay') {
        clearInterval(celebrationInterval);
        return;
      }
      fx.spawnSparkles(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7, 10);
    }, 400);

    document.getElementById('btn-explore-freeplay').addEventListener('click', () => {
      if (overlay) overlay.classList.add('hidden');
      startFreePlayMode();
    });

    document.getElementById('btn-play-again').addEventListener('click', () => {
      if (overlay) overlay.classList.add('hidden');
      resetGame();
    });
  }

  // =========================================================================
  // 9. INTERACTIVE FREE PLAY MODE
  // =========================================================================
  function startFreePlayMode() {
    state.currentScene = 'freeplay';
    const freeplayBar = document.getElementById('freeplay-bar');
    if (freeplayBar) freeplayBar.classList.remove('hidden');

    sceneViewport.innerHTML = `
      <div class="scene-card" style="background:rgba(255,255,255,0.7); border-color:#FFD54F;">
        <div class="scene-header">
          <h2 class="scene-title">🌸 Enchanted Magic Wonderland!</h2>
          <p class="scene-desc">Tap anything to make it sing, dance, and sparkle!</p>
        </div>

        <div class="scene-content-area" style="display:flex; justify-content:space-around; align-items:center; width:100%;">
          <div class="freeplay-interactive" id="fp-flower-1" style="font-size:3.8rem; cursor:pointer;" title="Tap me!">🌺</div>
          <div class="freeplay-interactive" id="fp-butterfly" style="font-size:3.8rem; cursor:pointer;" title="Tap me!">🦋</div>
          
          <div class="riya-stage" id="fp-riya" style="cursor:pointer;" title="Tap Riya!">
            ${renderRiyaSVG('celebrating', 'celebrating')}
          </div>

          <div class="freeplay-interactive" id="fp-star" style="font-size:3.8rem; cursor:pointer;" title="Tap Star!">⭐</div>
          <div class="freeplay-interactive" id="fp-flower-2" style="font-size:3.8rem; cursor:pointer;" title="Tap me!">🌻</div>
        </div>
      </div>
    `;

    speech.speak("Tap Riya, Little Star, flowers, and butterflies to make magic!");

    // Interactive free play click effects
    const bindInteractive = (id, noteIdx, effectType) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', () => {
        audio.playNotePentatonic(noteIdx);
        const rect = el.getBoundingClientRect();
        if (effectType === 'sparkle') {
          fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        } else if (effectType === 'bubble') {
          fx.spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        }
        el.style.transform = 'scale(1.3) rotate(15deg)';
        setTimeout(() => el.style.transform = 'scale(1) rotate(0deg)', 300);
      });
    };

    bindInteractive('fp-flower-1', 0, 'sparkle');
    bindInteractive('fp-butterfly', 2, 'sparkle');
    bindInteractive('fp-riya', 4, 'sparkle');
    bindInteractive('fp-star', 5, 'sparkle');
    bindInteractive('fp-flower-2', 7, 'sparkle');

    document.getElementById('btn-freeplay-replay').addEventListener('click', resetGame);
  }

  function resetGame() {
    state.magicEnergy = 0;
    state.completedHabits.clear();
    state.unlockedBadges.clear();
    
    const fillEl = document.getElementById('meter-fill');
    const percentEl = document.getElementById('meter-percent');
    if (fillEl) fillEl.style.width = '0%';
    if (percentEl) percentEl.textContent = '0%';

    const backdrop = document.getElementById('world-backdrop');
    if (backdrop) backdrop.className = 'world-backdrop tier-0';

    const freeplayBar = document.getElementById('freeplay-bar');
    if (freeplayBar) freeplayBar.classList.add('hidden');

    document.querySelectorAll('.step-dot').forEach(dot => {
      dot.classList.remove('active', 'completed');
    });

    renderBadgesModal();
    const countPill = document.getElementById('badge-count-pill');
    if (countPill) countPill.textContent = '0/7';

    mountIntroScene();
  }

  // =========================================================================
  // 10. GLOBAL CONTROLS & LISTENERS
  // =========================================================================
  // Voice replay button
  const btnReplayVoice = document.getElementById('btn-replay-voice');
  if (btnReplayVoice) {
    btnReplayVoice.addEventListener('click', () => {
      audio.playClick();
      speech.replay();
    });
  }

  // Sound toggle button
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      audio.soundEnabled = !audio.soundEnabled;
      btnToggleSound.classList.toggle('active', audio.soundEnabled);
      btnToggleSound.textContent = audio.soundEnabled ? '🎵' : '🔇';
    });
  }

  // Badges drawer modal
  const btnViewBadges = document.getElementById('btn-view-badges');
  const badgesModal = document.getElementById('badges-modal');
  const btnCloseBadges = document.getElementById('btn-close-badges');

  if (btnViewBadges && badgesModal) {
    btnViewBadges.addEventListener('click', () => {
      audio.playClick();
      renderBadgesModal();
      badgesModal.classList.remove('hidden');
    });
  }
  if (btnCloseBadges && badgesModal) {
    btnCloseBadges.addEventListener('click', () => {
      audio.playClick();
      badgesModal.classList.add('hidden');
    });
  }
  if (badgesModal) {
    badgesModal.addEventListener('click', (e) => {
      if (e.target === badgesModal) badgesModal.classList.add('hidden');
    });
  }

  // Little Star companion click interaction
  const companionStar = document.getElementById('companion-star');
  if (companionStar) {
    companionStar.addEventListener('click', () => {
      audio.playNotePentatonic(5);
      const rect = companionStar.getBoundingClientRect();
      fx.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
      speech.replay();
    });
  }

  // Initial Boot
  renderBadgesModal();
  mountIntroScene();
});
