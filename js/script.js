import { update as updateBalls, draw as drawBalls } from "./balls.js";
import { update as updateHands, draw as drawHands } from "./hands.js";

let board = document.getElementById('board');
let lastRenderTime = 0;
let fps = 10;

function main(currentTime) {
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;

  if(secondsSinceLastRender < 1/fps) return;
  lastRenderTime = currentTime;

  update();
  draw();
}

function update() {
  updateBalls();
  updateHands();
}

function draw() {
  drawBalls();
  drawHands();
}

window.requestAnimationFrame(main);