BasicGame.Game = function (game) {};
BasicGame.Game.prototype = {

  create: function () {


    // # Setup
    this.stage.smoothed = false;
    this.time.advancedTiming = true; // [todo] need this?
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


    // # Inputs
    this.input.maxPointers = 2; // for mobile
    this.input.addPointer();
    this.input.addPointer();
    game.cursors = this.input.keyboard.createCursorKeys();
    game.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // # World gen
    console.log('world size: ' + vars.worldSize);
    this.world.setBounds(0, 0, vars.worldSize, game.height);
    // [todo] explore null boundless world
    game.camera.bounds.setTo(null,null);
    //game.camera.bounds.width = null;
    game.camera.bounds.height = game.height;
    game.wraps = 0; // world wrapping
    game.wrapping = true; // prevent initial wrap


    // # Background images
    game.bgnight = game.add.sprite(0,0, 'bgnight');
    game.bgnight.fixedToCamera = true;


    // # Sound
    game.sfxbgnoise = game.add.audio('bgnoise');
    game.sfxbuzz = game.add.audio('buzz');
    game.sfxding = game.add.audio('ding');


    // # Draw game objects
    drawMoon();
    genStump();
    genTrees();
    genOwl();
    genBees();
    genLeafy();
    //genForetrees();
    genBlueleaves();
    genFlowers();


    // # Gaps
    game.gaps = game.add.group();
    game.gaps.enableBody = true;
    game.gaps.createMultiple(8, 'tree', false);
    game.gaps.setAll('body.immovable', true);
    resetGaps();
    placeGaps();


    // # Rain
    genRain();


    // # UI
    genUI();

  },


  update: function () {


    // # Music
    if(!game.sfxbgnoise.isPlaying){
     game.sfxbgnoise.play();
    }


    // # Collisions
    this.physics.arcade.collide(game.leafy, game.gaps, gapTouch, null, this);      
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
    game.wrapsText.setText(game.wraps + " wraps");


    // # Leafy movement and Respawn
    game.leafy.body.velocity.x = 0;

    if (!game.leafy.alive) {
      respawn(game.leafy);
    } else {
      playerMove(game.leafy);

      // world wrap/rearrange gaps based on player position in world
      // [todo] break out into world function for wrapping/
      if(!game.wrapping && (game.leafy.x < vars.worldSize) ) {

        console.log('---World wrap---');
        
        game.wraps++;
        game.wrapping = true;

        // rearrange gap.x positions
        resetGaps();
        placeGaps();

        // [todo] rearrange instead of redraw
        // game.trees.destroy();
        // game.bees.destroy();
        // game.blueleaves.destroy();
        // game.flowers.destroy();

        // genTrees();
        // genBees();
        // genBlueleaves();
        // genFlowers();

        // this.world.bringToTop(game.leafy);
        // this.world.bringToTop(game.ui);

      } else if (game.leafy.x >= vars.worldSize) {
        game.wrapping = false;
      }

      // # World wrap
      // wrap(sprite, padding, useBounds, horizontal, vertical)
      //this.world.wrap(game.leafy, 0, false, true, false);

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

// Utility
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}