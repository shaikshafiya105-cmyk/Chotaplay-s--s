/**
 * ChotaPlay — Riya's Traffic Rescue
 * High-Performance Canvas Particle System (Confetti, Stars, Sparkles)
 */

class ParticleEngine {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Burst Confetti & Stars from a specific (x, y) or screen center
  burst(x, y, count = 50, type = 'mixed') {
    if (!this.ctx) return;
    const colors = ['#FF4081', '#00E5FF', '#FFD54F', '#00E676', '#FF9100', '#BA68C8', '#FFF'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === 'confetti' ? 4 : 2),
        size: 6 + Math.random() * 8,
        color: color,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.015,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.15,
        shape: type === 'mixed' ? (Math.random() > 0.4 ? 'circle' : 'star') : type
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  // Full-Screen Grand Confetti Cannon
  celebrationCannons() {
    let shots = 0;
    const fire = () => {
      this.burst(window.innerWidth * 0.2, window.innerHeight * 0.7, 40, 'mixed');
      this.burst(window.innerWidth * 0.8, window.innerHeight * 0.7, 40, 'mixed');
      this.burst(window.innerWidth * 0.5, window.innerHeight * 0.5, 50, 'mixed');
      shots++;
      if (shots < 5) {
        setTimeout(fire, 600);
      }
    };
    fire();
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      p.rotation += p.rotSpeed;

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, 5, p.size, p.size / 2, p.color);
      } else if (p.shape === 'rect') {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

// Global Particle Singleton
window.particleEngine = new ParticleEngine();
