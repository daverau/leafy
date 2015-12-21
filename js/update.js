// # Update
function update() {

  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);


  game.leafy.body.velocity.x = 0;

  if (cursors.left.isDown) {
    game.leafy.body.velocity.x = (vars.playerSpeed * -1); // [todo] speed boost variable

    if (game.facing != 'left') {
      game.facing = 'left';
      game.leafy.scale.x = -.5; //flipped
    }
  } else if (cursors.right.isDown) {
    game.leafy.body.velocity.x = vars.playerSpeed;

    if (game.facing != 'right') {
      game.leafy.scale.x = .5; //game.facing default direction
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

}