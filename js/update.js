// # Update
function update() {

  // collide with ground
  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.collide(game.blueleaves, game.ground);

  // collide with player
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
  game.physics.arcade.overlap(game.leafy, game.owl, passOwl, null, this);
  game.physics.arcade.overlap(game.leafy, game.stump, passStump, null, this);

  // leafy jump grounding
  game.leafy.body.velocity.x = 0;

  if (cursors.left.isDown) {
    game.leafy.body.velocity.x = (vars.playerSpeed * -1); // [todo] speed boost variable

    if (game.facing != 'left') {
      game.facing = 'left';
      game.leafy.scale.x = -1; //flipped
    }
  } else if (cursors.right.isDown) {
    game.leafy.body.velocity.x = vars.playerSpeed;

    if (game.facing != 'right') {
      game.leafy.scale.x = 1; //default direction
      game.facing = 'right';
    }
  } else if (game.facing != 'idle') {
    game.leafy.animations.play('turn');

    if (game.facing == 'left') {
      game.leafy.frame = 0;
    } else {
      game.leafy.frame = 5;
    }

    game.facing = 'idle';
  }


  // walk when moving left or right (correctly continues playing)
  if (cursors.left.isDown || cursors.right.isDown && (game.leafy.body.onFloor() || game.leafy.body.touching.down)) {
    game.leafy.animations.play('walk');
  }

  if (jumpButton.isDown && (game.leafy.body.onFloor() || game.leafy.body.touching.down)) {
      game.leafy.animations.play('jump');
      game.leafy.body.velocity.y = vars.jumpHeight;
  }

  // respawn
  if (!game.leafy.alive) {
    respawn();
  }

  // # ui
  // [todo] rework with vue and DOM cause CSS is awesome
  game.distanceText.text = Math.round( ( Math.abs( Math.round( ( (vars.worldSize/2) - game.leafy.x ) / vars.ratio ) ) ) / 45 ) + " steps";
  //game.distanceText.text = Math.abs( Math.round( ( game.leafy.x ) / vars.ratio ) );
  game.fps.setText(game.time.fps + "fps");


}

function respawn() {
  console.log('respawn');
  // # player reset
  game.leafy.x=vars.worldSize/2;
  game.leafy.y=10;
  game.leafy.body.velocity.x = 0;
  game.leafy.body.velocity.y = 0;
  vars.playerSpeed = 150 * vars.ratio;
  // # unkill
  game.leafy.revive();
}

function passStump() {
  //console.log('Stump says hi!');
}

function passOwl() {
  // console.log('Owl says hi!');
  // owl should fly away if you don't have enough blue leaves yet...
  if (game.blueLeafCount < 10 && !vars.owlFlying) {
    console.log('go fly');
    vars.owlFlying = true;
    owlFlyaway();
  }
}
function owlFlyaway() {
  console.log('flying');
  game.owl.animations.play('fly');
  game.add.tween(game.owl).to( { x: game.owl.x - 1000, y: game.owl.y - 1000 }, 3000, null, true);
}

function passBlueleaf(leafy, leaf) {
  leaf.kill();
  game.blueLeafCount += 1;
  game.blueLeafText.text = game.blueLeafCount;
  game.sfxding.play();
}

function passTree(leafy, tree) {
  //console.log('Tree says hi!');
  //tree.kill();
  //tree.tint = '0xcccccc'
  //tree.alpha = .1;
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}