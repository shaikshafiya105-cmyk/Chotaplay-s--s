/**
 * ChotaPlay — Riya's Traffic Rescue
 * Procedural Web Audio API Engine
 * Zero external audio files required! 100% reliable offline sound synthesis.
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.isPlayingMusic = false;
    this.musicTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  ensureContext() {
    this.init();
    return this.ctx && this.ctx.state === 'running';
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startBackgroundMelody();
    } else {
      this.stopBackgroundMelody();
    }
    return this.musicEnabled;
  }

  // --- PROCEDURAL SOUND EFFECTS ---

  // 1. Gentle Snap / Pop / Click
  playSnap() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // 2. Road Completed / Success Chime (Major Triad Sparkle)
  playChime() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const now = this.ctx.currentTime + index * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  // 3. Car Horn / Engine Rev
  playCarHonk() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(440, now); // A4
    osc2.frequency.setValueAtTime(554.37, now); // C#5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  // 4. Traffic Signal Switch (Bip-Bop)
  playSignal() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(900, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 5. Train Choo-Choo Steam Whistle
  playTrainWhistle() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    
    // Whistle dual tone
    [659.25, 783.99].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.4);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.setValueAtTime(0.12, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });

    // Whistle 2 (Choo-Choo second burst)
    [659.25, 783.99].forEach(freq => {
      const later = now + 0.55;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, later);

      gain.gain.setValueAtTime(0.15, later);
      gain.gain.exponentialRampToValueAtTime(0.001, later + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(later);
      osc.stop(later + 0.6);
    });
  }

  // 6. Water Splash & Boat Bell
  playWaterSplash() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    // Bell Ding
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);

    // Water Splash Noise / Swish
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.3, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(300, now + 0.3);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.3);
  }

  // 7. Airplane Takeoff Whoosh / Jet Engine
  playAirplaneWhoosh() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    // Jet Engine Sine sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 1.2);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }

  // 8. Grand Celebration Fanfare Melody
  playFanfare() {
    if (!this.soundEnabled || !this.ensureContext()) return;
    // Cheerful victory melody notes: C4, E4, G4, C5, G4, C5
    const fanfareNotes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 0.15 },
      { f: 783.99, d: 0.15, t: 0.30 },
      { f: 1046.50, d: 0.45, t: 0.45 },
      { f: 880.00, d: 0.2, t: 0.95 },
      { f: 1046.50, d: 0.8, t: 1.15 }
    ];

    fanfareNotes.forEach(note => {
      const now = this.ctx.currentTime + note.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + note.d);
    });
  }

  // 9. Procedural Cheerful Background Lullaby / Tune (Gentle & playful)
  startBackgroundMelody() {
    if (!this.musicEnabled || this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const melodyNotes = [
      523.25, 587.33, 659.25, 523.25, // C D E C
      523.25, 587.33, 659.25, 523.25, // C D E C
      659.25, 698.46, 783.99, 0,      // E F G
      659.25, 698.46, 783.99, 0       // E F G
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.musicEnabled) return;
      if (this.ensureContext()) {
        const freq = melodyNotes[noteIdx % melodyNotes.length];
        if (freq > 0) {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
        }
      }
      noteIdx++;
      this.musicTimer = setTimeout(playNextNote, 420);
    };

    playNextNote();
  }

  stopBackgroundMelody() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

// Global Audio Singleton
window.audioManager = new AudioManager();
