import confetti from 'canvas-confetti';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  rotation?: number;
  rotSpeed?: number;
  isStar?: boolean;
}

export class ParticleManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private width: number = window.innerWidth;
  private height: number = window.innerHeight;
  private isRunning: boolean = false;
  private animFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }
    this.ctx = context;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.start();
  }

  public resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(): void {
    // Ambient dust spawner
    if (this.particles.length < 50 && Math.random() < 0.3) {
      this.spawnAmbientDust();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.rotation !== undefined && p.rotSpeed !== undefined) {
        p.rotation += p.rotSpeed;
      }
      p.alpha = Math.max(0, 1 - (p.life / p.maxLife));

      if (p.life >= p.maxLife || p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.translate(p.x, p.y);

      if (p.isStar) {
        if (p.rotation !== undefined) {
          this.ctx.rotate(p.rotation);
        }
        this.drawStar(0, 0, 4, p.size, p.size / 2, p.color);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
      }

      this.ctx.restore();
    }
  }

  private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string): void {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = color;
    this.ctx.fill();
  }

  private spawnAmbientDust(): void {
    const colors = ['#ffd21e', '#00e5ff', '#ff5e97', '#b388ff', '#ffffff'];
    this.particles.push({
      x: Math.random() * this.width,
      y: this.height + 10,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.8 + 0.4),
      size: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      maxLife: Math.random() * 180 + 120,
      life: 0,
      isStar: Math.random() < 0.35,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.03
    });
  }

  /* Particle Effect Triggers */

  public emitSparkleBurst(x: number, y: number, color: string = '#ffd21e', count: number = 24): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color,
        alpha: 1,
        maxLife: Math.random() * 40 + 30,
        life: 0,
        isStar: Math.random() < 0.6,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  public emitAttractionStream(startX: number, startY: number, targetX: number, targetY: number, color: string = '#00e5ff'): void {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const progress = Math.random();
      const px = startX + (targetX - startX) * progress + (Math.random() - 0.5) * 30;
      const py = startY + (targetY - startY) * progress + (Math.random() - 0.5) * 30;
      
      const dx = targetX - px;
      const dy = targetY - py;
      const dist = Math.hypot(dx, dy) || 1;

      this.particles.push({
        x: px,
        y: py,
        vx: (dx / dist) * (Math.random() * 4 + 3),
        vy: (dy / dist) * (Math.random() * 4 + 3),
        size: Math.random() * 4 + 2,
        color,
        alpha: 1,
        maxLife: 40,
        life: 0,
        isStar: true,
        rotation: Math.random() * Math.PI,
        rotSpeed: 0.08
      });
    }
  }

  public emitVortexSwirl(centerX: number, centerY: number, count: number = 36): void {
    const colors = ['#ffd21e', '#00e5ff', '#ff5e97', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 120 + 40;
      const angle = Math.random() * Math.PI * 2;
      const px = centerX + Math.cos(angle) * radius;
      const py = centerY + Math.sin(angle) * radius;

      // Inward swirl velocity
      const tangentAngle = angle + Math.PI / 2;
      const vx = Math.cos(tangentAngle) * 4 - Math.cos(angle) * 2;
      const vy = Math.sin(tangentAngle) * 4 - Math.sin(angle) * 2;

      this.particles.push({
        x: px,
        y: py,
        vx,
        vy,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        maxLife: 50,
        life: 0,
        isStar: true,
        rotation: Math.random() * Math.PI,
        rotSpeed: 0.12
      });
    }
  }

  public triggerCelebrationConfetti(): void {
    // Left cannon
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.75 },
      colors: ['#ffd21e', '#00e5ff', '#ff5e97', '#00e676', '#9d4edd']
    });

    // Right cannon
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.75 },
      colors: ['#ffd21e', '#00e5ff', '#ff5e97', '#00e676', '#9d4edd']
    });

    // Center star burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        shapes: ['star', 'circle'],
        colors: ['#ffd21e', '#ffffff', '#ff9100']
      });
    }, 250);
  }
}
