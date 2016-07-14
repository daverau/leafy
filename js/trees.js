// # Trees

function moveFarTrees() {
  //console.log('moveFarTrees()');
  game.trees.forEach(function(tree) {
    if ( (game.leafy.x - tree.x) > game.width * 1 ) {
      //tree.tint = Math.random() * 0xffffff;
      tree.x = game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
      //console.log('move tree: '+tree.x);
    }
  });
}

// new functions for platform trees
// [todo] use this
function platformTrees(x1, x2) {
  console.log('fn(): platformTrees');
  var tcount = Math.ceil( (x1 + x2) * 0.015);
  console.log('trees: '+tcount);
  for (x=0; x<tcount; x++) {
    placeTree(game.trees, x1, x2 );
  }
}
function placeTree(group, x1, x2) {
  console.log('fn(): placeTree');
  // get from pool
  var tree = game.trees.getFirstDead();
  if (tree) {
    tree.passed = false;

    var width = x1 + x2;

    // ## group trees by world depth
    // middle full range
    if ( width > 50 ) {
      treeimg = 'tree' + Math.floor(Math.random()*5+1);
    }
    // middle full range
    if ( width > 250 ) {
      treeimg = 'tree' + Math.floor(Math.random()*8+1);
    }
    // ends just large trees
    if ( width > 550 ) {
      treeimg = 'tree' + Math.floor(Math.random()*1+8);
    }

    // ## draw
    tree.x = Math.floor(Math.random() * x2) + x1;



    // randomize width
    // [todo] weighted
    var w = Math.floor(Math.random() * 400) + 150;

    // apply platform
    platform.reset(nextX, game.height-90);
    platform.width = w;
    platform.height = vars.platformHeight;

    // removed these since we're doing our own checks
    // but keeping around if we want later
    //game.platforms.setAll('checkWorldBounds', true);
    //game.platforms.setAll('outOfBoundsKill', true);

    console.log('---platform'+i+1+'---');
    console.log(w+'w ('+platformw+')');
    // console.log('x: '+nextX);
    // console.log('last pillar x: '+maxPlatformX);
  } else {
    //console.log('no dead platforms, move around first...');
  }
}


function genTrees() {
  var tcount = 9;
  //var tcount = Math.ceil(vars.worldSize * 0.015);
  console.log('trees: '+tcount);

  game.trees = game.add.group();
  //game.trees.enableBody = true;
  for (x=0; x<tcount; x++) {
    genTree();
  }
}

function genForetrees() {
  var ftrees = Math.ceil(vars.worldSize * 0.007);
  console.log('ftrees: '+ftrees);
  game.foretrees = game.add.group();
  for (x=0; x<ftrees; x++) {
   genTree(game.foretrees);
  }
}


// # Stump for owl
function genStump() {
  game.stump = game.add.sprite(0,0, 'treestump');
  game.stump.anchor.setTo(0.5,0);
  game.stump.x = (vars.worldSize / 2) + (game.width/3);
  game.stump.y = game.height - (game.stump.height + vars.platformHeight);
  game.stump.enableBody = true;
}


// # Generate trees based on some parameters
function genTree(group) {

  var pxrange;

  // get random x value for tree
  var x = game.rnd.integerInRange(0, vars.worldSize);

  // smaller trees
  var treeimg = 'tree' + Math.floor(Math.random()*4+1);

  // default tree group
  if (!group) group = game.trees;

  // ## group trees by world depth
  // middle full range
  pxrange = ((game.world.width/2) * 0.8);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*8+1);
  }
  // middle full range
  pxrange = ((game.world.width/2) * 0.4);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*10+1);
  }
  // ends just large trees
  pxrange = ((game.world.width/2) * 0.1);
  if ( (x < pxrange) || (x > game.world.width - pxrange) ) {
    treeimg = 'tree' + Math.floor(Math.random()*1+9);
  }

  // ## draw
  var t = group.create(x, 0, treeimg);
  t.y = game.world.height - (t.height + (vars.platformHeight-2));
  t.alpha = 0.9;

}
