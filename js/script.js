import { drawBody, drawHands, drawBalls } from './drawing.js';
import { Ball } from './ball.js';

const canvas = document.querySelector('canvas');

const WIDTH = 1000;
const HEIGHT = 1000;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');

let lastRenderTime = 0;
const fps = 25;
// const period = 2; //number of seconds for a full throw
const framesPerThrow = 20;

let playing = false;
let siteswap;
let currentNumberIndex = 0;

const gravity = 2;

const handsHeight = 120;
const handsDistance = 200; //The maximum distance between the hands and the middle of the screen
const handsOffsetX = 140; //how much hands move on the x axis while juggling
const handsOffsetY = 100; //how much hands move on the y axis while juggling
const handsAccelerationX = (handsOffsetX) / ((framesPerThrow / 4) * (framesPerThrow / 4));
const handsAccelerationY = (handsOffsetY) / ((framesPerThrow / 4) * (framesPerThrow / 4));
const handsMaxVy = handsAccelerationY * (framesPerThrow / 4);

let stepInCycle = 1; //1 to 20

let rightHand = {
  x: (WIDTH / 2) - handsDistance, y: HEIGHT - handsHeight - handsMaxVy,
  dx: 0, dy: handsMaxVy
};

let leftHand = {
  x: (WIDTH / 2) + handsDistance - handsOffsetX, y: HEIGHT - handsHeight,
  dx: 0, dy: -handsMaxVy
};

let balls = [];

function render(currentTime) {
  if(!playing) return;
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
  if(stepInCycle > 20) stepInCycle = 1;
}

const siteswapForm = document.getElementById('siteswap-form');
const siteswapInput = document.getElementById('siteswap');

siteswapForm.addEventListener('submit', (e) => {
  e.preventDefault();

  siteswap = siteswapInput.value;
  playing = true;

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
  console.log(balls.length)
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
        return ball;
      }else return ball;
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

drawBody(c);
drawHands(c, rightHand, leftHand);