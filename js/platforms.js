// Platforms
function addPlatform(id) {
  // Create a pipe at the position x and y
  var platform = game.add.sprite(0, game.height - vars.platformHeight, 'platform');
  platform.scale.setTo(0.5);
  platform.id = id;

  // Add the pipe to our previously created group
  game.platforms.add(platform);

  // Enable physics on the pipe
  game.physics.arcade.enable(platform);

  // Add velocity to the pipe to make it move left
  platform.body.velocity.x = vars.gameSpeed;
  platform.body.immovable = true;

  platform.update = function () {
    if ( (this.position.x + this.width) < -10) {

      console.log('--platform ' + this.id + '--');
      var level = isLevel();

      // random width
      this.width = vars.platformWidths[vars.platformLevels[level].widths[Math.floor(Math.random()*vars.platformLevels[level].widths.length)] -1];

      this.y = game.height -  (vars.platformHeights[vars.platformLevels[level].heights[Math.floor(Math.random()*vars.platformLevels[level].heights.length)] -1]);

      // set new X position based on last X
      this.position.x = getLastPlatformX() + vars.platformGaps[vars.platformLevels[level].gaps[Math.floor(Math.random()*vars.platformLevels[level].gaps.length)] -1];

      // coins?
      var items = [0,0,0,0,1,1,1,2];
      var yesCoins = items[Math.floor(Math.random()*items.length)];
      //console.log(yesCoins);
      // coins
      if (yesCoins === 1) {
        //console.log(platform.width);
        if (platform.width > 50) {
          placeCoins(platform);
        }
      // coin rings
    } else if (yesCoins === 2) {
        //placeBluering(platform);
      }


    }
  }

  // kill pipes off screen
  //platform.checkWorldBounds = true;
  //platform.outOfBoundsKill = true;
}

function getLastPlatformX() {
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x+platform.width,maxPlatformX);
  });
  return maxPlatformX;
}

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
    if (game.coins) {
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
    }

  });
}

// coin platforms
function placeCoins(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);
  //console.log('long platform with coins: ' + coinCount);
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  //console.log(game.coinstoRecycle);
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    //console.log(coin);
    if (coin) {
      coin.pos.y = platform.y - 60;
      resetLeaf(coin);
      coin.reset( platform.x + 60 + (i * 60), platform.y - 60 );
      coin.body.velocity.x = vars.gameSpeed;
    } else {
      //console.log('0 coins');
    }
  }
}

// recycle rings as they fall off camera
function placeBluering(platform) {
  game.ringstoRecycle = game.bluerings.children.filter( offCamera );
  var ring = game.ringstoRecycle[0];
  if (ring) {
    ring.platformId = platform.id;
    ring.x = platform.x + platform.width;
    ring.y = platform.y - 190;
    console.log('place ring: ' + ring.x);
    ring.children.forEach(function(blueleaf) {
      resetLeaf(blueleaf);
    });

    ring.update = function () {
      this.x = game.platforms.children[this.platformId - 1].body.x;
      if (this.x + this.width < - 10) {
        console.log('reset this ring');
      }
    }

  } else {
    console.log('0 rings');
  }
}

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  //console.log('fn() platformTouch');
  game.leafy.position.x = vars.leafyXposition;
  if (!platform.touched) {
    platform.touched = true;

    // platform jump score
    // touchPlatformScore(leafy, platform.score);
  }
}
