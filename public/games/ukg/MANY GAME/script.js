/**
 * CHOTAPLAY: RIYA'S MAGIC WORD CARNIVAL
 * Complete Vanilla JavaScript ES6+ Game Engine
 * UKG Educational Concept: ONE, MANY, THIS, THAT, THESE, THOSE
 */

(function () {
  'use strict';

  // =========================================================================
  // AUDIO SYNTHESIZER (Web Audio API - 100% Offline & Reliable)
  // =========================================================================
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
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }

    sparkle() {
      if (!this.enabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.25, 0.12), i * 70);
      });
    }

    pop() {
      if (!this.enabled) return;
      this.playTone(380, 'sine', 0.1, 0.2);
    }

    bounce() {
      if (!this.enabled) return;
      const notes = [300, 450, 600];
      notes.forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.15, 0.1), i * 60);
      });
    }

    celebrate() {
      if (!this.enabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.18), i * 90);
      });
    }

    retry() {
      if (!this.enabled) return;
      this.playTone(320, 'sine', 0.2, 0.1);
      setTimeout(() => this.playTone(280, 'sine', 0.25, 0.1), 180);
    }
  }

  const sound = new SoundEngine();

  // =========================================================================
  // VOICE SYSTEM (SpeechSynthesis with tuned friendly tone)
  // =========================================================================
  let lastSpokenText = '';

  function speak(text, callback) {
    lastSpokenText = text;
    if (!('speechSynthesis' in window)) {
      if (callback) callback();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // slightly slower for UKG learners
      utterance.pitch = 1.25; // cheerful, friendly kid-appropriate pitch
      utterance.lang = 'en-US';

      // Pick best English voice if available
      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Female')) && v.lang.startsWith('en'));
      if (friendlyVoice) {
        utterance.voice = friendlyVoice;
      }

      utterance.onend = () => {
        if (callback) callback();
      };
      utterance.onerror = () => {
        if (callback) callback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      if (callback) callback();
    }
  }

  // =========================================================================
  // GAME STATE
  // =========================================================================
  const state = {
    currentZone: 0,
    stars: 0,
    introStep: 0,
    z1Substep: 'demo-one', // 'demo-one' -> 'demo-many' -> 'sorting'
    z1SortRound: 0,
    z2Round: 0,
    z3Round: 0,
    z4Round: 0,
    z5Round: 0,
    freeplay: {
      quantity: 'one',
      distance: 'near',
      object: 'balloon'
    }
  };

  // Educational Data Sets
  const OBJECT_EMOJIS = {
    balloon: '🎈',
    apple: '🍎',
    star: '⭐',
    kite: '🪁',
    ball: '⚽',
    toy: '🧸',
    cupcake: '🧁',
    flower: '🌸',
    tree: '🌳',
    book: '📚',
    car: '🚗'
  };

  const Z1_SORT_ITEMS = [
    { name: '1 Apple', count: 1, type: 'one', emoji: '🍎' },
    { name: '4 Stars', count: 4, type: 'many', emoji: '⭐' },
    { name: '1 Ball', count: 1, type: 'one', emoji: '⚽' },
    { name: '3 Balloons', count: 3, type: 'many', emoji: '🎈' },
    { name: '1 Teddy Toy', count: 1, type: 'one', emoji: '🧸' },
    { name: '4 Cupcakes', count: 4, type: 'many', emoji: '🧁' }
  ];

  const Z2_THIS_DATA = [
    { noun: 'balloon.', emoji: '🎈', sentence: 'This is a balloon.' },
    { noun: 'apple.', emoji: '🍎', sentence: 'This is an apple.' },
    { noun: 'ball.', emoji: '⚽', sentence: 'This is a ball.' },
    { noun: 'star.', emoji: '⭐', sentence: 'This is a star.' },
    { noun: 'toy.', emoji: '🧸', sentence: 'This is a toy.' }
  ];

  const Z3_THAT_DATA = [
    { noun: 'kite.', emoji: '🪁', sentence: 'That is a kite.' },
    { noun: 'balloon.', emoji: '🎈', sentence: 'That is a balloon.' },
    { noun: 'star.', emoji: '⭐', sentence: 'That is a star.' },
    { noun: 'ball.', emoji: '⚽', sentence: 'That is a ball.' },
    { noun: 'tree.', emoji: '🌳', sentence: 'That is a tree.' }
  ];

  const Z4_THESE_DATA = [
    { noun: 'balloons.', count: 3, emoji: '🎈', sentence: 'These are balloons.' },
    { noun: 'apples.', count: 4, emoji: '🍎', sentence: 'These are apples.' },
    { noun: 'stars.', count: 3, emoji: '⭐', sentence: 'These are stars.' },
    { noun: 'books.', count: 3, emoji: '📚', sentence: 'These are books.' },
    { noun: 'flowers.', count: 4, emoji: '🌸', sentence: 'These are flowers.' }
  ];

  const Z5_THOSE_DATA = [
    { noun: 'balloons.', count: 4, emoji: '🎈', sentence: 'Those are balloons.' },
    { noun: 'stars.', count: 5, emoji: '⭐', sentence: 'Those are stars.' },
    { noun: 'kites.', count: 3, emoji: '🪁', sentence: 'Those are kites.' },
    { noun: 'cars.', count: 3, emoji: '🚗', sentence: 'Those are cars.' },
    { noun: 'flowers.', count: 4, emoji: '🌸', sentence: 'Those are flowers.' }
  ];

  // Story Sequence
  const INTRO_DIALOGUES = [
    { speaker: 'Little Star:', icon: '⭐', text: '“Riya! Look at the magic carnival!”' },
    { speaker: 'Riya:', icon: '👧', text: '“Wow! It is so bright and colourful!”' },
    { speaker: 'Little Star:', icon: '⭐', text: '“Oh no! The magic words are mixed up!”' },
    { speaker: 'Riya:', icon: '👧', text: '“Let’s fix them together!”' }
  ];

  // =========================================================================
  // DOM ELEMENTS
  // =========================================================================
  const dom = {
    // Screens
    screenIntro: document.getElementById('screen-intro'),
    screenZ1: document.getElementById('screen-zone1'),
    screenZ2: document.getElementById('screen-zone2'),
    screenZ3: document.getElementById('screen-zone3'),
    screenZ4: document.getElementById('screen-zone4'),
    screenZ5: document.getElementById('screen-zone5'),
    screenGrid: document.getElementById('screen-grid'),
    screenCelebration: document.getElementById('screen-celebration'),
    screenFreeplay: document.getElementById('screen-freeplay'),

    // HUD & Navigation
    zoneIcon: document.getElementById('zone-icon'),
    zoneTitle: document.getElementById('zone-title'),
    starsCount: document.getElementById('stars-count'),
    btnHome: document.getElementById('btn-home'),
    btnSound: document.getElementById('btn-sound'),
    btnRepeatVoice: document.getElementById('btn-repeat-voice'),
    footerSteps: document.querySelectorAll('.progress-step'),

    // Characters
    charRiya: document.getElementById('character-riya'),
    charStar: document.getElementById('character-star'),
    riyaArmRight: document.getElementById('riya-arm-right'),

    // Intro Elements
    introDialogueBox: document.getElementById('intro-dialogue-box'),
    dialogueSpeakerIcon: document.getElementById('dialogue-speaker-icon'),
    dialogueSpeakerName: document.getElementById('dialogue-speaker-name'),
    dialogueTextMsg: document.getElementById('dialogue-text-msg'),
    btnNextDialogue: document.getElementById('btn-next-dialogue'),
    btnStartCarnival: document.getElementById('btn-start-carnival'),

    // Zone 1 Elements
    z1MachineStage: document.getElementById('z1-machine-stage'),
    z1SortingStage: document.getElementById('z1-sorting-stage'),
    z1ItemDisplay: document.getElementById('z1-item-display'),
    z1SpeechPrompt: document.getElementById('z1-speech-prompt'),
    z1ChoiceButtons: document.getElementById('z1-choice-buttons'),
    z1ActiveItem: document.getElementById('z1-active-item'),
    z1ItemLabel: document.getElementById('z1-item-label'),
    basketOne: document.getElementById('basket-one'),
    basketMany: document.getElementById('basket-many'),
    basketOneItems: document.getElementById('basket-one-items'),
    basketManyItems: document.getElementById('basket-many-items'),

    // Zone 2 Elements (THIS)
    z2ObjectHolder: document.getElementById('z2-object-holder'),
    z2SentenceCard: document.getElementById('z2-sentence-card'),
    z2WordTarget: document.getElementById('z2-word-target'),
    z2NounTarget: document.getElementById('z2-noun-target'),
    btnActionThis: document.getElementById('btn-action-this'),

    // Zone 3 Elements (THAT)
    z3ObjectHolder: document.getElementById('z3-object-holder'),
    z3SentenceCard: document.getElementById('z3-sentence-card'),
    z3WordTarget: document.getElementById('z3-word-target'),
    z3NounTarget: document.getElementById('z3-noun-target'),
    btnActionThat: document.getElementById('btn-action-that'),
    z3TelescopeBeam: document.getElementById('z3-telescope-beam'),

    // Zone 4 Elements (THESE)
    z4ObjectsCluster: document.getElementById('z4-objects-cluster'),
    z4SentenceCard: document.getElementById('z4-sentence-card'),
    z4WordTarget: document.getElementById('z4-word-target'),
    z4NounTarget: document.getElementById('z4-noun-target'),
    btnActionThese: document.getElementById('btn-action-these'),

    // Zone 5 Elements (THOSE)
    z5DistantCluster: document.getElementById('z5-distant-cluster'),
    z5SentenceCard: document.getElementById('z5-sentence-card'),
    z5WordTarget: document.getElementById('z5-word-target'),
    z5NounTarget: document.getElementById('z5-noun-target'),
    btnActionThose: document.getElementById('btn-action-those'),
    z5RainbowArc: document.getElementById('z5-rainbow-arc'),

    // Grid Elements
    gridCards: document.querySelectorAll('.grid-card'),
    gridPreviewObjects: document.getElementById('grid-preview-objects'),
    gridPreviewText: document.getElementById('grid-preview-text'),
    btnGotoCelebration: document.getElementById('btn-goto-celebration'),

    // Celebration Elements
    confettiCanvas: document.getElementById('confetti-canvas'),
    btnGotoFreeplay: document.getElementById('btn-goto-freeplay'),
    btnReplayAdventure: document.getElementById('btn-replay-adventure'),

    // Freeplay Elements
    freeplayDisplayContainer: document.getElementById('freeplay-display-container'),
    freeplaySentenceText: document.getElementById('freeplay-sentence-text'),
    btnFreeplaySpeak: document.getElementById('btn-freeplay-speak'),
    btnFreeplayRandom: document.getElementById('btn-freeplay-random'),
    btnFreeplayExit: document.getElementById('btn-freeplay-exit'),
    freeplayPalette: document.getElementById('freeplay-palette'),

    // Toast
    feedbackToast: document.getElementById('feedback-toast')
  };

  // =========================================================================
  // CHARACTER & CELEBRATION HELPERS
  // =========================================================================
  function setRiyaAnimation(animClass, durationMs = 2000) {
    if (!dom.charRiya) return;
    dom.charRiya.classList.remove('riya-idle', 'riya-wave', 'riya-celebrate');
    dom.charRiya.classList.add(animClass);
    if (durationMs > 0) {
      setTimeout(() => {
        dom.charRiya.classList.remove(animClass);
        dom.charRiya.classList.add('riya-idle');
      }, durationMs);
    }
  }

  function showToast(text = 'Great Job! ⭐', icon = '✨') {
    if (!dom.feedbackToast) return;
    dom.feedbackToast.querySelector('.toast-text').textContent = text;
    dom.feedbackToast.querySelector('.toast-icon').textContent = icon;
    dom.feedbackToast.classList.remove('hidden');
    sound.sparkle();
    setTimeout(() => {
      dom.feedbackToast.classList.add('hidden');
    }, 1500);
  }

  function addStar() {
    state.stars += 1;
    if (dom.starsCount) dom.starsCount.textContent = state.stars;
    sound.sparkle();
  }

  // =========================================================================
  // NAVIGATION & ZONE MANAGER
  // =========================================================================
  const ZONE_INFO = [
    { icon: '🎪', title: 'Carnival Entrance', screen: () => dom.screenIntro },
    { icon: '1️⃣', title: 'Zone 1: One & Many', screen: () => dom.screenZ1 },
    { icon: '📍', title: 'Zone 2: THIS (Near 1)', screen: () => dom.screenZ2 },
    { icon: '🔭', title: 'Zone 3: THAT (Far 1)', screen: () => dom.screenZ3 },
    { icon: '📍🎈', title: 'Zone 4: THESE (Near Many)', screen: () => dom.screenZ4 },
    { icon: '🔭🎈', title: 'Zone 5: THOSE (Far Many)', screen: () => dom.screenZ5 },
    { icon: '🔲', title: 'Zone 6: Magic Grid', screen: () => dom.screenGrid },
    { icon: '🏆', title: 'Grand Celebration', screen: () => dom.screenCelebration },
    { icon: '🎮', title: 'Free Play Playground', screen: () => dom.screenFreeplay }
  ];

  function showZone(zoneIndex) {
    state.currentZone = zoneIndex;
    sound.init();

    // Update Header
    const info = ZONE_INFO[zoneIndex] || ZONE_INFO[0];
    if (dom.zoneIcon) dom.zoneIcon.textContent = info.icon;
    if (dom.zoneTitle) dom.zoneTitle.textContent = info.title;

    // Update Screens
    document.querySelectorAll('.game-screen').forEach(scr => {
      scr.classList.remove('active');
    });

    const targetScreen = info.screen();
    if (targetScreen) {
      targetScreen.classList.add('active');
    }

    // Update Footer Progress Steps
    dom.footerSteps.forEach((step, idx) => {
      step.classList.remove('active');
      if (idx === zoneIndex) {
        step.classList.add('active');
      } else if (idx < zoneIndex) {
        step.classList.add('completed');
      }
    });

    // Initialize specific zone logic
    switch (zoneIndex) {
      case 0:
        initIntro();
        break;
      case 1:
        initZone1();
        break;
      case 2:
        initZone2();
        break;
      case 3:
        initZone3();
        break;
      case 4:
        initZone4();
        break;
      case 5:
        initZone5();
        break;
      case 6:
        initMagicGrid();
        break;
      case 7:
        initCelebration();
        break;
      case 8:
        initFreeplay();
        break;
    }
  }

  // =========================================================================
  // SCREEN 0: INTRO STORY
  // =========================================================================
  function initIntro() {
    state.introStep = 0;
    updateIntroDialogue();
    setRiyaAnimation('riya-wave', 3000);
  }

  function updateIntroDialogue() {
    const item = INTRO_DIALOGUES[state.introStep];
    if (!item) return;

    if (dom.dialogueSpeakerIcon) dom.dialogueSpeakerIcon.textContent = item.icon;
    if (dom.dialogueSpeakerName) dom.dialogueSpeakerName.textContent = item.speaker;
    if (dom.dialogueTextMsg) dom.dialogueTextMsg.textContent = item.text;

    sound.pop();
    speak(item.text.replace(/["“”]/g, ''));
  }

  function nextIntroDialogue() {
    state.introStep = (state.introStep + 1) % INTRO_DIALOGUES.length;
    updateIntroDialogue();
  }

  // =========================================================================
  // ZONE 1: ONE & MANY (MACHINE + SORTING)
  // =========================================================================
  function initZone1() {
    state.z1Substep = 'demo-one';
    state.z1SortRound = 0;
    if (dom.basketOneItems) dom.basketOneItems.innerHTML = '';
    if (dom.basketManyItems) dom.basketManyItems.innerHTML = '';

    dom.z1MachineStage.classList.remove('hidden');
    dom.z1SortingStage.classList.add('hidden');

    renderZ1MachineOne();
  }

  function renderZ1MachineOne() {
    state.z1Substep = 'demo-one';
    dom.z1ItemDisplay.innerHTML = '<span class="bounce-pulse" style="display:inline-block; font-size:64px; cursor:pointer;" id="z1-balloon-one">🎈</span>';
    dom.z1SpeechPrompt.textContent = '“How many balloons?”';
    dom.z1ChoiceButtons.innerHTML = `
      <button class="btn-choice" id="btn-z1-one">ONE (1) 🎈</button>
    `;

    speak('How many balloons? One!', () => {});

    const balloon = document.getElementById('z1-balloon-one');
    const btnOne = document.getElementById('btn-z1-one');

    const handleOneChoice = () => {
      sound.celebrate();
      balloon.style.transform = 'scale(1.3)';
      setRiyaAnimation('riya-celebrate', 2000);
      showToast('One Balloon! 🎈', '⭐');
      addStar();
      speak('One balloon!', () => {
        setTimeout(renderZ1MachineMany, 1500);
      });
    };

    if (balloon) balloon.onclick = handleOneChoice;
    if (btnOne) btnOne.onclick = handleOneChoice;
  }

  function renderZ1MachineMany() {
    state.z1Substep = 'demo-many';
    dom.z1ItemDisplay.innerHTML = `
      <span class="bounce-pulse" style="display:inline-block; font-size:50px;">🎈</span>
      <span class="bounce-pulse" style="display:inline-block; font-size:50px; animation-delay:0.1s;">🎈</span>
      <span class="bounce-pulse" style="display:inline-block; font-size:50px; animation-delay:0.2s;">🎈</span>
      <span class="bounce-pulse" style="display:inline-block; font-size:50px; animation-delay:0.3s;">🎈</span>
    `;
    dom.z1SpeechPrompt.textContent = '“Now look! How many balloons?”';
    dom.z1ChoiceButtons.innerHTML = `
      <button class="btn-choice" id="btn-z1-many">MANY (4) 🎈🎈</button>
    `;

    speak('Now look! How many balloons? Many!', () => {});

    const btnMany = document.getElementById('btn-z1-many');
    const handleManyChoice = () => {
      sound.celebrate();
      setRiyaAnimation('riya-celebrate', 2000);
      showToast('Many Balloons! 🎈🎈', '✨');
      addStar();
      speak('Many balloons! Now let’s sort into baskets!', () => {
        setTimeout(startZ1SortingChallenge, 1800);
      });
    };

    if (btnMany) btnMany.onclick = handleManyChoice;
    dom.z1ItemDisplay.onclick = handleManyChoice;
  }

  function startZ1SortingChallenge() {
    state.z1Substep = 'sorting';
    dom.z1MachineStage.classList.add('hidden');
    dom.z1SortingStage.classList.remove('hidden');
    loadZ1SortRound();
  }

  function loadZ1SortRound() {
    if (state.z1SortRound >= Z1_SORT_ITEMS.length) {
      // Completed Zone 1!
      showToast('Zone 1 Complete! 🌟', '🏆');
      sound.celebrate();
      speak('Wonderful! You know ONE and MANY! Next is THIS!', () => {
        setTimeout(() => showZone(2), 1500);
      });
      return;
    }

    const current = Z1_SORT_ITEMS[state.z1SortRound];
    let emojisHtml = '';
    for (let i = 0; i < current.count; i++) {
      emojisHtml += `<span style="margin:0 2px;">${current.emoji}</span>`;
    }
    dom.z1ActiveItem.innerHTML = emojisHtml;
    dom.z1ItemLabel.textContent = current.name;

    speak(`${current.name}. Put it in ONE or MANY!`);

    // Setup Baskets Click Handlers
    dom.basketOne.onclick = () => checkZ1Sort('one');
    dom.basketMany.onclick = () => checkZ1Sort('many');
  }

  function checkZ1Sort(selected) {
    const current = Z1_SORT_ITEMS[state.z1SortRound];
    if (selected === current.type) {
      // Correct!
      sound.sparkle();
      addStar();
      setRiyaAnimation('riya-celebrate', 1500);
      showToast(`Correct! ${current.name}`, '🎉');

      // Drop emoji preview into basket
      const targetBasketList = selected === 'one' ? dom.basketOneItems : dom.basketManyItems;
      const chip = document.createElement('span');
      chip.textContent = current.emoji;
      targetBasketList.appendChild(chip);

      speak(`Yes! ${current.name} is ${current.type}!`, () => {
        state.z1SortRound++;
        setTimeout(loadZ1SortRound, 1000);
      });
    } else {
      // Incorrect -> Gentle retry
      sound.retry();
      showToast('Look carefully! Try again.', '👀');
      speak('Look carefully. Count the objects and try again.');
    }
  }

  // =========================================================================
  // ZONE 2: THIS (MAGIC MIRROR - ONE NEARBY OBJECT)
  // =========================================================================
  function initZone2() {
    state.z2Round = 0;
    loadZ2Round();
  }

  function loadZ2Round() {
    const data = Z2_THIS_DATA[state.z2Round % Z2_THIS_DATA.length];
    dom.z2ObjectHolder.innerHTML = `<span>${data.emoji}</span>`;
    dom.z2NounTarget.textContent = data.noun;

    setRiyaAnimation('riya-idle');
    speak(`Look! One ${data.noun.replace('.', '')} is right here! ${data.sentence}`);

    dom.btnActionThis.onclick = () => handleZ2Success(data);
    dom.z2ObjectHolder.onclick = () => handleZ2Success(data);
  }

  function handleZ2Success(data) {
    sound.celebrate();
    addStar();
    setRiyaAnimation('riya-celebrate', 2000);
    showToast(data.sentence, '✨');

    // Make item pulse and glow
    dom.z2ObjectHolder.classList.add('bounce-pulse');

    speak(data.sentence, () => {
      dom.z2ObjectHolder.classList.remove('bounce-pulse');
      state.z2Round++;
      if (state.z2Round >= 3) {
        showToast('Zone 2 Complete! 🌟', '🏆');
        speak('Great job! THIS is for one nearby object! Now let’s look far with THAT!', () => {
          setTimeout(() => showZone(3), 1600);
        });
      } else {
        setTimeout(loadZ2Round, 1000);
      }
    });
  }

  // =========================================================================
  // ZONE 3: THAT (MAGIC TELESCOPE - ONE DISTANT OBJECT)
  // =========================================================================
  function initZone3() {
    state.z3Round = 0;
    loadZ3Round();
  }

  function loadZ3Round() {
    const data = Z3_THAT_DATA[state.z3Round % Z3_THAT_DATA.length];
    dom.z3ObjectHolder.innerHTML = `<span>${data.emoji}</span>`;
    dom.z3NounTarget.textContent = data.noun;

    // Reset distance scale
    dom.z3ObjectHolder.classList.add('scale-small');
    dom.z3ObjectHolder.style.transform = 'scale(0.65)';

    speak(`Look over there far away! ${data.sentence}`);

    dom.btnActionThat.onclick = () => handleZ3Success(data);
    dom.z3ObjectHolder.onclick = () => handleZ3Success(data);
  }

  function handleZ3Success(data) {
    sound.celebrate();
    addStar();
    setRiyaAnimation('riya-celebrate', 2000);
    showToast(data.sentence, '🔭');

    // Telescope zooms in object visually
    dom.z3ObjectHolder.style.transition = 'transform 0.8s ease-out';
    dom.z3ObjectHolder.style.transform = 'scale(1.4)';

    speak(data.sentence, () => {
      state.z3Round++;
      if (state.z3Round >= 3) {
        showToast('Zone 3 Complete! 🌟', '🏆');
        speak('Awesome! THAT is for one distant object! Next is THESE!', () => {
          setTimeout(() => showZone(4), 1600);
        });
      } else {
        setTimeout(loadZ3Round, 1200);
      }
    });
  }

  // =========================================================================
  // ZONE 4: THESE (MAGIC TABLE - MANY NEARBY OBJECTS)
  // =========================================================================
  function initZone4() {
    state.z4Round = 0;
    loadZ4Round();
  }

  function loadZ4Round() {
    const data = Z4_THESE_DATA[state.z4Round % Z4_THESE_DATA.length];
    let clusterHtml = '';
    for (let i = 0; i < data.count; i++) {
      clusterHtml += `<span style="margin:0 4px;">${data.emoji}</span>`;
    }
    dom.z4ObjectsCluster.innerHTML = clusterHtml;
    dom.z4NounTarget.textContent = data.noun;

    setRiyaAnimation('riya-idle');
    speak(`Look at all these ${data.noun.replace('.', '')} close to us! ${data.sentence}`);

    dom.btnActionThese.onclick = () => handleZ4Success(data);
    dom.z4ObjectsCluster.onclick = () => handleZ4Success(data);
  }

  function handleZ4Success(data) {
    sound.bounce();
    addStar();
    setRiyaAnimation('riya-celebrate', 2000);
    showToast(data.sentence, '🎈');

    // Bounce all nearby items
    const items = dom.z4ObjectsCluster.querySelectorAll('span');
    items.forEach((el, idx) => {
      setTimeout(() => sound.playTone(400 + idx * 100, 'sine', 0.2), idx * 80);
    });

    speak(data.sentence, () => {
      state.z4Round++;
      if (state.z4Round >= 3) {
        showToast('Zone 4 Complete! 🌟', '🏆');
        speak('Wonderful! THESE is for many nearby objects! Next is THOSE!', () => {
          setTimeout(() => showZone(5), 1600);
        });
      } else {
        setTimeout(loadZ4Round, 1200);
      }
    });
  }

  // =========================================================================
  // ZONE 5: THOSE (MAGICAL TELESCOPE PARADE - MANY DISTANT OBJECTS)
  // =========================================================================
  function initZone5() {
    state.z5Round = 0;
    loadZ5Round();
  }

  function loadZ5Round() {
    const data = Z5_THOSE_DATA[state.z5Round % Z5_THOSE_DATA.length];
    let clusterHtml = '';
    for (let i = 0; i < data.count; i++) {
      clusterHtml += `<span class="parade-item" style="display:inline-block; margin:0 5px; transform:scale(0.65);">${data.emoji}</span>`;
    }
    dom.z5DistantCluster.innerHTML = clusterHtml;
    dom.z5NounTarget.textContent = data.noun;

    if (dom.z5RainbowArc) dom.z5RainbowArc.style.opacity = '0.3';

    speak(`Look over there far in the sky! ${data.sentence}`);

    dom.btnActionThose.onclick = () => handleZ5Success(data);
    dom.z5DistantCluster.onclick = () => handleZ5Success(data);
  }

  function handleZ5Success(data) {
    sound.celebrate();
    addStar();
    setRiyaAnimation('riya-celebrate', 2200);
    showToast(data.sentence, '🌈');

    if (dom.z5RainbowArc) dom.z5RainbowArc.style.opacity = '0.9';

    // Fly balloons forward
    const items = dom.z5DistantCluster.querySelectorAll('.parade-item');
    items.forEach((item, i) => {
      item.style.transition = 'transform 1s ease-out';
      item.style.transform = `scale(1.2) translateY(${i % 2 === 0 ? -10 : 10}px)`;
    });

    speak(data.sentence, () => {
      state.z5Round++;
      if (state.z5Round >= 3) {
        showToast('All Zones Complete! 🌟', '🏆');
        speak('Spectacular! You know THIS, THAT, THESE, and THOSE! Let’s view the Magic Grid!', () => {
          setTimeout(() => showZone(6), 1800);
        });
      } else {
        setTimeout(loadZ5Round, 1200);
      }
    });
  }

  // =========================================================================
  // ZONE 6: THE MAGIC GRID
  // =========================================================================
  function initMagicGrid() {
    speak('Welcome to the Magic Grid! Tap any card to see how it works!');

    dom.gridCards.forEach(card => {
      card.onclick = () => {
        dom.gridCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const type = card.getAttribute('data-grid-type');
        let text = '';
        let displayHtml = '';

        if (type === 'this') {
          sound.pop();
          displayHtml = '<span style="font-size:64px;">📍 🎈</span>';
          text = 'THIS: One object close to you. "This is a balloon."';
        } else if (type === 'that') {
          sound.pop();
          displayHtml = '<span style="font-size:32px;">🔭 🎈</span>';
          text = 'THAT: One object far away. "That is a balloon."';
        } else if (type === 'these') {
          sound.bounce();
          displayHtml = '<span style="font-size:56px;">📍 🎈 🎈 🎈</span>';
          text = 'THESE: Many objects close to you. "These are balloons."';
        } else if (type === 'those') {
          sound.celebrate();
          displayHtml = '<span style="font-size:30px;">🔭 🎈 🎈 🎈 🎈</span>';
          text = 'THOSE: Many objects far away. "Those are balloons."';
        }

        dom.gridPreviewObjects.innerHTML = displayHtml;
        dom.gridPreviewText.textContent = text;
        speak(text);
      };
    });

    dom.btnGotoCelebration.onclick = () => showZone(7);
  }

  // =========================================================================
  // ZONE 7: CELEBRATION & CONFETTI
  // =========================================================================
  let confettiAnimationId = null;

  function initCelebration() {
    sound.celebrate();
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}
    setRiyaAnimation('riya-celebrate', 10000);
    speak('Congratulations! Riya and Little Star are so proud of you! You are a Magic Word Hero!');
    startConfetti();

    dom.btnGotoFreeplay.onclick = () => {
      stopConfetti();
      showZone(8);
    };

    dom.btnReplayAdventure.onclick = () => {
      stopConfetti();
      showZone(0);
    };
  }

  function startConfetti() {
    const canvas = dom.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const pieces = [];
    const colors = ['#ff4757', '#ffd32a', '#2ed573', '#70a1ff', '#ff6b81', '#ffffff'];

    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 4,
        d: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -20;
        }
      });

      confettiAnimationId = requestAnimationFrame(draw);
    }

    draw();
  }

  function stopConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
  }

  // =========================================================================
  // ZONE 8: FREE PLAY PLAYGROUND
  // =========================================================================
  function initFreeplay() {
    updateFreeplayStage();

    // Toggle Quantity
    document.querySelectorAll('[data-quantity]').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('[data-quantity]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.freeplay.quantity = btn.getAttribute('data-quantity');
        sound.pop();
        updateFreeplayStage();
      };
    });

    // Toggle Distance
    document.querySelectorAll('[data-distance]').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('[data-distance]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.freeplay.distance = btn.getAttribute('data-distance');
        sound.pop();
        updateFreeplayStage();
      };
    });

    // Palette Items
    document.querySelectorAll('.palette-item').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.palette-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.freeplay.object = btn.getAttribute('data-obj');
        sound.pop();
        updateFreeplayStage();
      };
    });

    // Randomizer Button
    dom.btnFreeplayRandom.onclick = () => {
      const q = Math.random() > 0.5 ? 'one' : 'many';
      const d = Math.random() > 0.5 ? 'near' : 'far';
      const objs = Object.keys(OBJECT_EMOJIS);
      const o = objs[Math.floor(Math.random() * objs.length)];

      state.freeplay.quantity = q;
      state.freeplay.distance = d;
      state.freeplay.object = o;

      // Update UI Toggles
      document.querySelectorAll('[data-quantity]').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-quantity') === q);
      });
      document.querySelectorAll('[data-distance]').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-distance') === d);
      });
      document.querySelectorAll('.palette-item').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-obj') === o);
      });

      sound.sparkle();
      updateFreeplayStage();
    };

    dom.btnFreeplaySpeak.onclick = () => {
      const sentence = dom.freeplaySentenceText.textContent;
      speak(sentence);
    };

    dom.btnFreeplayExit.onclick = () => showZone(0);
  }

  function updateFreeplayStage() {
    const { quantity, distance, object } = state.freeplay;
    const emoji = OBJECT_EMOJIS[object] || '🎈';

    let count = quantity === 'one' ? 1 : 4;
    let isNear = distance === 'near';
    let isOne = quantity === 'one';

    // Educational Grammar Sentence Construction
    let magicWord = '';
    let verb = isOne ? 'is' : 'are';
    let article = isOne ? (['apple'].includes(object) ? 'an ' : 'a ') : '';
    let noun = isOne ? object : (object === 'tree' ? 'trees' : object + 's');

    if (isOne && isNear) magicWord = 'This';
    if (isOne && !isNear) magicWord = 'That';
    if (!isOne && isNear) magicWord = 'These';
    if (!isOne && !isNear) magicWord = 'Those';

    const fullSentence = `${magicWord} ${verb} ${article}${noun}.`;
    dom.freeplaySentenceText.textContent = `“${fullSentence}”`;

    // Render in Playground with Visual Near/Far Distinction
    let itemsHtml = '';
    const fontSize = isNear ? '64px' : '30px';
    const scaleClass = isNear ? 'bounce-pulse' : 'scale-small';

    for (let i = 0; i < count; i++) {
      itemsHtml += `<span class="${scaleClass}" style="display:inline-block; font-size:${fontSize}; margin:0 6px;">${emoji}</span>`;
    }

    dom.freeplayDisplayContainer.innerHTML = itemsHtml;
    speak(fullSentence);
  }

  // =========================================================================
  // GLOBAL LISTENERS & INITIALIZATION
  // =========================================================================
  function initGame() {
    // Sound Toggle Button
    dom.btnSound.onclick = () => {
      sound.enabled = !sound.enabled;
      dom.btnSound.textContent = sound.enabled ? '🔊' : '🔇';
      showToast(sound.enabled ? 'Sound ON' : 'Sound OFF', '🎵');
    };

    // Repeat Voice Button
    dom.btnRepeatVoice.onclick = () => {
      if (lastSpokenText) {
        speak(lastSpokenText);
      }
    };

    // Home Button
    dom.btnHome.onclick = () => {
      showZone(0);
    };

    // Dialogue Next & Start Carnival Buttons
    dom.btnNextDialogue.onclick = nextIntroDialogue;
    dom.btnStartCarnival.onclick = () => showZone(1);

    // Quick Zone Chips
    document.querySelectorAll('[data-goto-zone]').forEach(btn => {
      btn.onclick = () => {
        const z = parseInt(btn.getAttribute('data-goto-zone'), 10);
        showZone(z);
      };
    });

    // Footer Step Navigation
    dom.footerSteps.forEach(step => {
      step.onclick = () => {
        const z = parseInt(step.getAttribute('data-zone'), 10);
        showZone(z);
      };
    });

    // Little Star Tap Reaction
    dom.charStar.onclick = () => {
      sound.sparkle();
      dom.charStar.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        dom.charStar.style.transform = '';
      }, 600);
      speak('Twinkle twinkle little star! I am your magic guide!');
    };

    // Riya Tap Reaction
    dom.charRiya.onclick = () => {
      sound.celebrate();
      setRiyaAnimation('riya-celebrate', 1500);
      speak('Hi! I am Riya! Let us learn magic words together!');
    };

    // Start with Opening Screen
    showZone(0);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }

})();
