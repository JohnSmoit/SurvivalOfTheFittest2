class StatBoard {
  constructor(x, y, scale, maxAlive) {
    this.maxAlive = maxAlive;
    this.numAlive = 0;
    this.highScore = 0;
    this.generationCount = 0;
    this.position = createVector(x, y);
    this.scale = scale;
    
    this.sprite = loadImage("StatBoard.png")
  }
  setScoreValues (alive, score) {
    this.numAlive = alive;
    this.highScore = score;
  }
  getGenerationNumber(generation) {
    this.generationCount = generation;
  }
  display() {
    scale(this.scale)
    image(this.sprite, this.position.x, this.position.y);
    scale(1);
    text("Alive: " + this.numAlive + "/" + this.maxAlive, this.position.x + 20, this.position.y + 20);
    text("Highscore: " + this.highScore, this.position.x + 10, this.position.y + 35);
  }
  update(alives, highscore) {
    this.setScoreValues(alives, highscore);
    this.display();
  }
}