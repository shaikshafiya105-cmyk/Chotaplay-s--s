export interface DiscoveryPropConfig {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  isPartnerHolder?: boolean;
}

export interface LetterConfig {
  id: string;
  uppercase: string;
  lowercase: string;
  word: string;
  wordEmoji: string;
  phonics: string;
  themeColor: string;
  accentColor: string;
  bgRuneColor: string;
  introPrompt: string;
  bigDiscoveredPrompt: string;
  searchPrompt: string;
  foundSmallPrompt: string;
  successQuote: string;
  props: DiscoveryPropConfig[];
}

export const LETTERS_DATA: LetterConfig[] = [
  {
    id: 'A',
    uppercase: 'A',
    lowercase: 'a',
    word: 'Apple',
    wordEmoji: '🍎',
    phonics: '/æ/ as in Apple',
    themeColor: '#ff2d75',
    accentColor: '#ffd21e',
    bgRuneColor: '#00e5ff',
    introPrompt: "Look at the glowing magic portal! Tap Big A to awaken its magic!",
    bigDiscoveredPrompt: "Awesome! This is Big A! Can you find its little partner, small a?",
    searchPrompt: "Search the magic lab shelves and jars for little a!",
    foundSmallPrompt: "Hooray! You found little a! Tap it to connect with Big A!",
    successQuote: "Big A has found little a! A and a are magical partners!",
    props: [
      { id: 'prop_flask', name: 'Potion Flask', emoji: '🧪', bgGradient: 'linear-gradient(135deg, #00e676, #00703c)' },
      { id: 'prop_star_jar', name: 'Enchanted Star Jar', emoji: '⭐', bgGradient: 'linear-gradient(135deg, #ffd21e, #ff9100)', isPartnerHolder: true },
      { id: 'prop_orb', name: 'Crystal Orb', emoji: '🔮', bgGradient: 'linear-gradient(135deg, #9d4edd, #5a189a)' },
      { id: 'prop_chest', name: 'Treasure Box', emoji: '🎁', bgGradient: 'linear-gradient(135deg, #ff5e97, #c2185b)' }
    ]
  },
  {
    id: 'B',
    uppercase: 'B',
    lowercase: 'b',
    word: 'Butterfly',
    wordEmoji: '🦋',
    phonics: '/b/ as in Butterfly',
    themeColor: '#00b0ff',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff5e97',
    introPrompt: "Welcome to the Balloon Lab! Tap Big B to make it float!",
    bigDiscoveredPrompt: "Great job! This is Big B! Where is little b hiding?",
    searchPrompt: "Look inside the floating magic balloons and jars!",
    foundSmallPrompt: "Super! You discovered little b! Let's match them!",
    successQuote: "Big B and little b are together! B makes the butterfly fly!",
    props: [
      { id: 'prop_balloon_1', name: 'Pink Balloon', emoji: '🎈', bgGradient: 'linear-gradient(135deg, #ff4081, #c51162)' },
      { id: 'prop_balloon_2', name: 'Magic Balloon', emoji: '✨', bgGradient: 'linear-gradient(135deg, #00e5ff, #0091ea)', isPartnerHolder: true },
      { id: 'prop_honey', name: 'Honey Pot', emoji: '🍯', bgGradient: 'linear-gradient(135deg, #ffd21e, #ff6d00)' }
    ]
  },
  {
    id: 'C',
    uppercase: 'C',
    lowercase: 'c',
    word: 'Cat',
    wordEmoji: '🐱',
    phonics: '/k/ as in Cat',
    themeColor: '#ff9100',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "Look! A magical Cat Room! Tap Big C to start!",
    bigDiscoveredPrompt: "Purr-fect! This is Big C! Can you find little c?",
    searchPrompt: "Check behind the yarn balls and pet baskets!",
    foundSmallPrompt: "You found little c! Bring Big C and little c together!",
    successQuote: "Big C and little c are reunited! Meow!",
    props: [
      { id: 'prop_yarn', name: 'Yarn Ball', emoji: '🧶', bgGradient: 'linear-gradient(135deg, #ff4081, #f50057)', isPartnerHolder: true },
      { id: 'prop_fish', name: 'Toy Fish', emoji: '🐟', bgGradient: 'linear-gradient(135deg, #00e5ff, #00b0ff)' },
      { id: 'prop_bell', name: 'Magic Bell', emoji: '🔔', bgGradient: 'linear-gradient(135deg, #ffd21e, #ffab00)' }
    ]
  },
  {
    id: 'D',
    uppercase: 'D',
    lowercase: 'd',
    word: 'Dolphin',
    wordEmoji: '🐬',
    phonics: '/d/ as in Dolphin',
    themeColor: '#00e5ff',
    accentColor: '#ff5e97',
    bgRuneColor: '#00e676',
    introPrompt: "Welcome to the Ocean Magic Room! Tap Big D!",
    bigDiscoveredPrompt: "Splendid! Big D is ready! Where is little d?",
    searchPrompt: "Look under the magic sea shells and coral chests!",
    foundSmallPrompt: "You found little d! Connect them across the magic water!",
    successQuote: "Big D and little d made a joyful splash!",
    props: [
      { id: 'prop_shell', name: 'Sea Shell', emoji: '🐚', bgGradient: 'linear-gradient(135deg, #ff80ab, #f50057)' },
      { id: 'prop_pearl', name: 'Magic Pearl', emoji: '🫧', bgGradient: 'linear-gradient(135deg, #80d8ff, #00b0ff)', isPartnerHolder: true },
      { id: 'prop_drum', name: 'Magic Drum', emoji: '🪘', bgGradient: 'linear-gradient(135deg, #ffd180, #ff6d00)' }
    ]
  },
  {
    id: 'E',
    uppercase: 'E',
    lowercase: 'e',
    word: 'Elephant',
    wordEmoji: '🐘',
    phonics: '/e/ as in Elephant',
    themeColor: '#9d4edd',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "Energy crystals are glowing! Tap Big E!",
    bigDiscoveredPrompt: "Electric! Big E is charged up! Find little e!",
    searchPrompt: "Look inside the crystal geodes and power orbs!",
    foundSmallPrompt: "Energy match! You found little e!",
    successQuote: "Big E and little e sparked magic energy!",
    props: [
      { id: 'prop_gem', name: 'Purple Crystal', emoji: '💎', bgGradient: 'linear-gradient(135deg, #e040fb, #aa00ff)', isPartnerHolder: true },
      { id: 'prop_spark', name: 'Spark Orb', emoji: '⚡', bgGradient: 'linear-gradient(135deg, #ffd740, #ffab00)' },
      { id: 'prop_egg', name: 'Magic Egg', emoji: '🥚', bgGradient: 'linear-gradient(135deg, #b388ff, #7c4dff)' }
    ]
  },
  {
    id: 'F',
    uppercase: 'F',
    lowercase: 'f',
    word: 'Flower',
    wordEmoji: '🌸',
    phonics: '/f/ as in Flower',
    themeColor: '#ff4081',
    accentColor: '#00e676',
    bgRuneColor: '#ffd21e',
    introPrompt: "The Fairy Garden is blooming! Tap Big F!",
    bigDiscoveredPrompt: "Fabulous! Big F is here! Can you discover little f?",
    searchPrompt: "Search among the blooming magic blossoms!",
    foundSmallPrompt: "Lovely! You found little f! Match the flower pair!",
    successQuote: "Big F and little f bloomed into magic!",
    props: [
      { id: 'prop_rose', name: 'Magic Flower', emoji: '🌺', bgGradient: 'linear-gradient(135deg, #ff80ab, #f50057)', isPartnerHolder: true },
      { id: 'prop_leaf', name: 'Four Leaf Clover', emoji: '🍀', bgGradient: 'linear-gradient(135deg, #b9f6ca, #00e676)' },
      { id: 'prop_feather', name: 'Feather', emoji: '🪶', bgGradient: 'linear-gradient(135deg, #84ffff, #00e5ff)' }
    ]
  },
  {
    id: 'G',
    uppercase: 'G',
    lowercase: 'g',
    word: 'Giraffe',
    wordEmoji: '🦒',
    phonics: '/dʒ/ as in Giraffe',
    themeColor: '#00e676',
    accentColor: '#ffd21e',
    bgRuneColor: '#00e5ff',
    introPrompt: "Welcome to the Golden Garden! Tap Big G!",
    bigDiscoveredPrompt: "Great! Big G is awake! Find little g partner!",
    searchPrompt: "Check the glowing golden acorns and leaves!",
    foundSmallPrompt: "Good job! You found little g!",
    successQuote: "Big G and little g are glorious together!",
    props: [
      { id: 'prop_grapes', name: 'Magic Grapes', emoji: '🍇', bgGradient: 'linear-gradient(135deg, #ea80fc, #aa00ff)', isPartnerHolder: true },
      { id: 'prop_guitar', name: 'Guitar', emoji: '🎸', bgGradient: 'linear-gradient(135deg, #ffd740, #ff6d00)' }
    ]
  },
  {
    id: 'H',
    uppercase: 'H',
    lowercase: 'h',
    word: 'Heart',
    wordEmoji: '💖',
    phonics: '/h/ as in Heart',
    themeColor: '#ff1744',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff80ab',
    introPrompt: "Feel the warmth in the Heart Room! Tap Big H!",
    bigDiscoveredPrompt: "Happy! Big H is shining! Can you find little h?",
    searchPrompt: "Search among the heart-shaped magic lockets!",
    foundSmallPrompt: "Heartfelt! You found little h!",
    successQuote: "Big H and little h share magic harmony!",
    props: [
      { id: 'prop_heart_box', name: 'Heart Box', emoji: '💝', bgGradient: 'linear-gradient(135deg, #ff4081, #d50000)', isPartnerHolder: true },
      { id: 'prop_hat', name: 'Wizard Hat', emoji: '🎩', bgGradient: 'linear-gradient(135deg, #7c4dff, #311b92)' }
    ]
  },
  {
    id: 'I',
    uppercase: 'I',
    lowercase: 'i',
    word: 'Ice Cream',
    wordEmoji: '🍦',
    phonics: '/aɪ/ as in Ice Cream',
    themeColor: '#00e5ff',
    accentColor: '#ff4081',
    bgRuneColor: '#b388ff',
    introPrompt: "A frosty sweet igloo! Tap Big I!",
    bigDiscoveredPrompt: "Incredible! Big I is chilling! Find little i!",
    searchPrompt: "Check under the sparkling ice snowflakes!",
    foundSmallPrompt: "Ice cold match! You found little i!",
    successQuote: "Big I and little i are illuminated together!",
    props: [
      { id: 'prop_ice', name: 'Snow Crystal', emoji: '❄️', bgGradient: 'linear-gradient(135deg, #84ffff, #00b0ff)', isPartnerHolder: true },
      { id: 'prop_island', name: 'Ice Island', emoji: '🏝️', bgGradient: 'linear-gradient(135deg, #b9f6ca, #00e676)' }
    ]
  },
  {
    id: 'J',
    uppercase: 'J',
    lowercase: 'j',
    word: 'Jellyfish',
    wordEmoji: '🪼',
    phonics: '/dʒ/ as in Jellyfish',
    themeColor: '#e040fb',
    accentColor: '#ffd21e',
    bgRuneColor: '#00e5ff',
    introPrompt: "Jump into the Jelly Lab! Tap Big J!",
    bigDiscoveredPrompt: "Joyful! Big J is dancing! Where is little j?",
    searchPrompt: "Search the bubbly jelly pots!",
    foundSmallPrompt: "Jubilant! You found little j!",
    successQuote: "Big J and little j make a joyful dance!",
    props: [
      { id: 'prop_jelly', name: 'Jelly Jar', emoji: '🫙', bgGradient: 'linear-gradient(135deg, #ff80ab, #c51162)', isPartnerHolder: true },
      { id: 'prop_juice', name: 'Magic Juice', emoji: '🧃', bgGradient: 'linear-gradient(135deg, #ffd740, #ff6d00)' }
    ]
  },
  {
    id: 'K',
    uppercase: 'K',
    lowercase: 'k',
    word: 'Kite',
    wordEmoji: '🪁',
    phonics: '/k/ as in Kite',
    themeColor: '#ff6d00',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "The sky is clear for flying! Tap Big K!",
    bigDiscoveredPrompt: "King of the skies! Big K is ready! Find little k!",
    searchPrompt: "Look inside the golden key boxes!",
    foundSmallPrompt: "Key discovery! You found little k!",
    successQuote: "Big K and little k soar into the clouds!",
    props: [
      { id: 'prop_key', name: 'Golden Key', emoji: '🗝️', bgGradient: 'linear-gradient(135deg, #ffd740, #ffab00)', isPartnerHolder: true },
      { id: 'prop_koala', name: 'Koala Toy', emoji: '🐨', bgGradient: 'linear-gradient(135deg, #cfd8dc, #90a4ae)' }
    ]
  },
  {
    id: 'L',
    uppercase: 'L',
    lowercase: 'l',
    word: 'Lion',
    wordEmoji: '🦁',
    phonics: '/l/ as in Lion',
    themeColor: '#ffd21e',
    accentColor: '#ff2d75',
    bgRuneColor: '#00e5ff',
    introPrompt: "Hear the magical roar! Tap Big L!",
    bigDiscoveredPrompt: "Luminous! Big L is shining! Find little l!",
    searchPrompt: "Check the glowing lantern boxes!",
    foundSmallPrompt: "Lovely! You found little l!",
    successQuote: "Big L and little l shine with love and light!",
    props: [
      { id: 'prop_lantern', name: 'Magic Lantern', emoji: '🏮', bgGradient: 'linear-gradient(135deg, #ff80ab, #d50000)', isPartnerHolder: true },
      { id: 'prop_lemon', name: 'Lemon', emoji: '🍋', bgGradient: 'linear-gradient(135deg, #ffff8d, #ffd600)' }
    ]
  },
  {
    id: 'M',
    uppercase: 'M',
    lowercase: 'm',
    word: 'Moon',
    wordEmoji: '🌙',
    phonics: '/m/ as in Moon',
    themeColor: '#7c4dff',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff80ab',
    introPrompt: "The Midnight Sky is sparkling! Tap Big M!",
    bigDiscoveredPrompt: "Magical! Big M is awake! Where is little m?",
    searchPrompt: "Search beneath the starry clouds!",
    foundSmallPrompt: "Magnificent! You found little m!",
    successQuote: "Big M and little m make the moon glow!",
    props: [
      { id: 'prop_moon_orb', name: 'Moon Orb', emoji: '🌕', bgGradient: 'linear-gradient(135deg, #ffff8d, #ffd600)', isPartnerHolder: true },
      { id: 'prop_music', name: 'Music Note', emoji: '🎵', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)' }
    ]
  },
  {
    id: 'N',
    uppercase: 'N',
    lowercase: 'n',
    word: 'Nest',
    wordEmoji: '🪺',
    phonics: '/n/ as in Nest',
    themeColor: '#00bfa5',
    accentColor: '#ffd21e',
    bgRuneColor: '#e040fb',
    introPrompt: "A cozy enchanted nest! Tap Big N!",
    bigDiscoveredPrompt: "Neat! Big N is ready! Find little n!",
    searchPrompt: "Look inside the golden bird houses!",
    foundSmallPrompt: "Noble discovery! You found little n!",
    successQuote: "Big N and little n are nest buddies!",
    props: [
      { id: 'prop_bird', name: 'Songbird', emoji: '🦜', bgGradient: 'linear-gradient(135deg, #b9f6ca, #00e676)', isPartnerHolder: true },
      { id: 'prop_necklace', name: 'Necklace', emoji: '📿', bgGradient: 'linear-gradient(135deg, #ffd740, #ffab00)' }
    ]
  },
  {
    id: 'O',
    uppercase: 'O',
    lowercase: 'o',
    word: 'Owl',
    wordEmoji: '🦉',
    phonics: '/ɒ/ as in Owl',
    themeColor: '#ff9100',
    accentColor: '#00e5ff',
    bgRuneColor: '#7c4dff',
    introPrompt: "Wise old magic tree! Tap Big O!",
    bigDiscoveredPrompt: "Outstanding! Big O is round and bright! Find little o!",
    searchPrompt: "Check inside the hollow orange tree!",
    foundSmallPrompt: "Oh wow! You found little o!",
    successQuote: "Big O and little o are one sweet pair!",
    props: [
      { id: 'prop_orange', name: 'Orange', emoji: '🍊', bgGradient: 'linear-gradient(135deg, #ffd740, #ff6d00)', isPartnerHolder: true },
      { id: 'prop_octopus', name: 'Octopus', emoji: '🐙', bgGradient: 'linear-gradient(135deg, #ff80ab, #f50057)' }
    ]
  },
  {
    id: 'P',
    uppercase: 'P',
    lowercase: 'p',
    word: 'Panda',
    wordEmoji: '🐼',
    phonics: '/p/ as in Panda',
    themeColor: '#ec407a',
    accentColor: '#00e676',
    bgRuneColor: '#ffd21e',
    introPrompt: "Playful Panda Bamboo Garden! Tap Big P!",
    bigDiscoveredPrompt: "Playful! Big P is bouncing! Can you find little p?",
    searchPrompt: "Look inside the treasure parcels!",
    foundSmallPrompt: "Perfect! You found little p!",
    successQuote: "Big P and little p are partner pals!",
    props: [
      { id: 'prop_present', name: 'Magic Parcel', emoji: '🎁', bgGradient: 'linear-gradient(135deg, #ff4081, #c51162)', isPartnerHolder: true },
      { id: 'prop_penguin', name: 'Penguin', emoji: '🐧', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)' }
    ]
  },
  {
    id: 'Q',
    uppercase: 'Q',
    lowercase: 'q',
    word: 'Queen',
    wordEmoji: '👑',
    phonics: '/kw/ as in Queen',
    themeColor: '#ab47bc',
    accentColor: '#ffd21e',
    bgRuneColor: '#00e5ff',
    introPrompt: "The Royal Palace is sparkling! Tap Big Q!",
    bigDiscoveredPrompt: "Quiet royalty! Big Q wears the crown! Find little q!",
    searchPrompt: "Search among the royal velvet pillows!",
    foundSmallPrompt: "Quick thinking! You found little q!",
    successQuote: "Big Q and little q rule the magic kingdom!",
    props: [
      { id: 'prop_crown', name: 'Royal Crown', emoji: '👑', bgGradient: 'linear-gradient(135deg, #ffd740, #ffab00)', isPartnerHolder: true },
      { id: 'prop_quill', name: 'Magic Quill', emoji: '🪶', bgGradient: 'linear-gradient(135deg, #ea80fc, #aa00ff)' }
    ]
  },
  {
    id: 'R',
    uppercase: 'R',
    lowercase: 'r',
    word: 'Rainbow',
    wordEmoji: '🌈',
    phonics: '/r/ as in Rainbow',
    themeColor: '#f06292',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "A rainbow bridge lights up! Tap Big R!",
    bigDiscoveredPrompt: "Radiant! Big R is glowing! Can you find little r?",
    searchPrompt: "Check at the end of the rainbow clouds!",
    foundSmallPrompt: "Remarkable! You found little r!",
    successQuote: "Big R and little r made a radiant rainbow!",
    props: [
      { id: 'prop_rainbow_gem', name: 'Rainbow Gem', emoji: '💎', bgGradient: 'linear-gradient(135deg, #ff80ab, #00e5ff)', isPartnerHolder: true },
      { id: 'prop_rocket', name: 'Toy Rocket', emoji: '🚀', bgGradient: 'linear-gradient(135deg, #ff5252, #d50000)' }
    ]
  },
  {
    id: 'S',
    uppercase: 'S',
    lowercase: 's',
    word: 'Sun',
    wordEmoji: '☀️',
    phonics: '/s/ as in Sun',
    themeColor: '#ffd600',
    accentColor: '#ff2d75',
    bgRuneColor: '#00e5ff',
    introPrompt: "Sunny sparkles everywhere! Tap Big S!",
    bigDiscoveredPrompt: "Super bright! Big S is beaming! Where is little s?",
    searchPrompt: "Search under the glowing starfish and suns!",
    foundSmallPrompt: "Sensational! You found little s!",
    successQuote: "Big S and little s shine like superstars!",
    props: [
      { id: 'prop_starfish', name: 'Starfish', emoji: '⭐', bgGradient: 'linear-gradient(135deg, #ffff8d, #ffd600)', isPartnerHolder: true },
      { id: 'prop_sunflower', name: 'Sunflower', emoji: '🌻', bgGradient: 'linear-gradient(135deg, #ffd740, #ff6d00)' }
    ]
  },
  {
    id: 'T',
    uppercase: 'T',
    lowercase: 't',
    word: 'Turtle',
    wordEmoji: '🐢',
    phonics: '/t/ as in Turtle',
    themeColor: '#26a69a',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff4081',
    introPrompt: "Welcome to the Turtle Grove! Tap Big T!",
    bigDiscoveredPrompt: "Terrific! Big T is ready! Find little t!",
    searchPrompt: "Look inside the enchanted treasure chests!",
    foundSmallPrompt: "Tremendous! You found little t!",
    successQuote: "Big T and little t are a true team!",
    props: [
      { id: 'prop_teapot', name: 'Magic Teapot', emoji: '🫖', bgGradient: 'linear-gradient(135deg, #80cbc4, #00897b)', isPartnerHolder: true },
      { id: 'prop_tree', name: 'Magic Tree', emoji: '🌳', bgGradient: 'linear-gradient(135deg, #b9f6ca, #00e676)' }
    ]
  },
  {
    id: 'U',
    uppercase: 'U',
    lowercase: 'u',
    word: 'Unicorn',
    wordEmoji: '🦄',
    phonics: '/juː/ as in Unicorn',
    themeColor: '#ba68c8',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "Unicorn magic fills the air! Tap Big U!",
    bigDiscoveredPrompt: "Unique! Big U is enchanting! Find little u!",
    searchPrompt: "Search under the magical rainbow umbrella!",
    foundSmallPrompt: "Unbelievable! You found little u!",
    successQuote: "Big U and little u unite with unicorn magic!",
    props: [
      { id: 'prop_umbrella', name: 'Magic Umbrella', emoji: '☂️', bgGradient: 'linear-gradient(135deg, #ea80fc, #aa00ff)', isPartnerHolder: true },
      { id: 'prop_horn', name: 'Magic Horn', emoji: '🪄', bgGradient: 'linear-gradient(135deg, #84ffff, #00e5ff)' }
    ]
  },
  {
    id: 'V',
    uppercase: 'V',
    lowercase: 'v',
    word: 'Violin',
    wordEmoji: '🎻',
    phonics: '/v/ as in Violin',
    themeColor: '#7e57c2',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff80ab',
    introPrompt: "Violin melodies are playing! Tap Big V!",
    bigDiscoveredPrompt: "Vibrant! Big V is humming with tune! Find little v!",
    searchPrompt: "Check inside the crystal flower vase!",
    foundSmallPrompt: "Very good! You found little v!",
    successQuote: "Big V and little v play the sweetest tune!",
    props: [
      { id: 'prop_vase', name: 'Crystal Vase', emoji: '🏺', bgGradient: 'linear-gradient(135deg, #b388ff, #651fff)', isPartnerHolder: true },
      { id: 'prop_van', name: 'Toy Van', emoji: '🚐', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)' }
    ]
  },
  {
    id: 'W',
    uppercase: 'W',
    lowercase: 'w',
    word: 'Whale',
    wordEmoji: '🐳',
    phonics: '/w/ as in Whale',
    themeColor: '#29b6f6',
    accentColor: '#ffd21e',
    bgRuneColor: '#00e676',
    introPrompt: "Water waves and ocean spray! Tap Big W!",
    bigDiscoveredPrompt: "Wonderful! Big W is splashing! Where is little w?",
    searchPrompt: "Search inside the magic water bubbles!",
    foundSmallPrompt: "Wow! You found little w!",
    successQuote: "Big W and little w make wondrous waves!",
    props: [
      { id: 'prop_water_flask', name: 'Water Flask', emoji: '💧', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)', isPartnerHolder: true },
      { id: 'prop_wand', name: 'Star Wand', emoji: '🪄', bgGradient: 'linear-gradient(135deg, #ffd740, #ffab00)' }
    ]
  },
  {
    id: 'X',
    uppercase: 'X',
    lowercase: 'x',
    word: 'Xylophone',
    wordEmoji: '🎼',
    phonics: '/ks/ as in Xylophone',
    themeColor: '#ff7043',
    accentColor: '#00e5ff',
    bgRuneColor: '#ffd21e',
    introPrompt: "Xylophone notes chime happily! Tap Big X!",
    bigDiscoveredPrompt: "Extraordinary! Big X is beaming! Find little x!",
    searchPrompt: "Look inside the treasure X-marks-the-spot box!",
    foundSmallPrompt: "Excellent! You found little x!",
    successQuote: "Big X and little x excite with energy!",
    props: [
      { id: 'prop_x_box', name: 'X-Treasure Chest', emoji: '📦', bgGradient: 'linear-gradient(135deg, #ff8a65, #d84315)', isPartnerHolder: true },
      { id: 'prop_xray', name: 'Crystal X-Ray', emoji: '✨', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)' }
    ]
  },
  {
    id: 'Y',
    uppercase: 'Y',
    lowercase: 'y',
    word: 'Yo-yo',
    wordEmoji: '🪀',
    phonics: '/j/ as in Yo-yo',
    themeColor: '#ffee58',
    accentColor: '#ff2d75',
    bgRuneColor: '#7c4dff',
    introPrompt: "Yo-yo spinning magic! Tap Big Y!",
    bigDiscoveredPrompt: "Yay! Big Y is bouncing high! Find little y!",
    searchPrompt: "Check inside the sunny yellow gift box!",
    foundSmallPrompt: "Yippee! You found little y!",
    successQuote: "Big Y and little y bounce with endless joy!",
    props: [
      { id: 'prop_yoyo_box', name: 'Yellow Gift Box', emoji: '🎁', bgGradient: 'linear-gradient(135deg, #ffff8d, #fbc02d)', isPartnerHolder: true },
      { id: 'prop_yacht', name: 'Toy Yacht', emoji: '⛵', bgGradient: 'linear-gradient(135deg, #80d8ff, #0091ea)' }
    ]
  },
  {
    id: 'Z',
    uppercase: 'Z',
    lowercase: 'z',
    word: 'Zebra',
    wordEmoji: '🦓',
    phonics: '/z/ as in Zebra',
    themeColor: '#26c6da',
    accentColor: '#ffd21e',
    bgRuneColor: '#ff4081',
    introPrompt: "Welcome to the Grand Finale Zebra Lab! Tap Big Z!",
    bigDiscoveredPrompt: "Zesty! Big Z is glowing with all 26 letters! Find little z!",
    searchPrompt: "Search inside the magical zigzag star jar!",
    foundSmallPrompt: "Zealous victory! You found little z!",
    successQuote: "Big Z and little z complete the entire Alphabet Magic Lab!",
    props: [
      { id: 'prop_zigzag_jar', name: 'Zigzag Magic Jar', emoji: '⚡', bgGradient: 'linear-gradient(135deg, #80deea, #00838f)', isPartnerHolder: true },
      { id: 'prop_zipper', name: 'Magic Bag', emoji: '👜', bgGradient: 'linear-gradient(135deg, #ff80ab, #c51162)' }
    ]
  }
];
