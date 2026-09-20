/**
 * =========================================================
 * JOHN'S CURVE MAGIC ADVENTURE - CORE GAME SCRIPT (CHOTAPLAY)
 * Pure Vanilla JavaScript ES6+ (No external libraries)
 * =========================================================
 */

(() => {
  'use strict';

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
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

    playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.15) {
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

    playClick() {
      this.playTone(600, 'sine', 0.08, 0.2);
    }

    playSparkle() {
      if (!this.enabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.18, 0.12), idx * 45);
      });
    }

    playSuccess() {
      if (!this.enabled) return;
      // Cheerful major chord arpeggio
      const chord = [440, 554.37, 659.25, 880, 1108.73];
      chord.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.2), idx * 90);
      });
    }

    playFanfare() {
      if (!this.enabled) return;
      const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
      const delays = [0, 120, 240, 360, 480, 680];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.25), delays[idx]);
      });
    }

    playWhoosh() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      } catch (e) {}
    }
  }

  // --- SPEECH SYNTHESIZER WRAPPER ---
  class VoiceNarrator {
    constructor() {
      this.enabled = true;
      this.currentUtterance = null;
    }

    speak(text) {
      if (!this.enabled || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.25; // Friendly warm tone for preschool
        
        // Select child/friendly voice if available
        const voices = window.speechSynthesis.getVoices();
        const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
        if (friendlyVoice) {
          utterance.voice = friendlyVoice;
        }

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis unavailable:', err);
      }
    }
  }

  // --- GAME CONSTANTS & CONFIG ---
  const CURVES = {
    UPWARD: {
      id: 'UPWARD',
      name: 'Upward Curve',
      symbol: '∪',
      emoji: '🌈',
      title: 'Upward Curve!',
      magicName: 'Magic Rainbow',
      bgClass: 'scene-sky',
      targetObj: 'magic-obj-rainbow',
      dialogue: "Can you draw an upward curve ∪ to build the rainbow?",
      successVoice: "Upward curve! Wow! Look at the colorful rainbow!",
      stepIdx: 1,
      guidePath: "M 80,80 Q 200,240 320,80"
    },
    DOWNWARD: {
      id: 'DOWNWARD',
      name: 'Downward Curve',
      symbol: '∩',
      emoji: '🚤',
      title: 'Downward Curve!',
      magicName: 'Magic Boat Wave',
      bgClass: 'scene-river',
      targetObj: 'magic-obj-river',
      dialogue: "Can you draw a downward curve ∩ so the boat can sail?",
      successVoice: "Downward curve! Look! The boat is sailing smoothly!",
      stepIdx: 2,
      guidePath: "M 80,220 Q 200,60 320,220"
    },
    RIGHT: {
      id: 'RIGHT',
      name: 'Right Curve',
      symbol: ')',
      emoji: '🐛',
      title: 'Right Curve!',
      magicName: 'Caterpillar Path',
      bgClass: 'scene-garden',
      targetObj: 'magic-obj-garden',
      dialogue: "Can you draw a right curve ) to guide the hungry caterpillar?",
      successVoice: "Right curve! Great job! The caterpillar found the sunflower!",
      stepIdx: 3,
      guidePath: "M 140,40 Q 280,150 140,260"
    },
    LEFT: {
      id: 'LEFT',
      name: 'Left Curve',
      symbol: '(',
      emoji: '🎢',
      title: 'Left Curve!',
      magicName: 'Magic Ride Loop',
      bgClass: 'scene-fairground',
      targetObj: 'magic-obj-ride',
      dialogue: "Can you draw a left curve ( to start the magic rollercoaster?",
      successVoice: "Left curve! Wheeee! The magic ride is zooming!",
      stepIdx: 4,
      guidePath: "M 260,40 Q 120,150 260,260"
    }
  };

  const STAGES_ORDER = [CURVES.UPWARD, CURVES.DOWNWARD, CURVES.RIGHT, CURVES.LEFT];

  // --- MAIN GAME APPLICATION CONTROLLER ---
  class GameApp {
    constructor() {
      this.sound = new SoundFX();
      this.voice = new VoiceNarrator();

      // DOM Elements
      this.container = document.getElementById('game-container');
      this.canvas = document.getElementById('drawing-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.guideOverlay = document.getElementById('guide-overlay');
      this.guidePathEl = document.getElementById('guide-path');
      this.guideHandEl = document.getElementById('guide-hand');
      this.guideHintText = document.getElementById('guide-hint-text');
      this.sparkleLayer = document.getElementById('sparkle-particles');
      this.confettiCanvas = document.getElementById('confetti-canvas');
      this.confettiCtx = this.confettiCanvas.getContext('2d');

      // Modals & UI
      this.introModal = document.getElementById('intro-modal');
      this.victoryModal = document.getElementById('victory-modal');
      this.successBanner = document.getElementById('success-banner');
      this.successEmoji = document.getElementById('success-emoji');
      this.successTitle = document.getElementById('success-title');
      this.successDesc = document.getElementById('success-desc');
      this.dialogueText = document.getElementById('dialogue-text');
      this.speakerTag = document.getElementById('speaker-tag');
      this.sceneBg = document.getElementById('scene-bg');

      // Characters
      this.john = document.getElementById('john-character');
      this.star = document.getElementById('star-character');

      // Buttons
      this.btnStart = document.getElementById('btn-start-game');
      this.btnHint = document.getElementById('btn-hint');
      this.btnClear = document.getElementById('btn-clear');
      this.btnSound = document.getElementById('btn-sound');
      this.btnVoice = document.getElementById('btn-voice');
      this.btnRestart = document.getElementById('btn-restart');
      this.btnListenAgain = document.getElementById('btn-repeat-speech');
      this.btnFreePlay = document.getElementById('btn-free-play');
      this.btnPlayAgain = document.getElementById('btn-play-again');

      // State variables
      this.currentStageIndex = 0;
      this.currentCurveConfig = STAGES_ORDER[0];
      this.isFreePlayMode = false;
      this.isDrawing = false;
      this.points = [];
      this.strokeHistory = [];
      this.showHintActive = true;
      this.confettiParticles = [];
      this.isAnimating = false;
      this.guideAnimProgress = 0;

      this.init();
    }

    init() {
      this.resizeCanvases();
      window.addEventListener('resize', () => this.resizeCanvases());

      this.attachDrawingEvents();
      this.attachUIEvents();
      this.startGuideAnimation();
    }

    resizeCanvases() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      this.confettiCanvas.width = window.innerWidth * dpr;
      this.confettiCanvas.height = window.innerHeight * dpr;
      this.confettiCtx.scale(dpr, dpr);

      this.redrawCanvas();
    }

    // --- DRAWING SYSTEM (Pointer Events for Touch & Mouse) ---
    attachDrawingEvents() {
      const getPos = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          time: Date.now()
        };
      };

      const startDraw = (e) => {
        if (this.isAnimating) return;
        this.sound.init();
        this.isDrawing = true;
        this.canvas.setPointerCapture(e.pointerId);
        const pt = getPos(e);
        this.points = [pt];
        this.sound.playSparkle();
        this.createSparkleBurst(e.clientX, e.clientY, 5);
      };

      const moveDraw = (e) => {
        if (!this.isDrawing || this.isAnimating) return;
        const pt = getPos(e);
        const lastPt = this.points[this.points.length - 1];

        // Smooth distance check
        const dist = Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y);
        if (dist > 4) {
          this.points.push(pt);
          this.drawSmoothSegment();
          if (Math.random() < 0.35) {
            this.createSparkleBurst(e.clientX, e.clientY, 2);
          }
        }
      };

      const endDraw = (e) => {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        try {
          this.canvas.releasePointerCapture(e.pointerId);
        } catch (err) {}

        this.processStroke();
      };

      this.canvas.addEventListener('pointerdown', startDraw);
      this.canvas.addEventListener('pointermove', moveDraw);
      this.canvas.addEventListener('pointerup', endDraw);
      this.canvas.addEventListener('pointercancel', endDraw);
    }

    drawSmoothSegment() {
      if (this.points.length < 2) return;
      const pts = this.points;
      const len = pts.length;

      this.ctx.lineWidth = 14;
      this.ctx.strokeStyle = '#ffbe0b';
      this.ctx.shadowColor = '#fb5607';
      this.ctx.shadowBlur = 12;

      this.ctx.beginPath();
      if (len === 2) {
        this.ctx.moveTo(pts[0].x, pts[0].y);
        this.ctx.lineTo(pts[1].x, pts[1].y);
      } else {
        const xc = (pts[len - 2].x + pts[len - 1].x) / 2;
        const yc = (pts[len - 2].y + pts[len - 1].y) / 2;
        this.ctx.moveTo(pts[len - 3].x, pts[len - 3].y);
        this.ctx.quadraticCurveTo(pts[len - 2].x, pts[len - 2].y, xc, yc);
      }
      this.ctx.stroke();
    }

    redrawCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.clearRect(0, 0, rect.width, rect.height);
    }

    createSparkleBurst(clientX, clientY, count = 4) {
      const colors = ['#ff006e', '#ffbe0b', '#3a86ff', '#8338ec', '#38b000', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 12 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const tx = (Math.random() - 0.5) * 80 + 'px';
        const ty = (Math.random() - 0.5) * 80 + 'px';

        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = color;
        p.style.boxShadow = `0 0 10px ${color}`;
        p.style.left = `${clientX}px`;
        p.style.top = `${clientY}px`;
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);

        this.sparkleLayer.appendChild(p);
        setTimeout(() => p.remove(), 700);
      }
    }

    // --- CURVE RECOGNITION SYSTEM (Preschool Friendly & Robust) ---
    processStroke() {
      if (this.points.length < 5) {
        // Too short, gently clear
        this.redrawCanvas();
        return;
      }

      const detected = this.analyzeCurve(this.points);
      const expected = this.currentCurveConfig.id;

      console.log(`Stroke analyzed -> Detected: ${detected}, Expected: ${expected}`);

      if (this.isFreePlayMode) {
        if (detected) {
          this.handleFreePlaySuccess(detected);
        } else {
          this.handleGentleRetry();
        }
      } else {
        if (detected === expected) {
          this.handleCurveSuccess(detected);
        } else {
          this.handleGentleRetry();
        }
      }
    }

    analyzeCurve(pts) {
      // 1. Calculate Bounding Box & Total Stroke Length
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let totalLength = 0;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
        if (i > 0) {
          totalLength += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
        }
      }

      const width = maxX - minX;
      const height = maxY - minY;

      // Minimum stroke size threshold
      if (totalLength < 50 || (width < 30 && height < 30)) {
        return null;
      }

      // 2. Key Points: Start, End, and Mid
      const pStart = pts[0];
      const pEnd = pts[pts.length - 1];
      const midIdx = Math.floor(pts.length / 2);
      const pMid = pts[midIdx];

      // Also compute average of mid-section (30% to 70%) for noise resilience
      let midSumX = 0, midSumY = 0, midCount = 0;
      const sIdx = Math.floor(pts.length * 0.3);
      const eIdx = Math.floor(pts.length * 0.7);
      for (let i = sIdx; i <= eIdx; i++) {
        midSumX += pts[i].x;
        midSumY += pts[i].y;
        midCount++;
      }
      const avgMidX = midSumX / (midCount || 1);
      const avgMidY = midSumY / (midCount || 1);

      // Baseline chord endpoints
      const chordMidX = (pStart.x + pEnd.x) / 2;
      const chordMidY = (pStart.y + pEnd.y) / 2;

      // Vertical offset: How far does the middle sag/arch relative to chord
      const verticalDeflection = avgMidY - chordMidY;
      // Horizontal offset: How far does the middle curve right/left relative to chord
      const horizontalDeflection = avgMidX - chordMidX;

      const endsHigherThanMid = (pStart.y < avgMidY - 15) && (pEnd.y < avgMidY - 15);
      const endsLowerThanMid = (pStart.y > avgMidY + 15) && (pEnd.y > avgMidY + 15);
      const endsLeftOfMid = (pStart.x < avgMidX - 15) && (pEnd.x < avgMidX - 15);
      const endsRightOfMid = (pStart.x > avgMidX + 15) && (pEnd.x > avgMidX + 15);

      // 1. UPWARD CURVE (∪) -> Ends are up, middle dips down (positive verticalDeflection)
      if ((verticalDeflection > 20 && width > 40) || (endsHigherThanMid && width > 35)) {
        return 'UPWARD';
      }

      // 2. DOWNWARD CURVE (∩) -> Ends are down, middle arches up (negative verticalDeflection)
      if ((verticalDeflection < -20 && width > 40) || (endsLowerThanMid && width > 35)) {
        return 'DOWNWARD';
      }

      // 3. RIGHT CURVE () or C-shaped facing right) -> Ends are to left, middle extends to right (positive horizontalDeflection)
      if ((horizontalDeflection > 20 && height > 40) || (endsLeftOfMid && height > 35)) {
        return 'RIGHT';
      }

      // 4. LEFT CURVE (( or C-shaped facing left) -> Ends are to right, middle extends to left (negative horizontalDeflection)
      if ((horizontalDeflection < -20 && height > 40) || (endsRightOfMid && height > 35)) {
        return 'LEFT';
      }

      // Fallback generous check based on bounding box dominant curvature
      if (Math.abs(verticalDeflection) > Math.abs(horizontalDeflection)) {
        return verticalDeflection > 0 ? 'UPWARD' : 'DOWNWARD';
      } else if (Math.abs(horizontalDeflection) > 15) {
        return horizontalDeflection > 0 ? 'RIGHT' : 'LEFT';
      }

      return null;
    }

    // --- SUCCESS & TRANSFORMATION HANDLER ---
    handleCurveSuccess(curveId) {
      const cfg = CURVES[curveId];
      this.isAnimating = true;
      this.sound.playSuccess();

      // Glowing stroke animation on canvas
      this.glowCanvasStroke();

      // Flash success banner
      this.successEmoji.textContent = cfg.emoji;
      this.successTitle.textContent = cfg.title;
      this.successDesc.textContent = `Magical transformation: ${cfg.magicName}!`;
      this.successBanner.classList.remove('hidden');

      // Character animations
      this.john.className = 'character-box celebrating';
      this.star.className = 'character-box star-float spinning';

      // Dialogue & Voice
      this.speakerTag.textContent = '🌟 Little Star & John:';
      this.dialogueText.textContent = cfg.successVoice;
      this.voice.speak(cfg.successVoice);

      // Activate Scene Magical Transformation Object
      this.activateSceneObject(cfg.targetObj);

      // Complete progress badge
      const badge = document.getElementById(`step-btn-${cfg.stepIdx}`);
      if (badge) {
        badge.classList.add('completed');
      }

      setTimeout(() => {
        this.successBanner.classList.add('hidden');
        this.john.className = 'character-box idle';
        this.star.className = 'character-box star-float';
        this.redrawCanvas();
        this.isAnimating = false;

        // Proceed to next curve or victory
        if (this.currentStageIndex < STAGES_ORDER.length - 1) {
          this.setStage(this.currentStageIndex + 1);
        } else {
          this.triggerFinalVictory();
        }
      }, 3200);
    }

    handleFreePlaySuccess(curveId) {
      const cfg = CURVES[curveId];
      this.sound.playSuccess();
      this.glowCanvasStroke();

      this.speakerTag.textContent = '🪄 Magic Brush:';
      const msg = `You drew a ${cfg.name}! Transforming into ${cfg.magicName}!`;
      this.dialogueText.textContent = msg;
      this.voice.speak(cfg.title);

      this.activateSceneObject(cfg.targetObj);
      this.john.className = 'character-box celebrating';
      this.star.className = 'character-box star-float spinning';

      setTimeout(() => {
        this.john.className = 'character-box idle';
        this.star.className = 'character-box star-float';
        this.redrawCanvas();
      }, 2000);
    }

    glowCanvasStroke() {
      // Draw a brilliant golden neon glow over the user's stroke
      this.ctx.save();
      this.ctx.lineWidth = 18;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.shadowColor = '#ffe600';
      this.ctx.shadowBlur = 25;
      this.ctx.stroke();
      this.ctx.restore();
    }

    activateSceneObject(objId) {
      const el = document.getElementById(objId);
      if (!el) return;
      el.classList.remove('hidden');

      if (objId === 'magic-obj-river') {
        const boat = document.getElementById('boat-actor');
        boat.classList.remove('sailing');
        void boat.offsetWidth; // trigger reflow
        boat.classList.add('sailing');
      } else if (objId === 'magic-obj-garden') {
        const cat = document.getElementById('caterpillar-actor');
        cat.classList.remove('wiggling');
        void cat.offsetWidth;
        cat.classList.add('wiggling');
      } else if (objId === 'magic-obj-ride') {
        const cart = document.getElementById('cart-actor');
        cart.classList.remove('riding');
        void cart.offsetWidth;
        cart.classList.add('riding');
      }
    }

    handleGentleRetry() {
      this.sound.playWhoosh();
      this.redrawCanvas();

      const encouragements = [
        "Let's try again! Follow the glowing dots!",
        `Make a smooth curve for the ${this.currentCurveConfig.magicName}!`,
        "You can do it! Let's draw together!"
      ];
      const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
      this.speakerTag.textContent = '🌟 Little Star:';
      this.dialogueText.textContent = msg;
      this.voice.speak(msg);

      // Re-emphasize hint guide
      this.guideOverlay.classList.remove('hidden');
    }

    // --- STAGE NAVIGATION ---
    setStage(index) {
      this.currentStageIndex = index;
      this.currentCurveConfig = STAGES_ORDER[index];
      this.isFreePlayMode = false;

      // Update background scene theme
      this.sceneBg.className = this.currentCurveConfig.bgClass;

      // Hide other magic objects unless in celebration/freeplay
      document.querySelectorAll('.magic-element-wrapper').forEach(el => el.classList.add('hidden'));

      // Update Top Nav Tracker
      document.querySelectorAll('.step-badge').forEach((b, idx) => {
        b.classList.toggle('active', idx === index);
      });

      // Update Guide Path
      this.guidePathEl.setAttribute('d', this.currentCurveConfig.guidePath);
      this.guideHintText.textContent = `Draw ${this.currentCurveConfig.name} ${this.currentCurveConfig.symbol}`;
      this.guideOverlay.classList.remove('hidden');

      // Update Dialogue & Voice
      this.speakerTag.textContent = '👦 John:';
      this.dialogueText.textContent = this.currentCurveConfig.dialogue;
      this.voice.speak(this.currentCurveConfig.dialogue);

      this.redrawCanvas();
    }

    startGuideAnimation() {
      // Animates a cute hand pointer following the guide SVG path
      const loop = (timestamp) => {
        this.guideAnimProgress = (this.guideAnimProgress + 0.008) % 1;
        try {
          if (this.guidePathEl && this.guidePathEl.getTotalLength) {
            const totalLen = this.guidePathEl.getTotalLength();
            if (totalLen > 0) {
              const pt = this.guidePathEl.getPointAtLength(this.guideAnimProgress * totalLen);
              this.guideHandEl.setAttribute('cx', pt.x);
              this.guideHandEl.setAttribute('cy', pt.y);
            }
          }
        } catch (e) {}
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    // --- FINAL VICTORY & FREE PLAY ---
    triggerFinalVictory() {
      this.sound.playFanfare();
      this.victoryModal.classList.remove('hidden');
      this.victoryModal.classList.add('active');

      // Activate all 4 world objects simultaneously for the Grand Transformation!
      document.querySelectorAll('.magic-element-wrapper').forEach(el => el.classList.remove('hidden'));
      this.activateSceneObject('magic-obj-river');
      this.activateSceneObject('magic-obj-garden');
      this.activateSceneObject('magic-obj-ride');

      this.voice.speak("Congratulations! You are a Curve Magic Master! All magic curves are restored!");
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}
      this.launchConfetti();
    }

    launchConfetti() {
      const colors = ['#ff006e', '#ffbe0b', '#3a86ff', '#8338ec', '#38b000', '#fb5607', '#ffffff'];
      this.confettiParticles = [];
      for (let i = 0; i < 120; i++) {
        this.confettiParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight - window.innerHeight,
          w: Math.random() * 10 + 6,
          h: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8
        });
      }

      const animate = () => {
        this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let activeCount = 0;

        for (const p of this.confettiParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vRot;

          if (p.y < window.innerHeight) activeCount++;

          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rot * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          this.confettiCtx.restore();
        }

        if (activeCount > 0 && this.victoryModal.classList.contains('active')) {
          requestAnimationFrame(animate);
        } else {
          this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
      };
      requestAnimationFrame(animate);
    }

    enterFreePlay() {
      this.sound.playClick();
      this.victoryModal.classList.remove('active');
      this.victoryModal.classList.add('hidden');
      this.isFreePlayMode = true;

      // Update tracker
      document.querySelectorAll('.step-badge').forEach((b, idx) => {
        b.classList.toggle('active', idx === 4);
      });

      this.guideOverlay.classList.add('hidden');
      this.sceneBg.className = 'scene-sky';
      document.querySelectorAll('.magic-element-wrapper').forEach(el => el.classList.remove('hidden'));

      const msg = "🪄 Free Magic Brush unlocked! Draw any curve (∪, ∩, ), () anytime!";
      this.speakerTag.textContent = '🪄 Little Star:';
      this.dialogueText.textContent = msg;
      this.voice.speak("Magic curve brush unlocked! Draw any curve anytime!");
      this.redrawCanvas();
    }

    // --- ATTACH UI EVENT LISTENERS ---
    attachUIEvents() {
      // Start Game Button
      this.btnStart.addEventListener('click', () => {
        this.sound.init();
        this.sound.playSparkle();
        this.introModal.classList.remove('active');
        this.introModal.classList.add('hidden');
        this.setStage(0);
      });

      // Clear Canvas Button
      this.btnClear.addEventListener('click', () => {
        this.sound.playClick();
        this.redrawCanvas();
      });

      // Toggle Hint Button
      this.btnHint.addEventListener('click', () => {
        this.sound.playClick();
        this.guideOverlay.classList.toggle('hidden');
      });

      // Listen Voice Again Button
      this.btnListenAgain.addEventListener('click', () => {
        this.sound.playClick();
        this.voice.speak(this.dialogueText.textContent);
      });

      // Sound FX Toggle
      this.btnSound.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.btnSound.textContent = this.sound.enabled ? '🔊' : '🔇';
        this.btnSound.title = this.sound.enabled ? 'Sound On' : 'Sound Muted';
        if (this.sound.enabled) this.sound.playClick();
      });

      // Voice Toggle
      this.btnVoice.addEventListener('click', () => {
        this.voice.enabled = !this.voice.enabled;
        this.btnVoice.textContent = this.voice.enabled ? '🗣️' : '🤐';
        this.btnVoice.title = this.voice.enabled ? 'Voice On' : 'Voice Off';
        if (this.voice.enabled) {
          this.voice.speak(this.dialogueText.textContent);
        }
      });

      // Restart Game
      this.btnRestart.addEventListener('click', () => {
        this.sound.playClick();
        document.querySelectorAll('.step-badge').forEach(b => b.classList.remove('completed'));
        this.setStage(0);
      });

      // Play Again & Free Play Modals Buttons
      this.btnFreePlay.addEventListener('click', () => this.enterFreePlay());
      this.btnPlayAgain.addEventListener('click', () => {
        this.victoryModal.classList.remove('active');
        this.victoryModal.classList.add('hidden');
        document.querySelectorAll('.step-badge').forEach(b => b.classList.remove('completed'));
        this.setStage(0);
      });

      // Step Tracker direct clicks (allows jumping between learned curves)
      document.querySelectorAll('.step-badge').forEach((badge, idx) => {
        badge.addEventListener('click', () => {
          this.sound.playClick();
          if (idx < 4) {
            this.setStage(idx);
          } else {
            this.enterFreePlay();
          }
        });
      });

      // Interactive Master Cards in Victory Modal
      document.querySelectorAll('.master-card').forEach(card => {
        card.addEventListener('click', () => {
          const curveType = card.getAttribute('data-curve');
          const cfg = CURVES[curveType];
          if (cfg) {
            this.sound.playSparkle();
            this.voice.speak(`${cfg.name}! ${cfg.magicName}!`);
          }
        });
      });

      // Character Click Interactions (fun cute reactions!)
      this.john.addEventListener('click', () => {
        this.sound.playSparkle();
        this.john.className = 'character-box celebrating';
        this.voice.speak("Let's draw magic curves together!");
        setTimeout(() => (this.john.className = 'character-box idle'), 1500);
      });

      this.star.addEventListener('click', () => {
        this.sound.playSparkle();
        this.star.className = 'character-box star-float spinning';
        this.voice.speak("Magic is everywhere!");
        setTimeout(() => (this.star.className = 'character-box star-float'), 1200);
      });
    }
  }

  // Initialize Game on DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameApp();
  });
})();
