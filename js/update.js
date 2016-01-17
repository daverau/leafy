// # Update
function update() {

  // bg noise
  if(!game.sfxbgnoise.isPlaying){
    game.sfxbgnoise.play();
  }

  // collisions
  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.collide(game.blueleaves, game.ground);
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.playerTrees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
  game.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);
  if (checkOverlap(game.leafy, game.owl)) { passOwl(); }

  // leafy jump grounding
  game.leafy.body.velocity.x = 0;

  // respawn
  if (!game.leafy.alive) {
    respawn(game.leafy);
  } else {
    playerMove(game.leafy);
  }

  // # ui
  // [todo] rework with vue and DOM cause CSS is awesome
  game.distanceText.text = Math.round( ( Math.abs( Math.round( ( (vars.worldSize/2) - game.leafy.x ) / vars.ratio ) ) ) / 45 ) + " steps";
  //game.distanceText.text = Math.abs( Math.round( ( game.leafy.x ) / vars.ratio ) );
  game.fps.setText(game.time.fps + "fps");

}






// utility
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
