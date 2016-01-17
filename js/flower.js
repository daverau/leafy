// Flowers

Flower = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "flower");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  this.pickedup = false;
  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
  }, 1000, Phaser.Easing.Cubic.Out);
  // [todo] add onComplete kill
};
Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;
Flower.prototype.update = function() {
};
function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    game.leafy.flowers += 1;
    flower.pickedup=true;
    game.sfxbuzz.play();
    flower.tween.start();
  }
}