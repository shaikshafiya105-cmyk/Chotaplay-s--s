/**
 * ===================================================
 * CHOTAPLAY — ANIMAL JUMBLED LETTER PUZZLE
 * Pure Vanilla JavaScript Application Logic
 * ===================================================
 */

// Centralized 31 Animal Puzzles using verified real image assets
const PUZZLES = [
  { word: "CAT", displayName: "Cat", image: "assets/animals/cat.webp" },
  { word: "COW", displayName: "Cow", image: "assets/animals/cow.webp" },
  { word: "PIG", displayName: "Pig", image: "assets/animals/pig.webp" },
  { word: "FOX", displayName: "Fox", image: "assets/animals/fox.webp" },
  { word: "DOG", displayName: "Dog", image: "assets/animals/german shepherd.webp" },
  { word: "LION", displayName: "Lion", image: "assets/animals/lion.webp" },
  { word: "BEAR", displayName: "Bear", image: "assets/animals/bear.webp" },
  { word: "DEER", displayName: "Deer", image: "assets/animals/deer.webp" },
  { word: "DUCK", displayName: "Duck", image: "assets/animals/duck.webp" },
  { word: "FISH", displayName: "Fish", image: "assets/animals/fish.webp" },
  { word: "GOAT", displayName: "Goat", image: "assets/animals/goat.webp" },
  { word: "WOLF", displayName: "Wolf", image: "assets/animals/wolf.webp" },
  { word: "CAMEL", displayName: "Camel", image: "assets/animals/camel.webp" },
  { word: "HORSE", displayName: "Horse", image: "assets/animals/horse.webp" },
  { word: "HIPPO", displayName: "Hippo", image: "assets/animals/hippo.webp" },
  { word: "PANDA", displayName: "Panda", image: "assets/animals/panda.webp" },
  { word: "SHEEP", displayName: "Sheep", image: "assets/animals/sheep.webp" },
  { word: "SNAKE", displayName: "Snake", image: "assets/animals/snake.webp" },
  { word: "TIGER", displayName: "Tiger", image: "assets/animals/tiger.webp" },
  { word: "ZEBRA", displayName: "Zebra", image: "assets/animals/zebra.webp" },
  { word: "MONKEY", displayName: "Monkey", image: "assets/animals/monkey.webp" },
  { word: "RABBIT", displayName: "Rabbit", image: "assets/animals/rabbit.webp" },
  { word: "TURTLE", displayName: "Turtle", image: "assets/animals/turtle.webp" },
  { word: "GORILLA", displayName: "Gorilla", image: "assets/animals/gorilla.webp" },
  { word: "GIRAFFE", displayName: "Giraffe", image: "assets/animals/giraffe.webp" },
  { word: "CHEETAH", displayName: "Cheetah", image: "assets/animals/cheetah.webp" },
  { word: "ELEPHANT", displayName: "Elephant", image: "assets/animals/elephant.webp" },
  { word: "KANGAROO", displayName: "Kangaroo", image: "assets/animals/kangaroo.webp" },
  { word: "MONGOOSE", displayName: "Mongoose", image: "assets/animals/mongoose.webp" },
  { word: "CROCODILE", displayName: "Crocodile", image: "assets/animals/rocodile.webp" },
  { word: "CHIMPANZEE", displayName: "Chimpanzee", image: "assets/animals/chimpanzee.webp" }
];

// Game State
let currentPuzzleIndex = 0;
let currentWord = "";
let currentLetters = [];
let solvedLetters = [];
let jumbledTiles = [];
let isPuzzleSolved = false;
let solvedPuzzlesSet = new Set();
let soundEnabled = true;
let audioCtx = null;

// DOM Elements
const puzzleProgressText = document.getElementById("puzzleProgressText");
const btnSoundToggle = document.getElementById("btnSoundToggle");
const soundIcon = document.getElementById("soundIcon");
const soundLabel = document.getElementById("soundLabel");
const btnHint = document.getElementById("btnHint");
const btnResetPuzzle = document.getElementById("btnResetPuzzle");
const btnPuzzleList = document.getElementById("btnPuzzleList");

const riyaBubble = document.getElementById("riyaBubble");
const riyaMessage = document.getElementById("riyaMessage");
const johnBubble = document.getElementById("johnBubble");
const johnMessage = document.getElementById("johnMessage") || { textContent: "" };

const starMessage = document.getElementById("starMessage");
const mysteryUnsolvedView = document.getElementById("mysteryUnsolvedView");
const mysterySolvedView = document.getElementById("mysterySolvedView");
const realAnimalImage = document.getElementById("realAnimalImage");
const animalSolvedName = document.getElementById("animalSolvedName");
const letterCountBadge = document.getElementById("letterCountBadge");

const wordSlotsContainer = document.getElementById("wordSlotsContainer");
const letterTilesContainer = document.getElementById("letterTilesContainer");

const btnPrevPuzzle = document.getElementById("btnPrevPuzzle");
const btnNextPuzzle = document.getElementById("btnNextPuzzle");
const btnSkipPuzzle = document.getElementById("btnSkipPuzzle");

const puzzlesModal = document.getElementById("puzzlesModal");
const btnCloseModal = document.getElementById("btnCloseModal");
const puzzlesGrid = document.getElementById("puzzlesGrid");
const confettiCanvas = document.getElementById("confettiCanvas");

// Confetti Particle Engine
let confettiParticles = [];
let confettiAnimId = null;

/**
 * Initialize Web Audio API for rich, zero-dependency sound effects
 */
function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

/**
 * Play synthesizer sound effects
 */
function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;

    if (type === "pop") {
      // Cheerful bubble pop on letter tap
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "wrong") {
      // Soft gentle boing wiggle
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "victory") {
      // Sparkling victory fanfare
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.3, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } else if (type === "whoosh") {
      // Magical unlock shimmer
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.log("Audio play suppressed:", e);
  }
}

/**
 * Friendly Speech Synthesis
 */
function speakText(text) {
  if (!soundEnabled || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.log("Speech synthesis suppressed:", e);
  }
}

/**
 * Shuffle letters guaranteed to not match the original word order
 */
function shuffleLetters(word) {
  const letters = word.split("");
  let shuffled = [...letters];
  
  if (shuffled.length > 1) {
    let attempts = 0;
    while (attempts < 20) {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      if (shuffled.join("") !== word) {
        break;
      }
      attempts++;
    }
  }
  
  // Return array of objects with unique IDs for handling duplicate letters
  return shuffled.map((char, index) => ({
    id: `tile_${index}_${char}_${Math.random().toString(36).substr(2, 5)}`,
    letter: char,
    isUsed: false
  }));
}

/**
 * Load a Puzzle by Index
 */
function loadPuzzle(index) {
  if (index < 0) index = 0;
  if (index >= PUZZLES.length) index = PUZZLES.length - 1;

  currentPuzzleIndex = index;
  const puzzle = PUZZLES[currentPuzzleIndex];
  currentWord = puzzle.word.toUpperCase();
  currentLetters = currentWord.split("");
  solvedLetters = [];
  isPuzzleSolved = false;

  // Jumble letters
  jumbledTiles = shuffleLetters(currentWord);

  // Update Header Progress
  puzzleProgressText.textContent = `Puzzle ${currentPuzzleIndex + 1} of ${PUZZLES.length}`;

  // Reset Mystery Card View
  showMystery();

  // Reset Character Bubbles to initial cheerful guide state
  starMessage.textContent = "Can you unlock the animal?";
  riyaMessage.textContent = "Let's solve the puzzle!";
  johnMessage.textContent = "Tap the first letter!";

  // Reset Next Button state
  btnNextPuzzle.classList.remove("pulse-ready");

  // Render Slots & Letter Tiles
  renderSlots();
  renderLetters();
}

/**
 * Show Locked Mystery View
 */
function showMystery() {
  mysteryUnsolvedView.style.display = "flex";
  mysterySolvedView.style.display = "none";
  letterCountBadge.textContent = `${currentWord.length} Letters`;
  wordSlotsContainer.classList.remove("solved-glow");
}

/**
 * Render Answer Word Slots (_ _ _)
 */
function renderSlots() {
  wordSlotsContainer.innerHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    const slot = document.createElement("div");
    slot.className = "word-slot";
    slot.id = `slot_${i}`;

    if (i < solvedLetters.length) {
      slot.textContent = solvedLetters[i];
      slot.classList.add("filled");
    } else if (i === solvedLetters.length && !isPuzzleSolved) {
      slot.textContent = "";
      slot.classList.add("active-target");
    } else {
      slot.textContent = "";
    }

    wordSlotsContainer.appendChild(slot);
  }
}

/**
 * Render Jumbled Letter Tiles
 */
function renderLetters() {
  letterTilesContainer.innerHTML = "";

  jumbledTiles.forEach(tileObj => {
    const btn = document.createElement("button");
    btn.className = "letter-tile-btn";
    btn.id = tileObj.id;
    btn.textContent = tileObj.letter;
    btn.setAttribute("aria-label", `Letter ${tileObj.letter}`);

    if (tileObj.isUsed) {
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => selectLetter(tileObj, btn));
    }

    letterTilesContainer.appendChild(btn);
  });
}

/**
 * Handle Tile Click Interaction
 */
function selectLetter(tileObj, buttonElement) {
  if (isPuzzleSolved || tileObj.isUsed) return;

  const nextRequiredIndex = solvedLetters.length;
  const targetLetter = currentLetters[nextRequiredIndex];

  if (tileObj.letter === targetLetter) {
    // CORRECT LETTER
    handleCorrectLetter(tileObj, buttonElement, nextRequiredIndex);
  } else {
    // WRONG LETTER
    handleWrongLetter(buttonElement);
  }
}

/**
 * Handle Correct Letter Selection
 */
function handleCorrectLetter(tileObj, buttonElement, slotIndex) {
  tileObj.isUsed = true;
  buttonElement.classList.add("correct-bounce");
  buttonElement.disabled = true;

  // Add to solved list
  solvedLetters.push(tileObj.letter);

  // Play crisp pop sound
  playSound("pop");

  // Little Star feedback
  starMessage.textContent = "Yes! 🌟";

  // Render updated slots
  renderSlots();

  // Check if complete
  if (solvedLetters.length === currentLetters.length) {
    completePuzzle();
  }
}

/**
 * Handle Wrong Letter Selection
 */
function handleWrongLetter(buttonElement) {
  // Gentle wiggle animation
  buttonElement.classList.remove("gentle-wiggle");
  void buttonElement.offsetWidth; // Trigger reflow
  buttonElement.classList.add("gentle-wiggle");

  // Play soft friendly tone
  playSound("wrong");

  // Friendly encouraging guidance (NO reset, NO punishment!)
  starMessage.textContent = "Try another letter! 😊";
  johnMessage.textContent = "Keep trying! You got this!";

  setTimeout(() => {
    buttonElement.classList.remove("gentle-wiggle");
  }, 500);
}

/**
 * Word Completion & Animal Reveal Sequence (The WOW Moment)
 */
function completePuzzle() {
  isPuzzleSolved = true;
  const puzzle = PUZZLES[currentPuzzleIndex];

  // Make completed word glow and dance
  wordSlotsContainer.classList.add("solved-glow");

  // Sounds
  playSound("victory");
  playSound("whoosh");

  // Trigger Confetti Burst
  startConfetti();

  // Reveal Mystery Animal Card
  setTimeout(() => {
    mysteryUnsolvedView.style.display = "none";
    realAnimalImage.src = puzzle.image;
    realAnimalImage.alt = puzzle.displayName;
    animalSolvedName.textContent = puzzle.displayName;
    mysterySolvedView.style.display = "flex";

    // Character Reactions per specifications
    riyaMessage.textContent = "Wow!";
    johnMessage.textContent = "We found it!";
    starMessage.textContent = `Great job! ${puzzle.displayName}! 🐾`;

    // Speak animal name
    speakText(`Great job! ${puzzle.displayName}!`);

    // Track completed puzzles
    solvedPuzzlesSet.add(currentPuzzleIndex);
    if (solvedPuzzlesSet.size >= PUZZLES.length || currentPuzzleIndex === PUZZLES.length - 1) {
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}
    }

    // Pulse the Next Puzzle button
    btnNextPuzzle.classList.add("pulse-ready");
  }, 350);
}

/**
 * Load Next Puzzle
 */
function loadNextPuzzle() {
  stopConfetti();
  if (currentPuzzleIndex < PUZZLES.length - 1) {
    loadPuzzle(currentPuzzleIndex + 1);
  } else {
    // Loop back or show completion
    loadPuzzle(0);
  }
}

/**
 * Load Previous Puzzle
 */
function loadPrevPuzzle() {
  stopConfetti();
  if (currentPuzzleIndex > 0) {
    loadPuzzle(currentPuzzleIndex - 1);
  } else {
    loadPuzzle(PUZZLES.length - 1);
  }
}

/**
 * Restart Current Puzzle
 */
function resetCurrentPuzzle() {
  stopConfetti();
  loadPuzzle(currentPuzzleIndex);
}

/**
 * Provide a helpful hint
 */
function giveHint() {
  if (isPuzzleSolved) return;

  const nextIndex = solvedLetters.length;
  const targetLetter = currentLetters[nextIndex];

  // Find unused matching tile
  const matchingTile = jumbledTiles.find(t => t.letter === targetLetter && !t.isUsed);
  if (matchingTile) {
    const btn = document.getElementById(matchingTile.id);
    if (btn) {
      btn.classList.remove("gentle-wiggle");
      btn.classList.add("correct-bounce");
      starMessage.textContent = `Tap '${targetLetter}' next! ⭐`;
      setTimeout(() => {
        btn.classList.remove("correct-bounce");
      }, 800);
    }
  }
}

/**
 * Build & Open All Puzzles Drawer/Modal
 */
function openPuzzlesModal() {
  puzzlesGrid.innerHTML = "";

  PUZZLES.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "puzzle-grid-card";
    if (idx === currentPuzzleIndex) card.classList.add("active-card");

    card.innerHTML = `
      <img src="${p.image}" alt="${p.displayName}" loading="lazy">
      <span class="grid-card-name">${p.displayName}</span>
      <span class="grid-card-num">Puzzle ${idx + 1} (${p.word.length}L)</span>
    `;

    card.addEventListener("click", () => {
      puzzlesModal.style.display = "none";
      puzzlesModal.setAttribute("aria-hidden", "true");
      loadPuzzle(idx);
    });

    puzzlesGrid.appendChild(card);
  });

  puzzlesModal.style.display = "flex";
  puzzlesModal.setAttribute("aria-hidden", "false");
}

function closePuzzlesModal() {
  puzzlesModal.style.display = "none";
  puzzlesModal.setAttribute("aria-hidden", "true");
}

/**
 * Sound & Voice Toggle
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundIcon.textContent = "🔊";
    soundLabel.textContent = "Sound ON";
    btnSoundToggle.classList.remove("muted");
    initAudio();
  } else {
    soundIcon.textContent = "🔇";
    soundLabel.textContent = "Sound OFF";
    btnSoundToggle.classList.add("muted");
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

/**
 * Confetti & Sparkle Canvas Animation
 */
function initConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  });
}

function startConfetti() {
  initConfettiCanvas();
  const colors = ["#ff4757", "#2ed573", "#ffa502", "#1e90ff", "#9b59b6", "#ff6b81", "#ffd32a"];
  confettiParticles = [];

  for (let i = 0; i < 90; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 2 - 50,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1.2) * 12 - 2,
      size: Math.random() * 9 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      opacity: 1
    });
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  renderConfetti();
}

function renderConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let activeCount = 0;
  confettiParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.opacity -= 0.007;

    if (p.opacity > 0 && p.y < confettiCanvas.height) {
      activeCount++;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    }
  });

  if (activeCount > 0) {
    confettiAnimId = requestAnimationFrame(renderConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

function stopConfetti() {
  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

/**
 * Event Listeners & Start
 */
function initEvents() {
  btnSoundToggle.addEventListener("click", toggleSound);
  btnHint.addEventListener("click", giveHint);
  btnResetPuzzle.addEventListener("click", resetCurrentPuzzle);
  btnPuzzleList.addEventListener("click", openPuzzlesModal);
  btnCloseModal.addEventListener("click", closePuzzlesModal);

  btnNextPuzzle.addEventListener("click", loadNextPuzzle);
  btnPrevPuzzle.addEventListener("click", loadPrevPuzzle);
  btnSkipPuzzle.addEventListener("click", loadNextPuzzle);

  puzzlesModal.addEventListener("click", (e) => {
    if (e.target === puzzlesModal) closePuzzlesModal();
  });

  // Tap characters for playful reactions
  document.getElementById("riyaImg")?.addEventListener("click", () => {
    riyaMessage.textContent = "Yay! You can do it!";
    speakText("Yay! You can do it!");
  });

  document.getElementById("johnImg")?.addEventListener("click", () => {
    johnMessage.textContent = "Let's unlock the animal!";
    speakText("Let's unlock the animal!");
  });

  document.getElementById("starImg")?.addEventListener("click", () => {
    starMessage.textContent = "Find the next letter! ⭐";
    speakText("Find the next letter!");
  });

  // Keyboard accessibility for letters (A-Z)
  window.addEventListener("keydown", (e) => {
    if (isPuzzleSolved) {
      if (e.key === "Enter" || e.key === " ") {
        loadNextPuzzle();
      }
      return;
    }

    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      const matchingTile = jumbledTiles.find(t => t.letter === key && !t.isUsed);
      if (matchingTile) {
        const btn = document.getElementById(matchingTile.id);
        if (btn) selectLetter(matchingTile, btn);
      } else {
        // Trigger wrong wiggle feedback
        const firstUnused = jumbledTiles.find(t => !t.isUsed);
        if (firstUnused) {
          const btn = document.getElementById(firstUnused.id);
          if (btn) handleWrongLetter(btn);
        }
      }
    }
  });
}

function startGame() {
  initEvents();
  initConfettiCanvas();
  loadPuzzle(0);
}

// Start on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGame);
} else {
  startGame();
}
