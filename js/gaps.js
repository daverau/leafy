// Gaps

// factory pattern
Gap = function (x,y,width,img) {
  x = x || game.rnd.integerInRange(0, vars.worldSize);
  y = y || game.height;
  img = img || "tree";

  Phaser.Sprite.call(this, game, x, y, img);
  game.physics.arcade.enable(this);
  this.width = width || 200;
  this.height = game.ground.height+1;
  this.anchor.setTo(1,1);

  this.body.moves = false;
  this.body.immovable = true;

  // animations
  // this.animations.add('fly', [0,1,2,3,4], 30, true);
  // this.animations.play('fly');
  // this.tween = game.add.tween(this).to({
  //   alpha: 0,
  // }, 1000, Phaser.Easing.Cubic.Out);
};
Gap.prototype = Object.create(Phaser.Sprite.prototype);
Gap.prototype.constructor = Gap;

function hitGap(leafy, gap) {
  if (leafy.alive) {
    game.sfxbuzz.play();
    leafy.kill();
  }
}