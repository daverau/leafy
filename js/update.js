// # Update
function update() {

  // bg noise
  if(!game.sfxbgnoise.isPlaying){
    game.sfxbgnoise.play();
  }

  // collide with ground
  game.physics.arcade.collide(game.leafy, game.ground);
  game.physics.arcade.collide(game.blueleaves, game.ground);
  //game.physics.arcade.collide(game.emitter, game.ground);

  // collide with player
  game.physics.arcade.overlap(game.leafy, game.trees, passTree, null, this);
  game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
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

function passRain(leafy, leaf) {
  if (!leaf.played) {
    console.log('drop');
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
    console.log('go fly');
    game.owl.flying = true;
    owlFlyaway(leafy, owl);
  }
}
function owlFlyaway(leafy, owl) {
  console.log('flying');
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
    console.log('pass blue leaf');
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
    console.log(tree.key+ ' says hi!');
    tree.walkedPassed = true;
  }
  //console.log(this);
  //tree.kill();
  //tree.tint = '0xcccccc'
  //tree.alpha = .1;
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}