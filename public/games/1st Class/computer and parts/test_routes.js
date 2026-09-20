const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/index.html',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/js/assets.js',
  'http://localhost:3000/js/audio.js',
  'http://localhost:3000/js/animations.js',
  'http://localhost:3000/js/dragdrop.js',
  'http://localhost:3000/js/teacher-mode.js',
  'http://localhost:3000/js/game.js',
  'http://localhost:3000/assets/computer-parts/monitor.webp',
  'http://localhost:3000/assets/computer-parts/keyboard.webp',
  'http://localhost:3000/assets/computer-parts/mouse.webp',
  'http://localhost:3000/assets/computer-parts/cpu.webp',
  'http://localhost:3000/assets/computer-parts/speaker.webp',
  'http://localhost:3000/assets/computer-parts/printer.webp',
  'http://localhost:3000/assets/computer-parts/teddy%20bear.webp',
  'http://localhost:3000/assets/computer-parts/book.webp',
  'http://localhost:3000/computer%20and%20parts/monitor.webp'
];

async function runTests() {
  console.log('Testing endpoints...');
  let passCount = 0;
  for (const u of urls) {
    await new Promise((resolve) => {
      http.get(u, (res) => {
        if (res.statusCode === 200) {
          console.log(`[PASS] ${res.statusCode} ${res.headers['content-type']} - ${u}`);
          passCount++;
        } else {
          console.error(`[FAIL] ${res.statusCode} - ${u}`);
        }
        res.resume();
        resolve();
      }).on('error', (err) => {
        console.error(`[ERROR] ${u}:`, err.message);
        resolve();
      });
    });
  }
  console.log(`\nCompleted: ${passCount}/${urls.length} tests passed.`);
}

runTests();
