// Enemies

// # Bees
function genBees(num, xValue, yValue) {
  xValue = xValue || game.rnd.integerInRange(game.width*5, game.width*7);
  yValue = yValue || game.height-90;
  var beeCount = num || 3;

  game.bees = game.add.group();
  //console.log('bees: '+beeCount);
  for (x=0; x<beeCount; x++) {
    //console.log('bee created at x:'+bee.x);
    var bee = new Enemy(game, xValue, yValue, 1, vars.beeSpeed);
    game.bees.add(bee);
  }
}

// factory pattern
Enemy = function (game, x, y, direction, speed) {
  Phaser.Sprite.call(this, game, x, y, "bee");
  this.anchor.setTo(0.5, 1);
  this.scale.setTo(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.xSpeed = direction*speed*-1;
  this.startX = x;
  this.body.setSize(240, 160, 0, -20); // hitbox adjusted

  // animations
  this.animations.add('fly', [0, 1, 2, 3, 4], 30, true);
  this.animations.add('flyhappy', [5, 6, 7, 8], 30, true);
  this.animations.play('fly');
  this.tween = game.add.tween(this).to({
    alpha: 0,
  }, 1000, Phaser.Easing.Cubic.Out);
  this.hittween = game.add.tween(this).to({
    //alpha: .5,
    y: (this.y - 200)
  }, 1000, Phaser.Easing.Cubic.Out);
  this.jumpsquash = game.add.tween(this).to({
    alpha: 0,
    y: (this.height + game.height)
  }, 1000, Phaser.Easing.Cubic.Out);
};

// create prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// update
Enemy.prototype.update = function() {
  this.body.velocity.x = -vars.beeSpeed;
  //moveEnemy(this);
  if ( offCamera(this) ) {
    resetBee(this);
  }
};

function resetBee(item) {
  //console.log('resetBee()');
  item.animations.play('fly');
  item.alpha = 1;
  item.pickedup = false;
  item.y = game.height - vars.platformHeight;
  item.x = game.camera.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
}

// Enemy move left and right loop
function moveEnemy(enemy) {

  if (enemy.pickedup) {

    // slow down faster bees
    if (enemy.xSpeed > vars.beeSpeed) {
      enemy.xSpeed = vars.beeSpeed * 0.6;
    }

    // Straightforward enemy movement
    if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 400) || enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -400)) {
      enemy.xSpeed *= -1;
      enemy.scale.x *= -1;
    }

  } else {

    // Change speed on direction for interesting movement
    if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 400)) {
      enemy.xSpeed = vars.beeSpeed * 0.6;
      enemy.scale.x *= -1;
    } else if (enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -400)) {
      enemy.xSpeed = vars.beeSpeed * -2;
      enemy.scale.x *= -1;
    }

  }
}

// called by update leafy,bee group overlap check
function passBee(leafy, bee) {
  if (leafy.alive) {

    // jump squash
    if ( bee.body.touching.up && !bee.pickedup) {

      bee.pickedup = true;
      bee.animations.play('flyhappy');
      game.sfxbuzz.play();
      bee.jumpsquash.start();
      leafyJump(leafy);

    } else {

      if (leafy.flowers < 1 && !bee.pickedup) {
        game.sfxbuzz.play();
        leafy.kill();
      } else {
        if (!bee.pickedup) {
          bee.pickedup = true;
          bee.animations.play('flyhappy');
          game.sfxbuzz.play();
          bee.hittween.start();
          leafy.flowers -= 1;
        }
      }

    } // end jump squash

  }
}
