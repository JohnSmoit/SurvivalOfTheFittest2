class StatBoard {
  constructor(x, y, scale, maxAlive) {
    this.maxAlive = maxAlive;
    this.numAlive = 0;
    this.score = 0;
    this.highScore = 0;
    this.generationCount = 0;
    this.position = createVector(x, y);
    this.scale = scale;
    this.highScoreUpdate = 0;
    this.shouldHighScoreUpdate = false; //prob a better way to do this but im lazy.
    
    this.sprite = loadImage("StatBoard.png")
    textSize(12);
  }
  setScoreValues (alive, score) {
    this.numAlive = alive;
    this.score = score;
  }
  getGenerationNumber(generation) {
    this.generationCount = generation;
  }
  getHighScore(score) {
    if (score > this.highScore) {
      this.highScore = score;
      this.shouldHighScoreUpdate = true;
    }
  }
  display() {
    scale(this.scale);
    image(this.sprite, this.position.x, this.position.y);
    scale(1);
    fill (230, 0, 0);
    text("Alive: " + this.numAlive + "/" + this.maxAlive, this.position.x + 10, this.position.y + 16);
    text("Score: " + this.score, this.position.x + 10, this.position.y + 28);
    if (this.shouldHighScoreUpdate) {
      if (this.highScoreUpdate % 10 > 5) {
        fill(0, 255, 0);
      }
      else {
        fill(230, 0, 0);
      }
      if (this.highScoreUpdate <= 200) {
        this.highScoreUpdate++;
      }
      else {
        this.shouldHighScoreUpdate = false;
        this.highScoreUpdate = 0;
      }
    }
    text("High Score: " + this.highScore, this.position.x + 10, this.position.y + 40);
  }
  update(alives, highscore) {
    this.setScoreValues(alives, highscore);
    this.display();
  }
}