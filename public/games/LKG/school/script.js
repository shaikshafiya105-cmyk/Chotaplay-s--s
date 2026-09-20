/**
 * ============================================================
 * CHOTAPLAY - JOHN'S SCHOOL DAY ADVENTURE
 * Core Game Engine, Web Audio API Synthesizer,
 * Web Speech API Voice Narrator & Interactive Game Flow
 * ============================================================
 */

(function () {
  'use strict';

  // ============================================================
  // 1. SOUND ENGINE (Pure Web Audio API Synthesizer)
  // Guarantees 100% offline audio with zero network dependencies
  // ============================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.initAudioContext();
    }

    initAudioContext() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !this.ctx) {
        try {
          this.ctx = new AudioCtx();
        } catch (e) {
          console.warn('AudioContext init error:', e);
        }
      }
    }

    ensureContext() {
      if (!this.ctx) {
        this.initAudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }

    // Bus Horn: Friendly 2-tone "Beep! Beep!"
    playBusHorn() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.22].forEach((offset) => {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(370, now + offset);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(460, now + offset);

        gain.gain.setValueAtTime(0.18, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now + offset);
        osc2.start(now + offset);
        osc1.stop(now + offset + 0.19);
        osc2.stop(now + offset + 0.19);
      });
    }

    // Bubbly Upbeat Pop
    playPop(freq = 520) {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    }

    // Pentatonic Magic Chime / Sparkle
    playSparkle() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.36);
      });
    }

    // School Bell "Ding-Dong / Ding-Ding"
    playSchoolBell() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chimes = [784, 988, 784, 988]; // G5, B5, G5, B5

      chimes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.22);

        gain.gain.setValueAtTime(0.3, now + idx * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.22 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.22);
        osc.stop(now + idx * 0.22 + 0.46);
      });
    }

    // Crunchy Bite / Munch
    playBite() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    }

    // Juice Sip / Slurp
    playSip() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    }

    // Slide Glissando "Wheeeee!"
    playSlide() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.9);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.95);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    }

    // Ball Kick & Bounce
    playKick() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }

    // High Five Clap & Star Sound
    playHighFive() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Clap burst
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);

      // Star chime
      setTimeout(() => this.playSparkle(), 60);
    }

    // Puzzle Snap / Lock Click
    playSnap() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.04);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    }

    // Victory Fanfare Chord & Clapping
    playFanfare() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
      const now = this.ctx.currentTime;

      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);
      });
    }
  }

  // ============================================================
  // 2. VOICE NARRATOR (Web Speech Synthesis + Visual Bubbles)
  // ============================================================
  class VoiceNarrator {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.enabled = true;
      this.currentUtterance = null;
      this.lastText = '';
      this.lastSpeaker = 'star';

      this.bubbleElem = document.getElementById('dialogue-box');
      this.avatarElem = document.getElementById('dialogue-avatar');
      this.speakerElem = document.getElementById('dialogue-speaker');
      this.textElem = document.getElementById('dialogue-text');
      this.replayBtn = document.getElementById('dialogue-replay');

      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => {
          if (this.lastText) this.speak(this.lastText, this.lastSpeaker);
        });
      }
    }

    speak(text, speaker = 'star', callback = null) {
      this.lastText = text;
      this.lastSpeaker = speaker;

      // Update Visual Dialogue Bubble
      if (this.bubbleElem && this.speakerElem && this.textElem) {
        this.bubbleElem.classList.remove('hidden');
        this.textElem.textContent = text;

        const speakerConfigs = {
          star: { name: 'Little Star', avatar: '⭐' },
          john: { name: 'John', avatar: '👦' },
          teacher: { name: 'Teacher Sunny', avatar: '👩‍🏫' },
          maya: { name: 'Maya', avatar: '👧' },
          leo: { name: 'Leo', avatar: '👦🏻' },
          emma: { name: 'Emma', avatar: '👧🏽' },
          announcer: { name: 'School Day', avatar: '🏫' }
        };

        const config = speakerConfigs[speaker] || speakerConfigs.star;
        this.speakerElem.textContent = config.name;
        if (this.avatarElem) this.avatarElem.textContent = config.avatar;
      }

      // Voice Synthesis
      if (this.synth && this.enabled) {
        try {
          this.synth.cancel(); // Cancel any ongoing speech

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.92; // Slightly slower, friendly pace for kids
          utterance.pitch = (speaker === 'star' || speaker === 'maya' || speaker === 'emma') ? 1.3 : 1.1;

          // Attempt to find friendly English voice
          const voices = this.synth.getVoices();
          if (voices && voices.length > 0) {
            const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Google')));
            if (preferred) utterance.voice = preferred;
          }

          if (callback) {
            utterance.onend = () => callback();
            utterance.onerror = () => callback();
          }

          this.synth.speak(utterance);
          this.currentUtterance = utterance;
        } catch (e) {
          console.warn('Speech synthesis error:', e);
          if (callback) callback();
        }
      } else {
        if (callback) setTimeout(callback, 800);
      }
    }
  }

  // ============================================================
  // 3. MAIN GAME APPLICATION LOGIC
  // ============================================================
  class SchoolGameApp {
    constructor() {
      this.sound = new SoundEngine();
      this.narrator = new VoiceNarrator();

      // State
      this.currentScene = 'morning';
      this.visitedZones = new Set();
      this.starsUnlocked = 0;
      this.activeArtColor = '#FF3B30';
      this.activePicId = 'school';
      this.activeClassTab = 'letters';

      this.initDOM();
      this.bindEvents();
      this.initClassroomData();
      this.initArtData();
      this.initPuzzleData('bus');
      this.initConfetti();

      // Opening dialogue
      setTimeout(() => {
        this.narrator.speak("John! It's school time! Are you ready for school?", 'star');
      }, 500);
    }

    initDOM() {
      // Scene elements
      this.scenes = {
        morning: document.getElementById('scene-morning'),
        bus: document.getElementById('scene-bus'),
        gate: document.getElementById('scene-school-gate'),
        classroom: document.getElementById('scene-classroom'),
        art: document.getElementById('scene-art'),
        puzzle: document.getElementById('scene-puzzle'),
        playground: document.getElementById('scene-playground'),
        lunch: document.getElementById('scene-lunch'),
        friends: document.getElementById('scene-friends'),
        celebration: document.getElementById('scene-celebration')
      };

      // Header controls
      this.btnSound = document.getElementById('btn-sound');
      this.btnHome = document.getElementById('btn-home');
      this.btnBell = document.getElementById('btn-bell');
      this.starCountText = document.getElementById('star-count-text');
      this.particleLayer = document.getElementById('particle-layer');
    }

    bindEvents() {
      // Sound Mute Toggle
      if (this.btnSound) {
        this.btnSound.addEventListener('click', () => {
          const isMuted = this.sound.toggleMute();
          this.narrator.enabled = !isMuted;
          this.btnSound.querySelector('.hud-btn-icon').textContent = isMuted ? '🔇' : '🔊';
        });
      }

      // School Gate Home Button
      if (this.btnHome) {
        this.btnHome.addEventListener('click', () => {
          this.sound.playPop();
          this.goToScene('gate');
          this.narrator.speak("Welcome back to the School Gate! Where do you want to explore next?", 'star');
        });
      }

      // School Bell Button
      if (this.btnBell) {
        this.btnBell.addEventListener('click', () => {
          this.sound.playSchoolBell();
          this.spawnSparklesAtElement(this.btnBell);
          this.narrator.speak("DING DING DING! That's the school bell! School is so much fun!", 'star', () => {
            if (this.visitedZones.size >= 3) {
              this.showCelebration();
            }
          });
        });
      }

      // Scene 0: Morning Home Interactive items
      const morningSun = document.getElementById('morning-sun');
      if (morningSun) {
        morningSun.addEventListener('click', (e) => {
          this.sound.playSparkle();
          this.spawnSparkles(e.clientX, e.clientY);
          this.narrator.speak("Good morning, sunshine! It's a beautiful day for school!", 'star');
        });
      }

      ['cloud-1', 'cloud-2', 'cloud-3'].forEach(id => {
        const cloud = document.getElementById(id);
        if (cloud) {
          cloud.addEventListener('click', (e) => {
            this.sound.playPop(600);
            this.spawnSparkles(e.clientX, e.clientY);
            this.narrator.speak("Fluffy white clouds in the morning sky!", 'star');
          });
        }
      });

      const morningJohn = document.getElementById('morning-john');
      if (morningJohn) {
        morningJohn.addEventListener('click', () => {
          this.sound.playPop();
          this.narrator.speak("Yay! I can't wait to see my teacher and friends!", 'john');
        });
      }

      const morningStar = document.getElementById('morning-star');
      if (morningStar) {
        morningStar.addEventListener('click', () => {
          this.sound.playSparkle();
          this.narrator.speak("I'm Little Star! Let's go to school together!", 'star');
        });
      }

      const btnStart = document.getElementById('btn-start-adventure');
      if (btnStart) {
        btnStart.addEventListener('click', () => {
          this.sound.playBusHorn();
          this.goToScene('bus');
          this.narrator.speak("Look! Here comes the bright yellow school bus! Let's get on!", 'star');
        });
      }

      // Scene 1: School Bus Journey
      const busHorn = document.getElementById('bus-horn-tap');
      if (busHorn) {
        busHorn.addEventListener('click', (e) => {
          this.sound.playBusHorn();
          this.spawnSparkles(e.clientX, e.clientY);
          this.narrator.speak("Beep beep! All aboard the school bus!", 'john');
        });
      }

      const btnArrive = document.getElementById('btn-arrive-school');
      if (btnArrive) {
        btnArrive.addEventListener('click', () => {
          this.sound.playSchoolBell();
          this.goToScene('gate');
          this.narrator.speak("We arrived at school! Welcome to Sunny Hill School!", 'john');
        });
      }

      // Scene 2: School Gate Cards
      document.querySelectorAll('.zone-card').forEach(card => {
        card.addEventListener('click', () => {
          const zone = card.dataset.zone;
          this.sound.playPop();
          this.openZone(zone);
        });
      });

      // Classroom Tabs
      document.querySelectorAll('.class-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.class-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const targetTab = tab.dataset.tab;
          this.switchClassroomTab(targetTab);
        });
      });

      // Art Swatches & Action buttons
      document.querySelectorAll('.swatch-btn').forEach(swatch => {
        swatch.addEventListener('click', () => {
          document.querySelectorAll('.swatch-btn').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          this.activeArtColor = swatch.dataset.color;
          const preview = document.getElementById('color-preview-circle');
          const nameElem = document.getElementById('active-color-name');
          if (preview) {
            preview.style.background = this.activeArtColor === 'rainbow'
              ? 'linear-gradient(135deg, red, yellow, green, blue, purple)'
              : this.activeArtColor;
          }
          if (nameElem) {
            nameElem.textContent = swatch.title || 'Selected Color';
          }
          this.sound.playPop(700);
        });
      });

      document.querySelectorAll('.pic-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.pic-select-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activePicId = btn.dataset.pic;
          this.renderArtSvg(this.activePicId);
          this.sound.playPop();
        });
      });

      const btnArtClear = document.getElementById('btn-art-clear');
      if (btnArtClear) {
        btnArtClear.addEventListener('click', () => {
          this.sound.playPop(400);
          this.renderArtSvg(this.activePicId);
          this.narrator.speak("Clean canvas! Ready for new colors!", 'john');
        });
      }

      const btnArtRainbow = document.getElementById('btn-art-rainbow');
      if (btnArtRainbow) {
        btnArtRainbow.addEventListener('click', () => {
          this.sound.playSparkle();
          const colors = ['#FF3B30', '#FF9500', '#FFD60A', '#34C759', '#007AFF', '#AF52DE', '#FF2D55'];
          document.querySelectorAll('.art-region').forEach((region, i) => {
            region.style.fill = colors[i % colors.length];
          });
          this.narrator.speak("Rainbow Magic! It's so bright and colorful!", 'star');
        });
      }

      // Puzzle Selectors
      document.querySelectorAll('.puz-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.puz-select-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.initPuzzleData(btn.dataset.puz);
          this.sound.playPop();
        });
      });

      const btnNextPuzzle = document.getElementById('btn-next-puzzle');
      if (btnNextPuzzle) {
        btnNextPuzzle.addEventListener('click', () => {
          document.getElementById('puzzle-victory').classList.add('hidden');
          this.initPuzzleData('backpack');
          document.querySelectorAll('.puz-select-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.puz === 'backpack');
          });
        });
      }

      // Playground Stations
      this.bindPlaygroundEvents();

      // Lunch Box
      this.bindLunchEvents();

      // Friends Corner
      this.bindFriendsEvents();

      // Celebration Buttons
      const btnPlayAgain = document.getElementById('btn-play-again');
      if (btnPlayAgain) {
        btnPlayAgain.addEventListener('click', () => {
          this.resetGame();
        });
      }

      const btnExploreMore = document.getElementById('btn-explore-more');
      if (btnExploreMore) {
        btnExploreMore.addEventListener('click', () => {
          this.goToScene('gate');
          this.narrator.speak("Let's keep exploring our wonderful school!", 'star');
        });
      }

      // Interactive poppable balloons
      document.querySelectorAll('.balloon').forEach(balloon => {
        balloon.addEventListener('click', (e) => {
          this.sound.playPop(850);
          this.spawnSparkles(e.clientX, e.clientY);
          balloon.style.transform = 'scale(0)';
          setTimeout(() => {
            balloon.style.transform = '';
          }, 1500);
        });
      });
    }

    // ================= Scene Management =================
    goToScene(sceneName) {
      Object.keys(this.scenes).forEach(key => {
        if (this.scenes[key]) {
          this.scenes[key].classList.add('hidden');
          this.scenes[key].classList.remove('active');
        }
      });

      if (this.scenes[sceneName]) {
        this.scenes[sceneName].classList.remove('hidden');
        this.scenes[sceneName].classList.add('active');
        this.currentScene = sceneName;
      }

      // Show/Hide Home Button
      if (this.btnHome) {
        if (sceneName === 'morning' || sceneName === 'bus' || sceneName === 'gate') {
          this.btnHome.classList.add('hidden');
        } else {
          this.btnHome.classList.remove('hidden');
        }
      }
    }

    openZone(zoneName) {
      this.goToScene(zoneName);
      this.unlockStar(zoneName);

      const zoneGreetings = {
        classroom: "Welcome to the Classroom! Let's discover letters, numbers, and shapes!",
        art: "Welcome to the Art Corner! Choose a bright color and paint the pictures!",
        puzzle: "Welcome to Puzzle Corner! Snap the pieces together to solve the puzzle!",
        playground: "Yay! Playground time! Tap the slide, swing, ball, or seesaw to play!",
        lunch: "Time for a healthy snack! Tap the lunch box to open and eat yummy foods!",
        friends: "Meet your friendly classmates! Wave, high-five, and share with your friends!"
      };

      this.narrator.speak(zoneGreetings[zoneName] || "Let's have fun at school!", 'star');
    }

    unlockStar(zoneName) {
      if (!this.visitedZones.has(zoneName)) {
        this.visitedZones.add(zoneName);
        this.starsUnlocked = this.visitedZones.size;

        const starElem = document.querySelector(`.star-badge[data-zone="${zoneName}"]`);
        if (starElem) {
          starElem.classList.add('unlocked');
        }

        const zoneCard = document.querySelector(`.zone-card[data-zone="${zoneName}"]`);
        if (zoneCard) {
          zoneCard.classList.add('visited');
        }

        if (this.starCountText) {
          this.starCountText.textContent = `${this.starsUnlocked}/6 Stars`;
        }

        this.sound.playSparkle();

        // If child visited all 6 areas, trigger celebration after 1.5s
        if (this.starsUnlocked === 6) {
          setTimeout(() => {
            this.showCelebration();
          }, 2000);
        }
      }
    }

    showCelebration() {
      this.goToScene('celebration');
      this.sound.playFanfare();
      this.startConfetti();
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}
      this.narrator.speak("Congratulations! You explored all of school and became a School Day Superstar! School is so much fun!", 'teacher');
    }

    resetGame() {
      this.visitedZones.clear();
      this.starsUnlocked = 0;
      document.querySelectorAll('.star-badge').forEach(s => s.classList.remove('unlocked'));
      document.querySelectorAll('.zone-card').forEach(c => c.classList.remove('visited'));
      if (this.starCountText) this.starCountText.textContent = '0/6 Stars';

      this.goToScene('morning');
      this.narrator.speak("Good morning, John! Let's start a brand new magical school day!", 'star');
    }

    // ================= ZONE 1: CLASSROOM LOGIC =================
    initClassroomData() {
      const letters = [
        { char: 'A', word: 'Apple', icon: '🍎' },
        { char: 'B', word: 'Bus', icon: '🚌' },
        { char: 'C', word: 'Cat', icon: '🐱' },
        { char: 'D', word: 'Dog', icon: '🐶' },
        { char: 'E', word: 'Elephant', icon: '🐘' },
        { char: 'F', word: 'Fish', icon: '🐟' },
        { char: 'G', word: 'Giraffe', icon: '🦒' },
        { char: 'H', word: 'House', icon: '🏠' },
        { char: 'I', word: 'Ice Cream', icon: '🍦' },
        { char: 'J', word: 'John', icon: '👦' },
        { char: 'K', word: 'Kite', icon: '🪁' },
        { char: 'L', word: 'Little Star', icon: '⭐' },
        { char: 'M', word: 'Music', icon: '🎵' },
        { char: 'N', word: 'Nest', icon: '🪺' },
        { char: 'O', word: 'Orange', icon: '🍊' },
        { char: 'P', word: 'Pencil', icon: '✏️' },
        { char: 'Q', word: 'Queen', icon: '👑' },
        { char: 'R', word: 'Rocket', icon: '🚀' },
        { char: 'S', word: 'School', icon: '🏫' },
        { char: 'T', word: 'Tree', icon: '🌳' },
        { char: 'U', word: 'Umbrella', icon: '☂️' },
        { char: 'V', word: 'Violin', icon: '🎻' },
        { char: 'W', word: 'Water', icon: '💧' },
        { char: 'X', word: 'Xylophone', icon: '🎼' },
        { char: 'Y', word: 'Yo-yo', icon: '🪀' },
        { char: 'Z', word: 'Zebra', icon: '🦓' }
      ];

      const lettersGrid = document.getElementById('letters-grid');
      if (lettersGrid) {
        lettersGrid.innerHTML = '';
        letters.forEach(item => {
          const card = document.createElement('div');
          card.className = 'letter-card';
          card.innerHTML = `
            <span class="letter-char">${item.char}</span>
            <span class="letter-word-icon">${item.icon}</span>
          `;
          card.addEventListener('click', (e) => {
            document.querySelectorAll('.letter-card').forEach(c => c.classList.remove('active-letter'));
            card.classList.add('active-letter');
            this.sound.playPop(580);
            this.spawnSparkles(e.clientX, e.clientY);

            const feedText = document.getElementById('class-feed-text');
            const feedIcon = document.getElementById('class-feed-icon');
            if (feedText) feedText.textContent = `${item.char} is for ${item.word}! ${item.icon}`;
            if (feedIcon) feedIcon.textContent = item.icon;

            this.narrator.speak(`${item.char}! ${item.char} is for ${item.word}!`, 'teacher');
          });
          lettersGrid.appendChild(card);
        });
      }

      // Numbers Panel
      const numbersRow = document.getElementById('numbers-row');
      if (numbersRow) {
        numbersRow.innerHTML = '';
        [1, 2, 3, 4, 5].forEach(num => {
          const card = document.createElement('div');
          card.className = 'number-card';
          card.textContent = num;
          card.addEventListener('click', (e) => {
            this.sound.playPop(500 + num * 50);
            this.spawnSparkles(e.clientX, e.clientY);
            this.displayCountingStars(num);
          });
          numbersRow.appendChild(card);
        });
      }

      // Shapes Panel
      const shapes = [
        { name: 'Circle', icon: '🔴', desc: 'Round like the sun!' },
        { name: 'Star', icon: '⭐', desc: 'Shining like Little Star!' },
        { name: 'Triangle', icon: '🔺', desc: 'Three straight sides!' },
        { name: 'Square', icon: '🟦', desc: 'Four equal sides!' },
        { name: 'Heart', icon: '💖', desc: 'Full of love!' },
        { name: 'Diamond', icon: '🔷', desc: 'Sparkling diamond!' }
      ];

      const shapesGrid = document.getElementById('shapes-grid');
      if (shapesGrid) {
        shapesGrid.innerHTML = '';
        shapes.forEach(shape => {
          const card = document.createElement('div');
          card.className = 'shape-card';
          card.innerHTML = `
            <span class="shape-icon">${shape.icon}</span>
            <span class="shape-name">${shape.name}</span>
          `;
          card.addEventListener('click', (e) => {
            this.sound.playSparkle();
            this.spawnSparkles(e.clientX, e.clientY);

            const feedText = document.getElementById('class-feed-text');
            const feedIcon = document.getElementById('class-feed-icon');
            if (feedText) feedText.textContent = `${shape.name}! ${shape.desc}`;
            if (feedIcon) feedIcon.textContent = shape.icon;

            this.narrator.speak(`${shape.name}! ${shape.desc}`, 'teacher');
          });
          shapesGrid.appendChild(card);
        });
      }
    }

    switchClassroomTab(tabName) {
      this.sound.playPop();
      ['panel-letters', 'panel-numbers', 'panel-shapes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });

      const target = document.getElementById(`panel-${tabName}`);
      if (target) target.classList.add('active');

      if (tabName === 'letters') {
        this.narrator.speak("Let's explore the Alphabet!", 'teacher');
      } else if (tabName === 'numbers') {
        this.narrator.speak("Let's count numbers with stars!", 'teacher');
      } else if (tabName === 'shapes') {
        this.narrator.speak("Let's learn colourful shapes!", 'teacher');
      }
    }

    displayCountingStars(count) {
      const tray = document.getElementById('counting-stars-tray');
      const word = document.getElementById('counting-word');
      const feedText = document.getElementById('class-feed-text');
      const feedIcon = document.getElementById('class-feed-icon');

      if (tray) {
        tray.innerHTML = '';
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            const star = document.createElement('span');
            star.className = 'count-star';
            star.textContent = '⭐';
            tray.appendChild(star);
            this.sound.playSparkle();
          }, i * 200);
        }
      }

      const numWords = ['One', 'Two', 'Three', 'Four', 'Five'];
      const text = `${count} - ${numWords[count - 1]} Stars!`;
      if (word) word.textContent = text;
      if (feedText) feedText.textContent = `You counted ${count} bright stars! ⭐`;
      if (feedIcon) feedIcon.textContent = '🔢';

      this.narrator.speak(`${numWords[count - 1]}! ${count} stars!`, 'teacher');
    }

    // ================= ZONE 2: ART CORNER LOGIC =================
    initArtData() {
      this.renderArtSvg('school');
    }

    renderArtSvg(picId) {
      const container = document.getElementById('easel-canvas');
      if (!container) return;

      let svgHtml = '';

      if (picId === 'school') {
        // School & Sun Artwork SVG
        svgHtml = `
          <svg class="coloring-svg" viewBox="0 0 400 300">
            <!-- Sky -->
            <rect class="art-region" data-name="Sky" x="0" y="0" width="400" height="200" fill="#E1F5FE" />
            <!-- Sun -->
            <circle class="art-region" data-name="Sun" cx="330" cy="60" r="35" fill="#FFF59D" />
            <!-- Hills / Grass -->
            <path class="art-region" data-name="Grass" d="M0,200 Q200,160 400,200 L400,300 L0,300 Z" fill="#C8E6C9" />
            <!-- School Roof -->
            <polygon class="art-region" data-name="Roof" points="200,40 100,110 300,110" fill="#FFCDD2" />
            <!-- School Wall -->
            <rect class="art-region" data-name="Building Wall" x="120" y="110" width="160" height="110" fill="#FFF8E1" />
            <!-- School Door -->
            <rect class="art-region" data-name="Door" x="180" y="160" width="40" height="60" rx="6" fill="#D7CCC8" />
            <!-- School Windows -->
            <rect class="art-region" data-name="Left Window" x="135" y="130" width="30" height="30" rx="4" fill="#BBDEFB" />
            <rect class="art-region" data-name="Right Window" x="235" y="130" width="30" height="30" rx="4" fill="#BBDEFB" />
            <!-- Flower -->
            <circle class="art-region" data-name="Flower" cx="60" cy="240" r="16" fill="#F8BBD0" />
            <circle class="art-region" data-name="Flower Center" cx="60" cy="240" r="6" fill="#FFE082" />
          </svg>
        `;
      } else if (picId === 'bus') {
        // Happy School Bus SVG
        svgHtml = `
          <svg class="coloring-svg" viewBox="0 0 400 300">
            <!-- Road -->
            <rect class="art-region" data-name="Road" x="0" y="210" width="400" height="90" fill="#CFD8DC" />
            <!-- Bus Body -->
            <rect class="art-region" data-name="Bus Body" x="50" y="80" width="300" height="110" rx="20" fill="#FFF9C4" />
            <!-- Bus Roof -->
            <path class="art-region" data-name="Bus Roof" d="M60,80 L340,80 L320,60 L80,60 Z" fill="#FFE082" />
            <!-- Bus Windows -->
            <rect class="art-region" data-name="Front Window" x="270" y="95" width="60" height="40" rx="6" fill="#E1F5FE" />
            <rect class="art-region" data-name="Middle Window" x="180" y="95" width="60" height="40" rx="6" fill="#E1F5FE" />
            <rect class="art-region" data-name="Back Window" x="90" y="95" width="60" height="40" rx="6" fill="#E1F5FE" />
            <!-- Wheels -->
            <circle class="art-region" data-name="Front Wheel" cx="120" cy="200" r="32" fill="#9E9E9E" />
            <circle class="art-region" data-name="Front Rim" cx="120" cy="200" r="14" fill="#E0E0E0" />
            <circle class="art-region" data-name="Back Wheel" cx="280" cy="200" r="32" fill="#9E9E9E" />
            <circle class="art-region" data-name="Back Rim" cx="280" cy="200" r="14" fill="#E0E0E0" />
          </svg>
        `;
      } else if (picId === 'rocket') {
        // Rocket in Space SVG
        svgHtml = `
          <svg class="coloring-svg" viewBox="0 0 400 300">
            <!-- Space Background -->
            <rect class="art-region" data-name="Outer Space" x="0" y="0" width="400" height="300" fill="#EDE7F6" />
            <!-- Stars -->
            <polygon class="art-region" data-name="Star 1" points="60,40 65,55 80,55 67,65 72,80 60,70 48,80 53,65 40,55 55,55" fill="#FFF9C4" />
            <polygon class="art-region" data-name="Star 2" points="330,80 334,92 346,92 336,100 340,112 330,104 320,112 324,100 314,92 326,92" fill="#FFF9C4" />
            <!-- Rocket Body -->
            <path class="art-region" data-name="Rocket Fuselage" d="M200,40 Q250,140 250,220 L150,220 Q150,140 200,40 Z" fill="#BBDEFB" />
            <!-- Rocket Cone -->
            <path class="art-region" data-name="Rocket Nose" d="M200,40 Q225,90 235,110 L165,110 Q175,90 200,40 Z" fill="#FFCDD2" />
            <!-- Rocket Window -->
            <circle class="art-region" data-name="Porthole Window" cx="200" cy="150" r="22" fill="#E1F5FE" />
            <!-- Wings -->
            <polygon class="art-region" data-name="Left Wing" points="150,180 110,230 150,220" fill="#FFCCBC" />
            <polygon class="art-region" data-name="Right Wing" points="250,180 290,230 250,220" fill="#FFCCBC" />
            <!-- Flame -->
            <polygon class="art-region" data-name="Booster Flame" points="170,220 200,270 230,220" fill="#FFE082" />
          </svg>
        `;
      } else {
        // Nature Garden SVG
        svgHtml = `
          <svg class="coloring-svg" viewBox="0 0 400 300">
            <!-- Sky -->
            <rect class="art-region" data-name="Garden Sky" x="0" y="0" width="400" height="180" fill="#E1F5FE" />
            <!-- Rainbow Arc -->
            <path class="art-region" data-name="Rainbow" d="M40,180 A160,160 0 0,1 360,180" stroke="#FFE082" stroke-width="20" fill="none" />
            <!-- Ground -->
            <rect class="art-region" data-name="Garden Lawn" x="0" y="180" width="400" height="120" fill="#C8E6C9" />
            <!-- Big Sunflower Petals -->
            <circle class="art-region" data-name="Sunflower Petals" cx="200" cy="160" r="50" fill="#FFF59D" />
            <circle class="art-region" data-name="Sunflower Core" cx="200" cy="160" r="24" fill="#D7CCC8" />
            <!-- Stem -->
            <rect class="art-region" data-name="Stem" x="194" y="210" width="12" height="70" fill="#A5D6A7" />
            <!-- Butterfly -->
            <ellipse class="art-region" data-name="Butterfly Wing" cx="300" cy="100" rx="20" ry="14" fill="#F8BBD0" />
            <ellipse class="art-region" data-name="Butterfly Wing 2" cx="325" cy="100" rx="20" ry="14" fill="#F8BBD0" />
          </svg>
        `;
      }

      container.innerHTML = svgHtml;

      // Bind Coloring Handlers
      container.querySelectorAll('.art-region').forEach(region => {
        region.addEventListener('click', (e) => {
          let chosenColor = this.activeArtColor;
          if (chosenColor === 'rainbow') {
            const colors = ['#FF3B30', '#FF9500', '#FFD60A', '#34C759', '#007AFF', '#AF52DE', '#FF2D55'];
            chosenColor = colors[Math.floor(Math.random() * colors.length)];
          }

          region.style.fill = chosenColor;
          this.sound.playSparkle();
          this.spawnSparkles(e.clientX, e.clientY);

          const partName = region.dataset.name || 'part';
          const speechElem = document.getElementById('art-speech-text');
          const compliments = [
            `Wow! The ${partName} looks so beautiful in that color!`,
            `Awesome! Great painting, superstar!`,
            `I love this artwork! You are so creative!`,
            `Super colorful! Beautiful job!`
          ];
          const text = compliments[Math.floor(Math.random() * compliments.length)];
          if (speechElem) speechElem.textContent = `"${text}"`;

          this.narrator.speak(text, 'john');
        });
      });
    }

    // ================= ZONE 3: PUZZLE CORNER LOGIC =================
    initPuzzleData(puzzleType = 'bus') {
      const board = document.getElementById('puzzle-board');
      const tray = document.getElementById('puzzle-pieces-tray');
      const victoryOverlay = document.getElementById('puzzle-victory');
      if (victoryOverlay) victoryOverlay.classList.add('hidden');

      let pieces = [];

      if (puzzleType === 'bus') {
        pieces = [
          { id: 'p1', name: 'Bus Front', icon: '🚍', slotText: 'Front Chassis' },
          { id: 'p2', name: 'Bus Windows', icon: '🪟', slotText: 'Windows & Roof' },
          { id: 'p3', name: 'Bus Wheels', icon: '🛞', slotText: 'Round Wheels' }
        ];
      } else {
        pieces = [
          { id: 'p1', name: 'Bag Body', icon: '🎒', slotText: 'Bag Base' },
          { id: 'p2', name: 'Front Pocket', icon: '👝', slotText: 'Pencil Pocket' },
          { id: 'p3', name: 'Shoulder Straps', icon: '🪢', slotText: 'Straps' },
          { id: 'p4', name: 'Star Charm', icon: '⭐', slotText: 'Little Star Badge' }
        ];
      }

      this.puzzleSlotsCount = pieces.length;
      this.puzzlePlacedCount = 0;
      this.selectedPieceId = null;

      if (board) {
        board.innerHTML = '';
        pieces.forEach(p => {
          const slot = document.createElement('div');
          slot.className = 'puzzle-slot';
          slot.id = `slot-${p.id}`;
          slot.dataset.targetId = p.id;
          slot.innerHTML = `
            <span class="slot-silhouette">${p.icon}</span>
            <span class="slot-label">${p.slotText}</span>
          `;

          // Drop events
          slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('slot-hover');
          });

          slot.addEventListener('dragleave', () => {
            slot.classList.remove('slot-hover');
          });

          slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('slot-hover');
            const draggedId = e.dataTransfer.getData('text/plain');
            if (draggedId === p.id) {
              this.placePuzzlePiece(p.id, slot);
            } else {
              this.sound.playPop(300);
              this.narrator.speak("Try placing that piece in another matching spot!", 'star');
            }
          });

          // Tap-to-Place event
          slot.addEventListener('click', () => {
            if (this.selectedPieceId && this.selectedPieceId === p.id) {
              this.placePuzzlePiece(p.id, slot);
            }
          });

          board.appendChild(slot);
        });
      }

      if (tray) {
        tray.innerHTML = '';
        pieces.forEach(p => {
          const piece = document.createElement('div');
          piece.className = 'puzzle-piece';
          piece.id = `piece-${p.id}`;
          piece.draggable = true;
          piece.innerHTML = `
            <span class="piece-icon">${p.icon}</span>
            <span class="piece-name">${p.name}</span>
          `;

          piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', p.id);
            this.selectedPieceId = p.id;
          });

          // Easy Tap Mechanic: tap piece -> auto snaps or selects
          piece.addEventListener('click', (e) => {
            this.selectedPieceId = p.id;
            this.sound.playPop();
            const targetSlot = document.getElementById(`slot-${p.id}`);
            if (targetSlot && !targetSlot.classList.contains('filled')) {
              this.placePuzzlePiece(p.id, targetSlot);
              this.spawnSparkles(e.clientX, e.clientY);
            }
          });

          tray.appendChild(piece);
        });
      }
    }

    placePuzzlePiece(pieceId, slotElem) {
      if (slotElem.classList.contains('filled')) return;

      slotElem.classList.add('filled');
      const pieceElem = document.getElementById(`piece-${pieceId}`);
      if (pieceElem) {
        slotElem.innerHTML = pieceElem.innerHTML;
        pieceElem.classList.add('placed');
      }

      this.sound.playSnap();
      this.sound.playSparkle();
      this.puzzlePlacedCount++;

      if (this.puzzlePlacedCount >= this.puzzleSlotsCount) {
        // Puzzle Complete!
        setTimeout(() => {
          this.sound.playFanfare();
          const victoryOverlay = document.getElementById('puzzle-victory');
          if (victoryOverlay) victoryOverlay.classList.remove('hidden');
          this.narrator.speak("You did it! Great thinking, superstar!", 'star');
        }, 400);
      } else {
        this.narrator.speak("Snap! That fits perfectly!", 'john');
      }
    }

    // ================= ZONE 4: PLAYGROUND LOGIC =================
    bindPlaygroundEvents() {
      // 1. Slide
      const stationSlide = document.getElementById('station-slide');
      const johnSlide = document.getElementById('play-john-slide');
      if (stationSlide && johnSlide) {
        stationSlide.addEventListener('click', (e) => {
          this.sound.playSlide();
          this.spawnSparkles(e.clientX, e.clientY);
          johnSlide.classList.add('slide-animating');
          this.narrator.speak("Wheeeeeee! John slides all the way down!", 'john');

          setTimeout(() => {
            johnSlide.classList.remove('slide-animating');
          }, 1500);
        });
      }

      // 2. Swing
      const stationSwing = document.getElementById('station-swing');
      const swingSeat = document.getElementById('swing-seat-elem');
      if (stationSwing && swingSeat) {
        stationSwing.addEventListener('click', (e) => {
          this.sound.playPop(550);
          this.spawnSparkles(e.clientX, e.clientY);
          swingSeat.classList.toggle('swing-animating');
          this.narrator.speak("Higher and higher! Swings are so much fun!", 'star');
        });
      }

      // 3. Soccer Ball
      const stationBall = document.getElementById('station-ball');
      const soccerBall = document.getElementById('soccer-ball-elem');
      if (stationBall && soccerBall) {
        stationBall.addEventListener('click', (e) => {
          this.sound.playKick();
          this.spawnSparkles(e.clientX, e.clientY);
          soccerBall.classList.add('ball-kicked');
          this.narrator.speak("GOAAAAL! John kicks a super goal!", 'john');

          setTimeout(() => {
            soccerBall.classList.remove('ball-kicked');
          }, 1200);
        });
      }

      // 4. Seesaw
      const stationSeesaw = document.getElementById('station-seesaw');
      const seesawPlank = document.getElementById('seesaw-plank-elem');
      if (stationSeesaw && seesawPlank) {
        stationSeesaw.addEventListener('click', (e) => {
          this.sound.playPop(480);
          this.spawnSparkles(e.clientX, e.clientY);
          seesawPlank.classList.toggle('seesaw-animating');
          this.narrator.speak("Up and down! Seesawing with friends is full of giggles!", 'star');
        });
      }
    }

    // ================= ZONE 5: LUNCH CORNER LOGIC =================
    bindLunchEvents() {
      const btnOpenLunch = document.getElementById('btn-open-lunchbox');
      const lunchLid = document.getElementById('lunchbox-lid');
      const lunchInterior = document.getElementById('lunchbox-interior');

      if (btnOpenLunch && lunchLid && lunchInterior) {
        btnOpenLunch.addEventListener('click', () => {
          this.sound.playPop(700);
          lunchLid.classList.add('opened');
          lunchInterior.classList.add('active');
          this.narrator.speak("Open sesame! Look at all the delicious, healthy food inside!", 'star');
        });
      }

      const foodItems = [
        { id: 'apple', name: 'Sweet Apple', sound: 'bite', text: 'Crunch! Apples are sweet and healthy!' },
        { id: 'banana', name: 'Ripe Banana', sound: 'bite', text: 'Yummy! Bananas give us super play energy!' },
        { id: 'sandwich', name: 'Cheese Sandwich', sound: 'bite', text: 'Munch munch! Delicious sandwich!' },
        { id: 'juice', name: 'Fresh Fruit Juice', sound: 'sip', text: 'Slurp! Fresh juice keeps us refreshed!' },
        { id: 'cookie', name: 'Choco Cookie', sound: 'bite', text: 'A sweet crunchy cookie treat!' }
      ];

      foodItems.forEach(item => {
        const card = document.getElementById(`food-${item.id}`);
        if (card) {
          card.addEventListener('click', (e) => {
            if (item.sound === 'bite') {
              this.sound.playBite();
            } else {
              this.sound.playSip();
            }
            this.spawnSparkles(e.clientX, e.clientY);
            card.classList.add('eaten');

            const speechElem = document.getElementById('lunch-speech-text');
            if (speechElem) speechElem.textContent = `"${item.text}"`;

            this.narrator.speak(item.text, 'star');
          });
        }
      });
    }

    // ================= ZONE 6: FRIENDS CORNER LOGIC =================
    bindFriendsEvents() {
      const friendData = {
        maya: {
          wave: "Hello John! I'm so happy we are in the same class!",
          highfive: "High five, John! You're a superstar!",
          share: "Thank you for sharing your toy rocket with me!"
        },
        leo: {
          wave: "Hey buddy! Let's build big blocks together!",
          highfive: "Awesome high five! Best friends forever!",
          share: "Thanks for reading this cool picture book with me!"
        },
        emma: {
          wave: "Hi John! You have the sweetest smile!",
          highfive: "Yay! High five! School is the happiest place!",
          share: "Thank you for sharing your colorful crayons!"
        }
      };

      document.querySelectorAll('.friend-act-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = btn.dataset.action;
          const friendCard = btn.closest('.friend-card');
          const friendName = friendCard ? friendCard.dataset.friend : 'maya';

          this.spawnSparkles(e.clientX, e.clientY);

          if (action === 'highfive') {
            this.sound.playHighFive();
          } else if (action === 'wave') {
            this.sound.playSparkle();
          } else {
            this.sound.playPop(620);
          }

          const responseText = friendData[friendName][action];
          const bubbleElem = document.getElementById(`${friendName}-speech`);
          if (bubbleElem) bubbleElem.textContent = `"${responseText}"`;

          this.narrator.speak(responseText, friendName);
        });
      });
    }

    // ================= CELEBRATION CONFETTI ENGINE =================
    initConfetti() {
      this.confettiCanvas = document.getElementById('confetti-canvas');
      if (!this.confettiCanvas) return;

      this.confettiCtx = this.confettiCanvas.getContext('2d');
      this.confettiParticles = [];
      this.confettiRunning = false;

      const resize = () => {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();
    }

    startConfetti() {
      if (!this.confettiCanvas || !this.confettiCtx) return;
      this.confettiRunning = true;
      this.confettiParticles = [];

      const colors = ['#FF1744', '#FFD600', '#00E676', '#00B0FF', '#D500F9', '#FF9100', '#FFFFFF'];

      for (let i = 0; i < 160; i++) {
        this.confettiParticles.push({
          x: Math.random() * this.confettiCanvas.width,
          y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
          w: Math.random() * 12 + 6,
          h: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8
        });
      }

      const animate = () => {
        if (!this.confettiRunning) return;
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        this.confettiParticles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;

          if (p.y > this.confettiCanvas.height) {
            p.y = -20;
            p.x = Math.random() * this.confettiCanvas.width;
          }

          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rot * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          this.confettiCtx.restore();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }

    // ================= SPARKLE PARTICLES =================
    spawnSparkles(x, y) {
      if (!this.particleLayer) return;

      const emojis = ['✨', '⭐', '🌟', '💫', '🎉'];
      for (let i = 0; i < 6; i++) {
        const span = document.createElement('span');
        span.className = 'sparkle-particle';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        const tx = (Math.random() - 0.5) * 120;
        const ty = (Math.random() - 0.5) * 120 - 30;
        span.style.setProperty('--tx', `${tx}px`);
        span.style.setProperty('--ty', `${ty}px`);

        this.particleLayer.appendChild(span);
        setTimeout(() => span.remove(), 800);
      }
    }

    spawnSparklesAtElement(elem) {
      const rect = elem.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      this.spawnSparkles(x, y);
    }
  }

  // ============================================================
  // INITIALIZE GAME ON DOM READY
  // ============================================================
  window.addEventListener('DOMContentLoaded', () => {
    window.chotaPlayGame = new SchoolGameApp();
  });
})();
