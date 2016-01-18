// # Update
function update() {

  // bg noise
  if(!game.sfxbgnoise.isPlaying){
    game.sfxbgnoise.play();
  }

  // collisions
  game.physics.arcade.collide(game.leafy, game.ground);
  //game.physics.arcade.collide(game.blueleaves, game.ground);
  game.physics.arcade.collide(game.leafy, game.gaps);
  //game.physics.arcade.collide(game.blueleaves, game.gaps);
  game.physics.arcade.collide(game.leafy, game.playerTrees);

  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.playerTrees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
  game.physics.arcade.overlap(game.leafy, game.flowers, passFlower, null, this);
  game.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);
  //game.physics.arcade.overlap(game.leafy, game.gaps, hitGap, null, this);
  if (checkOverlap(game.leafy, game.owl)) { passOwl(); }
  //if (checkOverlap(game.leafy, game.flowers)) { passFlower(game.leafy, game.flowers); }

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
  game.fps.setText(game.time.fps + "fps");
  game.flowersText.setText(game.leafy.flowers);
  game.blueLeafText.setText(game.blueLeafCount);

}


// utility
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
