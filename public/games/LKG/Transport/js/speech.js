/**
 * ChotaPlay — Riya's Traffic Rescue
 * Speech & Voice Guidance System
 * Uses Web Speech API (speechSynthesis) with graceful animated visual speech bubbles.
 */

class SpeechSystem {
  constructor() {
    this.speechSynthesis = window.speechSynthesis || null;
    this.speechBubbleEl = document.getElementById('riya-speech-bubble');
    this.speechTextEl = document.getElementById('speech-text');
    this.currentUtterance = null;
    this.voice = null;
    this.hideTimer = null;
    this.isMuted = false;

    this.initVoice();
  }

  initVoice() {
    if (!this.speechSynthesis) return;

    const setVoice = () => {
      const voices = this.speechSynthesis.getVoices();
      // Try finding a friendly, higher-pitch English voice
      const friendlyVoice = voices.find(v => 
        (v.lang.includes('en') || v.lang.includes('EN')) && 
        (v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Victoria'))
      );
      this.voice = friendlyVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
    };

    setVoice();
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = setVoice;
    }
  }

  speak(text, options = {}) {
    // 1. Update visual speech bubble
    if (this.speechTextEl && this.speechBubbleEl) {
      this.speechTextEl.textContent = `"${text}"`;
      this.speechBubbleEl.style.display = 'block';
      this.speechBubbleEl.classList.remove('hiding');
      
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
      }
      
      const duration = options.duration || Math.max(3500, text.length * 90);
      this.hideTimer = setTimeout(() => {
        if (this.speechBubbleEl) {
          this.speechBubbleEl.classList.add('hiding');
        }
      }, duration);
    }

    // 2. Animate Riya talking
    if (window.characterManager) {
      window.characterManager.setRiyaTalking(true);
    }

    // 3. Web Speech Synthesis
    if (this.speechSynthesis && !this.isMuted) {
      try {
        this.speechSynthesis.cancel(); // Stop prior speech
        
        const cleanText = text.replace(/[^a-zA-Z0-9\s!?,.]/g, '');
        const utter = new SpeechSynthesisUtterance(cleanText);
        
        if (this.voice) utter.voice = this.voice;
        utter.rate = options.rate || 0.95;  // Friendly cadence for kids
        utter.pitch = options.pitch || 1.25; // Cheerful, youthful pitch
        utter.volume = options.volume || 1.0;

        utter.onend = () => {
          if (window.characterManager) {
            window.characterManager.setRiyaTalking(false);
          }
        };

        utter.onerror = () => {
          if (window.characterManager) {
            window.characterManager.setRiyaTalking(false);
          }
        };

        this.speechSynthesis.speak(utter);
      } catch (err) {
        console.log('Speech synthesis fallback to visual only:', err);
      }
    } else {
      setTimeout(() => {
        if (window.characterManager) {
          window.characterManager.setRiyaTalking(false);
        }
      }, 2500);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }
}

// Global Speech Singleton
window.speechSystem = new SpeechSystem();
