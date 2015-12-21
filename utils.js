// # Utilities

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


  // draw temp trees
  var x = game.rnd.integerInRange(game.width, game.world.width - game.width);
  var t = game.trees.create(x, game.height-this.height, 'tree' + Math.floor(Math.random()*6+1));
  t.scale.setTo(.5);
  //t.height = tree.height * 2;
  //t.width = tree.width * 2;
  //t.body.velocity.x = 0;

}
