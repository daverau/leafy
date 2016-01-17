// Enemies

// factory pattern
Enemy = function (game, x, y, direction, speed) {
  //x = x || game.rnd.integerInRange(0, vars.worldSize);
  Phaser.Sprite.call(this, game, x, y, "bee");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.xSpeed = direction*speed*-1;
  this.startX = x;

  // animations
  this.animations.add('fly', [0,1,2,3,4], 30, true);
  this.animations.play('fly');
  this.tween = game.add.tween(this).to({
    alpha: 0,
  }, 1000, Phaser.Easing.Cubic.Out);
};

// create prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// update
Enemy.prototype.update = function() {
  this.body.velocity.x = this.xSpeed;
  moveEnemy(this);
};
// enemy move left and right loop
function moveEnemy(enemy){
  if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 400) || enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -400)) {
    enemy.xSpeed*=-1;
    enemy.scale.x*=-1;
  }
}

// called by update leafy,bee group overlap check
function passBee(leafy, bee) {
  if (leafy.honeyCount < 1) {
    game.sfxbuzz.play();
  //game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;
    leafy.kill();
  } else {
    if (!bee.pickedup) {
      bee.pickedup=true;
      game.sfxbuzz.play();
      bee.tween.start();
      //bee.kill();
    }
  }
  //game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;
}