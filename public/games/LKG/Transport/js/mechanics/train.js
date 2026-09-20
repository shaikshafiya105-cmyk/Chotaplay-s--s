/**
 * ChotaPlay — Riya's Traffic Rescue
 * Mechanic 3: Train Track Puzzle (Train -> Station)
 */

class TrainMechanic {
  constructor() {
    this.isCompleted = false;
    this.snapTarget = document.getElementById('rail-snap-target');
    this.train = document.getElementById('vehicle-train');
    this.station = document.getElementById('target-station');
    this.railPiece = document.getElementById('piece-rail');
    this.badge = document.getElementById('badge-train');

    this.trainX = 0;
    this.isRolling = false;
    this.loopRolling = false;

    this.init();
  }

  init() {
    if (this.snapTarget) {
      this.snapTarget.addEventListener('click', () => {
        if (!this.isCompleted && window.app && window.app.selectedPieceType === 'rail-piece-straight') {
          this.complete();
        }
      });
    }
  }

  complete() {
    if (this.isCompleted) return;
    this.isCompleted = true;

    // Visual snap updates
    if (this.snapTarget) {
      this.snapTarget.classList.add('completed');
      this.snapTarget.innerHTML = `
        <div class="railway-segment" style="width:100%;height:100%;">
          <div class="ties"></div>
          <div class="rails"></div>
        </div>
      `;
    }

    if (this.railPiece) {
      this.railPiece.classList.add('used');
      this.railPiece.classList.remove('selected');
    }

    if (this.badge) {
      this.badge.classList.add('completed');
    }

    // Sound FX & Speech
    if (window.audioManager) {
      window.audioManager.playSnap();
      setTimeout(() => window.audioManager.playChime(), 150);
      setTimeout(() => window.audioManager.playTrainWhistle(), 500);
    }

    if (window.speechSystem) {
      window.speechSystem.speak("The tracks are connected! The train travels on tracks!");
    }

    if (window.characterManager) {
      window.characterManager.cheer();
    }

    // Burst celebration particles
    if (window.particleEngine && this.snapTarget) {
      const rect = this.snapTarget.getBoundingClientRect();
      window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35, 'star');
    }

    // Roll train to station
    this.rollTrainToStation();

    // Notify town coordinator
    if (window.townManager) {
      window.townManager.checkProgress();
    }
  }

  rollTrainToStation() {
    if (!this.train) return;
    this.train.classList.add('chuffing');
    let startX = 5;
    const targetX = 220;
    const duration = 2600;
    const startTime = performance.now();

    const animateTrain = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const currentX = startX + (targetX - startX) * ease;

      this.train.style.transform = `translateX(${currentX}px)`;

      if (progress < 1) {
        requestAnimationFrame(animateTrain);
      } else {
        this.train.classList.remove('chuffing');
        // Train arrived at station!
        if (this.station) this.station.classList.add('celebrate');
        if (window.audioManager) window.audioManager.playTrainWhistle();
        if (window.particleEngine && this.station) {
          const sRect = this.station.getBoundingClientRect();
          window.particleEngine.burst(sRect.left + sRect.width / 2, sRect.top + sRect.height / 2, 30, 'confetti');
        }
      }
    };

    requestAnimationFrame(animateTrain);
  }

  startContinuousRoll() {
    if (!this.train || this.loopRolling) return;
    this.loopRolling = true;
    this.train.classList.add('chuffing');

    let x = 0;
    const loop = () => {
      if (!this.loopRolling) return;
      x = (x + 2.8) % 320;
      this.train.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  reset() {
    this.isCompleted = false;
    this.loopRolling = false;
    if (this.train) {
      this.train.classList.remove('chuffing');
      this.train.style.transform = 'translateX(0px)';
    }
    if (this.snapTarget) {
      this.snapTarget.classList.remove('completed');
      this.snapTarget.innerHTML = `
        <div class="snap-indicator">
          <span class="snap-icon">🛤️</span>
          <span class="snap-text">Fix Track!</span>
        </div>
        <div class="snap-glow"></div>
      `;
    }
    if (this.railPiece) {
      this.railPiece.classList.remove('used', 'selected');
    }
    if (this.badge) {
      this.badge.classList.remove('completed');
    }
    if (this.station) {
      this.station.classList.remove('celebrate');
    }
  }
}
