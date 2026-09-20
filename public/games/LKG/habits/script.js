/**
 * CHOTAPLAY: JOHN'S GOOD HABITS HERO ADVENTURE
 * Educational Game for Ages 3-6
 * Vanilla JavaScript ES6+
 */

(function() {
  'use strict';

  // ================= GAME STATE =================
  const gameState = {
    currentHabit: 0, // 0: intro, 1..8: habits, 9: celebration
    completedHabits: new Set(),
    totalStars: 0,
    isMusicPlaying: false,
    speechEnabled: true,
    h1BrushProgress: 0,
    h2Step: 1,
    h3ToysCollected: 0,
    h4HealthyCount: 0,
    h5Drank: false,
    h7BlocksCollected: 0,
    h8TrashCollected: 0,
  };

  // ================= PROCEDURAL WEB AUDIO SYNTHESIZER =================
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const Sound = {
    tap() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch (e) {}
    },

    sparkle() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
        });
      } catch (e) {}
    },

    water() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 3;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (e) {}
    },

    bubble() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 400, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch (e) {}
    },

    brush() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } catch (e) {}
    },

    nom() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(480, ctx.currentTime + 0.08);
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } catch (e) {}
    },

    gulp() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } catch (e) {}
    },

    fanfare() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const chords = [
          { f: 523.25, t: 0 },
          { f: 659.25, t: 0.12 },
          { f: 783.99, t: 0.24 },
          { f: 1046.50, t: 0.4 },
        ];
        chords.forEach(c => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(c.f, ctx.currentTime + c.t);
          gain.gain.setValueAtTime(0, ctx.currentTime + c.t);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + c.t + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.t + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + c.t);
          osc.stop(ctx.currentTime + c.t + 0.55);
        });
      } catch (e) {}
    },

    pop() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    }
  };

  // Background Melody Engine (Procedural Gentle Lullaby/Marimba)
  let bgmInterval = null;
  function startBGM() {
    if (bgmInterval) return;
    const melody = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392.00];
    let noteIndex = 0;
    bgmInterval = setInterval(() => {
      if (!gameState.isMusicPlaying) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[noteIndex], ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
        noteIndex = (noteIndex + 1) % melody.length;
      } catch (e) {}
    }, 450);
  }

  function stopBGM() {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  // ================= VOICE & SPEECH SYNTHESIS =================
  let currentSpeechText = "Good morning, John!";

  function speak(text, callback) {
    currentSpeechText = text;
    const bubbleText = document.getElementById('speech-text');
    if (bubbleText) {
      bubbleText.textContent = text;
    }

    if (!gameState.speechEnabled || !('speechSynthesis' in window)) {
      if (callback) setTimeout(callback, 1200);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.25;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferred = voices.find(v => (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Female')) && v.lang.startsWith('en'));
        if (preferred) utterance.voice = preferred;
      }

      utterance.onend = function() {
        if (callback) callback();
      };
      utterance.onerror = function() {
        if (callback) callback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      if (callback) callback();
    }
  }

  // ================= JOHN CHARACTER SVG GENERATOR =================
  function getJohnSVG(variant = 'default') {
    let mouthPath = 'M 48 58 Q 55 64 62 58'; // smile
    let eyes = `
      <circle cx="43" cy="46" r="4.5" fill="#3D2314" />
      <circle cx="41.5" cy="44.5" r="1.5" fill="#FFFFFF" />
      <circle cx="67" cy="46" r="4.5" fill="#3D2314" />
      <circle cx="65.5" cy="44.5" r="1.5" fill="#FFFFFF" />
    `;
    let armLeft = '<path d="M 28 85 Q 20 100 24 115" stroke="#F6C8A4" stroke-width="12" stroke-linecap="round" fill="none" />';
    let armRight = '<path d="M 82 85 Q 90 100 86 115" stroke="#F6C8A4" stroke-width="12" stroke-linecap="round" fill="none" />';
    let extraAccessories = '';

    if (variant === 'sleepy') {
      eyes = `
        <path d="M 38 46 Q 43 42 48 46" stroke="#3D2314" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 62 46 Q 67 42 72 46" stroke="#3D2314" stroke-width="3" stroke-linecap="round" fill="none" />
      `;
      mouthPath = 'M 50 56 Q 55 65 60 56 Z';
    } else if (variant === 'brushing') {
      mouthPath = 'M 45 56 Q 55 66 65 56';
      armRight = '<path d="M 82 85 Q 75 70 58 60" stroke="#F6C8A4" stroke-width="12" stroke-linecap="round" fill="none" />';
      extraAccessories += `
        <path d="M 58 60 L 48 56" stroke="#00E5FF" stroke-width="6" stroke-linecap="round" />
        <circle cx="48" cy="56" r="5" fill="#FFFFFF" opacity="0.9" />
      `;
    } else if (variant === 'cleanSmile') {
      mouthPath = 'M 44 55 Q 55 68 66 55 Z';
      extraAccessories += `
        <text x="64" y="52" font-size="14">✨</text>
      `;
    } else if (variant === 'eating') {
      mouthPath = 'M 48 55 Q 55 62 62 55';
      armRight = '<path d="M 82 85 Q 85 70 65 62" stroke="#F6C8A4" stroke-width="12" stroke-linecap="round" fill="none" />';
      extraAccessories += '<text x="60" y="62" font-size="16">🍎</text>';
    } else if (variant === 'thirsty') {
      mouthPath = 'M 48 60 Q 55 54 62 60';
    } else if (variant === 'superhero') {
      armRight = '<path d="M 82 85 Q 100 65 105 45" stroke="#F6C8A4" stroke-width="12" stroke-linecap="round" fill="none" />';
      extraAccessories += `
        <path d="M 30 80 Q 5 110 10 160 Q 55 145 75 140 Q 80 110 80 80 Z" fill="#E53935" opacity="0.9" />
        <path d="M 55 92 L 58 98 L 65 99 L 60 104 L 62 110 L 55 106 L 48 110 L 50 104 L 45 99 L 52 98 Z" fill="#FFD54F" stroke="#FFA000" stroke-width="1" />
      `;
    }

    return `
      <svg viewBox="0 0 120 170" class="john-svg-render" xmlns="http://www.w3.org/2000/svg">
        ${variant === 'superhero' ? extraAccessories : ''}
        <rect x="42" y="125" width="10" height="28" fill="#F6C8A4" rx="4" />
        <rect x="58" y="125" width="10" height="28" fill="#F6C8A4" rx="4" />
        <rect x="41" y="142" width="12" height="7" fill="#E1F5FE" rx="2" />
        <rect x="57" y="142" width="12" height="7" fill="#E1F5FE" rx="2" />
        <ellipse cx="45" cy="154" rx="11" ry="6" fill="#0288D1" />
        <ellipse cx="65" cy="154" rx="11" ry="6" fill="#0288D1" />
        <ellipse cx="44" cy="152" rx="9" ry="3" fill="#FFFFFF" />
        <ellipse cx="64" cy="152" rx="9" ry="3" fill="#FFFFFF" />
        <path d="M 38 112 L 72 112 L 74 130 L 58 130 L 55 120 L 52 130 L 36 130 Z" fill="#C89666" stroke="#A97142" stroke-width="2" />
        <rect x="40" y="118" width="8" height="7" fill="#B07D4F" rx="2" />
        <rect x="62" y="118" width="8" height="7" fill="#B07D4F" rx="2" />
        ${armLeft}
        ${armRight}
        <path d="M 32 78 L 78 78 L 74 114 L 36 114 Z" fill="#03A9F4" stroke="#0288D1" stroke-width="2" />
        <path d="M 55 86 Q 60 92 57 104 L 53 104 Q 50 92 55 86 Z" fill="#FFFFFF" />
        <circle cx="55" cy="94" r="2.5" fill="#FF5722" />
        <polygon points="51,104 55,109 59,104" fill="#FFC107" />
        <rect x="50" y="68" width="10" height="12" fill="#F6C8A4" rx="3" />
        <circle cx="55" cy="48" r="24" fill="#FCD7B8" />
        <ellipse cx="38" cy="54" rx="4" ry="2.5" fill="#FF8A80" opacity="0.6" />
        <ellipse cx="72" cy="54" rx="4" ry="2.5" fill="#FF8A80" opacity="0.6" />
        <ellipse cx="55" cy="50" rx="2.5" ry="1.8" fill="#F6A87C" />
        ${eyes}
        <path d="M 37 38 Q 43 35 48 38" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 62 38 Q 67 35 73 38" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="${mouthPath}" stroke="#D84315" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 32 46 Q 30 25 45 22 Q 52 14 62 18 Q 72 16 78 28 Q 84 38 78 48 Q 78 30 68 28 Q 56 26 48 32 Q 38 34 32 46 Z" fill="#5D4037" />
        ${variant !== 'superhero' ? extraAccessories : ''}
      </svg>
    `;
  }

  function renderAllJohnAvatars() {
    const avatarMap = [
      { id: 'john-intro', variant: 'default' },
      { id: 'john-h1', variant: 'sleepy' },
      { id: 'john-h3', variant: 'default' },
      { id: 'john-h4', variant: 'eating' },
      { id: 'john-h5', variant: 'thirsty' },
      { id: 'john-h6', variant: 'default' },
      { id: 'john-h7', variant: 'default' },
      { id: 'john-h8', variant: 'default' },
      { id: 'john-hero-avatar', variant: 'superhero' },
    ];

    avatarMap.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        el.innerHTML = getJohnSVG(item.variant);
      }
    });
  }

  // ================= SCENE SWITCHING & NAVIGATION =================
  const sceneIds = [
    'scene-intro',
    'scene-habit-1',
    'scene-habit-2',
    'scene-habit-3',
    'scene-habit-4',
    'scene-habit-5',
    'scene-habit-6',
    'scene-habit-7',
    'scene-habit-8',
    'scene-celebration'
  ];

  function showScene(sceneIndex) {
    gameState.currentHabit = sceneIndex;
    Sound.tap();

    sceneIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        if (idx === sceneIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    const stepBtns = document.querySelectorAll('.habit-step');
    stepBtns.forEach((btn, idx) => {
      btn.classList.remove('active');
      if (idx === sceneIndex) {
        btn.classList.add('active');
      }
      if (gameState.completedHabits.has(idx)) {
        btn.classList.add('completed');
        btn.classList.remove('locked');
      } else if (idx <= Math.max(...gameState.completedHabits, 0) + 1) {
        btn.classList.remove('locked');
      }
    });

    setupScene(sceneIndex);
  }

  function setupScene(index) {
    switch (index) {
      case 0:
        speak("Good morning, John! Let's practice our good habits!");
        break;
      case 1:
        gameState.h1BrushProgress = 0;
        updateBrushMeter(0);
        speak("John, what should we do first? Let's brush our teeth!");
        break;
      case 2:
        gameState.h2Step = 1;
        updateHandwashUI();
        speak("Time to wash our hands! Turn on the water!");
        break;
      case 3:
        gameState.h3ToysCollected = 0;
        resetToysScene();
        speak("Oh! Toys are everywhere! Let's clean up and put them in the box!");
        break;
      case 4:
        gameState.h4HealthyCount = 0;
        resetFoodScene();
        speak("Which foods help John grow strong? Put healthy fruits and veggies on the plate!");
        break;
      case 5:
        gameState.h5Drank = false;
        resetWaterScene();
        speak("John is thirsty after playing! Tap the water bottle to drink water!");
        break;
      case 6:
        resetSocialScene();
        speak("John wants to share the robot toy. What kind words should John say?");
        break;
      case 7:
        gameState.h7BlocksCollected = 0;
        resetHelpScene();
        speak("Leo dropped his blocks! Can you help pick them up?");
        break;
      case 8:
        gameState.h8TrashCollected = 0;
        resetBinScene();
        speak("Where does the trash go? Put the litter in the green bin to keep the park clean!");
        break;
      case 9:
        celebrateGameComplete();
        break;
    }
  }

  // ================= HABIT COMPLETION & REWARDS =================
  function completeHabit(habitNumber, successTitle, successMessage) {
    if (gameState.completedHabits.has(habitNumber)) {
      goToNextHabit();
      return;
    }

    gameState.completedHabits.add(habitNumber);
    gameState.totalStars = gameState.completedHabits.size;

    const starCountEl = document.getElementById('star-count');
    if (starCountEl) starCountEl.textContent = gameState.totalStars;

    Sound.sparkle();
    setTimeout(() => Sound.fanfare(), 300);

    if (habitNumber >= 1 && habitNumber <= 8) {
      const modal = document.getElementById('habit-success-modal');
      const titleEl = document.getElementById('success-title');
      const msgEl = document.getElementById('success-message');

      if (titleEl) titleEl.textContent = successTitle || "Great Job! ⭐";
      if (msgEl) msgEl.textContent = successMessage || "You earned a Good Habit Star!";
      if (modal) modal.style.display = 'flex';

      speak(`${successTitle || "Great Job!"} ${successMessage || "You earned a Good Habit Star!"}`);
    } else {
      goToNextHabit();
    }
  }

  function goToNextHabit() {
    const next = gameState.currentHabit + 1;
    if (next <= 9) {
      showScene(next);
    }
  }

  // ================= HABIT 1: BRUSH TEETH LOGIC =================
  function initHabit1() {
    const brushTool = document.getElementById('tool-toothbrush');
    const pasteTool = document.getElementById('tool-toothpaste');
    const teethContainer = document.getElementById('teeth-container');
    const brushMeterWrap = document.getElementById('brush-meter-wrap');

    if (pasteTool) {
      pasteTool.addEventListener('click', () => {
        Sound.tap();
        pasteTool.classList.remove('active-wiggle');
        brushTool.classList.add('active-wiggle');
        pasteTool.innerHTML = '🧴 <span style="color:#4CAF50;font-weight:800;">Ready!</span>';
        speak("Now tap the toothbrush and brush back and forth!");
      });
    }

    if (brushTool) {
      brushTool.addEventListener('click', () => {
        Sound.tap();
        brushTool.classList.remove('active-wiggle');
        brushMeterWrap.style.display = 'flex';
        teethContainer.style.cursor = 'grab';
        speak("Brush left and right across John's teeth!");
      });
    }

    let isScrubbing = false;
    let lastX = 0;

    function handleBrushMove(clientX, clientY) {
      if (gameState.h1BrushProgress >= 100) return;
      const rect = teethContainer.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const delta = Math.abs(clientX - lastX);
        if (delta > 8) {
          gameState.h1BrushProgress += 3.5;
          lastX = clientX;
          Sound.brush();
          spawnBubbleInTeeth(clientX - rect.left, clientY - rect.top);
          updateBrushMeter(gameState.h1BrushProgress);

          if (gameState.h1BrushProgress >= 100) {
            finishHabit1();
          }
        }
      }
    }

    teethContainer.addEventListener('pointerdown', (e) => {
      isScrubbing = true;
      lastX = e.clientX;
      handleBrushMove(e.clientX, e.clientY);
    });

    window.addEventListener('pointermove', (e) => {
      if (isScrubbing) {
        handleBrushMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('pointerup', () => {
      isScrubbing = false;
    });

    teethContainer.addEventListener('click', (e) => {
      if (gameState.h1BrushProgress < 100) {
        gameState.h1BrushProgress += 12;
        const rect = teethContainer.getBoundingClientRect();
        Sound.brush();
        spawnBubbleInTeeth(e.clientX - rect.left || 100, e.clientY - rect.top || 80);
        updateBrushMeter(gameState.h1BrushProgress);
        if (gameState.h1BrushProgress >= 100) {
          finishHabit1();
        }
      }
    });
  }

  function spawnBubbleInTeeth(x, y) {
    const foam = document.getElementById('teeth-foam');
    if (!foam) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.floor(Math.random() * 20 + 12);
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = (x - size / 2) + 'px';
    bubble.style.top = (y - size / 2) + 'px';
    foam.appendChild(bubble);
    setTimeout(() => bubble.remove(), 800);
  }

  function updateBrushMeter(val) {
    const fill = document.getElementById('brush-progress-fill');
    if (fill) {
      fill.style.width = Math.min(val, 100) + '%';
    }
  }

  function finishHabit1() {
    const dirt = document.getElementById('teeth-dirt');
    if (dirt) dirt.style.opacity = '0';
    document.querySelectorAll('.tooth').forEach(t => t.classList.add('sparkling'));

    const johnEl = document.getElementById('john-h1');
    if (johnEl) johnEl.innerHTML = getJohnSVG('cleanSmile');

    Sound.sparkle();
    completeHabit(1, "Clean & Shiny Teeth! 🪥", "Brushing teeth keeps them strong and healthy!");
  }

  // ================= HABIT 2: WASH HANDS LOGIC =================
  function initHabit2() {
    const btnWater = document.getElementById('btn-wash-water');
    const btnSoap = document.getElementById('btn-wash-soap');
    const btnScrub = document.getElementById('btn-wash-scrub');
    const btnRinse = document.getElementById('btn-wash-rinse');
    const waterStream = document.getElementById('water-stream');
    const faucet = document.getElementById('faucet-handle');

    function triggerStep(step) {
      if (step === 1 && gameState.h2Step === 1) {
        Sound.water();
        waterStream.classList.add('flowing');
        gameState.h2Step = 2;
        updateHandwashUI();
        speak("Step 2: Add fluffy soap!");
      } else if (step === 2 && gameState.h2Step === 2) {
        Sound.bubble();
        spawnHandBubbles();
        gameState.h2Step = 3;
        updateHandwashUI();
        speak("Step 3: Rub and scrub hands together!");
      } else if (step === 3 && gameState.h2Step === 3) {
        Sound.tap();
        const hands = document.querySelectorAll('.hand');
        hands.forEach(h => h.classList.add('scrubbing'));
        const germsL = document.getElementById('germs-left');
        const germsR = document.getElementById('germs-right');
        if (germsL) germsL.style.opacity = '0';
        if (germsR) germsR.style.opacity = '0';

        setTimeout(() => {
          hands.forEach(h => h.classList.remove('scrubbing'));
          gameState.h2Step = 4;
          updateHandwashUI();
          speak("Step 4: Rinse clean with fresh water!");
        }, 1200);
      } else if (step === 4 && gameState.h2Step === 4) {
        Sound.sparkle();
        clearHandBubbles();
        waterStream.classList.remove('flowing');
        gameState.h2Step = 5;
        updateHandwashUI();
        completeHabit(2, "Super Clean Hands! 🧼", "Washing hands washes all the germs away!");
      }
    }

    if (btnWater) btnWater.addEventListener('click', () => triggerStep(1));
    if (faucet) faucet.addEventListener('click', () => triggerStep(1));
    if (btnSoap) btnSoap.addEventListener('click', () => triggerStep(2));
    if (btnScrub) btnScrub.addEventListener('click', () => triggerStep(3));
    if (btnRinse) btnRinse.addEventListener('click', () => triggerStep(4));
  }

  function spawnHandBubbles() {
    const bLeft = document.getElementById('bubbles-left');
    const bRight = document.getElementById('bubbles-right');
    [bLeft, bRight].forEach(bWrap => {
      if (bWrap) {
        bWrap.innerHTML = '<span style="font-size:2rem;position:absolute;top:20px;left:10px;">🫧</span><span style="font-size:2rem;position:absolute;top:40px;left:40px;">🫧</span>';
      }
    });
  }

  function clearHandBubbles() {
    const bLeft = document.getElementById('bubbles-left');
    const bRight = document.getElementById('bubbles-right');
    if (bLeft) bLeft.innerHTML = '<span style="font-size:2rem;position:absolute;top:10px;left:20px;">✨</span>';
    if (bRight) bRight.innerHTML = '<span style="font-size:2rem;position:absolute;top:10px;left:20px;">✨</span>';
  }

  function updateHandwashUI() {
    const step = gameState.h2Step;
    const btns = [
      { id: 'btn-wash-water', s: 1 },
      { id: 'btn-wash-soap', s: 2 },
      { id: 'btn-wash-scrub', s: 3 },
      { id: 'btn-wash-rinse', s: 4 }
    ];

    btns.forEach(b => {
      const el = document.getElementById(b.id);
      if (!el) return;
      el.classList.remove('active-step', 'disabled', 'step-done');
      if (b.s === step) {
        el.classList.add('active-step');
      } else if (b.s < step) {
        el.classList.add('step-done');
      } else {
        el.classList.add('disabled');
      }
    });
  }

  // ================= HABIT 3: CLEAN TOYS LOGIC =================
  function initHabit3() {
    const toys = document.querySelectorAll('.toy-item');
    const dropzone = document.getElementById('toybox-zone');
    const collectedHolder = document.getElementById('collected-toys');

    toys.forEach(toy => {
      toy.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', toy.id);
        Sound.tap();
      });

      toy.addEventListener('click', () => {
        packToyIntoBox(toy);
      });
    });

    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const toyId = e.dataTransfer.getData('text/plain');
        const toy = document.getElementById(toyId);
        if (toy) {
          packToyIntoBox(toy);
        }
      });
    }

    function packToyIntoBox(toyEl) {
      if (toyEl.style.display === 'none') return;
      toyEl.style.display = 'none';
      Sound.tap();

      const emoji = toyEl.querySelector('.toy-emoji').textContent;
      const icon = document.createElement('span');
      icon.className = 'collected-toy-icon';
      icon.textContent = emoji;
      collectedHolder.appendChild(icon);

      gameState.h3ToysCollected++;
      if (gameState.h3ToysCollected >= 4) {
        Sound.sparkle();
        const hint = document.querySelector('.toybox-hint');
        if (hint) hint.textContent = "All Clean & Tidy! ✨";
        completeHabit(3, "Room Is All Clean! 🧸", "Putting toys away keeps our room safe and neat!");
      }
    }
  }

  function resetToysScene() {
    const toys = document.querySelectorAll('.toy-item');
    toys.forEach(t => t.style.display = 'flex');
    const collectedHolder = document.getElementById('collected-toys');
    if (collectedHolder) collectedHolder.innerHTML = '';
    const hint = document.querySelector('.toybox-hint');
    if (hint) hint.textContent = "Drop toys here! ⭐";
  }

  // ================= HABIT 4: EAT HEALTHY FOOD LOGIC =================
  function initHabit4() {
    const foods = document.querySelectorAll('.food-item');
    const plate = document.getElementById('healthy-plate');
    const plateSlots = document.getElementById('plate-slots');

    foods.forEach(food => {
      food.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', food.id);
        Sound.tap();
      });

      food.addEventListener('click', () => {
        handleFoodSelect(food);
      });
    });

    if (plate) {
      plate.addEventListener('dragover', (e) => {
        e.preventDefault();
        plate.classList.add('drag-over');
      });

      plate.addEventListener('dragleave', () => {
        plate.classList.remove('drag-over');
      });

      plate.addEventListener('drop', (e) => {
        e.preventDefault();
        plate.classList.remove('drag-over');
        const foodId = e.dataTransfer.getData('text/plain');
        const food = document.getElementById(foodId);
        if (food) {
          handleFoodSelect(food);
        }
      });
    }

    function handleFoodSelect(foodEl) {
      const type = foodEl.getAttribute('data-type');
      const name = foodEl.getAttribute('data-name');

      if (type === 'treat') {
        Sound.tap();
        speak(`Yummy ${name}, but let's give John healthy food first to grow strong!`);
        foodEl.style.transform = 'scale(0.9)';
        setTimeout(() => foodEl.style.transform = '', 300);
        return;
      }

      if (foodEl.style.display === 'none') return;
      foodEl.style.display = 'none';
      Sound.nom();

      const emoji = foodEl.querySelector('.food-emoji').textContent;
      const icon = document.createElement('span');
      icon.className = 'plate-food-icon';
      icon.textContent = emoji;
      plateSlots.appendChild(icon);

      gameState.h4HealthyCount++;
      if (gameState.h4HealthyCount >= 3) {
        Sound.sparkle();
        const john = document.getElementById('john-h4');
        if (john) john.innerHTML = getJohnSVG('eating');
        completeHabit(4, "Yummy & Healthy! 🍎", "Fruits and veggies give John super strength!");
      }
    }
  }

  function resetFoodScene() {
    const foods = document.querySelectorAll('.food-item');
    foods.forEach(f => f.style.display = 'flex');
    const plateSlots = document.getElementById('plate-slots');
    if (plateSlots) plateSlots.innerHTML = '';
  }

  // ================= HABIT 5: DRINK WATER LOGIC =================
  function initHabit5() {
    const btnWater = document.getElementById('btn-drink-water');
    const energyFill = document.getElementById('energy-fill');

    if (btnWater) {
      btnWater.addEventListener('click', () => {
        if (gameState.h5Drank) return;
        gameState.h5Drank = true;
        Sound.gulp();

        if (energyFill) energyFill.style.width = '100%';

        const john = document.getElementById('john-h5');
        if (john) {
          john.innerHTML = getJohnSVG('cleanSmile');
          john.classList.remove('thirsty');
          john.classList.add('hero');
        }

        setTimeout(() => {
          Sound.sparkle();
          completeHabit(5, "Refreshing Water! 💧", "Water keeps our bodies energized and happy!");
        }, 800);
      });
    }
  }

  function resetWaterScene() {
    const energyFill = document.getElementById('energy-fill');
    if (energyFill) energyFill.style.width = '20%';
    const john = document.getElementById('john-h5');
    if (john) {
      john.innerHTML = getJohnSVG('thirsty');
      john.classList.add('thirsty');
      john.classList.remove('hero');
    }
  }

  // ================= HABIT 6: PLEASE & THANK YOU LOGIC =================
  function initHabit6() {
    const btnPlease = document.getElementById('btn-say-please');
    const btnGrab = document.getElementById('btn-say-grab');
    const johnSpeech = document.getElementById('john-speech-bubble');
    const mayaSpeech = document.getElementById('maya-speech-bubble');
    const friendAvatar = document.getElementById('friend-maya');

    if (btnGrab) {
      btnGrab.addEventListener('click', () => {
        Sound.tap();
        speak("Let's use kind words! Friends love sharing when we ask politely.");
        if (johnSpeech) johnSpeech.textContent = "Oops! Let's ask nicely!";
      });
    }

    if (btnPlease) {
      btnPlease.addEventListener('click', () => {
        Sound.sparkle();
        if (johnSpeech) johnSpeech.textContent = '"Please, may I share the toy?" 🌸';
        if (mayaSpeech) mayaSpeech.textContent = '"Sure! Here you go!" 🤖';
        if (friendAvatar) {
          friendAvatar.innerHTML = '👧🏻 <div style="font-size:2.5rem;">❤️</div>';
        }
        const john = document.getElementById('john-h6');
        if (john) john.innerHTML = getJohnSVG('cleanSmile');

        setTimeout(() => {
          if (johnSpeech) johnSpeech.textContent = '"Thank you, Maya!" ⭐';
          completeHabit(6, "Kind Words Hero! ❤️", "Saying Please and Thank You brings happy smiles!");
        }, 1200);
      });
    }
  }

  function resetSocialScene() {
    const johnSpeech = document.getElementById('john-speech-bubble');
    const mayaSpeech = document.getElementById('maya-speech-bubble');
    const friendAvatar = document.getElementById('friend-maya');
    if (johnSpeech) johnSpeech.textContent = '"Can I play?"';
    if (mayaSpeech) mayaSpeech.textContent = '"I love sharing!"';
    if (friendAvatar) {
      friendAvatar.innerHTML = '<div class="friend-holding-toy">🤖</div>';
    }
    const john = document.getElementById('john-h6');
    if (john) john.innerHTML = getJohnSVG('default');
  }

  // ================= HABIT 7: HELP OTHERS LOGIC =================
  function initHabit7() {
    const blocks = document.querySelectorAll('.block-item');
    const placedBlocks = document.getElementById('placed-blocks');
    const leoDialogue = document.getElementById('leo-dialogue');
    const leoAvatar = document.getElementById('friend-leo');

    blocks.forEach(block => {
      block.addEventListener('click', () => {
        if (block.style.display === 'none') return;
        block.style.display = 'none';
        Sound.tap();

        const tag = document.createElement('span');
        tag.textContent = block.textContent.substring(0, 2);
        tag.style.fontSize = '2rem';
        placedBlocks.appendChild(tag);

        gameState.h7BlocksCollected++;
        if (gameState.h7BlocksCollected >= 4) {
          Sound.sparkle();
          if (leoDialogue) leoDialogue.textContent = '"Thank you so much, John!" 🌟';
          if (leoAvatar) leoAvatar.classList.remove('crying');

          const john = document.getElementById('john-h7');
          if (john) john.innerHTML = getJohnSVG('cleanSmile');

          completeHabit(7, "Super Helper! 🤝", "Helping friends and family makes everyone happy!");
        }
      });
    });
  }

  function resetHelpScene() {
    const blocks = document.querySelectorAll('.block-item');
    blocks.forEach(b => b.style.display = 'block');
    const placedBlocks = document.getElementById('placed-blocks');
    if (placedBlocks) placedBlocks.innerHTML = '';
    const leoDialogue = document.getElementById('leo-dialogue');
    if (leoDialogue) leoDialogue.textContent = '"Oh no, my blocks fell!"';
  }

  // ================= HABIT 8: USE THE BIN LOGIC =================
  function initHabit8() {
    const litters = document.querySelectorAll('.litter-item');
    const binTarget = document.getElementById('trash-bin-target');
    const binLid = document.getElementById('bin-lid');

    litters.forEach(litter => {
      litter.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', litter.id);
        Sound.tap();
      });

      litter.addEventListener('click', () => {
        depositLitter(litter);
      });
    });

    if (binTarget) {
      binTarget.addEventListener('dragover', (e) => {
        e.preventDefault();
        binTarget.classList.add('drag-over');
        if (binLid) binLid.classList.add('open');
      });

      binTarget.addEventListener('dragleave', () => {
        binTarget.classList.remove('drag-over');
        if (binLid) binLid.classList.remove('open');
      });

      binTarget.addEventListener('drop', (e) => {
        e.preventDefault();
        binTarget.classList.remove('drag-over');
        if (binLid) binLid.classList.remove('open');
        const litterId = e.dataTransfer.getData('text/plain');
        const litter = document.getElementById(litterId);
        if (litter) depositLitter(litter);
      });
    }

    function depositLitter(litterEl) {
      if (litterEl.style.display === 'none') return;
      litterEl.style.display = 'none';
      Sound.tap();
      if (binLid) {
        binLid.classList.add('open');
        setTimeout(() => binLid.classList.remove('open'), 400);
      }

      gameState.h8TrashCollected++;
      if (gameState.h8TrashCollected >= 3) {
        Sound.sparkle();
        completeHabit(8, "Green Earth Champion! 🗑️", "Throwing trash in the bin keeps our world beautiful!");
      }
    }
  }

  function resetBinScene() {
    const litters = document.querySelectorAll('.litter-item');
    litters.forEach(l => l.style.display = 'flex');
  }

  // ================= FINAL CELEBRATION WOW MOMENT =================
  function celebrateGameComplete() {
    Sound.fanfare();
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}
    speak("Congratulations, John! You are a Good Habits Hero!");

    // Spawn Confetti
    const confettiHolder = document.getElementById('confetti-holder');
    if (confettiHolder) {
      confettiHolder.innerHTML = '';
      const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
      for (let i = 0; i < 70; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = -20 + 'px';
        piece.style.animationDelay = (Math.random() * 2) + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        confettiHolder.appendChild(piece);
      }
    }

    // Spawn interactive floating balloons for kids to pop
    const balloonsHolder = document.getElementById('balloons-holder');
    if (balloonsHolder) {
      balloonsHolder.innerHTML = '';
      const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈'];
      balloonEmojis.forEach((b, idx) => {
        const bEl = document.createElement('div');
        bEl.className = 'balloon-item';
        bEl.textContent = b;
        bEl.style.left = (15 + idx * 18) + 'vw';
        bEl.style.top = (40 + (idx % 2) * 20) + 'vh';
        bEl.addEventListener('click', () => {
          Sound.pop();
          bEl.textContent = '💥';
          setTimeout(() => bEl.remove(), 250);
        });
        balloonsHolder.appendChild(bEl);
      });
    }
  }

  // ================= EVENT LISTENERS & INITIALIZATION =================
  function initGame() {
    renderAllJohnAvatars();

    // Start Button
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        showScene(1);
      });
    }

    // Habit Journey top step navigation
    const stepBtns = document.querySelectorAll('.habit-step');
    stepBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('locked')) return;
        showScene(idx);
      });
    });

    // Next habit modal button
    const btnNext = document.getElementById('btn-next-habit');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        Sound.tap();
        const modal = document.getElementById('habit-success-modal');
        if (modal) modal.style.display = 'none';
        goToNextHabit();
      });
    }

    // Play again button
    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        gameState.completedHabits.clear();
        gameState.totalStars = 0;
        const starCountEl = document.getElementById('star-count');
        if (starCountEl) starCountEl.textContent = '0';
        showScene(0);
      });
    }

    // Voice repeat button
    const btnSpeak = document.getElementById('btn-speak');
    if (btnSpeak) {
      btnSpeak.addEventListener('click', () => {
        Sound.tap();
        speak(currentSpeechText);
      });
    }

    // Little Star Companion click to talk
    const starCompanion = document.getElementById('little-star');
    if (starCompanion) {
      starCompanion.addEventListener('click', () => {
        Sound.sparkle();
        speak(currentSpeechText);
      });
    }

    // Music toggle button
    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) {
      btnMusic.addEventListener('click', () => {
        gameState.isMusicPlaying = !gameState.isMusicPlaying;
        btnMusic.classList.toggle('active-music', gameState.isMusicPlaying);
        if (gameState.isMusicPlaying) {
          startBGM();
        } else {
          stopBGM();
        }
      });
    }

    // Initialize all habits
    initHabit1();
    initHabit2();
    initHabit3();
    initHabit4();
    initHabit5();
    initHabit6();
    initHabit7();
    initHabit8();

    // Initial scene setup
    showScene(0);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }

})();
