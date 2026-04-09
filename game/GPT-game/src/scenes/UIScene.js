// src/scenes/UIScene.js
import { UI_FONT } from "../utils/constants.js";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.stageText = this.add.text(24, 20, "Stage 1", {
      fontFamily: UI_FONT,
      fontSize: "24px",
      color: "#effcff",
      stroke: "#041723",
      strokeThickness: 4,
    });

    this.progressText = this.add.text(24, 50, "Growth 0/5", {
      fontFamily: UI_FONT,
      fontSize: "18px",
      color: "#bee9f8",
      stroke: "#041723",
      strokeThickness: 4,
    });

    this.populationText = this.add.text(24, 76, "Food 0 | Green 0 | Red 0", {
      fontFamily: UI_FONT,
      fontSize: "16px",
      color: "#8fc4d7",
      stroke: "#041723",
      strokeThickness: 3,
    });

    this.tipText = this.add.text(24, 690, "Cursor-follow movement. Larger molecules consume smaller ones.", {
      fontFamily: UI_FONT,
      fontSize: "15px",
      color: "#d3f2ff",
      stroke: "#041723",
      strokeThickness: 3,
    });

    this.stageText.setScrollFactor(0);
    this.progressText.setScrollFactor(0);
    this.populationText.setScrollFactor(0);
    this.tipText.setScrollFactor(0);

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.overlayBg = this.add
      .rectangle(centerX, centerY, 520, 280, 0x03111a, 0.82)
      .setStrokeStyle(2, 0x8ce6ff, 0.35)
      .setScrollFactor(0)
      .setDepth(300);

    this.overlayTitle = this.add
      .text(centerX, centerY - 62, "Game Over", {
        fontFamily: UI_FONT,
        fontSize: "38px",
        color: "#effcff",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(301);

    this.overlayBody = this.add
      .text(centerX, centerY - 8, "", {
        fontFamily: UI_FONT,
        fontSize: "18px",
        color: "#c9eef8",
        align: "center",
        wordWrap: { width: 410 },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(301);

    this.restartButton = this.add
      .rectangle(centerX, centerY + 78, 178, 52, 0x59d7ff, 0.95)
      .setScrollFactor(0)
      .setDepth(301)
      .setInteractive({ useHandCursor: true });

    this.restartLabel = this.add
      .text(centerX, centerY + 78, "Restart", {
        fontFamily: UI_FONT,
        fontSize: "22px",
        color: "#022130",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(302);

    this.restartButton.on("pointerover", () => this.restartButton.setFillStyle(0x8be9ff, 1));
    this.restartButton.on("pointerout", () => this.restartButton.setFillStyle(0x59d7ff, 0.95));
    this.restartButton.on("pointerdown", () => {
      this.hideOverlay();
      this.scene.get("GameScene").scene.restart();
    });

    this.hideOverlay();

    this.onHudUpdate = (payload) => {
      this.stageText.setText(`Stage ${payload.stage}`);
      this.progressText.setText(`Growth ${payload.progress}`);
      this.populationText.setText(
        `Food ${payload.food} | Green ${payload.greens} | Red ${payload.reds}`,
      );
    };

    this.onGameEnd = (payload) => {
      if (payload.type === "win") {
        this.overlayTitle.setText("Apex Evolution");
        this.overlayBody.setText("Stage 5 reached. You now dominate the Petri dish.");
      } else {
        this.overlayTitle.setText("Consumed");
        this.overlayBody.setText(
          `A Stage ${payload.stage} predator absorbed you.\nRestart and try a safer hunting path.`,
        );
      }

      this.showOverlay();
    };

    this.onGameReset = () => this.hideOverlay();

    this.game.events.on("hud:update", this.onHudUpdate);
    this.game.events.on("game:ended", this.onGameEnd);
    this.game.events.on("game:reset", this.onGameReset);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off("hud:update", this.onHudUpdate);
      this.game.events.off("game:ended", this.onGameEnd);
      this.game.events.off("game:reset", this.onGameReset);
    });
  }

  showOverlay() {
    this.overlayBg.setVisible(true);
    this.overlayTitle.setVisible(true);
    this.overlayBody.setVisible(true);
    this.restartButton.setVisible(true).setActive(true);
    this.restartLabel.setVisible(true);
  }

  hideOverlay() {
    this.overlayBg.setVisible(false);
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false);
    this.restartButton.setVisible(false).setActive(false);
    this.restartLabel.setVisible(false);
  }
}
