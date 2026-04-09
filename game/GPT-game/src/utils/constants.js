// src/utils/constants.js
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const WORLD_WIDTH = 3000;
export const WORLD_HEIGHT = 3000;

export const MAX_STAGE = 5;
export const EVOLUTION_THRESHOLD = 5;

export const INITIAL_FOOD_COUNT = 120;
export const INITIAL_GREEN_COUNT = 14;
export const INITIAL_RED_COUNT = 10;

export const FOOD_POOL_SIZE = 180;
export const GREEN_POOL_SIZE = 22;
export const RED_POOL_SIZE = 16;

export const FOOD_RESPAWN_DELAY = 250;
export const AI_RESPAWN_DELAY = 850;

export const STAGE_SETTINGS = {
  1: { radius: 18, speed: 255, radar: 260 },
  2: { radius: 24, speed: 220, radar: 290 },
  3: { radius: 31, speed: 185, radar: 320 },
  4: { radius: 39, speed: 150, radar: 350 },
  5: { radius: 48, speed: 118, radar: 380 },
};

export const ENTITY_COLORS = {
  player: 0x8ef1ff,
  green: 0x7bf78e,
  red: 0xff6c7d,
  food: 0xb9ff8e,
};

export const UI_FONT = '"Trebuchet MS", "Avenir Next", sans-serif';
