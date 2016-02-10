// Leafy setup
function genLeafy() {
  var leafy = game.add.sprite( 50 , -100, 'leafy');
  leafy.anchor.setTo(0.5, 1); //flip at middle point
  leafy.playerSpeed = 160 * vars.ratio;
  leafy.alive = true;
  leafy.score = 0;
  leafy.blueLeafCount=0;
  leafy.flowers = 10;
  leafy.bestScore = localStorage.getItem("leafybestScore") === null ? 0 : localStorage.getItem("leafybestScore");
  leafy.jumpsScore = 0;
  leafy.jumping = false;

  game.camera.follow(leafy);

  // Define movement constants
  leafy.ACCELERATION = 2000; // pixels/second/second
  leafy.JUMP_SPEED = -750; // pixels/second (negative y is up)

  game.physics.arcade.enable(leafy);
  leafy.enableBody = true;
  leafy.body.gravity.y = 3000;
  //leafy.body.drag.setTo(600, 0);
  leafy.body.velocity.x = 0;
  leafy.body.maxVelocity.x = 500;
  leafy.body.maxVelocity.y = 4000;
  leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted

  // animation
  leafy.deathTween = game.add.tween(leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);

  // player score
  leafy.leafyText = game.add.text( leafy.x, leafy.y, '+200', { font: (14*vars.ratio)+"px Avenir-Medium", fill: '#F5A623' });
  leafy.leafyText.tween = game.add.tween(leafy.leafyText).to({
    alpha: 0,
    y: (leafy.leafyText.y + 400)
  }, 2000, Phaser.Easing.Cubic.Out);
  leafy.leafyText.anchor.set(0.5);

  // animations
  leafy.animations.add('turn', [7], 0, true);
  leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  leafy.animations.add('jump', [1], 0, true);
  leafy.animations.add('sad', [8], 0, true);
  leafy.animations.add('surprised', [9], 0, true);
  game.sfxfall = game.add.audio('fall');
  leafy.sfxboing = game.add.audio('boing');
  leafy.sfxboing.allowMultiple = true;


  // death
  leafy.kill = function() {

    this.alive = false;
    this.body.velocity.setTo(0,0);
    this.animations.stop();
    this.animations.play('sad');
    vars.triesScore++;

    // fall
    game.sfxfall.play();
    leafy.body.gravity.y = 2900;
    leafy.body.maxVelocity.y = 5000;

    // score
    localStorage.setItem("leafybestScore", Math.max(leafy.score, leafy.bestScore));

    // camera fall
    leafy.cameraFall = game.add.tween(game.camera.bounds).to( { 
      height: game.height*3
    }, 2000);
    leafy.cameraFall.start();
    
    // animate world
    this.deathTween.start();
    game.moon.deathTween.start();
    game.ui.deathTween.start();
    game.platforms.destroy();
    game.bgnight.tween = game.add.tween(game.bgnight).to( { 
      alpha: 0
    }, 1500);
    game.bgnight.tween.start();
    game.bggameover.tween.start();

    // not sure why i have this or where it came from
    this.events.onAnimationComplete.addOnce(function() {
      this.exists = true;
      this.visible = false;
      this.events.destroy();
    }, this);

    // only for newer phaser 2.4.4
    if (this.events) {
      this.events.onKilled$dispatch(this);
    }

    return this;
  };

  return leafy;

}


function playerMove(leafy) {

if (!vars.runmode) {

  leafy.body.velocity.x = 0;

  // move left
  if (game.cursors.left.isDown || (game.input.pointer1.x < game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = -leafy.playerSpeed;
    //leafy.body.acceleration.x = -leafy.ACCELERATION;
    
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1;
    }

  // moveright
  } else if (game.cursors.right.isDown || (game.input.pointer1.x > game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = leafy.playerSpeed;
    //leafy.body.acceleration.x = leafy.ACCELERATION;
    
    if (leafy.facing != 'right') {
      leafy.scale.x = 1; //default direction
      leafy.facing = 'right';
    }

  // idle
  } else if (leafy.facing != 'idle') {
    
    leafy.animations.play('turn');
    
    if (leafy.facing == 'left') {
      leafy.frame = 0;
    } else {
      leafy.frame = 5;
    }
    leafy.facing = 'idle';
  }

  // Walk animation
  if (game.cursors.left.isDown || game.cursors.right.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
    leafy.animations.play('walk');
  }

} else {
  // always run to the right
  leafy.animations.play('walk');
  leafy.body.velocity.x = leafy.playerSpeed;
  leafy.scale.x = 1; //default direction
  leafy.facing = 'right';
}


  // Jumping
  var onTheGround = leafy.body.touching.down;
  if (onTheGround) {
    leafy.jumps = 2; // If touching ground, give 1 jump
    leafy.jumping = false;
  }
  // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
  if (leafy.jumps > 0 && upInputIsActive(210)) {
    leafyJump();
  }
  // Reduce the number of available jumps if the jump input is released
  if (leafy.jumping && upInputReleased()) {
    leafy.jumps--;
    leafy.jumping = false;
    leafy.playingSound = false;
  }

}

function leafyJump() {
  game.leafy.body.velocity.y = game.leafy.JUMP_SPEED;
  game.leafy.jumping = true;
  game.leafy.animations.play('jump');
  if (!game.leafy.playingSound) {
    game.leafy.playingSound = true;
    game.leafy.sfxboing.play('',0,1,false,false);
  }
}

function upInputIsActive(duration) {
  var isActive = false;
  if (vars.runmode) {
    isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= game.input.activePointer.justPressed(duration + 1000/60);
  } else {
    isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= game.input.pointer2.justPressed(duration + 1000/60);
    isActive |= (game.input.activePointer.justPressed(duration + 1000/60) &&
      game.input.activePointer.x > game.width/4 &&
      game.input.activePointer.x < game.width/2 + game.width/4);
  }
  return isActive;
}

// This function returns true when the player releases the "jump" control
function upInputReleased() {
    var released = false;

    released = game.input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= game.input.pointer2.justReleased();
    released |= game.input.activePointer.justReleased();

    return released;
}

function respawn(leafy) {
  //console.log('respawn');
  game.respawning = false;
  leafy.body.position.x = 50;
  leafy.body.position.y = -100;
  leafy.body.velocity.x = 0;
  leafy.body.velocity.y = 0;
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.revive();
}