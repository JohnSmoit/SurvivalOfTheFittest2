class explosion {
  constructor(color, particleCount, force, x, y) {
    this.numAlive = particleCount;
    this.size = 38;
    this.color = color; //array with rgb value
    this.particles = [];
    this.position = createVector(x, y);
    this.isAlive = true;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new particle(this.position.x, this.position.y, force, this.color));
    }
  }
  update() {
    fill(floor(this.size));
    //ellipse(this.position.x + random(0, 10), this.position.y + random(0, 10), this.size, this.size);
    this.size += 0.4;
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].isAlive) {
        this.particles[i].update();
      }
      else {
        this.particles.splice(i, 1);
        this.numAlive--;
      }
      if (this.numAlive === 0) {
        this.isAlive = false
      }
    }
  }
}