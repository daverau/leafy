// # Update
function update() {

  game.physics.arcade.collide(game.leafy, game.ground);

  game.leafy.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      game.leafy.body.velocity.x = -250;
  }
  else if (cursors.right.isDown)
  {
      game.leafy.body.velocity.x = 250;
  }

  if (jumpButton.isDown && (game.leafy.body.onFloor() || game.leafy.body.touching.down))
  {
      game.leafy.body.velocity.y = -400;
  }

}