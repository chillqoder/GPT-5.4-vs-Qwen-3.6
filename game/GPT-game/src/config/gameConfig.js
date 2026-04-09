// src/config/gameConfig.js
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants.js";
import BootScene from "../scenes/BootScene.js";
import GameScene from "../scenes/GameScene.js";
import UIScene from "../scenes/UIScene.js";

const gameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#07273c",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, GameScene, UIScene],
};

export default gameConfig;
