// # Utilities

// # Generate trees based on some parameters
function genTree(group) {

  // default tree group
  if (!group) group = game.trees;

	var tree = {};
  var pxrange;

	// ## Generate
  // height
	var heightMin = 8;
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
  tree.colorLeaf = colorLeaf[Math.floor(Math.random()*colorLeaf.length)];

  // branch color
  var colorBranch = ['brown','grey'];
  tree.colorBranch = colorBranch[Math.floor(Math.random()*colorBranch.length)];

  // foreground vs background
  var ground = ['bg', 'foreground']
  tree.ground = ground[Math.floor(Math.random()*ground.length)];

  // ## Draw
  // draw a tree
  // draw trunk
  // draw second color
  // attach branches
  // attach leaves

  // ## We've got a tree
  // console.log( tree );
  // return tree;

  // get random x value for tree
  var x = game.rnd.integerInRange(0, vars.worldSize);

  // ## group trees by world depth

  // smaller trees
  var treeimg = 'tree' + Math.floor(Math.random()*4+1);
  
  // middle full range
  pxrange = ((game.world.width/2) * .8);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*8+1);
  }

  // middle full range
  pxrange = ((game.world.width/2) * .4);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*10+1);
  }

  // ends just large trees
  pxrange = ((game.world.width/2) * .1);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*1+9);
  }

  // draw
  var t = group.create(x, 0, treeimg);
  t.y = game.world.height - (t.height + 58); // magic number based on ~ground.height
  t.alpha = .9;
  t.walkedPassed = false;

  // ## dynamic drawn "trees" as rectangles
  // var t = game.trees.create(x, game.height-(tree.height), 'tree');
  // t.scale.setTo(.5);
  // t.alpha = .5;
  // t.height = tree.height;
  // t.width = tree.width;

}


function randTree() {
  var tree = {};
  var pxrange;

  // ## Generate
  // height
  var heightMin = 8;
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
  tree.colorLeaf = colorLeaf[Math.floor(Math.random()*colorLeaf.length)];

  // branch color
  var colorBranch = ['brown','grey'];
  tree.colorBranch = colorBranch[Math.floor(Math.random()*colorBranch.length)];

  // smaller trees
  tree.img = 'tree' + Math.floor(Math.random()*9+1);

  return tree;

}