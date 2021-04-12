import { drawBody, drawHands, drawBalls, setVariables } from './drawing.js';
import { Ball } from './ball.js';

const canvas = document.querySelector('canvas');

let WIDTH = 1000;
let HEIGHT = 1000;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');

let lastRenderTime = 0;
const fps = 24;
let framesPerThrow = 20;

let siteswap = '744';
let maxThrowNumber = 0;
let currentNumberIndex = 0;

const handsHeight = 120;
const handsDistance = 200; //The maximum distance between the hands and the middle of the screen
const handsOffsetX = 140; //how much hands move on the x axis while juggling
const handsOffsetY = 200; //how much hands move on the y axis while juggling

let handsAccelerationX, handsAccelerationY, handsMaxVy, gravity = 2;

let stepInCycle = 1; //1 to 20

let rightHand = {}, leftHand = {};

function start() {
  stepInCycle = 1;
  balls = [];

  maxThrowNumber = 0;

  for(let i = 0; i < siteswap.length; i++) {
    if(siteswap[i] > maxThrowNumber) {
      maxThrowNumber = siteswap[i];
    }
  }

  WIDTH = 1000;
  HEIGHT = 1000;
  gravity = 0.5;
  framesPerThrow = 40;

  if(maxThrowNumber <= 4) {
    HEIGHT = 600;
    WIDTH = 600;
    gravity = 1;
  }else if(maxThrowNumber <= 7) {
    WIDTH = 1050;
    HEIGHT = 1050;
  }else if(maxThrowNumber <= 9) {
    WIDTH = 1750;
    HEIGHT = 1750;
    framesPerThrow = 40;
    gravity = 0.5;
  }

  handsAccelerationX = (handsOffsetX) / ((framesPerThrow / 4) * (framesPerThrow / 4));
  handsAccelerationY = (handsOffsetY) / ((framesPerThrow / 4) * (framesPerThrow / 4));
  handsMaxVy = handsAccelerationY * (framesPerThrow / 4);

  leftHand = {
    x: (WIDTH / 2) + handsDistance - handsOffsetX, y: HEIGHT - handsHeight,
    dx: 0, dy: -handsMaxVy
  };

  rightHand = {
    x: (WIDTH / 2) - handsDistance, y: HEIGHT - handsHeight - handsMaxVy,
    dx: 0, dy: handsMaxVy
  };

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  setVariables(HEIGHT, WIDTH);
}

let balls = [];

function render(currentTime) {
  requestAnimationFrame(render);

  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
  if (secondsSinceLastRender < 1/fps) return;
  lastRenderTime = currentTime;

  updateHands();
  updateBalls();

  c.clearRect(0, 0, WIDTH, HEIGHT);

  drawBody(c);
  drawHands(c, rightHand, leftHand);
  drawBalls(c, balls);

  stepInCycle++;
  if(stepInCycle > framesPerThrow) stepInCycle = 1;
}

const siteswapForm = document.getElementById('siteswap-form');
const siteswapInput = document.getElementById('siteswap');

siteswapForm.addEventListener('submit', (e) => {
  e.preventDefault();

  siteswap = siteswapInput.value;
  start();

  requestAnimationFrame(render);
});

function updateHands() {

  leftHand.x += leftHand.dx;
  rightHand.x += rightHand.dx;

  leftHand.y += leftHand.dy;
  rightHand.y += rightHand.dy;

  if(stepInCycle <= framesPerThrow / 4) {
    rightHand.dx += handsAccelerationX;
    leftHand.dx += handsAccelerationX;
    rightHand.dy -= handsAccelerationY;
    leftHand.dy += handsAccelerationY;
  }else if(stepInCycle <= framesPerThrow / 2) {
    rightHand.dx -= handsAccelerationX;
    leftHand.dx -= handsAccelerationX;
    rightHand.dy -= handsAccelerationY;
    leftHand.dy += handsAccelerationY;
  }else if(stepInCycle <= framesPerThrow * 3 / 4) {
    rightHand.dx -= handsAccelerationX;
    leftHand.dx -= handsAccelerationX;
    rightHand.dy += handsAccelerationY;
    leftHand.dy -= handsAccelerationY;
  }else if(stepInCycle <= framesPerThrow) {
    rightHand.dx += handsAccelerationX;
    leftHand.dx += handsAccelerationX;
    rightHand.dy += handsAccelerationY;
    leftHand.dy -= handsAccelerationY;
  }
}

function updateBalls() {
  if(
    stepInCycle == 1 ||
    stepInCycle == (framesPerThrow / 2) + 1
  ) {
    currentNumberIndex++;

    if(currentNumberIndex >= siteswap.toString().length) {
      currentNumberIndex = 0;
    }

    balls = balls.filter(ball => ball.y <= HEIGHT - handsHeight);

    balls = balls.map(ball => {
      if(ball.y <= HEIGHT - handsHeight) {
        ball.release(gravity, framesPerThrow);
      }return ball;
    });
  }
  
  if(stepInCycle == 1) {
    balls.push(new Ball(
      rightHand.x, rightHand.y, 
      true, siteswap[currentNumberIndex]
    ));
  }else if(stepInCycle == (framesPerThrow / 2) + 1) {
    balls.push(new Ball(
      leftHand.x, leftHand.y,
      false, siteswap[currentNumberIndex]
    ));
  }

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].inHand) {
      balls[i].followHand(
        balls[i].isRightHand
          ? rightHand
          : leftHand
      );
    }else {
      balls[i].update(
        framesPerThrow,
        handsOffsetX,
        handsDistance,
        gravity,
        handsHeight
      );
    }
  }
}

window.onload = () => {
  start();
  render();
}