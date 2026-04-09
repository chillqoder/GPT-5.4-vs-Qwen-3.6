// src/scenes/BootScene.js
import EntityFactory from '../entities/EntityFactory.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    // Generate all procedural textures
    EntityFactory.createTextures(this);
    
    // Start the play scene
    this.scene.start('PlayScene');
  }
}
