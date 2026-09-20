================================================================================
🖥️ COMPUTER QUEST — "Build Your Computer!" (Class 1 Educational Game)
================================================================================

Target Audience: Class 1 Children (Ages 5–7)
Duration: ~5–6 minutes
Platform: HTML5, CSS3, Vanilla JavaScript (Zero external libraries)

1. OVERVIEW
-----------
"Computer Quest" is a single-screen 2D educational adventure game where young
learners join Pixel the friendly lab bunny to identify and assemble basic computer
parts onto a build desk.

Learned Computer Parts:
1. Monitor ("We use it to see.")
2. CPU / System Unit ("It helps the computer work.")
3. Keyboard ("We use it to type.")
4. Mouse ("We use it to point and click.")
5. Speakers ("They give us sound.")
6. Printer ("It prints our work on paper.")

2. FOLDER STRUCTURE
-------------------
computer-quest/
│
├── index.html               # Main single-screen game interface
│
├── css/
│   └── style.css            # 2D cartoon styling, responsive grid & animations
│
├── js/
│   ├── assets.js            # Asset manifest & image preloader
│   ├── audio.js             # Web Audio synthesizer SFX & SpeechSynthesis narrator
│   ├── animations.js        # Canvas particle engine (confetti & sparkles) & gestures
│   ├── dragdrop.js          # Pointer Events drag-and-drop system with gentle hints
│   ├── teacher-mode.js      # Classroom projector controls & learning summary
│   └── game.js              # Core state machine, micro-demos, challenge & free-play
│
├── assets/
│   └── computer-parts/      # Provided real computer part images (.webp)
│
└── README.txt               # This guide

3. ASSET PLACEMENT
------------------
The game uses the real .webp photographs provided in the project:
- monitor.webp
- cpu.webp
- keyboard.webp
- mouse.webp
- speaker.webp
- printer.webp
- distractors: teddy bear.webp, book.webp, pencil.webp, clock.webp, school bag.webp, etc.

4. CLASSROOM & TEACHER FEATURES
--------------------------------
- Fullscreen Projector Mode: Press the "⚙️ Teacher Mode" button at top-right.
- Voice & SFX Mute: Quick toggles inside Teacher Mode.
- Replay Narration: Tap the speech bubble anytime to repeat the voice instruction.
- Progress Summary: Visual tick checklist of all 6 parts learned.
- Zero Punishment: No countdown timers, no negative scoring, gentle visual hints.

================================================================================
Enjoy learning with Computer Quest!
================================================================================
