// src/systems/FoodSystem.js
import EntityFactory from '../entities/EntityFactory.js';

export default class FoodSystem {
  constructor(scene) {
    this.scene = scene;
    this.foodGroup = scene.physics.add.group({
      maxSize: 100,
      runChildUpdate: false
    });
    this.maxFood = 80;
    this.foodSpawnTimer = 0;
    this.foodSpawnInterval = 200; // ms
  }

  update(time, delta) {
    this.foodSpawnTimer += delta;
    
    if (this.foodSpawnTimer >= this.foodSpawnInterval) {
      this.foodSpawnTimer = 0;
      this.spawnFoodIfNeeded();
    }
  }

  spawnFoodIfNeeded() {
    const activeFood = this.foodGroup.getChildren().filter(f => f.active && f.getData('active'));
    
    if (activeFood.length < this.maxFood) {
      this.spawnFood();
    }
  }

  spawnFood() {
    const x = Phaser.Math.Between(100, 2900);
    const y = Phaser.Math.Between(100, 2900);
    
    const food = this.foodGroup.get(x, y, 'green_food');
    
    if (food) {
      food.setActive(true);
      food.setVisible(true);
      food.setData('active', true);
      food.setData('type', 'green');
      food.setCircle(12);
    }
  }

  spawnRedFood() {
    const x = Phaser.Math.Between(100, 2900);
    const y = Phaser.Math.Between(100, 2900);
    
    const food = this.foodGroup.get(x, y, 'red_food');
    
    if (food) {
      food.setActive(true);
      food.setVisible(true);
      food.setData('active', true);
      food.setData('type', 'red');
      food.setCircle(12);
    }
  }

  getFoodGroup() {
    return this.foodGroup;
  }

  clearAll() {
    this.foodGroup.clear(true);
  }
}
