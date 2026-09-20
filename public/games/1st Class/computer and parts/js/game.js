/**
 * Computer Quest - Master Game Controller
 * Designed specifically for Class 1 children (5-7 years old).
 */

const GameController = {
  missionSequence: ['monitor', 'cpu', 'keyboard', 'mouse', 'speaker', 'printer'],

  gameState: {
    phase: 'INTRO', // INTRO | HUNT | DEMO | CHALLENGE | CELEBRATION | FREEPLAY
    currentMissionIndex: 0,
    collectedParts: [],
    mistakes: 0,
    challengeIndex: 0
  },

  challenges: [
    {
      questionText: 'Which part helps us type?',
      speechText: 'Which part helps us type?',
      correctId: 'keyboard',
      options: ['mouse', 'keyboard', 'speaker']
    },
    {
      questionText: 'Which part helps us see?',
      speechText: 'Which part helps us see?',
      correctId: 'monitor',
      options: ['monitor', 'cpu', 'printer']
    },
    {
      questionText: 'Which part gives us sound?',
      speechText: 'Which part gives us sound?',
      correctId: 'speaker',
      options: ['speaker', 'mouse', 'keyboard']
    }
  ],

  init() {
    AnimationController.init();
    TeacherMode.init();
    this.renderLabItems();

    DragDropController.init(
      (data, el) => this.handleCorrectDrop(data, el),
      (data, attempts) => this.handleWrongDrop(data, attempts)
    );

    // Bind Quick Voice / Replay click on guide speech bubble
    const bubble = document.getElementById('guide-speech-bubble');
    if (bubble) {
      bubble.addEventListener('click', () => this.replayInstruction());
    }

    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }
  },

  startGame() {
    AudioController.initAudioContext();
    const overlay = document.getElementById('start-overlay');
    if (overlay) overlay.style.display = 'none';

    this.setSpeech("Welcome to the Computer Lab! Our computer is missing some parts. Let's find them!", () => {
      this.startMission(0);
    });
  },

  restart() {
    AudioController.stopVoice();
    this.gameState.phase = 'INTRO';
    this.gameState.currentMissionIndex = 0;
    this.gameState.collectedParts = [];
    this.gameState.mistakes = 0;
    this.gameState.challengeIndex = 0;

    // Reset Slots
    Object.keys(GameAssets.parts).forEach(partId => {
      const slot = document.getElementById(`slot-${partId}`);
      if (slot) {
        slot.classList.remove('filled', 'power-on');
        slot.innerHTML = `<div class="slot-blueprint"><span class="blueprint-icon">${GameAssets.parts[partId].badge}</span><span class="blueprint-name">${GameAssets.parts[partId].name}</span></div>`;
      }
    });

    // Reset Counter
    this.updateCounter();

    // Hide overlays
    this.hideAllModals();

    // Re-render items
    this.renderLabItems();

    this.startGame();
  },

  renderLabItems() {
    const roomContainer = document.getElementById('lab-items-shelf');
    if (!roomContainer) return;
    roomContainer.innerHTML = '';

    // Mix 6 target parts with distractors
    const itemsToPlace = [];

    // All 6 parts
    Object.values(GameAssets.parts).forEach(p => {
      itemsToPlace.push({
        id: p.id,
        name: p.name,
        img: p.img,
        fallbackImg: p.fallbackImg,
        isPart: true,
        slotId: p.slotId,
        badge: p.badge
      });
    });

    // 6 distractors
    const selectedDistractors = GameAssets.distractors.slice(0, 6);
    selectedDistractors.forEach(d => {
      itemsToPlace.push({
        id: d.id,
        name: d.name,
        img: d.img,
        fallbackImg: d.fallbackImg,
        isPart: false,
        badge: '📦'
      });
    });

    // Shuffle positions
    itemsToPlace.sort(() => Math.random() - 0.5);

    itemsToPlace.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `lab-item-card item-${item.id}`;
      card.id = `lab-item-${item.id}`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', item.name);

      card.innerHTML = `
        <div class="item-halo"></div>
        <img class="item-image" src="${item.img}" alt="${item.name}" onerror="this.src='${item.fallbackImg}'" draggable="false" />
        <div class="item-label">${item.name}</div>
      `;

      roomContainer.appendChild(card);
      DragDropController.makeDraggable(card, item);
    });
  },

  startMission(index) {
    if (index >= this.missionSequence.length) {
      this.startFinalChallenge();
      return;
    }

    this.gameState.phase = 'HUNT';
    this.gameState.currentMissionIndex = index;
    this.gameState.mistakes = 0;
    DragDropController.resetAttempts();

    const partKey = this.missionSequence[index];
    const part = GameAssets.parts[partKey];

    // Remove hints from all items
    document.querySelectorAll('.lab-item-card').forEach(el => {
      el.classList.remove('target-hint', 'target-glow');
    });

    // Speak mission instruction
    this.setSpeech(`Find the ${part.name}!`, () => {
      AnimationController.setGuideState('pointing');
    });

    // Highlight target slot gently
    const targetSlot = document.getElementById(part.slotId);
    if (targetSlot) {
      targetSlot.classList.add('waiting-drop');
    }
  },

  handleCorrectDrop(data, element) {
    const currentPartKey = this.missionSequence[this.gameState.currentMissionIndex];
    if (data.id !== currentPartKey) {
      return false;
    }

    // Success!
    this.gameState.phase = 'DEMO';
    this.gameState.collectedParts.push(data.id);
    this.updateCounter();

    // Lock into desk slot
    const part = GameAssets.parts[data.id];
    const slot = document.getElementById(part.slotId);
    if (slot) {
      slot.classList.remove('waiting-drop');
      slot.classList.add('filled');
      slot.innerHTML = `
        <div class="placed-part placed-${part.id}">
          <img src="${part.img}" alt="${part.name}" onerror="this.src='${part.fallbackImg}'" draggable="false" />
        </div>
      `;
      AnimationController.sparkleAtElement(slot);
    }

    // Hide dragged card from lab shelf
    element.style.display = 'none';

    AudioController.playSnap();
    setTimeout(() => AudioController.playSuccess(), 100);
    AnimationController.setGuideState('happy');

    // Trigger Interactive Micro-Demo for this part
    this.showPartMicroDemo(part);

    return true;
  },

  handleWrongDrop(data, attempts) {
    this.gameState.mistakes++;
    const currentPartKey = this.missionSequence[this.gameState.currentMissionIndex];
    const currentPart = GameAssets.parts[currentPartKey];
    const targetCard = document.getElementById(`lab-item-${currentPart.id}`);

    if (attempts === 1) {
      this.setSpeech("Let's try again!");
    } else if (attempts === 2) {
      this.setSpeech(`Look for the ${currentPart.name}!`);
      if (targetCard) targetCard.classList.add('target-hint');
      AnimationController.setGuideState('pointing');
    } else {
      this.setSpeech(`Here is the ${currentPart.name}!`);
      if (targetCard) targetCard.classList.add('target-glow');
      AnimationController.setGuideState('pointing');
    }
  },

  showPartMicroDemo(part) {
    const modal = document.getElementById('micro-demo-modal');
    const content = document.getElementById('demo-content');
    if (!modal || !content) return;

    modal.classList.add('active');

    // Speech: Part Name & Function
    this.setSpeech(part.speechSuccess);

    // Build specific interactive functional demo
    let demoHtml = '';

    if (part.id === 'monitor') {
      demoHtml = `
        <div class="demo-card demo-monitor-view">
          <div class="demo-badge">🖥️ MONITOR</div>
          <p class="demo-desc">"We use the monitor to <strong>SEE</strong>!"</p>
          <div class="mini-screen-display">
            <div class="animated-scene">
              <span class="scene-rocket">🚀</span>
              <span class="scene-rainbow">🌈</span>
              <span class="scene-star star-1">⭐</span>
              <span class="scene-star star-2">✨</span>
            </div>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Awesome! Next Part ➔</button>
        </div>
      `;
    } else if (part.id === 'cpu') {
      demoHtml = `
        <div class="demo-card demo-cpu-view">
          <div class="demo-badge">🎛️ CPU / SYSTEM UNIT</div>
          <p class="demo-desc">"The CPU is the <strong>BRAIN</strong> that helps the computer work!"</p>
          <div class="cpu-energy-box">
            <div class="energy-core">💡</div>
            <div class="energy-circuits">
              <span class="pulse-line">⚡⚡⚡</span>
            </div>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Awesome! Next Part ➔</button>
        </div>
      `;
    } else if (part.id === 'keyboard') {
      demoHtml = `
        <div class="demo-card demo-keyboard-view">
          <div class="demo-badge">⌨️ KEYBOARD</div>
          <p class="demo-desc">"We use the keyboard to <strong>TYPE</strong>!"</p>
          <div class="keyboard-interactive-box">
            <div class="typed-text-screen" id="typed-text-output">HELLO!</div>
            <div class="mini-keys-row">
              <button class="mini-key" onclick="GameController.handleDemoKey('A')">A</button>
              <button class="mini-key" onclick="GameController.handleDemoKey('B')">B</button>
              <button class="mini-key" onclick="GameController.handleDemoKey('C')">C</button>
              <button class="mini-key" onclick="GameController.handleDemoKey('★')">★</button>
              <button class="mini-key" onclick="GameController.handleDemoKey('1')">1</button>
              <button class="mini-key" onclick="GameController.handleDemoKey('2')">2</button>
            </div>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Awesome! Next Part ➔</button>
        </div>
      `;
    } else if (part.id === 'mouse') {
      demoHtml = `
        <div class="demo-card demo-mouse-view">
          <div class="demo-badge">🖱️ MOUSE</div>
          <p class="demo-desc">"We use the mouse to <strong>POINT & CLICK</strong>!"</p>
          <div class="mouse-interactive-box" id="mouse-catch-arena" onclick="GameController.handleStarCatch(event)">
            <div class="floating-star" id="catch-star">⭐ Click Me!</div>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Awesome! Next Part ➔</button>
        </div>
      `;
    } else if (part.id === 'speaker') {
      demoHtml = `
        <div class="demo-card demo-speaker-view">
          <div class="demo-badge">🔊 SPEAKERS</div>
          <p class="demo-desc">"Speakers give us <strong>SOUND & MUSIC</strong>!"</p>
          <div class="speaker-sound-box">
            <div class="sound-bars">
              <div class="s-bar b1"></div>
              <div class="s-bar b2"></div>
              <div class="s-bar b3"></div>
              <div class="s-bar b4"></div>
              <div class="s-bar b5"></div>
            </div>
            <button class="btn-play-sound" onclick="AudioController.playSpeakerTune()">🎵 Play Sound</button>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Awesome! Next Part ➔</button>
        </div>
      `;
      // Play tune automatically
      setTimeout(() => AudioController.playSpeakerTune(), 400);
    } else if (part.id === 'printer') {
      demoHtml = `
        <div class="demo-card demo-printer-view">
          <div class="demo-badge">🖨️ PRINTER</div>
          <p class="demo-desc">"The printer <strong>PRINTS</strong> our work on paper!"</p>
          <div class="printer-output-box">
            <div class="printed-sheet animated-print">
              <span>🤖 Happy Computer! ⭐</span>
            </div>
          </div>
          <button class="btn-demo-action" id="btn-next-part">Assemble Completed! ➔</button>
        </div>
      `;
      setTimeout(() => AudioController.playPrint(), 200);
    }

    content.innerHTML = demoHtml;

    const nextBtn = document.getElementById('btn-next-part');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        this.startMission(this.gameState.currentMissionIndex + 1);
      });
    }
  },

  handleDemoKey(char) {
    const out = document.getElementById('typed-text-output');
    if (out) {
      out.textContent += ` ${char}`;
    }
    AudioController.playKeyClick(Math.floor(Math.random() * 7));
  },

  handleStarCatch(e) {
    const star = document.getElementById('catch-star');
    if (star) {
      star.style.transform = 'scale(1.4) rotate(20deg)';
      star.textContent = '🌟 Caught!';
      AudioController.playStarCatch();
      AnimationController.sparkleAtElement(star);
      setTimeout(() => {
        star.style.transform = '';
        star.textContent = '⭐ Click Me!';
      }, 700);
    }
  },

  updateCounter() {
    const countEl = document.getElementById('parts-counter-text');
    const count = this.gameState.collectedParts.length;
    if (countEl) {
      countEl.textContent = `⭐ Parts: ${count}/6`;
    }
  },

  // --- Final Mini Challenge ---
  startFinalChallenge() {
    this.gameState.phase = 'CHALLENGE';
    this.gameState.challengeIndex = 0;
    this.showChallengeStep(0);
  },

  showChallengeStep(stepIndex) {
    if (stepIndex >= this.challenges.length) {
      this.completeFinalChallenge();
      return;
    }

    const c = this.challenges[stepIndex];
    const modal = document.getElementById('challenge-modal');
    if (!modal) return;
    modal.classList.add('active');

    this.setSpeech(c.speechText);

    const questionTitle = document.getElementById('challenge-question-text');
    if (questionTitle) questionTitle.textContent = c.questionText;

    const optionsContainer = document.getElementById('challenge-options-row');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    c.options.forEach(optId => {
      const part = GameAssets.parts[optId];
      const card = document.createElement('div');
      card.className = 'challenge-option-card';
      card.dataset.partId = optId;
      card.innerHTML = `
        <img src="${part.img}" alt="${part.name}" onerror="this.src='${part.fallbackImg}'" draggable="false" />
        <div class="challenge-opt-label">${part.name}</div>
      `;

      card.addEventListener('click', () => {
        this.handleChallengeAnswer(optId, c.correctId, card);
      });

      optionsContainer.appendChild(card);
    });
  },

  handleChallengeAnswer(selectedId, correctId, cardElement) {
    if (selectedId === correctId) {
      cardElement.classList.add('correct-glow');
      AudioController.playSuccess();
      AnimationController.sparkleAtElement(cardElement);
      this.setSpeech("Great job! That's correct!", () => {
        setTimeout(() => {
          this.gameState.challengeIndex++;
          this.showChallengeStep(this.gameState.challengeIndex);
        }, 1000);
      });
    } else {
      cardElement.classList.add('wrong-shake');
      AudioController.playWrong();
      this.setSpeech("Let's try again!");
      setTimeout(() => {
        cardElement.classList.remove('wrong-shake');
      }, 500);
    }
  },

  completeFinalChallenge() {
    const modal = document.getElementById('challenge-modal');
    if (modal) modal.classList.remove('active');

    // Power ON Sequence!
    this.gameState.phase = 'CELEBRATION';
    AudioController.playPowerOn();

    // Light up all slots!
    document.querySelectorAll('.build-slot').forEach(slot => {
      slot.classList.add('power-on');
    });

    AnimationController.celebrate();
    AudioController.playVictoryFanfare();

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}

    this.setSpeech("Amazing! You built your computer! You are a Computer Master!", () => {
      this.showCelebrationModal();
    });
  },

  showCelebrationModal() {
    const modal = document.getElementById('celebration-modal');
    if (modal) modal.classList.add('active');

    const btnFreePlay = document.getElementById('btn-enter-freeplay');
    if (btnFreePlay) {
      btnFreePlay.onclick = () => {
        modal.classList.remove('active');
        this.enterFreePlayMode();
      };
    }
  },

  enterFreePlayMode() {
    this.gameState.phase = 'FREEPLAY';
    this.setSpeech("Welcome to 'My Computer' Free Play! Click on your computer parts to play!");

    // Enable interactive clicks on placed computer parts
    const monitorSlot = document.getElementById('slot-monitor');
    if (monitorSlot) {
      monitorSlot.style.cursor = 'pointer';
      monitorSlot.onclick = () => {
        AudioController.playStarCatch();
        this.setSpeech("The monitor shows colorful pictures!");
        AnimationController.sparkleAtElement(monitorSlot);
      };
    }

    const kbSlot = document.getElementById('slot-keyboard');
    if (kbSlot) {
      kbSlot.style.cursor = 'pointer';
      kbSlot.onclick = () => {
        AudioController.playKeyClick(Math.floor(Math.random() * 6));
        this.setSpeech("Typing words on the keyboard: A B C 1 2 3!");
      };
    }

    const mouseSlot = document.getElementById('slot-mouse');
    if (mouseSlot) {
      mouseSlot.style.cursor = 'pointer';
      mouseSlot.onclick = () => {
        AudioController.playPickup();
        this.setSpeech("Clicking with the mouse: Click! Click!");
      };
    }

    const speakerSlot = document.getElementById('slot-speaker');
    if (speakerSlot) {
      speakerSlot.style.cursor = 'pointer';
      speakerSlot.onclick = () => {
        AudioController.playSpeakerTune();
        this.setSpeech("Playing happy music from the speakers!");
      };
    }

    const printerSlot = document.getElementById('slot-printer');
    if (printerSlot) {
      printerSlot.style.cursor = 'pointer';
      printerSlot.onclick = () => {
        AudioController.playPrint();
        this.setSpeech("The printer is printing your masterpiece!");
        AnimationController.sparkleAtElement(printerSlot);
      };
    }
  },

  setSpeech(text, onEnd = null) {
    const textEl = document.getElementById('guide-speech-text');
    if (textEl) {
      textEl.textContent = text;
      textEl.classList.remove('pop-text');
      void textEl.offsetWidth; // trigger reflow
      textEl.classList.add('pop-text');
    }
    AnimationController.setGuideState('talking');
    AudioController.speak(text, () => {
      AnimationController.setGuideState('idle');
      if (onEnd) onEnd();
    });
  },

  replayInstruction() {
    const textEl = document.getElementById('guide-speech-text');
    if (textEl && textEl.textContent) {
      this.setSpeech(textEl.textContent);
    }
  },

  hideAllModals() {
    ['start-overlay', 'micro-demo-modal', 'challenge-modal', 'celebration-modal', 'teacher-modal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  GameAssets.preload().then(() => {
    GameController.init();
  });
});
