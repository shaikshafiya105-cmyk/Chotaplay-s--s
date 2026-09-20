/**
 * CHOTAPLAY: STAR'S HELPER BUTTON
 * Helpers Around Me — Preschool Game Engine
 * Pure Vanilla JavaScript (No external libraries)
 */

(function () {
  'use strict';

  /* =========================================================
     1. AUDIO SYSTEM (WEB AUDIO API SYNTHESIZER)
     ========================================================= */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.voiceEnabled = true;
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

    playDing() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [1046.5, 1318.5, 1567.98, 2093].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.65);
      });
    }

    playSuccess() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.3, now + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.55);
      });
    }

    playBoing() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.35);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    }

    playCheer() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const fanfare = [392, 523.25, 659.25, 783.99, 1046.5];
      fanfare.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.75);
      });
    }

    playClick() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }

    speak(text) {
      if (!this.voiceEnabled || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/[^\w\s.,!?'"]/gi, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.95;
        utterance.pitch = 1.25; // Cheerful friendly preschool tone
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis unavailable:', e);
      }
    }
  }

  const sound = new SoundEngine();

  /* =========================================================
     2. ALL 7 MISSIONS DATA SPECIFICATIONS
     ========================================================= */
  const MISSIONS = [
    {
      id: 1,
      title: "Traffic Trouble",
      districtName: "Traffic Junction 🚦",
      sceneryClass: "scenery-junction",
      location: "Busy Traffic Junction",
      problemTitle: "Cars are stuck in traffic!",
      dialogues: {
        explore: { speaker: "👦 John", avatar: "👦", text: "Let's explore Helper Town!" },
        problem: { speaker: "👧 Riya", avatar: "👧", text: "Oh no! The cars are stuck!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "👦 John", avatar: "👦", text: "Traffic Police is guiding the cars!" },
        wow: { speaker: "👦 John", avatar: "👦", text: "Whoosh! They're moving!" },
        reward: "You helped the traffic move safely!"
      },
      choices: [
        { id: "traffic_police", name: "Traffic Police", img: "assets/helpers/traffic_police.svg" },
        { id: "doctor", name: "Doctor", img: "assets/helpers/doctor.svg" },
        { id: "mechanic", name: "Mechanic", img: "assets/helpers/mechanic.svg" }
      ],
      correctHelperId: "traffic_police",
      wrongReactions: {
        doctor: {
          text: "Is the car feeling sick? 😄 Think again!",
          helperImg: "assets/helpers/doctor.svg"
        },
        mechanic: {
          text: "The cars are okay, they just need direction! 😄 Think again!",
          helperImg: "assets/helpers/mechanic.svg"
        }
      },
      renderProblem: () => `
        <div class="traffic-jam-group">
          <div style="font-size: 70px;">🚗</div>
          <div style="font-size: 70px; transform: scaleX(-1);">🚙</div>
          <div style="font-size: 80px;">🚕</div>
          <div style="background: #212529; padding: 10px; border-radius: 12px; display:flex; flex-direction:column; gap:6px; border:3px solid #FFF;">
            <div style="width:20px;height:20px;border-radius:50%;background:#FA5252;box-shadow:0 0 10px #FA5252;"></div>
            <div style="width:20px;height:20px;border-radius:50%;background:#495057;"></div>
            <div style="width:20px;height:20px;border-radius:50%;background:#495057;"></div>
          </div>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/traffic_police.svg" alt="Traffic Police" class="helper-action-img">
          <div style="background:#FFF; padding:12px 18px; border-radius:18px; border:3px solid #339AF0; font-family:var(--font-heading); font-weight:800; font-size:20px; color:#1864AB;">
            WHISTLE! 🎺 BEEP BEEP! 🚗✨
          </div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">✨ 🌟 ✨</div>
          <div style="display:flex; gap:30px; font-size:65px; animation: floatCloud 4s infinite linear;">
            <span>🚗💨</span>
            <span>🚙💨</span>
            <span>🚕💨</span>
          </div>
          <div class="wow-banner">TRAFFIC IS MOVING SAFELY! 🚦</div>
        </div>
      `
    },
    {
      id: 2,
      title: "Someone Feels Sick",
      districtName: "Town Hospital 🏥",
      sceneryClass: "scenery-hospital",
      location: "Hospital Clinic",
      problemTitle: "A friend is feeling sick!",
      dialogues: {
        explore: { speaker: "👧 Riya", avatar: "👧", text: "Where will we go next?" },
        problem: { speaker: "👧 Riya", avatar: "👧", text: "Someone feels sick!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "The Doctor is checking with a stethoscope!" },
        wow: { speaker: "👦 John", avatar: "👦", text: "The doctor helped!" },
        reward: "Our friend is healthy and smiling!"
      },
      choices: [
        { id: "doctor", name: "Doctor", img: "assets/helpers/doctor.svg" },
        { id: "teacher", name: "Teacher", img: "assets/helpers/teacher.svg" },
        { id: "mechanic", name: "Mechanic", img: "assets/helpers/mechanic.svg" }
      ],
      correctHelperId: "doctor",
      wrongReactions: {
        teacher: {
          text: "Teachers teach in school! We need medical care! 😄 Think again!",
          helperImg: "assets/helpers/teacher.svg"
        },
        mechanic: {
          text: "A wrench won't help a fever! 😄 Think again!",
          helperImg: "assets/helpers/mechanic.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; align-items:center; gap:20px;">
          <img src="assets/helpers/patient.svg" alt="Patient" class="action-prop-img" style="height:200px;">
          <div style="background:#FFF; padding:10px 16px; border-radius:16px; border:3px solid #74C0FC; font-weight:700; font-size:18px;">
            "Achoo! 🤒"
          </div>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/doctor.svg" alt="Doctor" class="helper-action-img">
          <div class="heart-glow-anim">❤️</div>
          <div style="background:#FFF; padding:12px 18px; border-radius:18px; border:3px solid #22B8CF; font-family:var(--font-heading); font-weight:800; font-size:18px; color:#0B7285;">
            "Thump-thump! All better! 💖"
          </div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">💖 ✨ 💖</div>
          <div style="font-size:70px; animation:btnBounceJoy 1s infinite alternate;">😄 🌟 🎉</div>
          <div class="wow-banner">PATIENT IS HAPPY & HEALTHY! ❤️</div>
        </div>
      `
    },
    {
      id: 3,
      title: "Fire Needs Help",
      districtName: "Fire Station 🚒",
      sceneryClass: "scenery-park",
      location: "Park Campfire",
      problemTitle: "A small fire needs extinguishing!",
      dialogues: {
        explore: { speaker: "👦 John", avatar: "👦", text: "Look over there in the park!" },
        problem: { speaker: "👧 Riya", avatar: "👧", text: "A small fire needs help!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "Firefighter is spraying safe water!" },
        wow: { speaker: "👦 John", avatar: "👦", text: "Wow! It's gone!" },
        reward: "You kept our town safe!"
      },
      choices: [
        { id: "firefighter", name: "Firefighter", img: "assets/helpers/firefighter.svg" },
        { id: "teacher", name: "Teacher", img: "assets/helpers/teacher.svg" },
        { id: "postal_worker", name: "Postal Worker", img: "assets/helpers/postal_worker.svg" }
      ],
      correctHelperId: "firefighter",
      wrongReactions: {
        teacher: {
          text: "Books won't extinguish a fire! 😄 Think again!",
          helperImg: "assets/helpers/teacher.svg"
        },
        postal_worker: {
          text: "Letters cannot put out flames! 😄 Think again!",
          helperImg: "assets/helpers/postal_worker.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; align-items:center; gap:25px;">
          <div class="fire-flame-anim" style="font-size: 85px;">🔥</div>
          <div style="background:#FFF; padding:10px 16px; border-radius:16px; border:3px solid #FF922B; font-weight:800; font-size:18px; color:#D9480F;">
            Small campfire needs water! 💧
          </div>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/fire_truck.svg" alt="Fire Truck" style="height:140px;">
          <img src="assets/helpers/firefighter.svg" alt="Firefighter" class="helper-action-img" style="height:190px;">
          <div class="water-spray-stream"></div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">💧 ✨ 💧</div>
          <div style="font-size:70px;">🌈 🌸 🌳</div>
          <div class="wow-banner">FIRE IS OUT & TOWN IS SAFE! 🚒</div>
        </div>
      `
    },
    {
      id: 4,
      title: "School Is Messy",
      districtName: "Town School 🏫",
      sceneryClass: "scenery-classroom",
      location: "School Classroom",
      problemTitle: "Classroom materials are scattered!",
      dialogues: {
        explore: { speaker: "👦 John", avatar: "👦", text: "Let's check the school!" },
        problem: { speaker: "👧 Riya", avatar: "👧", text: "Oh! What a mess!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "Teacher is organizing the books and pencils!" },
        wow: { speaker: "👧 Riya", avatar: "👧", text: "Ready to learn!" },
        reward: "The classroom is neat and tidy!"
      },
      choices: [
        { id: "teacher", name: "Teacher", img: "assets/helpers/teacher.svg" },
        { id: "doctor", name: "Doctor", img: "assets/helpers/doctor.svg" },
        { id: "traffic_police", name: "Traffic Police", img: "assets/helpers/traffic_police.svg" }
      ],
      correctHelperId: "teacher",
      wrongReactions: {
        doctor: {
          text: "The books aren't sick! 😄 Think again!",
          helperImg: "assets/helpers/doctor.svg"
        },
        traffic_police: {
          text: "There are no cars in the classroom! 😄 Think again!",
          helperImg: "assets/helpers/traffic_police.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; gap:16px; align-items:center; font-size:45px; transform:rotate(-5deg);">
          <span>📚</span>
          <span>✏️</span>
          <span>📐</span>
          <span>🎨</span>
          <span>📖</span>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/teacher.svg" alt="Teacher" class="helper-action-img">
          <div class="classroom-tidy-shelf">
            <span style="font-size:35px;">📘</span>
            <span style="font-size:35px;">📗</span>
            <span style="font-size:35px;">📕</span>
            <span style="font-size:35px;">✏️</span>
          </div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">✨ 📚 ✨</div>
          <div style="background:#2B8A3E; color:#FFF; padding:12px 24px; border-radius:12px; font-family:var(--font-heading); font-size:26px; border:4px solid #FFF;">
            A B C 1 2 3 ⭐
          </div>
          <div class="wow-banner">CLASSROOM IS NEAT & READY! 📚</div>
        </div>
      `
    },
    {
      id: 5,
      title: "Lost Letter",
      districtName: "Post Office 📮",
      sceneryClass: "scenery-park",
      location: "Town Post Office",
      problemTitle: "A special letter needs delivery!",
      dialogues: {
        explore: { speaker: "👧 Riya", avatar: "👧", text: "Look at the colorful post office!" },
        problem: { speaker: "👦 John", avatar: "👦", text: "Who can deliver it?" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "Postal Worker is delivering the letter!" },
        wow: { speaker: "👦 John", avatar: "👦", text: "Delivered!" },
        reward: "You helped deliver the mail!"
      },
      choices: [
        { id: "postal_worker", name: "Postal Worker", img: "assets/helpers/postal_worker.svg" },
        { id: "doctor", name: "Doctor", img: "assets/helpers/doctor.svg" },
        { id: "firefighter", name: "Firefighter", img: "assets/helpers/firefighter.svg" }
      ],
      correctHelperId: "postal_worker",
      wrongReactions: {
        doctor: {
          text: "Letters don't need medicine! 😄 Think again!",
          helperImg: "assets/helpers/doctor.svg"
        },
        firefighter: {
          text: "The letter is not on fire! 😄 Think again!",
          helperImg: "assets/helpers/firefighter.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; align-items:center; gap:20px;">
          <div style="font-size:75px; animation:starFloat 2s infinite ease-in-out;">✉️</div>
          <div style="font-size:70px;">🏠</div>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/postal_worker.svg" alt="Postal Worker" class="helper-action-img">
          <div style="font-size:55px; animation:letterDeliver 1.2s infinite alternate;">💌 ➡️ 📮</div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">✨ 💌 ✨</div>
          <div style="font-size:70px;">📮 ✨ 🏡</div>
          <div class="wow-banner">LETTER DELIVERED TO MAILBOX! ✉️</div>
        </div>
      `
    },
    {
      id: 6,
      title: "Clean Town",
      districtName: "Town Street 🌸",
      sceneryClass: "scenery-park",
      location: "Town Street",
      problemTitle: "Our street needs cleaning!",
      dialogues: {
        explore: { speaker: "👦 John", avatar: "👦", text: "Let's walk down the street!" },
        problem: { speaker: "👧 Riya", avatar: "👧", text: "Our street needs help!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "Sanitation Worker is cleaning with the green truck!" },
        wow: { speaker: "⭐ Little Star", avatar: "⭐", text: "Look how clean!" },
        reward: "Helper Town is clean and blooming!"
      },
      choices: [
        { id: "sanitation_worker", name: "Sanitation Worker", img: "assets/helpers/sanitation_worker.svg" },
        { id: "teacher", name: "Teacher", img: "assets/helpers/teacher.svg" },
        { id: "doctor", name: "Doctor", img: "assets/helpers/doctor.svg" }
      ],
      correctHelperId: "sanitation_worker",
      wrongReactions: {
        teacher: {
          text: "Teachers teach in school! 😄 Think again!",
          helperImg: "assets/helpers/teacher.svg"
        },
        doctor: {
          text: "Doctors take care of patients! 😄 Think again!",
          helperImg: "assets/helpers/doctor.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; gap:20px; font-size:60px; filter:grayscale(0.4);">
          <span>🍂</span>
          <span>🗑️</span>
          <span>🥫</span>
          <span>📦</span>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/garbage_truck.svg" alt="Garbage Truck" style="height:140px;">
          <img src="assets/helpers/sanitation_worker.svg" alt="Sanitation Worker" class="helper-action-img" style="height:190px;">
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">🌸 🦋 🌸</div>
          <div style="font-size:70px;">🌳 🌷 🌻 🌈</div>
          <div class="wow-banner">STREET IS CLEAN & BEAUTIFUL! 🌸</div>
        </div>
      `
    },
    {
      id: 7,
      title: "Broken Vehicle",
      districtName: "Mechanic Workshop 🔧",
      sceneryClass: "scenery-workshop",
      location: "Town Workshop",
      problemTitle: "A delivery vehicle won't start!",
      dialogues: {
        explore: { speaker: "👧 Riya", avatar: "👧", text: "Let's visit the workshop!" },
        problem: { speaker: "👦 John", avatar: "👦", text: "Uh-oh! It won't move!" },
        askHelper: { speaker: "⭐ Little Star", avatar: "⭐", text: "Who can help?" },
        action: { speaker: "⭐ Little Star", avatar: "⭐", text: "Mechanic is fixing the engine with tools!" },
        wow: { speaker: "👦 John", avatar: "👦", text: "It works!" },
        reward: "You fixed the vehicle and completed all missions!"
      },
      choices: [
        { id: "mechanic", name: "Mechanic", img: "assets/helpers/mechanic.svg" },
        { id: "teacher", name: "Teacher", img: "assets/helpers/teacher.svg" },
        { id: "postal_worker", name: "Postal Worker", img: "assets/helpers/postal_worker.svg" }
      ],
      correctHelperId: "mechanic",
      wrongReactions: {
        teacher: {
          text: "Books cannot turn engine bolts! 😄 Think again!",
          helperImg: "assets/helpers/teacher.svg"
        },
        postal_worker: {
          text: "Letters cannot jumpstart an engine! 😄 Think again!",
          helperImg: "assets/helpers/postal_worker.svg"
        }
      },
      renderProblem: () => `
        <div style="display:flex; align-items:center; gap:20px;">
          <div style="font-size:75px;">🚗💨</div>
          <div style="font-size:45px; animation: flameFlicker 0.6s infinite alternate;">⚠️ 💨</div>
        </div>
      `,
      renderHelperAction: () => `
        <div class="helper-action-figure">
          <img src="assets/helpers/mechanic.svg" alt="Mechanic" class="helper-action-img">
          <div style="font-size:55px; animation:spinSlow 2s infinite linear;">⚙️ 🔧 ⚡</div>
        </div>
      `,
      renderWow: () => `
        <div class="wow-container">
          <div class="wow-sparkles-row">⚡ 🚗 ⚡</div>
          <div style="font-size:75px; animation:floatCloud 4s infinite linear;">🚗💨💨💨</div>
          <div class="wow-banner">ENGINE FIXED & PURRING! 🚗✨</div>
        </div>
      `
    }
  ];

  /* =========================================================
     3. MAIN GAME STATE & CONTROLLER
     ========================================================= */
  class GameManager {
    constructor() {
      this.currentMissionIndex = 0;
      this.completedMissions = [];
      this.state = 'START'; // START, TOWN_MAP, EXPLORE, PROBLEM, CHOICE, HELPER_ACTION, WOW, REWARD, FINALE

      this.cacheDom();
      this.loadStorage();
      this.bindEvents();
      this.updateStarHeader();
      this.renderTownMap();
    }

    cacheDom() {
      this.screens = {
        start: document.getElementById('screen-start'),
        townMap: document.getElementById('screen-town-map'),
        gameplay: document.getElementById('screen-gameplay'),
        rewardModal: document.getElementById('screen-reward-modal'),
        finale: document.getElementById('screen-finale')
      };

      // Header Elements
      this.btnHome = document.getElementById('btn-home');
      this.btnAudio = document.getElementById('btn-audio');
      this.audioIcon = document.getElementById('audio-icon');
      this.btnVoice = document.getElementById('btn-voice');
      this.voiceIcon = document.getElementById('voice-icon');
      this.btnReset = document.getElementById('btn-reset');
      this.starSlots = document.querySelectorAll('.star-slot');
      this.starCountText = document.getElementById('star-count-text');

      // Start Screen
      this.btnStartAdventure = document.getElementById('btn-start-adventure');
      this.startHelpBtn = document.getElementById('start-help-btn');

      // Town Map Screen
      this.townMapDistricts = document.getElementById('town-map-districts');
      this.btnResumeMission = document.getElementById('btn-resume-mission');

      // Gameplay Screen
      this.missionScenery = document.getElementById('mission-scenery');
      this.speakerAvatar = document.getElementById('speaker-avatar');
      this.speakerName = document.getElementById('speaker-name');
      this.speechText = document.getElementById('speech-text');
      this.btnSpeakAgain = document.getElementById('btn-speak-again');

      this.stageProblemLayer = document.getElementById('stage-problem-layer');
      this.stageHelperLayer = document.getElementById('stage-helper-layer');
      this.stageWowLayer = document.getElementById('stage-wow-layer');
      this.stageWrongReaction = document.getElementById('stage-wrong-reaction');
      this.wrongCharPreview = document.getElementById('wrong-char-preview');
      this.wrongDialogueText = document.getElementById('wrong-dialogue-text');
      this.btnTryAgain = document.getElementById('btn-try-again');

      this.stageHelpBtnWrapper = document.getElementById('stage-help-button-wrapper');
      this.btnStageHelp = document.getElementById('btn-stage-help');
      this.helperChoicePanel = document.getElementById('helper-choice-panel');
      this.helperCardsGrid = document.getElementById('helper-cards-grid');

      this.stageRiya = document.getElementById('stage-riya');
      this.stageJohn = document.getElementById('stage-john');

      // Reward Modal
      this.rewardSubtitle = document.getElementById('reward-subtitle');
      this.rewardStarDisplay = document.getElementById('reward-star-display');
      this.rewardFractionText = document.getElementById('reward-fraction-text');
      this.btnNextMission = document.getElementById('btn-next-mission');

      // Finale Screen
      this.btnPlayAgain = document.getElementById('btn-play-again');
      this.btnViewTown = document.getElementById('btn-view-town');
      this.confettiCanvas = document.getElementById('confetti-canvas');
    }

    loadStorage() {
      try {
        const saved = localStorage.getItem('stars_helper_progress');
        if (saved) {
          const parsed = JSON.parse(saved);
          this.completedMissions = parsed.completedMissions || [];
          this.currentMissionIndex = parsed.currentMissionIndex || 0;
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }

    saveStorage() {
      try {
        localStorage.setItem('stars_helper_progress', JSON.stringify({
          completedMissions: this.completedMissions,
          currentMissionIndex: this.currentMissionIndex
        }));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    }

    bindEvents() {
      // Header buttons
      this.btnHome.addEventListener('click', () => {
        sound.playClick();
        this.showScreen('townMap');
      });

      this.btnAudio.addEventListener('click', () => {
        sound.soundEnabled = !sound.soundEnabled;
        this.audioIcon.textContent = sound.soundEnabled ? '🔊' : '🔇';
        if (sound.soundEnabled) sound.playClick();
      });

      this.btnVoice.addEventListener('click', () => {
        sound.voiceEnabled = !sound.voiceEnabled;
        this.voiceIcon.textContent = sound.voiceEnabled ? '🗣️' : '🤐';
        if (sound.voiceEnabled) sound.speak('Voice enabled!');
      });

      this.btnReset.addEventListener('click', () => {
        if (confirm('Start a fresh adventure from Mission 1?')) {
          this.completedMissions = [];
          this.currentMissionIndex = 0;
          this.saveStorage();
          this.updateStarHeader();
          this.renderTownMap();
          this.startMission(0);
        }
      });

      // Start screen clicks
      const startTrigger = () => {
        sound.playDing();
        this.startMission(this.currentMissionIndex);
      };
      this.btnStartAdventure.addEventListener('click', startTrigger);
      this.startHelpBtn.addEventListener('click', startTrigger);

      // Town map resume
      this.btnResumeMission.addEventListener('click', () => {
        sound.playClick();
        this.startMission(this.currentMissionIndex);
      });

      // Replay speech
      this.btnSpeakAgain.addEventListener('click', () => {
        sound.speak(this.speechText.textContent);
      });

      // Stage Help button
      this.btnStageHelp.addEventListener('click', () => {
        sound.playDing();
        this.showHelperChoices();
      });

      // Try again after wrong choice
      this.btnTryAgain.addEventListener('click', () => {
        sound.playClick();
        this.stageWrongReaction.classList.add('hidden');
        this.helperChoicePanel.classList.remove('hidden');
      });

      // Reward Modal next
      this.btnNextMission.addEventListener('click', () => {
        sound.playClick();
        this.screens.rewardModal.classList.add('hidden');
        if (this.completedMissions.length >= MISSIONS.length) {
          this.showFinale();
        } else {
          this.startMission(this.currentMissionIndex);
        }
      });

      // Finale actions
      this.btnPlayAgain.addEventListener('click', () => {
        sound.playClick();
        this.completedMissions = [];
        this.currentMissionIndex = 0;
        this.saveStorage();
        this.updateStarHeader();
        this.renderTownMap();
        this.startMission(0);
      });

      this.btnViewTown.addEventListener('click', () => {
        sound.playClick();
        this.showScreen('townMap');
      });
    }

    showScreen(screenKey) {
      Object.keys(this.screens).forEach(key => {
        if (key === 'rewardModal') return;
        this.screens[key].classList.remove('active');
      });
      if (this.screens[screenKey]) {
        this.screens[screenKey].classList.add('active');
      }
    }

    updateStarHeader() {
      const count = this.completedMissions.length;
      this.starSlots.forEach((slot, idx) => {
        if (this.completedMissions.includes(idx + 1)) {
          slot.classList.add('earned');
        } else {
          slot.classList.remove('earned');
        }
      });
      this.starCountText.textContent = `${count} / ${MISSIONS.length}`;
    }

    renderTownMap() {
      this.townMapDistricts.innerHTML = '';
      MISSIONS.forEach((m, idx) => {
        const isDone = this.completedMissions.includes(m.id);
        const isActive = this.currentMissionIndex === idx && !isDone;

        const card = document.createElement('div');
        card.className = `town-district-card ${isDone ? 'completed' : ''} ${isActive ? 'active-mission' : ''}`;
        card.innerHTML = `
          <div class="district-icon">${m.districtName.split(' ').pop()}</div>
          <div class="district-title">${m.title}</div>
          <div class="district-helper-badge">${m.choices.find(c => c.id === m.correctHelperId)?.name || 'Helper'}</div>
          <div class="district-status ${isDone ? 'status-completed' : 'status-needs-help'}">
            ${isDone ? '✅ Restored & Happy!' : (isActive ? '👉 Needs Help Now!' : '⏳ Next to explore')}
          </div>
        `;

        card.addEventListener('click', () => {
          sound.playClick();
          this.startMission(idx);
        });

        this.townMapDistricts.appendChild(card);
      });
    }

    setDialogue(speaker, avatar, text) {
      this.speakerName.textContent = speaker;
      this.speakerAvatar.textContent = avatar;
      this.speechText.textContent = `"${text}"`;
      sound.speak(text);
    }

    /* =========================================================
       4. MISSION STEP-BY-STEP FLOW
       ========================================================= */
    startMission(missionIndex) {
      if (missionIndex >= MISSIONS.length) {
        this.showFinale();
        return;
      }

      this.currentMissionIndex = missionIndex;
      const m = MISSIONS[missionIndex];
      this.state = 'EXPLORE';

      this.showScreen('gameplay');

      // Set Scenery Background Class
      this.missionScenery.className = `mission-scenery ${m.sceneryClass || ''}`;

      // Reset stage layers
      this.stageProblemLayer.classList.remove('hidden');
      this.stageProblemLayer.innerHTML = '';
      this.stageHelperLayer.classList.add('hidden');
      this.stageHelperLayer.innerHTML = '';
      this.stageWowLayer.classList.add('hidden');
      this.stageWowLayer.innerHTML = '';
      this.stageWrongReaction.classList.add('hidden');
      this.stageHelpBtnWrapper.classList.add('hidden');
      this.helperChoicePanel.classList.add('hidden');

      this.stageRiya.classList.remove('celebrate');
      this.stageJohn.classList.remove('celebrate');

      // STEP 1: Exploration
      this.setDialogue(m.dialogues.explore.speaker, m.dialogues.explore.avatar, m.dialogues.explore.text);

      // STEP 2: Problem appears after 2.4 seconds
      setTimeout(() => {
        this.showProblem(m);
      }, 2400);
    }

    showProblem(m) {
      this.state = 'PROBLEM';
      sound.playDing();

      // Render problem prop
      this.stageProblemLayer.innerHTML = m.renderProblem();

      // Set problem dialogue
      this.setDialogue(m.dialogues.problem.speaker, m.dialogues.problem.avatar, m.dialogues.problem.text);

      // Reveal Glowing Magical Help Button
      setTimeout(() => {
        this.stageHelpBtnWrapper.classList.remove('hidden');
        this.setDialogue(m.dialogues.askHelper.speaker, m.dialogues.askHelper.avatar, "Someone needs help! Press the Help Button!");
      }, 1800);
    }

    showHelperChoices() {
      this.state = 'CHOICE';
      const m = MISSIONS[this.currentMissionIndex];

      // Hide stage help button
      this.stageHelpBtnWrapper.classList.add('hidden');

      // Populate choice panel
      this.helperCardsGrid.innerHTML = '';
      m.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'helper-choice-card';
        btn.innerHTML = `
          <img src="${choice.img}" alt="${choice.name}" class="choice-helper-img">
          <span class="choice-helper-name">${choice.name}</span>
        `;
        btn.addEventListener('click', () => {
          this.handleChoice(choice.id);
        });
        this.helperCardsGrid.appendChild(btn);
      });

      this.helperChoicePanel.classList.remove('hidden');
      this.setDialogue(m.dialogues.askHelper.speaker, m.dialogues.askHelper.avatar, m.dialogues.askHelper.text);
    }

    handleChoice(chosenHelperId) {
      const m = MISSIONS[this.currentMissionIndex];

      if (chosenHelperId === m.correctHelperId) {
        // CORRECT CHOICE
        this.handleCorrectAnswer(m);
      } else {
        // WRONG CHOICE - NON-PUNITIVE FUNNY REACTION
        this.handleWrongAnswer(chosenHelperId, m);
      }
    }

    handleWrongAnswer(chosenHelperId, m) {
      sound.playBoing();
      this.helperChoicePanel.classList.add('hidden');

      const reaction = m.wrongReactions[chosenHelperId] || {
        text: "Let's think together! Who has the right tools for this? 😄",
        helperImg: "assets/characters/little_star.svg"
      };

      this.wrongCharPreview.innerHTML = `<img src="${reaction.helperImg}" alt="Helper">`;
      this.wrongDialogueText.textContent = `"${reaction.text}"`;
      sound.speak(reaction.text);

      this.stageWrongReaction.classList.remove('hidden');
    }

    handleCorrectAnswer(m) {
      sound.playSuccess();
      this.state = 'HELPER_ACTION';

      // Hide choices
      this.helperChoicePanel.classList.add('hidden');

      // Helper Arrives and Performs Job
      this.stageProblemLayer.classList.add('hidden');
      this.stageHelperLayer.classList.remove('hidden');
      this.stageHelperLayer.innerHTML = m.renderHelperAction();

      this.setDialogue(m.dialogues.action.speaker, m.dialogues.action.avatar, m.dialogues.action.text);

      // Characters cheer
      this.stageRiya.classList.add('celebrate');
      this.stageJohn.classList.add('celebrate');

      // STEP: WOW Transformation after 2.8s
      setTimeout(() => {
        this.showWowMoment(m);
      }, 2800);
    }

    showWowMoment(m) {
      this.state = 'WOW';
      sound.playDing();

      this.stageHelperLayer.classList.add('hidden');
      this.stageWowLayer.classList.remove('hidden');
      this.stageWowLayer.innerHTML = m.renderWow();

      this.setDialogue(m.dialogues.wow.speaker, m.dialogues.wow.avatar, m.dialogues.wow.text);

      // STEP: Give Reward after 3s
      setTimeout(() => {
        this.giveReward(m);
      }, 3000);
    }

    giveReward(m) {
      this.state = 'REWARD';
      sound.playCheer();

      if (!this.completedMissions.includes(m.id)) {
        this.completedMissions.push(m.id);
      }
      this.currentMissionIndex = this.completedMissions.length;
      this.saveStorage();
      this.updateStarHeader();
      this.renderTownMap();

      // Show Reward Modal
      this.rewardSubtitle.textContent = m.dialogues.reward;
      this.rewardFractionText.textContent = `${this.completedMissions.length} / ${MISSIONS.length}`;

      this.rewardStarDisplay.innerHTML = '';
      for (let i = 0; i < MISSIONS.length; i++) {
        const starSpan = document.createElement('span');
        starSpan.textContent = '⭐';
        starSpan.style.opacity = i < this.completedMissions.length ? '1' : '0.25';
        starSpan.style.filter = i < this.completedMissions.length ? 'none' : 'grayscale(1)';
        this.rewardStarDisplay.appendChild(starSpan);
      }

      this.screens.rewardModal.classList.remove('hidden');
      sound.speak(`Awesome job! ${m.dialogues.reward}`);
    }

    /* =========================================================
       5. GRAND CINEMATIC FINALE
       ========================================================= */
    showFinale() {
      this.state = 'FINALE';
      sound.playCheer();
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE' }, '*');
        }
      } catch (err) {}
      this.showScreen('finale');
      this.startConfetti();
      sound.speak("Helper Hero! Look, you helped our entire town! Every helper matters! We did it together!");
    }

    startConfetti() {
      const canvas = this.confettiCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ['#FF6B6B', '#4DABF7', '#FFD43B', '#51CF66', '#845EF7', '#FF922B'];
      const particles = [];
      const particleCount = 120;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          size: Math.random() * 12 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5
        });
      }

      let animId;
      const render = () => {
        if (this.state !== 'FINALE') {
          cancelAnimationFrame(animId);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        animId = requestAnimationFrame(render);
      };

      render();
    }
  }

  // Initialize Game on DOM Ready
  window.addEventListener('DOMContentLoaded', () => {
    window.chotaPlayApp = new GameManager();
  });
})();
