import { Bee } from './bee.js';
import { Flower } from './flower.js';
import { Hive } from './hive.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const pollenContainer = {
  capacity: 100,
  current: 0,
};

const hive = new Hive(canvas.width / 2, canvas.height / 2);
const flowers = [];
const bees = [];
const abilityTokens = [];

// Initialize game
function init() {
  for (let i = 0; i < 10; i++) {
    const size = 10 + Math.random() * 20;
    flowers.push(new Flower(Math.random() * (canvas.width - size), Math.random() * (canvas.height - size), size));
  }

  const startingBee = new Bee(hive.x, hive.y, beeSpecies[0]);
  bees.push(startingBee);

  update();
}

// Game loop
function update() {
  requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hive.draw();

  flowers.forEach((flower) => {
    flower.draw();
    flower.update();
  });

  bees.forEach((bee) => {
    bee.draw();
    bee.update();
  });

  abilityTokens.forEach((token) => {
    token.draw();
  });

  updateUI();
  updateAbilityTokens();
}

init();

// Event listeners
canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

canvas.addEventListener('click', (e) => {
  const clickedFlower = flowers.find((flower) => {
    const distance = Math.hypot(flower.x + flower.size / 2 - e.clientX, flower.y + flower.size / 2 - e.clientY);
    return distance < flower.size / 2;
  });

  if (clickedFlower) {
    console.log('Flower clicked!');
  }
});

function updateUI() {
  // Update UI elements
}

function updateAbilityTokens() {
  // Update ability tokens
}