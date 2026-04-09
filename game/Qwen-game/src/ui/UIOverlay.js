// src/ui/UIOverlay.js
export default class UIOverlay {
  constructor(scene) {
    this.scene = scene;
    this.stageText = null;
    this.gameOverContainer = null;
    this.winContainer = null;
    
    this.createStageDisplay();
    this.createGameOverUI();
    this.createWinUI();
  }

  createStageDisplay() {
    // Stage indicator at top-left
    this.stageText = this.scene.add.text(20, 20, 'Stage: 1', {
      fontSize: '28px',
      color: '#00ddff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    this.stageText.setDepth(1000);
  }

  createGameOverUI() {
    this.gameOverContainer = this.scene.add.container(0, 0);
    this.gameOverContainer.setDepth(2000);
    this.gameOverContainer.setVisible(false);

    // Dark overlay
    const overlay = this.scene.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);
    this.gameOverContainer.add(overlay);

    // Game Over text
    const gameOverText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 50,
      'GAME OVER',
      {
        fontSize: '64px',
        color: '#ff3333',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6
      }
    );
    gameOverText.setOrigin(0.5);
    this.gameOverContainer.add(gameOverText);

    // Restart button
    const restartBtn = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 50,
      '▶ RESTART',
      {
        fontSize: '36px',
        color: '#ffffff',
        backgroundColor: '#00aa44',
        padding: { x: 30, y: 15 },
        borderRadius: 10
      }
    );
    restartBtn.setOrigin(0.5);
    restartBtn.setInteractive({ useHandCursor: true });
    restartBtn.on('pointerdown', () => {
      this.scene.scene.restart();
    });
    restartBtn.on('pointerover', () => restartBtn.setScale(1.1));
    restartBtn.on('pointerout', () => restartBtn.setScale(1));
    this.gameOverContainer.add(restartBtn);
  }

  createWinUI() {
    this.winContainer = this.scene.add.container(0, 0);
    this.winContainer.setDepth(2000);
    this.winContainer.setVisible(false);

    // Dark overlay
    const overlay = this.scene.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);
    this.winContainer.add(overlay);

    // Win text
    const winText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 50,
      'APEX PREDATOR!',
      {
        fontSize: '56px',
        color: '#ffcc00',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6
      }
    );
    winText.setOrigin(0.5);
    this.winContainer.add(winText);

    const subText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 30,
      'You have evolved to Stage 5!',
      {
        fontSize: '28px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      }
    );
    subText.setOrigin(0.5);
    this.winContainer.add(subText);

    // Restart button
    const restartBtn = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 100,
      '▶ PLAY AGAIN',
      {
        fontSize: '32px',
        color: '#ffffff',
        backgroundColor: '#00aa44',
        padding: { x: 25, y: 12 },
        borderRadius: 10
      }
    );
    restartBtn.setOrigin(0.5);
    restartBtn.setInteractive({ useHandCursor: true });
    restartBtn.on('pointerdown', () => {
      this.scene.scene.restart();
    });
    restartBtn.on('pointerover', () => restartBtn.setScale(1.1));
    restartBtn.on('pointerout', () => restartBtn.setScale(1));
    this.winContainer.add(restartBtn);
  }

  updateStage(stage) {
    if (this.stageText) {
      this.stageText.setText(`Stage: ${stage}`);
    }
  }

  showGameOver() {
    this.gameOverContainer.setVisible(true);
  }

  showWin() {
    this.winContainer.setVisible(true);
  }

  destroy() {
    this.stageText?.destroy();
    this.gameOverContainer?.destroy();
    this.winContainer?.destroy();
  }
}
