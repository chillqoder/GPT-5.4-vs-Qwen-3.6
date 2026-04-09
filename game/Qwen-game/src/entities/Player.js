// src/entities/Player.js
import EntityFactory from './EntityFactory.js';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = EntityFactory.createPlayer(scene, x, y);
    this.stage = 1;
    this.foodCount = 0;
    this.maxFoodPerStage = 5;
    this.baseSpeed = 300;
    this.alive = true;

    // Setup input tracking
    this.scene.input.on('pointermove', (pointer) => {
      this.targetX = pointer.x;
      this.targetY = pointer.y;
    });

    this.targetX = x;
    this.targetY = y;
  }

  update() {
    if (!this.alive) return;

    // Calculate direction to mouse position (relative to camera)
    const worldX = this.targetX + this.scene.cameras.main.scrollX;
    const worldY = this.targetY + this.scene.cameras.main.scrollY;

    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      worldX,
      worldY
    );

    const distance = Phaser.Math.Distance.Between(
      this.sprite.x,
      this.sprite.y,
      worldX,
      worldY
    );

    // Only move if we're far enough from target
    if (distance > 10) {
      const speed = this.getSpeedForStage();
      this.scene.physics.velocityFromRotation(angle, speed, this.sprite.body.velocity);
    } else {
      this.sprite.setVelocity(0, 0);
    }
  }

  getSpeedForStage() {
    // Stage 1 is fastest, Stage 5 is slowest
    return this.baseSpeed - ((this.stage - 1) * 40);
  }

  getRadiusForStage() {
    // Base radius 28, grows with stage
    return 28 + ((this.stage - 1) * 8);
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
    const newRadius = this.getRadiusForStage();
    
    // Visual feedback - grow
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: newRadius / 28,
      scaleY: newRadius / 28,
      duration: 500,
      ease: 'Back.easeOut'
    });

    // Update collider
    this.sprite.setCircle(newRadius);

    // Update speed
    this.scene.events.emit('playerEvolved', this.stage);
  }

  takeDamage(amount) {
    this.foodCount -= amount;
    if (this.foodCount < 0) {
      this.die();
    }
  }

  die() {
    this.alive = false;
    this.scene.events.emit('playerDied');
  }

  destroy() {
    this.sprite.destroy();
  }
}
