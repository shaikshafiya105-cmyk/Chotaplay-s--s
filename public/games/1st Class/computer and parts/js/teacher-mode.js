/**
 * Computer Quest - Teacher & Classroom Controls
 * High clarity, projector friendly, accessible controls for teachers and young learners.
 */

const TeacherMode = {
  isOpen: false,

  init() {
    const btnToggle = document.getElementById('btn-teacher-menu');
    const modal = document.getElementById('teacher-modal');
    const btnClose = document.getElementById('btn-close-teacher');
    const btnRestart = document.getElementById('btn-restart-game');
    const btnReplayVoice = document.getElementById('btn-replay-voice');
    const btnToggleVoice = document.getElementById('btn-toggle-voice');
    const btnToggleSound = document.getElementById('btn-toggle-sound');
    const btnFullscreen = document.getElementById('btn-toggle-fullscreen');

    if (btnToggle) btnToggle.addEventListener('click', () => this.toggleModal());
    if (btnClose) btnClose.addEventListener('click', () => this.closeModal());
    if (btnRestart) btnRestart.addEventListener('click', () => {
      this.closeModal();
      GameController.restart();
    });
    if (btnReplayVoice) btnReplayVoice.addEventListener('click', () => {
      GameController.replayInstruction();
    });
    if (btnToggleVoice) btnToggleVoice.addEventListener('click', () => {
      AudioController.voiceEnabled = !AudioController.voiceEnabled;
      btnToggleVoice.textContent = AudioController.voiceEnabled ? '🔊 Voice: ON' : '🔇 Voice: OFF';
      btnToggleVoice.classList.toggle('off', !AudioController.voiceEnabled);
    });
    if (btnToggleSound) btnToggleSound.addEventListener('click', () => {
      AudioController.soundEnabled = !AudioController.soundEnabled;
      btnToggleSound.textContent = AudioController.soundEnabled ? '🔔 Sounds: ON' : '🔕 Sounds: OFF';
      btnToggleSound.classList.toggle('off', !AudioController.soundEnabled);
    });
    if (btnFullscreen) btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
  },

  toggleModal() {
    this.isOpen = !this.isOpen;
    const modal = document.getElementById('teacher-modal');
    if (modal) {
      modal.classList.toggle('active', this.isOpen);
      if (this.isOpen) {
        this.updateSummaryChecklist();
      }
    }
  },

  closeModal() {
    this.isOpen = false;
    const modal = document.getElementById('teacher-modal');
    if (modal) modal.classList.remove('active');
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  updateSummaryChecklist() {
    const listEl = document.getElementById('teacher-summary-list');
    if (!listEl) return;

    const parts = [
      { id: 'monitor', name: 'Monitor — "We use it to see"' },
      { id: 'cpu', name: 'CPU — "Helps the computer work"' },
      { id: 'keyboard', name: 'Keyboard — "We use it to type"' },
      { id: 'mouse', name: 'Mouse — "Point and click"' },
      { id: 'speaker', name: 'Speakers — "Give us sound"' },
      { id: 'printer', name: 'Printer — "Prints our work"' }
    ];

    listEl.innerHTML = parts.map(p => {
      const isCollected = GameController.gameState.collectedParts.includes(p.id);
      return `
        <li class="summary-item ${isCollected ? 'learned' : 'pending'}">
          <span class="status-icon">${isCollected ? '✅' : '⏳'}</span>
          <span class="part-label">${p.name}</span>
        </li>
      `;
    }).join('');
  }
};
