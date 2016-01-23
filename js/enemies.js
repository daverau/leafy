// Enemies
function genBees() {
  game.bees = game.add.group();
  var beeCount = Math.ceil(vars.worldSize * .003);
  var beeCount = 5;
  console.log('bees: '+beeCount);
  for (x=0; x<beeCount; x++) {
   //console.log('bee created at x:'+bee.x);
   var bee = new Enemy(game, game.rnd.integerInRange(0, vars.worldSize), game.height-90, game.rnd.integerInRange(1, 200), vars.beeSpeed);
   game.bees.add(bee);
  }
}

// factory pattern
Enemy = function (game, x, y, direction, speed) {
  Phaser.Sprite.call(this, game, x, y, "bee");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.xSpeed = direction*speed*-1;
  this.startX = x;

  // animations
  this.animations.add('fly', [0,1,2,3,4], 30, true);
  this.animations.add('flyhappy', [5,6,7,8], 30, true);
  this.animations.play('fly');
  this.tween = game.add.tween(this).to({
    alpha: 0,
  }, 1000, Phaser.Easing.Cubic.Out);
  this.hittween = game.add.tween(this).to({
    //alpha: .5,
    y: (this.y - 200)
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
// Enemy move left and right loop
function moveEnemy(enemy){
  // ## Straightforward enemy movement loop
  // if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 400) || enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -400)) {
  //   enemy.xSpeed*=-1;
  //   enemy.scale.x*=-1;
  // }

  // ## Change speed on direction (more interesting)
  if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 400)) {
    enemy.xSpeed = vars.beeSpeed * .6;
    enemy.scale.x*=-1;
  } else if (enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -400)) {
    enemy.xSpeed = vars.beeSpeed * -2;
    enemy.scale.x*=-1;
  }
}

// called by update leafy,bee group overlap check
function passBee(leafy, bee) {
  if (leafy.flowers < 1 && !bee.pickedup) {
    game.sfxbuzz.play();
    leafy.kill();
  } else {
    if (!bee.pickedup) {
      bee.pickedup=true;
      //game.sfxbuzz._sound.playbackRate.value = Math.random()*1.2+.9;
      bee.animations.play('flyhappy');
      game.sfxbuzz.play();
      bee.hittween.start();
      leafy.flowers -= 1;
    }
  }
}