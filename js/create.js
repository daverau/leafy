// # Create
function create() {

  game.stage.backgroundColor = 0xF4F4F4;
	game.physics.startSystem(Phaser.Physics.ARCADE);
//game.physics.arcade.gravity.y = 300;

  // # Player (Leafy) setup
  game.leafy = game.add.sprite( vars.worldSize / 2 , 10, 'leafy');
  //walk = game.leafy.animations.add('walk');
  //game.leafy.animations.play('walk', 15, true);
  game.leafy.scale.setTo(.5);
  game.leafy.anchor.setTo(.5, 1); //so it flips around its middle

  //game.leafy.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('turn', [7], 0, true);
  game.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
  game.leafy.animations.add('jump', [1], 0, true);

  //ground
  game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');

	//enable physics on the player and ground
  game.physics.arcade.enable(game.leafy);
  game.physics.arcade.enable(game.ground);

  //player gravity
	game.leafy.body.gravity.y = 1000;
  game.leafy.body.maxVelocity.y = 500;
  game.camera.follow(game.leafy);
 
  //ground
	game.ground.body.immovable = true;
	game.ground.body.allowGravity = false;
 
  //[todo] needs tweaking
  game.leafy.body.setSize(20, 32, 5, -6);
  //game.leafy.body.collideWorldBounds=true;
  
  // [todo] out of bounds kill should respawn
  game.leafy.outOfBoundsKill = true;


  // # World gen

	// ## Trees
	game.trees = game.add.group();
	game.trees.enableBody = true;
	// Test generate some random trees
	for (x = 0; x < (vars.worldSize * .01); x++) {
		genTree();
	}

  // [todo] update bounds with global variable
  game.world.setBounds(0, 0, vars.worldSize, game.height);

  // input
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);

}