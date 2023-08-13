// JS GAME SKELETON

// CANVAS SETUP
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 520;

// GLOBAL VARIABLES -> Ignore 
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "#333",
  speed: 0,
};
let total = 0;
let score = 0;

// HTML Elements
let scoreDisplay = document.getElementById("score");

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
    startScreen();
  } else if (state === "running") {
    gameLogic();
    gameScreen();
    drawNewSquare();
    return;
  } else if (state === "gameover") {
    gameOver();
  }

  // REDRAW
  requestAnimationFrame(draw);
}

// EVENT STUFF

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  }
}

// EVENT STUFF

// Target click event
cnv.addEventListener("click", targetClickHandler);

function targetClickHandler() {
  console.log("running targetClickHandler");

  // Create random coordinates for the square
    let targetWidth = randomInt(20, 50);
    let targetHeight = randomInt(20, 50);
    let targetX = randomInt(0, cnv.width - targetWidth);
    let targetY = randomInt(0, cnv.height - targetHeight);
    console.log(targetX, targetY, targetHeight, targetWidth);

  // Call function to draw target
    drawNewSquare(targetX, targetY, targetHeight, targetWidth);

  // Call function to update score
    checkHits(targetX, targetY, targetHeight, targetWidth);


}

function drawNewSquare(targetX, targetY, targetHeight, targetWidth) {
  // Draw a target
  ctx.fillStyle = "red";
  ctx.fillRect(targetX, targetY, targetHeight, targetWidth);
}

function checkHits(targetX, targetY, targetHeight, targetWidth) {
  if (targetX <= mouseX && targetX + targetWidth >= mouseX && targetY <= mouseY && targetY + targetHeight >= mouseY) {
    console.log("target hit");
  } else {
    console.log("target miss");
    console.log(mouseX,mouseY)
    console.log(targetX,targetY)
  }

// function checkHits(targetX, targetY, targetHeight, targetWidth) {
//   if ((targetX <= mouseX <= (targetX + targetWidth)) && (targetY <= mouseY <= (targetY + targetHeight))) {
//     console.log("target hit");
//   } else 
//     console.log("target miss");

  // Update total
  total = total + 1;
  
  // Update display for both score and total
  scoreDisplay.innerHTML = score + " / " + total;
}