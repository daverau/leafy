
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {

    // # Setup
    //game.stage.smoothed = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.advancedTiming = true; // [todo] need this?


    // # [testing] Mobile input
    //game.input.maxPointers = 2; // for mobile
    game.input.addPointer();
    game.input.addPointer();
    //game.input.multiInputOverride = Phaser.Input.TOUCH_OVERRIDES_MOUSE;
    var pointer1 = game.input.pointer1;
    var pointer2 = game.input.pointer2;


    // # World gen
    //game.stage.backgroundColor = 0xF4F4F4;
    game.world.setBounds(0, 0, vars.worldSize, game.height);


    // # Background images
    game.bgnight = game.add.sprite(0,0, 'bgnight');
    game.bgnight.fixedToCamera = true;

    // [todo] bg gradient
    // bmd = game.make.bitmapData(1000, 1000);
    // bmd.addToWorld();
    // var grd = bmd.context.createLinearGradient(110.000, 0.000, 190.000, 300.000);
    // // Add colors
    // grd.addColorStop(0.000, 'rgba(128, 175, 190, 1.000)');
    // grd.addColorStop(1.000, 'rgba(38, 27, 40, 1.000)');


    // Moon
    drawMoon();

    // # Stump (owl start location)
    game.stump = game.add.sprite(0,0, 'treestump');
    game.stump.anchor.setTo(.5,0);
    game.stump.x = (vars.worldSize / 2) + (game.width/3);
    game.stump.y = game.height - (game.stump.height + 30);
    game.stump.enableBody = true;


    // # Trees
    game.trees = game.add.group();
    game.trees.enableBody = true;
    for (x = 0; x < (vars.worldSize * .01); x++) {
      genTree();
    }


    // # Owl
    game.owl = game.add.sprite( game.stump.x - 55, game.stump.y - 90, 'owl');
    game.owl.scale.setTo(.5, .5);
    game.sfxhoot = game.add.audio('hoot');
    // animations
    game.owl.animations.add('sit', [0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 10, true);
    game.owl.animations.add('blink', [0,1,2,0], 10, false);
    game.owl.animations.add('look', [0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0], 10, false);
    game.owl.animations.add('flap', [0,10,11,12,13,14], 20, true);
    game.owl.animations.play('sit');


    // # Player-planted Trees
    game.playerTrees = game.add.group();


    // # Bees (enemy)
    game.bees = game.add.group();
    game.sfxbuzz = game.add.audio('buzz');
    var beeCount = vars.worldSize * .00013;
    for (x=0; x<beeCount; x++) {
      //console.log('bee created at x:'+bee.x);
      var bee = new Enemy(game, game.rnd.integerInRange(0, vars.worldSize), game.stump.y + 190, game.rnd.integerInRange(1, 200), vars.beeSpeed);
      game.bees.add(bee);
    }
    game.bees.add( new Enemy(game, game.stump.x - 2000, game.stump.y + 190, 1, vars.beeSpeed) );


    // # Player (Leafy)
    game.leafy = game.add.sprite( vars.worldSize / 2 , 10, 'leafy');
    game.leafy.blueLeafCount=0;
    game.leafy.honeyCount = 0;
    game.leafy.flowers = 0;
    game.leafy.anchor.setTo(.5,0);
    game.physics.arcade.enable(game.leafy);
    game.leafy.body.gravity.y = 1000;
    game.leafy.body.maxVelocity.y = 500;
    game.leafy.anchor.setTo(.5, 1); //flip at middle point
    game.leafy.checkWorldBounds = true;
    game.leafy.outOfBoundsKill = true;
    game.leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted
    game.camera.follow(game.leafy);
    game.leafy.playerSpeed = 150 * vars.ratio;
    game.leafy.jumpHeight = -800;
    game.leafy.alive = true;
    // animations
    game.leafy.animations.add('turn', [7], 0, true);
    game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
    game.leafy.animations.add('jump', [1], 0, true);


    // # Foreground Trees
    game.foretrees = game.add.group();
    game.foretrees.enableBody = true;
    for (x = 0; x < (vars.worldSize * .002); x++) {
      genTree(game.foretrees);
    }


    // # Ground
    //game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');
    game.ground = game.add.tileSprite(0 , game.height-60, 2000, 60, 'tree');
    game.physics.arcade.enable(game.ground);
    game.ground.body.immovable = true;
    game.ground.body.allowGravity = false;
   

    // # Gaps
    //var gapCount = vars.worldSize * .001;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.enable(sprite);

    game.gaps = game.add.physicsGroup();
    game.physics.arcade.enable(game.gaps);

    game.gaps.enableBody = true;
    //game.gaps.body.moves = false;
    //game.gaps.body.immovable = true;

    
    var gapCount = vars.worldSize * .01;
    console.log('gaps: '+gapCount);
    for (x=0; x<gapCount; x++) {
      var gap = new Gap();
      game.gaps.add(gap);
    }

    // # Blue leaves to collect
    game.blueleaves = game.add.group();
    //game.physics.arcade.enable(game.stump);
    game.blueleaves.enableBody = true;
    game.sfxding = game.add.audio('ding');
    // generate leaves
    for (var i = 0; i < vars.blueLeafTotal; i++) {
      var x = game.rnd.integerInRange(0, vars.worldSize);
      var blueleaf = game.blueleaves.create(x, game.height-84, 'blueleaf');
      // pickup animation
      blueleaf.tween = game.add.tween(blueleaf)
        .to({
          alpha: 0,
        }, 1000, Phaser.Easing.Cubic.Out);
      blueleaf.tween.onStart.add(function(leaf, tween) {
        leaf.body.velocity.y = -1000;
      });
      blueleaf.tween.onComplete.add(function(leaf, tween) {
        leaf.kill();
      });
    }

    // # Flowers (another pick-up type)
    game.flowers = game.add.group();
    game.flowers.enableBody = true;
    //game.sfxbuzz = game.add.audio('buzz');
    for (x = 0; x < (vars.worldSize * .00013); x++) {
      var flower = new Flower(game, game.rnd.integerInRange(0, vars.worldSize), game.stump.y + 210);
      game.flowers.add(flower);
      console.log('flower created at x:'+flower.x);
    }
    game.flowers.add( new Flower(game, game.stump.x - 200, game.stump.y + 210) );


    // # Rain
    game.emitter = game.add.emitter(game.width/2, 0, 500);
    game.emitter.fixedToCamera = true;
    game.emitter.width = game.width*1.5;
    //game.emitter.makeParticles('blueleaf');
    game.emitter.makeParticles('tree');
    game.emitter.minParticleScale = .1;
    game.emitter.maxParticleScale = .7;
    game.emitter.setYSpeed(500, 700);
    game.emitter.setXSpeed(-5, 5);
    game.emitter.minRotation = 0;
    game.emitter.maxRotation = 0;
    game.emitter.start(false, 2400, 5, 0);
    // bg noise
    game.sfxbgnoise = game.add.audio('bgnoise');


    // # UI
    // leaves
    game.blueLeafIcon = game.blueleaves.create(game.width-100, 50, 'blueleaf');
    game.blueLeafIcon.fixedToCamera = true;
    game.blueLeafText = game.add.text( game.width-50, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#B1F1D9' });
    game.blueLeafText.fixedToCamera = true;
    // flowers
    game.flowersIcon = game.blueleaves.create(game.width-210, 30, 'flower');
    game.flowersIcon.scale.setTo(.50);
    game.flowersIcon.fixedToCamera = true;
    game.flowersText = game.add.text( game.width-160, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#F5A623' });
    game.flowersText.fixedToCamera = true;
    // distance
    game.distanceText = game.add.text( game.width-100, game.height-40, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
    game.distanceText.fixedToCamera = true;
    game.distanceText.alpha = .2;
    // fps
    game.fps = game.add.text( game.width-220, game.height-40, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
    game.fps.fixedToCamera = true;
    game.fps.alpha = .1;


    // # Inputs
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    plantButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},



	update: function () {


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
    game.blueLeafText.setText(game.leafy.blueLeafCount);

	},


	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
