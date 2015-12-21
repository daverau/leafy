// # Create
function create() {

  game.stage.backgroundColor = 0xF4F4F4;
	game.physics.startSystem(Phaser.Physics.ARCADE);

  // # Player (Leafy) setup
  game.leafy = game.add.sprite( game.world.width / 2 , 10, 'leafy');
  walk = game.leafy.animations.add('walk');
  game.leafy.animations.play('walk', 15, true);
  game.leafy.scale.setTo(.5);

  game.ground = game.add.tileSprite(0 , game.height-60, this.game.world.width, 60, 'tree');

	//enable physics on the player and ground
  game.physics.arcade.enable(game.leafy);
  game.physics.arcade.enable(game.ground);

  //player gravity
	game.leafy.body.gravity.y = 1000;
  
  //ground
	game.ground.body.immovable = true;
	game.ground.body.allowGravity = false;
 


  // # World gen
  //grass = this.add.tileSprite(0,game.height-100,game.world.width,70,'grass');
  //ground = this.add.tileSprite(0,game.height-70,game.world.width,70,'ground');

	// ## Trees
	game.trees = game.add.group();
	game.trees.enableBody = true;
	// Test generate some random trees
	for (x = 0; x < 10; x++) {
		genTree();
	}
	// draw trees

  game.world.setBounds(0, 0, 3500, game.height);


  // input
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}