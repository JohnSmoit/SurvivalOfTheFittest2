class Prey {

  constructor(json) {
    this.maxHealth = 100;
    this.health = 100;
    this.isAlive = true;
    this.position = createVector(random(0, width), random(0, height));
    this.rotation = 0;
    this.velocity = createVector(0, 0);
    this.rotationSpeed = 0.08;
    this.moveSpeed = 2.0;
    this.width = 30;
    this.height = 30;
    this.deathTimer = 0;
    this.textsize = 1;
    this.numSensors = 8;
    this.sensorSize = 100;
    //add other stuff later
    this.init(json);
    this.movex = 0;
    this.movey = 0;
    //this.dead = false;
  }
  
  init(json) {
    for(var i in json){
      this[i] = json[i];
    }
  }
  die() {
    this.isAlive = false;
    
    // if (this.deathTimer < 180) {
    //   fill(this.deathTimer);
    //   strokeWeight(0);
    //   text('OOF', this.position.x, this.position.y)
    //   this.textsize += 0.5;
    //   textSize(this.textsize);
    //   this.deathTimer++;
    // }
    
    // else {
    //   this.isAlive = false;
    //   return true;
    // }
  }
  
  damage(damageTaken) {
    this.health -= damageTaken;
    if (this.health <= 0) {
      this.die();
      //this.dead = true;
    }
  }
  
  spinLeft() {
    this.rotation -= this.rotationSpeed;
  }
  
  spinRight() {
    this.rotation += this.rotationSpeed;
  }
  
  moveForwards() {
    this.position.x += this.moveSpeed * cos(this.rotation);
    this.position.y += this.moveSpeed * sin(this.rotation);
  }
  
  moveBackwards() {
    // this.velocity.x = -this.moveSpeed * cos(this.rotation);
    // this.velocity.y = -this.moveSpeed * sin(this.rotation);
    this.position.x += -this.moveSpeed * cos(this.rotation);
    this.position.y += -this.moveSpeed * sin(this.rotation);
    // print(this.rotation);
  }
  
  display(shouldShowSensors) {
    this.periodicBundaries();
    this.autoMove();
    if (this.health > 0) {
      fill(0, 0, 255);
      strokeWeight(3);
      //line(this.position.x, this.position.y, this.position.x + (20 * cos(this.rotation)), this.position.y + (20 * sin(this.rotation)));
      ellipse(this.position.x, this.position.y, this.width, this.height);
      fill (0, 150, 250);
      strokeWeight(0);
      ellipse(this.position.x - 3, this.position.y - 3, this.width / 2, this.height / 2);
      strokeWeight(1);
      if (shouldShowSensors) {
        this.showSensors();
      }
      this.setHealthBar();
    }
    
  }
  update() {
	this.position.x += this.movex * this.moveSpeed;
	this.position.y += this.movey * this.moveSpeed;
  }
  setHealthBar() {
    fill(0, 255, 0);
    strokeWeight(0);
    rect(this.position.x - this.width / 2, this.position.y + this.height / 1.5, this.health / this.width *10, this.height / 4);
  }
  manualMove(forwards, backwards, spinLeft, spinRight) {
    if (this.health > 0) {
      if (spinLeft) {
        this.spinLeft();
      }
      if (spinRight) {
        this.spinRight();
      }
      if (forwards) {
        this.moveForwards();
      }
      if (backwards) {
        this.moveBackwards();//movement is manually controlled by keyboard 4 nowz.
      }
      this.position.add(this.velocity);
      // this.velocity.x = 0;
      // this.velocity.y = 0;
    } 
  }
  
  
  autoMove() {
    this.position.x = this.position.x + random(-1,1);
    this.position.y = this.position.y + random(-1,1);
  }
  
  showSensors() {
    let sense = [];
    for (let i = 0; i < this.numSensors; i++) {
      sense.push(1);
    }
    for (let j = 0; j < sense.length; j++) {
      let x1 = this.position.x ;
      let y1 = this.position.y ;
      let x2 = x1 + Math.cos(Math.PI * 2 / this.numSensors * j) * this.sensorSize;
      let y2 = y1 + Math.sin(Math.PI * 2/ this.numSensors * j) * this.sensorSize;
      stroke(0, 200, 100);
      line(x1, y1, x2, y2);
      stroke(0, 0, 0);
      //print("(" + x1 + ", " + y1 + ")" + " to (" + x2 + ", " + y2 + ")");
      
    }
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
  
  getSensorDistances(predators) {
    let sensors = [];
    for (let i = 0; i < this.numSensors; i++) {
      sensors.push(1);
    }
    // print(sensors);
    // for (let i in predators) {
    for (let i = 0; i < predators.length; i++) {
      let distance_xSD = pow(predators[i].position.x + predators[i].width/2 - this.position.x + this.width/2, 2);
      let distance_ySD = pow(predators[i].position.y + predators[i].height/2 - this.position.y + this.height/2, 2);
      let distance = sqrt( distance_xSD + distance_ySD );
      if (distance <= this.sensorSize) {
        for (let j = 0; j < this.numSensors; j++) {
          let x1 = this.position.x;
          let y1 = this.position.y;
    	  let x2 = x1 + cos(PI * 2 / this.numSensors * j + this.rotation) * this.sensorSize;
    	  let y2 = y1 + sin(PI * 2 / this.numSensors * j + this.rotation) * this.sensorSize;
          // Get boundaries of the current asteroid
    	  let objx = predators[i].position.x + predators[i].width/2;
    	  let objy = predators[i].position.y + predators[i].height/2;
          
          if(abs(atan2(objy - y1, objx - x1) - atan2(y2 - y1, x2 - x1)) <= PI * 2 / this.numSensors){
    	    let d = collisionSegmentAABB(x1, y1, x2, y2, predators[i].position.x, predators[i].position.y, predators[i].width, predators[i].height);
            if(d/this.sensorSize < sensors[j]){ // If distance is less than sensor distance
    		  sensors[j] = d/this.sensorSize; // Update sensor size
              // print("[DANGER]: Prey: " +str(i) + " Sensor: " + str(j) +  " Overlap: " + str(round((d/this.sensorSize)*100))/100 + "%")
    		}
          }
        }
      }
    }
  // print(sensors);
  return sensors;
  }

}

// compute collision on specific segments
var collisionSegments = function(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
    let denominator = ((l2y2 - l2y1) * (l1x2 - l1x1)) - ((l2x2 - l2x1) * (l1y2 - l1y1));
    if (denominator == 0) {
        return false;
    }
    let a = l1y1 - l2y1;
    let b = l1x1 - l2x1;
    let numerator1 = ((l2x2 - l2x1) * a) - ((l2y2 - l2y1) * b);
    let numerator2 = ((l1x2 - l1x1) * a) - ((l1y2 - l1y1) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    let x = l1x1 + (a * (l1x2 - l1x1));
    let y = l1y1 + (a * (l1y2 - l1y1));
    if (a > 0 && a < 1 && b > 0 && b < 1) {
        return Math.sqrt(Math.pow(x - l1x1, 2) + Math.pow(y - l1y1, 2));
    }
    return false;
};
// check where collision happens along segment using AABB bounding box method
var collisionSegmentAABB = function(x1, y1, x2, y2, ax, ay, aw, ah){
    let distance = 999999;
    let d = [];
    d.push(collisionSegments(x1, y1, x2, y2, ax, ay, ax + aw, ay));
    d.push(collisionSegments(x1, y1, x2, y2, ax, ay, ax, ay + ah));
    d.push(collisionSegments(x1, y1, x2, y2, ax + aw, ay,  ax + aw, ay + ah));
    d.push(collisionSegments(x1, y1, x2, y2, ax, ay + ah,  ax + aw, ay + ah));

    for(var i in d){
        if(d[i] !== false && d[i] < distance){
            distance = d[i];
        }
    }

    return distance;
}
