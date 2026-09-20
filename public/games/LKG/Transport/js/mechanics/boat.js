/**
 * ChotaPlay — Riya's Traffic Rescue
 * Mechanic 4: Water Route (Boat -> Island)
 */

class BoatMechanic {
  constructor() {
    this.isCompleted = false;
    this.snapTarget = document.getElementById('water-snap-target');
    this.boat = document.getElementById('vehicle-boat');
    this.island = document.getElementById('island-target');
    this.waterPiece = document.getElementById('piece-water');
    this.badge = document.getElementById('badge-boat');

    this.boatX = 0;
    this.isSailing = false;
    this.loopSailing = false;

    this.init();
  }

  init() {
    if (this.snapTarget) {
      this.snapTarget.addEventListener('click', () => {
        if (!this.isCompleted && window.app && window.app.selectedPieceType === 'water-piece-buoy') {
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
        <div style="width:100%;height:100%;background:rgba(0,229,255,0.3);border-radius:18px;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:22px;animation:waveMotion1 2s infinite ease-in-out;">🌊 ⛵ 🌊</span>
        </div>
      `;
    }

    if (this.waterPiece) {
      this.waterPiece.classList.add('used');
      this.waterPiece.classList.remove('selected');
    }

    if (this.badge) {
      this.badge.classList.add('completed');
    }

    // Sound FX & Speech
    if (window.audioManager) {
      window.audioManager.playSnap();
      setTimeout(() => window.audioManager.playChime(), 150);
      setTimeout(() => window.audioManager.playWaterSplash(), 500);
    }

    if (window.speechSystem) {
      window.speechSystem.speak("The water route is ready! Boats travel on water!");
    }

    if (window.characterManager) {
      window.characterManager.cheer();
    }

    // Burst celebration particles
    if (window.particleEngine && this.snapTarget) {
      const rect = this.snapTarget.getBoundingClientRect();
      window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35, 'confetti');
    }

    // Sail boat to Island
    this.sailBoatToIsland();

    // Notify town coordinator
    if (window.townManager) {
      window.townManager.checkProgress();
    }
  }

  sailBoatToIsland() {
    if (!this.boat) return;
    this.boat.classList.add('sailing');
    let startX = 15;
    const targetX = 210;
    const duration = 2800;
    const startTime = performance.now();

    const animateBoat = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const currentX = startX + (targetX - startX) * ease;
      const bobY = Math.sin(progress * Math.PI * 4) * 4;

      this.boat.style.transform = `translate(${currentX}px, ${bobY}px)`;

      if (progress < 1) {
        requestAnimationFrame(animateBoat);
      } else {
        this.boat.classList.remove('sailing');
        // Boat arrived at island!
        if (this.island) this.island.classList.add('active');
        if (window.audioManager) window.audioManager.playWaterSplash();
        if (window.particleEngine && this.island) {
          const iRect = this.island.getBoundingClientRect();
          window.particleEngine.burst(iRect.left + iRect.width / 2, iRect.top + iRect.height / 2, 30, 'star');
        }
      }
    };

    requestAnimationFrame(animateBoat);
  }

  startContinuousSailing() {
    if (!this.boat || this.loopSailing) return;
    this.loopSailing = true;
    this.boat.classList.add('sailing');

    let x = 0;
    let t = 0;
    const loop = () => {
      if (!this.loopSailing) return;
      x = (x + 1.8) % 260;
      t += 0.05;
      const y = Math.sin(t) * 5;
      this.boat.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  reset() {
    this.isCompleted = false;
    this.loopSailing = false;
    if (this.boat) {
      this.boat.classList.remove('sailing');
      this.boat.style.transform = 'translate(0px, 0px)';
    }
    if (this.snapTarget) {
      this.snapTarget.classList.remove('completed');
      this.snapTarget.innerHTML = `
        <div class="snap-indicator">
          <span class="snap-icon">🌊</span>
          <span class="snap-text">Add Water Route!</span>
        </div>
        <div class="snap-glow"></div>
      `;
    }
    if (this.waterPiece) {
      this.waterPiece.classList.remove('used', 'selected');
    }
    if (this.badge) {
      this.badge.classList.remove('completed');
    }
    if (this.island) {
      this.island.classList.remove('active');
    }
  }
}
