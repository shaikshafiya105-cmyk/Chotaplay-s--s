/**
 * RIYA'S MAGIC SIZE FACTORY - CHOTAPLAY UKG MATHEMATICS
 * High-performance Vanilla JavaScript ES6+ Engine
 * Concepts: Small to Big, Big to Small, Size Ordering & Sorting
 */

(function () {
  'use strict';

  // ============================================================
  // 1. SOUND SYSTEM (Web Audio API Synthesizer)
  // ============================================================
  class SoundSystem {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.25) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }

    playPop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }

    playGrowSound() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.7);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.75);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.75);

        // Add chime sparkle
        setTimeout(() => this.playChime(784), 300);
        setTimeout(() => this.playChime(1046), 550);
      } catch (e) {}
    }

    playShrinkSound() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.6);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.65);

        setTimeout(() => this.playPop(), 450);
      } catch (e) {}
    }

    playChime(freq = 880) {
      if (!this.enabled) return;
      this.playTone(freq, 0.4, 'sine', 0.2);
    }

    playSuccess() {
      if (!this.enabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((note, idx) => {
        setTimeout(() => {
          this.playTone(note, 0.35, 'triangle', 0.25);
        }, idx * 120);
      });
    }

    playTrainWhistle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const playTwoTone = () => {
          this.playTone(587.33, 0.4, 'sawtooth', 0.15); // D5
          this.playTone(739.99, 0.4, 'sawtooth', 0.15); // F#5
        };
        playTwoTone();
        setTimeout(playTwoTone, 450);
      } catch (e) {}
    }

    playFanfare() {
      if (!this.enabled) return;
      const fanfare = [
        { f: 523, d: 0.2, t: 0 },
        { f: 523, d: 0.2, t: 180 },
        { f: 523, d: 0.2, t: 360 },
        { f: 659, d: 0.5, t: 540 },
        { f: 784, d: 0.8, t: 900 }
      ];
      fanfare.forEach(n => {
        setTimeout(() => this.playTone(n.f, n.d, 'triangle', 0.3), n.t);
      });
    }

    playBuzz() {
      this.playTone(180, 0.25, 'sawtooth', 0.15);
    }
  }

  // ============================================================
  // 2. VOICE & SPEECH SYSTEM (window.speechSynthesis + Subtitles)
  // ============================================================
  class VoiceSystem {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.currentVoice = null;
      this.lastSpokenText = '';
      this.lastSpeaker = 'Little Star';
      this.speechCallback = null;

      if (this.synth) {
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.selectVoice();
        }
        this.selectVoice();
      }
    }

    selectVoice() {
      if (!this.synth) return;
      const voices = this.synth.getVoices();
      // Try to find a friendly, pleasant English voice
      this.currentVoice = voices.find(v => 
        (v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google US English')))
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
    }

    speak(text, speaker = 'Little Star', onEnd = null) {
      this.lastSpokenText = text;
      this.lastSpeaker = speaker;
      this.speechCallback = onEnd;

      // Update UI Speech Bubble
      const speechBubble = document.getElementById('speech-bubble');
      const speakerEl = document.getElementById('speaker-name');
      const speechTextEl = document.getElementById('speech-text');
      const riyaAvatar = document.getElementById('riya-avatar');
      const starAvatar = document.getElementById('star-avatar');

      if (speakerEl) speakerEl.textContent = speaker;
      if (speechTextEl) speechTextEl.textContent = text;

      if (speechBubble) {
        if (speaker === 'Little Star') {
          speechBubble.classList.add('star-speaking');
          if (starAvatar) starAvatar.classList.add('talking');
          if (riyaAvatar) riyaAvatar.classList.remove('talking');
        } else {
          speechBubble.classList.remove('star-speaking');
          if (riyaAvatar) riyaAvatar.classList.add('talking');
          if (starAvatar) starAvatar.classList.remove('talking');
        }
      }

      if (!this.synth) {
        if (onEnd) setTimeout(onEnd, 1500);
        return;
      }

      try {
        this.synth.cancel(); // Stop any pending speech
        const utter = new SpeechSynthesisUtterance(text);
        if (this.currentVoice) utter.voice = this.currentVoice;
        
        // Warm, friendly pitch and rate for young learners
        utter.rate = 0.95;
        utter.pitch = speaker === 'Little Star' ? 1.35 : 1.15;
        utter.volume = 1.0;

        utter.onend = () => {
          if (riyaAvatar) riyaAvatar.classList.remove('talking');
          if (starAvatar) starAvatar.classList.remove('talking');
          if (this.speechCallback) {
            const cb = this.speechCallback;
            this.speechCallback = null;
            cb();
          }
        };

        utter.onerror = () => {
          if (riyaAvatar) riyaAvatar.classList.remove('talking');
          if (starAvatar) starAvatar.classList.remove('talking');
          if (this.speechCallback) {
            const cb = this.speechCallback;
            this.speechCallback = null;
            cb();
          }
        };

        this.synth.speak(utter);
      } catch (e) {
        console.warn('SpeechSynthesis error:', e);
        if (onEnd) setTimeout(onEnd, 1500);
      }
    }

    repeatLast() {
      if (this.lastSpokenText) {
        this.speak(this.lastSpokenText, this.lastSpeaker);
      }
    }
  }

  // ============================================================
  // 3. GRAPHICS & SVG LIBRARY (Riya, Little Star, Toys, Machines)
  // ============================================================
  const Graphics = {
    getRiyaSVG() {
      return `
        <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="riyaSkin" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#ffe0bd"/>
              <stop offset="100%" stop-color="#f8c291"/>
            </radialGradient>
            <linearGradient id="riyaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3d2314"/>
              <stop offset="100%" stop-color="#231309"/>
            </linearGradient>
            <linearGradient id="riyaDress" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff007f"/>
              <stop offset="100%" stop-color="#7928ca"/>
            </linearGradient>
          </defs>
          <!-- Hair Back / Ponytails -->
          <circle cx="28" cy="42" r="18" fill="url(#riyaHair)"/>
          <circle cx="92" cy="42" r="18" fill="url(#riyaHair)"/>
          <circle cx="28" cy="42" r="10" fill="#f72585"/>
          <circle cx="92" cy="42" r="10" fill="#f72585"/>

          <!-- Body / Dress -->
          <path d="M 40 85 Q 60 75 80 85 L 90 115 Q 60 120 30 115 Z" fill="url(#riyaDress)"/>
          <!-- Collar -->
          <path d="M 48 85 Q 60 95 72 85" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>

          <!-- Head -->
          <circle cx="60" cy="55" r="32" fill="url(#riyaSkin)"/>

          <!-- Hair Bangs -->
          <path d="M 28 48 Q 60 30 92 48 Q 80 32 60 32 Q 40 32 28 48 Z" fill="url(#riyaHair)"/>

          <!-- Eyes -->
          <ellipse cx="48" cy="54" rx="4.5" ry="6" fill="#222"/>
          <ellipse cx="72" cy="54" rx="4.5" ry="6" fill="#222"/>
          <circle cx="49.5" cy="52" r="1.8" fill="#fff"/>
          <circle cx="73.5" cy="52" r="1.8" fill="#fff"/>

          <!-- Cheeks -->
          <circle cx="42" cy="62" r="5" fill="#ff70a6" opacity="0.6"/>
          <circle cx="78" cy="62" r="5" fill="#ff70a6" opacity="0.6"/>

          <!-- Smile -->
          <path d="M 52 64 Q 60 73 68 64" fill="none" stroke="#d90429" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;
    },

    getLittleStarSVG() {
      return `
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff3b0"/>
              <stop offset="40%" stop-color="#ffd166"/>
              <stop offset="100%" stop-color="#ffb703"/>
            </linearGradient>
            <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          <!-- 5-Point Star Body -->
          <polygon points="50,6 63,35 95,38 71,60 78,92 50,75 22,92 29,60 5,38 37,35" 
                   fill="url(#starGrad)" stroke="#fb8500" stroke-width="3" stroke-linejoin="round" filter="url(#starGlow)"/>
          
          <!-- Cute Eyes -->
          <circle cx="42" cy="46" r="4" fill="#111"/>
          <circle cx="58" cy="46" r="4" fill="#111"/>
          <circle cx="43.5" cy="44.5" r="1.5" fill="#fff"/>
          <circle cx="59.5" cy="44.5" r="1.5" fill="#fff"/>

          <!-- Rosy Cheeks -->
          <circle cx="34" cy="52" r="4" fill="#ff006e" opacity="0.5"/>
          <circle cx="66" cy="52" r="4" fill="#ff006e" opacity="0.5"/>

          <!-- Big Happy Open Smile -->
          <path d="M 44 52 Q 50 60 56 52" fill="#d90429" stroke="#900" stroke-width="1.5"/>
        </svg>
      `;
    },

    getMachineIntroSVG() {
      return `
        <svg viewBox="0 0 140 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="25" width="100" height="65" rx="12" fill="#4361ee" stroke="#4cc9f0" stroke-width="4"/>
          <circle cx="50" cy="55" r="18" fill="#ffd166" stroke="#fb8500" stroke-width="3"/>
          <circle cx="90" cy="55" r="14" fill="#f72585" stroke="#7209b7" stroke-width="3"/>
          <rect x="40" y="10" width="15" height="15" fill="#06d6a0" rx="3"/>
          <rect x="85" y="10" width="15" height="15" fill="#f77f00" rx="3"/>
          <circle cx="50" cy="55" r="6" fill="#111"/>
          <circle cx="90" cy="55" r="5" fill="#111"/>
        </svg>
      `;
    },

    getObjectSVG(type) {
      switch (type) {
        case 'apple':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#ff4d6d"/>
                  <stop offset="70%" stop-color="#c9184a"/>
                  <stop offset="100%" stop-color="#800f2f"/>
                </radialGradient>
              </defs>
              <!-- Stem -->
              <path d="M 50 25 Q 55 10 65 14" fill="none" stroke="#5c4033" stroke-width="5" stroke-linecap="round"/>
              <!-- Green Leaf -->
              <path d="M 52 22 Q 70 12 68 28 Q 58 32 52 22 Z" fill="#38b000" stroke="#007200" stroke-width="1.5"/>
              <!-- Apple Body -->
              <path d="M 50 32 C 30 20, 10 40, 18 68 C 24 90, 44 95, 50 90 C 56 95, 76 90, 82 68 C 90 40, 70 20, 50 32 Z" 
                    fill="url(#appleGrad)" stroke="#590d22" stroke-width="2.5"/>
              <!-- Gloss Highlight -->
              <ellipse cx="34" cy="45" rx="7" ry="12" transform="rotate(-25 34 45)" fill="#fff" opacity="0.45"/>
            </svg>
          `;
        case 'balloon':
          return `
            <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="balloonGrad" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stop-color="#b5179e"/>
                  <stop offset="60%" stop-color="#7209b7"/>
                  <stop offset="100%" stop-color="#3f37c9"/>
                </radialGradient>
              </defs>
              <!-- String -->
              <path d="M 50 82 Q 40 94 52 108" fill="none" stroke="#e0aaff" stroke-width="2.5" stroke-linecap="round"/>
              <!-- Tie Knot -->
              <polygon points="46,84 54,84 50,78" fill="#7209b7"/>
              <!-- Balloon Oval Body -->
              <ellipse cx="50" cy="44" rx="36" ry="40" fill="url(#balloonGrad)" stroke="#480ca8" stroke-width="2.5"/>
              <!-- Shine -->
              <ellipse cx="35" cy="30" rx="8" ry="15" transform="rotate(-30 35 30)" fill="#fff" opacity="0.5"/>
            </svg>
          `;
        case 'ball':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="44" fill="#ffd166" stroke="#333" stroke-width="3"/>
              <path d="M 50 6 C 25 25, 25 75, 50 94 C 30 75, 30 25, 50 6 Z" fill="#ef476f"/>
              <path d="M 50 6 C 75 25, 75 75, 50 94 C 70 75, 70 25, 50 6 Z" fill="#118ab2"/>
              <circle cx="50" cy="50" r="10" fill="#06d6a0" stroke="#333" stroke-width="2"/>
              <ellipse cx="36" cy="30" rx="6" ry="10" transform="rotate(-30 36 30)" fill="#fff" opacity="0.5"/>
            </svg>
          `;
        case 'star':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,5 64,36 98,39 72,62 80,95 50,78 20,95 28,62 2,39 36,36" 
                       fill="#ffd166" stroke="#fb8500" stroke-width="3" stroke-linejoin="round"/>
              <polygon points="50,15 60,38 84,40 65,57 71,81 50,68 29,81 35,57 16,40 40,38" 
                       fill="#fff3b0" opacity="0.6"/>
              <circle cx="50" cy="50" r="12" fill="#ffb703"/>
            </svg>
          `;
        case 'flower':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Petals -->
              <circle cx="50" cy="22" r="16" fill="#f72585"/>
              <circle cx="78" cy="50" r="16" fill="#f72585"/>
              <circle cx="50" cy="78" r="16" fill="#f72585"/>
              <circle cx="22" cy="50" r="16" fill="#f72585"/>
              <circle cx="70" cy="30" r="16" fill="#ff70a6"/>
              <circle cx="70" cy="70" r="16" fill="#ff70a6"/>
              <circle cx="30" cy="70" r="16" fill="#ff70a6"/>
              <circle cx="30" cy="30" r="16" fill="#ff70a6"/>
              <!-- Center -->
              <circle cx="50" cy="50" r="18" fill="#ffd166" stroke="#f77f00" stroke-width="3"/>
              <!-- Happy Face on Flower -->
              <circle cx="44" cy="46" r="2.5" fill="#333"/>
              <circle cx="56" cy="46" r="2.5" fill="#333"/>
              <path d="M 45 53 Q 50 58 55 53" fill="none" stroke="#d90429" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `;
        case 'car':
          return `
            <svg viewBox="0 0 110 80" xmlns="http://www.w3.org/2000/svg">
              <!-- Car Body -->
              <path d="M 10 50 L 25 30 Q 35 20 60 20 L 80 20 Q 95 20 100 45 L 105 50 Q 105 60 95 60 L 15 60 Q 10 60 10 50 Z" 
                    fill="#e63946" stroke="#9d0208" stroke-width="3"/>
              <!-- Window -->
              <path d="M 32 30 L 52 30 L 52 46 L 24 46 Z" fill="#a8dadc"/>
              <path d="M 58 30 L 78 30 L 86 46 L 58 46 Z" fill="#a8dadc"/>
              <!-- Wheels -->
              <circle cx="30" cy="60" r="14" fill="#22223b" stroke="#f2e9e4" stroke-width="3"/>
              <circle cx="80" cy="60" r="14" fill="#22223b" stroke="#f2e9e4" stroke-width="3"/>
              <circle cx="30" cy="60" r="5" fill="#ffd166"/>
              <circle cx="80" cy="60" r="5" fill="#ffd166"/>
              <!-- Headlight -->
              <circle cx="102" cy="50" r="4" fill="#ffe66d"/>
            </svg>
          `;
        case 'teddy':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Ears -->
              <circle cx="28" cy="28" r="14" fill="#b07d62"/>
              <circle cx="72" cy="28" r="14" fill="#b07d62"/>
              <circle cx="28" cy="28" r="7" fill="#eddcd2"/>
              <circle cx="72" cy="28" r="7" fill="#eddcd2"/>
              <!-- Body -->
              <ellipse cx="50" cy="68" rx="30" ry="24" fill="#b07d62"/>
              <ellipse cx="50" cy="68" rx="18" ry="14" fill="#eddcd2"/>
              <!-- Head -->
              <circle cx="50" cy="42" r="26" fill="#b07d62"/>
              <!-- Muzzle -->
              <ellipse cx="50" cy="48" rx="12" ry="9" fill="#eddcd2"/>
              <polygon points="50,44 46,41 54,41" fill="#382110"/>
              <path d="M 50 44 L 50 50 M 47 48 Q 50 52 53 48" fill="none" stroke="#382110" stroke-width="1.5"/>
              <!-- Eyes -->
              <circle cx="40" cy="38" r="3" fill="#222"/>
              <circle cx="60" cy="38" r="3" fill="#222"/>
            </svg>
          `;
        case 'gift':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Box Base -->
              <rect x="18" y="38" width="64" height="52" rx="6" fill="#4cc9f0" stroke="#0077b6" stroke-width="3"/>
              <!-- Lid -->
              <rect x="14" y="28" width="72" height="14" rx="4" fill="#4895ef" stroke="#0077b6" stroke-width="3"/>
              <!-- Vertical Ribbon -->
              <rect x="44" y="28" width="12" height="62" fill="#ffd166"/>
              <!-- Horizontal Ribbon -->
              <rect x="18" y="58" width="64" height="12" fill="#ffd166"/>
              <!-- Bow -->
              <ellipse cx="38" cy="22" rx="10" ry="6" transform="rotate(-30 38 22)" fill="#ffd166" stroke="#e09f3e" stroke-width="2"/>
              <ellipse cx="62" cy="22" rx="10" ry="6" transform="rotate(30 62 22)" fill="#ffd166" stroke="#e09f3e" stroke-width="2"/>
              <circle cx="50" cy="24" r="5" fill="#f72585"/>
            </svg>
          `;
        default:
          return this.getObjectSVG('apple');
      }
    }
  };

  // ============================================================
  // 4. PARTICLE CANVAS & SPARKLE SYSTEM
  // ============================================================
  class AmbientParticleCanvas {
    constructor() {
      this.canvas = document.getElementById('magic-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if (this.canvas && this.ctx) {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
      }
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    initParticles() {
      this.particles = [];
      const count = Math.floor((this.width * this.height) / 18000);
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 2.5 + 1,
          color: ['#ffd166', '#f72585', '#4cc9f0', '#06d6a0', '#ffffff'][Math.floor(Math.random() * 5)],
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }
    }

    animate() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.015;

        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;

        const clampedAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        this.ctx.save();
        this.ctx.globalAlpha = clampedAlpha;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // ============================================================
  // 5. DRAG & DROP / POINTER & TOUCH MANAGER
  // ============================================================
  class DragDropManager {
    constructor(soundSys) {
      this.sound = soundSys;
      this.selectedObject = null;
      this.draggedElement = null;
      this.dragGhost = null;
      this.dropCallback = null;
      this.activeDropZones = [];

      this.initGlobalEvents();
    }

    initGlobalEvents() {
      document.addEventListener('pointerup', (e) => this.onPointerUp(e));
      document.addEventListener('pointermove', (e) => this.onPointerMove(e));
    }

    registerDraggable(element, data, onDropCallback) {
      if (!element) return;
      element.setAttribute('draggable', 'false'); // using custom pointer engine
      element.dataset.objData = JSON.stringify(data);

      element.onpointerdown = (e) => {
        e.preventDefault();
        this.sound.init();
        this.startDrag(element, data, onDropCallback, e);
      };

      // Tap fallback for younger kids: Click to select, then click target slot
      element.onclick = (e) => {
        e.stopPropagation();
        this.handleTapSelect(element, data, onDropCallback);
      };
    }

    startDrag(element, data, callback, e) {
      this.draggedElement = element;
      this.dropCallback = callback;

      this.sound.playPop();

      // Create ghost for smooth visual follow
      const rect = element.getBoundingClientRect();
      this.dragGhost = element.cloneNode(true);
      this.dragGhost.classList.add('is-dragging');
      this.dragGhost.style.position = 'fixed';
      this.dragGhost.style.left = `${rect.left}px`;
      this.dragGhost.style.top = `${rect.top}px`;
      this.dragGhost.style.width = `${rect.width}px`;
      this.dragGhost.style.height = `${rect.height}px`;
      this.dragGhost.style.zIndex = '9999';
      this.dragGhost.style.pointerEvents = 'none';

      document.body.appendChild(this.dragGhost);
      element.style.opacity = '0.3';

      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;
    }

    onPointerMove(e) {
      if (!this.dragGhost) return;
      this.dragGhost.style.left = `${e.clientX - this.offsetX}px`;
      this.dragGhost.style.top = `${e.clientY - this.offsetY}px`;

      // Check drop target hover state
      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const dropZone = elemBelow ? elemBelow.closest('[data-drop-zone], .parade-slot, .carriage-bed') : null;

      document.querySelectorAll('.hover-active').forEach(el => el.classList.remove('hover-active'));
      if (dropZone) {
        dropZone.classList.add('hover-active');
      }
    }

    onPointerUp(e) {
      if (!this.draggedElement || !this.dragGhost) return;

      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const dropZone = elemBelow ? elemBelow.closest('[data-drop-zone], .parade-slot, .carriage-bed') : null;

      if (dropZone && this.dropCallback) {
        const data = JSON.parse(this.draggedElement.dataset.objData || '{}');
        const handled = this.dropCallback(data, dropZone, this.draggedElement);
        if (handled) {
          this.sound.playPop();
        }
      }

      this.cleanupDrag();
    }

    handleTapSelect(element, data, callback) {
      if (this.selectedObject === element) {
        element.classList.remove('bounce-celebrate');
        this.selectedObject = null;
        return;
      }

      document.querySelectorAll('.game-object').forEach(el => el.classList.remove('bounce-celebrate'));
      this.selectedObject = element;
      element.classList.add('bounce-celebrate');
      this.sound.playPop();

      // Highlight eligible drop zones
      document.querySelectorAll('[data-drop-zone], .parade-slot, .carriage-bed').forEach(zone => {
        zone.onclick = (e) => {
          if (!this.selectedObject) return;
          const handled = callback(data, zone, this.selectedObject);
          if (handled) {
            this.sound.playPop();
            this.selectedObject.classList.remove('bounce-celebrate');
            this.selectedObject = null;
          }
        };
      });
    }

    cleanupDrag() {
      if (this.dragGhost && this.dragGhost.parentNode) {
        this.dragGhost.parentNode.removeChild(this.dragGhost);
      }
      if (this.draggedElement) {
        this.draggedElement.style.opacity = '1';
      }
      this.dragGhost = null;
      this.draggedElement = null;
      document.querySelectorAll('.hover-active').forEach(el => el.classList.remove('hover-active'));
    }
  }

  // ============================================================
  // 6. MAIN GAME ENGINE & STATE MACHINE
  // ============================================================
  class GameEngine {
    constructor() {
      this.sound = new SoundSystem();
      this.voice = new VoiceSystem();
      this.dragDrop = new DragDropManager(this.sound);
      this.currentSceneId = 'scene-intro';
      this.repairedGears = 0;
      this.currentToyType = 'apple';
      this.workshopSize = 'medium'; // 'small' | 'medium' | 'big'
      this.compareRound = 1;

      this.init();
    }

    init() {
      // Ambient canvas
      new AmbientParticleCanvas();

      // Render static character avatars
      const riyaHost = document.getElementById('riya-svg-host');
      const starHost = document.getElementById('star-svg-host');
      const introMachine = document.getElementById('intro-machine-svg');

      if (riyaHost) riyaHost.innerHTML = Graphics.getRiyaSVG();
      if (starHost) starHost.innerHTML = Graphics.getLittleStarSVG();
      if (introMachine) introMachine.innerHTML = Graphics.getMachineIntroSVG();

      this.bindHeaderControls();
      this.bindWorkshopControls();

      // Start on Scene Intro
      this.showScene('scene-intro');
      setTimeout(() => {
        this.voice.speak("Welcome to Riya's Magic Size Factory! The Size Machine needs our help! Tap Start to fix it!", "Little Star");
      }, 500);
    }

    bindHeaderControls() {
      const btnReplay = document.getElementById('btn-replay-voice');
      const bubbleListen = document.getElementById('bubble-listen-btn');
      const btnSound = document.getElementById('btn-sound-toggle');
      const soundIcon = document.getElementById('sound-icon');
      const btnRestart = document.getElementById('btn-restart');
      const btnWorkshop = document.getElementById('btn-workshop-mode');
      const btnStartFactory = document.getElementById('btn-start-factory');
      const btnReplayAll = document.getElementById('btn-replay-all');
      const btnGotoWorkshop = document.getElementById('btn-goto-workshop');

      if (btnReplay) btnReplay.addEventListener('click', () => { this.sound.init(); this.voice.repeatLast(); });
      if (bubbleListen) bubbleListen.addEventListener('click', () => { this.sound.init(); this.voice.repeatLast(); });

      if (btnSound) {
        btnSound.addEventListener('click', () => {
          const enabled = this.sound.toggle();
          if (soundIcon) soundIcon.textContent = enabled ? '🎵' : '🔇';
        });
      }

      if (btnRestart) {
        btnRestart.addEventListener('click', () => {
          this.sound.init();
          this.repairedGears = 0;
          this.updateProgressMeter();
          this.showScene('scene-intro');
          this.voice.speak("Let's restart our Size Factory adventure!", "Riya");
        });
      }

      if (btnWorkshop) {
        btnWorkshop.addEventListener('click', () => {
          this.sound.init();
          this.showScene('scene-workshop');
          this.loadWorkshopStage();
        });
      }

      if (btnStartFactory) {
        btnStartFactory.addEventListener('click', () => {
          this.sound.init();
          this.sound.playSuccess();
          this.startGrowGame();
        });
      }

      if (btnReplayAll) {
        btnReplayAll.addEventListener('click', () => {
          this.sound.init();
          this.repairedGears = 0;
          this.updateProgressMeter();
          this.startGrowGame();
        });
      }

      if (btnGotoWorkshop) {
        btnGotoWorkshop.addEventListener('click', () => {
          this.sound.init();
          this.showScene('scene-workshop');
          this.loadWorkshopStage();
        });
      }
    }

    showScene(sceneId) {
      document.querySelectorAll('.scene').forEach(sc => sc.classList.remove('active'));
      const target = document.getElementById(sceneId);
      if (target) {
        target.classList.add('active');
        this.currentSceneId = sceneId;
      }
    }

    repairGearStep() {
      this.repairedGears = Math.min(6, this.repairedGears + 1);
      this.updateProgressMeter();

      const riyaAvatar = document.getElementById('riya-avatar');
      const starAvatar = document.getElementById('star-avatar');
      if (riyaAvatar) riyaAvatar.classList.add('celebrate');
      if (starAvatar) starAvatar.classList.add('celebrate');
      setTimeout(() => {
        if (riyaAvatar) riyaAvatar.classList.remove('celebrate');
        if (starAvatar) starAvatar.classList.remove('celebrate');
      }, 1200);
    }

    updateProgressMeter() {
      const countEl = document.getElementById('progress-count');
      if (countEl) countEl.textContent = this.repairedGears;

      document.querySelectorAll('.gear-step').forEach((step, idx) => {
        if (idx < this.repairedGears) {
          step.classList.add('repaired');
        } else {
          step.classList.remove('repaired');
        }
      });
    }

    // ============================================================
    // MINI-GAME 1: MAGIC GROW MACHINE (Small -> Medium -> Big)
    // ============================================================
    startGrowGame() {
      this.showScene('scene-grow');
      const sourceSlot = document.getElementById('grow-source-slot');
      const chamberSlot = document.getElementById('grow-chamber-slot');
      const pedestal = document.getElementById('grow-output-pedestal');
      const leverBtn = document.getElementById('btn-activate-grow');
      const chamber = document.getElementById('grow-chamber');

      if (!sourceSlot || !chamberSlot || !pedestal || !leverBtn) return;

      sourceSlot.innerHTML = '';
      chamberSlot.innerHTML = '<div class="drop-hint-ghost">Place Small Object Here</div>';
      pedestal.innerHTML = '<div class="pedestal-base"></div>';
      leverBtn.disabled = true;

      // Reset Step indicators
      document.getElementById('grow-step-small').className = 'step-pill active';
      document.getElementById('grow-step-medium').className = 'step-pill';
      document.getElementById('grow-step-big').className = 'step-pill';

      // Create Small Apple
      const smallApple = document.createElement('div');
      smallApple.className = 'game-object size-small';
      smallApple.innerHTML = Graphics.getObjectSVG('apple');
      sourceSlot.appendChild(smallApple);

      this.voice.speak("Look at this small apple! Can you drag or tap it into the Magic Grow Machine to make it BIG?", "Little Star");

      // Register Drag/Tap into Grow Chamber
      this.dragDrop.registerDraggable(smallApple, { type: 'apple', size: 'small' }, (data, targetZone, draggedEl) => {
        if (targetZone.dataset.dropZone === 'grow') {
          chamberSlot.innerHTML = '';
          draggedEl.parentNode.removeChild(draggedEl);
          chamberSlot.appendChild(draggedEl);
          leverBtn.disabled = false;
          leverBtn.classList.add('pulse-glow');
          this.voice.speak("Now press MAGIC GROW to watch it get bigger!", "Riya");
          return true;
        }
        return false;
      });

      leverBtn.onclick = () => {
        leverBtn.disabled = true;
        leverBtn.classList.remove('pulse-glow');
        chamber.classList.add('operating');
        this.sound.playGrowSound();

        const objInChamber = chamberSlot.querySelector('.game-object');
        if (objInChamber) {
          // Stage 1 -> Medium
          setTimeout(() => {
            document.getElementById('grow-step-medium').classList.add('active');
            objInChamber.className = 'game-object size-medium';
            this.sound.playChime(660);
          }, 600);

          // Stage 2 -> Big
          setTimeout(() => {
            document.getElementById('grow-step-big').classList.add('active');
            objInChamber.className = 'game-object size-big anim-grow';
            this.sound.playChime(880);
          }, 1200);

          // Finish & Transfer to Output Pedestal
          setTimeout(() => {
            chamber.classList.remove('operating');
            pedestal.innerHTML = '<div class="pedestal-base"></div>';
            chamberSlot.innerHTML = '<div class="drop-hint-ghost">Empty</div>';
            pedestal.appendChild(objInChamber);
            objInChamber.classList.add('bounce-celebrate');

            this.sound.playSuccess();
            this.repairGearStep();
            this.voice.speak("Small to big! Look how huge and juicy it became! Great job!", "Riya", () => {
              setTimeout(() => this.startShrinkGame(), 1800);
            });
          }, 2000);
        }
      };
    }

    // ============================================================
    // MINI-GAME 2: MAGIC SHRINK MACHINE (Big -> Medium -> Small)
    // ============================================================
    startShrinkGame() {
      this.showScene('scene-shrink');
      const sourceSlot = document.getElementById('shrink-source-slot');
      const chamberSlot = document.getElementById('shrink-chamber-slot');
      const pedestal = document.getElementById('shrink-output-pedestal');
      const leverBtn = document.getElementById('btn-activate-shrink');
      const chamber = document.getElementById('shrink-chamber');

      if (!sourceSlot || !chamberSlot || !pedestal || !leverBtn) return;

      sourceSlot.innerHTML = '';
      chamberSlot.innerHTML = '<div class="drop-hint-ghost">Place Big Object Here</div>';
      pedestal.innerHTML = '<div class="pedestal-base"></div>';
      leverBtn.disabled = true;

      // Reset Step Indicators
      document.getElementById('shrink-step-big').className = 'step-pill active';
      document.getElementById('shrink-step-medium').className = 'step-pill';
      document.getElementById('shrink-step-small').className = 'step-pill';

      // Create Big Balloon
      const bigBalloon = document.createElement('div');
      bigBalloon.className = 'game-object size-big';
      bigBalloon.innerHTML = Graphics.getObjectSVG('balloon');
      sourceSlot.appendChild(bigBalloon);

      this.voice.speak("This balloon is very big! Can you put it into the Magic Shrink Machine to make it SMALL?", "Little Star");

      this.dragDrop.registerDraggable(bigBalloon, { type: 'balloon', size: 'big' }, (data, targetZone, draggedEl) => {
        if (targetZone.dataset.dropZone === 'shrink') {
          chamberSlot.innerHTML = '';
          draggedEl.parentNode.removeChild(draggedEl);
          chamberSlot.appendChild(draggedEl);
          leverBtn.disabled = false;
          leverBtn.classList.add('pulse-glow');
          this.voice.speak("Press MAGIC SHRINK to make it small!", "Riya");
          return true;
        }
        return false;
      });

      leverBtn.onclick = () => {
        leverBtn.disabled = true;
        leverBtn.classList.remove('pulse-glow');
        chamber.classList.add('operating');
        this.sound.playShrinkSound();

        const objInChamber = chamberSlot.querySelector('.game-object');
        if (objInChamber) {
          // Stage 1 -> Medium
          setTimeout(() => {
            document.getElementById('shrink-step-medium').classList.add('active');
            objInChamber.className = 'game-object size-medium';
            this.sound.playPop();
          }, 600);

          // Stage 2 -> Small
          setTimeout(() => {
            document.getElementById('shrink-step-small').classList.add('active');
            objInChamber.className = 'game-object size-small anim-shrink';
            this.sound.playPop();
          }, 1200);

          // Transfer to Pedestal
          setTimeout(() => {
            chamber.classList.remove('operating');
            pedestal.innerHTML = '<div class="pedestal-base"></div>';
            chamberSlot.innerHTML = '<div class="drop-hint-ghost">Empty</div>';
            pedestal.appendChild(objInChamber);
            objInChamber.classList.add('bounce-celebrate');

            this.sound.playSuccess();
            this.repairGearStep();
            this.voice.speak("Big to small! It made a cute little balloon!", "Little Star", () => {
              setTimeout(() => this.startParadeGame(), 1800);
            });
          }, 2000);
        }
      };
    }

    // ============================================================
    // MINI-GAME 3: SIZE PARADE (Small to Big Ordering)
    // ============================================================
    startParadeGame() {
      this.showScene('scene-parade');
      const tray = document.getElementById('parade-source-tray');
      const checkBtn = document.getElementById('btn-check-parade');
      const slots = [
        document.getElementById('parade-slot-1'),
        document.getElementById('parade-slot-2'),
        document.getElementById('parade-slot-3')
      ];

      if (!tray || !checkBtn) return;
      tray.innerHTML = '';
      checkBtn.disabled = true;

      // Clear slots
      slots.forEach((s, idx) => {
        s.className = `parade-slot slot-${s.dataset.expectedSize}`;
        s.innerHTML = `<div class="slot-drop-text">Place ${s.dataset.expectedSize.toUpperCase()} Here</div>`;
      });

      // 3 Flowers of sizes: Small, Medium, Big (Scrambled Order: Big, Small, Medium)
      const flowersData = [
        { id: 'f-big', type: 'flower', size: 'big' },
        { id: 'f-small', type: 'flower', size: 'small' },
        { id: 'f-med', type: 'flower', size: 'medium' }
      ];

      flowersData.forEach(item => {
        const el = document.createElement('div');
        el.className = `game-object size-${item.size}`;
        el.id = item.id;
        el.innerHTML = Graphics.getObjectSVG(item.type);
        tray.appendChild(el);

        this.dragDrop.registerDraggable(el, item, (data, targetSlot, draggedEl) => {
          if (targetSlot && targetSlot.classList.contains('parade-slot')) {
            // Remove previous item if any
            const existing = targetSlot.querySelector('.game-object');
            if (existing) {
              tray.appendChild(existing);
            }
            targetSlot.innerHTML = '';
            targetSlot.appendChild(draggedEl);
            targetSlot.classList.add('slot-filled');

            this.checkParadeCompletion(slots, checkBtn, 'small-to-big');
            return true;
          }
          return false;
        });
      });

      this.voice.speak("The flowers are mixed up! Put them in order from SMALL to BIG!", "Little Star");

      checkBtn.onclick = () => {
        this.verifyParadeOrder(slots, ['small', 'medium', 'big'], 'Small to big! You arranged them perfectly!', () => {
          setTimeout(() => this.startReverseParadeGame(), 2000);
        });
      };
    }

    checkParadeCompletion(slots, btn, mode) {
      const allFilled = slots.every(s => s.querySelector('.game-object'));
      btn.disabled = !allFilled;
      if (allFilled) {
        btn.classList.add('pulse-glow');
      }
    }

    verifyParadeOrder(slots, expectedSizes, successMessage, nextCallback) {
      let isCorrect = true;

      slots.forEach((slot, idx) => {
        const obj = slot.querySelector('.game-object');
        const expected = expectedSizes[idx];
        if (!obj || !obj.classList.contains(`size-${expected}`)) {
          isCorrect = false;
          slot.classList.add('slot-wrong');
          setTimeout(() => slot.classList.remove('slot-wrong'), 800);
        }
      });

      if (isCorrect) {
        this.sound.playSuccess();
        // Sequential growth celebration
        slots.forEach((s, idx) => {
          const item = s.querySelector('.game-object');
          if (item) {
            setTimeout(() => {
              item.classList.add('bounce-celebrate');
              this.sound.playChime(500 + idx * 250);
            }, idx * 300);
          }
        });

        this.repairGearStep();
        this.voice.speak(successMessage, "Riya", nextCallback);
      } else {
        this.sound.playBuzz();
        this.voice.speak("Look closely at their sizes. Can you try ordering them again?", "Little Star");
      }
    }

    // ============================================================
    // MINI-GAME 4: REVERSE SIZE PARADE (Big to Small Ordering)
    // ============================================================
    startReverseParadeGame() {
      this.showScene('scene-reverse-parade');
      const tray = document.getElementById('rev-parade-source-tray');
      const checkBtn = document.getElementById('btn-check-rev-parade');
      const slots = [
        document.getElementById('rev-slot-1'),
        document.getElementById('rev-slot-2'),
        document.getElementById('rev-slot-3')
      ];

      if (!tray || !checkBtn) return;
      tray.innerHTML = '';
      checkBtn.disabled = true;

      slots.forEach(s => {
        s.className = `parade-slot slot-${s.dataset.expectedSize}`;
        s.innerHTML = `<div class="slot-drop-text">Place ${s.dataset.expectedSize.toUpperCase()} Here</div>`;
      });

      // 3 Cars of sizes (Scrambled: Small, Big, Medium)
      const carsData = [
        { id: 'c-small', type: 'car', size: 'small' },
        { id: 'c-big', type: 'car', size: 'big' },
        { id: 'c-med', type: 'car', size: 'medium' }
      ];

      carsData.forEach(item => {
        const el = document.createElement('div');
        el.className = `game-object size-${item.size}`;
        el.id = item.id;
        el.innerHTML = Graphics.getObjectSVG(item.type);
        tray.appendChild(el);

        this.dragDrop.registerDraggable(el, item, (data, targetSlot, draggedEl) => {
          if (targetSlot && targetSlot.classList.contains('parade-slot')) {
            const existing = targetSlot.querySelector('.game-object');
            if (existing) {
              tray.appendChild(existing);
            }
            targetSlot.innerHTML = '';
            targetSlot.appendChild(draggedEl);
            targetSlot.classList.add('slot-filled');

            this.checkParadeCompletion(slots, checkBtn, 'big-to-small');
            return true;
          }
          return false;
        });
      });

      this.voice.speak("Now arrange the cars from BIGGEST to SMALLEST! Big, Medium, Small!", "Riya");

      checkBtn.onclick = () => {
        this.verifyParadeOrder(slots, ['big', 'medium', 'small'], 'Big to small! Fantastic driving order!', () => {
          setTimeout(() => this.startTrainGame(), 2000);
        });
      };
    }

    // ============================================================
    // MINI-GAME 5: SIZE TRAIN (Sorting Depot)
    // ============================================================
    startTrainGame() {
      this.showScene('scene-train');
      const incomingTray = document.getElementById('train-incoming-items');
      const counterEl = document.getElementById('train-items-remaining');
      const trainAssembly = document.getElementById('train-assembly');

      if (!incomingTray || !trainAssembly) return;
      incomingTray.innerHTML = '';
      trainAssembly.classList.remove('chug-forward');

      // Clear carriages
      const carSmall = document.querySelector('#carriage-small .carriage-bed');
      const carMed = document.querySelector('#carriage-medium .carriage-bed');
      const carBig = document.querySelector('#carriage-big .carriage-bed');

      if (carSmall) carSmall.innerHTML = '<div class="slot-marker">Small Slot</div>';
      if (carMed) carMed.innerHTML = '<div class="slot-marker">Medium Slot</div>';
      if (carBig) carBig.innerHTML = '<div class="slot-marker">Big Slot</div>';

      const trainItems = [
        { id: 't-ball-big', type: 'ball', size: 'big' },
        { id: 't-star-small', type: 'star', size: 'small' },
        { id: 't-gift-med', type: 'gift', size: 'medium' }
      ];

      let remaining = trainItems.length;
      if (counterEl) counterEl.textContent = `Items to load: ${remaining}`;

      trainItems.forEach(item => {
        const el = document.createElement('div');
        el.className = `game-object size-${item.size}`;
        el.innerHTML = Graphics.getObjectSVG(item.type);
        incomingTray.appendChild(el);

        this.dragDrop.registerDraggable(el, item, (data, targetZone, draggedEl) => {
          const expectedCarriageSize = targetZone.closest('.carriage')?.dataset.carriageSize;
          if (expectedCarriageSize) {
            if (expectedCarriageSize === data.size) {
              targetZone.innerHTML = '';
              targetZone.appendChild(draggedEl);
              this.sound.playSuccess();
              remaining--;
              if (counterEl) counterEl.textContent = `Items to load: ${remaining}`;

              if (remaining === 0) {
                // Train departures WOW moment!
                this.celebrateTrainDeparture();
              } else {
                this.voice.speak(`Great! That fits the ${data.size} carriage!`, "Little Star");
              }
              return true;
            } else {
              this.sound.playBuzz();
              this.voice.speak(`Oops! Look carefully at the size of this carriage!`, "Little Star");
              return false;
            }
          }
          return false;
        });
      });

      this.voice.speak("The Size Express Train is here! Sort every item into its matching carriage!", "Little Star");
    }

    celebrateTrainDeparture() {
      const trainAssembly = document.getElementById('train-assembly');
      this.sound.playTrainWhistle();
      this.repairGearStep();

      this.voice.speak("All carriages loaded! Choo Choo! Small, Medium, Big!", "Riya", () => {
        if (trainAssembly) {
          trainAssembly.classList.add('chug-forward');
        }
        setTimeout(() => {
          this.startCompareGame();
        }, 3200);
      });
    }

    // ============================================================
    // MINI-GAME 6: WHICH IS BIGGER / WHICH IS SMALLER (Visual Challenge)
    // ============================================================
    startCompareGame() {
      this.showScene('scene-compare');
      this.compareRound = 1;
      this.loadCompareRound();
    }

    loadCompareRound() {
      const leftCard = document.getElementById('compare-left-card');
      const rightCard = document.getElementById('compare-right-card');
      const title = document.getElementById('compare-title');
      const roundCurr = document.getElementById('compare-round-curr');

      if (!leftCard || !rightCard || !title) return;
      if (roundCurr) roundCurr.textContent = this.compareRound;

      leftCard.className = 'compare-card-slot';
      rightCard.className = 'compare-card-slot';
      leftCard.innerHTML = '';
      rightCard.innerHTML = '';

      // Define rounds: [toyType, targetSize, leftSize, rightSize]
      const rounds = [
        { toy: 'apple', target: 'big', left: 'small', right: 'big', prompt: 'Which one is BIG?' },
        { toy: 'balloon', target: 'small', left: 'small', right: 'big', prompt: 'Which one is SMALL?' },
        { toy: 'car', target: 'big', left: 'big', right: 'small', prompt: 'Which one is BIG?' },
        { toy: 'star', target: 'small', left: 'big', right: 'small', prompt: 'Which one is SMALL?' }
      ];

      const current = rounds[this.compareRound - 1];
      title.textContent = current.prompt;

      // Render Left
      const leftObj = document.createElement('div');
      leftObj.className = `game-object size-${current.left}`;
      leftObj.innerHTML = Graphics.getObjectSVG(current.toy);
      leftCard.appendChild(leftObj);

      // Render Right
      const rightObj = document.createElement('div');
      rightObj.className = `game-object size-${current.right}`;
      rightObj.innerHTML = Graphics.getObjectSVG(current.toy);
      rightCard.appendChild(rightObj);

      this.voice.speak(current.prompt, "Little Star");

      const handleChoice = (chosenSide, chosenSize) => {
        if (chosenSize === current.target) {
          const card = chosenSide === 'left' ? leftCard : rightCard;
          card.classList.add('correct-pick');
          this.sound.playSuccess();

          this.voice.speak(`Yes! That is ${current.target.toUpperCase()}!`, "Riya", () => {
            if (this.compareRound < 4) {
              this.compareRound++;
              setTimeout(() => this.loadCompareRound(), 1200);
            } else {
              this.repairGearStep();
              setTimeout(() => this.showFinalCelebration(), 1400);
            }
          });
        } else {
          this.sound.playBuzz();
          this.voice.speak(`Look carefully! Which one is ${current.target.toUpperCase()}?`, "Little Star");
        }
      };

      leftCard.onclick = () => handleChoice('left', current.left);
      rightCard.onclick = () => handleChoice('right', current.right);
    }

    // ============================================================
    // 7. FINAL CELEBRATION & RESTORATION WOW SCENE
    // ============================================================
    showFinalCelebration() {
      this.showScene('scene-celebration');
      this.sound.playFanfare();

      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}

      const riyaAvatar = document.getElementById('riya-avatar');
      const starAvatar = document.getElementById('star-avatar');
      if (riyaAvatar) riyaAvatar.classList.add('celebrate');
      if (starAvatar) starAvatar.classList.add('celebrate');

      this.voice.speak(
        "We fixed the entire Size Factory! Small can become Big, and Big can become Small! You are a true SIZE MASTER!",
        "Riya"
      );
    }

    // ============================================================
    // 8. FREE PLAY WORKSHOP (Magic Size Switch)
    // ============================================================
    loadWorkshopStage() {
      this.currentToyType = 'apple';
      this.workshopSize = 'medium';
      this.renderWorkshopObject();
      this.voice.speak("Welcome to the Magic Size Workshop! Pick any toy and use Grow or Shrink to change its size!", "Little Star");
    }

    bindWorkshopControls() {
      const palette = document.getElementById('workshop-item-picker');
      const btnGrow = document.getElementById('btn-workshop-grow');
      const btnShrink = document.getElementById('btn-workshop-shrink');
      const btnExit = document.getElementById('btn-exit-workshop');

      if (palette) {
        palette.addEventListener('click', (e) => {
          const btn = e.target.closest('.palette-btn');
          if (btn && btn.dataset.toy) {
            palette.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this.currentToyType = btn.dataset.toy;
            this.renderWorkshopObject();
            this.sound.playPop();
          }
        });
      }

      if (btnGrow) {
        btnGrow.addEventListener('click', () => {
          this.sound.init();
          if (this.workshopSize === 'small') {
            this.workshopSize = 'medium';
            this.sound.playGrowSound();
            this.voice.speak("Small to medium!", "Riya");
          } else if (this.workshopSize === 'medium') {
            this.workshopSize = 'big';
            this.sound.playGrowSound();
            this.voice.speak("Medium to BIG!", "Riya");
          } else {
            this.sound.playChime(1000);
            this.voice.speak("It's already as BIG as it gets!", "Little Star");
          }
          this.renderWorkshopObject();
        });
      }

      if (btnShrink) {
        btnShrink.addEventListener('click', () => {
          this.sound.init();
          if (this.workshopSize === 'big') {
            this.workshopSize = 'medium';
            this.sound.playShrinkSound();
            this.voice.speak("Big to medium!", "Little Star");
          } else if (this.workshopSize === 'medium') {
            this.workshopSize = 'small';
            this.sound.playShrinkSound();
            this.voice.speak("Medium to SMALL!", "Little Star");
          } else {
            this.sound.playPop();
            this.voice.speak("It's already tiny and SMALL!", "Riya");
          }
          this.renderWorkshopObject();
        });
      }

      if (btnExit) {
        btnExit.addEventListener('click', () => {
          this.sound.init();
          this.showScene('scene-intro');
          this.voice.speak("Back to our factory!", "Riya");
        });
      }
    }

    renderWorkshopObject() {
      const host = document.getElementById('workshop-active-object');
      const sizeTag = document.getElementById('workshop-size-name');
      const dots = document.querySelectorAll('.gauge-dot');

      if (!host) return;
      host.innerHTML = '';

      const obj = document.createElement('div');
      obj.className = `game-object size-${this.workshopSize}`;
      obj.innerHTML = Graphics.getObjectSVG(this.currentToyType);
      host.appendChild(obj);

      if (sizeTag) {
        sizeTag.textContent = this.workshopSize.toUpperCase();
      }

      dots.forEach(d => {
        if (d.dataset.level === this.workshopSize) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });
    }
  }

  // ============================================================
  // INITIALIZE GAME ON DOM READY
  // ============================================================
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
  });
})();
