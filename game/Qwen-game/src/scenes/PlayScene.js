// src/scenes/PlayScene.js
import Player from '../entities/Player.js';
import FoodSystem from '../systems/FoodSystem.js';
import AISystem from '../systems/AISystem.js';
import HealthBar from '../ui/HealthBar.js';
import UIOverlay from '../ui/UIOverlay.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    // World bounds
    this.physics.world.setBounds(0, 0, 3000, 3000);
    
    // Create background
    this.createBackground();
    
    // Create bubble particles
    this.createBubbles();
    
    // Initialize systems
    this.foodSystem = new FoodSystem(this);
    this.aiSystem = new AISystem(this);
    this.aiSystem.init();
    
    // Create player
    this.player = new Player(this, 1500, 1500);
    
    // Camera follow player
    this.cameras.main.setBounds(0, 0, 3000, 3000);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);
    
    // UI
    this.uiOverlay = new UIOverlay(this);
    this.playerHealthBar = new HealthBar(this, this.player.sprite);
    
    // Setup event listeners
    this.events.on('playerEvolved', (stage) => {
      this.uiOverlay.updateStage(stage);
      
      if (stage >= 5) {
        this.triggerWin();
      }
    });
    
    this.events.on('playerDied', () => {
      this.uiOverlay.showGameOver();
    });
    
    // Setup colliders
    this.setupColliders();
  }

  createBackground() {
    // Blue underwater background
    const bg = this.add.graphics();
    bg.fillStyle(0x002244, 1);
    bg.fillRect(0, 0, 3000, 3000);
    
    // Add some depth variation with darker spots
    bg.fillStyle(0x001a33, 0.5);
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, 3000);
      const y = Phaser.Math.Between(0, 3000);
      const radius = Phaser.Math.Between(100, 300);
      bg.fillCircle(x, y, radius);
    }
    bg.setDepth(-1);
  }

  createBubbles() {
    // Rising bubble particles
    this.bubbleEmitter = this.add.particles(0, 0, 'bubble', {
      x: { min: 0, max: 3000 },
      y: 3200,
      lifespan: { min: 5000, max: 8000 },
      speedY: { min: -30, max: -60 },
      speedX: { min: -10, max: 10 },
      scale: { start: 0.5, end: 1 },
      alpha: { start: 0.4, end: 0 },
      quantity: 1,
      frequency: 300,
      emitting: true
    });
    this.bubbleEmitter.setDepth(-0.5);
  }

  setupColliders() {
    // World bounds collision
    this.player.sprite.setCollideWorldBounds(true);
  }

  update(time, delta) {
    // Update player
    this.player.update();
    
    // Update systems
    this.foodSystem.update(time, delta);
    this.aiSystem.update(time, delta);
    
    // Check collisions
    this.aiSystem.checkFoodCollisions(this.player);
    this.aiSystem.checkMoleculeCollisions(this.player);
    
    // Update health bars
    this.playerHealthBar.update();
    
    // Update AI health bars (only for visible ones)
    if (!this.aiHealthBars) {
      this.aiHealthBars = [];
    }
    
    // Clean up old health bars
    this.aiHealthBars.forEach(bar => bar.destroy());
    this.aiHealthBars = [];
    
    // Create new health bars for AI molecules
    this.aiSystem.getAllMolecules().forEach(mol => {
      // Only show health bar if close to camera
      const camera = this.cameras.main;
      const dist = Phaser.Math.Distance.Between(
        mol.sprite.x, mol.sprite.y,
        camera.centerX + camera.scrollX,
        camera.centerY + camera.scrollY
      );
      
      if (dist < 600) {
        const bar = new HealthBar(this, mol.sprite, 50, 6);
        this.aiHealthBars.push(bar);
      }
    });
  }

  triggerWin() {
    this.time.delayedCall(500, () => {
      this.uiOverlay.showWin();
    });
  }

  shutdown() {
    // Cleanup
    this.player?.destroy();
    this.foodSystem?.clearAll();
    this.aiSystem?.destroy();
    this.uiOverlay?.destroy();
    this.playerHealthBar?.destroy();
    this.aiHealthBars?.forEach(bar => bar.destroy());
    this.bubbleEmitter?.destroy();
  }
}
