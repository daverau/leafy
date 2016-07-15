// Platforms
function addPlatform(id) {
  // Create a pipe at the position x and y
  var platform = game.add.sprite(0, 550, 'platform');
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
      //console.log('---move platform: '+ this.id);

      // random width
      var widths = vars.platformLevels[vars.currentLevel].widths;
      var w = vars.platformWidths[widths[Math.floor(Math.random()*widths.length)] -1];
      this.width = w;

      var heights = vars.platformLevels[vars.currentLevel].heights;
      var h = vars.platformHeights[heights[Math.floor(Math.random()*heights.length)] -1];
      this.y = h;

      // random gap
      var gapws = vars.platformLevels[vars.currentLevel].gaps;
      var gapw = vars.platformGaps[gapws[Math.floor(Math.random()*gapws.length)] -1];

      // set new X position based on last X
      this.position.x = getLastPlatformX() + gapw;

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

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  //console.log('fn() platformTouch');
  game.leafy.position.x = vars.leafyXposition;
  if (!platform.touched) {
    platform.touched = true;

    // platform jump score
    // touchPlatformScore(leafy, platform.score);

    // shuffle platforms if possible
  }
}
