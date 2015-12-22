// # Create
function create() {

//game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
//game.scale.setUserScale(0.5, 0.5);

  // # World gen
  game.stage.backgroundColor = 0xF4F4F4;
	game.physics.startSystem(Phaser.Physics.ARCADE);
  //game.physics.arcade.gravity.y = 300;
  game.world.setBounds(0, 0, vars.worldSize, game.height);

  // # Trees
  game.trees = game.add.group();
  game.trees.enableBody = true;
  // Test generate some random trees
  for (x = 0; x < (vars.worldSize * .01); x++) {
    genTree();
  }

  // # Player (Leafy) setup
  game.leafy = game.add.sprite( vars.worldSize / 2 , 10, 'leafy');
  game.physics.arcade.enable(game.leafy);
  game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  //game.leafy.scale.setTo(.5);

  //animations for walkcycle
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);
  game.leafy.anchor.setTo(.5, 1); //flip at middle point

  // [todo adjust box hit size
  //game.leafy.body.setSize(20, 32, 5, -6);
  
  //ground
  game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');
  game.physics.arcade.enable(game.ground);
	game.ground.body.immovable = true;
	game.ground.body.allowGravity = false;
 
  // # Camera follows player
  game.camera.follow(game.leafy);

  // [todo] out of bounds kill should respawn
  game.leafy.outOfBoundsKill = true;
  //game.leafy.body.collideWorldBounds=true;



  // input
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}