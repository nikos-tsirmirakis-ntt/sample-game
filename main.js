const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  physics: { default: "arcade", arcade: { debug: false } },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player, bullets, cursors, lastFired = 0;

function preload() {
  this.load.image("player", "https://phaser.io/content/tutorials/making-your-first-phaser-3-game/player.png");
  this.load.image("bullet", "https://cdn.pixabay.com/photo/2013/07/12/15/55/bullet-150092_1280.png");
}

function create() {
  player = this.physics.add.sprite(400, 500, "player").setCollideWorldBounds(true);
  bullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image, maxSize: 20, runChildUpdate: true });
  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update(time, delta) {
  player.setVelocity(0);

  if (cursors.left.isDown) player.setVelocityX(-300);
  if (cursors.right.isDown) player.setVelocityX(300);

  if (cursors.space.isDown && time > lastFired) {
    let bullet = bullets.get();
    if (bullet) {
      bullet.enableBody(true, player.x, player.y - 20, true, true);
      bullet.setVelocityY(-400);
      bullet.setTexture("bullet");
      bullet.setScale(0.1);
      lastFired = time + 200;
    }
  }

  bullets.children.each(function(bullet) {
    if (bullet.active && bullet.y < 0) bullet.setActive(false).setVisible(false);
  }, this);
}

new Phaser.Game(config);