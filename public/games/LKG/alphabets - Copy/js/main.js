/**
 * ChotaPlay Master Classroom Suite
 * Routing, Teacher Navigation Bar, Fullscreen, Audio & Drawer Controller
 */

import { audio } from './utils/audio.js';
import { particles } from './utils/particles.js';
import { ALPHABET_DATA } from './data/alphabetData.js';
import { WORD_DATA } from './data/wordData.js';
import { LKGGame } from './games/lkgGame.js';
import { UKGGame } from './games/ukgGame.js';
import { Class1Game } from './games/class1Game.js';

class ChotaPlayApp {
  constructor() {
    this.currentMode = 'hub'; // 'hub', 'lkg', 'ukg', 'class1'
    this.activeGameInstance = null;
    this.savedStates = this.loadSavedStates();
    this.initDOM();
    this.initEvents();
  }

  loadSavedStates() {
    try {
      const stored = localStorage.getItem('chotaplay_saved_states');
      return stored ? JSON.parse(stored) : { lkg: null, ukg: null, class1: null };
    } catch (e) {
      return { lkg: null, ukg: null, class1: null };
    }
  }

  saveCurrentGameState() {
    if (this.activeGameInstance && this.activeGameInstance.getState && this.currentMode !== 'hub') {
      const state = this.activeGameInstance.getState();
      this.savedStates[this.currentMode] = state;
      try {
        localStorage.setItem('chotaplay_saved_states', JSON.stringify(this.savedStates));
      } catch (e) {}
    }
  }

  initDOM() {
    // Particle Canvas
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) particles.init(canvas);

    this.viewport = document.getElementById('gameViewport');
    this.teacherBar = document.getElementById('teacherControlBar');
    this.gradeBadge = document.getElementById('headerGradeBadge');
    this.progressTitle = document.getElementById('teacherProgressTitle');
    this.drawerModal = document.getElementById('drawerBackdrop');
    this.drawerGrid = document.getElementById('drawerGrid');
    this.drawerTitle = document.getElementById('drawerTitle');

    // Controls
    this.btnPrev = document.getElementById('btnTeacherPrev');
    this.btnRepeat = document.getElementById('btnTeacherRepeat');
    this.btnNext = document.getElementById('btnTeacherNext');
    this.btnDrawer = document.getElementById('btnToggleDrawer');
    this.btnTeacherExit = document.getElementById('btnTeacherExit');
    this.btnSound = document.getElementById('btnToggleSound');
    this.btnFullscreen = document.getElementById('btnToggleFullscreen');
    this.btnCloseDrawer = document.getElementById('btnCloseDrawer');
    this.btnHome = document.getElementById('btnBrandHome');
    this.btnQuitGame = document.getElementById('btnQuitGame');

    this.showHub();
  }

  initEvents() {
    // Brand Home click (Top-left ChotaPlay Word World badge)
    if (this.btnHome) {
      this.btnHome.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Top-right Quit Game Button
    if (this.btnQuitGame) {
      this.btnQuitGame.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Bottom Teacher Bar Exit Button
    if (this.btnTeacherExit) {
      this.btnTeacherExit.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Teacher Bar controls
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.previous) {
          this.activeGameInstance.previous();
        }
      });
    }

    if (this.btnRepeat) {
      this.btnRepeat.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.repeat) {
          this.activeGameInstance.repeat();
        }
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.next) {
          this.activeGameInstance.next();
        }
      });
    }

    // Drawer Jumper
    if (this.btnDrawer) {
      this.btnDrawer.addEventListener('click', () => this.openDrawer());
    }
    if (this.btnCloseDrawer) {
      this.btnCloseDrawer.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerModal) {
      this.drawerModal.addEventListener('click', (e) => {
        if (e.target === this.drawerModal) this.closeDrawer();
      });
    }

    // Audio Mute toggle
    if (this.btnSound) {
      this.btnSound.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        this.btnSound.innerHTML = isMuted ? '🔇' : '🔊';
        this.btnSound.setAttribute('title', isMuted ? 'Unmute Audio' : 'Mute Audio');
      });
    }

    // Fullscreen toggle
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    // Keyboard shortcuts for Teacher
    window.addEventListener('keydown', (e) => {
      if (this.currentMode === 'hub') return;
      if (e.key === 'ArrowLeft') {
        if (this.activeGameInstance) this.activeGameInstance.previous();
      } else if (e.key === 'ArrowRight') {
        if (this.activeGameInstance) this.activeGameInstance.next();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.tagName !== 'BUTTON' && this.activeGameInstance) {
          this.activeGameInstance.repeat();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (this.drawerModal && this.drawerModal.classList.contains('active')) {
          this.closeDrawer();
        } else {
          this.showHub();
        }
      }
    });
    // Unload hook to ensure state is saved
    window.addEventListener('beforeunload', () => this.saveCurrentGameState());
  }

  showHub() {
    this.saveCurrentGameState();

    if (this.activeGameInstance && this.activeGameInstance.destroy) {
      this.activeGameInstance.destroy();
    }
    this.activeGameInstance = null;
    this.currentMode = 'hub';
    audio.stopSpeech();

    if (this.teacherBar) this.teacherBar.style.display = 'none';
    if (this.gradeBadge) this.gradeBadge.style.display = 'none';
    if (this.btnQuitGame) this.btnQuitGame.style.display = 'none';

    // Calculate progress for each section (6/6 each required to complete game)
    const lkgCount = (this.savedStates.lkg && Array.isArray(this.savedStates.lkg.completedLetters)) ? this.savedStates.lkg.completedLetters.length : 0;
    const isLkgDone = lkgCount >= 6;

    const ukgCount = (this.savedStates.ukg && Array.isArray(this.savedStates.ukg.completedWords)) ? this.savedStates.ukg.completedWords.length : 0;
    const isUkgDone = ukgCount >= 6;

    const class1Count = (this.savedStates.class1 && Array.isArray(this.savedStates.class1.completedWords)) ? this.savedStates.class1.completedWords.length : 0;
    const isClass1Done = class1Count >= 6;

    const allThreeDone = isLkgDone && isUkgDone && isClass1Done;
    const completedBoxesCount = (isLkgDone ? 1 : 0) + (isUkgDone ? 1 : 0) + (isClass1Done ? 1 : 0);

    // Format LKG resume info
    let lkgResumeLabel = isLkgDone ? 'Play Again →' : 'Start Adventure →';
    let lkgSubtext = 'SEE → HEAR → FIND → DISCOVER<br>Master uppercase letters & real associations.';
    if (this.savedStates.lkg && typeof this.savedStates.lkg.currentIndex === 'number') {
      const idx = this.savedStates.lkg.currentIndex;
      const item = ALPHABET_DATA[idx] || ALPHABET_DATA[0];
      lkgResumeLabel = isLkgDone ? `Review ${item.letter} ➔` : `Continue Letter ${item.letter} ➔`;
      lkgSubtext = `Saved: <strong>${item.letter} for ${item.association}</strong> (${Math.min(lkgCount, 6)} / 6 completed)<br>Click to continue where you left off!`;
    }

    // Format UKG resume info
    let ukgResumeLabel = isUkgDone ? 'Play Again →' : 'Start Building →';
    let ukgSubtext = 'LETTERS COME ALIVE!<br>Combine letters to physically morph into living objects.';
    if (this.savedStates.ukg && typeof this.savedStates.ukg.currentIndex === 'number') {
      const lvl = this.savedStates.ukg.currentLevel || 'level1';
      const list = WORD_DATA[lvl] || WORD_DATA.level1;
      const idx = this.savedStates.ukg.currentIndex;
      const item = list[idx] || list[0];
      ukgResumeLabel = isUkgDone ? `Review ${item.word} ➔` : `Continue ${item.word} ➔`;
      ukgSubtext = `Saved: <strong>${item.word}</strong> (${Math.min(ukgCount, 6)} / 6 completed)<br>Click to continue building!`;
    }

    // Format Class 1 resume info
    let class1ResumeLabel = isClass1Done ? 'Play Again →' : 'Start Jumble →';
    let class1Subtext = 'CLUE → THINK → ARRANGE<br>Drag and solve jumbled letters with interactive feedback.';
    if (this.savedStates.class1 && typeof this.savedStates.class1.currentIndex === 'number') {
      const lvl = this.savedStates.class1.currentLevel || 'level1';
      const list = WORD_DATA[lvl] || WORD_DATA.level1;
      const idx = this.savedStates.class1.currentIndex;
      const item = list[idx] || list[0];
      class1ResumeLabel = isClass1Done ? `Review ${item.word} ➔` : `Continue ${item.word} ➔`;
      class1Subtext = `Saved: <strong>${item.word}</strong> (${Math.min(class1Count, 6)} / 6 completed)<br>Click to continue solving!`;
    }

    this.viewport.innerHTML = `
      <div class="hub-container">
        <div class="hub-hero">
          <div class="hub-badge">🌟 CLASSROOM INTERACTIVE SUITE</div>
          <h1 class="hub-title">CHOTAPLAY WORD WORLD</h1>
          <p class="hub-subtitle">Complete all 3 sections (6/6 in each box) to finish the game</p>
        </div>

        <div class="hub-cards-grid">
          <!-- LKG Card -->
          <div class="grade-card lkg-card" id="cardLKG">
            <span class="card-grade-badge">LKG / Preschool</span>
            <span class="card-progress-pill ${isLkgDone ? 'completed' : ''}">${isLkgDone ? '✅ 6/6 Completed' : `⏳ ${Math.min(lkgCount, 6)}/6 Completed`}</span>
            <div class="card-icon-art">A</div>
            <h2 class="card-game-title">Alphabet Adventure</h2>
            <p class="card-pedagogy">${lkgSubtext}</p>
            <button class="card-play-btn" id="btnPlayLKG"><span>${lkgResumeLabel}</span></button>
          </div>

          <!-- UKG Card -->
          <div class="grade-card ukg-card" id="cardUKG">
            <span class="card-grade-badge">UKG / Kindergarten</span>
            <span class="card-progress-pill ${isUkgDone ? 'completed' : ''}">${isUkgDone ? '✅ 6/6 Completed' : `⏳ ${Math.min(ukgCount, 6)}/6 Completed`}</span>
            <div class="card-icon-art">CAT</div>
            <h2 class="card-game-title">Word Builder</h2>
            <p class="card-pedagogy">${ukgSubtext}</p>
            <button class="card-play-btn" id="btnPlayUKG"><span>${ukgResumeLabel}</span></button>
          </div>

          <!-- Class 1 Card -->
          <div class="grade-card class1-card" id="cardClass1">
            <span class="card-grade-badge">Class 1 / Primary</span>
            <span class="card-progress-pill ${isClass1Done ? 'completed' : ''}">${isClass1Done ? '✅ 6/6 Completed' : `⏳ ${Math.min(class1Count, 6)}/6 Completed`}</span>
            <div class="card-icon-art">🔤</div>
            <h2 class="card-game-title">Jumbled Word Adventure</h2>
            <p class="card-pedagogy">${class1Subtext}</p>
            <button class="card-play-btn" id="btnPlayClass1"><span>${class1ResumeLabel}</span></button>
          </div>
        </div>

        <!-- Master Completion Action -->
        <div class="hub-complete-action-wrap">
          <button class="btn-hub-complete-game ${allThreeDone ? 'unlocked' : 'locked'}" id="btnHubCompleteGame">
            <span>${allThreeDone ? '🎉 Game Completed — Next Topic ▶' : `🔒 Complete All 3 Sections (${completedBoxesCount}/3 Boxes Done)`}</span>
          </button>
          <span class="hub-complete-hint">${allThreeDone ? '✨ All 3 sections (6/6 each) completed! Click above to advance to next topic.' : 'Complete all 3 boxes (6/6 in each) to unlock the next topic.'}</span>
        </div>
      </div>
    `;

    document.getElementById('cardLKG').addEventListener('click', () => this.launchGame('lkg'));
    document.getElementById('cardUKG').addEventListener('click', () => this.launchGame('ukg'));
    document.getElementById('cardClass1').addEventListener('click', () => this.launchGame('class1'));

    const btnComplete = document.getElementById('btnHubCompleteGame');
    if (btnComplete) {
      btnComplete.addEventListener('click', (e) => {
        e.stopPropagation();
        if (allThreeDone) {
          audio.playFanfare();
          particles.createConfetti(100);
          try {
            window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
          } catch (err) {}
        } else {
          audio.playGentleTryAgain();
          const missing = [];
          if (!isLkgDone) missing.push(`LKG (${Math.min(lkgCount, 6)}/6)`);
          if (!isUkgDone) missing.push(`UKG (${Math.min(ukgCount, 6)}/6)`);
          if (!isClass1Done) missing.push(`Class 1 (${Math.min(class1Count, 6)}/6)`);
          
          audio.speak(`Please complete all 3 sections first. Remaining: ${missing.join(', ')}`);
          alert(`Please complete all 3 sections (6/6 in each box) to unlock the next topic!\n\nCurrent Progress:\n• LKG (Alphabet Adventure): ${Math.min(lkgCount, 6)}/6\n• UKG (Word Builder): ${Math.min(ukgCount, 6)}/6\n• Class 1 (Jumbled Words): ${Math.min(class1Count, 6)}/6`);
        }
      });
    }
  }

  launchGame(mode) {
    this.saveCurrentGameState();

    if (this.activeGameInstance && this.activeGameInstance.destroy) {
      this.activeGameInstance.destroy();
    }

    this.currentMode = mode;
    audio.playPop();
    audio.stopSpeech();

    if (this.teacherBar) this.teacherBar.style.display = 'flex';
    if (this.btnQuitGame) this.btnQuitGame.style.display = 'inline-flex';
    if (this.gradeBadge) {
      this.gradeBadge.style.display = 'inline-block';
      this.gradeBadge.textContent = mode.toUpperCase();
    }

    this.viewport.innerHTML = `<div id="gameHost" style="width: 100%; height: 100%;"></div>`;
    const host = document.getElementById('gameHost');

    const updateProgress = (info) => {
      if (this.progressTitle) {
        this.progressTitle.innerHTML = `<strong>${info.title}</strong> <span style="font-size:15px; color:#64748B;">(${info.current} / ${info.total})</span>`;
      }
      this.saveCurrentGameState();
    };

    const savedState = this.savedStates[mode] || null;

    if (mode === 'lkg') {
      this.activeGameInstance = new LKGGame(host, updateProgress, savedState);
    } else if (mode === 'ukg') {
      this.activeGameInstance = new UKGGame(host, updateProgress, savedState);
    } else if (mode === 'class1') {
      this.activeGameInstance = new Class1Game(host, updateProgress, savedState);
    }

    if (this.activeGameInstance) {
      this.activeGameInstance.init();
    }
  }

  openDrawer() {
    if (!this.activeGameInstance || !this.activeGameInstance.getDataset) return;
    const data = this.activeGameInstance.getDataset();

    if (this.drawerTitle) {
      this.drawerTitle.textContent = this.currentMode === 'lkg' ? 'Direct Alphabet Jump (A-Z)' : 'Select Word Lesson';
    }

    if (this.drawerGrid) {
      this.drawerGrid.innerHTML = '';
      data.forEach(item => {
        const tile = document.createElement('div');
        tile.className = `drawer-tile ${item.completed ? 'completed' : ''} ${item.index === this.activeGameInstance.currentIndex ? 'active' : ''}`;
        tile.innerHTML = `
          <span>${item.label}</span>
          <span class="sub">${item.sub}</span>
        `;
        tile.addEventListener('click', () => {
          audio.playPop();
          this.activeGameInstance.jumpTo(item.index);
          this.closeDrawer();
        });
        this.drawerGrid.appendChild(tile);
      });
    }

    if (this.drawerModal) {
      this.drawerModal.classList.add('active');
    }
  }

  closeDrawer() {
    if (this.drawerModal) {
      this.drawerModal.classList.remove('active');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      if (this.btnFullscreen) this.btnFullscreen.innerHTML = '⛶';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        if (this.btnFullscreen) this.btnFullscreen.innerHTML = '⛶';
      }
    }
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.chotaApp = new ChotaPlayApp();
});
