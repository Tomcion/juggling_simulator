export function Ball(x, y, isRightHand, throwNumber) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.isRightHand = isRightHand;
  this.inHand = true;
  this.throwNumber = throwNumber;

  this.release = (gravity, framesPerThrow) => {
    if(this.inHand) {
      this.inHand = false;
      this.vy = (gravity * (framesPerThrow / 2) * (throwNumber - 1)) / -2;
    }
  };

  this.update = (
    framesPerThrow,
    handsOffsetX,
    handsDistance,
    gravity
  ) => {
    const frames = (throwNumber - 1) * framesPerThrow / 2;
    let distance;

    if(throwNumber % 2) {
      const distanceAbs = ((handsDistance - handsOffsetX) * 2) + handsOffsetX;
      distance = distanceAbs * (isRightHand ? 1 : -1);
    }else {
      distance = handsOffsetX * (isRightHand ? -1 : 1)
    }
    
    this.vx = distance / frames;
    this.vy += gravity;

    this.x += this.vx;
    this.y += this.vy;
  };

  this.followHand = (hand) => {
    this.x = hand.x;
    this.y = hand.y;
  };
}