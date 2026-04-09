// src/entities/AIMolecule.js
import EntityFactory from './EntityFactory.js';

export default class AIMolecule {
  constructor(scene, x, y, type, stage = 1) {
    this.scene = scene;
    this.sprite = EntityFactory.createMolecule(scene, x, y, type, stage);
    this.type = type; // 'green' or 'red'
    this.stage = stage;
    this.foodCount = 0;
    this.maxFoodPerStage = 5;
    this.baseSpeed = type === 'green' ? 150 : 200;
    this.alive = true;
    this.radarRadius = type === 'green' ? 300 : 400;
    this.state = 'wander'; // 'wander', 'hunt', 'flee'
    this.wanderTimer = 0;
    this.targetX = x;
    this.targetY = y;
    this.updateSizeForStage();
  }

  update(time, delta) {
    if (!this.alive) return;

    this.wanderTimer -= delta;
    
    // AI decision making
    const target = this.findTarget();
    
    if (target) {
      this.state = 'hunt';
      this.moveToTarget(target);
    } else if (this.wanderTimer <= 0) {
      this.state = 'wander';
      this.pickNewWanderTarget();
    } else {
      this.moveToTarget({ x: this.targetX, y: this.targetY });
    }

    // Random wander timer reset
    if (this.state === 'wander' && this.wanderTimer <= 0) {
      this.pickNewWanderTarget();
    }
  }

  findTarget() {
    const allMolecules = this.scene.aiSystem?.getAllMolecules() || [];
    const foodGroup = this.scene.foodSystem?.getFoodGroup();
    
    if (this.type === 'green') {
      // Greens look for green food
      return this.findNearestFood(foodGroup);
    } else {
      // Reds hunt smaller molecules
      return this.findNearestSmallerMolecule(allMolecules);
    }
  }

  findNearestFood(foodGroup) {
    if (!foodGroup) return null;
    
    let nearest = null;
    let minDist = this.radarRadius;

    foodGroup.getChildren().forEach(food => {
      if (!food.active || !food.getData('active')) return;
      
      const dist = Phaser.Math.Distance.Between(
        this.sprite.x, this.sprite.y, food.x, food.y
      );
      
      if (dist < minDist) {
        minDist = dist;
        nearest = food;
      }
    });

    return nearest;
  }

  findNearestSmallerMolecule(allMolecules) {
    let nearest = null;
    let minDist = this.radarRadius;

    allMolecules.forEach(mol => {
      if (mol === this || !mol.alive) return;
      
      const molStage = mol.stage || mol.sprite.getData('stage') || 1;
      if (molStage >= this.stage) return; // Only hunt smaller

      const dist = Phaser.Math.Distance.Between(
        this.sprite.x, this.sprite.y,
        mol.sprite.x, mol.sprite.y
      );

      if (dist < minDist) {
        minDist = dist;
        nearest = mol.sprite || mol;
      }
    });

    return nearest;
  }

  moveToTarget(target) {
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x, this.sprite.y, target.x, target.y
    );

    const speed = this.getSpeedForStage();
    this.scene.physics.velocityFromRotation(angle, speed, this.sprite.body.velocity);
  }

  pickNewWanderTarget() {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200;
    
    this.targetX = this.sprite.x + Math.cos(angle) * distance;
    this.targetY = this.sprite.y + Math.sin(angle) * distance;
    
    // Clamp to world bounds
    this.targetX = Phaser.Math.Clamp(this.targetX, 0, 3000);
    this.targetY = Phaser.Math.Clamp(this.targetY, 0, 3000);
    
    this.wanderTimer = 1000 + Math.random() * 2000;
  }

  getSpeedForStage() {
    return this.baseSpeed - ((this.stage - 1) * 25);
  }

  getRadiusForStage() {
    return 28 + ((this.stage - 1) * 8);
  }

  updateSizeForStage() {
    const radius = this.getRadiusForStage();
    const scale = radius / 28;
    this.sprite.setScale(scale);
    this.sprite.setCircle(radius);
  }

  consume() {
    this.foodCount++;
    if (this.foodCount >= this.maxFoodPerStage && this.stage < 5) {
      this.evolve();
    }
  }

  evolve() {
    this.stage++;
    this.foodCount = 0;
    this.updateSizeForStage();
    this.sprite.setData('stage', this.stage);
  }

  die() {
    this.alive = false;
    this.sprite.setActive(false);
    this.sprite.setVisible(false);
    this.sprite.body.enable = false;
  }

  consumeAnimation(predatorSprite, callback) {
    this.scene.tweens.add({
      targets: this.sprite,
      x: predatorSprite.x,
      y: predatorSprite.y,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      duration: 150,
      ease: 'Power2',
      onComplete: () => {
        this.die();
        if (callback) callback();
      }
    });
  }

  respawn(x, y, type, stage = 1) {
    this.type = type;
    this.stage = stage;
    this.foodCount = 0;
    this.alive = true;
    this.state = 'wander';
    this.wanderTimer = 0;
    
    this.sprite.setPosition(x, y);
    this.sprite.setActive(true);
    this.sprite.setVisible(true);
    this.sprite.body.enable = true;
    this.sprite.setAlpha(0.85);
    this.sprite.setScale(1);
    this.sprite.setData('type', type);
    this.sprite.setData('stage', stage);
    this.sprite.setData('foodCount', 0);
    
    this.updateSizeForStage();
  }

  destroy() {
    this.sprite.destroy();
  }
}
