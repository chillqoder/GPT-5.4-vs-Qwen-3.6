// src/systems/HealthBarSystem.js
export default class HealthBarSystem {
  constructor(scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics().setDepth(999);
  }

  update(entities) {
    this.graphics.clear();

    entities.forEach((entity) => {
      if (!entity || !entity.active || entity.isBeingConsumed) {
        return;
      }

      const width = Math.max(22, entity.radius * 2.2);
      const height = 5;
      const x = entity.x - width / 2;
      const y = entity.y - entity.radius - 16;

      this.graphics.fillStyle(0x07131d, 0.7);
      this.graphics.fillRoundedRect(x, y, width, height, 2);
      this.graphics.fillStyle(entity.getBarColor(), 0.92);
      this.graphics.fillRoundedRect(x + 1, y + 1, (width - 2) * entity.getVitalityRatio(), height - 2, 2);
    });
  }

  destroy() {
    this.graphics.destroy();
  }
}
