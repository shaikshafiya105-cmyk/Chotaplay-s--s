const fs = require('fs');
const path = require('path');

const helpersDir = path.join(__dirname, 'assets', 'helpers');
const charactersDir = path.join(__dirname, 'assets', 'characters');
const bgDir = path.join(__dirname, 'assets', 'backgrounds');

[helpersDir, charactersDir, bgDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Helper SVG Generator Functions
const svgs = {
  'help_button.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
    <defs>
      <radialGradient id="btnGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFF3BF" />
        <stop offset="50%" stop-color="#FFD43B" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#FFA94D" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="btnPlate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4DABF7" />
        <stop offset="100%" stop-color="#1971C2" />
      </linearGradient>
      <linearGradient id="btnRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF6B6B" />
        <stop offset="60%" stop-color="#FA5252" />
        <stop offset="100%" stop-color="#C92A2A" />
      </linearGradient>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0b3860" flood-opacity="0.4" />
      </filter>
    </defs>
    
    <!-- Outer Pulsing Halo -->
    <circle cx="120" cy="120" r="110" fill="url(#btnGlow)" class="btn-halo" />
    
    <!-- Button Base Rim -->
    <circle cx="120" cy="122" r="92" fill="#1864AB" />
    <circle cx="120" cy="120" r="90" fill="url(#btnPlate)" filter="url(#dropShadow)" />
    <circle cx="120" cy="120" r="82" fill="#E7F5FF" stroke="#A5D8FF" stroke-width="4" />
    
    <!-- Big Red Glowing Press Center -->
    <circle cx="120" cy="124" r="70" fill="#911818" />
    <circle cx="120" cy="118" r="68" fill="url(#btnRed)" />
    
    <!-- Gloss highlight -->
    <ellipse cx="120" cy="80" rx="42" ry="18" fill="#FFF" opacity="0.4" />
    
    <!-- Glowing Star Emblem -->
    <polygon points="120,72 131,98 158,98 136,115 144,142 120,126 96,142 104,115 82,98 109,98"
             fill="#FFEC99" stroke="#E67700" stroke-width="3" stroke-linejoin="round" />
    <circle cx="120" cy="110" r="8" fill="#FFF" opacity="0.8" />
    
    <!-- Text Badge -->
    <rect x="65" y="152" width="110" height="26" rx="13" fill="#FFE066" stroke="#F59F00" stroke-width="2" />
    <text x="120" y="170" font-family="'Fredoka', 'Quicksand', sans-serif" font-weight="900" font-size="16" fill="#D9480F" text-anchor="middle" letter-spacing="1">HELP!</text>
  </svg>`,

  'traffic_police.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <defs>
      <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A9E34B" />
        <stop offset="100%" stop-color="#82C91E" />
      </linearGradient>
    </defs>
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Legs / Trousers -->
    <rect x="75" y="170" width="22" height="65" rx="8" fill="#1864AB" />
    <rect x="103" y="170" width="22" height="65" rx="8" fill="#1864AB" />
    <!-- Shoes -->
    <ellipse cx="86" cy="235" rx="14" ry="8" fill="#212529" />
    <ellipse cx="114" cy="235" rx="14" ry="8" fill="#212529" />
    
    <!-- Body / Shirt -->
    <rect x="62" y="100" width="76" height="75" rx="14" fill="#339AF0" />
    <!-- High-vis Safety Vest -->
    <path d="M 68 100 L 132 100 L 128 170 L 72 170 Z" fill="url(#vestGrad)" />
    <!-- Reflective Stripes -->
    <rect x="70" y="125" width="60" height="10" fill="#FFFFFF" opacity="0.9" />
    <rect x="70" y="145" width="60" height="10" fill="#FFFFFF" opacity="0.9" />
    <!-- Police Badge -->
    <polygon points="100,105 106,114 116,114 108,121 111,130 100,124 89,130 92,121 84,114 94,114" fill="#FFD43B" />

    <!-- Left Arm Rest -->
    <rect x="42" y="105" width="20" height="50" rx="10" fill="#339AF0" />
    <circle cx="52" cy="155" r="10" fill="#FFFFFF" /> <!-- White glove -->

    <!-- Right Arm - Raised Stop Sign / Whistle -->
    <path d="M 134 110 Q 165 95 160 65" fill="none" stroke="#339AF0" stroke-width="20" stroke-linecap="round" />
    <!-- Raised Hand / Stop Baton -->
    <circle cx="160" cy="65" r="12" fill="#FFFFFF" />
    <rect x="156" y="20" width="8" height="46" rx="4" fill="#FF6B6B" />
    <circle cx="160" cy="20" r="14" fill="#FA5252" stroke="#FFF" stroke-width="3" />
    <text x="160" y="24" font-family="sans-serif" font-weight="bold" font-size="9" fill="#FFF" text-anchor="middle">STOP</text>

    <!-- Head -->
    <circle cx="100" cy="65" r="32" fill="#FFD8A8" />
    <!-- Rosy Cheeks -->
    <ellipse cx="80" cy="74" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="74" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="64" r="5" fill="#212529" />
    <circle cx="88" cy="62" r="1.5" fill="#FFF" />
    <circle cx="114" cy="64" r="5" fill="#212529" />
    <circle cx="116" cy="62" r="1.5" fill="#FFF" />
    <!-- Whistle in mouth -->
    <path d="M 94 76 Q 100 84 106 76" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />
    <rect x="96" y="74" width="14" height="6" rx="3" fill="#C5F6FA" stroke="#15AABF" stroke-width="1.5" />

    <!-- Police Cap -->
    <path d="M 68 50 Q 100 25 132 50 Z" fill="#1864AB" />
    <path d="M 62 48 Q 100 38 138 48 Q 100 58 62 48 Z" fill="#212529" />
    <polygon points="100,32 103,38 109,38 104,42 106,48 100,44 94,48 96,42 91,38 97,38" fill="#FFD43B" />
  </svg>`,

  'doctor.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Pants -->
    <rect x="75" y="170" width="22" height="65" rx="8" fill="#4dabf7" />
    <rect x="103" y="170" width="22" height="65" rx="8" fill="#4dabf7" />
    <!-- White Shoes -->
    <ellipse cx="86" cy="235" rx="14" ry="8" fill="#F1F3F5" stroke="#CED4DA" stroke-width="2" />
    <ellipse cx="114" cy="235" rx="14" ry="8" fill="#F1F3F5" stroke="#CED4DA" stroke-width="2" />

    <!-- Blue scrubs & White Doctor Coat -->
    <rect x="65" y="100" width="70" height="75" rx="12" fill="#22b8cf" />
    <path d="M 60 100 L 80 100 L 84 175 L 56 175 Z" fill="#FFFFFF" stroke="#DEE2E6" stroke-width="1.5" />
    <path d="M 140 100 L 120 100 L 116 175 L 144 175 Z" fill="#FFFFFF" stroke="#DEE2E6" stroke-width="1.5" />
    
    <!-- Red Medical Cross Pocket Badge -->
    <rect x="68" y="130" width="16" height="18" rx="3" fill="#FFF" stroke="#CED4DA" stroke-width="1" />
    <rect x="74" y="134" width="4" height="10" fill="#FA5252" />
    <rect x="71" y="137" width="10" height="4" fill="#FA5252" />

    <!-- Stethoscope around neck -->
    <path d="M 85 96 Q 70 120 85 145 Q 100 160 115 145 Q 130 120 115 96" fill="none" stroke="#495057" stroke-width="4" stroke-linecap="round" />
    <!-- Stethoscope disc -->
    <circle cx="100" cy="155" r="9" fill="#ADB5BD" stroke="#495057" stroke-width="2" />
    <circle cx="100" cy="155" r="4" fill="#495057" />

    <!-- Arms -->
    <rect x="42" y="105" width="20" height="50" rx="10" fill="#FFF" stroke="#DEE2E6" stroke-width="1" />
    <circle cx="52" cy="155" r="9" fill="#FFD8A8" />
    
    <path d="M 140 108 Q 160 125 150 145" fill="none" stroke="#FFF" stroke-width="18" stroke-linecap="round" />
    <circle cx="148" cy="148" r="9" fill="#FFD8A8" />

    <!-- Head -->
    <circle cx="100" cy="62" r="32" fill="#FFD8A8" />
    <!-- Friendly Hair -->
    <path d="M 68 60 Q 66 32 100 30 Q 134 32 132 60 Q 120 40 100 42 Q 80 40 68 60 Z" fill="#862E9C" />
    <!-- Cheeks -->
    <ellipse cx="80" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="5" fill="#212529" />
    <circle cx="88" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="5" fill="#212529" />
    <circle cx="116" cy="60" r="1.5" fill="#FFF" />
    <!-- Smile -->
    <path d="M 90 74 Q 100 86 110 74" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />
    
    <!-- Doctor Headband Mirror -->
    <path d="M 68 50 Q 100 40 132 50" fill="none" stroke="#CED4DA" stroke-width="5" stroke-linecap="round" />
    <circle cx="100" cy="45" r="10" fill="#E9ECEF" stroke="#868E96" stroke-width="2" />
    <circle cx="98" cy="43" r="3" fill="#FFF" />
  </svg>`,

  'firefighter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Pants -->
    <rect x="73" y="170" width="24" height="65" rx="8" fill="#E8590C" />
    <rect x="103" y="170" width="24" height="65" rx="8" fill="#E8590C" />
    <rect x="73" y="210" width="24" height="8" fill="#FFD43B" />
    <rect x="103" y="210" width="24" height="8" fill="#FFD43B" />
    <!-- Heavy Duty Boots -->
    <ellipse cx="85" cy="235" rx="15" ry="9" fill="#212529" />
    <ellipse cx="115" cy="235" rx="15" ry="9" fill="#212529" />

    <!-- Coat / Jacket -->
    <rect x="60" y="100" width="80" height="75" rx="12" fill="#D9480F" />
    <!-- Reflective Stripes -->
    <rect x="60" y="125" width="80" height="10" fill="#FFD43B" />
    <rect x="60" y="150" width="80" height="8" fill="#E9ECEF" />
    <rect x="97" y="100" width="6" height="75" fill="#212529" opacity="0.2" />

    <!-- Left Arm -->
    <rect x="40" y="105" width="22" height="50" rx="10" fill="#D9480F" />
    <circle cx="51" cy="155" r="10" fill="#212529" /> <!-- Gloves -->

    <!-- Right Arm with Fire Hose Nozzle -->
    <path d="M 138 110 Q 165 125 155 150" fill="none" stroke="#D9480F" stroke-width="20" stroke-linecap="round" />
    <circle cx="152" cy="154" r="10" fill="#212529" />
    <!-- Hose & Brass Nozzle -->
    <path d="M 160 200 Q 170 170 155 154" fill="none" stroke="#495057" stroke-width="12" stroke-linecap="round" />
    <polygon points="150,150 170,140 174,148 154,158" fill="#FCC419" stroke="#E67700" stroke-width="2" />

    <!-- Head -->
    <circle cx="100" cy="62" r="30" fill="#FFD8A8" />
    <ellipse cx="80" cy="70" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="70" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="5" fill="#212529" />
    <circle cx="88" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="5" fill="#212529" />
    <circle cx="116" cy="60" r="1.5" fill="#FFF" />
    <!-- Big confident smile -->
    <path d="M 88 74 Q 100 88 112 74" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />

    <!-- Fire Helmet -->
    <path d="M 60 52 Q 100 15 140 52 Z" fill="#E03131" />
    <path d="M 52 52 Q 100 42 148 52 Q 100 60 52 52 Z" fill="#C92A2A" />
    <!-- Golden Shield Badge -->
    <path d="M 94 30 L 106 30 L 108 42 L 100 48 L 92 42 Z" fill="#FFD43B" stroke="#F59F00" stroke-width="1.5" />
    <text x="100" y="42" font-family="sans-serif" font-weight="900" font-size="8" fill="#C92A2A" text-anchor="middle">1</text>
  </svg>`,

  'teacher.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Skirt / Dress -->
    <path d="M 75 160 L 125 160 L 135 210 L 65 210 Z" fill="#E64980" />
    <rect x="80" y="210" width="14" height="25" fill="#FFD8A8" />
    <rect x="106" y="210" width="14" height="25" fill="#FFD8A8" />
    <!-- Cute Shoes -->
    <ellipse cx="87" cy="235" rx="12" ry="7" fill="#9C36B5" />
    <ellipse cx="113" cy="235" rx="12" ry="7" fill="#9C36B5" />

    <!-- Cardigan Top -->
    <rect x="66" y="100" width="68" height="65" rx="12" fill="#7048E8" />
    <!-- Inner Blouse / Polka dots -->
    <path d="M 85 100 L 100 120 L 115 100 Z" fill="#FFF" />
    <circle cx="100" cy="130" r="3" fill="#FFD43B" />
    <circle cx="100" cy="145" r="3" fill="#FFD43B" />

    <!-- Left Arm Holding Pointer -->
    <path d="M 68 105 Q 40 120 48 145" fill="none" stroke="#7048E8" stroke-width="16" stroke-linecap="round" />
    <circle cx="48" cy="145" r="8" fill="#FFD8A8" />
    <!-- Star Pointer Stick -->
    <line x1="48" y1="145" x2="25" y2="90" stroke="#FAB005" stroke-width="4" stroke-linecap="round" />
    <polygon points="25,82 28,88 34,88 29,92 31,98 25,94 19,98 21,92 16,88 22,88" fill="#FFD43B" />

    <!-- Right Arm Holding Colorful Book -->
    <path d="M 130 105 Q 155 125 142 148" fill="none" stroke="#7048E8" stroke-width="16" stroke-linecap="round" />
    <circle cx="142" cy="148" r="8" fill="#FFD8A8" />
    <!-- ABC Book -->
    <rect x="135" y="130" width="30" height="24" rx="4" fill="#40C057" stroke="#2F9E44" stroke-width="2" transform="rotate(15 135 130)" />
    <text x="146" y="148" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="11" fill="#FFF">ABC</text>

    <!-- Head & Hair -->
    <circle cx="100" cy="62" r="32" fill="#FFD8A8" />
    <!-- Hairstyle with hair bun -->
    <path d="M 68 62 Q 65 30 100 28 Q 135 30 132 62 Q 115 42 100 44 Q 85 42 68 62 Z" fill="#5C3B1E" />
    <circle cx="100" cy="22" r="14" fill="#5C3B1E" />
    <circle cx="100" cy="22" r="6" fill="#E64980" /> <!-- Hairband -->

    <!-- Glasses -->
    <circle cx="86" cy="62" r="9" fill="none" stroke="#E64980" stroke-width="3" />
    <circle cx="114" cy="62" r="9" fill="none" stroke="#E64980" stroke-width="3" />
    <line x1="95" y1="62" x2="105" y2="62" stroke="#E64980" stroke-width="3" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="4" fill="#212529" />
    <circle cx="87" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="4" fill="#212529" />
    <circle cx="115" cy="60" r="1.5" fill="#FFF" />
    <!-- Cheeks & Smile -->
    <ellipse cx="78" cy="72" rx="5" ry="3" fill="#FFA8A8" />
    <ellipse cx="122" cy="72" rx="5" ry="3" fill="#FFA8A8" />
    <path d="M 90 75 Q 100 85 110 75" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />
  </svg>`,

  'postal_worker.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Trousers -->
    <rect x="75" y="170" width="22" height="65" rx="8" fill="#1C7ED6" />
    <rect x="103" y="170" width="22" height="65" rx="8" fill="#1C7ED6" />
    <!-- Shoes -->
    <ellipse cx="86" cy="235" rx="14" ry="8" fill="#343A40" />
    <ellipse cx="114" cy="235" rx="14" ry="8" fill="#343A40" />

    <!-- Uniform Shirt -->
    <rect x="64" y="100" width="72" height="75" rx="12" fill="#339AF0" />
    <path d="M 85 100 L 100 115 L 115 100 Z" fill="#D0EBFF" />
    <polygon points="100,115 104,140 100,146 96,140" fill="#E03131" /> <!-- Red Tie -->

    <!-- Mail Carrier Satchel Strap across chest -->
    <line x1="68" y1="102" x2="132" y2="168" stroke="#845EF7" stroke-width="8" stroke-linecap="round" />
    <!-- Mail Bag -->
    <rect x="122" y="145" width="34" height="28" rx="6" fill="#7048E8" stroke="#5F3DC4" stroke-width="2" />
    <path d="M 122 145 L 139 160 L 156 145 Z" fill="#9775FA" />

    <!-- Left Arm -->
    <rect x="44" y="105" width="20" height="50" rx="10" fill="#339AF0" />
    <circle cx="54" cy="155" r="9" fill="#FFD8A8" />

    <!-- Right Arm Holding Letter -->
    <path d="M 132 108 Q 165 118 152 138" fill="none" stroke="#339AF0" stroke-width="18" stroke-linecap="round" />
    <circle cx="150" cy="140" r="9" fill="#FFD8A8" />
    <!-- Stamped Letter -->
    <rect x="145" y="120" width="30" height="20" rx="3" fill="#FFF" stroke="#ADB5BD" stroke-width="1.5" transform="rotate(-15 145 120)" />
    <rect x="164" y="122" width="6" height="7" fill="#FF6B6B" transform="rotate(-15 145 120)" />
    <line x1="148" y1="130" x2="162" y2="130" stroke="#868E96" stroke-width="1.5" transform="rotate(-15 145 120)" />

    <!-- Head -->
    <circle cx="100" cy="62" r="32" fill="#FFD8A8" />
    <ellipse cx="80" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="5" fill="#212529" />
    <circle cx="88" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="5" fill="#212529" />
    <circle cx="116" cy="60" r="1.5" fill="#FFF" />
    <!-- Smile -->
    <path d="M 90 74 Q 100 86 110 74" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />

    <!-- Postal Cap -->
    <path d="M 68 50 Q 100 24 132 50 Z" fill="#1C7ED6" />
    <path d="M 64 48 Q 100 38 136 48 Q 100 56 64 48 Z" fill="#1864AB" />
    <!-- Horn/Envelope Emblem -->
    <polygon points="100,32 105,37 105,43 95,43 95,37" fill="#FFD43B" />
  </svg>`,

  'sanitation_worker.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Pants -->
    <rect x="74" y="170" width="23" height="65" rx="8" fill="#2B8A3E" />
    <rect x="103" y="170" width="23" height="65" rx="8" fill="#2B8A3E" />
    <rect x="74" y="210" width="23" height="8" fill="#FCC419" />
    <rect x="103" y="210" width="23" height="8" fill="#FCC419" />
    <!-- Safety Boots -->
    <ellipse cx="85" cy="235" rx="14" ry="8" fill="#495057" />
    <ellipse cx="115" cy="235" rx="14" ry="8" fill="#495057" />

    <!-- Eco Green Jacket & Bright Orange Vest -->
    <rect x="62" y="100" width="76" height="75" rx="12" fill="#37B24D" />
    <path d="M 68 100 L 132 100 L 126 172 L 74 172 Z" fill="#FF922B" />
    <!-- Silver Stripes -->
    <rect x="70" y="125" width="60" height="10" fill="#FFFFFF" opacity="0.9" />
    <rect x="70" y="145" width="60" height="10" fill="#FFFFFF" opacity="0.9" />

    <!-- Left Arm Holding Broom Handle -->
    <path d="M 66 105 Q 38 120 45 155" fill="none" stroke="#37B24D" stroke-width="16" stroke-linecap="round" />
    <circle cx="45" cy="155" r="9" fill="#F08C00" /> <!-- Work gloves -->
    <!-- Broom -->
    <line x1="45" y1="80" x2="45" y2="230" stroke="#A9E34B" stroke-width="6" stroke-linecap="round" />
    <!-- Bristles -->
    <polygon points="30,225 60,225 65,245 25,245" fill="#FAB005" stroke="#E67700" stroke-width="1.5" />

    <!-- Right Arm Holding Trash Grabber/Bin -->
    <path d="M 134 105 Q 160 120 152 155" fill="none" stroke="#37B24D" stroke-width="16" stroke-linecap="round" />
    <circle cx="152" cy="155" r="9" fill="#F08C00" />
    <rect x="145" y="150" width="18" height="24" rx="4" fill="#40C057" stroke="#2B8A3E" stroke-width="2" />
    <!-- Recycle Symbol -->
    <circle cx="154" cy="162" r="5" fill="none" stroke="#FFF" stroke-width="2" stroke-dasharray="3,2" />

    <!-- Head -->
    <circle cx="100" cy="62" r="32" fill="#FFD8A8" />
    <ellipse cx="80" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="5" fill="#212529" />
    <circle cx="88" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="5" fill="#212529" />
    <circle cx="116" cy="60" r="1.5" fill="#FFF" />
    <!-- Smile -->
    <path d="M 90 74 Q 100 86 110 74" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />

    <!-- Safety Cap -->
    <path d="M 68 50 Q 100 24 132 50 Z" fill="#2B8A3E" />
    <path d="M 64 48 Q 100 38 136 48 Q 100 56 64 48 Z" fill="#FF922B" />
    <!-- Leaf badge -->
    <circle cx="100" cy="38" r="6" fill="#82C91E" />
  </svg>`,

  'mechanic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="100" cy="245" rx="55" ry="10" fill="#000" opacity="0.15" />
    
    <!-- Blue Overalls Pants -->
    <rect x="74" y="170" width="23" height="65" rx="8" fill="#1864AB" />
    <rect x="103" y="170" width="23" height="65" rx="8" fill="#1864AB" />
    <!-- Work Boots -->
    <ellipse cx="85" cy="235" rx="14" ry="8" fill="#862E9C" />
    <ellipse cx="115" cy="235" rx="14" ry="8" fill="#862E9C" />

    <!-- Red T-Shirt under Overalls -->
    <rect x="62" y="100" width="76" height="75" rx="12" fill="#E03131" />
    <!-- Denim Overalls Bib & Straps -->
    <path d="M 72 100 L 80 100 L 80 130 L 120 130 L 120 100 L 128 100 L 132 175 L 68 175 Z" fill="#1864AB" />
    <!-- Golden Buttons on Straps -->
    <circle cx="76" cy="128" r="3.5" fill="#FFD43B" />
    <circle cx="124" cy="128" r="3.5" fill="#FFD43B" />
    <!-- Tool in chest pocket -->
    <rect x="88" y="136" width="24" height="18" rx="3" fill="#1971C2" />
    <line x1="94" y1="130" x2="94" y2="136" stroke="#ADB5BD" stroke-width="3" stroke-linecap="round" />
    <line x1="104" y1="126" x2="104" y2="136" stroke="#FAB005" stroke-width="4" stroke-linecap="round" />

    <!-- Left Arm -->
    <rect x="42" y="105" width="20" height="50" rx="10" fill="#E03131" />
    <circle cx="52" cy="155" r="9" fill="#FFD8A8" />

    <!-- Right Arm Holding Shiny Wrench -->
    <path d="M 134 105 Q 165 115 156 142" fill="none" stroke="#E03131" stroke-width="18" stroke-linecap="round" />
    <circle cx="154" cy="145" r="9" fill="#FFD8A8" />
    <!-- Chrome Spanner / Wrench -->
    <path d="M 152 145 L 175 115" stroke="#CED4DA" stroke-width="8" stroke-linecap="round" />
    <circle cx="178" cy="112" r="10" fill="#CED4DA" />
    <rect x="175" y="106" width="6" height="12" fill="#FFF" />

    <!-- Head -->
    <circle cx="100" cy="62" r="32" fill="#FFD8A8" />
    <!-- Cute friendly smudge on cheek -->
    <circle cx="118" cy="70" r="4" fill="#868E96" opacity="0.5" />
    <ellipse cx="80" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <ellipse cx="120" cy="72" rx="6" ry="4" fill="#FFA8A8" />
    <!-- Eyes -->
    <circle cx="86" cy="62" r="5" fill="#212529" />
    <circle cx="88" cy="60" r="1.5" fill="#FFF" />
    <circle cx="114" cy="62" r="5" fill="#212529" />
    <circle cx="116" cy="60" r="1.5" fill="#FFF" />
    <!-- Wink / Big confident Smile -->
    <path d="M 90 74 Q 100 88 110 74" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />

    <!-- Backwards Baseball Cap -->
    <path d="M 68 50 Q 100 24 132 50 Z" fill="#F59F00" />
    <path d="M 60 52 Q 75 42 100 48" fill="none" stroke="#D9480F" stroke-width="6" stroke-linecap="round" /> <!-- Cap visor backwards -->
    <circle cx="100" cy="27" r="4" fill="#D9480F" />
  </svg>`,

  'fire_truck.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="130" cy="148" rx="100" ry="10" fill="#000" opacity="0.2" />
    <!-- Fire Truck Body -->
    <rect x="25" y="45" width="150" height="75" rx="8" fill="#E03131" />
    <!-- Cab -->
    <path d="M 175 60 L 210 60 Q 235 60 235 90 L 235 120 L 175 120 Z" fill="#E03131" />
    <!-- Windshield -->
    <path d="M 180 65 L 210 65 Q 225 65 225 85 L 180 85 Z" fill="#C5F6FA" stroke="#15AABF" stroke-width="2" />
    <!-- Side Windows -->
    <rect x="135" y="60" width="30" height="25" rx="4" fill="#C5F6FA" stroke="#15AABF" stroke-width="1.5" />
    <!-- Yellow Ladder -->
    <rect x="35" y="28" width="115" height="14" rx="3" fill="#FFD43B" stroke="#E67700" stroke-width="1.5" />
    <line x1="55" y1="28" x2="55" y2="42" stroke="#E67700" stroke-width="2" />
    <line x1="75" y1="28" x2="75" y2="42" stroke="#E67700" stroke-width="2" />
    <line x1="95" y1="28" x2="95" y2="42" stroke="#E67700" stroke-width="2" />
    <line x1="115" y1="28" x2="115" y2="42" stroke="#E67700" stroke-width="2" />
    <line x1="135" y1="28" x2="135" y2="42" stroke="#E67700" stroke-width="2" />

    <!-- Flashing Siren Light -->
    <rect x="195" y="46" width="16" height="14" rx="4" fill="#339AF0" stroke="#1864AB" stroke-width="2" />
    <polygon points="195,44 203,32 211,44" fill="#FFE066" opacity="0.8" />

    <!-- White Stripe & Badge -->
    <rect x="25" y="90" width="205" height="12" fill="#FFFFFF" />
    <polygon points="90,75 94,83 103,83 96,89 99,98 90,92 81,98 84,89 77,83 86,83" fill="#FFD43B" />

    <!-- Headlight -->
    <circle cx="230" cy="105" r="7" fill="#FFEC99" stroke="#FAB005" stroke-width="1.5" />

    <!-- Big Wheels -->
    <circle cx="65" cy="125" r="22" fill="#212529" />
    <circle cx="65" cy="125" r="11" fill="#ADB5BD" stroke="#495057" stroke-width="2" />
    <circle cx="185" cy="125" r="22" fill="#212529" />
    <circle cx="185" cy="125" r="11" fill="#ADB5BD" stroke="#495057" stroke-width="2" />
  </svg>`,

  'garbage_truck.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="130" cy="148" rx="100" ry="10" fill="#000" opacity="0.2" />
    <!-- Truck Compactor Body -->
    <path d="M 25 50 L 150 50 L 160 120 L 25 120 Z" fill="#2B8A3E" />
    <path d="M 15 65 L 35 50 L 35 120 L 15 110 Z" fill="#237032" />
    <!-- Cab -->
    <path d="M 160 65 L 195 65 Q 225 65 225 95 L 225 120 L 160 120 Z" fill="#40C057" />
    <!-- Windshield -->
    <path d="M 165 70 L 195 70 Q 215 70 215 90 L 165 90 Z" fill="#E7F5FF" stroke="#74C0FC" stroke-width="2" />
    
    <!-- Huge White Recycle Symbol -->
    <circle cx="90" cy="85" r="24" fill="#237032" />
    <text x="90" y="93" font-family="sans-serif" font-weight="900" font-size="24" fill="#A9E34B" text-anchor="middle">♻</text>

    <!-- Safety Light -->
    <rect x="180" y="52" width="14" height="13" rx="3" fill="#FCC419" stroke="#E67700" stroke-width="1.5" />
    
    <!-- Wheels -->
    <circle cx="65" cy="125" r="22" fill="#212529" />
    <circle cx="65" cy="125" r="11" fill="#CED4DA" stroke="#495057" stroke-width="2" />
    <circle cx="185" cy="125" r="22" fill="#212529" />
    <circle cx="185" cy="125" r="11" fill="#CED4DA" stroke="#495057" stroke-width="2" />
  </svg>`,

  'patient.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
    <!-- Cozy Clinic Bed / Pillows -->
    <rect x="20" y="160" width="160" height="50" rx="10" fill="#E7F5FF" stroke="#A5D8FF" stroke-width="3" />
    <rect x="25" y="130" width="50" height="40" rx="10" fill="#FFFFFF" stroke="#DEE2E6" stroke-width="2" />
    <!-- Cozy Blanket -->
    <rect x="65" y="150" width="115" height="55" rx="8" fill="#74C0FC" />
    <path d="M 65 150 Q 120 165 180 150" fill="none" stroke="#4DABF7" stroke-width="3" />

    <!-- Patient Body sitting up -->
    <circle cx="75" cy="100" r="30" fill="#FFD8A8" />
    <!-- Pajamas -->
    <path d="M 55 130 L 105 130 L 115 170 L 45 170 Z" fill="#FFE066" />
    <circle cx="80" cy="145" r="3" fill="#F59F00" />
    <circle cx="80" cy="160" r="3" fill="#F59F00" />

    <!-- Cute Messy Bed Hair -->
    <path d="M 45 98 Q 45 70 75 68 Q 105 70 105 98 Q 90 78 75 80 Q 60 78 45 98 Z" fill="#D9480F" />

    <!-- Thermometer in mouth / Swappable expression -->
    <ellipse cx="62" cy="108" rx="5" ry="3" fill="#FFA8A8" />
    <ellipse cx="88" cy="108" rx="5" ry="3" fill="#FFA8A8" />
    
    <!-- Sleepy / Unwell Eyes -->
    <path d="M 58 100 Q 64 96 70 100" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />
    <path d="M 80 100 Q 86 96 92 100" fill="none" stroke="#212529" stroke-width="3" stroke-linecap="round" />
    
    <!-- Small mouth / Thermometer -->
    <circle cx="75" cy="112" r="3" fill="#212529" />
    <rect x="75" y="110" width="18" height="5" rx="2.5" fill="#FFF" stroke="#FF6B6B" stroke-width="1" />
    <circle cx="93" cy="112.5" r="3.5" fill="#FA5252" />

    <!-- Ice pack on forehead -->
    <ellipse cx="75" cy="74" rx="14" ry="7" fill="#63E6BE" stroke="#20C997" stroke-width="1.5" />
    <path d="M 75 67 L 75 62" stroke="#20C997" stroke-width="3" stroke-linecap="round" />
  </svg>`
};

Object.entries(svgs).forEach(([filename, content]) => {
  const targetPath = path.join(helpersDir, filename);
  fs.writeFileSync(targetPath, content.trim(), 'utf8');
  console.log('Created ' + targetPath);
});
console.log('All SVGs generated successfully!');
