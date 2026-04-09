// src/systems/TextureFactory.js
function drawPolygon(graphics, points, fillColor, strokeColor) {
  graphics.clear();
  graphics.fillStyle(fillColor, 1);
  graphics.lineStyle(6, strokeColor, 0.7);
  graphics.beginPath();
  graphics.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    graphics.lineTo(points[index].x, points[index].y);
  }
  graphics.closePath();
  graphics.fillPath();
  graphics.strokePath();
}

export function createProceduralTextures(scene) {
  const textureNames = ["shape-circle", "shape-diamond", "shape-hexagon", "food-dot", "bubble"];
  if (textureNames.every((name) => scene.textures.exists(name))) {
    return;
  }

  const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

  graphics.clear();
  graphics.fillStyle(0xffffff, 1);
  graphics.lineStyle(6, 0xdffbff, 0.72);
  graphics.fillCircle(48, 48, 38);
  graphics.strokeCircle(48, 48, 38);
  graphics.generateTexture("shape-circle", 96, 96);

  drawPolygon(
    graphics,
    [
      { x: 48, y: 10 },
      { x: 84, y: 48 },
      { x: 48, y: 86 },
      { x: 12, y: 48 },
    ],
    0xffffff,
    0xdffbff,
  );
  graphics.generateTexture("shape-diamond", 96, 96);

  drawPolygon(
    graphics,
    [
      { x: 28, y: 10 },
      { x: 68, y: 10 },
      { x: 88, y: 48 },
      { x: 68, y: 86 },
      { x: 28, y: 86 },
      { x: 8, y: 48 },
    ],
    0xffffff,
    0xdffbff,
  );
  graphics.generateTexture("shape-hexagon", 96, 96);

  graphics.clear();
  graphics.fillStyle(0xb9ff8e, 1);
  graphics.fillCircle(10, 10, 8);
  graphics.lineStyle(2, 0xeaffd7, 0.8);
  graphics.strokeCircle(10, 10, 8);
  graphics.generateTexture("food-dot", 20, 20);

  graphics.clear();
  graphics.lineStyle(2, 0xd8fbff, 0.7);
  graphics.strokeCircle(12, 12, 9);
  graphics.fillStyle(0xffffff, 0.12);
  graphics.fillCircle(9, 9, 4);
  graphics.generateTexture("bubble", 24, 24);

  graphics.destroy();
}
