/**
 * ChotaPlay — Riya's Traffic Rescue
 * Mechanic 1: Road Puzzle (Car -> House)
 */

class RoadMechanic {
  constructor() {
    this.isCompleted = false;
    this.snapTarget = document.getElementById('road-snap-target');
    this.car = document.getElementById('vehicle-car');
    this.targetHouse = document.getElementById('target-house');
    this.houseWindow = document.getElementById('house-window');
    this.roadPiece = document.getElementById('piece-road');
    this.badge = document.getElementById('badge-road');

    this.carPosition = 0;
    this.isDriving = false;
    this.loopDriving = false;

    this.init();
  }

  init() {
    if (this.snapTarget) {
      // Tap target directly if piece was selected
      this.snapTarget.addEventListener('click', () => {
        if (!this.isCompleted && window.app && window.app.selectedPieceType === 'road-piece-straight') {
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
        <div class="road-asphalt" style="width:100%;height:100%;background:#455A64;display:flex;align-items:center;">
          <div class="road-stripes"></div>
        </div>
      `;
    }

    if (this.roadPiece) {
      this.roadPiece.classList.add('used');
      this.roadPiece.classList.remove('selected');
    }

    if (this.badge) {
      this.badge.classList.add('completed');
    }

    // Sound FX & Speech
    if (window.audioManager) {
      window.audioManager.playSnap();
      setTimeout(() => window.audioManager.playChime(), 150);
      setTimeout(() => window.audioManager.playCarHonk(), 600);
    }

    if (window.speechSystem) {
      window.speechSystem.speak("The road is ready! Cars travel on roads!");
    }

    if (window.characterManager) {
      window.characterManager.cheer();
    }

    // Burst celebration particles
    if (window.particleEngine && this.snapTarget) {
      const rect = this.snapTarget.getBoundingClientRect();
      window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35, 'confetti');
    }

    // Drive car to house
    this.driveCarToHouse();

    // Notify town coordinator
    if (window.townManager) {
      window.townManager.checkProgress();
    }
  }

  driveCarToHouse() {
    if (!this.car) return;
    this.car.classList.add('driving');
    let startX = 10;
    const targetX = 260;
    const duration = 2400; // ms
    const startTime = performance.now();

    const animateCar = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-in-out
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const currentX = startX + (targetX - startX) * ease;
      
      this.car.style.transform = `translateX(${currentX}px)`;

      if (progress < 1) {
        requestAnimationFrame(animateCar);
      } else {
        this.car.classList.remove('driving');
        // Car arrived at house!
        if (this.houseWindow) this.houseWindow.classList.add('lit');
        if (this.targetHouse) this.targetHouse.classList.add('celebrate');
        
        if (window.audioManager) window.audioManager.playCarHonk();
        if (window.particleEngine && this.targetHouse) {
          const hRect = this.targetHouse.getBoundingClientRect();
          window.particleEngine.burst(hRect.left + hRect.width / 2, hRect.top + hRect.height / 2, 30, 'star');
        }
      }
    };

    requestAnimationFrame(animateCar);
  }

  startContinuousDrive() {
    if (!this.car || this.loopDriving) return;
    this.loopDriving = true;
    this.car.classList.add('driving');

    let x = 0;
    const loop = () => {
      if (!this.loopDriving) return;
      x = (x + 2.5) % 360;
      this.car.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  reset() {
    this.isCompleted = false;
    this.loopDriving = false;
    if (this.car) {
      this.car.classList.remove('driving');
      this.car.style.transform = 'translateX(0px)';
    }
    if (this.snapTarget) {
      this.snapTarget.classList.remove('completed');
      this.snapTarget.innerHTML = `
        <div class="snap-indicator">
          <span class="snap-icon">🛣️</span>
          <span class="snap-text">Fix Road!</span>
        </div>
        <div class="snap-glow"></div>
      `;
    }
    if (this.roadPiece) {
      this.roadPiece.classList.remove('used', 'selected');
    }
    if (this.badge) {
      this.badge.classList.remove('completed');
    }
    if (this.houseWindow) this.houseWindow.classList.remove('lit');
    if (this.targetHouse) this.targetHouse.classList.remove('celebrate');
  }
}
