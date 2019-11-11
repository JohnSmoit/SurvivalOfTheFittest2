let preys = [];
let scoreBoard;
let predators = [];
let explosions = [];
let up = false;
let down = false;
let turnLeft = false;
let turnRight = false;
let numPrey = 16;
let numPredators = 4;
var Neuvol;

let numSensors = 6;

class Game {
  constructor() {
    this.asteroids = [];
    this.ships = [];

    this.score = 0;
    this.scoreBoard = new StatBoard(0, 0, 3, numPrey)
    // this.canvas = document.querySelector("#SurvivalOfTheFittest");
    // this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.runSpeed = 1;

    this.spawnInterval = 120;
    this.interval = 0;
    this.maxPredators = 2;

    this.gen = [];
    this.alives = 0;
    this.generation = 0;
  }
  
  start() {
    this.interval = 0;
    this.score = 0;
    predators = [];
    preys = [];

    // print(this.gen)
    for(let i=0; i < numPrey; i++ ){
        let p = new Prey();
        preys.push(p);
    }

    this.generation++;
    this.alives = preys.length;
    
    for(let i=0; i < numPredators; i++ ){
        let pd = new Predator();
        predators.push(pd);
    }
    this.gen = Neuvol.nextGeneration();
    //print("HIa");
  }
  
  display() {
    for (let i = 0; i < predators.length; i++) {
      predators[i].display();
    }
    for (let i = 0; i < preys.length; i++) {
      preys[i].display();
    // preys[i].manualMove(up, down, turnLeft, turnRight);
    // preys[i].getSensorDistances(predators);
    }
    for (let i = 0; i < predators.length; i++) {
      predators[i].update(preys);

      for (let j = 0; j < preys.length; j++) {
        let hit = collisionDetect(predators[i], preys[j]);
        if (hit) {
          preys[j].damage(predators[i].damage);
        }
        if (!(preys[j].isAlive)) {
          //print( "prey " + j + " is dead");
          let kaboom = new explosion([0, 100, 200], 15, 1,  preys[j].position.x, preys[j].position.y, 45);
          explosions.push(kaboom);
          preys.splice(j, 1);
          //print(preys.length)
        }
      }
    }
    this.scoreBoard.update(this.alives, this.score);
  }
  isItEnd() {
    // check if any ship is still alive
    // for(let i = 0; i < preys.length; i++) {
    //   print(preys[i].isAlive)
    //   if(preys[i].isAlive){
    //     return false;
    //   }
    //   if(preys.length != 0) {
    //    return false; 
    //   }
    // }
    if (this.alives > 0) {
      print(this.alives);
      return false;
    }
    else {
      return true;
    }
    
  }

  update() {
//     // start moved display
//     for (let i = 0; i < predators.length; i++) {
//       predators[i].display();
//     }
//     for (let i = 0; i < preys.length; i++) {
//       preys[i].display();
//     // preys[i].manualMove(up, down, turnLeft, turnRight);
//     // preys[i].getSensorDistances(predators);
//     }
//     for (let i = 0; i < predators.length; i++) {
//       predators[i].update(preys);

//       for (let j = 0; j < preys.length; j++) {
//         let hit = collisionDetect(predators[i], preys[j]);
//         if (hit) {
//           preys[j].damage(predators[i].damage);
//         }
//         if (!(preys[j].isAlive)) {
//           print( "prey " + j + " is dead");
//           preys.splice(j, 1);
//           print(preys.length)
//         }
//       }
//     }
//     // end moved display
    
    for (let i = 0; i < predators.length; i++) {
      predators[i].update(preys);
    }
    for(let i = 0;i < explosions.length; i++) {
      explosions[i].update();
      if (!(explosions[i].isAlive)) {
        explosions.splice(i, 1);
      }
    }
   	for(let i = 0; i < preys.length; i++){ // Do for every ship
		if(preys[i].isAlive){ // Check if prey is dead
			var inputs = preys[i].getSensorDistances(predators); // load inputs from sensors
			var res = this.gen[i].compute(inputs); // compute result?
			preys[i].movex = 0;// initialize the ship movement in x dir
			preys[i].movey = 0;// initialize the ship movement in y dir

			if(res[0] > 0.65){// move right
                // Change to make the prey move right
				preys[i].movex++;
			}
			if(res[0] < 0.45){// move left
                // Change to make the prey move right
				preys[i].movex--;
			}
			if(res[1] > 0.65){// move up ( or down? )
				preys[i].movey++;
			}
			if(res[1] < 0.45){// move down ( or up? )
				preys[i].movey--;
			}
            // Update all preys
			preys[i].update();
            // Check if any preys have died
            if(preys.length < this.alives){
              // Update the dead ship's alive attribute 
	          //preys[i].isAlive = false;
              // Lower the number of alives
              // Update this generation with the score
	          Neuvol.networkScore(this.gen[i], this.score);
              // Check if we need to update the loop
	        }
		}
	}
    this.alives = preys.length
    if (this.isItEnd()) {
      this.start();
    }
  }
}

function setup() {
  frameRate(60);
  createCanvas(800, 800);
  Neuvol = new Neuroevolution({
			population:numPrey,
			network:[numSensors, [9], 2],
			randomBehaviour:0.1,
			mutationRate:0.5, 
			mutationRange:2, 
		});
		game = new Game();
		game.start();
		if (frameRate == 0) {
			setZeroTimeout(function() {
				game.update();
			});
		}
		else {
			setTimeout(function(){
				game.update();
			}, 1000/frameRate);
		}
}



function draw() {
  background(90, 89, 90);
  game.update();
  game.display();
}

function keyTyped() {
  if (key === 'w') {
    up = true;
    game.start();
  }  
  if (key === 'a') {
    turnLeft = true;
  }
    if (key === 's') {
    down = true;
  }
    if (key === 'd') {
    turnRight = true;
  }
}
function keyReleased() {
  if (key === 'w') {
    up = false;
  }  
  if (key === 'a') {
    turnLeft = false;
  }
    if (key === 's') {
    down = false;
  }
    if (key === 'd') {
    turnRight = false;
  }
}

var speed = function(fps){
    FPS = parseInt(fps);
}

let collisionDetect = function(obj1, obj2) {
  if (!(obj1.position.x > obj2.position.x + obj2.width || obj1.position.x + obj1.width < obj2.position.x || obj1.position.y > obj2.position.y + obj2.height || obj1.position.y + obj1.height < obj2.position.y)) {
    return true
  }
  return false
}