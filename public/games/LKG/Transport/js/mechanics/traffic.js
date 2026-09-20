/**
 * ChotaPlay — Riya's Traffic Rescue
 * Mechanic 2: Traffic Light Intersection (Bus)
 */

class TrafficLightMechanic {
  constructor() {
    this.isCompleted = false;
    this.state = 'red'; // 'red' or 'green'
    this.post = document.getElementById('traffic-light-post');
    this.redBulb = document.getElementById('light-red');
    this.greenBulb = document.getElementById('light-green');
    this.bus = document.getElementById('vehicle-bus');
    this.badge = document.getElementById('badge-traffic');

    this.busX = 0;
    this.busDriving = false;
    this.loopDriving = false;

    this.init();
  }

  init() {
    if (this.post) {
      this.post.addEventListener('click', () => this.toggleLight());
    }
  }

  toggleLight() {
    if (this.state === 'red') {
      this.setLightState('green');
    } else {
      this.setLightState('red');
    }
  }

  setLightState(newState) {
    this.state = newState;

    if (window.audioManager) {
      window.audioManager.playSignal();
    }

    if (newState === 'green') {
      if (this.redBulb) this.redBulb.classList.remove('active');
      if (this.greenBulb) this.greenBulb.classList.add('active');

      if (window.speechSystem) {
        window.speechSystem.speak("Green means go! The bus can drive on the road!");
      }

      if (!this.isCompleted) {
        this.isCompleted = true;
        if (this.badge) this.badge.classList.add('completed');
        if (window.characterManager) window.characterManager.cheer();
        if (window.particleEngine && this.post) {
          const pRect = this.post.getBoundingClientRect();
          window.particleEngine.burst(pRect.left + pRect.width / 2, pRect.top + pRect.height / 2, 25, 'star');
        }
        if (window.townManager) window.townManager.checkProgress();
      }

      this.startBusDrive();
    } else {
      // Red light
      if (this.greenBulb) this.greenBulb.classList.remove('active');
      if (this.redBulb) this.redBulb.classList.add('active');

      if (window.speechSystem) {
        window.speechSystem.speak("Red means stop! Good job waiting!");
      }

      this.stopBusDrive();
    }
  }

  startBusDrive() {
    if (this.busDriving) return;
    this.busDriving = true;
    if (this.bus) this.bus.classList.add('driving');

    if (window.audioManager) {
      setTimeout(() => window.audioManager.playCarHonk(), 300);
    }

    const drive = () => {
      if (!this.busDriving) return;
      this.busX = (this.busX + 2.2) % 280;
      if (this.bus) {
        this.bus.style.transform = `translateX(${this.busX}px)`;
      }
      requestAnimationFrame(drive);
    };
    drive();
  }

  stopBusDrive() {
    this.busDriving = false;
    if (this.bus) this.bus.classList.remove('driving');
  }

  startContinuousDrive() {
    this.setLightState('green');
    this.loopDriving = true;
  }

  reset() {
    this.isCompleted = false;
    this.busDriving = false;
    this.loopDriving = false;
    this.busX = 0;
    this.state = 'red';

    if (this.bus) {
      this.bus.classList.remove('driving');
      this.bus.style.transform = 'translateX(0px)';
    }
    if (this.redBulb) this.redBulb.classList.add('active');
    if (this.greenBulb) this.greenBulb.classList.remove('active');
    if (this.badge) this.badge.classList.remove('completed');
  }
}
