const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = [
  '/',
  '/style.css',
  '/script.js',
  '/assets/characters/riya.png',
  '/assets/characters/john.png',
  '/assets/characters/little_star.svg',
  '/assets/helpers/traffic_police.svg',
  '/assets/helpers/doctor.svg',
  '/assets/helpers/firefighter.svg',
  '/assets/helpers/teacher.svg',
  '/assets/helpers/postal_worker.svg',
  '/assets/helpers/sanitation_worker.svg',
  '/assets/helpers/mechanic.svg',
  '/assets/helpers/help_button.svg',
  '/assets/helpers/fire_truck.svg',
  '/assets/helpers/garbage_truck.svg',
  '/assets/helpers/patient.svg'
];

async function testEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${endpoint}`, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      res.resume();
      if (statusCode === 200) {
        console.log(`[PASS] ${endpoint} -> 200 OK (${contentType})`);
        resolve(true);
      } else {
        console.error(`[FAIL] ${endpoint} -> ${statusCode}`);
        resolve(false);
      }
    }).on('error', (e) => {
      console.error(`[ERROR] ${endpoint} -> ${e.message}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('--- Starting Web App Tests ---');
  let passed = 0;
  for (const url of urls) {
    const ok = await testEndpoint(url);
    if (ok) passed++;
  }
  console.log(`\nEndpoint Results: ${passed}/${urls.length} Passed.`);

  // Validate script.js syntax
  try {
    const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    new Function(scriptContent); // Syntax verification
    console.log('[PASS] script.js syntax is 100% valid JavaScript!');
  } catch (err) {
    console.error('[FAIL] script.js syntax error:', err.message);
  }

  // Validate index.html contains all necessary screens and character references
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const requiredIds = [
    'game-app', 'game-header', 'screen-start', 'screen-town-map', 
    'screen-gameplay', 'screen-reward-modal', 'screen-finale',
    'btn-start-adventure', 'stage-help-button-wrapper', 'helper-choice-panel',
    'btn-speak-again', 'btn-next-mission', 'btn-play-again'
  ];

  let missingIds = requiredIds.filter(id => !html.includes(`id="${id}"`));
  if (missingIds.length === 0) {
    console.log('[PASS] index.html contains all required screen containers and interactive UI elements!');
  } else {
    console.error('[FAIL] Missing IDs in index.html:', missingIds);
  }

  console.log('\n--- Test Suite Complete ---');
}

runTests();
