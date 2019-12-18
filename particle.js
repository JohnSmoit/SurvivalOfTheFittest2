class particle {
  constructor(x, y, velocity, color, randomFloaty, sizeMultiplier) {
    this.position = createVector(x + random(0, 12), y + random(0, 12));
    this.color = color;
    this.direction = random(0, 360);
    this.timeLeft = random(10, 50);
    this.velocity = velocity;
    this.isAlive = true;
    this.randomFloaty = randomFloaty;
    this.sizeMultiplier = sizeMultiplier;
    //this.gradient = random(-50, 50); // unused
  }
  move() {
    this.position.x += this.velocity * cos(this.direction);
    this.position.y += this.velocity * sin(this.direction);
    if (this.randomFloaty) {
      this.position.add(random(-5, 5), random(-5, 5));
    }
  }
  display() {
    strokeWeight(0);
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.position.x, this.position.y, (this.timeLeft / 1.5) * this.sizeMultiplier, (this.timeLeft / 1.5) * this.sizeMultiplier);
  }
  update() {
    if (this.timeLeft > 0) {
      this.move()
      this.display();
      this.timeLeft--;
    } else {
      this.isAlive = false;
    }
  }
}