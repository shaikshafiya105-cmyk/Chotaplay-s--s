/**
 * Computer Quest - Visual Effects, Particle System & Interactive Micro-Demos
 */

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animFrame = null;
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.getElementById('particle-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createConfetti(count = 70) {
    const colors = ['#FF4081', '#FFD54F', '#00E676', '#40C4FF', '#E040FB', '#FFAB00'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 50,
        vx: (Math.random() - 0.5) * 6,
        vy: 3 + Math.random() * 5,
        size: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        life: 180 + Math.random() * 60,
        type: 'confetti'
      });
    }
    this.startLoop();
  }

  createSparkles(x, y, count = 24) {
    const colors = ['#FFF176', '#FFE082', '#69F0AE', '#40C4FF', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2.5 + Math.random() * 5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        life: 40 + Math.random() * 20,
        type: 'sparkle'
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (!this.animFrame) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      if (p.type === 'confetti') {
        p.vy += 0.08; // gravity
        p.rotation += p.vRot;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        this.ctx.restore();
      } else if (p.type === 'sparkle') {
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha = Math.max(0, p.life / 50);
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      if (p.life <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.animFrame = null;
    }
  }
}

const AnimationController = {
  particleEngine: null,

  init() {
    this.particleEngine = new ParticleEngine();
  },

  celebrate() {
    if (this.particleEngine) {
      this.particleEngine.createConfetti(100);
      setTimeout(() => this.particleEngine.createConfetti(60), 600);
    }
  },

  sparkleAtElement(element) {
    if (!element || !this.particleEngine) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    this.particleEngine.createSparkles(x, y, 30);
  },

  setGuideState(state = 'idle') {
    const guide = document.getElementById('guide-character');
    if (!guide) return;
    guide.className = 'guide-character ' + state;
  }
};
