// # Create
function create() {

  game.stage.backgroundColor = 0xF4F4F4;
	game.physics.startSystem(Phaser.Physics.ARCADE);
  //game.world.setBounds(0, 0, 3500, game.height);

  // # Player (Leafy) setup
  var leafy = game.add.sprite( game.world.width / 2 , 10, 'leafy');
  walk = leafy.animations.add('walk');
  leafy.animations.play('walk', 15, true);
  leafy.scale.setTo(.5);

  var ground = game.add.tileSprite(0 , game.height-70, this.game.world.width, 70, 'ground');

	//enable physics on the player and ground
  game.physics.arcade.enable(leafy);
  game.physics.arcade.enable(ground);

  //player gravity
	leafy.body.gravity.y = 1000;
  
  //ground
	ground.body.immovable = true;
	ground.body.allowGravity = false;
 


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


}