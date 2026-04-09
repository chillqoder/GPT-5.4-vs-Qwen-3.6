// src/systems/AISystem.js
import AIMolecule from '../entities/AIMolecule.js';

export default class AISystem {
  constructor(scene) {
    this.scene = scene;
    this.molecules = [];
    this.maxMolecules = 25;
    this.greenCount = 15;
    this.redCount = 10;
    this.respawnTimer = 0;
  }

  init() {
    // Create initial green molecules
    for (let i = 0; i < this.greenCount; i++) {
      this.spawnMolecule('green');
    }

    // Create initial red molecules
    for (let i = 0; i < this.redCount; i++) {
      this.spawnMolecule('red');
    }
  }

  spawnMolecule(type, stage = 1) {
    if (this.molecules.length >= this.maxMolecules) return;

    const x = Phaser.Math.Between(100, 2900);
    const y = Phaser.Math.Between(100, 2900);
    
    const molecule = new AIMolecule(this.scene, x, y, type, stage);
    this.molecules.push(molecule);
    return molecule;
  }

  update(time, delta) {
    // Update all molecules
    this.molecules.forEach(mol => mol.update(time, delta));
    
    // Respawn dead molecules periodically
    this.respawnTimer += delta;
    if (this.respawnTimer >= 5000) {
      this.respawnTimer = 0;
      this.respawnDeadMolecules();
    }
  }

  respawnDeadMolecules() {
    this.molecules.forEach(mol => {
      if (!mol.alive) {
        const x = Phaser.Math.Between(100, 2900);
        const y = Phaser.Math.Between(100, 2900);
        mol.respawn(x, y, mol.type, 1);
      }
    });
  }

  getAllMolecules() {
    return this.molecules.filter(m => m.alive);
  }

  checkFoodCollisions(player) {
    const foodGroup = this.scene.foodSystem?.getFoodGroup();
    if (!foodGroup) return;

    foodGroup.getChildren().forEach(food => {
      if (!food.active || !food.getData('active')) return;

      // Check player collision with food
      if (player.alive && this.scene.physics.overlap(player.sprite, food)) {
        food.setData('active', false);
        food.setActive(false);
        food.setVisible(false);
        player.consume();
        this.showConsumeEffect(food);
      }

      // Check AI molecule collisions with food
      this.molecules.forEach(mol => {
        if (!mol.alive) return;
        if (mol.type === 'green' && this.scene.physics.overlap(mol.sprite, food)) {
          food.setData('active', false);
          food.setActive(false);
          food.setVisible(false);
          mol.consume();
          this.showConsumeEffect(food);
        }
      });
    });
  }

  checkMoleculeCollisions(player) {
    for (let i = 0; i < this.molecules.length; i++) {
      const mol = this.molecules[i];
      if (!mol.alive) continue;

      // Player vs AI molecule
      if (player.alive && this.scene.physics.overlap(player.sprite, mol.sprite)) {
        this.resolveCollision(player, mol);
      }

      // AI molecule vs AI molecule
      for (let j = i + 1; j < this.molecules.length; j++) {
        const other = this.molecules[j];
        if (!other.alive) continue;
        
        if (this.scene.physics.overlap(mol.sprite, other.sprite)) {
          this.resolveAICollision(mol, other);
        }
      }
    }
  }

  resolveCollision(player, aiMolecule) {
    const playerStage = player.stage;
    const aiStage = aiMolecule.stage;

    if (playerStage > aiStage) {
      // Player eats AI
      aiMolecule.consumeAnimation(player.sprite, () => {
        player.consume();
      });
    } else if (aiStage > playerStage) {
      // AI eats player
      this.scene.tweens.add({
        targets: player.sprite,
        scaleX: 0.5,
        scaleY: 0.5,
        alpha: 0.3,
        duration: 150,
        ease: 'Power2',
        onComplete: () => {
          player.takeDamage(1);
          player.sprite.setScale(1);
          player.sprite.setAlpha(0.9);
        }
      });
    }
    // Equal stages - bounce (handled by physics)
  }

  resolveAICollision(mol1, mol2) {
    if (mol1.stage > mol2.stage) {
      mol2.consumeAnimation(mol1.sprite, () => {
        mol1.consume();
      });
    } else if (mol2.stage > mol1.stage) {
      mol1.consumeAnimation(mol2.sprite, () => {
        mol2.consume();
      });
    }
  }

  showConsumeEffect(food) {
    // Simple particle effect
    const particles = this.scene.add.particles(food.x, food.y, 'green_food', {
      speed: { min: 50, max: 100 },
      scale: { start: 0.5, end: 0 },
      lifespan: 300,
      quantity: 5,
      emitting: false
    });
    particles.explode();
  }

  destroy() {
    this.molecules.forEach(mol => mol.destroy());
    this.molecules = [];
  }
}
