/**
 * ChotaPlay — Riya's Traffic Rescue
 * Mechanic 5: Airplane Runway & Takeoff (Airplane -> Sky)
 */

class AirplaneMechanic {
  constructor() {
    this.isCompleted = false;
    this.runwayStrip = document.getElementById('runway-strip');
    this.airplane = document.getElementById('vehicle-airplane');
    this.takeoffBtn = document.getElementById('btn-takeoff');
    this.badge = document.getElementById('badge-airplane');

    this.isFlying = false;
    this.loopFlying = false;

    this.init();
  }

  init() {
    if (this.takeoffBtn) {
      this.takeoffBtn.addEventListener('click', () => this.launchTakeoff());
    }

    if (this.airplane) {
      this.airplane.addEventListener('click', () => this.launchTakeoff());
    }

    if (this.runwayStrip) {
      this.runwayStrip.addEventListener('click', () => {
        this.runwayStrip.classList.add('lit');
        if (window.audioManager) window.audioManager.playSnap();
        if (window.speechSystem) {
          window.speechSystem.speak("Runway lights are on! Ready for takeoff!");
        }
      });
    }
  }

  launchTakeoff() {
    if (this.isFlying) return;
    this.isFlying = true;

    // Light up runway
    if (this.runwayStrip) this.runwayStrip.classList.add('lit');

    if (this.takeoffBtn) {
      this.takeoffBtn.style.display = 'none';
    }

    if (!this.isCompleted) {
      this.isCompleted = true;
      if (this.badge) this.badge.classList.add('completed');
    }

    // Audio & Speech
    if (window.audioManager) {
      window.audioManager.playSnap();
      setTimeout(() => window.audioManager.playAirplaneWhoosh(), 200);
    }

    if (window.speechSystem) {
      window.speechSystem.speak("Zoom! Airplanes fly high in the sky!");
    }

    if (window.characterManager) {
      window.characterManager.cheer();
    }

    // Airplane Takeoff Animation
    if (this.airplane) {
      this.airplane.classList.add('flying');
      const startTime = performance.now();
      const duration = 2800;

      const animateFlight = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Accelerate horizontally first (0 to 0.4), then pitch up and fly into sky (0.4 to 1.0)
        let x, y, rotate;
        if (progress < 0.4) {
          const p = progress / 0.4;
          x = 20 + p * 120;
          y = 10;
          rotate = 0;
        } else {
          const p = (progress - 0.4) / 0.6;
          x = 140 + p * 280;
          y = 10 - p * 240;
          rotate = -18 - p * 12;
        }

        this.airplane.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

        if (progress < 1) {
          requestAnimationFrame(animateFlight);
        } else {
          this.isFlying = false;
          // Loop back or finish
          if (window.particleEngine) {
            window.particleEngine.burst(window.innerWidth * 0.85, window.innerHeight * 0.25, 30, 'star');
          }
          if (window.townManager) {
            window.townManager.checkProgress();
          }
        }
      };

      requestAnimationFrame(animateFlight);
    }
  }

  startContinuousFlight() {
    if (!this.airplane || this.loopFlying) return;
    this.loopFlying = true;
    this.airplane.classList.add('flying');

    let angle = 0;
    const loop = () => {
      if (!this.loopFlying) return;
      angle += 0.02;
      const x = 120 + Math.cos(angle) * 180;
      const y = -60 + Math.sin(angle) * 100;
      const deg = Math.atan2(Math.sin(angle) * 100, Math.cos(angle) * 180) * (180 / Math.PI) - 90;
      this.airplane.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  reset() {
    this.isCompleted = false;
    this.isFlying = false;
    this.loopFlying = false;
    if (this.airplane) {
      this.airplane.classList.remove('flying');
      this.airplane.style.transform = 'translate(0px, 0px) rotate(0deg)';
    }
    if (this.runwayStrip) {
      this.runwayStrip.classList.remove('lit');
    }
    if (this.takeoffBtn) {
      this.takeoffBtn.style.display = 'flex';
    }
    if (this.badge) {
      this.badge.classList.remove('completed');
    }
  }
}
