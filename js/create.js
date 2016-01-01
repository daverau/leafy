// # Create
function create() {

  // # setup
  game.input.maxPointers = 1;
  //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.time.advancedTiming = true;
  game.blueLeafCount=0;

  // # World gen
  game.stage.backgroundColor = 0xF4F4F4;
  game.world.setBounds(0, 0, vars.worldSize, game.height);

  // ## center world anchor
  // [todo/question] how to properly anchor world so 0,0 is center?
  //game.world.anchor.setTo(.5, .5);

  // ## scale manager
  // [todo] explore for retina woes
  //game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  //game.scale.setUserScale(0.5, 0.5);

  // ## physics setup
	game.physics.startSystem(Phaser.Physics.ARCADE);
  //game.physics.arcade.gravity.y = 300;
  

  // # Game objects
  // ## Stump (owl start location)
  game.stump = game.add.sprite(0,0, 'treestump');
  game.stump.anchor.setTo(.5,0);
  game.stump.x= (vars.worldSize / 2) + (game.width/3);
  game.stump.y=game.height - (game.stump.height + 30);

  // ## Trees
  game.trees = game.add.group();
  game.trees.enableBody = true;
  for (x = 0; x < (vars.worldSize * .01); x++) {
    genTree();
  }

  // ## Owl
  game.owl = game.add.sprite( game.stump.x - 55, game.stump.y - 90, 'owl');
  game.owl.anchor.setTo(.5,0);
  game.owl.scale.setTo(.5, .5);
  // animations
  game.owl.animations.add('all', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 10, true);
  game.owl.animations.add('sit', [0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 10, true);
  game.owl.animations.add('blink', [0,1,2,0], 10, false);
  game.owl.animations.add('look', [0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0], 10, false);
  game.owl.animations.add('flap', [0,10,11,12,13,14], 20, true);
  // go
  game.owl.animations.play('sit');
  //game.add.tween(game.owl).to( { x: (game.stump.x - 55), y: (game.stump.y - 90) }, 3000, Phaser.Easing.Sinusoidal.Out, true);

  // ## Player (Leafy)
  game.leafy = game.add.sprite( vars.worldSize / 2 , 10, 'leafy');
  game.leafy.anchor.setTo(.5,0);
  //game.leafy.y=game.height - (game.leafy.height + 30);
  game.physics.arcade.enable(game.leafy);
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  //animations
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);
  game.leafy.anchor.setTo(.5, 1); //flip at middle point
  // trigger kill on world leave
  game.leafy.checkWorldBounds = true;
  game.leafy.outOfBoundsKill = true;
  // hitbox
  // [todo] adjust box hit size to compensate for whitespace in sprite (-14px)
  game.leafy.body.setSize(50, 110, 0, -13);
  // camera follow
  game.camera.follow(game.leafy);

  // ## ground
  game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');
  game.physics.arcade.enable(game.ground);
	game.ground.body.immovable = true;
	game.ground.body.allowGravity = false;
 
  // # blue leaves to collect
  game.blueleaves = game.add.group();
  game.blueleaves.enableBody = true;
  for (var i = 0; i < 25; i++) {
    var x = game.rnd.integerInRange(0, vars.worldSize);
    var blueleaf = game.blueleaves.create(x, game.height-160, 'blueleaf');
    blueleaf.body.gravity.y = 300;
    blueleaf.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
  game.sfxding = game.add.audio('ding');


  // # UI
  game.distanceText = game.add.text( game.width-100, 20, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.distanceText.fixedToCamera = true;
  game.distanceText.alpha = .3;

  game.fps = game.add.text( game.width-100, 44, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.fps.fixedToCamera = true;
  game.fps.alpha = .1;

  game.blueLeafText = game.add.text( game.width-100, 68, '-', { font: (32*vars.ratio)+"px Arial", fill: '#B1F1D9' });
  game.blueLeafText.fixedToCamera = true;


  // # Input
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}