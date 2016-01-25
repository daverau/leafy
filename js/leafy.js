// Leafy setup
function genLeafy() {
  game.leafy = game.add.sprite( 50 , -100, 'leafy');
  game.leafy.anchor.setTo(0.5, 1); //flip at middle point
  game.leafy.playerSpeed = 150 * vars.ratio;
  game.leafy.jumpHeight = -800;
  game.leafy.alive = true;

  game.camera.follow(game.leafy);
  //game.camera.focusOnXY(game.leafy.position.x, 0);

  game.leafy.blueLeafCount=0;
  game.leafy.honeyCount = 0;
  game.leafy.flowers = 8;  

  game.physics.arcade.enable(game.leafy);
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  game.leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted
  game.leafy.enableBody = true;

  game.leafy.checkWorldBounds = true;
  game.leafy.outOfBoundsKill = true;

  // player score
  game.leafyText = game.add.text( game.leafy.x, game.leafy.y, '+200', { font: (16*vars.ratio)+"px Arial", fill: '#F5A623' });
  game.leafyText.tween = game.add.tween(game.leafyText).to({
    alpha: 0,
    y: (game.leafyText.y - 40)
  }, 3000, Phaser.Easing.Cubic.Out);


  // animations
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);
}

function playerMove(leafy) {

  // CSS canvas scaling for retina causes pointer alignment to be off by the device ratio, so we multiply that as an offset:
  // game.input.pointer1.x*window.devicePixelRatio
  if (game.cursors.left.isDown || ((game.input.pointer1.x*window.devicePixelRatio) < game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  } else if (game.cursors.right.isDown || ((game.input.pointer1.x*window.devicePixelRatio) > game.width/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = leafy.playerSpeed;
    if (leafy.facing != 'right') {
      leafy.scale.x = 1; //default direction
      leafy.facing = 'right';
    }

  } else if (leafy.facing != 'idle') {
    
    leafy.animations.play('turn');
    if (leafy.facing == 'left') {
      leafy.frame = 0;
    } else {
      leafy.frame = 5;
    }
    leafy.facing = 'idle';
  }

  // walk when moving left or right (correctly continues playing)
  if (game.cursors.left.isDown || game.cursors.right.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
    leafy.animations.play('walk');
  }

  // player jump
  // (this.swipe.isDown && (this.swipjumpButtone.positionDown.y > this.swipe.position.y))
  if ( (game.cursors.up.isDown || game.jumpButton.isDown || ((game.input.pointer1.y*window.devicePixelRatio) < game.height/2 && game.input.pointer1.isDown) || (game.input.pointer2.isDown)) && (leafy.body.onFloor() || leafy.body.touching.down) ) {
      leafy.animations.play('jump');
      //console.log('jump: '+leafy.jumpHeight);
      leafy.body.velocity.y = leafy.jumpHeight;

  }

}


function gapTouch(leafy, gap) {
  if (!gap.touched) {
    console.log('gap touch');
    gap.touched = true;
    //console.log((gap.score*vars.ratio)/45+' points');
    console.log(gap.score);
    game.leafyText.setText( gap.score +'in');
    //game.leafyText.setText( Math.ceil((gap.score*vars.ratio)/45) +' steps');

    // set jump score so it follows Leafy around
    game.leafyText.alpha = 1;
    game.leafyText.x = ((game.leafy.x/2) * vars.ratio) - game.leafyText.width;
    game.leafyText.y = (game.leafy.y/2 - 100) * vars.ratio;

    game.leafyText.tween.delay(500).start();
    gap.alpha = .5;
  }
}

function respawn(leafy) {
  //console.log('respawn');
  leafy.body.position.x = 50;
  leafy.body.position.y = -100;
  leafy.body.velocity.x = 0;
  leafy.body.velocity.y = 0;
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.revive();
}
