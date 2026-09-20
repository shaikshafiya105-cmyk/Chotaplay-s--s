/**
 * ChotaPlay — Riya's Traffic Rescue
 * Main Application Orchestrator & Input Handler
 */

class App {
  constructor() {
    this.selectedPieceType = null;
    this.selectedPieceEl = null;

    this.initMechanics();
    this.initControls();
    this.initDragAndDrop();
    this.initWelcomeIntro();
  }

  initMechanics() {
    window.roadMechanic = new RoadMechanic();
    window.trafficLightMechanic = new TrafficLightMechanic();
    window.trainMechanic = new TrainMechanic();
    window.boatMechanic = new BoatMechanic();
    window.airplaneMechanic = new AirplaneMechanic();
  }

  initControls() {
    // Sound FX Toggle
    const soundBtn = document.getElementById('btn-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const enabled = window.audioManager.toggleSound();
        soundBtn.querySelector('.icon').textContent = enabled ? '🔊' : '🔇';
        soundBtn.title = enabled ? 'Sound FX On' : 'Sound FX Off';
      });
    }

    // Background Music Toggle
    const musicBtn = document.getElementById('btn-music');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        const enabled = window.audioManager.toggleMusic();
        musicBtn.querySelector('.icon').textContent = enabled ? '🎵' : '🎶';
        musicBtn.title = enabled ? 'Music Playing' : 'Music Paused';
      });
    }

    // Hint / Voice Guidance Button
    const hintBtn = document.getElementById('btn-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.provideHint();
      });
    }

    // Reset Button
    const resetBtn = document.getElementById('btn-reset-parent');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetGame();
      });
    }

    // Global unlock audio on first user gesture
    const unlockAudio = () => {
      if (window.audioManager) {
        window.audioManager.init();
      }
      document.removeEventListener('pointerdown', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('pointerdown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  }

  initDragAndDrop() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const targets = document.querySelectorAll('.snap-target');

    // 1. Piece Selection (Tap-to-select for young toddlers)
    pieces.forEach(piece => {
      // Tap / Click
      piece.addEventListener('click', () => {
        if (piece.classList.contains('used')) return;

        if (this.selectedPieceEl === piece) {
          // Deselect
          this.deselectPiece();
        } else {
          this.selectPiece(piece);
        }
      });

      // HTML5 Drag
      piece.addEventListener('dragstart', (e) => {
        if (piece.classList.contains('used')) {
          e.preventDefault();
          return;
        }
        piece.classList.add('dragging');
        e.dataTransfer.setData('text/plain', piece.getAttribute('data-type'));
        if (window.audioManager) window.audioManager.playSnap();
      });

      piece.addEventListener('dragend', () => {
        piece.classList.remove('dragging');
      });
    });

    // 2. Drop Target Handlers
    targets.forEach(target => {
      target.addEventListener('dragover', (e) => {
        e.preventDefault();
        target.classList.add('hover-active');
      });

      target.addEventListener('dragleave', () => {
        target.classList.remove('hover-active');
      });

      target.addEventListener('drop', (e) => {
        e.preventDefault();
        target.classList.remove('hover-active');
        const pieceType = e.dataTransfer.getData('text/plain');
        this.handlePiecePlacement(pieceType, target);
      });

      // Tap-to-Place
      target.addEventListener('click', () => {
        if (this.selectedPieceType) {
          this.handlePiecePlacement(this.selectedPieceType, target);
        } else {
          // Highlight corresponding piece in tray
          this.highlightPieceForTarget(target);
        }
      });
    });
  }

  selectPiece(piece) {
    if (this.selectedPieceEl) {
      this.selectedPieceEl.classList.remove('selected');
    }
    this.selectedPieceEl = piece;
    this.selectedPieceType = piece.getAttribute('data-type');
    piece.classList.add('selected');

    if (window.audioManager) window.audioManager.playSnap();

    // Give visual guide to target
    this.highlightTargetForPiece(this.selectedPieceType);
  }

  deselectPiece() {
    if (this.selectedPieceEl) {
      this.selectedPieceEl.classList.remove('selected');
    }
    this.selectedPieceEl = null;
    this.selectedPieceType = null;
    document.querySelectorAll('.snap-target').forEach(t => t.classList.remove('glow-hint'));
  }

  highlightTargetForPiece(pieceType) {
    document.querySelectorAll('.snap-target').forEach(t => {
      if (t.getAttribute('data-accept') === pieceType) {
        t.classList.add('glow-hint');
      } else {
        t.classList.remove('glow-hint');
      }
    });
  }

  highlightPieceForTarget(target) {
    const needed = target.getAttribute('data-accept');
    const piece = document.querySelector(`.puzzle-piece[data-type="${needed}"]`);
    if (piece && !piece.classList.contains('used')) {
      this.selectPiece(piece);
    }
  }

  handlePiecePlacement(pieceType, target) {
    const acceptedType = target.getAttribute('data-accept');

    if (pieceType === acceptedType) {
      // Correct placement!
      if (pieceType === 'road-piece-straight') {
        window.roadMechanic.complete();
      } else if (pieceType === 'rail-piece-straight') {
        window.trainMechanic.complete();
      } else if (pieceType === 'water-piece-buoy') {
        window.boatMechanic.complete();
      }
      this.deselectPiece();
    } else {
      // Gentle wrong piece feedback (no penalty, friendly sound & wobble)
      if (window.audioManager) window.audioManager.playSnap();
      if (window.speechSystem) {
        window.speechSystem.speak("Let's try another piece!");
      }
      target.classList.add('wobble');
      setTimeout(() => target.classList.remove('wobble'), 500);
    }
  }

  provideHint() {
    if (window.audioManager) window.audioManager.playChime();

    // Check what is remaining
    if (!window.roadMechanic.isCompleted) {
      window.speechSystem.speak("Let's fix the road so the car can drive home!");
      this.highlightTargetForPiece('road-piece-straight');
    } else if (!window.trafficLightMechanic.isCompleted) {
      window.speechSystem.speak("Tap the traffic light to turn it green for the bus!");
    } else if (!window.trainMechanic.isCompleted) {
      window.speechSystem.speak("Connect the railway tracks for the train!");
      this.highlightTargetForPiece('rail-piece-straight');
    } else if (!window.boatMechanic.isCompleted) {
      window.speechSystem.speak("Add water pieces so the boat can sail to the island!");
      this.highlightTargetForPiece('water-piece-buoy');
    } else if (!window.airplaneMechanic.isCompleted) {
      window.speechSystem.speak("Clear the runway and launch the airplane into the sky!");
    } else {
      window.speechSystem.speak("Click START TRANSPORT TOWN to see all vehicles travel together!");
    }
  }

  initWelcomeIntro() {
    setTimeout(() => {
      if (window.speechSystem) {
        window.speechSystem.speak("Welcome to Happy Transport Town! Let's help Riya and Little Star fix the transport system!");
      }
    }, 1000);
  }

  resetGame() {
    this.deselectPiece();
    if (window.roadMechanic) window.roadMechanic.reset();
    if (window.trafficLightMechanic) window.trafficLightMechanic.reset();
    if (window.trainMechanic) window.trainMechanic.reset();
    if (window.boatMechanic) window.boatMechanic.reset();
    if (window.airplaneMechanic) window.airplaneMechanic.reset();
    if (window.characterManager) window.characterManager.reset();
    if (window.townManager) window.townManager.reset();

    if (window.audioManager) window.audioManager.playSnap();
    if (window.speechSystem) {
      window.speechSystem.speak("Happy Transport Town is ready to play again!");
    }
  }
}

// Bootstrap Application on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
