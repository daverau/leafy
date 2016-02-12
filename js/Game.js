BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

  create: function () {


    // # World gen
    console.log('world size: ' + vars.worldSize);
    this.world.setBounds(0, 0, vars.worldSize, game.height);
    game.camera.bounds.setTo(null,null);
    game.camera.bounds.height = game.height;

    game.camera.deathTween = game.add.tween(game.camera).to({
      y: 2000
    }, 3000, Phaser.Easing.Cubic.Out);


    // # Inputs
    game.cursors = this.input.keyboard.createCursorKeys();
    game.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // # Background images
    game.bgnight = game.add.sprite(game.width,game.height, 'bgnight');
    game.bgnight.fixedToCamera = true;
    game.bgnight.anchor.setTo(1);

    //this.bg = this.add.sprite(game.width,game.height, 'bgnight');
    //this.bg.anchor.setTo(1);


    // # Sound
    game.sfxbgnoise = game.add.audio('bgnoise');
    game.sfxbuzz = game.add.audio('buzz');
    game.sfxding = game.add.audio('ding');
    game.sfxding.allowMultiple = true;


    // # Draw game objects
    drawMoon();
    genStump(); // move
    genTrees();
    genOwl();   // move
    game.leafy = genLeafy();
    genBlueleaves();
    genFlowers();
    //genForetrees(); // redo
    

    // # Platforms
    game.platforms = game.add.group();
    game.platforms.enableBody = true;
    game.platforms.createMultiple(vars.platforms, 'tree', false);
    game.platforms.setAll('body.immovable', true);
    //resetPlatforms();
    placePlatforms();


    // # Bees
    genBees(1);


    // # Rain
    //genRain();


    // testing...
    //genEasyPlatorms();


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

  },


  update: function () {


    // # Music
    if(!game.sfxbgnoise.isPlaying){
     game.sfxbgnoise.play();
    }


    // # Collisions
    this.physics.arcade.collide(game.leafy, game.platforms, platformTouch, null, this);      
    this.physics.arcade.collide(game.leafy, game.easyPlatorms, null, null, this);      
    this.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
    this.physics.arcade.overlap(game.leafy, game.flowers, passFlower, null, this);
    this.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);
  
    // owl
    if (game.owl) {
      if (checkOverlap(game.leafy, game.owl)) { passOwl(); }
    }


    // # UI
    game.flowersText.setText(game.leafy.flowers);
    game.blueLeafText.setText(game.leafy.blueLeafCount);
    game.fps.setText(game.time.fps + "fps");
    game.scoreText.setText(game.leafy.score);


    // World fallout
    if (game.leafy.body.y > (game.height - game.leafy.height) && game.leafy.alive) {
      game.leafy.kill();
      console.log('^^^died fall^^^');
    }


    // # Leafy movement and Respawn
    game.leafy.body.velocity.x = 0;
    if (!game.leafy.alive && !game.rewpawning) {
      game.rewpawning = true;
      game.leafy.kill();
      console.log('^^^died !alive^^^');
      //this.state.start('Retry');
    } else {
      playerMove(game.leafy);
    }

    // standing ...
    game.leafy.wasStanding = game.leafy.standing;


    // # world fallout
    if (game.leafy.body.y > (game.height * 2) ) {
      //console.log( 'kill leafy' );
      //game.leafy.kill();
      console.log('^^^world fallout^^^');
      //this.state.start('MainMenu');
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
