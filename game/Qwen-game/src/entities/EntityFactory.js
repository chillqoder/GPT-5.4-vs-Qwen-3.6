// src/entities/EntityFactory.js
export default class EntityFactory {
  static createTextures(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Player molecule - blue circle with glow
    graphics.fillStyle(0x00aaff, 1);
    graphics.fillCircle(32, 32, 28);
    graphics.fillStyle(0x00ddff, 0.5);
    graphics.fillCircle(32, 32, 32);
    graphics.generateTexture('player_circle', 64, 64);
    graphics.clear();

    // Green molecule - herbivore
    graphics.fillStyle(0x00cc44, 1);
    graphics.fillCircle(32, 32, 28);
    graphics.fillStyle(0x00ff55, 0.5);
    graphics.fillCircle(32, 32, 32);
    graphics.generateTexture('green_circle', 64, 64);
    graphics.clear();

    // Red molecule - carnivore
    graphics.fillStyle(0xcc2200, 1);
    graphics.fillCircle(32, 32, 28);
    graphics.fillStyle(0xff3300, 0.5);
    graphics.fillCircle(32, 32, 32);
    graphics.generateTexture('red_circle', 64, 64);
    graphics.clear();

    // Green food dot
    graphics.fillStyle(0x00ff66, 1);
    graphics.fillCircle(16, 16, 12);
    graphics.fillStyle(0x88ffaa, 0.4);
    graphics.fillCircle(16, 16, 16);
    graphics.generateTexture('green_food', 32, 32);
    graphics.clear();

    // Red food dot (meat)
    graphics.fillStyle(0xff4444, 1);
    graphics.fillCircle(16, 16, 12);
    graphics.fillStyle(0xff8888, 0.4);
    graphics.fillCircle(16, 16, 16);
    graphics.generateTexture('red_food', 32, 32);
    graphics.clear();

    // Diamond shape for special food
    graphics.fillStyle(0xffcc00, 1);
    graphics.beginPath();
    graphics.moveTo(16, 2);
    graphics.lineTo(30, 16);
    graphics.lineTo(16, 30);
    graphics.lineTo(2, 16);
    graphics.closePath();
    graphics.fillPath();
    graphics.generateTexture('diamond_food', 32, 32);
    graphics.clear();

    // Bubble particle
    graphics.fillStyle(0x88ccff, 0.3);
    graphics.lineStyle(1, 0xaaddff, 0.5);
    graphics.fillCircle(16, 16, 14);
    graphics.strokeCircle(16, 16, 14);
    graphics.generateTexture('bubble', 32, 32);
    graphics.clear();

    graphics.destroy();
  }

  static createPlayer(scene, x, y) {
    const player = scene.physics.add.sprite(x, y, 'player_circle');
    player.setCollideWorldBounds(true);
    player.setCircle(28);
    player.setAlpha(0.9);
    player.setDepth(10);
    return player;
  }

  static createMolecule(scene, x, y, type, stage = 1) {
    const textureKey = type === 'green' ? 'green_circle' : 'red_circle';
    const molecule = scene.physics.add.sprite(x, y, textureKey);
    molecule.setCollideWorldBounds(true);
    molecule.setCircle(28);
    molecule.setAlpha(0.85);
    molecule.setData('type', type);
    molecule.setData('stage', stage);
    molecule.setData('foodCount', 0);
    molecule.setData('targetX', x);
    molecule.setData('targetY', y);
    molecule.setData('wanderTimer', 0);
    return molecule;
  }

  static createFood(scene, x, y, type = 'green') {
    const textureKey = type === 'green' ? 'green_food' : 'red_food';
    const food = scene.physics.add.sprite(x, y, textureKey);
    food.setCircle(12);
    food.setData('type', type);
    food.setData('active', true);
    return food;
  }
}
