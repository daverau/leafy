// platform helper to get last platform object
function getLastPlatform() {
  var maxPlatformX = 0;
  var plat = {};
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x + platform.width, maxPlatformX);
    if (platform.x + platform.width >= maxPlatformX) {
      plat = platform;
    }
  });
  return plat;
}

function touchPlatformScore(leafy, score) {
  // set jump score so it follows Leafy around
  leafy.leafyText.tween.stop();
  leafy.leafyText.tween.pendingDelete = false; // http://www.html5gamedevs.com/topic/16641-restart-tween/

  leafy.leafyText.setText( score );
  // jump-based scoring, consider bonus points later or highscore best jump
  // if (game.leafy.score === 0) {
  //   game.leafy.score = 1;
  // } else {
  //   game.leafy.score = Number(platform.score) + Number(game.leafy.score);
  // }

  leafy.leafyText.alpha = 1;
  leafy.leafyText.x = ((game.leafy.x/2) * vars.ratio);
  leafy.leafyText.y = (game.leafy.y/2 - 80) * vars.ratio;
  leafy.leafyText.tween.delay(140).start();
  leafy.jumpsScore++;
}


// randomize width
//var w = Math.floor(Math.random() * 400) + 150;


// not using these but keeping around for later since new phaser may work better here
// game.leafy.checkWorldBounds = true;
// game.leafy.outOfBoundsKill = true;


function genEasyPlatorms() {
  game.easyPlatorms = game.add.physicsGroup();

  var ground = game.add.tileSprite(0 , game.height-120, 500, 90, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(600 , game.height-250, 500, 90, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(900 , game.height-380, 500, 90, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);
}


// [todo] add swipe up to jump
// (this.swipe.isDown && (this.swipjumpButtone.positionDown.y > this.swipe.position.y))


// # short/medium/long jumps, more devnotes
// create()
var globalGravity = 9; // or any value you need
var playerJumped = false;

// update()
if (cursors.up.isDown && player.body.touching.down) {
  //  Allow the player to jump if they are touching the ground.
  player.body.velocity.y = -200;
  playerJumped = true;
} else if (cursors.up.isDown && playerJumped === true) {
  // reduce players gravity if player recently jumped and jump key is down
  player.body.gravity.y = globalGravity - 4;
} else {
  // reset gravity once the jump key is released to prevent prolongation
  playerJumped = false;
  player.body.gravity.y = globalGravity;
}


// # Jump tolerance for allowing jumps shortly after falling off platforms, devnotes
// create()
  this.edgeTimer = 0;
  this.jumpTimer = 0;
  this.wasStanding = false;
// update()
  var standing = this.player.body.blocked.down || this.player.body.touching.down;
  //  No longer standing on the edge, but were
  //  Give them a 250ms grace period to jump after falling
  if (!standing && this.wasStanding) {
      this.edgeTimer = this.time.time + 250;
  }
  //  Allowed to jump?
  if ((standing || this.time.time <= this.edgeTimer) && this.cursors.up.isDown && this.time.time > this.jumpTimer) {
      this.player.body.velocity.y = -500;
      this.jumpTimer = this.time.time + 750;
  }
  this.wasStanding = standing;


// # World wrap
// wrap(sprite, padding, useBounds, horizontal, vertical)
// was useful at first, but leafy is a limitless world, so i'll roll the dice with float point numbers, how big can i go before problems arise?
this.world.wrap(game.leafy, 0, false, true, false);

    game.wraps = 0; // world wrapping
    game.wrapping = true; // prevent initial wrap

// world wrap/rearrange platforms based on player position in world
if(!game.wrapping && (game.leafy.x < vars.worldSize) ) {

  console.log('---World wrap---');

  game.wraps++;
  game.wrapping = true;

  // rearrange platform.x positions
  resetPlatforms();
  placePlatforms();

  // [todo] rearrange instead of redraw
  // game.trees.destroy();
  // game.bees.destroy();
  // game.blueleaves.destroy();
  // game.flowers.destroy();

  // genTrees();
  // genBees();
  // genBlueleaves();
  // genFlowers();

  // this.world.bringToTop(game.leafy);
  // this.world.bringToTop(game.ui);

} else if (game.leafy.x >= vars.worldSize) {
  game.wrapping = false;
}




// plant trees
// create():
function plantTree(leafy) {
  if (game.time.now > vars.plantDelay) {
    console.log('plant tree');

    // ## dynamic drawn "trees" as rectangles
    var r = randTree();
    var t = game.playerTrees.create(leafy.x, game.height-(r.height+58), 'tree');
    t.scale.setTo(0.5);
    t.alpha = 0.9;
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




// v2 platform code
function addOnePlatform(x) {
  var platform = game.platforms.getFirstDead();
  var w = Math.floor(Math.random() * 300) + 90;
  platform.reset(x, game.height-90);
  platform.width = w;
  platform.height = vars.platformHeight;
  console.log('platform at x: '+x);
}
function addRowOfPlatforms() {
  var platformCount = game.platforms.children.length;
  console.log('platforms: '+platformCount);

  killChildren(game.platforms);

  var hole = Math.floor(Math.random() * 5) + 1;
  for (var i=0; i<platformCount; i++) {
    console.log('----'+i+'----');
    if (i != hole && i != hole + 1) {
      addOnePlatform(i * 200 + 10);
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



// v1 platform/gap objects to collide with
// add "gap" objects
function genPlatforms() {
  var platformCount = vars.worldSize * 0.01; // about 500 for the 50k world size
  console.log('platforms: '+platformCount);
  for (x=0; x<platformCount; x++) {
   var platform = new Platform();
   game.platforms.add(platform);
  }
}
// factory pattern
Platform = function (x,y,width,img) {
  x = x || game.rnd.integerInRange(0, vars.worldSize);
  y = y || game.height;
  img = img || "tree";

  Phaser.Sprite.call(this, game, x, y, img);
  game.physics.arcade.enable(this);
  this.width = width || 300;
  //this.height = game.ground.height+1;
  this.height = vars.platformHeight;
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
Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;
function hitPlatform(leafy, platform) {
  if (leafy.alive) {
    game.sfxbuzz.play();
    leafy.kill();
  }
}
// update():
// might reuse this again instead of actual platforms
//game.physics.arcade.overlap(game.leafy, game.platforms, hitPlatform, null, this);




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
game.sfxding._sound.playbackRate.value = Math.random() * 1.2 + 0.9;


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


// distance
// create():
game.distanceText = game.add.text( game.width-100, game.height-40, '-', { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#000' });
game.distanceText.fixedToCamera = true;
game.distanceText.alpha = 0.2;
// update():
game.distanceText.text = Math.round( ( Math.abs( Math.round( ( (vars.worldSize/2) - game.leafy.x ) / vars.ratio ) ) ) / 45 ) + " steps";



// # Trees 2.0 but for some reason is way slower...

Tree = function (game, x, y) {
  var treeimg = 'tree' + Math.floor(Math.random()*10+1);

  Phaser.Sprite.call(this, game, x, y, treeimg);
  this.anchor.setTo(0.5, 1);
  //this.pos = {'x': x, 'y': y};
  this.alpha = 0.9;
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.update = function() {
  resetTree(this);
};

function genTrees() {
  game.trees = game.add.group();
  console.log('creating trees: '+ vars.treesTotal);
  for (var i=0; i<vars.treesTotal; i++) {
    var x = Math.floor(Math.random()*(game.width * 3)+(0));
    var y = game.height-vars.platformHeight;
    var tree = new Tree(game, x, y);
    console.log("tree"+i+': '+x);
    //console.log(tree);
    game.trees.add(tree);
  }
}

function resetTree(item) {
  if ( (item.position.x + (item.width/2)) < game.camera.x) {
    //item.tint = Math.random() * 0xffffff;
    //console.log('leafy: ' + game.leafy.x);
    //console.log('old: ' + item.pos.x);
    item.position.setTo(game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5)), item.position.y);
    console.log(game.camera.x);
    console.log('moved tree: ' + item.position.x);
  }
}

// for multi-touch
this.input.maxPointers = 2; // for mobile touch
this.input.addPointer();
this.input.addPointer();

// old platform setup
function setupPlatforms() {
  game.platforms.forEach(function(platform) {

    // far platform.x
    var maxPlatformX = getLastPlatformX();

    // platform settings per level
    var widths = vars.platformLevels[isLevel(maxPlatformX)].widths;
    var w = vars.platformWidths[widths[Math.floor(Math.random()*widths.length)] -1];

    var heights = vars.platformLevels[isLevel(maxPlatformX)].heights;
    var h = vars.platformHeights[heights[Math.floor(Math.random()*heights.length)] -1];

    var gapws = vars.platformLevels[isLevel(maxPlatformX)].gaps;
    var gapw = vars.platformGaps[gapws[Math.floor(Math.random()*gapws.length)] -1];

    // set nextX coordinate for platform
    var nextX = maxPlatformX + gapw ;

    // apply platform
    platform.score = gapw;
    platform.touched = false;
    platform.reset(nextX, game.height - h);
    platform.width = w;
    platform.nextX = nextX;
    platform.height = vars.platformHeight;

    // coins?
    var items = [1,1,2,3];
    var yesCoins = items[Math.floor(Math.random()*items.length)];
    // 1 === do nothing
    // coins
    if (yesCoins === 2) {
      if (w > 50) {
        placeCoins(platform);
      }
    // coin rings
    } else if (yesCoins === 3) {
      placeBluering(platform);
    }

  });
}
