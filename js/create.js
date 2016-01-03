// # Create
function create() {

  // # Setup
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.time.advancedTiming = true; // [todo] need this?
  game.blueLeafCount=0; // track how many blue leaves player has
  game.input.maxPointers = 1; // for mobile

  // # World gen
  //game.stage.backgroundColor = 0xF4F4F4;
  game.world.setBounds(0, 0, vars.worldSize, game.height);

  // # Scale for high dpi screens
  // [todo] explore for retina woes
  //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  //game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  //game.scale.setUserScale(0.5, 0.5);
  
  // # Background images
  game.bgnight = game.add.sprite(0,0, 'bgnight');
  game.bgnight.fixedToCamera = true;

  // bg noise
  game.sfxbgnoise = game.add.audio('bgnoise');

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
  //game.physics.arcade.enable(game.owl);
  game.owl.scale.setTo(.5, .5);
  game.sfxhoot = game.add.audio('hoot');
  // animations
  game.owl.animations.add('all', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 10, true);
  game.owl.animations.add('sit', [0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 10, true);
  game.owl.animations.add('blink', [0,1,2,0], 10, false);
  game.owl.animations.add('look', [0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0], 10, false);
  game.owl.animations.add('flap', [0,10,11,12,13,14], 20, true);
  // set animation frame
  game.owl.animations.play('sit');

  // # Player (Leafy)
  game.leafy = game.add.sprite( vars.worldSize / 2 , 10, 'leafy');
  game.leafy.anchor.setTo(.5,0);
  game.physics.arcade.enable(game.leafy);
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  game.leafy.anchor.setTo(.5, 1); //flip at middle point
  game.leafy.checkWorldBounds = true;
  game.leafy.outOfBoundsKill = true;
  game.leafy.body.setSize(50, 110, 0, -13); // hitbox adjusted
  game.camera.follow(game.leafy);
  // animations
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);

  // # Ground
  game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');
  game.physics.arcade.enable(game.ground);
	game.ground.body.immovable = true;
	game.ground.body.allowGravity = false;
 
  // # Leaves to collect
  game.blueleaves = game.add.group();
  game.physics.arcade.enable(game.stump);
  game.blueleaves.enableBody = true;
  game.sfxding = game.add.audio('ding');
  // generate leaves
  for (var i = 0; i < vars.blueLeafTotal; i++) {
    var x = game.rnd.integerInRange(0, vars.worldSize);
    var blueleaf = game.blueleaves.create(x, game.height-160, 'blueleaf');
    blueleaf.enableBody = true;
    blueleaf.body.gravity.y = 300;
    blueleaf.body.bounce.y = 0.7 + Math.random() * 0.2;
    // pickup animation
    blueleaf.tween = game.add.tween(blueleaf)
      .to({
        alpha: 0,
      }, 1000, Phaser.Easing.Cubic.Out);
    blueleaf.tween.onStart.add(function(leaf, tween) {
      leaf.body.velocity.y = 1000;
    });
    blueleaf.tween.onComplete.add(function(leaf, tween) {
      leaf.kill();
    });
  }

  // # UI
  // distance
  game.distanceText = game.add.text( game.width-100, 20, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.distanceText.fixedToCamera = true;
  game.distanceText.alpha = .3;
  // fps
  game.fps = game.add.text( game.width-100, 44, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.fps.fixedToCamera = true;
  game.fps.alpha = .1;
  // leaves
  game.blueLeafText = game.add.text( game.width-100, 68, '-', { font: (32*vars.ratio)+"px Arial", fill: '#B1F1D9' });
  game.blueLeafText.fixedToCamera = true;

  // # Input
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // [todo] add mobile/touch inputs

}