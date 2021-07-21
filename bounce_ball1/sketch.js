let radius = 20;
let rectX = 5; // pad's X cor
let rectY = 10; // pad's Y cor
let balls = [];
let counter = 0; // number of times bounced over the pad
let score = 0;
let added = false; // weather if added the ball when we are supposed to
let losted = false;
let inIntro = true; // weather if passe intro part


function setup() {
  createCanvas(600, 400);
  background("black");
}

function intro() {
  background("black");
  fill("white");
  textSize(18);
  text("Welcome to Haozhe Yang's Pong Game! Here are the rules:", 30, 100);
  text("   1. You lose when you did not catch a ball with the red pad.", 30, 125);
  text("   2. When your red pad gets balls three times a new ball will spawn.", 30, 150);
  text("   3. When a ball was bounced back five times, it will turn green.", 30, 175);
  text("   4. You can click on a green ball to destroy it.", 30, 200);
  text("   5. You can press the up arrow and down arrow to move the red pad", 30, 225);
  text("   6. You can gain 1 point when you bounce back a ball", 30, 250);
  text("   7. You can gain 5 points destroying a green ball", 30, 275);

  text("Please press enter to start the game. Good Luck :)", 130, 350);

  if (keyIsDown(13)) inIntro = false;
}

function display_balls() {
  for (i = 0; i < balls.length; i++) {
    // display
    if (balls[i][4] >= 5) fill("green");
    else fill("yellow");
    circle(balls[i][0], balls[i][1], 2 * radius);

    // move the balls
    balls[i][0] += balls[i][2];
    balls[i][1] += balls[i][3];

    // check if it bounces over walls
    if (balls[i][0] + radius >= width) balls[i][2] = -balls[i][2];
    if (balls[i][1] + radius >= height) balls[i][3] = -balls[i][3];
    if (balls[i][1] - radius <= 0) balls[i][3] = -balls[i][3];

    // check if bouces over pad
    if (rectX + width / 30 >= balls[i][0] - radius) {
      if (balls[i][1] < rectY) losted = true;
      else if (balls[i][1] > rectY + height / 5) losted = true;
      else {
        score++;
        counter++;
        balls[i][2] = -balls[i][2];
        balls[i][4]++;
      }
    }
  }
}

function display_pad() {
  fill("red");
  rect(rectX, rectY, width/30, height/5);

  // control the rectangle
  if (keyIsDown(UP_ARROW) && rectY >= 5) rectY -= 5;
  if (keyIsDown(DOWN_ARROW) && rectY + height / 5 <= height - 5) rectY += 5;
}

function display_score() {
  fill("white");
  textSize(20);
  text("Your score is " + score, 400, 30);

  // add a ball or not
  if (counter % 3 === 0 && !added) {
    ballX = Math.floor(Math.random() * (width - 2 * radius)) + radius;
    ballY = Math.floor(Math.random() * (height - 50 - 2 * radius)) + radius + 50;
    Xspeed = Math.floor(Math.random() * 3) + 1;
    Yspeed = Math.floor(Math.random() * 7) -3;
    balls.push([ballX, ballY, Xspeed, Yspeed, 0]);
    added = true;
  } else if (counter % 3 !== 0) added = false;
}

function draw() {
  if (inIntro) intro();
  else {
    background("black");
    if (!losted) {
      display_balls();
      display_pad();
      display_score();

      // mouse to destroy ball
      if (mouseIsPressed) {
        for (i = 0; i < balls.length; i++) {
          let length = Math.sqrt(pow(mouseX - balls[i][0], 2) + pow(mouseY - balls[i][1], 2));
          if (length < radius && balls[i][4] >= 5) {
            balls.splice(i, 1);
            score += 5;
          }
        }
      }
    } else {
      fill("white");
      textSize(48);
      text("You lost!", 200, 180);
      text("Your score was " + score, 130, 230);
      noLoop();
    }
  }
}