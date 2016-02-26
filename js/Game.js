BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

create: function () {

  // vue debug test
  //vm.game = game;

  // # World gen
  console.log('++world gen: ' + vars.worldSize + '++');
  this.world.setBounds(0, 0, vars.worldSize, game.height);
  game.camera.bounds.setTo(null,null);
  game.camera.bounds.height = game.height;

  // # Inputs
  game.cursors = this.input.keyboard.createCursorKeys();
  //game.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  // # Background images
  // x/y game.width,game.height
  // x/y 0,0
  game.bgnight = game.add.sprite(game.width,game.height, 'bgnight');
  game.bgnight.fixedToCamera = true;
  game.bgnight.anchor.setTo(1);

  // waves bg
  this.waves = game.add.sprite(game.width,game.height, 'waves');
  this.waves.fixedToCamera = true;
  this.waves.anchor.setTo(1);
  this.waves.scale.setTo(0.5);
  this.waves.width = game.width;
  this.waves.alpha = 0.3;

  // # Sound
  game.sfxbgnoise = game.add.audio('bgnoise');
  game.sfxbuzz = game.add.audio('buzz');
  game.sfxding = game.add.audio('ding');
  game.sfxding.allowMultiple = true;

  // # Draw game objects
  drawMoon();
  //genStump(); // move
  genTrees();
  genLevelText();
  //genOwl();   // move
  game.leafy = genLeafy();
  //genBlueleaves();
  genFlowers();

  genBlueRings();
  //genForetrees(); // redo
  
  // # Platforms
  game.platforms = game.add.group();
  game.platforms.enableBody = true;
  game.platforms.createMultiple(vars.platforms, 'platform', false);
  game.platforms.setAll('body.immovable', true);
  placePlatforms();

  // nice first platform
  game.platforms.children[0].x = 0;
  game.platforms.children[0].width = 600;

  // # Bees
  genBees(1);

  // # Rain
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

  // # TEST
  //this.state.start('GameOver'); // test
  //game.leafy.playerSpeed = 0;

},


update: function () {

  // # Music
  if(!game.sfxbgnoise.isPlaying){
   game.sfxbgnoise.play();
  }

  // # UI
  game.flowersText.setText(game.leafy.flowers);
  game.blueLeafText.setText(game.leafy.blueLeafCount);
  game.fps.setText(game.time.fps + "fps");
  game.scoreText.setText(game.leafy.score);

  // World fallout
  if (game.leafy.body.y > (game.height - game.leafy.height) && game.leafy.alive) {
    game.leafy.kill();
    game.leafy.jumps = 0;
    //game.platforms.destroy();
    //console.log('^^^died fall^^^');
  }

  // # Leafy movement and Respawn
  game.leafy.body.velocity.x = 0;
  if (!game.leafy.alive && !game.rewpawning) {
    game.rewpawning = true;
    game.leafy.kill();
    //console.log('^^^died !alive^^^');
  } else {

    // # Collisions
    this.physics.arcade.collide(game.leafy, game.platforms, platformTouch, null, this);      
    this.physics.arcade.overlap(game.leafy, game.bluerings.children, passBlueleaf, null, this);
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
  if (game.leafy.body.y > (game.height * 2) ) {
    //console.log('^^^world fallout^^^');
    this.state.start('GameOver');
  }

  // test
  //this.state.start('GameOver');

},


quitGame: function (pointer) {

  // Here you should destroy anything you no longer need.
  // Stop music, delete sprites, purge caches, free resources, all that good stuff.
  this.state.start('MainMenu');

},

render: function () {

  //console.log('render');
  //game.debug.pointer( game.input.activePointer );
  //game.debug.body( game.bees.children[0] );

}

};
