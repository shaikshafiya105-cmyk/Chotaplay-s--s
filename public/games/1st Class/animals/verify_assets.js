const fs = require('fs');
const path = require('path');

console.log("=== 1. Validating Character Assets ===");
const characters = [
  'girl-removebg-preview.png',
  'boy-removebg-preview.png',
  'star-removebg-preview.png'
];

let charErrors = 0;
characters.forEach(charFile => {
  if (fs.existsSync(charFile)) {
    console.log(`  [OK] Character found: ${charFile}`);
  } else {
    console.error(`  [FAIL] Missing character: ${charFile}`);
    charErrors++;
  }
});

console.log("\n=== 2. Validating Animal Puzzle Dataset ===");
// Target 31 animals
const PUZZLE_DATA = [
  { word: "CAT", displayName: "Cat", image: "assets/animals/cat.webp" },
  { word: "COW", displayName: "Cow", image: "assets/animals/cow.webp" },
  { word: "PIG", displayName: "Pig", image: "assets/animals/pig.webp" },
  { word: "FOX", displayName: "Fox", image: "assets/animals/fox.webp" },
  { word: "DOG", displayName: "Dog", image: "assets/animals/german shepherd.webp" },
  { word: "LION", displayName: "Lion", image: "assets/animals/lion.webp" },
  { word: "BEAR", displayName: "Bear", image: "assets/animals/bear.webp" },
  { word: "DEER", displayName: "Deer", image: "assets/animals/deer.webp" },
  { word: "DUCK", displayName: "Duck", image: "assets/animals/duck.webp" },
  { word: "FISH", displayName: "Fish", image: "assets/animals/fish.webp" },
  { word: "GOAT", displayName: "Goat", image: "assets/animals/goat.webp" },
  { word: "WOLF", displayName: "Wolf", image: "assets/animals/wolf.webp" },
  { word: "CAMEL", displayName: "Camel", image: "assets/animals/camel.webp" },
  { word: "HORSE", displayName: "Horse", image: "assets/animals/horse.webp" },
  { word: "HIPPO", displayName: "Hippo", image: "assets/animals/hippo.webp" },
  { word: "PANDA", displayName: "Panda", image: "assets/animals/panda.webp" },
  { word: "SHEEP", displayName: "Sheep", image: "assets/animals/sheep.webp" },
  { word: "SNAKE", displayName: "Snake", image: "assets/animals/snake.webp" },
  { word: "TIGER", displayName: "Tiger", image: "assets/animals/tiger.webp" },
  { word: "ZEBRA", displayName: "Zebra", image: "assets/animals/zebra.webp" },
  { word: "MONKEY", displayName: "Monkey", image: "assets/animals/monkey.webp" },
  { word: "RABBIT", displayName: "Rabbit", image: "assets/animals/rabbit.webp" },
  { word: "TURTLE", displayName: "Turtle", image: "assets/animals/turtle.webp" },
  { word: "GORILLA", displayName: "Gorilla", image: "assets/animals/gorilla.webp" },
  { word: "GIRAFFE", displayName: "Giraffe", image: "assets/animals/giraffe.webp" },
  { word: "CHEETAH", displayName: "Cheetah", image: "assets/animals/cheetah.webp" },
  { word: "ELEPHANT", displayName: "Elephant", image: "assets/animals/elephant.webp" },
  { word: "KANGAROO", displayName: "Kangaroo", image: "assets/animals/kangaroo.webp" },
  { word: "MONGOOSE", displayName: "Mongoose", image: "assets/animals/mongoose.webp" },
  { word: "CROCODILE", displayName: "Crocodile", image: "assets/animals/rocodile.webp" },
  { word: "CHIMPANZEE", displayName: "Chimpanzee", image: "assets/animals/chimpanzee.webp" }
];

let imageErrors = 0;
PUZZLE_DATA.forEach((p, idx) => {
  const exists = fs.existsSync(p.image);
  if (exists) {
    console.log(`  [OK] #${idx + 1} ${p.word} (${p.displayName}) -> ${p.image}`);
  } else {
    console.error(`  [FAIL] #${idx + 1} NOT FOUND: ${p.word} -> ${p.image}`);
    imageErrors++;
  }
});

console.log("\n========================================");
console.log(`Total Puzzles: ${PUZZLE_DATA.length}`);
console.log(`Character Errors: ${charErrors}`);
console.log(`Animal Image Errors: ${imageErrors}`);
if (charErrors === 0 && imageErrors === 0) {
  console.log(`>>> 100% ASSETS VERIFIED AND READY! <<<`);
} else {
  console.error(`>>> ASSET VERIFICATION FAILED! <<<`);
  process.exit(1);
}
console.log("========================================");
