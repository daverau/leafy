// Leafy setup
function genLeafy() {
  game.leafy = game.add.sprite( 50 , -100, 'leafy');
  game.leafy.anchor.setTo(0.5, 1); //flip at middle point
  game.leafy.playerSpeed = 150 * vars.ratio;
  game.leafy.jumpHeight = -800;
  game.leafy.alive = true;
  game.leafy.score = 0;
  game.leafy.blueLeafCount=0;
  game.leafy.honeyCount = 0;
  game.leafy.flowers = 10;  
  game.leafy.bestScore = localStorage.getItem("leafybestScore") == null ? 0 : localStorage.getItem("leafybestScore");

  game.camera.follow(game.leafy);

  game.physics.arcade.enable(game.leafy);
  // not using these but keeping around for later since new phaser may work better here
  // game.leafy.checkWorldBounds = true;
  // game.leafy.outOfBoundsKill = true;
  game.leafy.enableBody = true;
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  game.leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted

  // jump/edge timing for a better feel
  game.leafy.edgeTimer = 0;
  game.leafy.jumpTimer = 0;
  game.leafy.wasStanding = false;


  // animation
  game.leafy.deathTween = game.add.tween(game.leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);

  // player score
  game.leafyText = game.add.text( game.leafy.x, game.leafy.y, '+200', { font: (14*vars.ratio)+"px Avenir-Medium", fill: '#F5A623' });
  game.leafyText.tween = game.add.tween(game.leafyText).to({
    alpha: 0,
    y: (game.leafyText.y + 400)
  }, 2000, Phaser.Easing.Cubic.Out);
  game.leafyText.anchor.set(0.5)

  // animations
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);
  game.leafy.animations.add('sad', [8], 0, true);
  game.leafy.animations.add('surprised', [9], 0, true);
  game.sfxfall = game.add.audio('fall');


  // death
  game.leafy.kill = function() {

    this.alive = false;
    this.body.velocity.setTo(0,0);
    this.animations.stop();
    this.animations.play('sad');

    // fall
    game.sfxfall.play();
    game.leafy.body.gravity.y = 500;
    game.leafy.body.maxVelocity.y = 2500;

    // score
    localStorage.setItem("leafybestScore", Math.max(game.leafy.score, game.leafy.bestScore));

    // camera fall
    game.leafy.cameraFall = game.add.tween(game.camera.bounds).to( { 
      height: game.height*3
    }, 3000);
    game.leafy.cameraFall.start();
    
    // animate world
    this.deathTween.start();
    game.moon.deathTween.start();
    game.ui.deathTween.start();
    game.platforms.destroy();
    game.bgnight.tween = game.add.tween(game.bgnight).to( { 
      alpha: 0
    }, 2000);
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

}


function playerMove(leafy) {

  // move left
  if (game.cursors.left.isDown || (game.input.pointer1.x < game.width/2 && game.input.pointer1.isDown) ) {

    game.leafy.animations.play('walk');
    game.leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      game.leafy.facing = 'left';
      game.leafy.scale.x = -1; //flipped
    }

  // moveright
  } else if (game.cursors.right.isDown || (game.input.pointer1.x > game.width/2 && game.input.pointer1.isDown) ) {

    game.leafy.animations.play('walk');
    game.leafy.body.velocity.x = game.leafy.playerSpeed;
    if (leafy.facing != 'right') {
      game.leafy.scale.x = 1; //default direction
      game.leafy.facing = 'right';
    }

  // idle
  } else if (game.leafy.facing != 'idle') {
    
    game.leafy.animations.play('turn');
    if (leafy.facing == 'left') {
      game.leafy.frame = 0;
    } else {
      game.leafy.frame = 5;
    }
    game.leafy.facing = 'idle';
  }

  // walk animation
  if (game.cursors.left.isDown || game.cursors.right.isDown && (game.leafy.body.onFloor() || game.leafy.body.touching.down)) {
    game.leafy.animations.play('walk');
  }

  // kill on world fallout
  // using this since I couldn't get this version of phaser to obey outofboundskill
  if (game.leafy.body.y > (game.height - 150) && game.leafy.alive) {
    game.leafy.kill();
    // game.leafy.alive = false;
    console.log('^^^died fall^^^');
  }



  // player jump
  // [todo] clean this unreadable && || mess up!
  // (this.swipe.isDown && (this.swipjumpButtone.positionDown.y > this.swipe.position.y))
  // removing this
  // && (leafy.body.onFloor() || game.leafy.body.touching.down)
  if ( (game.cursors.up.isDown || game.jumpButton.isDown || (game.input.pointer1.y < game.height/2 && game.input.pointer1.isDown) || (game.input.pointer2.isDown))  ) {

    console.log('jump pressed');
    // No longer standing on the edge, but were
    // Give them a 250ms grace period to jump after falling
    if ((game.leafy.standing || game.time.time <= game.leafy.edgeTimer) && game.time.time > game.leafy.jumpTimer) {
      console.log('call leafyJump()');
      leafyJump();
    }

  }




}

function leafyJump() {
  game.leafy.animations.play('jump');
  game.leafy.body.velocity.y = game.leafy.jumpHeight;
  game.leafy.jumpTimer = game.time.time + 750;
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
