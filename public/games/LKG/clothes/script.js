/**
 * CHOTAPLAY: RIYA'S MAGIC CLOSET
 * UKG Environmental Studies & Early Childhood Learning Game
 * Pure Vanilla JavaScript ES6+ Engine
 */

'use strict';

// ============================================================
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER
// ============================================================
class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playPop() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playSnap() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.25, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.38);
      });
    } catch (e) {}
  }

  playSparkle() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [880, 1174, 1396, 1760, 2093];
      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.18, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.28);
      });
    } catch (e) {}
  }

  playGentleRetry() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.22);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playFanfare() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const fanfare = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 523.25, t: 0.16, d: 0.15 },
        { f: 523.25, t: 0.32, d: 0.15 },
        { f: 659.25, t: 0.48, d: 0.25 },
        { f: 783.99, t: 0.74, d: 0.25 },
        { f: 1046.50, t: 1.0, d: 0.6 }
      ];
      fanfare.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);
        gain.gain.setValueAtTime(0.28, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + note.t);
        osc.stop(now + note.t + note.d + 0.05);
      });
    } catch (e) {}
  }

  playDoorOpen() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }
}

// ============================================================
// 2. SPEECH SYNTHESIS & SUBTITLE MANAGER
// ============================================================
class SpeechManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.lastSpokenText = '';
    this.lastSpeaker = 'star';
    this.bubbleSpeaker = document.getElementById('bubble-speaker');
    this.bubbleText = document.getElementById('bubble-text');
  }

  speak(text, speaker = 'star') {
    this.lastSpokenText = text;
    this.lastSpeaker = speaker;

    // Update Subtitles UI
    if (this.bubbleSpeaker && this.bubbleText) {
      this.bubbleSpeaker.textContent = speaker === 'riya' ? '🌸 Riya' : '⭐ Little Star';
      this.bubbleText.textContent = text;
      
      const bubble = document.getElementById('companion-bubble');
      if (bubble) {
        bubble.classList.remove('pulse-anim');
        void bubble.offsetWidth;
        bubble.classList.add('pulse-anim');
      }
    }

    if (!this.synth) return;

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Clear friendly pace for UKG learners
      utterance.pitch = speaker === 'star' ? 1.35 : 1.25;
      
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural')))) || voices.find(v => v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis non-fatal notice:', e);
    }
  }

  repeat() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, this.lastSpeaker);
    }
  }
}

// ============================================================
// 3. VECTOR SVG CLOTHING & ACCESSORIES DATABASE
// ============================================================
const CLOTHING_DATABASE = {
  // --- HEAD ---
  cap_red: {
    id: 'cap_red',
    name: 'Red Baseball Cap',
    shortName: 'Cap',
    category: 'head',
    bodyZone: 'head',
    weather: 'sunny',
    description: 'We wear a cap on our head to shade our eyes!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <path d="M15 52 Q 50 15 85 52 Q 50 42 15 52 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <path d="M45 48 C 65 48 92 46 96 56 C 85 64 60 56 45 52 Z" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
      <circle cx="50" cy="28" r="4" fill="#fbbf24"/>
    </svg>`
  },
  hat_sun: {
    id: 'hat_sun',
    name: 'Yellow Sun Hat',
    shortName: 'Hat',
    category: 'head',
    bodyZone: 'head',
    weather: 'sunny',
    description: 'We wear a wide hat on our head on sunny days!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <ellipse cx="50" cy="55" rx="46" ry="16" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
      <path d="M28 50 Q 50 15 72 50 Z" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <path d="M28 48 Q 50 54 72 48" stroke="#ec4899" stroke-width="5" fill="none"/>
      <circle cx="68" cy="48" r="5" fill="#ec4899"/>
    </svg>`
  },

  // --- NECK & HANDS ---
  scarf_red: {
    id: 'scarf_red',
    name: 'Warm Red Scarf',
    shortName: 'Scarf',
    category: 'accessories',
    bodyZone: 'neck',
    weather: 'cold',
    description: 'We wrap a cozy scarf around our neck in winter!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <path d="M28 28 C 28 15 72 15 72 28 C 72 38 28 38 28 28 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <path d="M58 28 L64 68 L74 68 L68 28 Z" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
      <line x1="64" y1="68" x2="64" y2="74" stroke="#fef08a" stroke-width="2"/>
      <line x1="69" y1="68" x2="69" y2="74" stroke="#fef08a" stroke-width="2"/>
      <line x1="74" y1="68" x2="74" y2="74" stroke="#fef08a" stroke-width="2"/>
    </svg>`
  },
  gloves_mittens: {
    id: 'gloves_mittens',
    name: 'Warm Mittens',
    shortName: 'Gloves',
    category: 'accessories',
    bodyZone: 'hands',
    weather: 'cold',
    description: 'We wear gloves on our hands to keep them warm!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <g transform="translate(12, 15)">
        <path d="M12 10 Q 24 10 24 28 L24 40 L8 40 L8 24 Q 4 22 4 16 Q 4 10 10 10 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
        <rect x="6" y="38" width="20" height="8" rx="3" fill="#ffffff" stroke="#be123c" stroke-width="1.5"/>
      </g>
      <g transform="translate(52, 15)">
        <path d="M12 10 Q 24 10 24 28 L24 40 L8 40 L8 24 Q 4 22 4 16 Q 4 10 10 10 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
        <rect x="6" y="38" width="20" height="8" rx="3" fill="#ffffff" stroke="#be123c" stroke-width="1.5"/>
      </g>
    </svg>`
  },

  // --- BODY (TOPS / DRESSES / JACKETS / RAINCOATS) ---
  tshirt_yellow: {
    id: 'tshirt_yellow',
    name: 'Yellow Smiley T-Shirt',
    shortName: 'T-shirt',
    category: 'body',
    bodyZone: 'body',
    weather: 'sunny',
    description: 'We wear a light T-shirt on our body when it is sunny!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M30 20 L15 35 L26 44 L32 36 L32 75 L68 75 L68 36 L74 44 L85 35 L70 20 Q 50 28 30 20 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>
      <circle cx="50" cy="48" r="12" fill="#fff"/>
      <circle cx="46" cy="45" r="2" fill="#1e293b"/>
      <circle cx="54" cy="45" r="2" fill="#1e293b"/>
      <path d="M45 52 Q 50 58 55 52" stroke="#1e293b" stroke-width="2" fill="none"/>
    </svg>`
  },
  shirt_formal: {
    id: 'shirt_formal',
    name: 'Smart School Shirt',
    shortName: 'Shirt',
    category: 'body',
    bodyZone: 'body',
    weather: 'school',
    description: 'We wear a smart shirt on our body for school!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M30 20 L15 35 L26 44 L32 36 L32 75 L68 75 L68 36 L74 44 L85 35 L70 20 Q 50 26 30 20 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
      <path d="M42 22 L50 35 L58 22 Z" fill="#2563eb"/>
      <path d="M48 35 L52 35 L54 62 L50 68 L46 62 Z" fill="#dc2626"/>
      <circle cx="50" cy="45" r="2" fill="#94a3b8"/>
      <circle cx="50" cy="55" r="2" fill="#94a3b8"/>
    </svg>`
  },
  dress_pink: {
    id: 'dress_pink',
    name: 'Pink Floral Dress',
    shortName: 'Dress',
    category: 'body',
    bodyZone: 'body',
    weather: 'sunny',
    description: 'We wear a lovely dress on our body!',
    svg: `<svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M32 20 L22 32 L30 36 L34 28 L34 44 L20 82 Q 50 90 80 82 L66 44 L66 28 L70 36 L78 32 L68 20 Q 50 26 32 20 Z" fill="#f472b6" stroke="#db2777" stroke-width="3"/>
      <path d="M38 22 Q 50 30 62 22" fill="#fff" stroke="#fbcfe8" stroke-width="3"/>
      <circle cx="45" cy="55" r="3" fill="#fff"/>
      <circle cx="55" cy="65" r="3" fill="#fff"/>
      <circle cx="36" cy="72" r="3" fill="#fff"/>
      <circle cx="65" cy="72" r="3" fill="#fff"/>
      <circle cx="50" cy="76" r="3" fill="#fff"/>
    </svg>`
  },
  jacket_winter: {
    id: 'jacket_winter',
    name: 'Warm Winter Jacket',
    shortName: 'Jacket',
    category: 'body',
    bodyZone: 'body',
    weather: 'cold',
    description: 'We wear a thick jacket on our body when it is cold!',
    svg: `<svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M30 20 L10 38 L22 48 L32 40 L30 82 L70 82 L68 40 L78 48 L90 38 L70 20 Q 50 26 30 20 Z" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <path d="M28 20 Q 50 28 72 20 Q 50 12 28 20 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
      <line x1="50" y1="20" x2="50" y2="82" stroke="#0369a1" stroke-width="3"/>
      <rect x="34" y="52" width="10" height="12" rx="2" fill="#0369a1"/>
      <rect x="56" y="52" width="10" height="12" rx="2" fill="#0369a1"/>
    </svg>`
  },
  sweater_green: {
    id: 'sweater_green',
    name: 'Cozy Woolen Sweater',
    shortName: 'Sweater',
    category: 'body',
    bodyZone: 'body',
    weather: 'cold',
    description: 'We wear a cozy sweater to stay warm!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M28 22 L10 40 L22 50 L30 40 L30 78 L70 78 L70 40 L78 50 L90 40 L72 22 Q 50 28 28 22 Z" fill="#10b981" stroke="#047857" stroke-width="3"/>
      <path d="M42 45 Q 50 38 58 45 Q 50 62 42 45 Z" fill="#f43f5e"/>
    </svg>`
  },
  raincoat_yellow: {
    id: 'raincoat_yellow',
    name: 'Bright Yellow Raincoat',
    shortName: 'Raincoat',
    category: 'body',
    bodyZone: 'body',
    weather: 'rainy',
    description: 'We wear a raincoat over our body to stay dry in rain!',
    svg: `<svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M32 18 L12 36 L24 46 L32 38 L30 84 Q 50 90 70 84 L68 38 L76 46 L88 36 L68 18 Q 50 24 32 18 Z" fill="#eab308" stroke="#a16207" stroke-width="3"/>
      <path d="M30 18 Q 50 5 70 18 Z" fill="#facc15" stroke="#a16207" stroke-width="2"/>
      <circle cx="50" cy="38" r="3" fill="#1e293b"/>
      <circle cx="50" cy="52" r="3" fill="#1e293b"/>
      <circle cx="50" cy="66" r="3" fill="#1e293b"/>
      <line x1="50" y1="24" x2="50" y2="86" stroke="#ca8a04" stroke-width="2"/>
    </svg>`
  },

  // --- LEGS ---
  pants_jeans: {
    id: 'pants_jeans',
    name: 'Blue Denim Pants',
    shortName: 'Pants',
    category: 'legs',
    bodyZone: 'legs',
    weather: 'sunny',
    description: 'We wear pants on our legs!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M30 18 L70 18 L68 80 L53 80 L50 36 L47 80 L32 80 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
      <line x1="30" y1="28" x2="70" y2="28" stroke="#1d4ed8" stroke-width="2"/>
      <rect x="36" y="32" width="8" height="10" rx="2" fill="#60a5fa"/>
      <rect x="56" y="32" width="8" height="10" rx="2" fill="#60a5fa"/>
    </svg>`
  },
  shorts_blue: {
    id: 'shorts_blue',
    name: 'Cool Summer Shorts',
    shortName: 'Shorts',
    category: 'legs',
    bodyZone: 'legs',
    weather: 'sunny',
    description: 'We wear shorts on our legs on warm days!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M30 20 L70 20 L68 56 L52 56 L50 32 L48 56 L32 56 Z" fill="#0ea5e9" stroke="#0284c7" stroke-width="3"/>
      <line x1="30" y1="28" x2="70" y2="28" stroke="#0284c7" stroke-width="2"/>
      <circle cx="40" cy="38" r="4" fill="#fef08a"/>
      <circle cx="60" cy="44" r="4" fill="#fef08a"/>
    </svg>`
  },
  skirt_pleated: {
    id: 'skirt_pleated',
    name: 'Pleated School Skirt',
    shortName: 'Skirt',
    category: 'legs',
    bodyZone: 'legs',
    weather: 'school',
    description: 'We wear a skirt around our waist and legs!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M34 22 L66 22 L76 65 L24 65 Z" fill="#1e3a8a" stroke="#172554" stroke-width="3"/>
      <line x1="42" y1="22" x2="40" y2="65" stroke="#3b82f6" stroke-width="2"/>
      <line x1="50" y1="22" x2="50" y2="65" stroke="#3b82f6" stroke-width="2"/>
      <line x1="58" y1="22" x2="60" y2="65" stroke="#3b82f6" stroke-width="2"/>
    </svg>`
  },

  // --- FEET ---
  socks_striped: {
    id: 'socks_striped',
    name: 'Striped Cozy Socks',
    shortName: 'Socks',
    category: 'feet',
    bodyZone: 'feet',
    weather: 'cold',
    description: 'We wear socks on our feet inside shoes!',
    svg: `<svg viewBox="0 0 100 70" width="100%" height="100%">
      <g transform="translate(18, 8)">
        <path d="M10 5 L24 5 L24 24 L34 28 L30 38 L8 32 L8 5 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
        <line x1="9" y1="12" x2="23" y2="12" stroke="#fff" stroke-width="2"/>
        <line x1="9" y1="18" x2="23" y2="18" stroke="#fff" stroke-width="2"/>
      </g>
      <g transform="translate(52, 8)">
        <path d="M10 5 L24 5 L24 24 L34 28 L30 38 L8 32 L8 5 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
        <line x1="9" y1="12" x2="23" y2="12" stroke="#fff" stroke-width="2"/>
        <line x1="9" y1="18" x2="23" y2="18" stroke="#fff" stroke-width="2"/>
      </g>
    </svg>`
  },
  shoes_sneakers: {
    id: 'shoes_sneakers',
    name: 'Running Shoes',
    shortName: 'Shoes',
    category: 'feet',
    bodyZone: 'feet',
    weather: 'sunny',
    description: 'We wear shoes on our feet to run and walk safely!',
    svg: `<svg viewBox="0 0 100 70" width="100%" height="100%">
      <g transform="translate(14, 15)">
        <path d="M5 25 Q 15 10 25 15 L32 25 L32 32 L5 32 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
        <rect x="3" y="30" width="31" height="6" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="15" y1="16" x2="22" y2="24" stroke="#fff" stroke-width="2"/>
      </g>
      <g transform="translate(48, 15)">
        <path d="M5 25 Q 15 10 25 15 L32 25 L32 32 L5 32 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
        <rect x="3" y="30" width="31" height="6" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="15" y1="16" x2="22" y2="24" stroke="#fff" stroke-width="2"/>
      </g>
    </svg>`
  },
  sandals_summer: {
    id: 'sandals_summer',
    name: 'Open Sandals',
    shortName: 'Sandals',
    category: 'feet',
    bodyZone: 'feet',
    weather: 'sunny',
    description: 'We wear light sandals on our feet in summer!',
    svg: `<svg viewBox="0 0 100 70" width="100%" height="100%">
      <g transform="translate(14, 18)">
        <rect x="4" y="24" width="28" height="6" rx="3" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
        <path d="M8 24 Q 18 10 28 24" stroke="#f43f5e" stroke-width="3" fill="none"/>
      </g>
      <g transform="translate(48, 18)">
        <rect x="4" y="24" width="28" height="6" rx="3" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
        <path d="M8 24 Q 18 10 28 24" stroke="#f43f5e" stroke-width="3" fill="none"/>
      </g>
    </svg>`
  },
  boots_rain: {
    id: 'boots_rain',
    name: 'Yellow Gumboots',
    shortName: 'Boots',
    category: 'feet',
    bodyZone: 'feet',
    weather: 'rainy',
    description: 'We wear boots on our feet to splash in puddles safely!',
    svg: `<svg viewBox="0 0 100 70" width="100%" height="100%">
      <g transform="translate(14, 10)">
        <path d="M12 5 L26 5 L26 24 L34 26 L34 36 L8 36 L8 24 L12 24 Z" fill="#eab308" stroke="#a16207" stroke-width="2"/>
      </g>
      <g transform="translate(48, 10)">
        <path d="M12 5 L26 5 L26 24 L34 26 L34 36 L8 36 L8 24 L12 24 Z" fill="#eab308" stroke="#a16207" stroke-width="2"/>
      </g>
    </svg>`
  },

  // --- WEATHER & SCHOOL EXTRAS ---
  umbrella_rainbow: {
    id: 'umbrella_rainbow',
    name: 'Rainbow Umbrella',
    shortName: 'Umbrella',
    category: 'accessories',
    bodyZone: 'hands',
    weather: 'rainy',
    description: 'We hold an umbrella to shield us from raindrops!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <path d="M15 50 Q 50 10 85 50 Q 73 45 61 50 Q 50 45 38 50 Q 26 45 15 50 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      <path d="M38 50 Q 50 10 61 50 Q 50 45 38 50 Z" fill="#f43f5e"/>
      <path d="M15 50 Q 30 15 38 50 Q 26 45 15 50 Z" fill="#facc15"/>
      <line x1="50" y1="10" x2="50" y2="75" stroke="#334155" stroke-width="3"/>
      <path d="M50 75 Q 50 85 42 85 Q 36 85 36 78" stroke="#334155" stroke-width="3" fill="none"/>
    </svg>`
  },
  backpack_school: {
    id: 'backpack_school',
    name: 'School Backpack',
    shortName: 'Backpack',
    category: 'school',
    bodyZone: 'body',
    weather: 'school',
    description: 'We carry our books in our school bag!',
    svg: `<svg viewBox="0 0 100 90" width="100%" height="100%">
      <rect x="25" y="20" width="50" height="58" rx="14" fill="#eab308" stroke="#a16207" stroke-width="3"/>
      <rect x="32" y="44" width="36" height="26" rx="8" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <path d="M40 20 Q 50 10 60 20" stroke="#a16207" stroke-width="3" fill="none"/>
      <circle cx="50" cy="55" r="4" fill="#f43f5e"/>
    </svg>`
  },
  book_school: {
    id: 'book_school',
    name: 'Story Book',
    shortName: 'Book',
    category: 'school',
    bodyZone: 'hands',
    weather: 'school',
    description: 'Books help us read and learn at school!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <path d="M18 20 Q 50 12 50 25 Q 50 68 50 68 Q 18 60 18 20 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <path d="M82 20 Q 50 12 50 25 Q 50 68 50 68 Q 82 60 82 20 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <path d="M22 24 Q 48 18 48 27 L48 64 Q 22 58 22 24 Z" fill="#ffffff"/>
      <path d="M78 24 Q 52 18 52 27 L52 64 Q 78 58 78 24 Z" fill="#ffffff"/>
    </svg>`
  },
  pencil_school: {
    id: 'pencil_school',
    name: 'Color Pencil',
    shortName: 'Pencil',
    category: 'school',
    bodyZone: 'hands',
    weather: 'school',
    description: 'We use pencils to write and draw!',
    svg: `<svg viewBox="0 0 100 80" width="100%" height="100%">
      <g transform="rotate(-35, 50, 40)">
        <polygon points="15,35 25,28 25,42" fill="#fed7aa" stroke="#ca8a04" stroke-width="1.5"/>
        <polygon points="15,35 19,32 19,38" fill="#1e293b"/>
        <rect x="25" y="28" width="50" height="14" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <rect x="75" y="28" width="10" height="14" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
      </g>
    </svg>`
  }
};

// ============================================================
// 4. FULLY DRESSED RIYA & LITTLE STAR RENDERERS
// ============================================================
class CharacterRenderer {
  constructor(guideHostId, starHostId) {
    this.guideHost = document.getElementById(guideHostId);
    this.starHost = document.getElementById(starHostId);
    this.renderRiya();
    this.renderLittleStar();
  }

  // Mandatory Riya Rule: Riya is ALWAYS fully and appropriately dressed.
  renderRiya() {
    if (!this.guideHost) return;

    this.guideHost.innerHTML = `
      <svg viewBox="0 0 300 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="skinGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#ffd5be"/>
            <stop offset="100%" stop-color="#f8bfa2"/>
          </radialGradient>
          <radialGradient id="hairGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#5a2d18"/>
            <stop offset="100%" stop-color="#341508"/>
          </radialGradient>
          <radialGradient id="hoodieGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#fde047"/>
            <stop offset="100%" stop-color="#eab308"/>
          </radialGradient>
          <radialGradient id="denimGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </radialGradient>
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff6b8b" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#ff6b8b" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Hair Back / Pigtails -->
        <g id="riya-hair-back">
          <!-- Left Pigtail -->
          <path d="M90 120 C 40 100 20 180 60 210 C 90 220 110 160 90 120 Z" fill="url(#hairGrad)"/>
          <circle cx="85" cy="135" r="9" fill="#ff529a"/>
          <!-- Right Pigtail -->
          <path d="M210 120 C 260 100 280 180 240 210 C 210 220 190 160 210 120 Z" fill="url(#hairGrad)"/>
          <circle cx="215" cy="135" r="9" fill="#ff529a"/>
        </g>

        <!-- Legs with Soft Leggings (Fully Dressed) -->
        <g id="riya-legs">
          <!-- Left Leg -->
          <path d="M125 310 L125 385 Q 125 395 135 395 L135 310 Z" fill="#93c5fd" stroke="#60a5fa" stroke-width="2"/>
          <!-- Right Leg -->
          <path d="M165 310 L165 385 Q 165 395 175 395 L175 310 Z" fill="#93c5fd" stroke="#60a5fa" stroke-width="2"/>
          
          <!-- Socks & Cute Sneakers -->
          <!-- Left Shoe -->
          <g transform="translate(112, 385)">
            <rect x="10" y="0" width="16" height="8" fill="#ffffff" rx="3"/>
            <path d="M2 8 Q 12 -4 24 2 L32 10 L32 20 L2 20 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
            <rect x="0" y="18" width="34" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          </g>
          <!-- Right Shoe -->
          <g transform="translate(154, 385)">
            <rect x="10" y="0" width="16" height="8" fill="#ffffff" rx="3"/>
            <path d="M2 8 Q 12 -4 24 2 L32 10 L32 20 L2 20 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
            <rect x="0" y="18" width="34" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          </g>
        </g>

        <!-- Torso with Sunshine Yellow Hoodie & Denim Overalls (Fully Dressed) -->
        <g id="riya-torso-clothes">
          <!-- Yellow Top Base -->
          <path d="M110 170 L80 230 L100 240 L115 200 L115 310 L185 310 L185 200 L200 240 L220 230 L190 170 Q 150 185 110 170 Z" fill="url(#hoodieGrad)" stroke="#ca8a04" stroke-width="2.5"/>
          
          <!-- Denim Overall Skirt -->
          <path d="M118 220 L182 220 L192 315 L108 315 Z" fill="url(#denimGrad)" stroke="#1e40af" stroke-width="2.5"/>
          <!-- Overall Straps & Buttons -->
          <path d="M125 185 L135 185 L135 230 L125 230 Z" fill="url(#denimGrad)"/>
          <circle cx="130" cy="225" r="3.5" fill="#fde047"/>
          <path d="M165 185 L175 185 L175 230 L165 230 Z" fill="url(#denimGrad)"/>
          <circle cx="170" cy="225" r="3.5" fill="#fde047"/>
          
          <!-- Cute Pocket with Star -->
          <rect x="135" y="245" width="30" height="25" rx="5" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
          <polygon points="150,250 152,256 158,256 153,260 155,266 150,262 145,266 147,260 142,256 148,256" fill="#fef08a"/>
        </g>

        <!-- Hands (Clapping / Waving) -->
        <g id="riya-hands">
          <!-- Left Arm & Hand -->
          <path d="M85 225 Q 70 260 90 280 Q 98 280 102 265 L98 232 Z" fill="url(#skinGrad)" stroke="#e2a88e" stroke-width="2"/>
          <!-- Right Arm & Hand (Waving cheerfully) -->
          <path d="M215 225 Q 235 200 245 170 Q 255 175 250 190 L220 235 Z" fill="url(#skinGrad)" stroke="#e2a88e" stroke-width="2"/>
          <circle cx="248" cy="170" r="8" fill="url(#skinGrad)"/>
        </g>

        <!-- Neck -->
        <path d="M136 150 L136 175 Q 150 182 164 175 L164 150 Z" fill="url(#skinGrad)"/>

        <!-- Head & Face -->
        <g id="riya-head">
          <ellipse cx="150" cy="115" rx="55" ry="52" fill="url(#skinGrad)"/>
          
          <!-- Blushing Cheeks -->
          <ellipse cx="120" cy="128" rx="14" ry="9" fill="url(#blushGrad)"/>
          <ellipse cx="180" cy="128" rx="14" ry="9" fill="url(#blushGrad)"/>

          <!-- Eyes (Big Sparkling Anime-style Eyes) -->
          <!-- Left Eye -->
          <ellipse cx="128" cy="112" rx="9" ry="12" fill="#2e1005"/>
          <circle cx="125" cy="107" r="4" fill="#ffffff"/>
          <circle cx="131" cy="116" r="2" fill="#ffffff"/>
          <path d="M118 98 Q 128 92 138 98" stroke="#341508" stroke-width="3" fill="none" stroke-linecap="round"/>
          
          <!-- Right Eye -->
          <ellipse cx="172" cy="112" rx="9" ry="12" fill="#2e1005"/>
          <circle cx="169" cy="107" r="4" fill="#ffffff"/>
          <circle cx="175" cy="116" r="2" fill="#ffffff"/>
          <path d="M162 98 Q 172 92 182 98" stroke="#341508" stroke-width="3" fill="none" stroke-linecap="round"/>

          <!-- Cute Button Nose -->
          <ellipse cx="150" cy="122" rx="3" ry="2" fill="#e59877"/>

          <!-- Cheerful Smile -->
          <path d="M138 132 Q 150 148 162 132" fill="#d946ef" stroke="#be185d" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Hair Front & Bangs -->
          <path d="M98 105 C 98 60 202 60 202 105 C 190 92 170 98 150 90 C 130 98 110 92 98 105 Z" fill="url(#hairGrad)"/>
          <path d="M130 85 Q 150 108 170 85" fill="none" stroke="url(#hairGrad)" stroke-width="8" stroke-linecap="round"/>

          <!-- Pink Bow Headband -->
          <path d="M100 85 Q 150 62 200 85" fill="none" stroke="#ff529a" stroke-width="5"/>
          <g transform="translate(150, 68)">
            <path d="M-14 -6 L-2 0 L-14 6 Z" fill="#ff75ab"/>
            <path d="M14 -6 L2 0 L14 6 Z" fill="#ff75ab"/>
            <circle cx="0" cy="0" r="5" fill="#fde047"/>
          </g>
        </g>
      </svg>
    `;
  }

  renderLittleStar() {
    if (!this.starHost) return;

    this.starHost.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id="starGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="40%" stop-color="#fef08a"/>
            <stop offset="85%" stop-color="#facc15"/>
            <stop offset="100%" stop-color="#eab308"/>
          </radialGradient>
        </defs>
        <!-- 5-Point Star Body -->
        <polygon points="50,6 63,35 95,37 70,58 78,90 50,72 22,90 30,58 5,37 37,35" fill="url(#starGrad)" stroke="#ca8a04" stroke-width="3" stroke-linejoin="round"/>
        
        <!-- Big Cute Star Eyes -->
        <ellipse cx="42" cy="48" rx="4" ry="6" fill="#1e293b"/>
        <circle cx="40" cy="46" r="1.5" fill="#ffffff"/>
        <ellipse cx="58" cy="48" rx="4" ry="6" fill="#1e293b"/>
        <circle cx="56" cy="46" r="1.5" fill="#ffffff"/>
        
        <!-- Cheerful Smile & Rosy Cheeks -->
        <circle cx="34" cy="54" r="3" fill="#f472b6" opacity="0.7"/>
        <circle cx="66" cy="54" r="3" fill="#f472b6" opacity="0.7"/>
        <path d="M44 56 Q 50 64 56 56" stroke="#92400e" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        
        <!-- Sparkle Highlights -->
        <polygon points="50,15 52,22 58,22 53,26 55,32 50,28 45,32 47,26 42,22 48,22" fill="#ffffff" opacity="0.8"/>
      </svg>
    `;
  }
}

// ============================================================
// 5. EDUCATIONAL MANNEQUIN DIAGRAM RENDERER (Game 7)
// ============================================================
class MannequinRenderer {
  static render(hostId) {
    const host = document.getElementById(hostId);
    if (!host) return;

    host.innerHTML = `
      <svg viewBox="0 0 200 320" width="100%" height="100%">
        <!-- Body Part Zones Background Highlights -->
        <!-- HEAD Zone -->
        <circle id="mannequin-zone-head" cx="100" cy="40" r="32" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
        <text x="100" y="44" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">HEAD 🧢</text>

        <!-- NECK Zone -->
        <rect id="mannequin-zone-neck" x="85" y="76" width="30" height="16" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
        <text x="100" y="88" font-size="9" font-weight="bold" fill="#9a3412" text-anchor="middle">NECK 🧣</text>

        <!-- BODY / TORSO Zone -->
        <rect id="mannequin-zone-body" x="65" y="96" width="70" height="85" rx="10" fill="#bfdbfe" stroke="#2563eb" stroke-width="2.5"/>
        <text x="100" y="142" font-size="14" font-weight="bold" fill="#1e40af" text-anchor="middle">BODY 👕</text>

        <!-- HANDS / ARMS Zones -->
        <g id="mannequin-zone-hands">
          <rect x="35" y="105" width="22" height="75" rx="8" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
          <circle cx="46" cy="188" r="10" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
          <rect x="143" y="105" width="22" height="75" rx="8" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
          <circle cx="154" cy="188" r="10" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
          <text x="100" y="180" font-size="11" font-weight="bold" fill="#9d174d" text-anchor="middle">HANDS 🧤</text>
        </g>

        <!-- LEGS Zone -->
        <g id="mannequin-zone-legs">
          <rect x="70" y="188" width="25" height="85" rx="6" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
          <rect x="105" y="188" width="25" height="85" rx="6" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
          <text x="100" y="235" font-size="13" font-weight="bold" fill="#15803d" text-anchor="middle">LEGS 👖</text>
        </g>

        <!-- FEET Zone -->
        <g id="mannequin-zone-feet">
          <ellipse cx="78" cy="290" rx="18" ry="10" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
          <ellipse cx="122" cy="290" rx="18" ry="10" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
          <text x="100" y="294" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">FEET 👟</text>
        </g>
      </svg>
    `;
  }
}

// ============================================================
// 6. CANVAS PARTICLE & WEATHER ENGINE
// ============================================================
class ParticleEngine {
  constructor(weatherCanvasId, particleCanvasId) {
    this.weatherCanvas = document.getElementById(weatherCanvasId);
    this.particleCanvas = document.getElementById(particleCanvasId);
    
    this.wCtx = this.weatherCanvas ? this.weatherCanvas.getContext('2d') : null;
    this.pCtx = this.particleCanvas ? this.particleCanvas.getContext('2d') : null;

    this.weatherMode = 'closet'; // closet, sunny, rainy, cold, celebration
    this.weatherParticles = [];
    this.sparkleParticles = [];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initWeatherParticles();
    this.loop();
  }

  resize() {
    if (this.weatherCanvas) {
      this.weatherCanvas.width = window.innerWidth;
      this.weatherCanvas.height = window.innerHeight;
    }
    if (this.particleCanvas) {
      this.particleCanvas.width = window.innerWidth;
      this.particleCanvas.height = window.innerHeight;
    }
  }

  setWeather(mode) {
    this.weatherMode = mode;
    this.initWeatherParticles();
  }

  initWeatherParticles() {
    this.weatherParticles = [];
    if (!this.weatherCanvas) return;

    const count = this.weatherMode === 'rainy' ? 90 : (this.weatherMode === 'cold' ? 70 : 35);
    for (let i = 0; i < count; i++) {
      this.weatherParticles.push({
        x: Math.random() * this.weatherCanvas.width,
        y: Math.random() * this.weatherCanvas.height,
        speedY: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
  }

  burstSparkles(x, y, count = 30) {
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#fbbf24', '#f97316'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.sparkleParticles.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  loop() {
    // 1. Render Weather
    if (this.wCtx && this.weatherCanvas) {
      this.wCtx.clearRect(0, 0, this.weatherCanvas.width, this.weatherCanvas.height);

      if (this.weatherMode === 'rainy') {
        this.wCtx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
        this.wCtx.lineWidth = 2;
        this.weatherParticles.forEach(p => {
          this.wCtx.beginPath();
          this.wCtx.moveTo(p.x, p.y);
          this.wCtx.lineTo(p.x + p.speedX * 1.5, p.y + p.speedY * 4);
          this.wCtx.stroke();
          p.y += p.speedY * 3.5;
          p.x += p.speedX;
          if (p.y > this.weatherCanvas.height) {
            p.y = -10;
            p.x = Math.random() * this.weatherCanvas.width;
          }
        });
      } else if (this.weatherMode === 'cold') {
        this.wCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.weatherParticles.forEach(p => {
          this.wCtx.beginPath();
          this.wCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.wCtx.fill();
          p.y += p.speedY * 0.8;
          p.x += Math.sin(p.y * 0.05) * 1.2;
          if (p.y > this.weatherCanvas.height) {
            p.y = -10;
            p.x = Math.random() * this.weatherCanvas.width;
          }
        });
      } else if (this.weatherMode === 'sunny') {
        this.weatherParticles.forEach(p => {
          this.wCtx.fillStyle = `rgba(255, 240, 150, ${p.opacity * 0.4})`;
          this.wCtx.beginPath();
          this.wCtx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          this.wCtx.fill();
          p.y -= p.speedY * 0.4;
          if (p.y < -10) p.y = this.weatherCanvas.height + 10;
        });
      }
    }

    // 2. Render Sparkles & Confetti
    if (this.pCtx && this.particleCanvas) {
      this.pCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
      for (let i = this.sparkleParticles.length - 1; i >= 0; i--) {
        const p = this.sparkleParticles[i];
        this.pCtx.fillStyle = p.color;
        this.pCtx.globalAlpha = p.life;
        this.pCtx.beginPath();
        this.pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.pCtx.fill();
        this.pCtx.globalAlpha = 1.0;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14; // Gravity
        p.life -= p.decay;

        if (p.life <= 0) {
          this.sparkleParticles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}

// ============================================================
// 7. MAIN GAME ENGINE CONTROLLER
// ============================================================
class GameEngine {
  constructor() {
    this.audio = new AudioManager();
    this.speech = new SpeechManager();
    this.renderer = new CharacterRenderer('riya-guide', 'star-svg-host');
    this.particles = new ParticleEngine('weather-canvas', 'particles-canvas');

    this.currentActivityIndex = 0;
    this.completedBadges = new Set();
    this.totalActivities = 8;

    // Mini Game Catalog (8 Games)
    this.activities = [
      { id: 'discovery', name: '1. Magic Closet Discovery', icon: '🔍', fn: () => this.startDiscoveryGame() },
      { id: 'where-belong', name: '2. Where Does It Belong?', icon: '🧩', fn: () => this.startWhereBelongGame() },
      { id: 'weather-detective', name: '3. Weather Detective', icon: '☀️', fn: () => this.startWeatherDetectiveGame('sunny') },
      { id: 'school-bag', name: '4. What’s In The School Bag?', icon: '🎒', fn: () => this.startSchoolBagGame() },
      { id: 'clothing-detective', name: '5. Clothing Detective', icon: '🧐', fn: () => this.startClothingDetectiveGame() },
      { id: 'clothing-sorter', name: '6. Magic Clothing Sorter', icon: '🧺', fn: () => this.startClothingSorterGame() },
      { id: 'body-diagram', name: '7. Where Do We Wear It?', icon: '📍', fn: () => this.startBodyDiagramGame() },
      { id: 'closet-surprise', name: '8. Magic Closet Surprise', icon: '🚪', fn: () => this.startClosetSurpriseGame() }
    ];

    this.initUI();
    this.initProgressStars();
    this.initActivitiesMenu();
    MannequinRenderer.render('mannequin-svg-host');
  }

  initUI() {
    const unlockAudio = () => {
      this.audio.init();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    // Nav Buttons
    document.getElementById('btn-home')?.addEventListener('click', () => {
      this.audio.playPop();
      this.showScene('scene-intro', 'closet');
      this.speech.speak("Welcome to Riya's Magic Closet! Let's discover clothes!");
    });

    document.getElementById('btn-activities')?.addEventListener('click', () => {
      this.audio.playPop();
      this.toggleModal('modal-activities', true);
    });

    document.getElementById('btn-close-activities')?.addEventListener('click', () => {
      this.audio.playPop();
      this.toggleModal('modal-activities', false);
    });

    document.getElementById('btn-freeplay')?.addEventListener('click', () => {
      this.audio.playPop();
      this.startFreePlay();
    });

    document.getElementById('btn-intro-freeplay')?.addEventListener('click', () => {
      this.audio.playPop();
      this.startFreePlay();
    });

    document.getElementById('btn-speak-again')?.addEventListener('click', () => {
      this.audio.playPop();
      this.speech.repeat();
    });

    document.getElementById('btn-sound-toggle')?.addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      document.getElementById('sound-icon').textContent = isMuted ? '🔇' : '🎵';
      document.getElementById('sound-label').textContent = isMuted ? 'Muted' : 'Sound On';
    });

    // Start Button in Intro
    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      this.audio.playChime();
      this.particles.burstSparkles(window.innerWidth / 2, window.innerHeight / 2, 40);
      this.startDiscoveryGame();
    });

    // Celebration actions
    document.getElementById('btn-celebrate-replay')?.addEventListener('click', () => {
      this.completedBadges.clear();
      this.updateProgressUI();
      this.startDiscoveryGame();
    });

    document.getElementById('btn-celebrate-freeplay')?.addEventListener('click', () => {
      this.startFreePlay();
    });

    // Little Star interactive tap
    document.getElementById('little-star-companion')?.addEventListener('click', () => {
      this.audio.playSparkle();
      this.particles.burstSparkles(window.innerWidth * 0.25, window.innerHeight * 0.25, 20);
      this.speech.speak("I am Little Star! Look at all these wonderful clothes in our magic closet!");
    });
  }

  initProgressStars() {
    const starContainer = document.getElementById('star-indicators');
    if (!starContainer) return;
    starContainer.innerHTML = '';
    for (let i = 0; i < this.totalActivities; i++) {
      const dot = document.createElement('div');
      dot.className = 'star-dot';
      dot.id = `star-dot-${i}`;
      dot.textContent = '★';
      starContainer.appendChild(dot);
    }
  }

  initActivitiesMenu() {
    const list = document.getElementById('activities-menu-list');
    if (!list) return;
    list.innerHTML = '';
    this.activities.forEach((act, idx) => {
      const item = document.createElement('div');
      item.className = 'activity-menu-item';
      item.innerHTML = `
        <span class="menu-item-icon">${act.icon}</span>
        <span class="menu-item-title">${act.name}</span>
      `;
      item.addEventListener('click', () => {
        this.audio.playPop();
        this.toggleModal('modal-activities', false);
        this.currentActivityIndex = idx;
        act.fn();
      });
      list.appendChild(item);
    });
  }

  showScene(sceneId, theme = 'closet') {
    document.querySelectorAll('.scene-view').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) target.classList.add('active');

    const backdrop = document.getElementById('stage-backdrop');
    if (backdrop) {
      backdrop.className = `stage-backdrop theme-${theme}`;
    }
    this.particles.setWeather(theme);
  }

  toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (show) modal.classList.add('active');
      else modal.classList.remove('active');
    }
  }

  markCompleted(activityIdx) {
    this.completedBadges.add(activityIdx);
    this.updateProgressUI();

    if (this.completedBadges.size >= this.totalActivities) {
      setTimeout(() => {
        this.startFinalCelebration();
      }, 1200);
    }
  }

  updateProgressUI() {
    const count = this.completedBadges.size;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
      progressFill.style.width = `${(count / this.totalActivities) * 100}%`;
    }
    if (progressText) {
      progressText.textContent = `${count} / ${this.totalActivities} Badges`;
    }

    for (let i = 0; i < this.totalActivities; i++) {
      const dot = document.getElementById(`star-dot-${i}`);
      if (dot) {
        if (this.completedBadges.has(i)) dot.classList.add('active');
        else dot.classList.remove('active');
      }
    }
  }

  triggerRiyaAnimation(animClass) {
    const guide = document.getElementById('riya-guide');
    if (!guide) return;
    guide.className = 'riya-character ' + animClass;
    setTimeout(() => {
      if (guide) guide.className = 'riya-character anim-idle';
    }, 1600);
  }

  // ============================================================
  // GAME 1: MAGIC CLOSET DISCOVERY (Exploration)
  // ============================================================
  startDiscoveryGame() {
    this.currentActivityIndex = 0;
    this.showScene('scene-discovery', 'closet');

    const targets = ['tshirt_yellow', 'pants_jeans', 'cap_red', 'jacket_winter', 'shoes_sneakers', 'dress_pink'];
    let step = 0;

    const loadStep = () => {
      const targetId = targets[step];
      const targetItem = CLOTHING_DATABASE[targetId];

      const promptEl = document.getElementById('discovery-prompt');
      if (promptEl) promptEl.textContent = `Can you find the ${targetItem.shortName}?`;

      this.speech.speak(`Can you find the ${targetItem.shortName}?`);

      const grid = document.getElementById('discovery-sections-grid');
      if (!grid) return;
      grid.innerHTML = '';

      // Pick 5 distractors + target
      const pool = Object.keys(CLOTHING_DATABASE).filter(k => k !== targetId);
      const distractors = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
      const displayItems = [targetId, ...distractors].sort(() => 0.5 - Math.random());

      displayItems.forEach(id => {
        const item = CLOTHING_DATABASE[id];
        const card = document.createElement('div');
        card.className = 'clothing-item-card';
        card.innerHTML = `
          <div class="clothing-card-svg">${item.svg}</div>
          <div class="clothing-card-label">${item.shortName}</div>
        `;

        card.addEventListener('click', (e) => {
          if (id === targetId) {
            // Correct choice
            this.audio.playSnap();
            this.audio.playChime();
            this.particles.burstSparkles(e.clientX, e.clientY, 35);
            this.triggerRiyaAnimation('anim-happy');
            this.speech.speak(`${targetItem.shortName}! That's a ${targetItem.shortName}!`, 'riya');

            card.classList.add('item-highlight');

            setTimeout(() => {
              step++;
              if (step < targets.length) {
                loadStep();
              } else {
                this.markCompleted(0);
                this.speech.speak("Hooray! You discovered all the clothes in the wardrobe!");
                setTimeout(() => this.startWhereBelongGame(), 1800);
              }
            }, 1800);
          } else {
            // Gentle retry
            this.audio.playGentleRetry();
            card.style.borderColor = '#f59e0b';
            this.speech.speak(`That's the ${item.shortName}. Look carefully for the ${targetItem.shortName}!`);
          }
        });

        grid.appendChild(card);
      });
    };

    loadStep();
  }

  // ============================================================
  // GAME 2: WHERE DOES IT BELONG? (Sorting Puzzle)
  // ============================================================
  startWhereBelongGame() {
    this.currentActivityIndex = 1;
    this.showScene('scene-where-belong', 'closet');

    const itemsToSort = [
      { id: 'cap_red', zone: 'head', zoneName: 'Head' },
      { id: 'hat_sun', zone: 'head', zoneName: 'Head' },
      { id: 'shirt_formal', zone: 'body', zoneName: 'Body' },
      { id: 'tshirt_yellow', zone: 'body', zoneName: 'Body' },
      { id: 'dress_pink', zone: 'body', zoneName: 'Body' },
      { id: 'jacket_winter', zone: 'body', zoneName: 'Body' },
      { id: 'pants_jeans', zone: 'legs', zoneName: 'Legs' },
      { id: 'shorts_blue', zone: 'legs', zoneName: 'Legs' },
      { id: 'socks_striped', zone: 'feet', zoneName: 'Feet' },
      { id: 'shoes_sneakers', zone: 'feet', zoneName: 'Feet' },
      { id: 'sandals_summer', zone: 'feet', zoneName: 'Feet' },
      { id: 'scarf_red', zone: 'neck', zoneName: 'Neck' },
      { id: 'gloves_mittens', zone: 'hands', zoneName: 'Hands' },
      { id: 'raincoat_yellow', zone: 'body', zoneName: 'Body' }
    ];

    let currentIdx = 0;
    let counts = { head: 0, neck: 0, body: 0, hands: 0, legs: 0, feet: 0 };

    const updateCounts = () => {
      ['head', 'neck', 'body', 'hands', 'legs', 'feet'].forEach(z => {
        const el = document.getElementById(`zone-${z}-count`);
        if (el) el.textContent = `${counts[z]} items`;
      });
    };
    updateCounts();

    const spawnCard = () => {
      if (currentIdx >= itemsToSort.length) {
        this.markCompleted(1);
        this.audio.playFanfare();
        this.speech.speak("Wonderful job! You sorted every clothing item to where it belongs!");
        setTimeout(() => this.startWeatherDetectiveGame('sunny'), 1800);
        return;
      }

      const cur = itemsToSort[currentIdx];
      const item = CLOTHING_DATABASE[cur.id];

      const promptEl = document.getElementById('where-belong-prompt');
      if (promptEl) promptEl.textContent = `Where does the ${item.shortName} belong?`;

      this.speech.speak(`Where does the ${item.shortName} belong?`);

      const holder = document.getElementById('where-belong-item-holder');
      if (!holder) return;
      holder.innerHTML = `
        <div class="clothing-item-card" style="width:120px;height:120px;">
          <div class="clothing-card-svg" style="width:75px;height:75px;">${item.svg}</div>
          <div class="clothing-card-label" style="font-size:15px;">${item.shortName}</div>
        </div>
      `;
    };

    // Attach click listeners to zones
    ['head', 'neck', 'body', 'hands', 'legs', 'feet'].forEach(zone => {
      const zoneEl = document.getElementById(`zone-${zone}`);
      if (!zoneEl) return;

      zoneEl.onclick = (e) => {
        if (currentIdx >= itemsToSort.length) return;
        const cur = itemsToSort[currentIdx];
        const item = CLOTHING_DATABASE[cur.id];

        if (zone === cur.zone) {
          this.audio.playSnap();
          this.audio.playChime();
          this.particles.burstSparkles(e.clientX, e.clientY, 30);
          this.triggerRiyaAnimation('anim-happy');
          counts[zone]++;
          updateCounts();

          zoneEl.classList.add('zone-highlight');
          this.speech.speak(`${item.shortName} goes on the ${cur.zoneName}!`, 'riya');

          setTimeout(() => {
            zoneEl.classList.remove('zone-highlight');
            currentIdx++;
            spawnCard();
          }, 1400);
        } else {
          this.audio.playGentleRetry();
          this.speech.speak(`Look carefully. Where do we wear the ${item.shortName}?`);
        }
      };
    });

    spawnCard();
  }

  // ============================================================
  // GAME 3: WEATHER DETECTIVE (Situation Puzzle)
  // ============================================================
  startWeatherDetectiveGame(weatherMode = 'sunny') {
    this.currentActivityIndex = 2;
    this.showScene('scene-weather-detective', weatherMode);

    const weatherConfigs = {
      sunny: {
        theme: 'sunny',
        label: '☀️ SUNNY DAY',
        prompt: "Look! It's sunny! What can we wear?",
        speech: "Look! It's bright and sunny! What can we wear in the warm sunshine?",
        correctId: 'tshirt_yellow',
        correctVoice: "T-shirt! The sun is bright and warm!",
        choices: [
          { id: 'tshirt_yellow', label: 'T-Shirt', correct: true },
          { id: 'jacket_winter', label: 'Winter Jacket', correct: false },
          { id: 'scarf_red', label: 'Woolen Scarf', correct: false }
        ],
        nextMode: 'rainy'
      },
      rainy: {
        theme: 'rainy',
        label: '🌧️ RAINY DAY',
        prompt: "Oh! It's raining! What do we need?",
        speech: "Oh! Pitter patter! It's raining! What do we need to stay dry?",
        correctId: 'umbrella_rainbow',
        correctVoice: "Umbrella! Raindrops splash on the rainbow umbrella!",
        choices: [
          { id: 'umbrella_rainbow', label: 'Umbrella', correct: true },
          { id: 'scarf_red', label: 'Scarf', correct: false },
          { id: 'cap_red', label: 'Cap', correct: false }
        ],
        nextMode: 'cold'
      },
      cold: {
        theme: 'cold',
        label: '❄️ COLD DAY',
        prompt: "Brrr! It's cold! What should we wear?",
        speech: "Brrr! Snow is falling! It's cold! What should we wear?",
        correctId: 'jacket_winter',
        correctVoice: "Jacket! Nice, cozy and warm in the snow!",
        choices: [
          { id: 'jacket_winter', label: 'Warm Jacket', correct: true },
          { id: 'tshirt_yellow', label: 'T-Shirt', correct: false },
          { id: 'sandals_summer', label: 'Sandals', correct: false }
        ],
        nextMode: 'done'
      }
    };

    const cur = weatherConfigs[weatherMode];
    if (!cur) return;

    const labelEl = document.getElementById('weather-condition-label');
    const promptEl = document.getElementById('weather-prompt');
    const skyEl = document.getElementById('weather-visual-sky');

    if (labelEl) labelEl.textContent = cur.label;
    if (promptEl) promptEl.textContent = cur.prompt;
    if (skyEl) skyEl.className = `weather-visual-sky sky-${cur.theme}`;

    this.speech.speak(cur.speech);

    const choicesGrid = document.getElementById('weather-choices-grid');
    if (!choicesGrid) return;
    choicesGrid.innerHTML = '';

    cur.choices.forEach(choice => {
      const item = CLOTHING_DATABASE[choice.id];
      const card = document.createElement('div');
      card.className = 'weather-choice-card';
      card.innerHTML = `
        <div class="clothing-card-svg" style="width:75px;height:75px;">${item.svg}</div>
        <div class="clothing-card-label" style="font-size:15px;">${choice.label}</div>
      `;

      card.addEventListener('click', (e) => {
        if (choice.correct) {
          this.audio.playChime();
          this.particles.burstSparkles(e.clientX, e.clientY, 40);
          this.triggerRiyaAnimation('anim-happy');
          this.speech.speak(cur.correctVoice, 'riya');

          card.style.borderColor = '#10b981';
          card.style.transform = 'scale(1.1)';

          setTimeout(() => {
            if (cur.nextMode !== 'done') {
              this.startWeatherDetectiveGame(cur.nextMode);
            } else {
              this.markCompleted(2);
              this.speech.speak("Hooray! You are a master Weather Detective!");
              setTimeout(() => this.startSchoolBagGame(), 1800);
            }
          }, 2200);
        } else {
          this.audio.playGentleRetry();
          card.style.borderColor = '#f59e0b';
          this.speech.speak(`Think about the weather. What keeps us comfortable when it is ${cur.theme}?`);
        }
      });

      choicesGrid.appendChild(card);
    });
  }

  // ============================================================
  // GAME 4: WHAT'S IN THE SCHOOL BAG? (Discovery Puzzle)
  // ============================================================
  startSchoolBagGame() {
    this.currentActivityIndex = 3;
    this.showScene('scene-school-bag', 'school');

    const backpackWrap = document.getElementById('backpack-graphic-wrap');
    if (backpackWrap) {
      backpackWrap.innerHTML = CLOTHING_DATABASE.backpack_school.svg;
    }

    const schoolItems = [
      { id: 'book_school', isSchool: true, name: 'Book' },
      { id: 'pencil_school', isSchool: true, name: 'Pencil' },
      { id: 'shirt_formal', isSchool: true, name: 'School Shirt' },
      { id: 'cap_red', isSchool: false, name: 'Baseball Cap' },
      { id: 'scarf_red', isSchool: false, name: 'Winter Scarf' },
      { id: 'shoes_sneakers', isSchool: true, name: 'School Shoes' }
    ];

    const packedItemsRow = document.getElementById('packed-items-row');
    if (packedItemsRow) packedItemsRow.innerHTML = '';

    const shelf = document.getElementById('school-items-shelf');
    if (!shelf) return;
    shelf.innerHTML = '';

    this.speech.speak("We are going to school! What should we pack in our school bag?");

    let correctCount = 0;
    const totalRequired = schoolItems.filter(i => i.isSchool).length;

    schoolItems.forEach(itemConfig => {
      const item = CLOTHING_DATABASE[itemConfig.id];
      const card = document.createElement('div');
      card.className = 'clothing-item-card';
      card.innerHTML = `
        <div class="clothing-card-svg" style="width:60px;height:60px;">${item.svg}</div>
        <div class="clothing-card-label" style="font-size:13px;">${itemConfig.name}</div>
      `;

      card.addEventListener('click', (e) => {
        if (card.classList.contains('packed-done')) return;

        if (itemConfig.isSchool) {
          this.audio.playSnap();
          this.particles.burstSparkles(e.clientX, e.clientY, 25);
          this.speech.speak(`Packed the ${itemConfig.name}!`, 'riya');
          card.classList.add('packed-done');
          card.style.opacity = '0.4';
          card.style.pointerEvents = 'none';

          if (packedItemsRow) {
            const badge = document.createElement('span');
            badge.className = 'packed-badge';
            badge.textContent = `✓ ${itemConfig.name}`;
            packedItemsRow.appendChild(badge);
          }

          correctCount++;
          if (correctCount >= totalRequired) {
            this.markCompleted(3);
            this.audio.playFanfare();
            this.speech.speak("All set for school! The bag is packed!");
            setTimeout(() => this.startClothingDetectiveGame(), 1800);
          }
        } else {
          this.audio.playGentleRetry();
          this.speech.speak(`We usually don't need a ${itemConfig.name} in our school bag. Look for learning items!`);
        }
      });

      shelf.appendChild(card);
    });
  }

  // ============================================================
  // GAME 5: CLOTHING DETECTIVE (Guessing Puzzle)
  // ============================================================
  startClothingDetectiveGame() {
    this.currentActivityIndex = 4;
    this.showScene('scene-clothing-detective', 'closet');

    const mysteries = [
      {
        targetId: 'shoes_sneakers',
        clueSnippet: `<svg viewBox="0 0 100 70" width="80%" height="80%"><path d="M5 25 Q 15 10 25 15 L32 25 L32 32 L5 32 Z" fill="#ec4899" opacity="0.35"/></svg>`,
        choices: ['shoes_sneakers', 'cap_red', 'scarf_red']
      },
      {
        targetId: 'hat_sun',
        clueSnippet: `<svg viewBox="0 0 100 80" width="80%" height="80%"><ellipse cx="50" cy="55" rx="46" ry="16" fill="#fde047" opacity="0.35"/></svg>`,
        choices: ['hat_sun', 'pants_jeans', 'gloves_mittens']
      },
      {
        targetId: 'raincoat_yellow',
        clueSnippet: `<svg viewBox="0 0 100 100" width="80%" height="80%"><path d="M30 18 Q 50 5 70 18 Z" fill="#facc15" opacity="0.35"/></svg>`,
        choices: ['tshirt_yellow', 'raincoat_yellow', 'dress_pink']
      }
    ];

    let mIdx = 0;

    const loadMystery = () => {
      const mystery = mysteries[mIdx];
      const targetItem = CLOTHING_DATABASE[mystery.targetId];

      const lens = document.getElementById('detective-peek-lens');
      if (lens) lens.innerHTML = mystery.clueSnippet;

      this.speech.speak("Can you guess this mystery clothing item from the clue?");

      const row = document.getElementById('detective-choices-row');
      if (!row) return;
      row.innerHTML = '';

      mystery.choices.forEach(cId => {
        const item = CLOTHING_DATABASE[cId];
        const card = document.createElement('div');
        card.className = 'clothing-item-card';
        card.style.width = '140px';
        card.innerHTML = `
          <div class="clothing-card-svg" style="width:70px;height:70px;">${item.svg}</div>
          <div class="clothing-card-label" style="font-size:15px;">${item.shortName}</div>
        `;

        card.addEventListener('click', (e) => {
          if (cId === mystery.targetId) {
            this.audio.playChime();
            this.particles.burstSparkles(e.clientX, e.clientY, 35);
            this.triggerRiyaAnimation('anim-happy');
            if (lens) lens.innerHTML = targetItem.svg;
            this.speech.speak(`${targetItem.shortName}! You solved the clue!`, 'riya');

            card.style.borderColor = '#10b981';

            setTimeout(() => {
              mIdx++;
              if (mIdx < mysteries.length) {
                loadMystery();
              } else {
                this.markCompleted(4);
                this.speech.speak("Detective star! You identified all the mystery clothes!");
                setTimeout(() => this.startClothingSorterGame(), 1800);
              }
            }, 1800);
          } else {
            this.audio.playGentleRetry();
            this.speech.speak("Look closely at the shape in the magnifying lens!");
          }
        });

        row.appendChild(card);
      });
    };

    loadMystery();
  }

  // ============================================================
  // GAME 6: MAGIC CLOTHING SORTER (Shelves Drag & Drop)
  // ============================================================
  startClothingSorterGame() {
    this.currentActivityIndex = 5;
    this.showScene('scene-clothing-sorter', 'closet');

    const itemsToSort = ['cap_red', 'tshirt_yellow', 'pants_jeans', 'shoes_sneakers', 'hat_sun', 'sweater_green', 'shorts_blue', 'boots_rain'];
    let currentIdx = 0;

    // Clear trays
    ['head', 'body', 'legs', 'feet'].forEach(shelf => {
      const tray = document.getElementById(`tray-${shelf}`);
      if (tray) tray.innerHTML = '';
    });

    const spawnItem = () => {
      if (currentIdx >= itemsToSort.length) {
        this.markCompleted(5);
        this.audio.playFanfare();
        this.speech.speak("All clothes are sorted on their magical shelves!");
        setTimeout(() => this.startBodyDiagramGame(), 1800);
        return;
      }

      const itemId = itemsToSort[currentIdx];
      const item = CLOTHING_DATABASE[itemId];

      const spawnZone = document.getElementById('sorter-spawn-zone');
      if (!spawnZone) return;
      spawnZone.innerHTML = `
        <div class="clothing-item-card" style="width:120px;height:120px;box-shadow:0 8px 24px rgba(122,66,244,0.25);">
          <div class="clothing-card-svg" style="width:70px;height:70px;">${item.svg}</div>
          <div class="clothing-card-label">${item.shortName}</div>
        </div>
      `;

      this.speech.speak(`Which shelf does the ${item.shortName} go on?`);
    };

    // Shelves click listeners
    ['head', 'body', 'legs', 'feet'].forEach(shelf => {
      const shelfEl = document.getElementById(`shelf-${shelf}`);
      if (!shelfEl) return;

      shelfEl.onclick = (e) => {
        if (currentIdx >= itemsToSort.length) return;
        const currentId = itemsToSort[currentIdx];
        const currentItem = CLOTHING_DATABASE[currentId];

        if (shelf === currentItem.category) {
          this.audio.playSnap();
          this.particles.burstSparkles(e.clientX, e.clientY, 25);
          this.speech.speak(`Snapped onto the ${shelf} shelf!`, 'riya');

          const tray = document.getElementById(`tray-${shelf}`);
          if (tray) {
            const mini = document.createElement('div');
            mini.style.width = '38px';
            mini.style.height = '38px';
            mini.innerHTML = currentItem.svg;
            tray.appendChild(mini);
          }

          currentIdx++;
          setTimeout(() => spawnItem(), 800);
        } else {
          this.audio.playGentleRetry();
          this.speech.speak(`Look carefully at the shelf. Try another shelf!`);
        }
      };
    });

    spawnItem();
  }

  // ============================================================
  // GAME 7: WHERE DO WE WEAR IT? (Educational Mannequin)
  // ============================================================
  startBodyDiagramGame() {
    this.currentActivityIndex = 6;
    this.showScene('scene-body-diagram', 'closet');

    const questions = [
      { id: 'shoes_sneakers', targetZone: 'feet', arrowTop: '88%', arrowLeft: '15%' },
      { id: 'cap_red', targetZone: 'head', arrowTop: '10%', arrowLeft: '15%' },
      { id: 'shirt_formal', targetZone: 'body', arrowTop: '45%', arrowLeft: '15%' },
      { id: 'pants_jeans', targetZone: 'legs', arrowTop: '70%', arrowLeft: '15%' },
      { id: 'scarf_red', targetZone: 'neck', arrowTop: '25%', arrowLeft: '15%' },
      { id: 'gloves_mittens', targetZone: 'hands', arrowTop: '55%', arrowLeft: '5%' }
    ];

    let qIdx = 0;

    const loadQuestion = () => {
      if (qIdx >= questions.length) {
        this.markCompleted(6);
        this.audio.playFanfare();
        this.speech.speak("Brilliant! You know where every piece of clothing is worn on the body!");
        setTimeout(() => this.startClosetSurpriseGame(), 1800);
        return;
      }

      const q = questions[qIdx];
      const item = CLOTHING_DATABASE[q.id];

      const itemBox = document.getElementById('diagram-item-box');
      if (itemBox) {
        itemBox.innerHTML = `
          <div class="clothing-item-card" style="width:120px;height:120px;">
            <div class="clothing-card-svg" style="width:70px;height:70px;">${item.svg}</div>
            <div class="clothing-card-label" style="font-size:15px;">${item.shortName}</div>
          </div>
        `;
      }

      const promptEl = document.getElementById('body-diagram-prompt');
      if (promptEl) promptEl.textContent = `Where do we wear ${item.shortName}?`;

      this.speech.speak(`Where do we wear ${item.shortName}?`);

      const arrow = document.getElementById('mannequin-arrow');
      if (arrow) arrow.style.display = 'none';

      document.querySelectorAll('.diagram-choice-btn').forEach(btn => {
        btn.onclick = (e) => {
          const zone = btn.getAttribute('data-zone');
          if (zone === q.targetZone) {
            this.audio.playSnap();
            this.audio.playChime();
            this.particles.burstSparkles(e.clientX, e.clientY, 30);
            this.triggerRiyaAnimation('anim-happy');

            if (arrow) {
              arrow.style.display = 'block';
              arrow.style.top = q.arrowTop;
              arrow.style.left = q.arrowLeft;
            }

            this.speech.speak(`On the ${q.targetZone}!`, 'riya');
            btn.style.borderColor = '#10b981';

            setTimeout(() => {
              btn.style.borderColor = '#e2d7f5';
              qIdx++;
              loadQuestion();
            }, 1600);
          } else {
            this.audio.playGentleRetry();
            this.speech.speak(`Not on the ${zone}. Where do we wear ${item.shortName}?`);
          }
        };
      });
    };

    loadQuestion();
  }

  // ============================================================
  // GAME 8: MAGIC CLOSET SURPRISE (Closed Wardrobe Doors)
  // ============================================================
  startClosetSurpriseGame() {
    this.currentActivityIndex = 7;
    this.showScene('scene-closet-surprise', 'closet');
    this.speech.speak("Choose a magic door to see what surprise outfits are inside!");

    const doorOutfits = {
      sunny: ['hat_sun', 'tshirt_yellow', 'shorts_blue', 'sandals_summer'],
      rainy: ['raincoat_yellow', 'umbrella_rainbow', 'boots_rain'],
      cold: ['jacket_winter', 'sweater_green', 'scarf_red', 'gloves_mittens'],
      school: ['shirt_formal', 'skirt_pleated', 'backpack_school', 'book_school']
    };

    const openedDoors = new Set();

    document.querySelectorAll('.magic-door-card').forEach(doorCard => {
      doorCard.classList.remove('door-open');
      const doorKey = doorCard.getAttribute('data-door');
      const interior = document.getElementById(`interior-${doorKey}`);
      
      if (interior) {
        interior.innerHTML = '';
        const items = doorOutfits[doorKey] || [];
        items.forEach(itemId => {
          const item = CLOTHING_DATABASE[itemId];
          if (item) {
            const mini = document.createElement('div');
            mini.style.width = '45px';
            mini.style.height = '45px';
            mini.innerHTML = item.svg;
            interior.appendChild(mini);
          }
        });
      }

      doorCard.onclick = () => {
        this.audio.playDoorOpen();
        this.audio.playSparkle();
        doorCard.classList.add('door-open');
        this.particles.burstSparkles(window.innerWidth / 2, window.innerHeight / 2, 35);
        this.triggerRiyaAnimation('anim-twirl');
        this.speech.speak(`You opened the ${doorKey} wardrobe! Look at all these clothes!`);
        openedDoors.add(doorKey);

        if (openedDoors.size >= 4) {
          this.markCompleted(7);
          setTimeout(() => {
            this.startFinalCelebration();
          }, 2400);
        }
      };
    });
  }

  // ============================================================
  // FINAL WOW MOMENT: THE MAGIC CLOSET CELEBRATION
  // ============================================================
  startFinalCelebration() {
    this.showScene('scene-final-celebration', 'celebration');
    this.audio.playFanfare();
    this.particles.burstSparkles(window.innerWidth / 2, window.innerHeight * 0.4, 70);
    this.triggerRiyaAnimation('anim-happy');

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
      }
    } catch (err) {}

    // Populate flying arranged categories
    const categories = {
      head: ['cap_red', 'hat_sun'],
      body: ['tshirt_yellow', 'shirt_formal', 'dress_pink', 'jacket_winter', 'sweater_green', 'raincoat_yellow'],
      legs: ['pants_jeans', 'shorts_blue', 'skirt_pleated'],
      feet: ['socks_striped', 'shoes_sneakers', 'sandals_summer', 'boots_rain'],
      weather: ['umbrella_rainbow', 'scarf_red', 'gloves_mittens', 'backpack_school']
    };

    Object.keys(categories).forEach(cat => {
      const container = document.getElementById(`cat-showcase-${cat}`);
      if (!container) return;
      container.innerHTML = '';
      categories[cat].forEach(id => {
        const item = CLOTHING_DATABASE[id];
        const mini = document.createElement('div');
        mini.style.width = '36px';
        mini.style.height = '36px';
        mini.style.margin = '2px';
        mini.innerHTML = item.svg;
        container.appendChild(mini);
      });
    });

    this.speech.speak("We found them all! Now we know our clothes! You are an official Clothing Explorer!", 'riya');
  }

  // ============================================================
  // FREE PLAY MODE: MAGIC CLOSET EXPLORE
  // ============================================================
  startFreePlay() {
    this.showScene('scene-freeplay', 'closet');
    this.speech.speak("Welcome to Magic Closet Explore! Tap any clothing to hear its name!");

    const grid = document.getElementById('freeplay-items-grid');
    let currentCat = 'all';

    const renderGrid = () => {
      if (!grid) return;
      grid.innerHTML = '';

      Object.keys(CLOTHING_DATABASE).forEach(id => {
        const item = CLOTHING_DATABASE[id];
        if (currentCat !== 'all' && item.category !== currentCat) return;

        const card = document.createElement('div');
        card.className = 'clothing-item-card';
        card.innerHTML = `
          <div class="clothing-card-svg" style="width:65px;height:65px;">${item.svg}</div>
          <div class="clothing-card-label" style="font-size:13px;">${item.shortName}</div>
        `;

        card.addEventListener('click', (e) => {
          this.audio.playSnap();
          this.particles.burstSparkles(e.clientX, e.clientY, 20);
          this.triggerRiyaAnimation('anim-happy');

          const icon = document.getElementById('freeplay-spotlight-icon');
          const name = document.getElementById('freeplay-spotlight-name');
          const desc = document.getElementById('freeplay-spotlight-desc');

          if (icon) icon.innerHTML = item.svg;
          if (name) name.textContent = item.name;
          if (desc) desc.textContent = item.description;

          this.speech.speak(`${item.name}. ${item.description}`);
        });

        grid.appendChild(card);
      });
    };

    // Category Tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.onclick = () => {
        this.audio.playPop();
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCat = tab.getAttribute('data-cat');
        renderGrid();
      };
    });

    document.getElementById('btn-spotlight-speak')?.addEventListener('click', () => {
      this.audio.playPop();
      this.speech.repeat();
    });

    renderGrid();
  }
}

// ============================================================
// 8. GAME INITIALIZATION
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  window.gameEngine = new GameEngine();
});
