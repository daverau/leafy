BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

  create: function () {

    this.wraps = 0;
    this.wrapping = false;

    // # Setup
    game.stage.smoothed = false;
    game.time.advancedTiming = true; // [todo] need this?
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // # Inputs
    game.input.maxPointers = 2; // for mobile
    game.input.addPointer();
    game.input.addPointer();
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // # World gen
    game.world.setBounds(0, 0, vars.worldSize, game.height);


    // # Background images
    game.bgnight = game.add.sprite(0,0, 'bgnight');
    game.bgnight.fixedToCamera = true;


    // # Sound
    game.sfxbgnoise = game.add.audio('bgnoise');
    game.sfxbuzz = game.add.audio('buzz');
    game.sfxding = game.add.audio('ding');


    // # Game objects
    drawMoon();
    genStump();
    genTrees();
    genOwl();
    genBees();
    genLeafy();
    //genForetrees();
    //genGaps();
    genBlueleaves();
    genFlowers();


    // # Gaps
    game.gaps = game.add.group();
    game.gaps.enableBody = true;
    game.gaps.createMultiple(5, 'tree', false);
    game.gaps.setAll('body.immovable', true);
    //game.gaps.setAll('checkWorldBounds', true);
    //game.gaps.setAll('outOfBoundsKill', true);
    resetGaps();
    //addRowOfGaps();
    createGaps();

    // # Rain
    genRain();

    // # UI
    genUI();

    // prevent initial wrap on spawn
    this.wrapping = true;

    //this.timeChecker = game.time.now;

  },


  update: function () {


    // # Music
    if(!game.sfxbgnoise.isPlaying){
     game.sfxbgnoise.play();
    }


    // # Collisions
    game.physics.arcade.collide(game.leafy, game.gaps);      
    game.physics.arcade.overlap(game.leafy, game.blueleaves, passBlueleaf, null, this);
    game.physics.arcade.overlap(game.leafy, game.flowers, passFlower, null, this);
    game.physics.arcade.overlap(game.leafy, game.bees, passBee, null, this);
    
    // owl
    if (game.owl) {
      if (checkOverlap(game.leafy, game.owl)) { passOwl(); }
    }


    // # UI
    //game.distanceText.text = Math.round( ( Math.abs( Math.round( ( (vars.worldSize/2) - game.leafy.x ) / vars.ratio ) ) ) / 45 ) + " steps";
    game.flowersText.setText(game.leafy.flowers);
    game.blueLeafText.setText(game.leafy.blueLeafCount);

    game.fps.setText(game.time.fps + "fps");
    game.wrapsText.setText(this.wraps + " wraps");

    game.leafy.body.velocity.x = 0;

    // # Leafy movement and Respawn
    if (!game.leafy.alive) {
      respawn(game.leafy);
    } else {
      
      playerMove(game.leafy);

      if(!this.wrapping && (game.leafy.x < vars.worldSize) ) {
        
        this.wraps++;
        this.wrapping = true;

        resetGaps();
        createGaps();
        
        //addRowOfGaps();

        game.trees.destroy();
        game.bees.destroy();
        // game.gaps.destroy();
        game.blueleaves.destroy();
        //game.foretrees.destroy();
        game.flowers.destroy();
        // //game.ui.destroy();

        // //genStump();
        genTrees();
        // //genOwl();
        genBees();
        // //genLeafy();
        //genForetrees();
        // genGaps();
        genBlueleaves();
        genFlowers();
        // //genUI();

        game.world.bringToTop(game.leafy);
        // game.world.bringToTop(game.ui);

      } else if (game.leafy.x >= vars.worldSize) {
        this.wrapping = false;
      }

      // [todo] figure out wrap with physics
      // wrap(sprite, padding, useBounds, horizontal, vertical)
      this.game.world.wrap(game.leafy, 0, false, true, false);


    }


  },


  quitGame: function (pointer) {

    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that good stuff.

    // Then let's go back to the main menu.
    this.state.start('MainMenu');

  },

  render: function () {

    //console.log('render');
    // game.debug.pointer( game.input.activePointer );

  }

};