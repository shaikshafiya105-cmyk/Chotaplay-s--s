/**
 * AudioManager handles zero-latency procedural Web Audio sound synthesis
 * (chimes, sparkles, portal hums, celebratory fanfares, pops, positive rewards)
 * plus Web Speech API child-friendly voice synthesis with voice bubble callbacks.
 */
export class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentSpeech: SpeechSynthesisUtterance | null = null;
  private isSpeechSynthesisSupported: boolean = false;
  private lastSpokenText: string = "";

  constructor() {
    this.isSpeechSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public cancelSpeech(): void {
    if (this.currentSpeech && this.isSpeechSynthesisSupported) {
      window.speechSynthesis.cancel();
      this.currentSpeech = null;
    }
  }

  public initAudioContext(): void {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isSpeechSynthesisSupported) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /* Procedural Sound Effects using Web Audio API */

  public playTwinkle(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.4);
    });
  }

  public playPop(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playGentleEncouragement(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, now); // E4
    osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.15); // G4

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  public playPortalAttraction(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(880, now + 1.0);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.15);
  }

  public playTransformationBurst(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Magical Chord Swell
    const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    chord.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.6);
    });
  }

  public playCelebrationFanfare(): void {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    // Energetic ascending victory fanfare: C5, G5, C6, E6, G6
    const notes = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 659.25, t: 0.15, d: 0.15 },
      { f: 783.99, t: 0.3, d: 0.2 },
      { f: 1046.50, t: 0.5, d: 0.5 },
      { f: 1318.51, t: 0.7, d: 0.8 }
    ];

    notes.forEach(n => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.2, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d + 0.05);
    });
  }

  /* Voice Narration via Web Speech API with fallback */

  public speak(text: string, onEnd?: () => void): void {
    this.lastSpokenText = text;
    if (this.isMuted || !this.isSpeechSynthesisSupported) {
      if (onEnd) setTimeout(onEnd, 1200);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentSpeech = utterance;

      // Child-friendly warm, clear, cheerful voice settings
      utterance.rate = 0.92;   // Slightly relaxed pace for ages 3-6
      utterance.pitch = 1.25;  // Cheerful, friendly cadence
      utterance.volume = 1.0;

      // Try to select a natural English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      const naturalVoice = englishVoices.find(v => 
        v.name.includes('Natural') || 
        v.name.includes('Google') || 
        v.name.includes('Samantha') || 
        v.name.includes('Zira')
      ) || englishVoices[0];

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      if (onEnd) {
        utterance.onend = () => {
          this.currentSpeech = null;
          onEnd();
        };
        utterance.onerror = () => {
          this.currentSpeech = null;
          onEnd();
        };
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[AudioManager] SpeechSynthesis exception:', err);
      if (onEnd) onEnd();
    }
  }

  public replayLastVoice(onEnd?: () => void): void {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, onEnd);
    }
  }
}
