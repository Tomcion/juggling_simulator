
const WIDTH = 1000;
const HEIGHT = 1000;

const bodyWidthUp = 200;
const bodyWidthDown = 140;
const bodyHeight = 200;
const downMargin = 40;
const headRadius = 70;
const neckLength = 40;

const bodyPoint1x = (WIDTH + bodyWidthUp) / 2;
const bodyPoint1y = HEIGHT - downMargin - bodyHeight;
const bodyPoint2x = WIDTH - ((WIDTH + bodyWidthUp) / 2);
const bodyPoint2y = HEIGHT - downMargin - bodyHeight;
const bodyPoint3x = WIDTH - ((WIDTH + bodyWidthDown) / 2);
const bodyPoint3y = HEIGHT - downMargin;
const bodyPoint4x = (WIDTH + bodyWidthDown) / 2;
const bodyPoint4y = HEIGHT - downMargin;

const headCenterX = WIDTH / 2;
const headCenterY = HEIGHT - downMargin - bodyHeight - neckLength - headRadius;

const headBorderX = (WIDTH / 2) + headRadius;

export function drawBody(c) {
  c.strokeStyle = 'black';
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(bodyPoint1x, bodyPoint1y);
  c.lineTo(bodyPoint2x, bodyPoint2y);
  c.lineTo(bodyPoint3x, bodyPoint3y);
  c.lineTo(bodyPoint4x, bodyPoint4y);
  c.closePath();

  c.moveTo(headBorderX, headCenterY);

  c.arc(headCenterX, headCenterY, headRadius, 0, Math.PI * 2, false);

  c.stroke();
}

const handRadius = 20;

export function drawHands(c, rightHand, leftHand) {
  c.strokeStyle = 'black';
  c.beginPath();
  c.arc(rightHand.x, rightHand.y, handRadius, 0, Math.PI * 2, false);
  c.stroke();
  c.beginPath();
  c.arc(leftHand.x, leftHand.y, handRadius, 0, Math.PI * 2, false);
  c.stroke();
}

const ballRadius = 25;

export function drawBalls(c, balls) {
  for(let i = 0; i < balls.length; i++) {
    c.strokeStyle = 'red';
    c.fillStyle = 'red';
    c.beginPath();
    c.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
  }
}