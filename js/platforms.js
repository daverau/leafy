// Platforms

function placePlatforms() {
  var platformCount = game.platforms.children.length;
  //console.log('placePlatforms(): '+platformCount);

  for (var i=0; i<platformCount; i++) {

    // get from pool
    var platform = game.platforms.getFirstDead();
    if (platform) {

      // far platform.x
      var maxPlatformX = getLastPlatformX();

      var heights = vars.platformLevels[isLevel(maxPlatformX)].heights;
      var h = vars.platformHeights[vars.platformLevels[isLevel(maxPlatformX)].heights[Math.floor(Math.random() * vars.platformLevels[isLevel(maxPlatformX)].heights.length)] -1];

      // set a platform ID
      if (!platform.i) {
        platform.i = i;
      }

      // apply platform
      // an optimized, but unreadable mess
      // JS garbage collection is interesting
      platform.score = vars.platformGaps[vars.platformLevels[isLevel(maxPlatformX)].gaps[Math.floor(Math.random()*vars.platformLevels[isLevel(maxPlatformX)].gaps.length)] -1];
      platform.touched = false;
      platform.reset(maxPlatformX + vars.platformGaps[vars.platformLevels[isLevel(maxPlatformX)].gaps[Math.floor(Math.random()*vars.platformLevels[isLevel(maxPlatformX)].gaps.length)] -1], game.height - h);
      platform.width = vars.platformWidths[vars.platformLevels[isLevel(maxPlatformX)].widths[Math.floor(Math.random()*vars.platformLevels[isLevel(maxPlatformX)].widths.length)] -1];
      platform.nextX = maxPlatformX + vars.platformGaps[vars.platformLevels[isLevel(maxPlatformX)].gaps[Math.floor(Math.random()*vars.platformLevels[isLevel(maxPlatformX)].gaps.length)] -1];
      platform.height = vars.platformHeight;

      // coins?
      var items = [1,1,2,3];
      var yesCoins = items[Math.floor(Math.random()*items.length)];
      // 1 === do nothing
      // coins
      if (yesCoins === 2) {
        if (platform.width > 50) {
          placeCoins(platform);
        }
      // coin rings
      } else if (yesCoins === 3) {
        placeBluering(platform);
      }

      // [todo] place trees for this platform

    } else {
      //console.log('...no dead platforms...');
    }
  }
}


function placePlatformsUnoptimized() {
  var platformCount = game.platforms.children.length;
  //console.log('placePlatforms(): '+platformCount);

  for (var i=0; i<platformCount; i++) {

    // get from pool
    var platform = game.platforms.getFirstDead();
    if (platform) {

      // far platform.x
      var maxPlatformX = getLastPlatformX();

      // platform settings per level
      var widths = vars.platformLevels[isLevel(maxPlatformX)].widths;
      var w = vars.platformWidths[widths[Math.floor(Math.random()*widths.length)] -1];

      var heights = vars.platformLevels[isLevel(maxPlatformX)].heights;
      var h = vars.platformHeights[heights[Math.floor(Math.random()*heights.length)] -1];

      var gapws = vars.platformLevels[isLevel(maxPlatformX)].gaps;
      var gapw = vars.platformGaps[gapws[Math.floor(Math.random()*gapws.length)] -1];

      // set a platform ID
      if (!platform.i) {
        platform.i = i;
      }

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

      // [todo] place trees for this platform

    } else {
      //console.log('...no dead platforms...');
    }
  }
}

// coin platforms
function placeCoins(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);
  //console.log('long platform with coins: ' + coinCount);
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    if (coin) {
      coin.pos.y = platform.y - 60;
      resetLeaf(coin);
      coin.reset( platform.x + 60 + (i * 60), platform.y - 60 );
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
    ring.x = platform.x + platform.width + (platform.nextX/2);
    ring.y = platform.y - 190;
    ring.children.forEach(function(blueleaf) {
      resetLeaf(blueleaf);
    });
  } else {
    //console.log('0 rings');
  }
}

// find max x value
function getLastPlatformX() {
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x+platform.width,maxPlatformX);
  });
  return maxPlatformX;
}

function resetFarPlatforms() {
  //console.log('fn() resetFarPlatforms');
  game.platforms.children.filter( offCamera ).forEach(function(platform) {
    platform.kill();
    platform.x = 0;
  });
}

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  if (!platform.touched) {
    platform.touched = true;

    // platform jump score
    // touchPlatformScore(leafy, platform.score);
  }
}
