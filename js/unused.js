// plant trees
// create():
function plantTree(leafy) {
  if (game.time.now > vars.plantDelay) {
    console.log('plant tree');

    // ## dynamic drawn "trees" as rectangles
    var r = randTree();
    var t = game.playerTrees.create(leafy.x, game.height-(r.height+58), 'tree');
    t.scale.setTo(.5);
    t.alpha = .9;
    t.height = r.height;
    t.width = r.width;
    t.evolve = r.img;
    t.walkedPassed = false;

    game.physics.arcade.enable(t);
    t.enableBody = true;
    t.body.moves = false;
    t.body.immovable = true;

    console.log('w:'+t.width);
    console.log('h:'+t.height);

    vars.plantDelay = game.time.now + 400;

  }
}
// update():
  // walk when moving left or right (correctly continues playing)
  if (plantButton.isDown) {
    plantTree(leafy);
  }




// pass tree
function passTree(leaf, tree) {
  if (!tree.walkedPassed) {
    //console.log(tree.key+ ' says hi!');
    //console.log(tree);
    tree.walkedPassed = true;
  }
}




// v2 gap code
function addOneGap(x) {
  var gap = game.gaps.getFirstDead();
  var w = Math.floor(Math.random() * 300) + 90;
  gap.reset(x, game.height-90);
  gap.width = w;
  gap.height = vars.gapHeight;
  console.log('gap at x: '+x);
}
function addRowOfGaps() {
  var gapCount = vars.worldSize * .01;
  var gapCount = game.gaps.children.length;
  console.log('gaps: '+gapCount);

  killChildren(game.gaps);

  var hole = Math.floor(Math.random() * 5) + 1;
  for (var i=0; i<gapCount; i++) {
    console.log('----'+i+'----');
    if (i != hole && i != hole + 1) {
      addOneGap(i * 200 + 10);
    }
  }
}
function killChildren(grp) {
  for (var i=0, len=grp.children.length; i<len; i++) {
    if (grp.children[i].alive) {
      grp.children[i].kill();
    }
  }
}



// v1 gap objects to collide with
// add gap objects
function genGaps() {  
  var gapCount = vars.worldSize * .01;
  var gapCount = 10;
  console.log('gaps: '+gapCount);
  for (x=0; x<gapCount; x++) {
   var gap = new Gap();
   game.gaps.add(gap);
  }
}
// factory pattern
Gap = function (x,y,width,img) {
  x = x || game.rnd.integerInRange(0, vars.worldSize);
  y = y || game.height;
  img = img || "tree";

  Phaser.Sprite.call(this, game, x, y, img);
  game.physics.arcade.enable(this);
  this.width = width || 300;
  //this.height = game.ground.height+1;
  this.height = vars.gapHeight;
  this.anchor.setTo(1,1);

  this.body.moves = false;
  this.body.immovable = true;

  // animations
  // this.animations.add('fly', [0,1,2,3,4], 30, true);
  // this.animations.play('fly');
  // this.tween = game.add.tween(this).to({
  //   alpha: 0,
  // }, 1000, Phaser.Easing.Cubic.Out);
};
Gap.prototype = Object.create(Phaser.Sprite.prototype);
Gap.prototype.constructor = Gap;
function hitGap(leafy, gap) {
  if (leafy.alive) {
    game.sfxbuzz.play();
    leafy.kill();
  }
}
// update():
// might reuse this again instead of actual gaps
//game.physics.arcade.overlap(game.leafy, game.gaps, hitGap, null, this);




// random tree properties
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



function genGround() {
  game.ground = game.add.tileSprite(0 , game.height-60, vars.worldSize, 60, 'tree');
  game.ground = game.add.tileSprite(0 , game.height-60, 2000, 60, 'tree');
  game.physics.arcade.enable(game.ground);
  game.ground.body.immovable = true;
  game.ground.body.allowGravity = false;
}

// random sound playbackrate
game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;


// rain
game.physics.arcade.overlap(game.leafy, game.emitter, passRain, null, this);
if (checkOverlap(game.leafy, game.emitter)) {
  console.log('raindrop');
  //passRain();
}

function passRain(leafy, leaf) {
  console.log('rain');
  if (!leaf.played) {
    //console.log('drop');
    leaf.played=true;
    game.leafy.blueLeafCount += 1;
    game.sfxding.play();
    game.blueLeafText.text = game.leafy.blueLeafCount;

    // [todo] match tween y value from blueLeaf pickup function
    leaf.tween = game.add.tween(leaf)
      .to({
        alpha: 0
      }, 1000, Phaser.Easing.Cubic.Out);
    leaf.tween.onComplete.add(function(leaf, tween) {
      leaf.kill();
    });
    leaf.tween.start();
  }
}

