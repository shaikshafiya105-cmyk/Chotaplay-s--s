/* ============================================================
   JOHN'S PRONOUN MAGIC CITY - CHOTAPLAY UKG
   Vanilla JavaScript ES6+ Engine
   ============================================================ */

(() => {
  'use strict';

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.musicEnabled = false;
      this.musicInterval = null;
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

    playTone(freq, type, duration, gainVal = 0.15, delay = 0) {
      if (!this.soundEnabled || !this.ctx) return;
      setTimeout(() => {
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
          // Ignore audio errors gracefully
        }
      }, delay * 1000);
    }

    playPop() {
      this.playTone(480, 'sine', 0.08, 0.2);
    }

    playCorrect() {
      if (!this.soundEnabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        this.playTone(freq, 'triangle', 0.25, 0.2, i * 0.08);
      });
    }

    playTryAgain() {
      if (!this.soundEnabled) return;
      this.playTone(392.00, 'sine', 0.2, 0.18, 0);
      this.playTone(329.63, 'sine', 0.3, 0.15, 0.15);
    }

    playMagicSparkle() {
      if (!this.soundEnabled) return;
      const freqs = [880, 987.77, 1174.66, 1318.51, 1567.98, 1760];
      freqs.forEach((f, idx) => {
        this.playTone(f, 'sine', 0.18, 0.12, idx * 0.05);
      });
    }

    playGoal() {
      if (!this.soundEnabled) return;
      // Whistle
      this.playTone(1800, 'triangle', 0.15, 0.25, 0);
      this.playTone(2100, 'triangle', 0.25, 0.25, 0.15);
      // Fanfare
      setTimeout(() => this.playFanfare(), 300);
    }

    playFanfare() {
      if (!this.soundEnabled) return;
      const melody = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
      const times = [0, 0.1, 0.2, 0.32, 0.44, 0.6];
      melody.forEach((f, i) => {
        this.playTone(f, 'triangle', 0.3, 0.2, times[i]);
      });
    }

    startGentleMusic() {
      if (this.musicInterval) clearInterval(this.musicInterval);
      this.musicEnabled = true;
      const chords = [
        [261.63, 329.63, 392.00], // C
        [220.00, 261.63, 329.63], // Am
        [174.61, 220.00, 261.63], // F
        [196.00, 246.94, 293.66]  // G
      ];
      let step = 0;
      const playChord = () => {
        if (!this.musicEnabled || !this.ctx) return;
        const currentChord = chords[step % chords.length];
        currentChord.forEach((f, i) => {
          this.playTone(f * 2, 'sine', 0.9, 0.035, i * 0.15);
        });
        step++;
      };
      playChord();
      this.musicInterval = setInterval(playChord, 1800);
    }

    stopMusic() {
      this.musicEnabled = false;
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }
  }

  // --- PARTICLE FX ENGINE (Canvas) ---
  class ParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.animate();
    }

    resize() {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    burst(x, y, count = 40, colors = ['#facc15', '#38bdf8', '#fb7185', '#34d399', '#a855f7', '#ffffff']) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        this.particles.push({
          x: x || this.width / 2,
          y: y || this.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.02,
          shape: Math.random() > 0.4 ? 'star' : 'circle',
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8
        });
      }
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          // Draw mini star
          this.ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            this.ctx.lineTo(Math.cos((18 + s * 72) * Math.PI / 180) * p.size, -Math.sin((18 + s * 72) * Math.PI / 180) * p.size);
            this.ctx.lineTo(Math.cos((54 + s * 72) * Math.PI / 180) * (p.size / 2), -Math.sin((54 + s * 72) * Math.PI / 180) * (p.size / 2));
          }
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }
    }
  }

  // --- WORLD DEFINITIONS (7 Worlds for 7 Pronouns) ---
  const WORLDS_DATA = [
    {
      id: 1,
      pronoun: 'I',
      locationName: 'MAGIC MIRROR',
      bgClass: 'bg-mirror-theme',
      speaker: 'John',
      speakerIcon: '👦',
      contextText: 'John is standing in front of the magic mirror. Who is in the mirror?',
      actionSentence: 'I am jumping!',
      explanation: 'I means John is talking about himself!',
      choices: ['I', 'HE', 'THEY'],
      renderActor(container) {
        container.innerHTML = `
          <div class="mirror-prop-container">
            <div class="magic-mirror-frame" id="prop-mirror">
              <div class="mirror-glass-reflection" id="mirror-reflection">
                <div class="mirror-john-reflection">
                  <svg viewBox="0 0 160 220" style="width:100%; height:100%;">
                    <ellipse cx="80" cy="65" rx="26" fill="#fed7aa"/>
                    <path d="M 48 52 Q 80 20 112 52 L 126 55 Q 112 42 80 36 Q 48 42 48 52 Z" fill="#38bdf8"/>
                    <ellipse cx="70" cy="62" rx="4" ry="6" fill="#1e293b"/>
                    <ellipse cx="90" cy="62" rx="4" ry="6" fill="#1e293b"/>
                    <path d="M 72 74 Q 80 84 88 74" fill="none" stroke="#991b1b" stroke-width="2.8" stroke-linecap="round"/>
                    <path d="M 44 95 Q 80 88 116 95 L 114 155 Q 80 160 46 155 Z" fill="#f97316"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="actor-john-live bounce-idle" id="live-actor-john" style="width: 120px; height: 160px;">
              <svg viewBox="0 0 160 220" style="width:100%; height:100%;">
                <ellipse cx="60" cy="205" rx="14" ry="8" fill="#1e293b"/>
                <ellipse cx="100" cy="205" rx="14" ry="8" fill="#1e293b"/>
                <rect x="52" y="150" width="16" height="52" rx="6" fill="#3b82f6"/>
                <rect x="92" y="150" width="16" height="52" rx="6" fill="#3b82f6"/>
                <path d="M 44 95 Q 80 88 116 95 L 114 155 Q 80 160 46 155 Z" fill="#f97316"/>
                <!-- Arm pointing to chest -->
                <path d="M 44 100 Q 25 125 35 145" stroke="#ea580c" stroke-width="12" stroke-linecap="round" fill="none"/>
                <circle cx="35" cy="148" r="7" fill="#fed7aa"/>
                <path id="john-arm-point" d="M 116 100 Q 100 120 75 115" stroke="#ea580c" stroke-width="12" stroke-linecap="round" fill="none"/>
                <circle id="john-hand-point" cx="75" cy="115" r="7" fill="#fed7aa"/>
                <circle cx="80" cy="65" r="28" fill="#fed7aa"/>
                <circle cx="52" cy="65" r="6" fill="#fed7aa"/>
                <circle cx="108" cy="65" r="6" fill="#fed7aa"/>
                <path d="M 48 52 Q 80 20 112 52 L 126 55 Q 112 42 80 36 Q 48 42 48 52 Z" fill="#38bdf8"/>
                <ellipse cx="70" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <ellipse cx="90" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <path d="M 72 74 Q 80 84 88 74" fill="none" stroke="#991b1b" stroke-width="2.8" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        `;
      },
      onSuccess(container) {
        const mirror = container.querySelector('#mirror-reflection');
        if (mirror) mirror.classList.add('active-glow');
        const john = container.querySelector('#live-actor-john');
        if (john) {
          john.style.animation = 'danceKids 0.6s infinite alternate';
        }
      }
    },
    {
      id: 2,
      pronoun: 'WE',
      locationName: 'TEAM SQUARE',
      bgClass: 'bg-team-theme',
      speaker: 'John & Little Star',
      speakerIcon: '🌟',
      contextText: 'John and Little Star are working together!',
      actionSentence: 'We are building!',
      explanation: 'WE means together! John and Little Star!',
      choices: ['I', 'WE', 'HE'],
      renderActor(container) {
        container.innerHTML = `
          <div class="team-props-container">
            <div class="actor-john-live" style="width: 100px; height: 140px;">
              <svg viewBox="0 0 160 220" style="width:100%; height:100%;">
                <ellipse cx="60" cy="205" rx="14" ry="8" fill="#1e293b"/>
                <ellipse cx="100" cy="205" rx="14" ry="8" fill="#1e293b"/>
                <rect x="52" y="150" width="16" height="52" rx="6" fill="#3b82f6"/>
                <rect x="92" y="150" width="16" height="52" rx="6" fill="#3b82f6"/>
                <path d="M 44 95 Q 80 88 116 95 L 114 155 Q 80 160 46 155 Z" fill="#f97316"/>
                <path d="M 116 100 Q 140 100 150 110" stroke="#ea580c" stroke-width="12" stroke-linecap="round" fill="none"/>
                <circle cx="150" cy="110" r="7" fill="#fed7aa"/>
                <circle cx="80" cy="65" r="28" fill="#fed7aa"/>
                <path d="M 48 52 Q 80 20 112 52 L 126 55 Q 112 42 80 36 Q 48 42 48 52 Z" fill="#38bdf8"/>
                <ellipse cx="70" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <ellipse cx="90" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <path d="M 72 74 Q 80 84 88 74" fill="none" stroke="#991b1b" stroke-width="2.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="crystal-tower-stack">
              <div class="tower-star-topper" id="tower-top-star">🌟</div>
              <div class="tower-block b4">WE</div>
              <div class="tower-block b3">MAGIC</div>
              <div class="tower-block b2">TEAM</div>
              <div class="tower-block b1">BUILD</div>
            </div>
            <div class="actor-star-live floating" style="width: 90px; height: 90px;">
              <svg viewBox="0 0 160 160" style="width:100%; height:100%;">
                <polygon points="80,10 102,56 152,62 115,97 125,148 80,122 35,148 45,97 8,62 58,56" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
                <ellipse cx="64" cy="74" rx="6" ry="8" fill="#1e1b4b"/>
                <ellipse cx="96" cy="74" rx="6" ry="8" fill="#1e1b4b"/>
                <circle cx="62" cy="70" r="2.5" fill="#ffffff"/>
                <circle cx="94" cy="70" r="2.5" fill="#ffffff"/>
                <path d="M 68 88 Q 80 100 92 88" fill="none" stroke="#1e1b4b" stroke-width="3.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        `;
      },
      onSuccess(container) {
        const star = container.querySelector('#tower-top-star');
        if (star) star.classList.add('active');
        const blocks = container.querySelectorAll('.tower-block');
        blocks.forEach(b => b.style.boxShadow = '0 0 20px #facc15');
      }
    },
    {
      id: 3,
      pronoun: 'HE',
      locationName: 'HERO STREET',
      bgClass: 'bg-hero-theme',
      speaker: 'Little Star',
      speakerIcon: '⚽',
      contextText: 'Leo the boy is kicking the soccer ball!',
      actionSentence: 'He is playing!',
      explanation: 'HE is for one boy! He is playing!',
      choices: ['HE', 'SHE', 'THEY'],
      renderActor(container) {
        container.innerHTML = `
          <div class="hero-props-container">
            <!-- Boy Character (Leo) -->
            <div class="actor-leo-live bounce-idle" id="actor-leo" style="width: 110px; height: 150px;">
              <svg viewBox="0 0 160 220" style="width:100%; height:100%;">
                <ellipse cx="55" cy="205" rx="14" ry="8" fill="#0f172a"/>
                <ellipse cx="105" cy="205" rx="14" ry="8" fill="#0f172a"/>
                <rect x="48" y="150" width="16" height="52" rx="6" fill="#10b981"/>
                <rect x="96" y="150" width="16" height="52" rx="6" fill="#10b981"/>
                <path d="M 40 95 Q 80 88 120 95 L 116 155 Q 80 160 44 155 Z" fill="#3b82f6"/>
                <circle cx="80" cy="65" r="28" fill="#fed7aa"/>
                <path d="M 52 56 Q 80 20 108 56 Q 100 40 80 40 Q 60 40 52 56 Z" fill="#b45309"/>
                <ellipse cx="70" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <ellipse cx="90" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <path d="M 72 74 Q 80 84 88 74" fill="none" stroke="#991b1b" stroke-width="2.8" stroke-linecap="round"/>
              </svg>
            </div>
            <!-- Soccer Goal & Ball -->
            <div class="soccer-goal-net" id="soccer-goal">
              <div class="goal-banner" id="goal-banner">GOAL! ⚽</div>
              <div class="soccer-ball-element" id="soccer-ball">⚽</div>
            </div>
          </div>
        `;
      },
      onSuccess(container) {
        const ball = container.querySelector('#soccer-ball');
        const banner = container.querySelector('#goal-banner');
        const leo = container.querySelector('#actor-leo');
        if (ball) ball.classList.add('kick-goal');
        if (banner) banner.classList.add('active');
        if (leo) leo.style.animation = 'danceKids 0.6s infinite alternate';
      }
    },
    {
      id: 4,
      pronoun: 'SHE',
      locationName: 'FRIEND STREET',
      bgClass: 'bg-friend-theme',
      speaker: 'Mia',
      speakerIcon: '🎨',
      contextText: 'Mia the girl is creating a colorful rainbow picture!',
      actionSentence: 'She is painting!',
      explanation: 'SHE is for one girl! She is painting!',
      choices: ['HE', 'SHE', 'IT'],
      renderActor(container) {
        container.innerHTML = `
          <div class="friend-props-container">
            <!-- Girl Character (Mia) -->
            <div class="actor-mia-live bounce-idle" id="actor-mia" style="width: 110px; height: 150px;">
              <svg viewBox="0 0 160 220" style="width:100%; height:100%;">
                <ellipse cx="55" cy="205" rx="14" ry="8" fill="#be185d"/>
                <ellipse cx="105" cy="205" rx="14" ry="8" fill="#be185d"/>
                <rect x="50" y="150" width="14" height="52" rx="6" fill="#f472b6"/>
                <rect x="96" y="150" width="14" height="52" rx="6" fill="#f472b6"/>
                <path d="M 40 95 Q 80 90 120 95 L 126 155 Q 80 165 34 155 Z" fill="#ec4899"/>
                <!-- Pigtails -->
                <circle cx="44" cy="55" r="14" fill="#78350f"/>
                <circle cx="116" cy="55" r="14" fill="#78350f"/>
                <circle cx="80" cy="65" r="28" fill="#fed7aa"/>
                <path d="M 52 56 Q 80 32 108 56 Z" fill="#78350f"/>
                <ellipse cx="70" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <ellipse cx="90" cy="62" rx="4" ry="6" fill="#1e293b"/>
                <circle cx="68" cy="59" r="1.5" fill="#ffffff"/>
                <circle cx="88" cy="59" r="1.5" fill="#ffffff"/>
                <ellipse cx="62" cy="70" rx="5" ry="3" fill="#f43f5e" opacity="0.7"/>
                <ellipse cx="98" cy="70" rx="5" ry="3" fill="#f43f5e" opacity="0.7"/>
                <path d="M 72 74 Q 80 84 88 74" fill="none" stroke="#991b1b" stroke-width="2.8" stroke-linecap="round"/>
                <!-- Arm holding Paintbrush -->
                <path d="M 120 100 Q 140 115 150 90" stroke="#db2777" stroke-width="10" stroke-linecap="round" fill="none"/>
                <rect x="146" y="70" width="6" height="24" rx="2" fill="#78350f"/>
                <circle cx="149" cy="68" r="5" fill="#facc15"/>
              </svg>
            </div>
            <!-- Art Easel -->
            <div class="art-easel-stand">
              <div class="easel-canvas-board" id="art-canvas">
                <div class="painting-art-preview" id="art-preview">🎨</div>
              </div>
              <div class="easel-legs"></div>
            </div>
          </div>
        `;
      },
      onSuccess(container) {
        const preview = container.querySelector('#art-preview');
        if (preview) {
          preview.textContent = '🌈✨🌸';
          preview.classList.add('vibrant');
        }
        const mia = container.querySelector('#actor-mia');
        if (mia) mia.style.animation = 'danceKids 0.6s infinite alternate';
      }
    },
    {
      id: 5,
      pronoun: 'IT',
      locationName: 'ANIMAL PARK',
      bgClass: 'bg-animal-theme',
      speaker: 'Little Star',
      speakerIcon: '🐱',
      contextText: 'Look at the friendly cat running across the green grass!',
      actionSentence: 'It is running!',
      explanation: 'IT is for an animal or thing! It is running!',
      choices: ['HE', 'IT', 'THEY'],
      renderActor(container) {
        container.innerHTML = `
          <div class="animal-props-container">
            <div class="cat-running-sprite bounce-idle" id="park-cat">🐱</div>
            <div class="park-trail">
              <span class="paw-print" id="paw1">🐾</span>
              <span class="paw-print" id="paw2">🐾</span>
              <span class="paw-print" id="paw3">🐾</span>
              <span class="paw-print" id="paw4">🐾</span>
            </div>
            <div style="font-size: 2.8rem;">🌸🦋</div>
          </div>
        `;
      },
      onSuccess(container) {
        const cat = container.querySelector('#park-cat');
        if (cat) cat.classList.add('dash');
        const paws = container.querySelectorAll('.paw-print');
        paws.forEach((p, i) => {
          setTimeout(() => p.classList.add('active'), i * 150);
        });
      }
    },
    {
      id: 6,
      pronoun: 'YOU',
      locationName: 'TALKING STAR',
      bgClass: 'bg-star-theme',
      speaker: 'Little Star',
      speakerIcon: '⭐',
      contextText: 'Little Star is turning directly to the screen to talk to YOU!',
      actionSentence: 'You are amazing!',
      explanation: 'YOU means Little Star is talking directly to YOU, superstar!',
      choices: ['I', 'YOU', 'WE'],
      renderActor(container) {
        container.innerHTML = `
          <div class="talking-star-container">
            <div class="cosmic-spotlight"></div>
            <div class="huge-star-actor" id="huge-talking-star">
              <svg viewBox="0 0 160 160" style="width:100%; height:100%;">
                <polygon points="80,10 102,56 152,62 115,97 125,148 80,122 35,148 45,97 8,62 58,56" fill="#facc15" stroke="#ca8a04" stroke-width="4" filter="drop-shadow(0 0 15px #fef08a)"/>
                <ellipse cx="62" cy="72" rx="7" ry="9" fill="#1e1b4b"/>
                <ellipse cx="98" cy="72" rx="7" ry="9" fill="#1e1b4b"/>
                <circle cx="60" cy="68" r="3" fill="#ffffff"/>
                <circle cx="96" cy="68" r="3" fill="#ffffff"/>
                <ellipse cx="50" cy="84" rx="7" ry="5" fill="#fb7185" opacity="0.8"/>
                <ellipse cx="110" cy="84" rx="7" ry="5" fill="#fb7185" opacity="0.8"/>
                <path d="M 66 88 Q 80 102 94 88" fill="none" stroke="#1e1b4b" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </div>
            <div style="font-size: 2.2rem; margin-top: 10px;" id="star-emojis">👉 🌟 👈</div>
          </div>
        `;
      },
      onSuccess(container) {
        const star = container.querySelector('#huge-talking-star');
        const emojis = container.querySelector('#star-emojis');
        if (star) {
          star.style.transform = 'scale(1.25)';
          star.style.transition = 'transform 0.5s ease';
        }
        if (emojis) emojis.textContent = '💖 👑 🌟 💖';
      }
    },
    {
      id: 7,
      pronoun: 'THEY',
      locationName: 'GROUP PARADE',
      bgClass: 'bg-parade-theme',
      speaker: 'John & Little Star',
      speakerIcon: '🎉',
      contextText: 'Three cheerful friends are dancing together in the parade!',
      actionSentence: 'They are dancing!',
      explanation: 'THEY means more than one friend! They are dancing!',
      choices: ['HE', 'SHE', 'THEY'],
      renderActor(container) {
        container.innerHTML = `
          <div class="parade-props-container">
            <div class="parade-kids-trio">
              <span class="dancer-kid d1 dancing" id="d1">👦</span>
              <span class="dancer-kid d2 dancing" id="d2">👧</span>
              <span class="dancer-kid d3 dancing" id="d3">🧒</span>
            </div>
            <div style="font-size: 2.6rem;">🎈🎺🎊</div>
          </div>
        `;
      },
      onSuccess(container) {
        const dancers = container.querySelectorAll('.dancer-kid');
        dancers.forEach(d => {
          d.style.animation = 'danceKids 0.4s infinite alternate';
          d.style.transform = 'scale(1.2)';
        });
      }
    }
  ];

  // --- FREE PLAY CHALLENGE QUESTIONS DATA ---
  const CHALLENGE_POOL = [
    {
      pronoun: 'SHE',
      sentence: 'She is reading a book.',
      icon: '👧📖',
      who: 'One girl reading',
      choices: ['HE', 'SHE', 'IT']
    },
    {
      pronoun: 'HE',
      sentence: 'He is jumping high.',
      icon: '👦⭐',
      who: 'One boy jumping',
      choices: ['HE', 'SHE', 'THEY']
    },
    {
      pronoun: 'THEY',
      sentence: 'They are running fast.',
      icon: '🏃‍♂️🏃‍♀️🏃',
      who: 'A group of friends',
      choices: ['HE', 'IT', 'THEY']
    },
    {
      pronoun: 'IT',
      sentence: 'It is sleeping softly.',
      icon: '🐱💤',
      who: 'One cute kitten',
      choices: ['SHE', 'IT', 'WE']
    },
    {
      pronoun: 'WE',
      sentence: 'We are playing together.',
      icon: '🤝🎉',
      who: 'You and me together',
      choices: ['I', 'WE', 'HE']
    },
    {
      pronoun: 'I',
      sentence: 'I am drawing a star.',
      icon: '🧒✏️',
      who: 'Talking about myself',
      choices: ['I', 'YOU', 'THEY']
    },
    {
      pronoun: 'YOU',
      sentence: 'You are smiling happily.',
      icon: '👉😊',
      who: 'Talking directly to you',
      choices: ['HE', 'YOU', 'IT']
    },
    {
      pronoun: 'SHE',
      sentence: 'She is singing a sweet song.',
      icon: '👧🎶',
      who: 'One girl singing',
      choices: ['SHE', 'HE', 'THEY']
    },
    {
      pronoun: 'HE',
      sentence: 'He is riding a bicycle.',
      icon: '👦🚲',
      who: 'One boy riding',
      choices: ['HE', 'SHE', 'IT']
    },
    {
      pronoun: 'THEY',
      sentence: 'They are painting pictures.',
      icon: '🎨👫',
      who: 'Children painting together',
      choices: ['I', 'SHE', 'THEY']
    },
    {
      pronoun: 'IT',
      sentence: 'It is flying in the sky.',
      icon: '🕊️🌤️',
      who: 'One pretty bird',
      choices: ['HE', 'IT', 'WE']
    },
    {
      pronoun: 'WE',
      sentence: 'We are singing together.',
      icon: '🎤👫',
      who: 'Singing with my friends',
      choices: ['I', 'WE', 'SHE']
    },
    {
      pronoun: 'I',
      sentence: 'I am eating a red apple.',
      icon: '😋🍎',
      who: 'Myself eating',
      choices: ['I', 'HE', 'IT']
    },
    {
      pronoun: 'YOU',
      sentence: 'You are very smart.',
      icon: '🌟🧠',
      who: 'Talking to you, champion!',
      choices: ['THEY', 'YOU', 'WE']
    }
  ];

  // --- GAME STATE ---
  const state = {
    currentScene: 'scene-intro',
    activeWorldIndex: 0,
    unlockedWorlds: [1],
    completedWorlds: new Set(),
    challengeScore: 0,
    challengeCurrent: null,
    voiceEnabled: true,
    speechUtterance: null
  };

  // --- ENGINE INITIALIZATION ---
  const sfx = new SoundEngine();
  let fx = null;

  // DOM Elements
  const els = {
    scenes: document.querySelectorAll('.scene'),
    btnStartAdventure: document.getElementById('btn-start-adventure'),
    btnMusic: document.getElementById('btn-music'),
    btnVoice: document.getElementById('btn-voice'),
    btnMap: document.getElementById('btn-map'),
    btnFreePlay: document.getElementById('btn-freeplay'),
    gemsTracker: document.getElementById('gems-tracker'),
    gemSlots: document.querySelectorAll('.gem-slot'),
    mapNodes: document.querySelectorAll('.map-node'),
    btnMapPlayNext: document.getElementById('btn-map-play-next'),
    mapGuideText: document.getElementById('map-guide-text'),
    btnWorldMapBack: document.getElementById('btn-world-map-back'),
    worldBadgeNum: document.getElementById('world-badge-num'),
    worldBadgeName: document.getElementById('world-badge-name'),
    worldTargetPronoun: document.getElementById('world-target-pronoun'),
    worldBgTheme: document.getElementById('world-bg-theme'),
    worldActorsLayer: document.getElementById('world-actors-layer'),
    worldSpeakerAvatar: document.getElementById('world-speaker-avatar'),
    worldWhoQuestion: document.getElementById('world-who-question'),
    worldSentenceSpoken: document.getElementById('world-sentence-spoken'),
    btnReplayWorldSpeech: document.getElementById('btn-replay-world-speech'),
    pronounChoicesContainer: document.getElementById('pronoun-choices-container'),
    worldFeedbackMessage: document.getElementById('world-feedback-message'),
    btnWorldNext: document.getElementById('btn-world-next'),
    btnReplayIntroSpeech: document.getElementById('btn-replay-intro-speech'),
    btnStartChallengeMode: document.getElementById('btn-start-challenge-mode'),
    btnReplayStory: document.getElementById('btn-replay-story'),
    constellationCards: document.querySelectorAll('.constellation-card'),
    challengeScoreNum: document.getElementById('challenge-score-num'),
    challengeVisualBox: document.getElementById('challenge-visual-box'),
    challengeSentenceText: document.getElementById('challenge-sentence-text'),
    btnReplayChallengeAudio: document.getElementById('btn-replay-challenge-audio'),
    challengeOptionsGrid: document.getElementById('challenge-options-grid'),
    challengeFeedbackText: document.getElementById('challenge-feedback-text'),
    btnExitChallenge: document.getElementById('btn-exit-challenge'),
    modalCelebrate: document.getElementById('modal-celebrate-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalDesc: document.getElementById('modal-desc'),
    btnModalContinue: document.getElementById('btn-modal-continue')
  };

  // --- SPEECH SYNTHESIS ENGINE ---
  function speak(text, onComplete) {
    if (!state.voiceEnabled) {
      if (onComplete) setTimeout(onComplete, 400);
      return;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Cancel any existing speaking
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.88; // Slightly slower for UKG learners
        utterance.pitch = 1.18; // Cheerful friendly pitch
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Google'))));
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
          if (onComplete) onComplete();
        };

        utterance.onerror = () => {
          if (onComplete) onComplete();
        };

        state.speechUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        if (onComplete) onComplete();
      }
    } else {
      if (onComplete) setTimeout(onComplete, 400);
    }
  }

  // --- SCENE SWITCHER ---
  function switchScene(sceneId) {
    sfx.playPop();
    els.scenes.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
      target.classList.add('active');
      state.currentScene = sceneId;
    }

    // Toggle HUD buttons based on scene
    if (sceneId === 'scene-intro') {
      els.btnMap.style.display = 'none';
      els.btnFreePlay.style.display = 'none';
    } else {
      els.btnMap.style.display = 'flex';
      els.btnFreePlay.style.display = 'flex';
    }
  }

  // --- UPDATE GEMS PROGRESS BAR & MAP ---
  function updateProgressUI() {
    // Update top HUD gems
    els.gemSlots.forEach((slot, index) => {
      const worldNum = index + 1;
      if (state.completedWorlds.has(worldNum)) {
        slot.className = 'gem-slot collected';
      } else if (state.unlockedWorlds.includes(worldNum)) {
        slot.className = 'gem-slot unlocked';
      } else {
        slot.className = 'gem-slot';
      }
    });

    // Update map nodes
    els.mapNodes.forEach(node => {
      const wId = parseInt(node.getAttribute('data-world'), 10);
      if (state.completedWorlds.has(wId)) {
        node.className = 'map-node completed';
      } else if (state.unlockedWorlds.includes(wId)) {
        node.className = 'map-node unlocked';
      } else {
        node.className = 'map-node';
      }
    });
  }

  // --- LOAD SPECIFIC WORLD (1 to 7) ---
  function loadWorld(worldId) {
    const data = WORLDS_DATA.find(w => w.id === worldId);
    if (!data) return;

    state.activeWorldIndex = worldId - 1;
    switchScene('scene-world');

    // Set Header Badges
    els.worldBadgeNum.textContent = data.id;
    els.worldBadgeName.textContent = data.locationName;
    els.worldTargetPronoun.textContent = data.pronoun;

    // Set Background theme
    els.worldBgTheme.className = 'world-bg-theme ' + data.bgClass;

    // Render Animated Actor & Props
    data.renderActor(els.worldActorsLayer);

    // Set Spoken Banner
    els.worldSpeakerAvatar.textContent = data.speakerIcon;
    els.worldWhoQuestion.textContent = data.contextText;
    els.worldSentenceSpoken.textContent = `"${data.actionSentence}"`;

    // Reset Feedback & Next button
    els.worldFeedbackMessage.textContent = 'Tap the pronoun that matches WHO is doing the action!';
    els.btnWorldNext.style.display = 'none';

    // Render Pronoun Choice Buttons
    renderPronounChoices(data);

    // Speak context and sentence
    speak(`${data.contextText} ... Listen: ${data.actionSentence}`);
  }

  // --- RENDER PRONOUN CHOICE BUTTONS ---
  function renderPronounChoices(worldData) {
    els.pronounChoicesContainer.innerHTML = '';
    
    // Shuffle choices array
    const shuffled = [...worldData.choices].sort(() => Math.random() - 0.5);

    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'btn-pronoun-card';
      btn.setAttribute('data-choice', choice);
      btn.innerHTML = `
        <span class="p-card-word">${choice}</span>
        <span class="p-card-hint">Pronoun</span>
      `;

      btn.addEventListener('click', () => handleWorldAnswer(btn, choice, worldData));
      els.pronounChoicesContainer.appendChild(btn);
    });
  }

  // --- HANDLE ANSWER SELECTION ---
  function handleWorldAnswer(btn, chosen, worldData) {
    sfx.init();

    if (chosen === worldData.pronoun) {
      // CORRECT ANSWER!
      btn.classList.add('correct');
      sfx.playCorrect();
      sfx.playMagicSparkle();
      if (fx) fx.burst(window.innerWidth / 2, window.innerHeight * 0.4, 50);

      // Trigger world specific prop reaction
      worldData.onSuccess(els.worldActorsLayer);

      // Little Star celebratory voice & explanation
      els.worldFeedbackMessage.textContent = `✨ Super! ${worldData.explanation}`;
      els.btnWorldNext.style.display = 'inline-flex';

      speak(`Yes! ${worldData.pronoun}! ${worldData.explanation}`);

      // Mark world completed & unlock next
      state.completedWorlds.add(worldData.id);
      if (worldData.id < 7 && !state.unlockedWorlds.includes(worldData.id + 1)) {
        state.unlockedWorlds.push(worldData.id + 1);
      }
      updateProgressUI();

      // Disable other choices
      const allBtns = els.pronounChoicesContainer.querySelectorAll('.btn-pronoun-card');
      allBtns.forEach(b => {
        if (b !== btn) b.disabled = true;
      });

    } else {
      // GENTLE ENCOURAGEMENT (Never punish)
      btn.classList.add('wrong');
      sfx.playTryAgain();
      setTimeout(() => btn.classList.remove('wrong'), 600);

      els.worldFeedbackMessage.textContent = `🌟 Little Star says: "Listen carefully! ${worldData.actionSentence}"`;
      speak(`Listen again: ${worldData.actionSentence}`);
    }
  }

  // --- GO TO NEXT WORLD OR CITY CELEBRATION ---
  function proceedToNextStage() {
    const currentId = state.activeWorldIndex + 1;
    if (currentId < 7) {
      loadWorld(currentId + 1);
    } else {
      // All 7 complete! Trigger Grand City Celebration
      showCityCelebration();
    }
  }

  // --- GRAND CITY CELEBRATION ---
  function showCityCelebration() {
    switchScene('scene-celebration');
    sfx.playFanfare();
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}
    if (fx) {
      fx.burst(window.innerWidth * 0.3, window.innerHeight * 0.3, 60);
      setTimeout(() => fx.burst(window.innerWidth * 0.7, window.innerHeight * 0.3, 60), 300);
      setTimeout(() => fx.burst(window.innerWidth * 0.5, window.innerHeight * 0.2, 80), 600);
    }
    speak("Hooray! We did it! The Pronoun Magic City is completely restored! Tap any pronoun card to review its magic!");
  }

  // --- FREE PLAY CHALLENGE MODE ---
  function startChallengeMode() {
    switchScene('scene-challenge');
    state.challengeScore = 0;
    els.challengeScoreNum.textContent = state.challengeScore;
    nextChallengeQuestion();
  }

  function nextChallengeQuestion() {
    const randomQ = CHALLENGE_POOL[Math.floor(Math.random() * CHALLENGE_POOL.length)];
    state.challengeCurrent = randomQ;

    els.challengeVisualBox.innerHTML = `<span class="bounce-idle">${randomQ.icon}</span>`;
    els.challengeSentenceText.textContent = `"${randomQ.sentence}"`;
    els.challengeFeedbackText.textContent = `Who is doing the action? (${randomQ.who})`;

    // Render Options
    els.challengeOptionsGrid.innerHTML = '';
    const shuffled = [...randomQ.choices].sort(() => Math.random() - 0.5);

    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'btn-pronoun-card';
      btn.style.maxWidth = '160px';
      btn.innerHTML = `<span class="p-card-word">${choice}</span>`;
      btn.addEventListener('click', () => handleChallengeAnswer(btn, choice, randomQ));
      els.challengeOptionsGrid.appendChild(btn);
    });

    speak(`Listen: ${randomQ.sentence}`);
  }

  function handleChallengeAnswer(btn, chosen, question) {
    sfx.init();

    if (chosen === question.pronoun) {
      btn.classList.add('correct');
      sfx.playCorrect();
      state.challengeScore += 1;
      els.challengeScoreNum.textContent = state.challengeScore;
      if (fx) fx.burst(window.innerWidth / 2, window.innerHeight * 0.5, 40);

      els.challengeFeedbackText.textContent = `✨ Fantastic! ${question.pronoun} is correct!`;
      speak(`Great job! ${question.pronoun}!`, () => {
        setTimeout(nextChallengeQuestion, 700);
      });
    } else {
      btn.classList.add('wrong');
      sfx.playTryAgain();
      setTimeout(() => btn.classList.remove('wrong'), 600);
      els.challengeFeedbackText.textContent = `🌟 Let's listen again: "${question.sentence}"`;
      speak(`Listen again: ${question.sentence}`);
    }
  }

  // --- EVENT LISTENERS BINDING ---
  function bindEvents() {
    // Canvas particles initialization
    fx = new ParticleEngine('fx-canvas');

    // Start Adventure Button
    els.btnStartAdventure.addEventListener('click', () => {
      sfx.init();
      switchScene('scene-map');
      updateProgressUI();
      speak("Welcome to Pronoun Magic City! Tap World 1 Magic Mirror to begin!");
    });

    // Map Nodes Click
    els.mapNodes.forEach(node => {
      node.addEventListener('click', () => {
        const wId = parseInt(node.getAttribute('data-world'), 10);
        if (state.unlockedWorlds.includes(wId)) {
          loadWorld(wId);
        } else {
          sfx.playTryAgain();
          speak("Complete previous magic locations to unlock this area!");
        }
      });
    });

    // Map Enter Next Button
    els.btnMapPlayNext.addEventListener('click', () => {
      const nextUnlocked = state.unlockedWorlds[state.unlockedWorlds.length - 1];
      loadWorld(nextUnlocked);
    });

    // Replay Intro Speech
    els.btnReplayIntroSpeech.addEventListener('click', () => {
      sfx.init();
      speak("Oh no! The Pronoun Magic is gone! The city lights are sleeping! Let's bring the magic back!");
    });

    // Replay World Speech
    els.btnReplayWorldSpeech.addEventListener('click', () => {
      sfx.init();
      const current = WORLDS_DATA[state.activeWorldIndex];
      if (current) {
        speak(`${current.contextText} ... ${current.actionSentence}`);
      }
    });

    // Next World Button
    els.btnWorldNext.addEventListener('click', () => {
      proceedToNextStage();
    });

    // World Map Back Button
    els.btnWorldMapBack.addEventListener('click', () => {
      switchScene('scene-map');
      updateProgressUI();
    });

    // HUD Map Button
    els.btnMap.addEventListener('click', () => {
      switchScene('scene-map');
      updateProgressUI();
    });

    // HUD Free-Play Button
    els.btnFreePlay.addEventListener('click', () => {
      startChallengeMode();
    });

    // HUD Audio Controls
    els.btnMusic.addEventListener('click', () => {
      sfx.init();
      if (sfx.musicEnabled) {
        sfx.stopMusic();
        els.btnMusic.classList.remove('active');
      } else {
        sfx.startGentleMusic();
        els.btnMusic.classList.add('active');
      }
    });

    els.btnVoice.addEventListener('click', () => {
      state.voiceEnabled = !state.voiceEnabled;
      if (state.voiceEnabled) {
        els.btnVoice.classList.add('active');
        speak("Voice on!");
      } else {
        els.btnVoice.classList.remove('active');
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    });

    // Celebration Constellation Interactive Cards
    els.constellationCards.forEach(card => {
      card.addEventListener('click', () => {
        sfx.init();
        sfx.playMagicSparkle();
        const p = card.getAttribute('data-p');
        const match = WORLDS_DATA.find(w => w.pronoun === p);
        if (match) {
          speak(`${match.pronoun}! ${match.explanation} ... ${match.actionSentence}`);
        }
      });
    });

    // Celebration Start Challenge Button
    els.btnStartChallengeMode.addEventListener('click', () => {
      startChallengeMode();
    });

    // Celebration Replay Story Button
    els.btnReplayStory.addEventListener('click', () => {
      loadWorld(1);
    });

    // Challenge Mode Listen Button
    els.btnReplayChallengeAudio.addEventListener('click', () => {
      sfx.init();
      if (state.challengeCurrent) {
        speak(state.challengeCurrent.sentence);
      }
    });

    // Challenge Mode Exit Button
    els.btnExitChallenge.addEventListener('click', () => {
      switchScene('scene-map');
      updateProgressUI();
    });

    // Modal Continue Button
    els.btnModalContinue.addEventListener('click', () => {
      els.modalCelebrate.style.display = 'none';
    });

    // Ensure SpeechSynthesis voices are loaded
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  // --- INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    updateProgressUI();
  });

})();
