export class Flower {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.pollen = Math.floor(Math.random() * 100);
      this.saturationCount = 0;
      this.saturationLimit = 5;
      this.cooldown = 0;
    }
  
    draw() {
      ctx.fillStyle = this.getColor();
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  
    update() {
      // Update flower behavior
      this.cooldown--;
      this.saturationCount--;
  
      if (this.pollen <= 0) {
        // Regenerate pollen over time
        this.pollen = Math.min(100, this.pollen + 0.1);
      }
    }
  
    collectPollen(amount) {
      if (this.cooldown <= 0 && this.saturationCount <= 0) {
        const collected = Math.min(amount, this.pollen);
        this.pollen -= collected;
        this.saturationCount = this.saturationLimit;
        this.cooldown = 10; // Cooldown before regenerating pollen
        return collected;
      }
      return 0;
    }
  
    getColor() {
      if (this.pollen <= 0) {
        return 'gray'; // Wilting color
      } else if (this.saturationCount > 0) {
        return 'blue'; // Saturated color
      } else {
        return 'yellow'; // Normal color
      }
    }
  }