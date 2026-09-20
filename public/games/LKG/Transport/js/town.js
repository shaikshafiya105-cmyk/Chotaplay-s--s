/**
 * ChotaPlay — Riya's Traffic Rescue
 * Town Orchestrator & The Grand "START TRANSPORT TOWN" WOW Moment
 */

class TownManager {
  constructor() {
    this.wowOverlay = document.getElementById('grand-wow-overlay');
    this.startTownBtn = document.getElementById('btn-grand-start');
    this.summaryCard = document.getElementById('education-summary-card');
    this.closeSummaryBtn = document.getElementById('btn-close-summary');
    this.playAgainBtn = document.getElementById('btn-play-again');
    this.dock = document.getElementById('puzzle-dock');

    this.isTownActivated = false;

    this.init();
  }

  init() {
    if (this.startTownBtn) {
      this.startTownBtn.addEventListener('click', () => this.triggerGrandWowMoment());
    }

    if (this.closeSummaryBtn) {
      this.closeSummaryBtn.addEventListener('click', () => {
        if (this.summaryCard) this.summaryCard.classList.remove('visible');
      });
    }

    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener('click', () => {
        if (window.app) window.app.resetGame();
      });
    }
  }

  checkProgress() {
    const road = window.roadMechanic ? window.roadMechanic.isCompleted : false;
    const traffic = window.trafficLightMechanic ? window.trafficLightMechanic.isCompleted : false;
    const train = window.trainMechanic ? window.trainMechanic.isCompleted : false;
    const boat = window.boatMechanic ? window.boatMechanic.isCompleted : false;
    const plane = window.airplaneMechanic ? window.airplaneMechanic.isCompleted : false;

    if (road && traffic && train && boat && plane && !this.isTownActivated) {
      // All 5 are completed! Show Grand Celebration prompt
      setTimeout(() => {
        this.showGrandStartPrompt();
      }, 1200);
    }
  }

  showGrandStartPrompt() {
    if (this.wowOverlay) {
      this.wowOverlay.classList.add('visible');
    }

    if (window.audioManager) {
      window.audioManager.playChime();
    }

    if (window.speechSystem) {
      window.speechSystem.speak("Hooray! All transport systems are ready! Let's start the whole Happy Transport Town!");
    }

    if (window.characterManager) {
      window.characterManager.cheer();
    }
  }

  triggerGrandWowMoment() {
    this.isTownActivated = true;

    // Hide prompt overlay
    if (this.wowOverlay) {
      this.wowOverlay.classList.remove('visible');
    }

    // Hide puzzle dock to make room for full town view
    if (this.dock) {
      this.dock.style.transform = 'translateX(-50%) translateY(120px)';
      this.dock.style.opacity = '0';
    }

    // 1. Play Grand Celebration Fanfare & Confetti Cannons
    if (window.audioManager) {
      window.audioManager.playFanfare();
    }
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}

    if (window.particleEngine) {
      window.particleEngine.celebrationCannons();
    }

    // 2. Characters Celebrate & Orbit
    if (window.characterManager) {
      window.characterManager.celebrate();
    }

    // 3. Simultaneously activate all vehicles in motion!
    if (window.roadMechanic) window.roadMechanic.startContinuousDrive();
    if (window.trafficLightMechanic) window.trafficLightMechanic.startContinuousDrive();
    if (window.trainMechanic) window.trainMechanic.startContinuousRoll();
    if (window.boatMechanic) window.boatMechanic.startContinuousSailing();
    if (window.airplaneMechanic) window.airplaneMechanic.startContinuousFlight();

    // 4. Voice Educational Reinforcement
    if (window.speechSystem) {
      setTimeout(() => {
        window.speechSystem.speak("You did it! You helped all the vehicles travel! Cars and buses use roads. Trains use tracks. Boats travel on water. Airplanes fly in the sky!");
      }, 1200);
    }

    // 5. Show Educational Summary Banner
    setTimeout(() => {
      if (this.summaryCard) {
        this.summaryCard.classList.add('visible');
      }
    }, 4500);
  }

  reset() {
    this.isTownActivated = false;
    if (this.wowOverlay) this.wowOverlay.classList.remove('visible');
    if (this.summaryCard) this.summaryCard.classList.remove('visible');
    if (this.dock) {
      this.dock.style.transform = 'translateX(-50%) translateY(0)';
      this.dock.style.opacity = '1';
    }
  }
}

// Global Town Singleton
window.townManager = new TownManager();
