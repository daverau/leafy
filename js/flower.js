// Flowers

Flower = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "flower");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  this.pickedup = false;
  // animations
  this.pickuptween = game.add.tween(this).to({
    alpha: 0,
  }, 1000, Phaser.Easing.Cubic.Out);
  this.pickuptween.onStart.add(function(flower, tween) {
    flower.body.velocity.y = -1000;
  });
  this.pickuptween.onComplete.add(function(flower, tween) {
    flower.kill();
  });

};
Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;
Flower.prototype.update = function() {
};
function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    game.leafy.flowers += 1;
    flower.pickedup = true;
    game.sfxbuzz.play();
    flower.pickuptween.start();
  }
}