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
  // console.log( tree );
  // return tree;


  // draw temp trees
  var x = game.rnd.integerInRange(0, vars.worldSize);
  //var t = game.trees.create(x, game.height-this.height, 'tree' + Math.floor(Math.random()*6+1));
  var t = game.trees.create(x, game.height-(tree.height * 2), 'tree');
  t.scale.setTo(.5);
  t.alpha = .5;
  t.height = tree.height * 2;
  t.width = tree.width * 2;
  //t.body.velocity.x = 0;

}


// tween colors
// http://www.html5gamedevs.com/topic/7162-tweening-a-tint/?p=42712
// tweenTint(sprite, 0xff0000, 0x0000ff, 2000); // tween the tint of sprite from red to blue over 2 seconds (2000ms)
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


function passTree(leafy, tree) {
  //tree.kill();
  //tree.tint = '0xcccccc'
  tree.alpha = .1;
  vars.playerSpeed += 5;
  //tree.alpha = Math.random()*.9+.1;
}