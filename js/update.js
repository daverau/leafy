// # Update
function update() {

  // bg noise
  if(!game.sfxbgnoise.isPlaying){
    game.sfxbgnoise.play();
  }

  // collide with ground
  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.collide(game.blueleaves, game.ground);

  // collide with player
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
  game.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);
  //game.physics.arcade.overlap(game.leafy, game.emitter, passRain, null, this);

  // owl
  if (checkOverlap(game.leafy, game.owl)) {
    passOwl();
  }

  // rain
  // if (checkOverlap(game.leafy, game.emitter)) {
  //   console.log('raindrop');
  //   //passRain();
  // }

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




function passStump() {
  //console.log('Stump says hi!');
}

function passRain(leafy, leaf) {
  console.log('rain');
  if (!leaf.played) {
    //console.log('drop');
    leaf.played=true;
    game.blueLeafCount += 1;
    game.sfxding.play();
    game.blueLeafText.text = game.blueLeafCount;

    // [todo] match tween y value from blueLeaf pickup function
    leaf.tween = game.add.tween(leaf)
      .to({
        alpha: 0
      }, 1000, Phaser.Easing.Cubic.Out);
    leaf.tween.onComplete.add(function(leaf, tween) {
      leaf.kill();
    });
    leaf.tween.start();
  }
}

function passOwl(leafy, owl) {
  // console.log('Owl says hi!');
  // owl should fly away if you don't have enough blue leaves yet...
  if (!game.owl.flying) {
    //console.log('go fly');
    game.owl.flying = true;
    owlFlyaway(leafy, owl);
  }
}
function owlFlyaway(leafy, owl) {
  //console.log('flying');
  game.sfxhoot.play();
  game.owl.animations.play('flap');
  var randomx = (Math.random()*2000+1); // magic number
  randomx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  var t = game.add.tween(game.owl).to( { x: (game.stump.x + randomx ), y: (game.stump.y - 1500) }, 3000, null, true); // [todo] move out once I build new interactions for later play
  t.onComplete.add(owlFlytostump, this);
}

function owlFlytostump() {
  game.owl.animations.play('flap');
  var t = game.add.tween(game.owl).to( { x: (game.stump.x - 55), y: (game.stump.y - 90) }, 10000, null, true); // [todo] move out once I build new interactions for later play
  t.onComplete.add( stopOwl , this);
}

function stopOwl() {
  game.owl.animations.play('sit');
  game.owl.flying = false;
}

function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup=true;
    game.blueLeafCount += 1;
    game.sfxding.play();
    game.blueLeafText.text = game.blueLeafCount;
    leaf.tween.start();
  }
  //game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;
}

function passTree(leaf, tree) {
  if (!tree.walkedPassed) {
    //console.log(tree.key+ ' says hi!');
    tree.walkedPassed = true;
  }
  //tree.tint = '0xcccccc'
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}


// # Plant trees

// if (shootButton.isDown) {
//   fire();
// }

// var fireRate = 10;
// var shootTimer = game.time.now + fireRate;

// function fire() {
//   if (game.time.now > shootTimer) {
//       shootTimer = game.time.now + fireRate;
//       block = blocks.create(player.x + 50, player.y, 'block');
//       block.body.immovable = true;
//       block.body.collideWorldBounds = true;
//       block.body.velocity.x = 400;
//   }
// }

// [question] this should be in phaser, right?
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
