// Leafy setup
function genLeafy() {
  game.leafy = game.add.sprite( 50 , -100, 'leafy');
  game.leafy.anchor.setTo(0.5, 1); //flip at middle point
  game.leafy.playerSpeed = 150 * vars.ratio;
  game.leafy.jumpHeight = -800;
  game.leafy.alive = true;
  game.leafy.score = 0;

  game.camera.follow(game.leafy);
  //game.camera.focusOnXY(game.leafy.body.x, 0);

  game.leafy.blueLeafCount=0;
  game.leafy.honeyCount = 0;
  game.leafy.flowers = 0;  

  game.physics.arcade.enable(game.leafy);
  game.leafy.enableBody = true;
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  game.leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted

  game.leafy.deathTween = game.add.tween(game.leafy).to({
    alpha: 0,
    angle: 30
  }, 1500, Phaser.Easing.Cubic.Out);

  // game.leafy.checkWorldBounds = true;
  // game.leafy.outOfBoundsKill = true;

  // player score
  game.leafyText = game.add.text( game.leafy.x, game.leafy.y, '+200', { font: (14*vars.ratio)+"px Arial", fill: '#F5A623' });
  game.leafyText.tween = game.add.tween(game.leafyText).to({
    alpha: 0,
    y: (game.leafyText.y + 400)
  }, 2000, Phaser.Easing.Cubic.Out);
  game.leafyText.anchor.set(0.5)

  // animations
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);
  game.sfxfall = game.add.audio('fall');

  // death animation
  game.leafy.kill = function() {

    game.sfxfall.play();

    game.add.tween(game.camera.bounds).to( { 
      height: game.height*2
    }, 1000, Phaser.Easing.Cubic.Out);

    this.alive = false;
    this.body.velocity.setTo(0,0);
    this.animations.stop();
    //this.animations.play('die');

    game.camera.bounds.height = game.height*2;
    this.deathTween.start();
    game.moon.deathTween.start();
    game.ui.deathTween.start();

    game.platforms.destroy();

    this.events.onAnimationComplete.addOnce(function() {
        this.exists = true;
        this.visible = false;
        this.events.destroy();
    }, this);

    // if (this.events) {
    //     this.events.onKilled$dispatch(this);
    // }

    return this;
  };

}


function playerMove(leafy) {

  // move left
  if (game.cursors.left.isDown || ((game.input.pointer1.x*window.devicePixelRatio) < game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  // moveright
  } else if (game.cursors.right.isDown || ((game.input.pointer1.x*window.devicePixelRatio) > game.width/2 && game.input.pointer1.isDown) ) {

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
  if (game.leafy.body.y > (game.height - 150) && game.leafy.alive) {
    game.leafy.kill();
    // game.leafy.alive = false;
    console.log('^^^died fall^^^');
  }

  // player jump
  // [todo] clean this unreadable && || mess up!
  // (this.swipe.isDown && (this.swipjumpButtone.positionDown.y > this.swipe.position.y))
  if ( (game.cursors.up.isDown || game.jumpButton.isDown || ((game.input.pointer1.y*window.devicePixelRatio) < game.height/2 && game.input.pointer1.isDown) || (game.input.pointer2.isDown)) && (leafy.body.onFloor() || leafy.body.touching.down) ) {
    leafy.animations.play('jump');
    leafy.body.velocity.y = leafy.jumpHeight;
  }
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
