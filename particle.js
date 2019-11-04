class particle {
  constructor(x, y, velocity, color) {
    this.position = createVector(x + random(0, 12), y + random(0, 12));
    this.color = color;
    this.direction = random(0, 360);
    this.timeLeft = random(10, 50);
    this.velocity = velocity;
    this.isAlive = true;
    //this.gradient = random(-50, 50); // unused
  }
  move() {
    this.position.x += this.velocity * cos(this.direction);
    this.position.y += this.velocity * sin(this.direction);
    this.position.add(random(-5, 5), random(-5, 5));
  }
  display() {
    strokeWeight(0);
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse (this.position.x, this.position.y, this.timeLeft / 1.5, this.timeLeft / 1.5);
  }
  update() {
    if (this.timeLeft > 0) {
      this.move()
      this.display();
      this.timeLeft--;
    }
    else {
      this.isAlive = false;
    }
  }
}