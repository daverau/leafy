// # Leafy
// a phaser game experiment
// by dave rau

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'leafy', { preload: preload, create: create } );


// # Preload
function preload() {

  game.load.spritesheet('leafy', 'img/leafy.png', 128, 128);

}


// # Create
function create() {

  game.stage.backgroundColor = 0xF4F4F4;

  var leafy = game.add.sprite( game.world.width / 2 , game.world.height / 2, 'leafy');
  var walk = leafy.animations.add('walk');
  leafy.animations.play('walk', 15, true);

	// test gen some trees
	for (x = 0; x < 10; x++) {
		genTree();
	}

}


// ## Generate trees based on some parameters
function genTree() {

	var tree = {};

	// # Generate
  // height
	var heightMin = 32;
	var heightMax = 300;
  tree.height = Math.floor(Math.random()*heightMax+heightMin);

  // width
	var widthMin = 4;
	var widthMax = 120;
  tree.width = Math.floor(Math.random()*widthMax+widthMin);

  // number of branches
	var branchesMin = 0;
	var branchesMax = 5;
  tree.branches = Math.floor(Math.random()*branchesMax+branchesMin);

  // number of leaves
	var leavesMin = 0;
	var leavesMax = (tree.branches * 3) + 3;
  tree.leaves = Math.floor(Math.random()*leavesMax+leavesMin);

  // leaf color
  var colorLeaf = ['green', 'yellow', 'red'];
  tree.colorLeaf = colorLeaf[Math.floor(Math.random()*colorLeaf.length)];;

  // branch color
  var colorBranch = ['brown','grey'];
  tree.colorBranch = colorBranch[Math.floor(Math.random()*colorBranch.length)];;

  // foreground vs background
  var ground = ['bg', 'foreground']
  tree.ground = ground[Math.floor(Math.random()*ground.length)];;

  // # Draw
  // draw a tree
  // draw trunk
  // draw second color
  // attach branches
  // attach leaves

  // # We've got a tree
  console.log( tree );
  // return tree;

}
