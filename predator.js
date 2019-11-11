class Predator {
  
  constructor() {
    
    this.health = 1000;
    this.isAlive = true;
    this.damage = 1;
    this.moveSpeed = random(1,3);
    this.rotationSpeed = 0.06;
    this.position = createVector(random(0,width), random(0,height));
    this.velocity = createVector(0, 0);
    this.rotation = 0;
    this.height = 50;
    this.width = 50;
    this.range = 200;
  }
  move(targets) { // follows the closest target based on the shortest distance between prey in the array.
    let distance;
    let closest = this.range + 1;
    for (let i = 0; i < targets.length; i++) {
      distance = dist(this.position.x, this.position.y, targets[i].position.x, targets[i].position.y);
      if (distance < this.range) {
        if (distance < closest && targets[i].deathTimer < 1) {
          closest = distance;
          this.rotation = atan2(targets[i].position.y - this.position.y, targets[i].position.x - this.position.x);
          // this.velocity.x = this.moveSpeed * 
          // gets the closest and rotates toward it on the go.
          //this.rotation = sqrt((pow(targets[i].position.x, 2)) + (pow(targets[i].position.y, 2)));
        }
      }
    }
    this.velocity.x = this.moveSpeed * cos(this.rotation);
    this.velocity.y = this.moveSpeed * sin(this.rotation);
    this.position.add(this.velocity);
  }
  display() {
    fill(255, 0, 0);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.width, this.height);
  }
  
  update(targets) {
    this.move(targets);
    this.display();
    this.periodicBundaries();
  }
  
  periodicBundaries() {
    let x_radius = floor(this.width/2);
    let y_radius = floor(this.height/2);
    // Check if at boundary
    if (this.position.x + x_radius < 0) {
      // push to right side
      this.position.x = x_radius + width;
    }
    else if (this.position.x - x_radius > width) {
      // push to left side
      this.position.x = - x_radius ;
    }
    if (this.position.y + y_radius < 0) {
      // push to bottom
      this.position.y = y_radius + height;
    }
    else if (this.position.y - y_radius > height) {
      // push to top
      this.position.y = - y_radius
    }
  }
  
}