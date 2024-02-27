let fishImg;
let sharkImg;
let backgroundImg;
let allSprites = [];

function preload() {
  fishImg = loadImage('../img/fishnew.png');
  sharkImg = loadImage('../img/sharknew.png');
  backgroundImg = loadImage('../img/oceanfloor.png');
}

function setup() {
  createCanvas(800, 800);
  backgroundImg.resize(width, height);
}

function draw() {
  background(0);
  image(backgroundImg, 0, 0);

  for (let i = allSprites.length - 1; i >= 0; i--) {
    let sprite = allSprites[i];
    sprite.update();
    sprite.display();
    if (sprite.lifespan <= 0) {
      allSprites.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === 83) { // S key
    spawnShark();
  } else if (keyCode === 70) { // F key
    spawnFish();
  } else if (keyCode === 48) { // 0 key
    allSprites = [];
  }
}

function spawnFish() {
  let x = random(0, width - 101);
  let y = random(0, height - 101);
  allSprites.push(new Fish(x, y));
}

function spawnShark() {
  let x = random(0, width - 251);
  let y = random(0, height - 251);
  allSprites.push(new Shark(x, y));
}

class Fish {
  constructor(x, y) {
    this.img = fishImg.get();
    let scaleVar = random(50, 100);
    this.img.resize(scaleVar, scaleVar);
    this.x = x;
    this.y = y;
    this.velocity = random(1, 2);
    this.direction = random(['left', 'up', 'down']);
    this.lifespan = random(750, 1500);
  }

  update() {
    switch (this.direction) {
      case 'right':
        this.x += this.velocity;
        break;
      case 'left':
        this.x -= this.velocity;
        break;
      case 'up':
        this.y -= this.velocity;
        break;
      case 'down':
        this.y += this.velocity;
        break;
    }

    if (this.x >= width || this.x <= 0) {
      this.direction = this.direction === 'left' ? 'right' : 'left';
    }
    if (this.y >= height || this.y <= 0) {
      this.direction = this.direction === 'down' ? 'up' : 'down';
    }

    this.lifespan--;
  }

  display() {
    image(this.img, this.x, this.y);
  }
}

class Shark extends Fish {
  constructor(x, y) {
    super(x, y);
    this.img = sharkImg.get();
    let scaleVar = random(150, 250);
    this.img.resize(scaleVar, scaleVar / 2);
  }
}

