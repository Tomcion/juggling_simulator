
let WIDTH, HEIGHT, bodyWidthUp, bodyWidthDown,
    bodyHeight, downMargin, headRadius, neckLength,
    bodyPoint1x, bodyPoint1y,
    bodyPoint2x, bodyPoint2y,
    bodyPoint3x, bodyPoint3y,
    bodyPoint4x, bodyPoint4y,
    headCenterX, headCenterY, headBorderX;

export function setVariables(width, height) {
  WIDTH = width;
  HEIGHT = height;

  bodyWidthUp = 200;
  bodyWidthDown = 140;
  bodyHeight = 200;
  downMargin = 40;
  headRadius = 70;
  neckLength = 40;

  bodyPoint1x = (WIDTH + bodyWidthUp) / 2;
  bodyPoint1y = HEIGHT - downMargin - bodyHeight;
  bodyPoint2x = WIDTH - ((WIDTH + bodyWidthUp) / 2);
  bodyPoint2y = HEIGHT - downMargin - bodyHeight;
  bodyPoint3x = WIDTH - ((WIDTH + bodyWidthDown) / 2);
  bodyPoint3y = HEIGHT - downMargin;
  bodyPoint4x = (WIDTH + bodyWidthDown) / 2;
  bodyPoint4y = HEIGHT - downMargin;

  headCenterX = WIDTH / 2;
  headCenterY = HEIGHT - downMargin - bodyHeight - neckLength - headRadius;

  headBorderX = (WIDTH / 2) + headRadius;
}
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