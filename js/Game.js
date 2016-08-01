BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

create: function () {
  game.forceSingleUpdate = true;

  // show ui
  document.getElementById('refresh').classList.add('hide');
  document.getElementById('ui').classList.remove('hide');

  // # Sound
  game.sfxbgnoise = game.add.audio('bgnoise');
  game.sfxbuzz = game.add.audio('buzz');
  game.sfxding = game.add.audio('ding');
  game.sfxding.allowMultiple = true;

  // # Draw game objects
  drawBG('80AFBE', '261B28');
  genClouds();
  drawWaves(game);
  drawMoon();
  genTrees(game.trees, true);
  game.leafy = genLeafy();
  genCoins();
  genFlowers();

  // # Platforms
  game.finalPlatform = false;
  game.platforms = game.add.group();
  addPlatform(1);
  addPlatform(2);
  addPlatform(3);
  addPlatform(4);
  addPlatform(5);
  addPlatform(6);
  addPlatform(7);
  addPlatform(8);
  addPlatform(9);

  // nice continue platform for other levels
  game.platforms.children[0].x = 100;
  game.platforms.children[0].width = game.width / 2;

  // nice starter platforms for level 1
  if (isLevel() === 1) {
    game.platforms.children[0].x = 0;
    game.platforms.children[0].width = game.width;
    game.platforms.children[1].x = game.width + 100;
    game.platforms.children[1].width = 360;
    placeCoins(game.platforms.children[1]);
  }

  genLevelText();
  genBees(vars.startBees);

  // # Rain
  // genRain();

  // # UI
  genUI();
  // update score and UI counts
  game.scoreText.setText(vars.score);
  game.flowersText.setText(game.leafy.flowers);
  game.blueLeafText.setText(game.leafy.blueLeafCount);

  // score timer
  game.time.events.loop(60, updateScore, this);

  // music
  game.music = game.add.audio('bgmusic');
  game.music.loop = true;
  game.music.play();
},


update: function () {
  if (game.leafy.alive) {

    // # UI
    vars.score += 1;

    // World fallout
    if (game.leafy.body.y > (game.height - game.leafy.height)) {
      //game.leafy.kill();
      //game.leafy.jumps = 0;
      game.leafy.body.position.y = -100; // never die

      if (window.ga) {
        window.ga.trackEvent('Player', 'Death', 'Fallout', vars.score);
      }
    }
  }

  // # Leafy movement and Respawn
  game.leafy.body.velocity.x = 0;
  if (!game.leafy.alive && !game.rewpawning) {

    game.rewpawning = true;
    game.leafy.kill();

  } else {

    // # Collisions
    this.physics.arcade.collide(game.leafy, game.platforms, platformTouch, null, this);
    this.physics.arcade.overlap(game.leafy, game.coins, passBlueleaf, null, this);
    this.physics.arcade.overlap(game.leafy, game.flowers, passFlower, null, this);
    this.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);

    // owl
    if (game.owl.alive) {
      if (checkOverlap(game.leafy, game.owl)) { passOwl(); }
    }

    if (vars.score > vars.winScore && !game.finalPlatform) {
      game.finalPlatform = true;
      addFinalPlatform();
    }

    playerMove(game.leafy);
  }

  // standing ...
  game.leafy.wasStanding = game.leafy.standing;

  // # world fallout
  if (game.leafy.y > (game.height * 2) ) {
    this.state.start('GameOver');
  }
},

quitGame: function (pointer) {
  // Destroy no longer need music+sprites
  this.state.start('MainMenu');
},

render: function () {
  //console.log('render');
  //game.debug.pointer( game.input.activePointer );
  //game.debug.body( game.leafy );
}

};
