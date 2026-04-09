// src/ui/HealthBar.js
export default class HealthBar {
  constructor(scene, target, width = 60, height = 8) {
    this.scene = scene;
    this.target = target;
    this.width = width;
    this.height = height;
    this.offsetY = -40;

    // Background
    this.bg = scene.add.graphics();
    this.bg.setDepth(100);

    // Health bar
    this.bar = scene.add.graphics();
    this.bar.setDepth(101);

    this.update();
  }

  update() {
    if (!this.target) return;

    const x = this.target.x - this.width / 2;
    const y = this.target.y + this.offsetY;

    // Clear
    this.bg.clear();
    this.bar.clear();

    // Background
    this.bg.fillStyle(0x000000, 0.6);
    this.bg.fillRoundedRect(x - 1, y - 1, this.width + 2, this.height + 2, 3);

    // Health percentage
    const maxFood = this.target.maxFoodPerStage || 5;
    const foodCount = this.target.foodCount || 0;
    const healthPercent = Phaser.Math.Clamp(foodCount / maxFood, 0, 1);

    // Color based on health
    const color = healthPercent > 0.6 ? 0x00ff00 : 
                  healthPercent > 0.3 ? 0xffaa00 : 0xff0000;

    this.bar.fillStyle(color, 1);
    this.bar.fillRoundedRect(x, y, this.width * healthPercent, this.height, 2);
  }

  destroy() {
    this.bg.destroy();
    this.bar.destroy();
  }
}
