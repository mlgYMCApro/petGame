export class Bee {
    constructor(x, y, species) {
      this.x = x;
      this.y = y;
      this.species = species;
      this.size = 10;
      this.speed = 2 + Math.random() * 2;
      this.pollenCapacity = 10;
      this.currentPollen = 0;
      this.targetFlower = null;
      this.lockedOn = false;
      this.abilityActive = false;
    }
  
    draw() {
      ctx.fillStyle = this.species.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  
    update() {
      if (this.lockedOn) {
        this.collectPollen();
      } else {
        this.followMouse();
        this.findFlower();
      }
    }
  
    followMouse() {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  
    findFlower() {
      const nearbyFlower = flowers.find((flower) => {
        const distance = Math.hypot(flower.x + flower.size / 2 - this.x, flower.y + flower.size / 2 - this.y);
        return distance < 50 && flower.pollen > 0;
      });
  
      if (nearbyFlower) {
        this.targetFlower = nearbyFlower;
        this.lockedOn = true;
      }
    }
  
    collectPollen() {
      if (this.targetFlower && this.currentPollen < this.pollenCapacity) {
        const collectedPollen = this.targetFlower.collectPollen(this.pollenCapacity - this.currentPollen);
        this.currentPollen += collectedPollen;
  
        // Update pollen in UI
        updateUI();
  
        // Activate ability if there's a token
        if (this.abilityActive) {
          this.activateAbility();
        }
      }
  
      // If current pollen exceeds container capacity, return to hive
      if (this.currentPollen >= this.pollenCapacity) {
        this.returnToHive();
      }
    }
  
    returnToHive() {
      // Move towards hive
      const dx = hive.x - this.x;
      const dy = hive.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
  
      // Unload pollen at hive
      if (distance < this.speed) {
        pollenContainer.current += this.currentPollen;
        this.currentPollen = 0;
        this.lockedOn = false;
      }
    }
  
    activateAbility() {
      switch (this.species.ability) {
        case 'Precise Mark':
          // Example ability that increases pollen collection efficiency
          this.currentPollen += Math.floor(this.currentPollen * 0.2); // Boost collection
          break;
        case 'Fuzzy Boost':
          this.speed += 1; // Boost speed temporarily
          break;
        // ...
      }
      this.abilityActive = false; // Reset ability status
    }
  }