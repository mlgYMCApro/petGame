export class Hive {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 20;
    }
  
    draw() {
      ctx.fillStyle = 'brown';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  }