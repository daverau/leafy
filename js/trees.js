// # Utilities
function genTrees() {
  var tcount = vars.worldSize * 0.015;
  console.log('trees: '+tcount);

  game.trees = game.add.group();
  //game.trees.enableBody = true;
  for (x=0; x<tcount; x++) {
    genTree();
  }
}

function genForetrees() {
  var ftrees = vars.worldSize * 0.007;
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
  game.stump.y = game.height - (game.stump.height + vars.gapHeight);
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
  t.y = game.world.height - (t.height + (vars.gapHeight-2));
  t.alpha = 0.9;

}
