
let lastRenderTime = 0;
const fps = 10;

let playing = false;
const WIDTH = 500;
const HEIGHT = 500;

const bodyWidthUp = 100;
const bodyWidthDown = 70;
const bodyHeight = 100;
const downMargin = 20;
const headRadius = 35;
const neckLength = 20;

let siteswap;

function render(currentTime) {
  if(!playing) return;
  requestAnimationFrame(render);

  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
  if (secondsSinceLastRender < 1/fps) return;
  lastRenderTime = currentTime;

  updateHands();
  updateBalls();

  c.clearRect(0, 0, WIDTH, HEIGHT);

  drawBody();
  drawHands();
  drawBalls();
}

const siteswapForm = document.getElementById('siteswap-form');
const siteswapInput = document.getElementById('siteswap');

siteswapForm.addEventListener('submit', (e) => {
  e.preventDefault();

  siteswap = siteswapInput.value;
  playing = true;

  render();
});

const canvas = document.querySelector('canvas');

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');


function updateHands() {
  
}

function updateBalls() {

}

function drawHands() {

}

function drawBalls() {

}

function drawBody() {
  c.beginPath();
  c.moveTo((WIDTH + bodyWidthUp) / 2, HEIGHT - downMargin - bodyHeight);
  c.lineTo(WIDTH - ((WIDTH + bodyWidthUp) / 2), HEIGHT - downMargin - bodyHeight);
  c.lineTo(WIDTH - ((WIDTH + bodyWidthDown) / 2), HEIGHT - downMargin);
  c.lineTo((WIDTH + bodyWidthDown) / 2, HEIGHT - downMargin);
  c.closePath();

  c.moveTo(
    (WIDTH / 2) + headRadius,
    HEIGHT - downMargin - bodyHeight - neckLength - headRadius
  );

  c.arc(
    WIDTH / 2,
    HEIGHT - downMargin - bodyHeight - neckLength - headRadius,
    headRadius, 0, Math.PI * 2, false
  );

  c.stroke();
}