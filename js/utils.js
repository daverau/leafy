// # Utilities

// # Generate trees based on some parameters
function genTree() {

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
  var treeimg = 'tree' + Math.floor(Math.random()*6+1);
  
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
  var t = game.trees.create(x, 0, treeimg);
  t.y = game.world.height - (t.height + 58); // magic number based on ~ground.height
  t.alpha = .9;

  // ## front trees
  // [todo/question] why no workie?
  // t.z = 1000;
  // game.world.bringToTop(t);
  // var randPool = ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','2'];
  // var rand = randPool[Math.floor(Math.random()*randPool.length)];
  // if (rand == 2) {
  //   game.world.bringToTop(t);
  // }

  // ## dynamic drawn "trees" as rectangles
  // var t = game.trees.create(x, game.height-(tree.height), 'tree');
  // t.scale.setTo(.5);
  // t.alpha = .5;
  // t.height = tree.height;
  // t.width = tree.width;

}


// # tween colors
// http://www.html5gamedevs.com/topic/7162-tweening-a-tint/?p=42712
// tweenTint(sprite, 0xff0000, 0x0000ff, 2000);
function tweenTint(obj, startColor, endColor, time) {
    // create an object to tween with our step value at 0
    var colorBlend = {step: 0};

    // create the tween on this object and tween its step property to 100
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
    
    // run the interpolateColor function every time the tween updates, feeding it the
    // updated value of our tween each time, and set the result as our tint
    colorTween.onUpdateCallback(function() {
      obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);   
    });
    
    // set the object to the start color straight away
    obj.tint = startColor;    
    
    // start the tween
    colorTween.start();
}

// [question] this should be in phaser, right?
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
