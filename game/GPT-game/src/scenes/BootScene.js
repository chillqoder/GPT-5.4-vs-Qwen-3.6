// src/scenes/BootScene.js
import { createProceduralTextures } from "../systems/TextureFactory.js";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    createProceduralTextures(this);
    this.scene.start("GameScene");
    this.scene.launch("UIScene");
  }
}
