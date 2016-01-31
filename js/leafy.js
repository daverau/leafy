// Leafy setup
function genLeafy() {
  var leafy = game.add.sprite( 50 , -100, 'leafy');
  leafy.anchor.setTo(0.5, 1); //flip at middle point
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.jumpHeight = -800;
  leafy.alive = true;
  leafy.score = 0;
  leafy.blueLeafCount=0;
  leafy.honeyCount = 0;
  leafy.flowers = 10;  
  leafy.bestJump = 0;
  leafy.bestScore = localStorage.getItem("leafybestScore") === null ? 0 : localStorage.getItem("leafybestScore");


  game.camera.follow(leafy);


// Define movement constants
leafy.MAX_SPEED = 500; // pixels/second
leafy.ACCELERATION = 1500; // pixels/second/second
leafy.DRAG = 600; // pixels/second
  leafy.JUMP_SPEED = -750; // pixels/second (negative y is up)

  game.physics.arcade.enable(leafy);
  leafy.enableBody = true;
  leafy.body.gravity.y = 2600;
  leafy.body.maxVelocity.x = 500;
  leafy.body.maxVelocity.y = 5000;
  leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted
  leafy.body.drag.setTo(600, 0);

  leafy.jumping = false;

  // jump/edge timing for a better feel
  leafy.edgeTimer = 0;
  leafy.allowJumpTimer = 0;
  leafy.wasStanding = false;


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


  // death
  leafy.kill = function() {

    this.alive = false;
    this.body.velocity.setTo(0,0);
    this.animations.stop();
    this.animations.play('sad');

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

  // move left
  if (game.cursors.left.isDown || (game.input.pointer1.x < game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = (leafy.playerSpeed * -1);
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

  // World fallout
  if (leafy.body.y > (game.height - leafy.height) && leafy.alive) {
    leafy.kill();
    console.log('^^^died fall^^^');
  }





  // Set a variable that is true when the player is touching the ground
  var onTheGround = leafy.body.touching.down;

  // If the player is touching the ground, let him have 2 jumps
  if (onTheGround) {
    leafy.jumps = 1;
    leafy.jumping = false;
  }

  // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
  if (leafy.jumps > 0 && upInputIsActive(210)) {
    leafy.body.velocity.y = leafy.JUMP_SPEED;
    leafy.jumping = true;
    leafy.animations.play('jump');
  }

  // Reduce the number of available jumps if the jump input is released
  if (leafy.jumping && upInputReleased()) {
    leafy.jumps--;
    leafy.jumping = false;
  }



  // // No longer standing on the edge, but were
  // // Give them a grace period to jump after falling
  // if ( allowJump(leafy) ) {

  //   // player jump
  //   if ( pressedJump()  ) {
  //     //console.log('jump pressed');

  //     console.log('leafyJump()');
  //     leafyJump(leafy);

  //   }

  // }

}

function pressedJump() {
  if ( (game.cursors.up.isDown || game.jumpButton.isDown || (game.input.pointer1.y < game.height/2 && game.input.pointer1.isDown) || (game.input.pointer2.isDown)) ) {
    return true;
    leafy.jumpFrames = 1;
  }
}

function allowJump(leafy) {
  if ((leafy.standing || game.time.time <= leafy.edgeTimer) && game.time.time > leafy.allowJumpTimer) {
    return true;
  }  
}

function leafyJump(leafy) {
  leafy.animations.play('jump');
  leafy.body.velocity.y = leafy.jumpHeight;
  console.log( leafy.jumpHeight );
  leafy.allowJumpTimer = game.time.time + 750; // magic number, [todo] tune for gameplay
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


function upInputIsActive(duration) {
    var isActive = false;

    isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= (game.input.activePointer.justPressed(duration + 1000/60) &&
        game.input.activePointer.x > game.width/4 &&
        game.input.activePointer.x < game.width/2 + game.width/4);

    return isActive;
};

// This function returns true when the player releases the "jump" control
function upInputReleased() {
    var released = false;

    released = game.input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= game.input.activePointer.justReleased();

    return released;
};
