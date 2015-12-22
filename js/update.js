// # Update
function update() {

  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);

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
      game.leafy.body.velocity.y = -400;
  }
  
  // respawn
  if (!game.leafy.alive) {
    restart();
  }

  // ui
  // [todo] rework with vue and DOM cause CSS is awesome
  //game.distanceText.text = Math.abs( Math.round( ( (vars.worldSize/2) - game.leafy.x ) / vars.ratio ) );

}

function restart() {
  console.log('restart');
  //game.leafy.resetPosition();
  game.leafy.alive=true;
}

function passTree(leafy, tree) {
  //tree.kill();
  //tree.tint = '0xcccccc'
  //tree.alpha = .1;
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}