// Leafy setup
function genLeafy() {
  var leafy = {};

  leafy = game.add.sprite( 50 , -100, 'leafy');
  leafy.anchor.setTo(0.5, 1); //flip at middle point
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.jumpHeight = -800;
  leafy.alive = true;
  leafy.score = 0;
  leafy.blueLeafCount=0;
  leafy.honeyCount = 0;
  leafy.flowers = 10;  
  leafy.bestScore = localStorage.getItem("leafybestScore") == null ? 0 : localStorage.getItem("leafybestScore");

  game.camera.follow(leafy);

  game.physics.arcade.enable(leafy);
  // not using these but keeping around for later since new phaser may work better here
  // game.leafy.checkWorldBounds = true;
  // game.leafy.outOfBoundsKill = true;
  leafy.enableBody = true;
  leafy.body.gravity.y = 1000;
  leafy.body.maxVelocity.y = 500;
  leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted

  // jump/edge timing for a better feel
  leafy.edgeTimer = 0;
  leafy.jumpTimer = 0;
  leafy.wasStanding = false;


  // animation
  leafy.deathTween = game.add.tween(leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);

  // player score
  game.leafyText = game.add.text( leafy.x, leafy.y, '+200', { font: (14*vars.ratio)+"px Avenir-Medium", fill: '#F5A623' });
  game.leafyText.tween = game.add.tween(game.leafyText).to({
    alpha: 0,
    y: (game.leafyText.y + 400)
  }, 2000, Phaser.Easing.Cubic.Out);
  game.leafyText.anchor.set(0.5)

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
    leafy.body.gravity.y = 500;
    leafy.body.maxVelocity.y = 2500;

    // score
    localStorage.setItem("leafybestScore", Math.max(leafy.score, leafy.bestScore));

    // camera fall
    leafy.cameraFall = game.add.tween(game.camera.bounds).to( { 
      height: game.height*3
    }, 3000);
    leafy.cameraFall.start();
    
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

  return leafy;

}


function playerMove(leafy) {

  // move left
  if (game.cursors.left.isDown || (game.input.pointer1.x < game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  // moveright
  } else if (game.cursors.right.isDown || (game.input.pointer1.x > game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = leafy.playerSpeed;
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

  // walk animation
  if (game.cursors.left.isDown || game.cursors.right.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
    leafy.animations.play('walk');
  }

  // kill on world fallout
  // using this since I couldn't get this version of phaser to obey outofboundskill
  if (leafy.body.y > (game.height - 150) && leafy.alive) {
    leafy.kill();
    // game.leafy.alive = false;
    console.log('^^^died fall^^^');
  }

  // player jump
  // [todo] add swipe up to jump
  // (this.swipe.isDown && (this.swipjumpButtone.positionDown.y > this.swipe.position.y))
  if ( (game.cursors.up.isDown || game.jumpButton.isDown || (game.input.pointer1.y < game.height/2 && game.input.pointer1.isDown) || (game.input.pointer2.isDown))  ) {

    console.log('jump pressed');
    // No longer standing on the edge, but were
    // Give them a 250ms grace period to jump after falling
    if ((leafy.standing || game.time.time <= leafy.edgeTimer) && game.time.time > leafy.jumpTimer) {
      console.log('call leafyJump()');
      leafyJump(leafy);
    }

  }

}

function leafyJump(leafy) {
  leafy.animations.play('jump');
  leafy.body.velocity.y = leafy.jumpHeight;
  leafy.jumpTimer = game.time.time + 750;
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
