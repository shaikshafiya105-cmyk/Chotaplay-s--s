/**
 * ChotaPlay — Riya's Traffic Rescue
 * Character Controllers: Riya & Little Star
 */

class CharacterManager {
  constructor() {
    this.riyaAvatar = document.getElementById('riya-avatar');
    this.riyaArm = document.getElementById('riya-waving-arm');
    this.littleStar = document.getElementById('littlestar-character');
    this.isTalking = false;

    this.initInteractions();
  }

  initInteractions() {
    // Tap Riya directly to hear cheerful encouragement
    const riyaEl = document.getElementById('riya-character');
    if (riyaEl) {
      riyaEl.addEventListener('click', () => {
        if (window.audioManager) window.audioManager.playSnap();
        this.cheer();
        const cheers = [
          "You are doing wonderful!",
          "Let's get all the vehicles moving!",
          "Which transport should we fix next?",
          "Happy Transport Town is getting so lively!"
        ];
        const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
        if (window.speechSystem) window.speechSystem.speak(randomCheer);
      });
    }

    // Tap Little Star for a sparkle effect
    if (this.littleStar) {
      this.littleStar.addEventListener('click', (e) => {
        if (window.audioManager) window.audioManager.playChime();
        const rect = this.littleStar.getBoundingClientRect();
        if (window.particleEngine) {
          window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, 'star');
        }
        if (window.speechSystem) window.speechSystem.speak("Twinkle twinkle! Little Star is helping!");
      });
    }
  }

  setRiyaTalking(talking) {
    this.isTalking = talking;
    if (this.riyaAvatar) {
      if (talking) {
        this.riyaAvatar.classList.add('state-talking');
      } else {
        this.riyaAvatar.classList.remove('state-talking');
      }
    }
  }

  setRiyaState(state) {
    if (!this.riyaAvatar) return;
    this.riyaAvatar.classList.remove('state-idle', 'state-happy', 'state-celebrating');
    this.riyaAvatar.classList.add(`state-${state}`);
  }

  cheer() {
    this.setRiyaState('happy');
    if (this.riyaArm) this.riyaArm.classList.add('pointing');
    setTimeout(() => {
      this.setRiyaState('idle');
      if (this.riyaArm) this.riyaArm.classList.remove('pointing');
    }, 2000);
  }

  celebrate() {
    this.setRiyaState('celebrating');
    if (this.littleStar) {
      this.littleStar.classList.add('flying-orbit');
    }
  }

  reset() {
    this.setRiyaState('idle');
    if (this.riyaArm) this.riyaArm.classList.remove('pointing');
    if (this.littleStar) {
      this.littleStar.classList.remove('flying-orbit');
    }
  }
}

// Global Character Singleton
window.characterManager = new CharacterManager();
