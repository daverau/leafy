BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

create: function () {
  game.forceSingleUpdate = true;

  // show ui
  document.getElementById('refresh').classList.add('hide');
  document.getElementById('ui').classList.remove('hide');

  // # World gen
  console.log('++world gen: ' + vars.worldSize + '++');
  this.world.setBounds(0, 0, vars.worldSize, game.height);

  // # Sound
  game.sfxbgnoise = game.add.audio('bgnoise');
  game.sfxbuzz = game.add.audio('buzz');
  game.sfxding = game.add.audio('ding');
  game.sfxding.allowMultiple = true;

  // # Draw game objects
  drawBG('80AFBE', '261B28');
  //drawBG('61C13C', '2D541A');
  // # Platforms
  game.platforms = game.add.group();
  addPlatform(1);
  game.platforms.children[0].x = 100;
  game.platforms.children[0].width = 600;
  addPlatform(2);
  addPlatform(3);
  addPlatform(4);
  addPlatform(5);
  addPlatform(6);
  addPlatform(7);
  addPlatform(8);
  addPlatform(9);

  drawWaves(game);
  drawMoon();
  genTrees(game.trees, true);
  genLevelText();
  game.leafy = genLeafy();
  genCoins();
  //genBlueRings();
  genFlowers();
  game.world.bringToTop(game.platforms);
  genBees(vars.startBees);

  // # Rain
  // commented until i figure out FPS/perf issues
  //genRain();

  // # UI
  genUI();

  // # bg gameover
  game.bggameover = this.add.sprite(0,0, 'bggameover');
  game.bggameover.alpha = 0;
  game.bggameover.width = game.width;
  game.bggameover.height = game.height;
  game.bggameover.fixedToCamera = true;
  game.bggameover.tween = this.add.tween(game.bggameover).to({
    alpha: 0.5,
  }, 4000, Phaser.Easing.Cubic.Out);

},


update: function () {

  // # UI
  game.flowersText.setText(game.leafy.flowers);
  game.blueLeafText.setText(game.leafy.blueLeafCount);
  game.fps.setText(game.time.fps + "fps");
  vars.score += 1;
  game.scoreText.setText(vars.score);

  // World fallout
  if (game.leafy.body.y > (game.height - game.leafy.height) && game.leafy.alive) {
    //game.leafy.kill();
    //game.leafy.jumps = 0;

    // never die!!!
    game.leafy.body.position.y = -100;
  }

  // # Leafy movement and Respawn
  game.leafy.body.velocity.x = 0;
  if (!game.leafy.alive && !game.rewpawning) {
    game.rewpawning = true;
    game.leafy.kill();
  } else {

    // # Collisions
    this.physics.arcade.collide(game.leafy, game.platforms, platformTouch, null, this);

    //this.physics.arcade.overlap(game.leafy, game.bluerings.children, passBlueleaf, null, this);
    this.physics.arcade.overlap(game.leafy, game.coins, passBlueleaf, null, this);
    this.physics.arcade.overlap(game.leafy, game.flowers, passFlower, null, this);
    this.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);

    // owl
    if (game.owl.alive) {
      if (checkOverlap(game.leafy, game.owl)) { passOwl(); }
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
