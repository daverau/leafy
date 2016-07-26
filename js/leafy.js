// Leafy setup
function genLeafy() {
  var leafy = game.add.sprite( vars.leafyXposition , -100, 'leafy-red');
  leafy.anchor.setTo(0.5, .35); //flip at middle point
  leafy.alive = true;
  leafy.jumping = false;
  leafy.maxJumps = vars.leafyJumps;

  // scores
  leafy.score = 0;
  leafy.blueLeafCount = localStorage.getItem("leafyblueLeafCount") === null ? 0 : localStorage.getItem("leafyblueLeafCount");
  leafy.flowers = localStorage.getItem("leafyFlowerCount") === null ? 0 : localStorage.getItem("leafyFlowerCount");
  leafy.bestScore = localStorage.getItem("leafybestScore") === null ? 0 : localStorage.getItem("leafybestScore");
  leafy.jumpsScore = 0;

  // score reset
  leafy.resetScores = function() {
    leafy.score = 0;
    leafy.blueLeafCount = 0;
    leafy.flowers = 0;
    leafy.bestScore = 0;
    leafy.jumpsScore = 0;
  };

  // speed
  //game.camera.follow(leafy);

  // physics
  game.physics.arcade.enable(leafy);
  leafy.enableBody = true;

  leafy.body.gravity.y = vars.leafyGravity;
  leafy.body.velocity.x = 0;
  leafy.body.maxVelocity.x = 0;
  leafy.body.maxVelocity.y = vars.leafyMaxVelocityY;
  leafy.body.setSize(50, 110, 0, 0); // hitbox adjusted
  //leafy.body.drag.setTo(600, 0);

  // animation
  leafy.deathTween = game.add.tween(leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);
  game.camera.deathTween = game.add.tween(game.camera).to({
    y: 2000
  }, 3000, Phaser.Easing.Cubic.Out);

  leafy.spinTween = game.add.tween(leafy).to({
    angle: '+360'
  }, 450, Phaser.Easing.Linear.None);

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
  leafy.animations.add('jump', [3], 0, true);
  leafy.animations.add('sad', [8], 0, true);
  leafy.animations.add('surprised', [9], 0, true);
  game.sfxfall = game.add.audio('fall');
  leafy.sfxboing = game.add.audio('boing');
  leafy.sfxboing.allowMultiple = true;
  leafy.scale.x = 1; //default direction
  leafy.facing = 'right';

  // death
  leafy.kill = function() {
    this.jumps = 0;
    this.alive = false;
    this.body.velocity.setTo(0,0);
    this.enableBody = false;

    this.animations.stop();
    this.animations.play('sad');
    vars.triesScore++;

    // fall
    game.sfxfall.play();

    // score
    localStorage.setItem("leafybestScore", Math.max(leafy.score, leafy.bestScore));
    localStorage.setItem("leafyblueLeafCount", leafy.blueLeafCount);
    localStorage.setItem("leafyFlowerCount", leafy.flowers);

    // camera fall
    leafy.cameraFall = game.add.tween(game.camera.bounds).to( {
      height: game.height*3
    }, 2000);
    //leafy.cameraFall.start();

    // animate world
    this.deathTween.start();
    game.moon.deathTween.start();
    game.ui.deathTween.start();
    //game.platforms.destroy();
    // game.bgnight.tween = game.add.tween(game.bgnight).to( {
    //   alpha: 0
    // }, 1500);
    // game.bgnight.tween.start();
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
  //leafy.score = Math.round(leafy.x/10);
  leafy.animations.play('walk');

  // Jumping
  if (leafy.body.touching.down) {
    leafy.jumps = leafy.maxJumps; // If touching ground, give X jump
    leafy.jumping = false;
  } else {
    leafy.animations.play('jump');
  }
  // Jump! Keep y velocity constant while jump is held for up to X ms
  if (leafy.jumps > 0 && upInputIsActive(vars.leafyJumpConstant)) {
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
  leafy.body.velocity.y = vars.leafyJumpVelocityY;
  leafy.jumping = true;
  leafy.animations.play('jump');
  if (leafy.jumps === 1) {
    leafy.spinTween.start();
  }
  if (!leafy.playingSound) {
    leafy.playingSound = true;
    leafy.sfxboing.play('', 0, 1, false, false);
  }
}

function upInputIsActive(duration) {
  var isActive = false;
    isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= game.input.activePointer.justPressed(duration + 1000/60);
  return isActive;
  isActive = null;
}

// returns true when the player releases jump
function upInputReleased() {
    var released = false;
    released = game.input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= game.input.activePointer.justReleased();
    return released;
    released = null;
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
  leafy.revive();
}
