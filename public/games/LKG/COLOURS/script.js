/* ============================================================
   RIYA'S RAINBOW RESCUE 🌈 - SCRIPT.JS
   CHOTAPLAY Educational Game Series (Ages 3-6)
   Standalone Vanilla JavaScript Game Engine
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // COLOR DATA & VIBGYOR SPECIFICATION
  // ============================================================
  const COLOR_DATA = [
    {
      id: 'red',
      name: 'RED',
      colorCode: '#FF2A55',
      noteFreq: 261.63, // C4
      voicePrompt: 'Can you find all 3 RED things?',
      rewardVoice: 'Red! The red arc is restored!',
      itemNames: ['Red Apple', 'Red Strawberry', 'Red Heart Blossom']
    },
    {
      id: 'orange',
      name: 'ORANGE',
      colorCode: '#FF8800',
      noteFreq: 293.66, // D4
      voicePrompt: 'Place the ORANGE puzzle piece into its glowing spot!',
      rewardVoice: 'Orange! The orange arc is glowing!',
    },
    {
      id: 'yellow',
      name: 'YELLOW',
      colorCode: '#FFD200',
      noteFreq: 329.63, // E4
      voicePrompt: 'Tap the YELLOW sun crystal to bring warm daylight!',
      rewardVoice: 'Yellow! The bright sun is shining!',
    },
    {
      id: 'green',
      name: 'GREEN',
      colorCode: '#00D068',
      noteFreq: 349.23, // F4
      voicePrompt: 'Plant the GREEN magic seed to grow our garden!',
      rewardVoice: 'Green! The trees and grass are blooming!',
    },
    {
      id: 'blue',
      name: 'BLUE',
      colorCode: '#00A6FF',
      noteFreq: 392.00, // G4
      voicePrompt: 'Tap the river stones to guide the BLUE water stream!',
      rewardVoice: 'Blue! The river is flowing with water!',
    },
    {
      id: 'indigo',
      name: 'INDIGO',
      colorCode: '#5833FF',
      noteFreq: 440.00, // A4
      voicePrompt: 'Follow and tap the glowing INDIGO star path: 1, 2, 3, 4!',
      rewardVoice: 'Indigo! Magical starlight fills the sky!',
    },
    {
      id: 'violet',
      name: 'VIOLET',
      colorCode: '#C41CFF',
      noteFreq: 493.88, // B4
      voicePrompt: 'Tap the magical VIOLET bud to make it blossom!',
      rewardVoice: 'Violet! The magical flower has bloomed!',
    }
  ];

  // ============================================================
  // AUDIO MANAGER (Procedural Web Audio API + Web Speech API)
  // ============================================================
  const AudioManager = {
    ctx: null,
    isMuted: false,
    synthVoice: null,

    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }

      // Initialize Speech Synthesis voice
      if ('speechSynthesis' in window) {
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          // Prefer high-quality English female or child-friendly voice
          this.synthVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Zira') || v.name.includes('Natural'))) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    },

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    playTone(freq, type = 'sine', duration = 0.3, gainVal = 0.25, startDelay = 0) {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + startDelay;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {
        // Safe fallback
      }
    },

    playChimeNote(colorIndex) {
      const color = COLOR_DATA[colorIndex];
      if (!color) return;
      this.playTone(color.noteFreq, 'sine', 0.8, 0.3);
      this.playTone(color.noteFreq * 2, 'triangle', 0.6, 0.15, 0.03);
    },

    playSparkle() {
      if (this.isMuted || !this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        this.playTone(freq, 'triangle', 0.2, 0.15, i * 0.06);
      });
    },

    playPop() {
      if (this.isMuted || !this.ctx) return;
      this.playTone(480, 'sine', 0.12, 0.3);
    },

    playSnap() {
      if (this.isMuted || !this.ctx) return;
      this.playTone(320, 'triangle', 0.08, 0.2);
      this.playTone(640, 'sine', 0.2, 0.25, 0.06);
    },

    playWaterSplash() {
      if (this.isMuted || !this.ctx) return;
      const splashFreqs = [300, 450, 600, 520, 750];
      splashFreqs.forEach((freq, i) => {
        this.playTone(freq, 'sine', 0.25, 0.18, i * 0.05);
      });
    },

    playGrowth() {
      if (this.isMuted || !this.ctx) return;
      const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25];
      arpeggio.forEach((freq, i) => {
        this.playTone(freq, 'sine', 0.4, 0.2, i * 0.1);
      });
    },

    playSunbeam() {
      if (this.isMuted || !this.ctx) return;
      const sunChords = [329.63, 415.30, 493.88, 659.25, 830.61];
      sunChords.forEach((freq, i) => {
        this.playTone(freq, 'triangle', 0.7, 0.18, i * 0.08);
      });
    },

    playCelebrationFanfare() {
      if (this.isMuted || !this.ctx) return;
      const fanfare = [
        { f: 523.25, d: 0.2, t: 0 },
        { f: 659.25, d: 0.2, t: 0.15 },
        { f: 783.99, d: 0.2, t: 0.30 },
        { f: 1046.50, d: 0.6, t: 0.45 },
        { f: 880.00, d: 0.2, t: 0.8 },
        { f: 1046.50, d: 0.8, t: 0.95 }
      ];
      fanfare.forEach(item => {
        this.playTone(item.f, 'triangle', item.d, 0.3, item.t);
        this.playTone(item.f * 1.5, 'sine', item.d, 0.15, item.t);
      });
    },

    speak(text, onEnd) {
      if (this.isMuted || !('speechSynthesis' in window)) {
        if (onEnd) setTimeout(onEnd, 1200);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.synthVoice) utterance.voice = this.synthVoice;
      utterance.rate = 0.92; // slightly slower & friendly for kids
      utterance.pitch = 1.25; // cheerful youthful tone
      utterance.volume = 1.0;

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      window.speechSynthesis.speak(utterance);
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return this.isMuted;
    }
  };

  // ============================================================
  // GAME STATE & MANAGER
  // ============================================================
  const Game = {
    currentColorIndex: 0,
    collectedRedCount: 0,
    indigoConnectedStep: 0,
    isCompleted: false,
    isFreePlay: false,
    confettiParticles: [],
    confettiAnimId: null,

    // DOM Elements
    appEl: null,
    stageEl: null,
    speechTextEl: null,
    riyaContainerEl: null,
    starContainerEl: null,
    celebrationOverlayEl: null,
    freeplayHudEl: null,
    btnSoundEl: null,

    init() {
      this.appEl = document.getElementById('game-app');
      this.stageEl = document.getElementById('interactive-stage');
      this.speechTextEl = document.getElementById('riya-speech-text');
      this.riyaContainerEl = document.getElementById('riya-container');
      this.starContainerEl = document.getElementById('star-container');
      this.celebrationOverlayEl = document.getElementById('celebration-overlay');
      this.freeplayHudEl = document.getElementById('freeplay-hud');
      this.btnSoundEl = document.getElementById('btn-sound');

      AudioManager.init();
      this.bindGlobalEvents();
      this.loadStage(0);
    },

    bindGlobalEvents() {
      // Audio resume on first tap
      document.body.addEventListener('click', () => AudioManager.resume(), { once: true });
      document.body.addEventListener('touchstart', () => AudioManager.resume(), { once: true });

      // HUD buttons
      if (this.btnSoundEl) {
        this.btnSoundEl.addEventListener('click', () => {
          const isMuted = AudioManager.toggleMute();
          const soundOn = this.btnSoundEl.querySelector('.sound-on');
          const soundOff = this.btnSoundEl.querySelector('.sound-off');
          if (soundOn && soundOff) {
            soundOn.classList.toggle('hidden', isMuted);
            soundOff.classList.toggle('hidden', !isMuted);
          }
        });
      }

      const btnRepeat = document.getElementById('btn-repeat-voice');
      if (btnRepeat) {
        btnRepeat.addEventListener('click', () => {
          this.repeatCurrentPrompt();
        });
      }

      const btnReset = document.getElementById('btn-reset');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          this.resetGame();
        });
      }

      // Riya tap interaction
      if (this.riyaContainerEl) {
        this.riyaContainerEl.addEventListener('click', () => {
          this.onRiyaTapped();
        });
      }

      // Little Star tap interaction
      if (this.starContainerEl) {
        this.starContainerEl.addEventListener('click', () => {
          this.onStarTapped();
        });
      }

      // Sun tap interaction
      const sunEl = document.getElementById('world-sun');
      if (sunEl) {
        sunEl.addEventListener('click', () => {
          AudioManager.playTone(659.25, 'triangle', 0.4, 0.2);
          this.spawnSparklesAt(sunEl.getBoundingClientRect());
        });
      }

      // Butterfly interactions
      document.querySelectorAll('.creature.butterfly').forEach(b => {
        b.addEventListener('click', (e) => {
          AudioManager.playTone(783.99, 'sine', 0.3, 0.15);
          this.spawnSparklesAt(b.getBoundingClientRect());
        });
      });

      // Rainbow Arc taps for freeplay & musical chords
      document.querySelectorAll('.rainbow-arc').forEach((arc, idx) => {
        arc.addEventListener('click', () => {
          AudioManager.playChimeNote(idx);
          this.spawnSparklesAt(arc.getBoundingClientRect());
        });
      });

      // Celebration modal buttons
      const btnPlayFree = document.getElementById('btn-play-free');
      if (btnPlayFree) {
        btnPlayFree.addEventListener('click', () => {
          this.enterFreePlayMode();
        });
      }

      const btnPlayAgain = document.getElementById('btn-play-again');
      if (btnPlayAgain) {
        btnPlayAgain.addEventListener('click', () => {
          this.resetGame();
        });
      }

      const btnFreeplayReplay = document.getElementById('btn-freeplay-replay');
      if (btnFreeplayReplay) {
        btnFreeplayReplay.addEventListener('click', () => {
          this.resetGame();
        });
      }

      // Roll-call soundboard pills
      document.querySelectorAll('.rollcall-pill').forEach((pill, idx) => {
        pill.addEventListener('click', () => {
          const colorName = COLOR_DATA[idx].name;
          AudioManager.playChimeNote(idx);
          pill.classList.add('speaking');
          AudioManager.speak(colorName, () => {
            pill.classList.remove('speaking');
          });
        });
      });
    },

    setRiyaSpeech(text, speak = true) {
      if (this.speechTextEl) {
        this.speechTextEl.textContent = text;
      }
      if (speak) {
        AudioManager.speak(text);
      }
    },

    repeatCurrentPrompt() {
      if (this.isCompleted) {
        this.setRiyaSpeech("We saved the rainbow! Tap any colour or character to play!", true);
        return;
      }
      const currentColor = COLOR_DATA[this.currentColorIndex];
      if (currentColor) {
        this.setRiyaSpeech(currentColor.voicePrompt, true);
      }
    },

    onRiyaTapped() {
      AudioManager.playChimeNote(this.currentColorIndex % 7);
      this.riyaContainerEl.classList.add('riya-celebrating');
      setTimeout(() => {
        this.riyaContainerEl.classList.remove('riya-celebrating');
      }, 1000);

      if (this.isCompleted) {
        this.setRiyaSpeech("Yay! Look at all our beautiful rainbow colours!", true);
      } else {
        const color = COLOR_DATA[this.currentColorIndex];
        this.setRiyaSpeech(`Let's find the magical ${color.name} colour!`, true);
      }
    },

    onStarTapped() {
      AudioManager.playSparkle();
      const starAvatar = document.getElementById('star-avatar');
      if (starAvatar) {
        starAvatar.classList.remove('star-spinning');
        void starAvatar.offsetWidth; // trigger reflow
        starAvatar.classList.add('star-spinning');
      }
      this.setRiyaSpeech("Little Star sparkles with happiness!", true);
    },

    // ============================================================
    // STAGE LOADERS & MECHANICS
    // ============================================================
    loadStage(index) {
      this.currentColorIndex = index;
      if (!this.stageEl) return;
      this.stageEl.innerHTML = '';

      // Update Active Crystal Slot in HUD
      document.querySelectorAll('.crystal-slot').forEach((slot, i) => {
        slot.classList.toggle('current-active', i === index);
      });

      const color = COLOR_DATA[index];
      if (!color) return;

      this.setRiyaSpeech(color.voicePrompt, true);

      switch (index) {
        case 0: // RED - Find & Collect
          this.initRedStage();
          break;
        case 1: // ORANGE - Shape Puzzle Placement
          this.initOrangeStage();
          break;
        case 2: // YELLOW - Sun Lightup Magic
          this.initYellowStage();
          break;
        case 3: // GREEN - Garden Growth
          this.initGreenStage();
          break;
        case 4: // BLUE - River Water Path
          this.initBlueStage();
          break;
        case 5: // INDIGO - Star Constellation Path
          this.initIndigoStage();
          break;
        case 6: // VIOLET - Magic Transformation Bloom
          this.initVioletStage();
          break;
      }
    },

    // ------------------------------------------------------------
    // 1. RED STAGE: FIND & COLLECT
    // ------------------------------------------------------------
    initRedStage() {
      this.collectedRedCount = 0;

      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #FF1744;">🔴 RED RESCUE</div>
        <div class="mechanic-subtitle">Tap the 3 red objects hiding in the world!</div>
        <div class="collect-progress-bar">
          <span>Found:</span>
          <div class="red-counter-pill" id="rc-1">🍎</div>
          <div class="red-counter-pill" id="rc-2">🍓</div>
          <div class="red-counter-pill" id="rc-3">❤️</div>
        </div>
      `;
      this.stageEl.appendChild(card);

      // Add 3 Red Objects into the interactive scene
      const scene = document.createElement('div');
      scene.className = 'red-find-scene';
      scene.innerHTML = `
        <div class="red-collect-item item-apple" id="red-item-1" data-name="Red Apple">
          <span class="item-emoji">🍎</span>
          <span class="item-label">Red Apple</span>
        </div>
        <div class="red-collect-item item-strawberry" id="red-item-2" data-name="Red Strawberry">
          <span class="item-emoji">🍓</span>
          <span class="item-label">Red Strawberry</span>
        </div>
        <div class="red-collect-item item-heart" id="red-item-3" data-name="Red Heart Flower">
          <span class="item-emoji">❤️</span>
          <span class="item-label">Red Heart</span>
        </div>
      `;
      this.stageEl.appendChild(scene);

      // Event listeners for items
      const items = scene.querySelectorAll('.red-collect-item');
      items.forEach((item, i) => {
        item.addEventListener('click', () => {
          if (item.classList.contains('collected')) return;
          item.classList.add('collected');
          
          AudioManager.playPop();
          AudioManager.playSparkle();

          const pill = document.getElementById(`rc-${i + 1}`);
          if (pill) pill.classList.add('filled');

          item.style.transform = 'scale(0) translateY(-60px)';
          item.style.opacity = '0';

          this.collectedRedCount++;
          const itemName = item.getAttribute('data-name');
          this.setRiyaSpeech(`${itemName}! Great job!`, true);

          if (this.collectedRedCount >= 3) {
            setTimeout(() => {
              this.completeColor(0);
            }, 800);
          }
        });
      });
    },

    // ------------------------------------------------------------
    // 2. ORANGE STAGE: SHAPE PUZZLE
    // ------------------------------------------------------------
    initOrangeStage() {
      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #FF6D00;">🟠 ORANGE RESCUE</div>
        <div class="mechanic-subtitle">Tap or place the glowing ORANGE crystal into the slot!</div>
        <div class="puzzle-arena">
          <div class="puzzle-target-slot" id="orange-target-slot">
            <span class="slot-silhouette">🔶</span>
            <span style="font-size: 11px; font-weight:800; color:#FF9800; margin-top:4px;">ORANGE SPOT</span>
          </div>
          <div class="puzzle-pieces-pool">
            <div class="orange-piece" id="correct-orange-piece" title="Tap or Drag Orange Gem">
              <span>🔶</span>
            </div>
            <div class="orange-piece puzzle-decoy" id="decoy-piece" title="Different Piece">
              <span>🔷</span>
            </div>
          </div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const targetSlot = document.getElementById('orange-target-slot');
      const correctPiece = document.getElementById('correct-orange-piece');
      const decoyPiece = document.getElementById('decoy-piece');

      const onPlaceCorrect = () => {
        AudioManager.playSnap();
        AudioManager.playSparkle();
        targetSlot.classList.add('snap-highlight');
        targetSlot.innerHTML = `<span style="font-size: 52px; animation: cardEnter 0.4s ease;">🔶</span>`;
        correctPiece.style.opacity = '0';
        correctPiece.style.pointerEvents = 'none';
        if (decoyPiece) decoyPiece.style.opacity = '0.3';

        this.setRiyaSpeech("Click! Perfect fit! ORANGE is glowing!", true);
        setTimeout(() => {
          this.completeColor(1);
        }, 1000);
      };

      if (correctPiece) {
        correctPiece.addEventListener('click', onPlaceCorrect);
      }
      if (targetSlot) {
        targetSlot.addEventListener('click', onPlaceCorrect);
      }

      if (decoyPiece) {
        decoyPiece.addEventListener('click', () => {
          AudioManager.playPop();
          this.setRiyaSpeech("That's blue! Let's choose the bright ORANGE piece!", true);
          decoyPiece.style.transform = 'translateX(10px)';
          setTimeout(() => { decoyPiece.style.transform = 'translateX(0)'; }, 300);
        });
      }
    },

    // ------------------------------------------------------------
    // 3. YELLOW STAGE: SUN LIGHT-UP MAGIC
    // ------------------------------------------------------------
    initYellowStage() {
      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #F57F17;">🟡 YELLOW RESCUE</div>
        <div class="mechanic-subtitle">Tap the Yellow Sun Crystal to shine bright light!</div>
        <div class="sun-magic-arena">
          <div class="yellow-sun-orb" id="yellow-sun-btn" title="Tap Sun Crystal">
            <span>☀️</span>
          </div>
          <div class="tap-prompt-pulse">✨ Tap the Yellow Sun! ✨</div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const sunBtn = document.getElementById('yellow-sun-btn');
      if (sunBtn) {
        sunBtn.addEventListener('click', () => {
          AudioManager.playSunbeam();
          AudioManager.playSparkle();
          sunBtn.style.transform = 'scale(1.4)';
          sunBtn.style.boxShadow = '0 0 80px #FFD600';
          
          this.setRiyaSpeech("Yellow! Look how bright and warm the world is!", true);
          setTimeout(() => {
            this.completeColor(2);
          }, 1100);
        });
      }
    },

    // ------------------------------------------------------------
    // 4. GREEN STAGE: GROW THE GARDEN
    // ------------------------------------------------------------
    initGreenStage() {
      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #00C853;">🟢 GREEN RESCUE</div>
        <div class="mechanic-subtitle">Tap the green seed to plant and grow lush green leaves!</div>
        <div class="garden-arena">
          <div class="seed-dispenser">
            <div class="green-seed" id="green-seed-btn" title="Plant Green Seed">
              <span>🌱</span>
            </div>
            <span style="font-size:12px; font-weight:800; color:#00C853; margin-top:6px;">GREEN SEED</span>
          </div>
          <div class="garden-soil-patch" id="soil-patch" title="Garden Soil">
            <div class="plant-growth-stage" id="plant-stage">
              <span class="growth-icon" id="plant-icon">🟫</span>
            </div>
          </div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const seedBtn = document.getElementById('green-seed-btn');
      const soilPatch = document.getElementById('soil-patch');
      const plantIcon = document.getElementById('plant-icon');

      const triggerGrowth = () => {
        if (seedBtn.classList.contains('planted')) return;
        seedBtn.classList.add('planted');
        seedBtn.style.opacity = '0';

        AudioManager.playGrowth();
        this.setRiyaSpeech("It's growing! Sprout... Stem... Lush green leaves!", true);

        // Stage 1: Sprout
        plantIcon.textContent = '🌱';
        plantIcon.style.transform = 'scale(1.1)';

        // Stage 2: Plant
        setTimeout(() => {
          AudioManager.playGrowth();
          plantIcon.textContent = '🌿';
          plantIcon.style.transform = 'scale(1.3)';
        }, 600);

        // Stage 3: Full Emerald Foliage
        setTimeout(() => {
          AudioManager.playSparkle();
          plantIcon.textContent = '🌳';
          plantIcon.style.transform = 'scale(1.6)';
        }, 1200);

        setTimeout(() => {
          this.completeColor(3);
        }, 2000);
      };

      if (seedBtn) seedBtn.addEventListener('click', triggerGrowth);
      if (soilPatch) soilPatch.addEventListener('click', triggerGrowth);
    },

    // ------------------------------------------------------------
    // 5. BLUE STAGE: RIVER WATER PATH
    // ------------------------------------------------------------
    initBlueStage() {
      let connectedStones = 0;

      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #0091EA;">🔵 BLUE RESCUE</div>
        <div class="mechanic-subtitle">Tap the 3 stepping stones to let the BLUE river flow!</div>
        <div class="river-puzzle-arena">
          <div class="river-stones-track">
            <div class="river-stone-node" id="stone-1" title="Tap Stone 1">🪨</div>
            <div class="river-stone-node" id="stone-2" title="Tap Stone 2">🪨</div>
            <div class="river-stone-node" id="stone-3" title="Tap Stone 3">🪨</div>
          </div>
          <div style="font-size: 14px; font-weight:800; color:#0288D1;" id="water-flow-status">Tap the stones to connect the stream!</div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const stones = [
        document.getElementById('stone-1'),
        document.getElementById('stone-2'),
        document.getElementById('stone-3')
      ];

      stones.forEach((stone, i) => {
        if (!stone) return;
        stone.addEventListener('click', () => {
          if (stone.classList.contains('connected')) return;
          stone.classList.add('connected');
          stone.innerHTML = '💧';
          AudioManager.playWaterSplash();
          connectedStones++;

          if (connectedStones < 3) {
            this.setRiyaSpeech(`Splash! Stone ${connectedStones} connected!`, true);
          } else {
            const statusEl = document.getElementById('water-flow-status');
            if (statusEl) statusEl.textContent = '💧 Water is flowing freely! 💧';

            const riverContainer = document.getElementById('world-river');
            if (riverContainer) riverContainer.classList.add('active');

            this.setRiyaSpeech("Blue! Listen to the beautiful sparkling river!", true);
            setTimeout(() => {
              this.completeColor(4);
            }, 1200);
          }
        });
      });
    },

    // ------------------------------------------------------------
    // 6. INDIGO STAGE: STAR CONSTELLATION PATH
    // ------------------------------------------------------------
    initIndigoStage() {
      this.indigoConnectedStep = 0;

      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #651FFF;">🟣 INDIGO RESCUE</div>
        <div class="mechanic-subtitle">Tap the glowing indigo stars in order: 1, 2, 3, 4!</div>
        <div class="indigo-path-arena" id="indigo-arena">
          <div class="indigo-star-node istar-1 active-target" id="istar-1" data-step="1">
            <span class="node-num">1</span>
            <span class="node-star-icon">✨</span>
          </div>
          <div class="indigo-star-node istar-2" id="istar-2" data-step="2">
            <span class="node-num">2</span>
            <span class="node-star-icon">✨</span>
          </div>
          <div class="indigo-star-node istar-3" id="istar-3" data-step="3">
            <span class="node-num">3</span>
            <span class="node-star-icon">✨</span>
          </div>
          <div class="indigo-star-node istar-4" id="istar-4" data-step="4">
            <span class="node-num">4</span>
            <span class="node-star-icon">✨</span>
          </div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const starNodes = [
        document.getElementById('istar-1'),
        document.getElementById('istar-2'),
        document.getElementById('istar-3'),
        document.getElementById('istar-4')
      ];

      starNodes.forEach((node, i) => {
        if (!node) return;
        node.addEventListener('click', () => {
          const step = i + 1;
          if (step === this.indigoConnectedStep + 1) {
            // Correct step
            this.indigoConnectedStep = step;
            node.classList.remove('active-target');
            node.classList.add('connected');
            AudioManager.playTone(440 + step * 80, 'triangle', 0.4, 0.25);

            if (step < 4) {
              starNodes[step].classList.add('active-target');
              this.setRiyaSpeech(`Star ${step}! Now tap star ${step + 1}!`, true);
            } else {
              AudioManager.playSparkle();
              this.setRiyaSpeech("Indigo! The magic starlight trail is complete!", true);
              setTimeout(() => {
                this.completeColor(5);
              }, 1200);
            }
          } else {
            // Gentle feedback
            AudioManager.playPop();
            this.setRiyaSpeech(`Let's tap star number ${this.indigoConnectedStep + 1}!`, true);
          }
        });
      });
    },

    // ------------------------------------------------------------
    // 7. VIOLET STAGE: MAGIC TRANSFORMATION BLOOM
    // ------------------------------------------------------------
    initVioletStage() {
      const card = document.createElement('div');
      card.className = 'mechanic-card';
      card.innerHTML = `
        <div class="mechanic-title" style="color: #AA00FF;">🟪 VIOLET RESCUE</div>
        <div class="mechanic-subtitle">Tap the magical violet crystal flower to make it transform!</div>
        <div class="violet-bloom-arena">
          <div class="violet-flower-pod" id="violet-flower-btn" title="Transform Violet Flower">
            <span id="violet-flower-emoji">🔮</span>
          </div>
          <div class="tap-prompt-pulse" style="background:#F3E5F5; color:#8E24AA; border-color:#CE93D8;">✨ Tap the Violet Flower! ✨</div>
        </div>
      `;
      this.stageEl.appendChild(card);

      const flowerBtn = document.getElementById('violet-flower-btn');
      const flowerEmoji = document.getElementById('violet-flower-emoji');

      if (flowerBtn) {
        flowerBtn.addEventListener('click', () => {
          if (flowerBtn.classList.contains('bloomed')) return;
          flowerBtn.classList.add('bloomed');

          AudioManager.playGrowth();
          flowerEmoji.textContent = '🌺';
          flowerBtn.style.transform = 'scale(1.2) rotate(15deg)';

          setTimeout(() => {
            AudioManager.playSparkle();
            flowerEmoji.textContent = '🪷';
            flowerBtn.style.transform = 'scale(1.4) rotate(-10deg)';
          }, 600);

          setTimeout(() => {
            this.setRiyaSpeech("Violet! The magical flower has bloomed!", true);
            this.completeColor(6);
          }, 1400);
        });
      }
    },

    // ============================================================
    // COLOR COMPLETION & WORLD TRANSFORMATION
    // ============================================================
    completeColor(index) {
      const color = COLOR_DATA[index];
      if (!color) return;

      // 1. Play musical crystal chime note
      AudioManager.playChimeNote(index);

      // 2. Mark Crystal Slot in HUD as completed
      const slot = document.getElementById(`slot-${index}`);
      if (slot) {
        slot.classList.remove('current-active');
        slot.classList.add('completed');
      }

      // 3. Activate Rainbow Arc SVG
      const arc = document.getElementById(`rainbow-arc-${index}`);
      if (arc) {
        arc.classList.add('active');
      }

      // 4. Update World Transformation Class on App Container
      this.appEl.classList.add(`unlocked-${color.id}`);

      // 5. Riya celebration reaction
      if (this.riyaContainerEl) {
        this.riyaContainerEl.classList.add('riya-celebrating');
        setTimeout(() => {
          this.riyaContainerEl.classList.remove('riya-celebrating');
        }, 1200);
      }

      // 6. Spawn colorful sparkles
      this.spawnSparklesAt(this.stageEl.getBoundingClientRect());

      // 7. Check if all 7 colors are restored
      if (index === 6) {
        // Grand WOW Finale!
        setTimeout(() => {
          this.triggerGrandCelebration();
        }, 1200);
      } else {
        // Move to next color after speech
        this.setRiyaSpeech(color.rewardVoice, true);
        setTimeout(() => {
          this.loadStage(index + 1);
        }, 2200);
      }
    },

    // ============================================================
    // MAJOR WOW FINALE & CELEBRATION
    // ============================================================
    triggerGrandCelebration() {
      this.isCompleted = true;
      if (this.stageEl) this.stageEl.innerHTML = '';

      // Fully transform world
      this.appEl.classList.add('world-fully-restored');

      // Make nature elements vivid
      document.querySelectorAll('.creature').forEach(c => c.classList.add('visible'));

      // Play victory fanfare
      AudioManager.playCelebrationFanfare();

      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}

      // Show celebration overlay
      if (this.celebrationOverlayEl) {
        this.celebrationOverlayEl.classList.remove('hidden');
      }

      // Start confetti cannon
      this.startConfetti();

      // Educational Roll-Call Speech Sequence: Pronounce each color clearly
      this.runRollCallPronunciation();
    },

    runRollCallPronunciation() {
      const pills = document.querySelectorAll('.rollcall-pill');
      let step = 0;

      const speakNext = () => {
        if (step >= COLOR_DATA.length) {
          this.setRiyaSpeech("We saved the rainbow! Look at all the colours!", true);
          return;
        }

        const color = COLOR_DATA[step];
        const pill = pills[step];

        pills.forEach(p => p.classList.remove('speaking'));
        if (pill) pill.classList.add('speaking');

        AudioManager.playChimeNote(step);
        AudioManager.speak(color.name, () => {
          if (pill) pill.classList.remove('speaking');
          step++;
          setTimeout(speakNext, 500);
        });
      };

      setTimeout(speakNext, 800);
    },

    // ============================================================
    // FREE PLAY SANDBOX MODE
    // ============================================================
    enterFreePlayMode() {
      this.isFreePlay = true;
      if (this.celebrationOverlayEl) {
        this.celebrationOverlayEl.classList.add('hidden');
      }
      if (this.freeplayHudEl) {
        this.freeplayHudEl.classList.remove('hidden');
      }
      this.setRiyaSpeech("Tap any rainbow arc, butterfly, flower, or river to make magic!", true);
    },

    resetGame() {
      // Clear confetti
      this.stopConfetti();

      // Reset state variables
      this.currentColorIndex = 0;
      this.collectedRedCount = 0;
      this.indigoConnectedStep = 0;
      this.isCompleted = false;
      this.isFreePlay = false;

      // Reset classes
      this.appEl.className = 'game-container state-initial';
      
      document.querySelectorAll('.crystal-slot').forEach(slot => {
        slot.className = 'crystal-slot';
      });

      document.querySelectorAll('.rainbow-arc').forEach(arc => {
        arc.classList.remove('active');
      });

      const river = document.getElementById('world-river');
      if (river) river.classList.remove('active');

      document.querySelectorAll('.creature').forEach(c => c.classList.remove('visible'));

      if (this.celebrationOverlayEl) this.celebrationOverlayEl.classList.add('hidden');
      if (this.freeplayHudEl) this.freeplayHudEl.classList.add('hidden');

      this.loadStage(0);
    },

    // ============================================================
    // VISUAL FX (Confetti & Sparkles)
    // ============================================================
    spawnSparklesAt(rect) {
      const colors = ['#FF2A55', '#FF8800', '#FFD200', '#00D068', '#00A6FF', '#5833FF', '#C41CFF'];
      for (let i = 0; i < 16; i++) {
        const spark = document.createElement('div');
        spark.className = 'sparkle-fx';
        spark.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        spark.style.position = 'fixed';
        spark.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 80}px`;
        spark.style.top = `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 80}px`;
        spark.style.fontSize = `${Math.floor(Math.random() * 16 + 18)}px`;
        spark.style.color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '9999';
        spark.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
          spark.style.transform = `translate(${(Math.random() - 0.5) * 160}px, ${(Math.random() - 0.5) * 160 - 40}px) scale(0)`;
          spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 850);
      }
    },

    startConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ['#FF2A55', '#FF8800', '#FFD200', '#00D068', '#00A6FF', '#5833FF', '#C41CFF'];
      this.confettiParticles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10
      }));

      const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.confettiParticles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vRot;
          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        });
        this.confettiAnimId = requestAnimationFrame(loop);
      };
      loop();
    },

    stopConfetti() {
      if (this.confettiAnimId) {
        cancelAnimationFrame(this.confettiAnimId);
        this.confettiAnimId = null;
      }
      const canvas = document.getElementById('confetti-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Start the game on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Game.init());
  } else {
    Game.init();
  }

  // Expose Game to window for QA/automation
  window.ChotaPlayRainbowGame = Game;

})();
