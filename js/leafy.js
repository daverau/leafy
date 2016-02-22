// Leafy setup
function genLeafy() {
  var leafy = game.add.sprite( 40 , -100, 'leafy');
  leafy.anchor.setTo(0.5, 1); //flip at middle point
  leafy.alive = true;
  leafy.jumping = false;
  
  // scores
  leafy.score = 0;
  leafy.blueLeafCount = localStorage.getItem("leafyblueLeafCount") === null ? 0 : localStorage.getItem("leafyblueLeafCount");
  leafy.flowers = localStorage.getItem("leafyFlowerCount") === null ? 0 : localStorage.getItem("leafyFlowerCount");
  leafy.bestScore = localStorage.getItem("leafybestScore") === null ? 0 : localStorage.getItem("leafybestScore");
  leafy.jumpsScore = 0;

  // speed
  game.camera.follow(leafy);
  leafy.playerSpeed = 160 * vars.ratio;
  //leafy.playerSpeed = 0;
  leafy.ACCELERATION = 2000; // pixels/second/second
  leafy.JUMP_SPEED = -750; // pixels/second (negative y is up)

  // physics
  game.physics.arcade.enable(leafy);
  leafy.enableBody = true;
  leafy.body.gravity.y = 3000;
  leafy.body.velocity.x = 0;
  leafy.body.maxVelocity.x = 500;
  leafy.body.maxVelocity.y = 4000;
  leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted
  //leafy.body.drag.setTo(600, 0);

  // animation
  leafy.deathTween = game.add.tween(leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);
  game.camera.deathTween = game.add.tween(game.camera).to({
    y: 2000
  }, 3000, Phaser.Easing.Cubic.Out);

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
    localStorage.setItem("leafyblueLeafCount", leafy.blueLeafCount);
    localStorage.setItem("leafyFlowerCount", leafy.flowers);

    // camera fall
    leafy.cameraFall = game.add.tween(game.camera.bounds).to( { 
      height: game.height*3
    }, 2000);
    leafy.cameraFall.start();
    
    // animate world
    this.deathTween.start();
    game.moon.deathTween.start();
    game.ui.deathTween.start();
    //game.platforms.destroy();
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

    // only for newer phaser 2.4.4+
    if (this.events) {
      this.events.onKilled$dispatch(this);
    }
    return this;
  };
  return leafy;
}

function playerMove(leafy) {
  leafy.scale.x = 1; //default direction
  leafy.facing = 'right';
  leafy.score = Math.round(leafy.x/10);

  // always run to the right
  leafy.animations.play('walk');
  leafy.body.velocity.x = leafy.playerSpeed;

  // Jumping
  var onTheGround = leafy.body.touching.down; // [todo] refine for only platforms to fix double jump bug
  if (onTheGround) {
    leafy.jumps = 2; // If touching ground, give X jump
    leafy.jumping = false;
  } else {
    leafy.animations.play('jump');
  }
  // Jump! Keep y velocity constant while jump is held for up to X ms
  if (leafy.jumps > 0 && upInputIsActive(210)) {
    leafyJump(leafy);
  }
  // Reduce the number of available jumps if jump is released
  if (leafy.jumping && upInputReleased()) {
    leafy.jumps--;
    leafy.jumping = false;
    leafy.playingSound = false;
  }
}

function leafyJump(leafy) {
  leafy.body.velocity.y = leafy.JUMP_SPEED;
  leafy.jumping = true;
  leafy.animations.play('jump');
  if (!leafy.playingSound) {
    leafy.playingSound = true;
    leafy.sfxboing.play('',0,1,false,false);
  }
}

function upInputIsActive(duration) {
  var isActive = false;
    isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= game.input.activePointer.justPressed(duration + 1000/60);
  return isActive;
}

// returns true when the player releases jump
function upInputReleased() {
    var released = false;
    released = game.input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= game.input.activePointer.justReleased();
    return released;
}

function touchPlatformScore(leafy, score) {
  // set jump score so it follows Leafy around
  leafy.leafyText.tween.stop();
  leafy.leafyText.tween.pendingDelete = false; // http://www.html5gamedevs.com/topic/16641-restart-tween/
  
  leafy.leafyText.setText( score );
  // # jump-based scoring, consider bonus points later or highscore best jump
  // if (game.leafy.score === 0) {
  //   game.leafy.score = 1;
  // } else {
  //   game.leafy.score = Number(platform.score) + Number(game.leafy.score);
  // }

  leafy.leafyText.alpha = 1;
  leafy.leafyText.x = ((game.leafy.x/2) * vars.ratio);
  leafy.leafyText.y = (game.leafy.y/2 - 80) * vars.ratio;
  leafy.leafyText.tween.delay(140).start();
  leafy.jumpsScore++;
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