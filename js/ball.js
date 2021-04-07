export function Ball(x, y, vx, vy, isRightHand, number) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.isRightHand = isRightHand;

  this.inHand = true;

  this.update = () => {
    if(isRightHand) {
      this.x += 2;
      this.y -= 8;
    }else {
      this.x -= 2;
      this.y -= 8;
    }
  };

  this.followHand = (hand) => {
    this.x = hand.x;
    this.y = hand.y;
  };
}