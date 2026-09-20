/**
 * ============================================================
 * JOHN'S ZERO GRAVITY MISSION 🚀 — CHOTAPLAY
 * Master Game Logic (Vanilla JS ES6+)
 * Core Concept: ZERO = NOTHING / NONE LEFT
 * ============================================================
 */

(function () {
  'use strict';

  /* ============================================================
     1. AUDIO SYSTEM (Web Audio API Synthesizer)
     ============================================================ */
  class SoundEngine {
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

    toggleSound() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    // Gentle pop when tapping objects
    playPop(freq = 440) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    // Sparkle magical arpeggio
    playSparkle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    }

    // Magical Zero Discovery Chime
    playZeroChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.9);
      });
    }

    // Cute munch sound for cookies
    playMunch() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + i * 0.08;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220 + i * 30, start);
        osc.frequency.exponentialRampToValueAtTime(110, start + 0.06);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.06);
      }
    }

    // Machine laser beam humming
    playLaser() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    // Magical flower re-bloom sound
    playBloom() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    }

    // Grand victory fanfare
    playFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const chord1 = [523.25, 659.25, 783.99];
      const chord2 = [659.25, 830.61, 987.77];
      const chord3 = [783.99, 987.77, 1174.66, 1567.98];

      const playChord = (chord, time, duration) => {
        chord.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);

          gain.gain.setValueAtTime(0.2, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(time);
          osc.stop(time + duration);
        });
      };

      const now = this.ctx.currentTime;
      playChord(chord1, now, 0.25);
      playChord(chord2, now + 0.28, 0.25);
      playChord(chord3, now + 0.58, 1.2);
    }
  }

  const soundEngine = new SoundEngine();

  /* ============================================================
     2. VOICE & SPEECH SYNTHESIS SYSTEM
     ============================================================ */
  class VoiceManager {
    constructor() {
      this.speakerAvatar = document.getElementById('speaker-avatar');
      this.speakerName = document.getElementById('speaker-name');
      this.speechText = document.getElementById('speech-text');
      this.speechWave = document.getElementById('speech-wave');
      this.lastSpokenText = '';
      this.lastSpeaker = 'star';
    }

    speak(text, speaker = 'star') {
      this.lastSpokenText = text;
      this.lastSpeaker = speaker;

      // Update Visual UI Subtitle
      if (speaker === 'john') {
        this.speakerAvatar.textContent = '👦';
        this.speakerName.textContent = 'John';
      } else {
        this.speakerAvatar.textContent = '⭐';
        this.speakerName.textContent = 'Little Star';
      }
      this.speechText.textContent = text;

      // Animate voice equalizer bars
      this.speechWave.classList.add('speaking');

      if (!('speechSynthesis' in window)) {
        setTimeout(() => this.speechWave.classList.remove('speaking'), 1800);
        return;
      }

      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Child-friendly warm pitch & pace
      if (speaker === 'star') {
        utterance.pitch = 1.35;
        utterance.rate = 0.95;
      } else {
        utterance.pitch = 1.15;
        utterance.rate = 0.92;
      }

      utterance.onend = () => {
        this.speechWave.classList.remove('speaking');
      };
      utterance.onerror = () => {
        this.speechWave.classList.remove('speaking');
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        this.speechWave.classList.remove('speaking');
      }
    }

    repeatLast() {
      if (this.lastSpokenText) {
        this.speak(this.lastSpokenText, this.lastSpeaker);
      }
    }
  }

  const voiceManager = new VoiceManager();

  /* ============================================================
     3. PARTICLE & VISUAL EFFECTS SYSTEM
     ============================================================ */
  class ParticleManager {
    constructor() {
      this.container = document.getElementById('fx-particles-layer');
      this.flashOverlay = document.getElementById('screen-flash-overlay');
    }

    flashScreen() {
      this.flashOverlay.classList.add('flash');
      setTimeout(() => this.flashOverlay.classList.remove('flash'), 350);
    }

    createSparkleBurst(x, y, count = 10) {
      const sparkleIcons = ['✨', '⭐', '💫', '🌟', '⚡'];
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'sparkle-particle';
        p.textContent = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 80;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);

        this.container.appendChild(p);
        setTimeout(() => p.remove(), 950);
      }
    }

    createConfettiShower(count = 60) {
      const colors = ['#00F0FF', '#FFD166', '#FF2A85', '#06D6A0', '#9D4EDD', '#FFFFFF', '#FF9F1C'];
      const width = window.innerWidth;

      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-particle';
        p.style.width = `${8 + Math.random() * 8}px`;
        p.style.height = `${10 + Math.random() * 12}px`;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${Math.random() * width}px`;
        p.style.top = `-20px`;

        const dx = (Math.random() - 0.5) * 200;
        const dy = window.innerHeight + 50 + Math.random() * 100;
        const dr = (Math.random() * 1080 - 540);

        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.setProperty('--dr', `${dr}deg`);
        p.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
        p.style.animationDelay = `${Math.random() * 0.4}s`;

        this.container.appendChild(p);
        setTimeout(() => p.remove(), 3600);
      }
    }
  }

  const particleManager = new ParticleManager();

  /* ============================================================
     4. STARFIELD BACKGROUND CANVAS
     ============================================================ */
  function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const numStars = 120;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Subtle background nebula tint
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.3, 10, width * 0.5, height * 0.5, width * 0.8);
      grad.addColorStop(0, 'rgba(76, 29, 149, 0.18)');
      grad.addColorStop(0.5, 'rgba(14, 116, 144, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Slow drift
        star.y -= star.speed * 10;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ============================================================
     5. MAIN GAME STATE & SCENE MANAGER
     ============================================================ */
  const GameState = {
    currentSceneId: 'intro',
    objectsRemaining: 0,
    currentSceneItemType: 'stars',
    scenesCompleted: 0
  };

  const UI = {
    tracker: document.getElementById('learning-tracker'),
    trackerIcons: document.getElementById('visual-counter-icons'),
    trackerCountText: document.getElementById('tracker-count-text'),
    scenes: {
      intro: document.getElementById('scene-intro'),
      planet: document.getElementById('scene-planet'),
      gravity: document.getElementById('scene-gravity'),
      chest: document.getElementById('scene-chest'),
      snack: document.getElementById('scene-snack'),
      garden: document.getElementById('scene-garden'),
      zeroizer: document.getElementById('scene-zeroizer'),
      finale: document.getElementById('scene-finale')
    }
  };

  // Update top counter indicator
  function updateVisualTracker(count, itemIcon = '⭐', label = 'REMAINING') {
    if (GameState.currentSceneId === 'intro' || GameState.currentSceneId === 'finale') {
      UI.tracker.classList.add('hidden');
      return;
    }

    UI.tracker.classList.remove('hidden');
    UI.trackerIcons.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.className = 'tracker-icon-dot';
      dot.textContent = itemIcon;
      UI.trackerIcons.appendChild(dot);
    }

    if (count === 0) {
      UI.trackerCountText.textContent = `0 ${label}`;
      UI.trackerCountText.classList.add('zero-badge');
    } else {
      UI.trackerCountText.textContent = `${count} ${label}`;
      UI.trackerCountText.classList.remove('zero-badge');
    }
  }

  // Switch Scene
  function switchScene(sceneKey) {
    // Hide all scenes
    Object.values(UI.scenes).forEach((s) => {
      if (s) {
        s.classList.remove('active-scene');
        s.style.display = 'none';
      }
    });

    const targetScene = UI.scenes[sceneKey];
    if (!targetScene) return;

    GameState.currentSceneId = sceneKey;
    targetScene.style.display = 'flex';
    // Trigger CSS transition
    setTimeout(() => {
      targetScene.classList.add('active-scene');
    }, 20);

    // Initialize scene logic
    if (sceneKey === 'intro') initIntroScene();
    else if (sceneKey === 'planet') initPlanetScene();
    else if (sceneKey === 'gravity') initGravityScene();
    else if (sceneKey === 'chest') initChestScene();
    else if (sceneKey === 'snack') initSnackScene();
    else if (sceneKey === 'garden') initGardenScene();
    else if (sceneKey === 'zeroizer') initZeroizerScene();
    else if (sceneKey === 'finale') initFinaleScene();
  }

  /* ============================================================
     SCENE 1: SPACE INTRO LOGIC
     ============================================================ */
  function initIntroScene() {
    UI.tracker.classList.add('hidden');
    voiceManager.speak("Hello Space Explorer! Today we're going to discover something special: What happens when nothing is left?", 'star');
  }

  /* ============================================================
     SCENE 2: ZERO PLANET (Tap & Remove) LOGIC
     ============================================================ */
  function initPlanetScene() {
    const container = document.getElementById('planet-stars-container');
    const revealCard = document.getElementById('planet-zero-reveal');
    revealCard.classList.add('hidden');
    container.innerHTML = '';

    GameState.objectsRemaining = 3;
    GameState.currentSceneItemType = 'stars';
    updateVisualTracker(3, '⭐', 'STARS');

    voiceManager.speak("Welcome to Zero Planet! Tap the 3 glowing stars one by one to see what happens!", 'star');

    const starData = [
      { id: 1, label: 'Star 1', icon: '⭐' },
      { id: 2, label: 'Star 2', icon: '⭐' },
      { id: 3, label: 'Star 3', icon: '⭐' }
    ];

    starData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = 'play-object float-anim';
      btn.style.animationDelay = `${index * 0.3}s`;
      btn.innerHTML = `<span>${item.icon}</span><span class="object-label">Star ${index + 1}</span>`;
      btn.setAttribute('aria-label', `Star ${index + 1}`);

      btn.addEventListener('click', (e) => {
        if (btn.classList.contains('vanish-anim')) return;

        const rect = btn.getBoundingClientRect();
        particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
        soundEngine.playPop(520 + (3 - GameState.objectsRemaining) * 100);

        btn.classList.add('vanish-anim');
        GameState.objectsRemaining--;

        if (GameState.objectsRemaining === 2) {
          updateVisualTracker(2, '⭐', 'STARS LEFT');
          voiceManager.speak("Two stars left! Keep going!", 'john');
        } else if (GameState.objectsRemaining === 1) {
          updateVisualTracker(1, '⭐', 'STAR LEFT');
          voiceManager.speak("Only one star left! Tap the last one!", 'star');
        } else if (GameState.objectsRemaining === 0) {
          // KEY LEARNING MOMENT: Visual Empty Space First, then Pause, then Reveal 0!
          updateVisualTracker(0, '⭐', 'STARS LEFT');
          setTimeout(() => {
            btn.remove();
            soundEngine.playZeroChime();
            particleManager.createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
            revealCard.classList.remove('hidden');
            voiceManager.speak("ZERO stars! Nothing is left! That is ZERO!", 'star');
          }, 600);
        }
      });

      container.appendChild(btn);
    });
  }

  /* ============================================================
     SCENE 3: ZERO GRAVITY ROOM LOGIC
     ============================================================ */
  function initGravityScene() {
    const container = document.getElementById('gravity-items-container');
    const revealCard = document.getElementById('gravity-zero-reveal');
    revealCard.classList.add('hidden');
    container.innerHTML = '';

    GameState.objectsRemaining = 3;
    GameState.currentSceneItemType = 'toys';
    updateVisualTracker(3, '🛸', 'ITEMS');

    voiceManager.speak("Look at this Zero Gravity room! Tap the floating objects to send them away!", 'john');

    const toyItems = [
      { icon: '🍎', name: 'Space Apple', top: '25%', left: '20%' },
      { icon: '🎈', name: 'Cosmic Balloon', top: '45%', left: '50%' },
      { icon: '🧸', name: 'Astro Bear', top: '30%', left: '75%' }
    ];

    toyItems.forEach((toy, idx) => {
      const btn = document.createElement('button');
      btn.className = 'play-object gravity-object';
      btn.style.top = toy.top;
      btn.style.left = toy.left;
      btn.style.animationDelay = `${idx * 0.5}s`;
      btn.innerHTML = `<span>${toy.icon}</span><span class="object-label">${toy.name}</span>`;

      btn.addEventListener('click', () => {
        if (btn.classList.contains('vanish-anim')) return;

        const rect = btn.getBoundingClientRect();
        particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
        soundEngine.playPop(480 + (3 - GameState.objectsRemaining) * 90);

        btn.classList.add('vanish-anim');
        GameState.objectsRemaining--;

        if (GameState.objectsRemaining === 2) {
          updateVisualTracker(2, '🛸', 'ITEMS LEFT');
          voiceManager.speak("Whoosh! 2 items floating!", 'star');
        } else if (GameState.objectsRemaining === 1) {
          updateVisualTracker(1, '🛸', 'ITEM LEFT');
          voiceManager.speak("1 item left! Send it away!", 'john');
        } else if (GameState.objectsRemaining === 0) {
          updateVisualTracker(0, '🛸', 'ITEMS');
          setTimeout(() => {
            btn.remove();
            soundEngine.playZeroChime();
            particleManager.createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
            revealCard.classList.remove('hidden');
            voiceManager.speak("The room is empty! Nothing is left! That's ZERO!", 'john');
          }, 600);
        }
      });

      container.appendChild(btn);
    });
  }

  /* ============================================================
     SCENE 4: TREASURE CHEST LOGIC
     ============================================================ */
  function initChestScene() {
    const container = document.getElementById('chest-gems-container');
    const revealCard = document.getElementById('chest-zero-reveal');
    revealCard.classList.add('hidden');
    container.innerHTML = '';

    GameState.objectsRemaining = 3;
    GameState.currentSceneItemType = 'gems';
    updateVisualTracker(3, '💎', 'GEMS');

    voiceManager.speak("A shiny space treasure chest! Tap each crystal gem to collect it into John's pouch!", 'star');

    const gems = [
      { name: 'Gem 1', color: '#00F0FF' },
      { name: 'Gem 2', color: '#FFD166' },
      { name: 'Gem 3', color: '#FF2A85' }
    ];

    gems.forEach((gem, idx) => {
      const btn = document.createElement('button');
      btn.className = 'play-object float-anim';
      btn.style.animationDelay = `${idx * 0.25}s`;
      btn.innerHTML = `<span>💎</span><span class="object-label">${gem.name}</span>`;

      btn.addEventListener('click', () => {
        if (btn.classList.contains('vanish-anim')) return;

        const rect = btn.getBoundingClientRect();
        particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
        soundEngine.playSparkle();

        btn.classList.add('vanish-anim');
        GameState.objectsRemaining--;

        if (GameState.objectsRemaining === 2) {
          updateVisualTracker(2, '💎', 'GEMS IN CHEST');
          voiceManager.speak("Collected! 2 gems left in the chest!", 'john');
        } else if (GameState.objectsRemaining === 1) {
          updateVisualTracker(1, '💎', 'GEM IN CHEST');
          voiceManager.speak("Just 1 gem left in the chest!", 'star');
        } else if (GameState.objectsRemaining === 0) {
          updateVisualTracker(0, '💎', 'GEMS IN CHEST');
          setTimeout(() => {
            btn.remove();
            soundEngine.playZeroChime();
            revealCard.classList.remove('hidden');
            voiceManager.speak("The chest is completely empty! Zero treasures left!", 'star');
          }, 600);
        }
      });

      container.appendChild(btn);
    });
  }

  /* ============================================================
     SCENE 5: ZERO SNACK LOGIC
     ============================================================ */
  function initSnackScene() {
    const container = document.getElementById('snack-cookies-container');
    const revealCard = document.getElementById('snack-zero-reveal');
    const johnMood = document.getElementById('john-mood');
    revealCard.classList.add('hidden');
    container.innerHTML = '';
    johnMood.textContent = '😋 Hungry John';

    GameState.objectsRemaining = 3;
    GameState.currentSceneItemType = 'cookies';
    updateVisualTracker(3, '🍪', 'COOKIES');

    voiceManager.speak("John is super hungry after space travel! Tap the cookies to feed John!", 'star');

    const cookies = ['Cookie 1', 'Cookie 2', 'Cookie 3'];

    cookies.forEach((cName, idx) => {
      const btn = document.createElement('button');
      btn.className = 'play-object float-anim';
      btn.style.animationDelay = `${idx * 0.2}s`;
      btn.innerHTML = `<span>🍪</span><span class="object-label">${cName}</span>`;

      btn.addEventListener('click', () => {
        if (btn.classList.contains('vanish-anim')) return;

        const rect = btn.getBoundingClientRect();
        particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        soundEngine.playMunch();

        btn.classList.add('vanish-anim');
        GameState.objectsRemaining--;

        if (GameState.objectsRemaining === 2) {
          updateVisualTracker(2, '🍪', 'COOKIES LEFT');
          johnMood.textContent = '😋 Nom Nom!';
          voiceManager.speak("Yum! 2 cookies left on the plate!", 'john');
        } else if (GameState.objectsRemaining === 1) {
          updateVisualTracker(1, '🍪', 'COOKIE LEFT');
          johnMood.textContent = '😋 Delicious!';
          voiceManager.speak("1 yummy cookie left!", 'john');
        } else if (GameState.objectsRemaining === 0) {
          updateVisualTracker(0, '🍪', 'COOKIES LEFT');
          johnMood.textContent = '😲 Where did they go?';
          setTimeout(() => {
            btn.remove();
            soundEngine.playZeroChime();
            revealCard.classList.remove('hidden');
            voiceManager.speak("All cookies are gone! There are ZERO cookies left on the plate!", 'star');
          }, 600);
        }
      });

      container.appendChild(btn);
    });
  }

  /* ============================================================
     SCENE 6: ZERO GARDEN LOGIC
     ============================================================ */
  function initGardenScene() {
    const container = document.getElementById('garden-flowers-container');
    const revealCard = document.getElementById('garden-zero-reveal');
    const bloomBanner = document.getElementById('bloom-banner');
    revealCard.classList.add('hidden');
    bloomBanner.classList.add('hidden');
    container.innerHTML = '';

    GameState.objectsRemaining = 3;
    GameState.currentSceneItemType = 'flowers';
    updateVisualTracker(3, '🌸', 'FLOWERS');

    voiceManager.speak("Look at this cosmic space garden! Pick the 3 glowing flowers for Little Star!", 'john');

    const flowers = ['Flower 1', 'Flower 2', 'Flower 3'];

    flowers.forEach((fName, idx) => {
      const btn = document.createElement('button');
      btn.className = 'play-object float-anim';
      btn.style.animationDelay = `${idx * 0.25}s`;
      btn.innerHTML = `<span>🌸</span><span class="object-label">${fName}</span>`;

      btn.addEventListener('click', () => {
        if (btn.classList.contains('vanish-anim')) return;

        const rect = btn.getBoundingClientRect();
        particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
        soundEngine.playSparkle();

        btn.classList.add('vanish-anim');
        GameState.objectsRemaining--;

        if (GameState.objectsRemaining === 2) {
          updateVisualTracker(2, '🌸', 'FLOWERS LEFT');
          voiceManager.speak("2 flowers left in the soil!", 'star');
        } else if (GameState.objectsRemaining === 1) {
          updateVisualTracker(1, '🌸', 'FLOWER LEFT');
          voiceManager.speak("1 flower left! Pick the last one!", 'john');
        } else if (GameState.objectsRemaining === 0) {
          updateVisualTracker(0, '🌸', 'FLOWERS');
          setTimeout(() => {
            btn.remove();
            soundEngine.playZeroChime();
            revealCard.classList.remove('hidden');
            voiceManager.speak("How many flowers are left? ZERO! The garden is empty!", 'star');

            // MAGIC RE-BLOOM WOW EVENT
            setTimeout(() => {
              bloomBanner.classList.remove('hidden');
              soundEngine.playBloom();
              particleManager.createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
              voiceManager.speak("Magic! The garden blooms again!", 'john');
            }, 1800);
          }, 600);
        }
      });

      container.appendChild(btn);
    });
  }

  /* ============================================================
     SCENE 7: THE ZEROIZER MAGIC MACHINE LOGIC
     ============================================================ */
  function initZeroizerScene() {
    const container = document.getElementById('zeroizer-items-container');
    const revealCard = document.getElementById('zeroizer-zero-reveal');
    const beam = document.getElementById('chamber-beam');
    const activateBtn = document.getElementById('btn-activate-zeroizer');

    revealCard.classList.add('hidden');
    beam.classList.add('hidden');
    activateBtn.style.display = 'inline-flex';
    container.innerHTML = '';

    GameState.objectsRemaining = 5;
    GameState.currentSceneItemType = 'machine';
    updateVisualTracker(5, '⚡', 'ITEMS');

    voiceManager.speak("The Zeroizer Machine is ready! Press the button to watch objects disappear one by one!", 'john');

    const machineItems = [
      { icon: '⭐', name: 'Star' },
      { icon: '🍎', name: 'Apple' },
      { icon: '🎈', name: 'Balloon' },
      { icon: '💎', name: 'Gem' },
      { icon: '🧸', name: 'Bear' }
    ];

    machineItems.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'play-object float-anim';
      el.id = `zeroizer-item-${idx}`;
      el.style.animationDelay = `${idx * 0.15}s`;
      el.innerHTML = `<span>${item.icon}</span><span class="object-label">${item.name}</span>`;
      container.appendChild(el);
    });

    // Handle Zeroizer Activation (Sequential Reduction 5 -> 4 -> 3 -> 2 -> 1 -> 0)
    activateBtn.onclick = () => {
      activateBtn.style.display = 'none';
      beam.classList.remove('hidden');
      soundEngine.playLaser();

      let currentStep = 5;
      voiceManager.speak("Activating Zeroizer! Watch closely!", 'star');

      const interval = setInterval(() => {
        const itemIdx = 5 - currentStep;
        const itemEl = document.getElementById(`zeroizer-item-${itemIdx}`);
        if (itemEl) {
          const rect = itemEl.getBoundingClientRect();
          particleManager.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
          soundEngine.playPop(350 + (5 - currentStep) * 80);
          itemEl.classList.add('vanish-anim');
        }

        currentStep--;
        GameState.objectsRemaining = currentStep;
        updateVisualTracker(currentStep, '⚡', 'ITEMS');

        if (currentStep > 0) {
          voiceManager.speak(`${currentStep}!`, 'star');
        } else {
          clearInterval(interval);
          beam.classList.add('hidden');

          // STOP ALL MOVEMENT & DRAMATIC BEAT
          setTimeout(() => {
            container.innerHTML = ''; // Empty chamber
            particleManager.flashScreen();
            soundEngine.playZeroChime();
            particleManager.createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 35);
            revealCard.classList.remove('hidden');
            voiceManager.speak("ZERO! The chamber has nothing left! We discovered ZERO!", 'star');
          }, 800);
        }
      }, 1000);
    };
  }

  /* ============================================================
     SCENE 8: BIG FINAL WOW & CELEBRATION LOGIC
     ============================================================ */
  function initFinaleScene() {
    UI.tracker.classList.add('hidden');
    particleManager.flashScreen();
    soundEngine.playFanfare();
    particleManager.createConfettiShower(90);

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}

    voiceManager.speak("Hooray! ZERO DISCOVERED! Zero means nothing is left! You are an amazing Space Explorer!", 'star');

    // Continuous sparkles
    const sparkleTimer = setInterval(() => {
      if (GameState.currentSceneId !== 'finale') {
        clearInterval(sparkleTimer);
        return;
      }
      particleManager.createSparkleBurst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.7,
        6
      );
    }, 700);
  }

  /* ============================================================
     6. EVENT LISTENERS & SETUP
     ============================================================ */
  function setupEventListeners() {
    // Top Controls
    const btnRepeatVoice = document.getElementById('btn-repeat-voice');
    if (btnRepeatVoice) {
      btnRepeatVoice.addEventListener('click', () => {
        soundEngine.playPop(600);
        voiceManager.repeatLast();
      });
    }

    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    if (btnSoundToggle) {
      btnSoundToggle.addEventListener('click', () => {
        const isEnabled = soundEngine.toggleSound();
        btnSoundToggle.textContent = isEnabled ? '🎵' : '🔇';
        btnSoundToggle.title = isEnabled ? 'Sound On' : 'Sound Muted';
      });
    }

    // Modal Mission Map
    const modal = document.getElementById('scene-selector-modal');
    const btnSceneMenu = document.getElementById('btn-scene-menu');
    const btnCloseModal = document.getElementById('btn-close-modal');

    if (btnSceneMenu && modal) {
      btnSceneMenu.addEventListener('click', () => {
        soundEngine.playPop(500);
        modal.classList.remove('hidden');
      });
    }
    if (btnCloseModal && modal) {
      btnCloseModal.addEventListener('click', () => {
        soundEngine.playPop(400);
        modal.classList.add('hidden');
      });
    }

    document.querySelectorAll('.scene-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetScene = btn.dataset.scene;
        if (targetScene) {
          soundEngine.playPop(550);
          modal.classList.add('hidden');
          switchScene(targetScene);
        }
      });
    });

    // Scene Navigation Buttons
    const btnStart = document.getElementById('btn-start-mission');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('planet');
      });
    }

    const btnPlanetNext = document.getElementById('btn-planet-next');
    if (btnPlanetNext) {
      btnPlanetNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('gravity');
      });
    }

    const btnGravityNext = document.getElementById('btn-gravity-next');
    if (btnGravityNext) {
      btnGravityNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('chest');
      });
    }

    const btnChestNext = document.getElementById('btn-chest-next');
    if (btnChestNext) {
      btnChestNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('snack');
      });
    }

    const btnSnackNext = document.getElementById('btn-snack-next');
    if (btnSnackNext) {
      btnSnackNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('garden');
      });
    }

    const btnGardenNext = document.getElementById('btn-garden-next');
    if (btnGardenNext) {
      btnGardenNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('zeroizer');
      });
    }

    const btnZeroizerNext = document.getElementById('btn-zeroizer-next');
    if (btnZeroizerNext) {
      btnZeroizerNext.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('finale');
      });
    }

    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        soundEngine.playPop(650);
        switchScene('intro');
      });
    }

    const btnReplayScenes = document.getElementById('btn-replay-scenes');
    if (btnReplayScenes && modal) {
      btnReplayScenes.addEventListener('click', () => {
        soundEngine.playPop(550);
        modal.classList.remove('hidden');
      });
    }

    // Audio context unlock on initial user touch/click anywhere
    const unlockAudio = () => {
      soundEngine.init();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
  }

  // Application Entry Point
  window.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    setupEventListeners();
    switchScene('intro');
  });

})();
