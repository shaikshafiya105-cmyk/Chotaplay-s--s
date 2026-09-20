/* ============================================================
   RIYA'S NUMBER GARDEN: "FIND MY MISSING FRIEND!"
   CHOTAPLAY - UKG EDUCATIONAL GAME SCRIPT (ES6+)
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. SOUND SYNTHESIS ENGINE (Web Audio API)
     ========================================================== */
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
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

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.2, startDelay = 0) {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + startDelay;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gainVal, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.05);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }

    playPop() {
      this.init();
      this.playTone(600, 'sine', 0.08, 0.25);
      this.playTone(900, 'triangle', 0.06, 0.2, 0.03);
    }

    playStarTwinkle() {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((note, i) => {
        this.playTone(note, 'sine', 0.18, 0.18, i * 0.06);
      });
    }

    playCorrect() {
      this.init();
      // Cheerful Major Chime: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'triangle', 0.28, 0.22, idx * 0.08);
      });
      // Soft sub chord
      this.playTone(261.63, 'sine', 0.4, 0.15, 0.08);
    }

    playHint() {
      this.init();
      // Gentle dual tone
      this.playTone(440, 'sine', 0.2, 0.15);
      this.playTone(554.37, 'sine', 0.25, 0.12, 0.1);
    }

    playSwoosh() {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.22);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    }

    playFanfare() {
      this.init();
      const fanfare = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.12 },
        { f: 783.99, d: 0.12, t: 0.24 },
        { f: 1046.5, d: 0.45, t: 0.36 },
        { f: 880.00, d: 0.15, t: 0.52 },
        { f: 1046.5, d: 0.7, t: 0.68 }
      ];
      fanfare.forEach(item => {
        this.playTone(item.f, 'triangle', item.d, 0.25, item.t);
      });
    }

    playJump(pitchFactor = 1) {
      this.init();
      const baseFreq = 400 * pitchFactor;
      this.playTone(baseFreq, 'sine', 0.12, 0.2);
      this.playTone(baseFreq * 1.35, 'triangle', 0.14, 0.18, 0.05);
    }
  }

  /* ==========================================================
     2. VOICE-FIRST SPEECH SYNTHESIS ENGINE
     ========================================================== */
  class VoiceSystem {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.preferredVoice = null;
      this.initVoice();
    }

    initVoice() {
      if (!this.synth) return;
      const loadVoices = () => {
        const voices = this.synth.getVoices();
        // Look for friendly English voices
        this.preferredVoice =
          voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Zira'))) ||
          voices.find(v => v.lang.startsWith('en')) ||
          voices[0] ||
          null;
      };

      loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
    }

    speak(text, onEndCallback = null) {
      if (!this.synth) {
        if (onEndCallback) onEndCallback();
        return;
      }

      try {
        this.synth.cancel(); // Stop any overlapping speech

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.preferredVoice) {
          utterance.voice = this.preferredVoice;
        }
        utterance.pitch = 1.2; // Cheerful friendly pitch for young children
        utterance.rate = 0.92;  // Clear, friendly pacing
        utterance.volume = 1.0;

        utterance.onend = () => {
          if (onEndCallback) onEndCallback();
        };
        utterance.onerror = () => {
          if (onEndCallback) onEndCallback();
        };

        this.synth.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        if (onEndCallback) onEndCallback();
      }
    }

    stop() {
      if (this.synth) {
        try {
          this.synth.cancel();
        } catch (e) {}
      }
    }
  }

  /* ==========================================================
     3. PARTICLE & CONFETTI ENGINE (Canvas Based)
     ========================================================== */
  class ParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;
      this.resize();

      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(x, y, count = 35, type = 'confetti') {
      const colors = ['#FF006E', '#FFBE0B', '#3A86FF', '#70E000', '#8338EC', '#FB5607', '#FFF'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        this.particles.push({
          x: x || window.innerWidth / 2,
          y: y || window.innerHeight / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 6,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 15,
          alpha: 1,
          type: type, // 'confetti', 'star', 'heart'
          life: 1
        });
      }
      if (!this.animId) {
        this.loop();
      }
    }

    burstCelebration() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.burst(w * 0.25, h * 0.4, 40, 'star');
      this.burst(w * 0.5, h * 0.3, 50, 'confetti');
      this.burst(w * 0.75, h * 0.4, 40, 'heart');
    }

    loop() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.015;

        if (p.alpha <= 0 || p.y > this.canvas.height + 20) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.fillStyle = p.color;

        if (p.type === 'star') {
          this.drawStar(0, 0, 5, p.size, p.size / 2);
        } else if (p.type === 'heart') {
          this.drawHeart(0, 0, p.size);
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.loop());
      } else {
        this.animId = null;
      }
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        this.ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        this.ctx.lineTo(x, y);
        rot += step;
      }
      this.ctx.lineTo(cx, cy - outerRadius);
      this.ctx.closePath();
      this.ctx.fill();
    }

    drawHeart(x, y, size) {
      this.ctx.beginPath();
      const topCurveHeight = size * 0.3;
      this.ctx.moveTo(x, y + topCurveHeight);
      this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      this.ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      this.ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  /* ==========================================================
     4. GAME ENGINE & LOGIC CONTROLLER
     ========================================================== */
  class RiyaGameEngine {
    constructor() {
      this.sound = new SoundFX();
      this.voice = new VoiceSystem();
      this.fx = new ParticleEngine('fx-canvas');

      // State
      this.currentRoundIndex = 0;
      this.totalRounds = 6;
      this.score = 0;
      this.currentQuestion = null;
      this.isProcessingAnswer = false;
      this.currentVoicePrompt = '';

      // Drag and Drop active data
      this.draggedElement = null;
      this.dragGhost = null;
      this.dragStartX = 0;
      this.dragStartY = 0;

      // Curated Scene Sequence Definitions
      this.sceneRounds = [
        { type: 'BEFORE', sceneName: 'Garden Path', sceneClass: 'backdrop-garden-path', icon: '🌸' },
        { type: 'AFTER', sceneName: 'Butterfly Meadow', sceneClass: 'backdrop-butterfly-meadow', icon: '🦋' },
        { type: 'BETWEEN', sceneName: 'Missing Friend Grove', sceneClass: 'backdrop-garden-path', icon: '🌈' },
        { type: 'POND', sceneName: 'Number Pond', sceneClass: 'backdrop-number-pond', icon: '🐸' },
        { type: 'BRIDGE', sceneName: 'Magic Bridge', sceneClass: 'backdrop-magic-bridge', icon: '🌉' },
        { type: 'BEFORE_AFTER_MIX', sceneName: 'Rainbow Garden', sceneClass: 'backdrop-garden-path', icon: '⭐' }
      ];

      this.cacheDOMElements();
      this.bindEvents();
    }

    cacheDOMElements() {
      // Views
      this.hud = document.getElementById('game-hud');
      this.titleScene = document.getElementById('title-scene');
      this.gameplayScene = document.getElementById('gameplay-scene');
      this.finaleScene = document.getElementById('finale-scene');

      // HUD elements
      this.sceneTitle = document.getElementById('scene-title');
      this.sceneIcon = document.getElementById('scene-icon');
      this.progressText = document.getElementById('progress-text');
      this.progressFill = document.getElementById('progress-fill');
      this.btnSoundToggle = document.getElementById('btn-sound-toggle');
      this.btnRepeatVoice = document.getElementById('btn-repeat-voice');
      this.soundIcon = document.getElementById('sound-icon');

      // Stage Elements
      this.dynamicBackdrop = document.getElementById('dynamic-backdrop');
      this.envMiddleLayer = document.getElementById('env-middle-layer');
      this.mechanicBadge = document.getElementById('mechanic-badge');
      this.mechanicTitle = document.getElementById('mechanic-title');
      this.mechanicIcon = document.getElementById('mechanic-icon');
      this.sequenceTrack = document.getElementById('sequence-track');
      this.candidateCardsContainer = document.getElementById('candidate-cards-container');
      this.trayInstructionLabel = document.getElementById('tray-instruction-label');
      this.speechMainText = document.getElementById('speech-main-text');
      this.speechSpeakerTag = document.getElementById('speech-speaker-tag');
      this.helperHintToast = document.getElementById('helper-hint-toast');
      this.helperHintText = document.getElementById('helper-hint-text');

      // Character Avatars
      this.stageRiya = document.getElementById('stage-riya');
      this.stageStar = document.getElementById('stage-star');

      // Finale Elements
      this.paradeGrid = document.getElementById('parade-grid-1-20');
      this.btnPlayAgain = document.getElementById('btn-play-again');
      this.btnFreeExplore = document.getElementById('btn-free-explore');
    }

    bindEvents() {
      // Start Adventure Button
      const btnStart = document.getElementById('btn-start-game');
      if (btnStart) {
        btnStart.addEventListener('click', () => {
          this.sound.init();
          this.sound.playStarTwinkle();
          this.startGame();
        });
      }

      // HUD Sound Toggle
      if (this.btnSoundToggle) {
        this.btnSoundToggle.addEventListener('click', () => {
          const isMuted = this.sound.toggleMute();
          this.soundIcon.textContent = isMuted ? '🔇' : '🎵';
        });
      }

      // HUD Repeat Voice
      if (this.btnRepeatVoice) {
        this.btnRepeatVoice.addEventListener('click', () => {
          this.sound.playPop();
          this.repeatCurrentVoice();
        });
      }

      // Play Again
      if (this.btnPlayAgain) {
        this.btnPlayAgain.addEventListener('click', () => {
          this.sound.playStarTwinkle();
          this.startGame();
        });
      }

      // Dance Party Mode
      if (this.btnFreeExplore) {
        this.btnFreeExplore.addEventListener('click', () => {
          this.sound.playFanfare();
          this.fx.burstCelebration();
          this.animateParadeDanceParty();
        });
      }

      // Character tap easter eggs
      if (this.stageRiya) {
        this.stageRiya.addEventListener('click', () => {
          this.sound.playJump(1.2);
          this.voice.speak("Let's help our number friends!");
          this.stageRiya.style.transform = 'scale(1.2) translateY(-10px)';
          setTimeout(() => { this.stageRiya.style.transform = ''; }, 400);
        });
      }

      if (this.stageStar) {
        this.stageStar.addEventListener('click', () => {
          this.sound.playStarTwinkle();
          this.voice.speak("Twinkle twinkle! You're doing wonderful!");
          this.stageStar.style.transform = 'scale(1.3) rotate(20deg)';
          setTimeout(() => { this.stageStar.style.transform = ''; }, 400);
        });
      }
    }

    /* ==========================================================
       START / RESET GAME
       ========================================================== */
    startGame() {
      this.currentRoundIndex = 0;
      this.score = 0;
      this.isProcessingAnswer = false;

      // Show HUD and Gameplay Scene
      this.titleScene.classList.add('hidden');
      this.finaleScene.classList.add('hidden');
      this.hud.classList.remove('hidden');
      this.gameplayScene.classList.remove('hidden');

      this.updateProgressUI();
      this.loadRound(this.currentRoundIndex);
    }

    /* ==========================================================
       QUESTION GENERATOR (UKG Mathematical Safety Rules)
       ========================================================== */
    generateQuestion(roundConfig) {
      let type = roundConfig.type;
      if (type === 'BEFORE_AFTER_MIX') {
        type = Math.random() > 0.5 ? 'BEFORE' : 'AFTER';
      }

      let q = {
        type: type,
        mechanicType: roundConfig.type,
        sceneClass: roundConfig.sceneClass,
        sceneName: roundConfig.sceneName,
        icon: roundConfig.icon
      };

      if (type === 'BEFORE') {
        // Range 2 to 20 (never Before 1)
        const target = Math.floor(Math.random() * 19) + 2; // 2 to 20
        const correct = target - 1;
        q.target = target;
        q.correct = correct;
        q.candidates = this.generateCandidates(correct, [target]);
        q.speechQuestion = `Who comes before ${target}?`;
        q.speechCorrect = `Yay! ${correct} comes before ${target}!`;
        q.displayPrompt = `Who comes BEFORE ${target}?`;
      } else if (type === 'AFTER') {
        // Range 1 to 19 (never After 20)
        const target = Math.floor(Math.random() * 19) + 1; // 1 to 19
        const correct = target + 1;
        q.target = target;
        q.correct = correct;
        q.candidates = this.generateCandidates(correct, [target]);
        q.speechQuestion = `Who comes after ${target}?`;
        q.speechCorrect = `Super! ${correct} comes after ${target}!`;
        q.displayPrompt = `Who comes AFTER ${target}?`;
      } else {
        // BETWEEN (Standard, POND, or BRIDGE)
        // Range: first number 1 to 18; third number first + 2; answer first + 1
        const first = Math.floor(Math.random() * 18) + 1; // 1 to 18
        const second = first + 1;
        const third = first + 2;

        q.first = first;
        q.correct = second;
        q.third = third;
        q.candidates = this.generateCandidates(second, [first, third]);

        if (roundConfig.type === 'POND') {
          q.speechQuestion = `Who sits on the lily pad between ${first} and ${third}?`;
          q.speechCorrect = `Splendid! ${second} sits between ${first} and ${third}!`;
          q.displayPrompt = `Who is BETWEEN ${first} and ${third}?`;
        } else if (roundConfig.type === 'BRIDGE') {
          q.speechQuestion = `Who belongs on the magic bridge between ${first} and ${third}?`;
          q.speechCorrect = `Hooray! ${second} completes the bridge between ${first} and ${third}!`;
          q.displayPrompt = `Bridge missing between ${first} and ${third}!`;
        } else {
          q.speechQuestion = `Who belongs between ${first} and ${third}?`;
          q.speechCorrect = `Hooray! ${second} is between ${first} and ${third}! We found our missing friend!`;
          q.displayPrompt = `Who belongs BETWEEN ${first} and ${third}?`;
        }
      }

      return q;
    }

    generateCandidates(correct, excluded = []) {
      const candidates = [correct];
      const allExcluded = new Set([...excluded, correct]);

      // Distractor candidates pool (1..20)
      const possible = [];
      for (let i = 1; i <= 20; i++) {
        if (!allExcluded.has(i)) {
          possible.push(i);
        }
      }

      // Shuffle possible and pick 2
      this.shuffleArray(possible);
      candidates.push(possible[0], possible[1]);

      // Shuffle final 3 candidates
      this.shuffleArray(candidates);
      return candidates;
    }

    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    /* ==========================================================
       LOAD ROUND & RENDER STAGE
       ========================================================== */
    loadRound(roundIndex) {
      if (roundIndex >= this.totalRounds) {
        this.showFinale();
        return;
      }

      this.isProcessingAnswer = false;
      this.hideHelperToast();

      const config = this.sceneRounds[roundIndex];
      this.currentQuestion = this.generateQuestion(config);

      // Update HUD
      this.sceneTitle.textContent = config.sceneName;
      this.sceneIcon.textContent = config.icon;

      // Update Scene Environment Style
      this.dynamicBackdrop.className = config.sceneClass;
      this.renderSceneBackdropDecorations(config.type);

      // Update Speech Bubble & Voice
      this.speechSpeakerTag.textContent = '⭐ Little Star:';
      this.speechMainText.textContent = `"${this.currentQuestion.displayPrompt}"`;
      this.currentVoicePrompt = this.currentQuestion.speechQuestion;

      // Speak prompt with voice system
      this.voice.speak(this.currentVoicePrompt);

      // Render Mechanic Header
      this.renderMechanicBadge(config.type);

      // Render Central Sequence Track
      this.renderSequenceTrack(this.currentQuestion);

      // Render Candidate Tray
      this.renderCandidateTray(this.currentQuestion.candidates);
    }

    renderMechanicBadge(mechanicType) {
      let title = 'BEFORE PUZZLE';
      let icon = '🌱';

      if (mechanicType === 'AFTER') {
        title = 'WHO COMES NEXT?';
        icon = '🦋';
      } else if (mechanicType === 'BETWEEN') {
        title = 'FIND MY MISSING FRIEND!';
        icon = '🌈';
      } else if (mechanicType === 'POND') {
        title = 'NUMBER POND ADVENTURE';
        icon = '🐸';
      } else if (mechanicType === 'BRIDGE') {
        title = 'MAGIC BRIDGE RESCUE';
        icon = '🌉';
      } else if (mechanicType === 'BEFORE_AFTER_MIX') {
        title = 'GARDEN NUMBER RESCUE';
        icon = '⭐';
      }

      this.mechanicTitle.textContent = title;
      this.mechanicIcon.textContent = icon;
    }

    renderSceneBackdropDecorations(mechanicType) {
      this.envMiddleLayer.innerHTML = '';

      if (mechanicType === 'POND') {
        const pond = document.createElement('div');
        pond.className = 'pond-water-layer';
        this.envMiddleLayer.appendChild(pond);
      } else if (mechanicType === 'BRIDGE') {
        const bridge = document.createElement('div');
        bridge.className = 'magic-bridge-arch';
        this.envMiddleLayer.appendChild(bridge);
      }
    }

    /* ==========================================================
       RENDER CENTRAL SEQUENCE TRACK
       ========================================================== */
    renderSequenceTrack(q) {
      this.sequenceTrack.innerHTML = '';

      if (q.type === 'BEFORE') {
        // [ ? Drop Slot ]  ➜  [ Target Card ]
        const dropSlot = this.createDropSlot('Before ' + q.target);
        const arrow = this.createArrow();
        const targetCard = this.createNumberCard(q.target, true, false);

        this.sequenceTrack.appendChild(dropSlot);
        this.sequenceTrack.appendChild(arrow);
        this.sequenceTrack.appendChild(targetCard);
      } else if (q.type === 'AFTER') {
        // [ Target Card with Butterfly ]  ➜  [ ? Drop Slot ]
        const carrierWrap = document.createElement('div');
        carrierWrap.className = 'butterfly-carrier';

        const bFly = document.createElement('div');
        bFly.className = 'carrier-butterfly-icon';
        bFly.textContent = '🦋';

        const targetCard = this.createNumberCard(q.target, true, false);
        carrierWrap.appendChild(bFly);
        carrierWrap.appendChild(targetCard);

        const arrow = this.createArrow();
        const dropSlot = this.createDropSlot('After ' + q.target);

        this.sequenceTrack.appendChild(carrierWrap);
        this.sequenceTrack.appendChild(arrow);
        this.sequenceTrack.appendChild(dropSlot);
      } else {
        // BETWEEN / POND / BRIDGE: [ First ] ➜ [ ? Drop Slot ] ➜ [ Third ]
        const isPond = q.mechanicType === 'POND';
        const isBridge = q.mechanicType === 'BRIDGE';

        const firstCard = this.createNumberCard(q.first, true, isPond, isBridge);
        const arrow1 = this.createArrow();
        const dropSlot = this.createDropSlot('Between ' + q.first + ' & ' + q.third);
        const arrow2 = this.createArrow();
        const thirdCard = this.createNumberCard(q.third, true, isPond, isBridge);

        this.sequenceTrack.appendChild(firstCard);
        this.sequenceTrack.appendChild(arrow1);
        this.sequenceTrack.appendChild(dropSlot);
        this.sequenceTrack.appendChild(arrow2);
        this.sequenceTrack.appendChild(thirdCard);
      }
    }

    createArrow() {
      const arrow = document.createElement('div');
      arrow.className = 'sequence-arrow';
      arrow.textContent = '➜';
      return arrow;
    }

    createDropSlot(promptLabel) {
      const slot = document.createElement('div');
      slot.className = 'drop-slot-box';
      slot.id = 'active-drop-zone';

      const qMark = document.createElement('span');
      qMark.className = 'slot-question-mark';
      qMark.textContent = '?';

      const label = document.createElement('span');
      label.className = 'slot-prompt-text';
      label.textContent = promptLabel;

      slot.appendChild(qMark);
      slot.appendChild(label);

      // Enable Drag & Drop listeners on drop slot
      slot.addEventListener('dragover', (e) => e.preventDefault());
      slot.addEventListener('dragenter', () => slot.classList.add('drag-over'));
      slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        if (this.draggedElement) {
          const num = parseInt(this.draggedElement.dataset.number, 10);
          this.handleCandidateChoice(num, this.draggedElement);
        }
      });

      return slot;
    }

    createNumberCard(number, isFixed = false, isPond = false, isBridge = false) {
      const card = document.createElement('div');
      card.className = 'num-friend-card';
      card.dataset.number = number;

      if (isFixed) card.classList.add('target-fixed-card');
      if (isPond) card.classList.add('lily-pad-frame');
      if (isBridge) card.classList.add('bridge-stone-frame');

      // Card Cute Face
      const faceBar = document.createElement('div');
      faceBar.className = 'card-face-bar';

      const eyeL = document.createElement('div');
      eyeL.className = 'char-eye';
      const blushL = document.createElement('div');
      blushL.className = 'char-blush';
      const eyeR = document.createElement('div');
      eyeR.className = 'char-eye';

      faceBar.appendChild(eyeL);
      faceBar.appendChild(blushL);
      faceBar.appendChild(eyeR);

      // Card Digit
      const digit = document.createElement('div');
      digit.className = 'card-digit';
      digit.textContent = number;

      // Card Feet
      const feetRow = document.createElement('div');
      feetRow.className = 'card-feet-row';
      const foot1 = document.createElement('div');
      foot1.className = 'card-foot';
      const foot2 = document.createElement('div');
      foot2.className = 'card-foot';
      feetRow.appendChild(foot1);
      feetRow.appendChild(foot2);

      card.appendChild(faceBar);
      card.appendChild(digit);
      card.appendChild(feetRow);

      return card;
    }

    /* ==========================================================
       RENDER CANDIDATE TRAY & POINTER / DRAG HANDLERS
       ========================================================= */
    renderCandidateTray(candidates) {
      this.candidateCardsContainer.innerHTML = '';
      const themeClasses = ['candidate-theme-1', 'candidate-theme-2', 'candidate-theme-3'];

      candidates.forEach((num, idx) => {
        const card = this.createNumberCard(num, false, false, false);
        card.classList.add('candidate-card', themeClasses[idx % themeClasses.length]);
        card.setAttribute('draggable', 'true');

        // Tap / Click Handler
        card.addEventListener('click', (e) => {
          if (this.isProcessingAnswer) return;
          this.sound.playPop();
          this.handleCandidateChoice(num, card);
        });

        // Pointer Drag Support (Touch & Mouse Universal)
        this.setupPointerDrag(card, num);

        this.candidateCardsContainer.appendChild(card);
      });
    }

    setupPointerDrag(card, num) {
      let isPointerDown = false;
      let startX = 0;
      let startY = 0;
      let ghost = null;

      const onPointerDown = (e) => {
        if (this.isProcessingAnswer) return;
        isPointerDown = true;
        startX = e.clientX;
        startY = e.clientY;
        this.draggedElement = card;

        card.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e) => {
        if (!isPointerDown) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // Start ghost once moved slightly
        if (!ghost && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
          card.classList.add('is-dragging');
          ghost = card.cloneNode(true);
          ghost.classList.add('drag-ghost');
          ghost.style.left = `${e.clientX}px`;
          ghost.style.top = `${e.clientY}px`;
          document.body.appendChild(ghost);
          this.sound.playPop();
        }

        if (ghost) {
          ghost.style.left = `${e.clientX}px`;
          ghost.style.top = `${e.clientY}px`;

          // Check if hovering over drop slot
          const dropSlot = document.getElementById('active-drop-zone');
          if (dropSlot) {
            const rect = dropSlot.getBoundingClientRect();
            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              dropSlot.classList.add('drag-over');
            } else {
              dropSlot.classList.remove('drag-over');
            }
          }
        }
      };

      const onPointerUp = (e) => {
        if (!isPointerDown) return;
        isPointerDown = false;
        card.classList.remove('is-dragging');

        if (ghost) {
          ghost.remove();
          ghost = null;
        }

        const dropSlot = document.getElementById('active-drop-zone');
        if (dropSlot) {
          dropSlot.classList.remove('drag-over');
          const rect = dropSlot.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            // Dropped inside drop zone
            this.handleCandidateChoice(num, card);
          }
        }

        try {
          card.releasePointerCapture(e.pointerId);
        } catch (err) {}
      };

      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerup', onPointerUp);
      card.addEventListener('pointercancel', onPointerUp);
    }

    /* ==========================================================
       ANSWER VALIDATION & FEEDBACK LOOP
       ========================================================== */
    handleCandidateChoice(chosenNum, candidateElement) {
      if (this.isProcessingAnswer) return;

      if (chosenNum === this.currentQuestion.correct) {
        this.handleCorrectAnswer(chosenNum, candidateElement);
      } else {
        this.handleIncorrectAnswer(chosenNum, candidateElement);
      }
    }

    handleCorrectAnswer(chosenNum, candidateElement) {
      this.isProcessingAnswer = true;
      this.sound.playCorrect();
      this.sound.playSwoosh();

      // Replace Drop Slot with the placed number friend card
      const dropSlot = document.getElementById('active-drop-zone');
      if (dropSlot) {
        const placedCard = this.createNumberCard(
          chosenNum,
          true,
          this.currentQuestion.mechanicType === 'POND',
          this.currentQuestion.mechanicType === 'BRIDGE'
        );
        placedCard.classList.add('placed-correctly');
        dropSlot.replaceWith(placedCard);
      }

      // Sparkles and Particles
      const rect = candidateElement.getBoundingClientRect();
      this.fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45, 'star');

      // Update Riya & Star Dialog
      this.speechSpeakerTag.textContent = '💖 Riya:';
      this.speechMainText.textContent = `"${this.currentQuestion.speechCorrect}"`;
      this.voice.speak(this.currentQuestion.speechCorrect);

      // Character happy jumps
      if (this.stageRiya) {
        this.stageRiya.style.transform = 'translateY(-14px) scale(1.1)';
        setTimeout(() => { this.stageRiya.style.transform = ''; }, 600);
      }
      if (this.stageStar) {
        this.stageStar.style.transform = 'translateY(-16px) rotate(15deg) scale(1.2)';
        setTimeout(() => { this.stageStar.style.transform = ''; }, 600);
      }

      // Increase progress
      this.score++;
      this.currentRoundIndex++;
      this.updateProgressUI();

      // Delay then next question
      setTimeout(() => {
        this.loadRound(this.currentRoundIndex);
      }, 2400);
    }

    handleIncorrectAnswer(chosenNum, candidateElement) {
      this.sound.playHint();

      // Gentle shake animation on candidate
      candidateElement.classList.add('shake-gentle');
      setTimeout(() => {
        candidateElement.classList.remove('shake-gentle');
      }, 500);

      // Little Star gentle encouraging guidance
      const hintText = `Let's look carefully. Can you find who belongs?`;
      this.speechSpeakerTag.textContent = '⭐ Little Star:';
      this.speechMainText.textContent = `"Let's look carefully!"`;
      this.showHelperToast(`Try again! Who comes ${this.currentQuestion.type.toLowerCase()}?`);

      this.voice.speak(hintText);
    }

    showHelperToast(text) {
      this.helperHintText.textContent = text;
      this.helperHintToast.classList.remove('hidden');
    }

    hideHelperToast() {
      this.helperHintToast.classList.add('hidden');
    }

    repeatCurrentVoice() {
      if (this.currentVoicePrompt) {
        this.voice.speak(this.currentVoicePrompt);
      }
    }

    updateProgressUI() {
      const pct = Math.min(100, Math.round((this.currentRoundIndex / this.totalRounds) * 100));
      this.progressFill.style.width = `${pct}%`;
      this.progressText.textContent = `Friends Helped: ${this.currentRoundIndex} / ${this.totalRounds}`;
    }

    /* ==========================================================
       GRAND FINALE CELEBRATION (1–20 Number Parade)
       ========================================================== */
    showFinale() {
      this.gameplayScene.classList.add('hidden');
      this.finaleScene.classList.remove('hidden');

      this.sound.playFanfare();
      this.fx.burstCelebration();

      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}

      this.voice.speak(
        "Look! Everyone found their place! Numbers have their own special places. You are a true Number Friend Hero!"
      );

      this.renderParadeGrid();
    }

    renderParadeGrid() {
      this.paradeGrid.innerHTML = '';
      const faces = ['😊', '😄', '🌟', '🌸', '✨', '🥰', '🎈', '💖', '🌼', '🦋'];

      for (let num = 1; num <= 20; num++) {
        const card = document.createElement('div');
        card.className = 'parade-card';

        const digit = document.createElement('span');
        digit.className = 'parade-num';
        digit.textContent = num;

        const face = document.createElement('span');
        face.className = 'parade-face';
        face.textContent = faces[(num - 1) % faces.length];

        card.appendChild(digit);
        card.appendChild(face);

        // Interactive click on any number in parade
        card.addEventListener('click', () => {
          this.sound.playJump(0.7 + (num / 20) * 0.8);
          this.voice.speak(`I am number ${num}!`);
          card.style.transform = 'translateY(-18px) scale(1.25) rotate(10deg)';
          const rect = card.getBoundingClientRect();
          this.fx.burst(rect.left + rect.width / 2, rect.top, 15, 'star');
          setTimeout(() => { card.style.transform = ''; }, 500);
        });

        this.paradeGrid.appendChild(card);
      }
    }

    animateParadeDanceParty() {
      const cards = this.paradeGrid.querySelectorAll('.parade-card');
      cards.forEach((c, idx) => {
        setTimeout(() => {
          c.style.transform = 'translateY(-20px) scale(1.3) rotate(-10deg)';
          setTimeout(() => { c.style.transform = ''; }, 450);
        }, idx * 60);
      });
      this.voice.speak('Dance party! Number friends are dancing together!');
    }
  }

  // Initialize Game on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.riyaGame = new RiyaGameEngine();
  });
})();
